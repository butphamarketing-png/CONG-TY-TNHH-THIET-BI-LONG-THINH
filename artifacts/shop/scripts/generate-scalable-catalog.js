/**
 * Generate scalable catalog assets from products.imported.json.
 * - Slim listing chunks per category (no fullDescription, no specs, no image gallery)
 * - Individual product detail files (full data + specs)
 * - slug-registry.json for O(1) product lookup
 * - search-index.json (lightweight)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "../src/data");
const PUBLIC_DIR = path.resolve(__dirname, "../public/data");
const DETAIL_DIR = path.join(DATA_DIR, "products/detail");
const PUBLIC_DETAIL_DIR = path.join(PUBLIC_DIR, "products/detail");

function toListing(product) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    thumbnail: product.thumbnail,
    categoryId: product.categoryId,
    categorySlug: product.categorySlug,
    categoryName: product.categoryName,
    brandId: product.brandId,
    brandSlug: product.brandSlug,
    brandName: product.brandName,
    inStock: product.inStock,
    soldCount: product.soldCount,
    rating: product.rating,
    reviewCount: product.reviewCount,
    badges: product.badges ?? [],
    isFeatured: product.isFeatured ?? false,
    isBestSeller: product.isBestSeller ?? false,
    isNew: product.isNew ?? false,
    isOnSale: product.isOnSale ?? false,
    shortDescription: product.shortDescription,
  };
}

function safeSlug(slug) {
  return (slug || "uncategorized").replace(/[^a-z0-9-_]/gi, "-") || "uncategorized";
}

function syncDir(srcDir, destDir) {
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    if (file.endsWith(".json")) {
      fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    }
  }
}

export function generateScalableCatalog(products) {
  console.log(`Generating scalable catalog for ${products.length} products...`);

  fs.mkdirSync(DETAIL_DIR, { recursive: true });

  const byCategory = {};
  const slugRegistry = { products: {} };
  const searchIndex = [];

  for (const product of products) {
    const catSlug = product.categorySlug || "";
    if (!byCategory[catSlug]) byCategory[catSlug] = [];
    byCategory[catSlug].push(toListing(product));

    const detailFile = `products/detail/${product.slug}.json`;
    fs.writeFileSync(path.join(DATA_DIR, detailFile), JSON.stringify(product));

    slugRegistry.products[product.slug] = {
      sku: product.sku,
      categorySlug: product.categorySlug,
      detailFile,
    };

    searchIndex.push({
      id: product.id,
      sku: product.sku,
      name: product.name,
      slug: product.slug,
      brandSlug: product.brandSlug,
      brandName: product.brandName,
      categorySlug: product.categorySlug,
      categoryName: product.categoryName,
      price: product.price,
      thumbnail: product.thumbnail,
      isOnSale: product.isOnSale ?? false,
    });
  }

  const categories = [];
  for (const [slug, listings] of Object.entries(byCategory)) {
    const safe = safeSlug(slug);
    const filename = `products-listing-${safe}.json`;
    fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(listings));
    categories.push({ slug, count: listings.length, file: filename });
    console.log(`  Listing chunk: ${filename} (${listings.length} products)`);
  }

  const productsIndex = {
    categories,
    totalProducts: products.length,
    totalCategories: categories.length,
    listingPrefix: "products-listing-",
    detailPrefix: "products/detail/",
  };

  fs.writeFileSync(path.join(DATA_DIR, "products-index.json"), JSON.stringify(productsIndex, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, "slug-registry.json"), JSON.stringify(slugRegistry));
  fs.writeFileSync(path.join(DATA_DIR, "search-index.json"), JSON.stringify(searchIndex));

  console.log(`  Detail files: ${products.length} in products/detail/`);
  console.log(`  Search index: ${searchIndex.length} entries`);
  console.log(`  Slug registry: ${Object.keys(slugRegistry.products).length} products`);

  return { categories, totalProducts: products.length };
}

const IMPORT_ONLY = new Set(["products.imported.json", "website-data-audit.json"]);

function isLegacyFullChunk(filename) {
  return (
    filename.startsWith("products-") &&
    !filename.startsWith("products-listing-") &&
    filename !== "products-index.json" &&
    filename.endsWith(".json")
  );
}

function removeNonDeployFiles(dir) {
  if (!fs.existsSync(dir)) return;
  for (const file of fs.readdirSync(dir)) {
    if (IMPORT_ONLY.has(file) || isLegacyFullChunk(file)) {
      fs.unlinkSync(path.join(dir, file));
      console.log(`  Removed non-deploy file: ${file}`);
    }
  }
}

export function syncToPublic() {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  removeNonDeployFiles(DATA_DIR);
  removeNonDeployFiles(PUBLIC_DIR);

  for (const file of fs.readdirSync(DATA_DIR)) {
    if (file.endsWith(".json") && !IMPORT_ONLY.has(file) && !isLegacyFullChunk(file)) {
      fs.copyFileSync(path.join(DATA_DIR, file), path.join(PUBLIC_DIR, file));
    }
  }

  syncDir(DETAIL_DIR, PUBLIC_DETAIL_DIR);
  console.log("Synced scalable catalog to public/data");
}

const isMain = process.argv[1]?.includes("generate-scalable-catalog");
if (isMain) {
  const importedPath = path.join(DATA_DIR, "products.imported.json");
  const products = JSON.parse(fs.readFileSync(importedPath, "utf8"));
  generateScalableCatalog(products);
  syncToPublic();
}
