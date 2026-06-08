import type { SlugEntityType, SlugEntry } from "@/types/catalog";
import type { TdmProduct } from "@/types/product";
import type { Brand, CategoryNode } from "@/types/catalog";
import { flattenCategories } from "@/lib/category-utils";

/** App routes that must never be resolved as catalog slugs */
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

export function buildSlugRegistry(
  categories: CategoryNode[],
  brands: Brand[],
  products: TdmProduct[],
): Map<string, SlugEntry> {
  const registry = new Map<string, SlugEntry>();

  for (const cat of flattenCategories(categories)) {
    registry.set(cat.slug, { type: "category", slug: cat.slug });
  }

  for (const brand of brands) {
    // Brand wins over category if slug collision (TDM: /toto is brand)
    registry.set(brand.slug, { type: "brand", slug: brand.slug });
  }

  for (const product of products) {
    registry.set(product.slug, { type: "product", slug: product.slug });
  }

  return registry;
}

export function resolveSlug(
  slug: string,
  registry: Map<string, SlugEntry>,
): SlugEntry | undefined {
  if (RESERVED_SLUGS.has(slug)) return undefined;
  return registry.get(slug);
}

export function getSlugEntityType(
  slug: string,
  registry: Map<string, SlugEntry>,
): SlugEntityType | undefined {
  return resolveSlug(slug, registry)?.type;
}
