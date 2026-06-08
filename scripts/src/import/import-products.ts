/**
 * Phase 0 — Import crawler CSV → TdmProduct JSON for static catalog.
 *
 * Usage:
 *   pnpm --filter @workspace/scripts import:products
 *   pnpm --filter @workspace/scripts import:products -- --limit 100
 */
import fs from "node:fs";
import path from "node:path";
import { readCsv } from "./csv-utils.js";
import { generateReport } from "./generate-report.js";
import { mapCrawlerRowToProduct } from "./map-product.js";
import {
  validateAndMapProducts,
  validationPassed,
} from "./validate-import.js";
import {
  loadShopCategories,
  loadValidBrandSlugs,
  RESERVED_SLUGS,
} from "./shop-catalog.js";
import type {
  BrandMapEntry,
  CrawlerImageRow,
  CrawlerProductRow,
  CrawlerSpecRow,
} from "./types.js";

const ROOT = path.resolve(import.meta.dirname, "../../..");
const CRAWLER_DIR = path.resolve(ROOT, "../tdm-crawler");
const IMPORT_CONFIG_DIR = path.resolve(ROOT, "scripts/import");
const SHOP_DATA_DIR = path.resolve(ROOT, "artifacts/shop/src/data");
const REPORT_DIR = path.resolve(ROOT, "artifacts/shop");

function parseArgs(): { limit: number } {
  const args = process.argv.slice(2);
  const limitIdx = args.indexOf("--limit");
  const limit =
    limitIdx >= 0 && args[limitIdx + 1]
      ? Number(args[limitIdx + 1])
      : 100;
  return { limit: Number.isFinite(limit) ? limit : 100 };
}

function loadJsonMap<T>(filePath: string): T {
  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8")) as Record<
    string,
    unknown
  >;
  delete raw._comment;
  return raw as T;
}

async function main(): Promise<void> {
  const { limit } = parseArgs();

  const productsCsv = path.join(CRAWLER_DIR, "products_100.csv");
  const specificationsCsv = path.join(CRAWLER_DIR, "specifications_100.csv");
  const imagesCsv = path.join(CRAWLER_DIR, "images_100.csv");

  const categoryMap = loadJsonMap<Record<string, string>>(
    path.join(IMPORT_CONFIG_DIR, "category-map.json"),
  );
  const brandMap = loadJsonMap<Record<string, BrandMapEntry>>(
    path.join(IMPORT_CONFIG_DIR, "brand-map.json"),
  );

  const shopCategories = loadShopCategories();
  const validBrandSlugs = loadValidBrandSlugs();

  console.log("=== Phase 0 Product Import ===");
  console.log(`Source: ${productsCsv}`);
  console.log(`Limit: ${limit}`);

  const allProducts = await readCsv<CrawlerProductRow>(productsCsv);
  const productRows = allProducts.slice(0, limit);
  const allSpecs = await readCsv<CrawlerSpecRow>(specificationsCsv);
  const allImages = await readCsv<CrawlerImageRow>(imagesCsv);

  const specsBySku = new Map<string, CrawlerSpecRow[]>();
  for (const spec of allSpecs) {
    const list = specsBySku.get(spec.sku) ?? [];
    list.push(spec);
    specsBySku.set(spec.sku, list);
  }

  const imagesBySku = new Map<string, CrawlerImageRow[]>();
  for (const img of allImages) {
    const list = imagesBySku.get(img.sku) ?? [];
    list.push(img);
    imagesBySku.set(img.sku, list);
  }

  const mappedProducts = productRows.map((row, index) => {
    const categoryKey = (row.category ?? "").trim();
    const brandKey = (row.brand ?? "").trim();
    const categorySlug = categoryMap[categoryKey] ?? categoryMap[""];
    const category = categorySlug
      ? shopCategories.get(categorySlug)
      : undefined;
    const brand = brandMap[brandKey];

    const fallbackCategory = { id: 0, name: categoryKey || "UNKNOWN", slug: categorySlug || "UNKNOWN" };
    const fallbackBrand = { brandId: 0, brandSlug: "unknown", brandName: brandKey || "UNKNOWN" };

    return mapCrawlerRowToProduct(
      row,
      index + 1,
      category ?? fallbackCategory,
      brand ?? fallbackBrand,
      specsBySku.get(row.sku) ?? [],
      imagesBySku.get(row.sku) ?? [],
    );
  });

  const validation = validateAndMapProducts(productRows, mappedProducts, {
    categoryMap,
    brandMap,
    validCategorySlugs: new Set(shopCategories.keys()),
    validBrandSlugs,
    existingCategorySlugs: new Set(shopCategories.keys()),
    existingBrandSlugs: validBrandSlugs,
  });

  const passed = validationPassed(validation.issues, validation.products.length);

  const report = generateReport({
    productsCsv,
    specificationsCsv,
    imagesCsv,
    limit,
    totalRows: productRows.length,
    products: validation.products,
    issues: validation.issues,
    duplicateSkus: validation.duplicateSkus,
    duplicateSlugs: validation.duplicateSlugs,
    passed,
    outputDir: REPORT_DIR,
  });

  console.log("\n--- Import Summary ---");
  console.log(`Total rows:    ${report.summary.totalRows}`);
  console.log(`Imported:      ${report.summary.imported}`);
  console.log(`Errors:        ${report.summary.errors}`);
  console.log(`Warnings:      ${report.summary.warnings}`);
  console.log(`Passed:        ${report.summary.passed}`);
  console.log(`Report:        ${path.join(REPORT_DIR, "import-report.json")}`);

  if (!passed) {
    console.error("\n❌ Import FAILED — products.imported.json NOT written.");
    console.error("Fix errors in import-errors.csv and re-run.");
    process.exit(1);
  }

  const outputPath = path.join(SHOP_DATA_DIR, "products.imported.json");
  fs.mkdirSync(SHOP_DATA_DIR, { recursive: true });
  fs.writeFileSync(
    outputPath,
    JSON.stringify(validation.products, null, 2),
    "utf-8",
  );

  console.log(`\n✅ Wrote ${validation.products.length} products → ${outputPath}`);
  console.log("Update catalog-service.ts to load products.imported.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
