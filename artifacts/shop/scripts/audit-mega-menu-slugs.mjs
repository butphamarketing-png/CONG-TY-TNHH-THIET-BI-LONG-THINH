import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function extractMegaMenuSlugs(text) {
  const slugs = new Set();
  for (const re of [
    /(?:slug|headingSlug): ["']([a-z0-9.-]+)["']/g,
    /G\([^,]+,\s*["']([a-z0-9.-]+)["']/g,
  ]) {
    let m;
    while ((m = re.exec(text))) slugs.add(m[1]);
  }
  return slugs;
}

const configText = readFileSync(join(root, "src/lib/mega-menu-config.ts"), "utf8");
const treeText = readFileSync(join(root, "src/lib/categories-tree.ts"), "utf8");
const tdmSlugs = new Set(JSON.parse(readFileSync(join(root, "src/data/tdm-category-slugs.json"), "utf8")));

const configSlugs = extractMegaMenuSlugs(configText);
const treeSlugs = extractMegaMenuSlugs(treeText);

const notOnTdm = [...configSlugs].filter((s) => !tdmSlugs.has(s)).sort();
const missingInTree = [...configSlugs].filter((s) => !treeSlugs.has(s)).sort();

console.log("=== MEGA MENU AUDIT ===");
console.log(`Mega menu slugs: ${configSlugs.size}`);
console.log(`Category tree slugs: ${treeSlugs.size}`);
console.log(`TDM live slugs: ${tdmSlugs.size}`);

console.log(`\nMega menu slugs NOT on TDM (${notOnTdm.length}):`);
notOnTdm.forEach((s) => console.log(`  - ${s}`));

console.log(`\nMega menu slugs missing in tree (${missingInTree.length}) — OK if aliased via tdm-slug-aliases.ts`);
missingInTree.slice(0, 10).forEach((s) => console.log(`  - ${s}`));
if (missingInTree.length > 10) console.log(`  ... +${missingInTree.length - 10} more`);

const passed = notOnTdm.length === 0;
console.log(`\nResult: ${passed ? "PASSED" : "FAILED"}`);
process.exit(passed ? 0 : 1);
