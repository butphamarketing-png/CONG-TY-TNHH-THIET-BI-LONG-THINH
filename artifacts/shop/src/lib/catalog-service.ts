/**
 * Unified catalog service — single data access layer (Phase A).
 * All pages must consume catalog through this module, not raw tdm-data arrays.
 */
import { CATEGORY_TREE } from "@/lib/categories-tree";
import { BRANDS } from "@/lib/brands-tree";
import productsImported from "@/data/products.imported.json";
import brandsImported from "@/data/brands.imported.json";
import { getCategorySeo } from "@/lib/category-seo";
import { getBrandFiltersForCategory } from "@/lib/brand-filters";
import { TDM_HOMEPAGE_TILES } from "@/lib/homepage-tiles";
import {
  flattenCategories,
  findCategoryBySlug,
  getBreadcrumb,
  getDescendantSlugs,
  getBrandsForGroup,
  getTdmMenuGroups,
  getHomepageTilesForGroup,
} from "@/lib/category-utils";
import { buildSlugRegistry } from "@/lib/slug-registry";
import type { Brand, CategoryNode, CategorySeoContent, BrandFilterTile, TdmMenuGroup } from "@/types/catalog";
import type { TdmProduct, ProductListParams, ProductListResult } from "@/types/product";

// ─── Singleton catalog state ─────────────────────────────────────────
const categories = CATEGORY_TREE;
const brands = brandsImported as unknown as Brand[];
let products: TdmProduct[] = productsImported as TdmProduct[];

const slugRegistry = buildSlugRegistry(categories, brands, products);

// ─── Categories ──────────────────────────────────────────────────────

export function getCategories(): CategoryNode[] {
  return categories;
}

export function getCategoryBySlug(slug: string): CategoryNode | undefined {
  const node = findCategoryBySlug(categories, slug);
  if (!node) return undefined;
  return enrichCategory(node);
}

function enrichCategory(node: CategoryNode): CategoryNode {
  const seo = getCategorySeo(node.slug);
  const brandFilters = getBrandFiltersForCategory(node.slug);
  return {
    ...node,
    seo: node.seo ?? seo,
    brandFilters: node.brandFilters ?? (brandFilters.length > 0 ? brandFilters : undefined),
  };
}

export function getCategoryBreadcrumb(slug: string): CategoryNode[] {
  return getBreadcrumb(categories, slug);
}

export function getCategoryDescendantSlugs(slug: string): string[] {
  const node = findCategoryBySlug(categories, slug);
  return node ? getDescendantSlugs(node) : [];
}

export function getMenuGroups(): CategoryNode[] {
  return getTdmMenuGroups(categories);
}

export function getHomepageTileSlugs(group: TdmMenuGroup): string[] {
  return TDM_HOMEPAGE_TILES[group] ?? [];
}

export function getHomepageTiles(group: TdmMenuGroup): CategoryNode[] {
  return getHomepageTilesForGroup(categories, group);
}

export function getCategorySeoContent(slug: string): CategorySeoContent | undefined {
  return getCategorySeo(slug) ?? findCategoryBySlug(categories, slug)?.seo;
}

export function getCategoryBrandFilters(slug: string): BrandFilterTile[] {
  const node = findCategoryBySlug(categories, slug);
  return node?.brandFilters ?? getBrandFiltersForCategory(slug);
}

// ─── Brands ──────────────────────────────────────────────────────────

export function getBrands(): Brand[] {
  return brands;
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getBrandsByIndustry(group: Parameters<typeof getBrandsForGroup>[1]): Brand[] {
  return getBrandsForGroup(brands, group);
}

// ─── Products ────────────────────────────────────────────────────────

export function getProducts(): TdmProduct[] {
  return products;
}

export function getProductBySlug(slug: string): TdmProduct | undefined {
  return products.find((p) => p.slug === slug);
}

export function listProducts(params: ProductListParams = {}): ProductListResult {
  const page = params.page ?? 1;
  const limit = params.limit ?? 48;
  let result = [...products];

  if (params.categorySlug) {
    const node = findCategoryBySlug(categories, params.categorySlug);
    if (node) {
      const slugs = new Set(getDescendantSlugs(node));
      result = result.filter((p) => slugs.has(p.categorySlug));
    }
  }

  if (params.categorySlugs?.length) {
    const slugSet = new Set(params.categorySlugs);
    result = result.filter((p) => slugSet.has(p.categorySlug));
  }

  if (params.brandSlug) {
    result = result.filter((p) => p.brandSlug === params.brandSlug);
  }

  if (params.brandSlugs?.length) {
    const set = new Set(params.brandSlugs);
    result = result.filter((p) => set.has(p.brandSlug));
  }

  if (params.q) {
    const q = params.q.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brandName.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q),
    );
  }

  if (params.minPrice != null) {
    result = result.filter((p) => p.price >= params.minPrice!);
  }
  if (params.maxPrice != null) {
    result = result.filter((p) => p.price <= params.maxPrice!);
  }
  if (params.inStockOnly) {
    result = result.filter((p) => p.inStock);
  }

  switch (params.sort) {
    case "price_asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "bestseller":
      result.sort((a, b) => b.soldCount - a.soldCount);
      break;
    case "newest":
      result.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
      break;
    default:
      break;
  }

  const total = result.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const data = result.slice((page - 1) * limit, page * limit);

  return { data, total, page, limit, totalPages };
}

// ─── Slug registry ───────────────────────────────────────────────────

export function getSlugRegistry() {
  return slugRegistry;
}

export function resolveCatalogSlug(slug: string) {
  return slugRegistry.get(slug);
}

/** For tests / future API sync */
export function setProducts(next: TdmProduct[]): void {
  products = next;
  slugRegistry.clear();
  const rebuilt = buildSlugRegistry(categories, brands, products);
  rebuilt.forEach((v, k) => slugRegistry.set(k, v));
}

// Re-export flat category list helper
export { flattenCategories };
