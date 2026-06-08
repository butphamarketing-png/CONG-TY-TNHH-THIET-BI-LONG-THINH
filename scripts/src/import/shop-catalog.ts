import fs from "node:fs";
import path from "node:path";
import type { ShopCategory } from "./types.js";

const SHOP_SRC = path.resolve(
  import.meta.dirname,
  "../../../artifacts/shop/src/lib",
);

/** Parse id, name, slug from categories-tree.ts without importing shop code */
export function loadShopCategories(): Map<string, ShopCategory> {
  const file = fs.readFileSync(
    path.join(SHOP_SRC, "categories-tree.ts"),
    "utf-8",
  );
  const map = new Map<string, ShopCategory>();

  const nodePattern =
    /\{\s*id:\s*(\d+),\s*name:\s*"([^"]+)",\s*slug:\s*"([^"]+)"/g;

  let match: RegExpExecArray | null;
  while ((match = nodePattern.exec(file)) !== null) {
    const [, id, name, slug] = match;
    map.set(slug, { id: Number(id), name, slug });
  }

  return map;
}

export function loadValidBrandSlugs(): Set<string> {
  const file = fs.readFileSync(path.join(SHOP_SRC, "brands-tree.ts"), "utf-8");
  const slugs = new Set<string>();
  const slugPattern = /slug:\s*"([^"]+)"/g;
  let match: RegExpExecArray | null;
  while ((match = slugPattern.exec(file)) !== null) {
    slugs.add(match[1]);
  }
  return slugs;
}

/** Slugs reserved by app routing — must not be used as product slugs */
export const RESERVED_SLUGS = new Set([
  "gio-hang",
  "dat-hang",
  "tim-kiem",
  "showroom",
  "tin-tuc",
  "yeu-thich",
  "khuyen-mai",
  "tra-cuu-don-hang",
  "danh-muc",
  "san-pham",
  "thuong-hieu",
]);
