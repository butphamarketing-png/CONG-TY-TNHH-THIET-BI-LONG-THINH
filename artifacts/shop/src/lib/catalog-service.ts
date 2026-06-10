/**
 * Unified catalog service — lazy-loaded, scalable data access layer.
 * Product data is NEVER bundled; fetched on demand from /data/ static assets.
 */
import { CATEGORY_TREE } from "@/lib/categories-tree";
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
import { buildSlugRegistry, RESERVED_SLUGS } from "@/lib/slug-registry";
import {
  applyLeafCategoryFilter,
  buildVirtualCategory,
  filterListingsForCategory,
  hasLeafCategoryFilter,
  resolveListingChunkSlugs,
} from "@/lib/category-listing-resolver";
import { getMegaMenuBrandSlugs, getMegaMenuCategorySlugs } from "@/lib/mega-menu-config";
import {
  expandCategorySlugs,
  getAllResolvableCategorySlugs,
  isTdmLiveSlug,
  toCanonicalTdmSlug,
  TDM_CANONICAL_ALIASES,
} from "@/lib/tdm-slug-aliases";
import {
  loadBrands,
  loadCategoryListing,
  loadCategoryListings,
  loadProductDetail,
  loadProductsIndex,
  loadSearchIndex,
  loadSlugRegistry,
  listingToProduct,
  searchEntryToListing,
  searchListings,
  getBrandListings,
  getTotalProductCount,
} from "@/lib/catalog-store";
import type { Brand, CategoryNode, CategorySeoContent, BrandFilterTile, TdmMenuGroup, SlugEntry } from "@/types/catalog";
import type { ProductListing, ProductListParams, ProductListResult, TdmProduct } from "@/types/product";

const categories = CATEGORY_TREE;
let brandsCache: Brand[] | null = null;
let slugRegistryCache: Map<string, SlugEntry> | null = null;

async function ensureBrands(): Promise<Brand[]> {
  if (!brandsCache) {
    brandsCache = await loadBrands();
  }
  return brandsCache;
}

async function ensureSlugRegistry(): Promise<Map<string, SlugEntry>> {
  if (slugRegistryCache) return slugRegistryCache;

  const brandList = await ensureBrands();
  const registry = buildSlugRegistry(categories, brandList, []);
  const productRegistry = await loadSlugRegistry();

  for (const slug of Object.keys(productRegistry.products)) {
    registry.set(slug, { type: "product", slug });
  }

  slugRegistryCache = registry;
  return registry;
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

function sortListings(list: ProductListing[], sort?: ProductListParams["sort"]): ProductListing[] {
  const result = [...list];
  switch (sort) {
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
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    default:
      break;
  }
  return result;
}

function filterListings(list: ProductListing[], params: ProductListParams): ProductListing[] {
  let result = list;

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
        p.sku.toLowerCase().includes(q),
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

  return result;
}

// ─── Categories ──────────────────────────────────────────────────────

export function getCategories(): CategoryNode[] {
  return categories;
}

export function getCategoryBySlug(slug: string): CategoryNode | undefined {
  const canonical = toCanonicalTdmSlug(slug);
  const node =
    findCategoryBySlug(categories, slug) ??
    findCategoryBySlug(categories, canonical);
  if (node) return enrichCategory(node);

  const virtual = buildVirtualCategory(canonical);
  if (virtual) return enrichCategory(virtual);

  return undefined;
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

export async function getBrands(): Promise<Brand[]> {
  return ensureBrands();
}

export async function getBrandBySlug(slug: string): Promise<Brand | undefined> {
  const brands = await ensureBrands();
  return brands.find((b) => b.slug === slug);
}

export async function getBrandsByIndustry(group: Parameters<typeof getBrandsForGroup>[1]): Promise<Brand[]> {
  const brands = await ensureBrands();
  return getBrandsForGroup(brands, group);
}

// ─── Products (lazy-loaded) ──────────────────────────────────────────

export async function getProductBySlug(slug: string): Promise<TdmProduct | undefined> {
  const detail = await loadProductDetail(slug);
  return detail ?? undefined;
}

export async function getProductListingsForCategory(
  categorySlug: string,
  includeDescendants = true,
): Promise<ProductListing[]> {
  const chunkSlugs = await resolveListingChunkSlugs(categorySlug, includeDescendants);
  if (!chunkSlugs.length) return [];

  const listings = await loadCategoryListings(chunkSlugs);
  let filtered = filterListingsForCategory(listings, categorySlug, includeDescendants);

  if (filtered.length === 0 && hasLeafCategoryFilter(categorySlug)) {
    const searchIndex = await loadSearchIndex();
    filtered = applyLeafCategoryFilter(
      searchIndex.map(searchEntryToListing),
      categorySlug,
    );
  }

  return filtered;
}

export async function getHomepageListings(
  categorySlugs: string[],
  limit = 12,
): Promise<ProductListing[]> {
  const listings = await loadCategoryListings(categorySlugs);
  return listings.slice(0, limit);
}

export async function listProducts(params: ProductListParams = {}): Promise<ProductListResult> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 48;

  if (params.q && !params.categorySlug && !params.categorySlugs?.length) {
    const searchResult = await searchListings(params.q, page, limit);
    return {
      data: searchResult.data.map(listingToProduct),
      total: searchResult.total,
      page: searchResult.page,
      limit: searchResult.limit,
      totalPages: searchResult.totalPages,
    };
  }

  let listings: ProductListing[] = [];

  if (params.categorySlugs?.length) {
    listings = await loadCategoryListings(params.categorySlugs);
  } else if (params.categorySlug) {
    listings = await getProductListingsForCategory(params.categorySlug, true);
  } else if (params.brandSlug) {
    listings = await getBrandListings(params.brandSlug);
  } else {
    const searchIndex = await loadSearchIndex();
    listings = searchIndex.map((entry) => ({
      id: entry.id,
      name: entry.name,
      slug: entry.slug,
      sku: entry.sku,
      price: entry.price,
      thumbnail: entry.thumbnail,
      categoryId: 0,
      categorySlug: entry.categorySlug,
      categoryName: entry.categoryName,
      brandId: 0,
      brandSlug: entry.brandSlug,
      brandName: entry.brandName,
      inStock: true,
      soldCount: 0,
      badges: [],
      isFeatured: false,
      isBestSeller: false,
      isNew: false,
      isOnSale: entry.isOnSale ?? false,
    }));
  }

  listings = filterListings(listings, params);
  listings = sortListings(listings, params.sort);

  const total = listings.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const data = listings.slice((page - 1) * limit, page * limit).map(listingToProduct);

  return { data, total, page, limit, totalPages };
}

export async function getRelatedListings(
  product: TdmProduct,
  limit = 12,
): Promise<ProductListing[]> {
  const categoryListings = await loadCategoryListing(product.categorySlug);
  const seen = new Set<number>([product.id]);
  const result: ProductListing[] = [];

  for (const p of categoryListings.sort((a, b) => b.soldCount - a.soldCount)) {
    if (result.length >= limit) break;
    if (!seen.has(p.id)) {
      seen.add(p.id);
      result.push(p);
    }
  }

  if (result.length < limit) {
    const brandListings = await getBrandListings(product.brandSlug);
    for (const p of brandListings) {
      if (result.length >= limit) break;
      if (!seen.has(p.id)) {
        seen.add(p.id);
        result.push(p);
      }
    }
  }

  return result;
}

// ─── Slug registry ───────────────────────────────────────────────────

export async function getSlugRegistry(): Promise<Map<string, SlugEntry>> {
  return ensureSlugRegistry();
}

/** Find category node slug in tree, following TDM alias map (e.g. ban-cau-2-khoi → bon-cau-2-khoi). */
function resolveCategorySlugInTree(slug: string): string | undefined {
  const canonical = toCanonicalTdmSlug(slug);
  const direct =
    findCategoryBySlug(categories, slug) ?? findCategoryBySlug(categories, canonical);
  if (direct) return direct.slug;

  const aliases = TDM_CANONICAL_ALIASES[canonical] ?? [];
  for (const alias of aliases) {
    const node = findCategoryBySlug(categories, alias);
    if (node) return node.slug;
  }
  return undefined;
}

/** Sync resolution for categories + known brand slugs (mega menu). Products require async. */
export function resolveCatalogSlugSync(slug: string): SlugEntry | undefined {
  if (!slug || RESERVED_SLUGS.has(slug)) return undefined;

  const canonical = toCanonicalTdmSlug(slug);
  const treeSlug = resolveCategorySlugInTree(slug);
  if (treeSlug) return { type: "category", slug: treeSlug };

  if (
    getMegaMenuCategorySlugs().has(canonical) ||
    getMegaMenuCategorySlugs().has(slug) ||
    getAllResolvableCategorySlugs().has(slug) ||
    getAllResolvableCategorySlugs().has(canonical) ||
    isTdmLiveSlug(slug) ||
    isTdmLiveSlug(canonical)
  ) {
    const resolved = resolveCategorySlugInTree(canonical) ?? resolveCategorySlugInTree(slug);
    if (resolved) return { type: "category", slug: resolved };
    return { type: "category", slug: canonical };
  }

  if (getMegaMenuBrandSlugs().includes(canonical) || getMegaMenuBrandSlugs().includes(slug)) {
    return { type: "brand", slug: canonical };
  }

  return undefined;
}

export async function resolveCatalogSlug(slug: string): Promise<SlugEntry | undefined> {
  const sync = resolveCatalogSlugSync(slug);
  if (sync) return sync;

  if (RESERVED_SLUGS.has(slug)) return undefined;
  const registry = await ensureSlugRegistry();
  return registry.get(slug);
}

export { getTotalProductCount, loadSearchIndex };
export { flattenCategories };
