/**
 * Scalable catalog data store — all product data loaded on demand via fetch.
 * Nothing here is bundled into the JS build.
 */
import type { Brand, SlugEntry } from "@/types/catalog";
import type { ProductListing, TdmProduct } from "@/types/product";

const DATA_BASE = "/data";

interface ProductsIndex {
  categories: Array<{ slug: string; count: number; file: string }>;
  totalProducts: number;
  totalCategories: number;
}

interface SearchIndexEntry {
  id: number;
  sku: string;
  name: string;
  slug: string;
  brandSlug: string;
  brandName: string;
  categorySlug: string;
  categoryName: string;
  price: number;
  thumbnail: string;
  isOnSale?: boolean;
}

interface SlugRegistryFile {
  products: Record<string, { sku: string; categorySlug: string; detailFile: string }>;
}

const jsonCache = new Map<string, unknown>();
const listingChunkCache = new Map<string, ProductListing[]>();
const detailCache = new Map<string, TdmProduct>();

let productsIndex: ProductsIndex | null = null;
let searchIndex: SearchIndexEntry[] | null = null;
let slugRegistry: SlugRegistryFile | null = null;
let brandsData: Brand[] | null = null;

async function fetchJson<T>(path: string): Promise<T | null> {
  if (jsonCache.has(path)) {
    return jsonCache.get(path) as T;
  }
  try {
    const res = await fetch(`${DATA_BASE}/${path}`);
    if (!res.ok) return null;
    const data = (await res.json()) as T;
    jsonCache.set(path, data);
    return data;
  } catch {
    return null;
  }
}

export async function loadProductsIndex(): Promise<ProductsIndex> {
  if (productsIndex) return productsIndex;
  productsIndex = (await fetchJson<ProductsIndex>("products-index.json")) ?? {
    categories: [],
    totalProducts: 0,
    totalCategories: 0,
  };
  return productsIndex;
}

export async function loadSearchIndex(): Promise<SearchIndexEntry[]> {
  if (searchIndex) return searchIndex;
  searchIndex = (await fetchJson<SearchIndexEntry[]>("search-index.json")) ?? [];
  return searchIndex;
}

export async function loadSlugRegistry(): Promise<SlugRegistryFile> {
  if (slugRegistry) return slugRegistry;
  slugRegistry = (await fetchJson<SlugRegistryFile>("slug-registry.json")) ?? { products: {} };
  return slugRegistry;
}

export async function loadBrands(): Promise<Brand[]> {
  if (brandsData) return brandsData;
  brandsData = (await fetchJson<Brand[]>("brands.imported.json")) ?? [];
  return brandsData;
}

export async function loadCategoryListing(categorySlug: string): Promise<ProductListing[]> {
  const cacheKey = categorySlug || "uncategorized";
  if (listingChunkCache.has(cacheKey)) {
    return listingChunkCache.get(cacheKey)!;
  }

  const index = await loadProductsIndex();
  const entry = index.categories.find((c) => c.slug === categorySlug);
  if (!entry) {
    listingChunkCache.set(cacheKey, []);
    return [];
  }

  const products = (await fetchJson<ProductListing[]>(entry.file)) ?? [];
  listingChunkCache.set(cacheKey, products);
  return products;
}

export async function loadCategoryListings(categorySlugs: string[]): Promise<ProductListing[]> {
  const unique = [...new Set(categorySlugs)];
  const chunks = await Promise.all(unique.map((slug) => loadCategoryListing(slug)));
  return chunks.flat();
}

export async function loadProductDetail(slug: string): Promise<TdmProduct | null> {
  if (detailCache.has(slug)) {
    return detailCache.get(slug)!;
  }

  const registry = await loadSlugRegistry();
  const entry = registry.products[slug];
  if (!entry) return null;

  const product = await fetchJson<TdmProduct>(entry.detailFile);
  if (product) {
    detailCache.set(slug, product);
  }
  return product;
}

export function listingToProduct(listing: ProductListing): TdmProduct {
  return {
    ...listing,
    images: listing.thumbnail ? [{ url: listing.thumbnail, alt: listing.name }] : [],
    tags: [],
    isDiscontinued: false,
    contactForPrice: false,
    attributes: [],
    variants: [],
    attachments: [],
    showroomStock: [],
    viewCount: 0,
  };
}

export function searchEntryToListing(entry: SearchIndexEntry): ProductListing {
  return {
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
  };
}

export async function searchListings(
  query: string,
  page = 1,
  limit = 48,
): Promise<{ data: ProductListing[]; total: number; page: number; limit: number; totalPages: number }> {
  const index = await loadSearchIndex();
  const q = query.toLowerCase().trim();

  let results = index;
  if (q) {
    results = index.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brandName.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q),
    );
  }

  const total = results.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const slice = results.slice((page - 1) * limit, page * limit);

  return {
    data: slice.map(searchEntryToListing),
    total,
    page,
    limit,
    totalPages,
  };
}

export async function getBrandListings(brandSlug: string): Promise<ProductListing[]> {
  const index = await loadSearchIndex();
  return index.filter((p) => p.brandSlug === brandSlug).map(searchEntryToListing);
}

export async function resolveProductSlug(slug: string): Promise<SlugEntry | undefined> {
  const registry = await loadSlugRegistry();
  if (registry.products[slug]) {
    return { type: "product", slug };
  }
  return undefined;
}

export async function getTotalProductCount(): Promise<number> {
  const index = await loadProductsIndex();
  return index.totalProducts;
}

export function clearCatalogCache(): void {
  jsonCache.clear();
  listingChunkCache.clear();
  detailCache.clear();
  productsIndex = null;
  searchIndex = null;
  slugRegistry = null;
  brandsData = null;
}
