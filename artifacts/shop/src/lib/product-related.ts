import type { TdmProduct } from "@/types/product";

/** Same category first, then same brand — TDM related product priority */
export function getRelatedProducts(
  product: TdmProduct,
  allProducts: TdmProduct[],
  limit = 12,
): TdmProduct[] {
  const seen = new Set<number>([product.id]);
  const result: TdmProduct[] = [];

  const sameCategory = allProducts
    .filter((p) => p.categorySlug === product.categorySlug && !seen.has(p.id))
    .sort((a, b) => b.soldCount - a.soldCount);

  for (const p of sameCategory) {
    if (result.length >= limit) break;
    seen.add(p.id);
    result.push(p);
  }

  const sameBrand = allProducts
    .filter((p) => p.brandSlug === product.brandSlug && !seen.has(p.id))
    .sort((a, b) => b.soldCount - a.soldCount);

  for (const p of sameBrand) {
    if (result.length >= limit) break;
    seen.add(p.id);
    result.push(p);
  }

  return result;
}
