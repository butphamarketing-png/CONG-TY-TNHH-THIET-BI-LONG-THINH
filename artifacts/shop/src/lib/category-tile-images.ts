import manifest from "@/data/category-tile-manifest.json";

/** Dedicated category tile image (from tdm.vn), keyed by homepage tile slug */
export function getCategoryTileImage(tileSlug: string): string | undefined {
  const path = (manifest as Record<string, string>)[tileSlug];
  return path || undefined;
}

export function hasCategoryTileImages(): boolean {
  return Object.keys(manifest).length > 0;
}
