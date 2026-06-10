/**
 * Remove import-only / legacy files from deploy output.
 * Cloudflare Pages rejects any single asset > 25 MiB.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHOP_ROOT = path.resolve(__dirname, "..");

const IMPORT_ONLY = new Set([
  "products.imported.json",
  "website-data-audit.json",
]);

function isLegacyFullChunk(filename) {
  return (
    filename.startsWith("products-") &&
    !filename.startsWith("products-listing-") &&
    filename !== "products-index.json" &&
    filename.endsWith(".json")
  );
}

function shouldExclude(filename) {
  return (
    IMPORT_ONLY.has(filename) ||
    isLegacyFullChunk(filename) ||
    /\.backup-\d+\.json$/i.test(filename)
  );
}

function stripDir(dir) {
  if (!fs.existsSync(dir)) return [];
  const removed = [];
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".json")) continue;
    if (!shouldExclude(file)) continue;
    const filePath = path.join(dir, file);
    fs.unlinkSync(filePath);
    removed.push(file);
  }
  return removed;
}

const targets = [
  path.join(SHOP_ROOT, "public", "data"),
  path.join(SHOP_ROOT, "dist", "public", "data"),
];

let totalRemoved = 0;
for (const dir of targets) {
  const removed = stripDir(dir);
  if (removed.length > 0) {
    console.log(`Stripped ${removed.length} files from ${dir}:`);
    removed.forEach((f) => console.log(`  - ${f}`));
    totalRemoved += removed.length;
  }
}

if (totalRemoved === 0) {
  console.log("No import-only assets to strip.");
} else {
  console.log(`Done. Removed ${totalRemoved} file(s) from deploy paths.`);
}
