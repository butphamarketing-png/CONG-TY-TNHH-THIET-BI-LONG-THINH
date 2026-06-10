/**
 * Fix UNKNOWN / missing brands in products.imported.json by inferring from product names.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadBrandMap, inferBrandFromName, needsBrandFix } from "./brand-inference.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "../src/data");
const BRAND_MAP_PATH = path.resolve(__dirname, "../../../scripts/import/brand-map.json");
const PRODUCTS_PATH = path.join(DATA_DIR, "products.imported.json");

function main() {
  if (!fs.existsSync(PRODUCTS_PATH)) {
    console.error("products.imported.json not found — run import-all-data.js first");
    process.exit(1);
  }

  const brandMap = loadBrandMap(BRAND_MAP_PATH, fs);
  const products = JSON.parse(fs.readFileSync(PRODUCTS_PATH, "utf8"));

  let fixed = 0;
  let stillUnknown = 0;

  for (const product of products) {
    if (!needsBrandFix(product)) continue;

    const inferred = inferBrandFromName(product.name, brandMap);
    if (inferred) {
      product.brandId = inferred.brandId;
      product.brandSlug = inferred.brandSlug;
      product.brandName = inferred.brandName;
      fixed++;
    } else {
      stillUnknown++;
    }
  }

  fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(products, null, 2));
  console.log(`Brand fix: ${fixed} updated, ${stillUnknown} still unmapped, ${products.length} total`);
}

main();
