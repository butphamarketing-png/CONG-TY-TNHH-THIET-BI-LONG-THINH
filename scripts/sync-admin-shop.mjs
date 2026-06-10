#!/usr/bin/env node
/**
 * Đồng bộ Admin CMS → Website Shop
 *
 * 1. Sửa brand UNKNOWN trong catalog
 * 2. Tái tạo listing chunks + search index
 * 3. Copy site-content.json (CMS) → shop public/data
 * 4. Xuất snapshot sản phẩm cho admin
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SHOP_DIR = path.join(ROOT, "artifacts/shop");
const CMS_DIR = path.join(ROOT, "shared/cms");
const ADMIN_EXPORT = path.join(CMS_DIR, "products-admin-snapshot.json");

function run(cmd, cwd = SHOP_DIR) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { cwd, stdio: "inherit" });
}

function syncSiteContent() {
  const src = path.join(CMS_DIR, "site-content.json");
  const dest = path.join(SHOP_DIR, "public/data/site-content.json");
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`✓ site-content.json → public/data/`);
}

function exportAdminSnapshot() {
  const productsPath = path.join(SHOP_DIR, "src/data/products.imported.json");
  if (!fs.existsSync(productsPath)) {
    console.warn("⚠ products.imported.json missing — skip admin snapshot");
    return;
  }

  const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
  const snapshot = products.slice(0, 500).map((p) => ({
    id: p.id,
    name: p.name,
    sku: p.sku,
    slug: p.slug,
    category: p.categoryName,
    categorySlug: p.categorySlug,
    brand: p.brandName,
    brandSlug: p.brandSlug,
    price: p.price,
    salePrice: p.originalPrice && p.originalPrice > p.price ? p.price : 0,
    originalPrice: p.originalPrice,
    stock: p.stockCount ?? 10,
    status: p.inStock ? "active" : "inactive",
    thumbnail: p.thumbnail,
    date: p.createdAt ?? new Date().toISOString().slice(0, 10),
  }));

  fs.mkdirSync(CMS_DIR, { recursive: true });
  fs.writeFileSync(
    ADMIN_EXPORT,
    JSON.stringify({ updatedAt: new Date().toISOString(), total: products.length, items: snapshot }, null, 2),
  );
  console.log(`✓ Admin snapshot: ${snapshot.length} / ${products.length} products → shared/cms/`);
}

console.log("=== Đồng bộ Admin → Shop ===\n");

run("node scripts/fix-product-brands.js");
run("node scripts/generate-scalable-catalog.js");
syncSiteContent();
exportAdminSnapshot();

console.log("\n=== Hoàn tất đồng bộ ===");
console.log("Admin chỉnh: shared/cms/site-content.json");
console.log("Chạy lại: node scripts/sync-admin-shop.mjs");
