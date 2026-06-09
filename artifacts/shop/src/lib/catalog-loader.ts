import productsIndex from '@/data/products-index.json';
import brandsImported from '@/data/brands.imported.json';
import { CATEGORIES } from '@/lib/tdm-data';
import type { TdmProduct } from '@/types/product';
import type { Brand } from '@/types/catalog';

// Cache for loaded product chunks
const productChunkCache = new Map<string, TdmProduct[]>();

// Load products by category slug (lazy loading)
export async function loadProductsByCategory(categorySlug: string): Promise<TdmProduct[]> {
  // Check cache first
  if (productChunkCache.has(categorySlug)) {
    return productChunkCache.get(categorySlug)!;
  }

  try {
    // Find the chunk file for this category
    const categoryChunk = productsIndex.categories.find(c => c.slug === categorySlug);
    
    if (!categoryChunk) {
      console.warn(`No product chunk found for category: ${categorySlug}`);
      return [];
    }

    // Dynamically import the chunk
    const chunkModule = await import(`@/data/${categoryChunk.file}`);
    const products = chunkModule.default || chunkModule;
    
    // Cache the result
    productChunkCache.set(categorySlug, products);
    
    return products;
  } catch (error) {
    console.error(`Failed to load products for category ${categorySlug}:`, error);
    return [];
  }
}

// Load all products (for search/indexing)
export async function loadAllProducts(): Promise<TdmProduct[]> {
  const allProducts: TdmProduct[] = [];
  
  // Load all category chunks in parallel
  const loadPromises = productsIndex.categories.map(async (category) => {
    const products = await loadProductsByCategory(category.slug);
    return products;
  });
  
  const results = await Promise.all(loadPromises);
  results.forEach(products => {
    allProducts.push(...products);
  });
  
  return allProducts;
}

// Get product by SKU
export async function getProductBySku(sku: string): Promise<TdmProduct | null> {
  const allProducts = await loadAllProducts();
  return allProducts.find(p => p.sku === sku) || null;
}

// Get product by slug
export async function getProductBySlug(slug: string): Promise<TdmProduct | null> {
  const allProducts = await loadAllProducts();
  return allProducts.find(p => p.slug === slug) || null;
}

// Get products by brand
export async function getProductsByBrand(brandSlug: string): Promise<TdmProduct[]> {
  const allProducts = await loadAllProducts();
  return allProducts.filter(p => p.brandSlug === brandSlug);
}

// Search products
export async function searchProducts(query: string): Promise<TdmProduct[]> {
  const allProducts = await loadAllProducts();
  const lowerQuery = query.toLowerCase();
  
  return allProducts.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.sku.toLowerCase().includes(lowerQuery) ||
    p.brandName.toLowerCase().includes(lowerQuery) ||
    p.categoryName.toLowerCase().includes(lowerQuery)
  );
}

// Get imported brands
export function getImportedBrands(): Brand[] {
  return brandsImported.map(brand => ({
    id: brand.id,
    name: brand.name,
    slug: brand.slug,
    description: brand.description,
    logo: brand.logo,
    industryGroups: brand.industryGroups,
    sortOrder: brand.sortOrder,
  }));
}

// Get brand by slug
export function getBrandBySlug(slug: string): Brand | null {
  const brands = getImportedBrands();
  return brands.find(b => b.slug === slug) || null;
}

// Get category product count
export function getCategoryProductCount(categorySlug: string): number {
  const categoryChunk = productsIndex.categories.find(c => c.slug === categorySlug);
  return categoryChunk?.count || 0;
}

// Get total product count
export function getTotalProductCount(): number {
  return productsIndex.totalProducts;
}
