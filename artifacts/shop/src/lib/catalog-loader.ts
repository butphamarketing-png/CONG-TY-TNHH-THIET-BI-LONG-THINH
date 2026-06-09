import type { TdmProduct } from '@/types/product';
import type { Brand } from '@/types/catalog';

// Cache for loaded product chunks
const productChunkCache = new Map<string, TdmProduct[]>();
let productsIndex: any = null;
let brandsImported: any = null;

// Initialize data
async function initializeLoader() {
  if (productsIndex && brandsImported) return;
  
  try {
    // Fetch products index
    const indexRes = await fetch('/data/products-index.json');
    if (indexRes.ok) {
      productsIndex = await indexRes.json();
    }
    
    // Fetch brands
    const brandsRes = await fetch('/data/brands.imported.json');
    if (brandsRes.ok) {
      brandsImported = await brandsRes.json();
    }
  } catch (error) {
    console.error('Failed to initialize catalog loader:', error);
  }
}

// Load products by category slug (lazy loading)
export async function loadProductsByCategory(categorySlug: string): Promise<TdmProduct[]> {
  await initializeLoader();
  
  // Check cache first
  if (productChunkCache.has(categorySlug)) {
    return productChunkCache.get(categorySlug)!;
  }

  try {
    // Find the chunk file for this category
    const categoryChunk = productsIndex?.categories?.find((c: any) => c.slug === categorySlug);
    
    if (!categoryChunk) {
      console.warn(`No product chunk found for category: ${categorySlug}`);
      return [];
    }

    // Fetch the chunk from public/data
    const chunkRes = await fetch(`/data/${categoryChunk.file}`);
    if (!chunkRes.ok) {
      console.error(`Failed to load chunk file: ${categoryChunk.file}`);
      return [];
    }
    
    const products = await chunkRes.json();
    
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
  await initializeLoader();
  const allProducts: TdmProduct[] = [];
  
  // Load all category chunks in parallel
  const loadPromises = productsIndex?.categories?.map(async (category: any) => {
    const products = await loadProductsByCategory(category.slug);
    return products;
  }) || [];
  
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
export async function getImportedBrands(): Promise<Brand[]> {
  await initializeLoader();
  return (brandsImported || []).map((brand: any) => ({
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
export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const brands = await getImportedBrands();
  return brands.find(b => b.slug === slug) || null;
}

// Get category product count
export async function getCategoryProductCount(categorySlug: string): Promise<number> {
  await initializeLoader();
  const categoryChunk = productsIndex?.categories?.find((c: any) => c.slug === categorySlug);
  return categoryChunk?.count || 0;
}

// Get total product count
export async function getTotalProductCount(): Promise<number> {
  await initializeLoader();
  return productsIndex?.totalProducts || 0;
}
