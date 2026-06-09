import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';

// Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CRAWLER_DIR = path.resolve(__dirname, '../../tdm-crawler');
const OUTPUT_DIR = path.resolve(__dirname, '../artifacts/shop/src/data');

// Type definitions
interface CsvProduct {
  sku: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: string;
  original_price: string;
  discount_percent: string;
  short_description: string;
  full_description: string;
  seo_title: string;
  seo_description: string;
  product_url: string;
}

interface CsvBrand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url: string;
}

interface CsvCategory {
  id: string;
  name: string;
  slug: string;
  parent_slug: string;
  description: string;
}

interface CsvImage {
  sku: string;
  image_url: string;
  sort_order: string;
}

interface CsvSpecification {
  sku: string;
  attribute_name: string;
  attribute_value: string;
}

// Data storage
const products = new Map<string, any>();
const brands = new Map<string, any>();
const categories = new Map<string, any>();
const images = new Map<string, any[]>();
const specifications = new Map<string, any[]>();

// Import report
const report = {
  totalProducts: 0,
  totalBrands: 0,
  totalCategories: 0,
  errors: [] as string[],
  warnings: [] as string[],
  unmappedProducts: [] as string[],
  unmappedBrands: [] as string[],
  unmappedCategories: [] as string[],
};

// Read CSV files
async function readCSV<T>(filePath: string, processor: (row: any) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        processor(row);
      })
      .on('end', () => {
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Import brands
async function importBrands() {
  console.log('Importing brands...');
  await readCSV<CsvBrand>(
    path.join(CRAWLER_DIR, 'brands.csv'),
    (row) => {
      const brand: CsvBrand = row;
      brands.set(brand.slug, {
        id: parseInt(brand.id),
        name: brand.name,
        slug: brand.slug,
        description: brand.description,
        logo: brand.logo_url,
        industryGroups: [],
        sortOrder: parseInt(brand.id),
      });
    }
  );
  report.totalBrands = brands.size;
  console.log(`Imported ${brands.size} brands`);
}

// Import categories
async function importCategories() {
  console.log('Importing categories...');
  await readCSV<CsvCategory>(
    path.join(CRAWLER_DIR, 'categories.csv'),
    (row) => {
      const category: CsvCategory = row;
      categories.set(category.slug, {
        id: parseInt(category.id),
        name: category.name,
        slug: category.slug,
        parentSlug: category.parent_slug || null,
        description: category.description,
        level: category.parent_slug ? 2 : 1,
        sortOrder: parseInt(category.id),
      });
    }
  );
  report.totalCategories = categories.size;
  console.log(`Imported ${categories.size} categories`);
}

// Import images
async function importImages() {
  console.log('Importing images...');
  await readCSV<CsvImage>(
    path.join(CRAWLER_DIR, 'images_100.csv'),
    (row) => {
      const image: CsvImage = row;
      if (!images.has(image.sku)) {
        images.set(image.sku, []);
      }
      images.get(image.sku)!.push({
        url: image.image_url,
        alt: '',
        sortOrder: parseInt(image.sort_order),
      });
    }
  );
  console.log(`Imported images for ${images.size} products`);
}

// Import specifications
async function importSpecifications() {
  console.log('Importing specifications...');
  await readCSV<CsvSpecification>(
    path.join(CRAWLER_DIR, 'specifications_100.csv'),
    (row) => {
      const spec: CsvSpecification = row;
      if (!specifications.has(spec.sku)) {
        specifications.set(spec.sku, []);
      }
      specifications.get(spec.sku)!.push({
        name: spec.attribute_name,
        value: spec.attribute_value,
      });
    }
  );
  console.log(`Imported specifications for ${specifications.size} products`);
}

// Import products
async function importProducts() {
  console.log('Importing products...');
  let count = 0;
  
  await readCSV<CsvProduct>(
    path.join(CRAWLER_DIR, 'products_100.csv'),
    (row) => {
      const product: CsvProduct = row;
      count++;
      
      // Validate required fields
      if (!product.sku || !product.name || !product.slug) {
        report.warnings.push(`Missing required fields for product: ${product.sku || 'unknown'}`);
        return;
      }

      // Check brand mapping
      const brandSlug = product.brand.toLowerCase();
      if (!brands.has(brandSlug)) {
        report.unmappedBrands.push(product.brand);
      }

      // Check category mapping
      const categorySlug = product.category.toLowerCase().replace(/\s+/g, '-');
      if (!categories.has(categorySlug)) {
        report.unmappedCategories.push(product.category);
      }

      // Get product images
      const productImages = images.get(product.sku) || [];
      const thumbnail = productImages.length > 0 ? productImages[0].url : '';

      // Get product specifications
      const productSpecs = specifications.get(product.sku) || [];

      // Create product object
      const productData = {
        id: count,
        sku: product.sku,
        name: product.name,
        slug: product.slug,
        price: parseInt(product.price) || 0,
        originalPrice: parseInt(product.original_price) || 0,
        discount: parseInt(product.discount_percent) || 0,
        shortDescription: product.short_description || '',
        fullDescription: product.full_description || '',
        seoTitle: product.seo_title || product.name,
        seoDescription: product.seo_description || product.short_description || '',
        brandSlug: brandSlug,
        brandName: product.brand,
        categorySlug: categorySlug,
        categoryName: product.category,
        thumbnail,
        images: productImages,
        attributes: productSpecs.slice(0, 10).map((spec, i) => ({
          name: spec.name,
          value: spec.value,
        })),
        inStock: true,
        stockCount: 10,
        soldCount: Math.floor(Math.random() * 100),
        rating: (4 + Math.random()).toFixed(1),
        reviewCount: Math.floor(Math.random() * 50),
        isFeatured: Math.random() > 0.8,
        isBestSeller: Math.random() > 0.7,
        isNew: Math.random() > 0.9,
        isOnSale: parseInt(product.discount_percent) > 0,
        badges: [],
        tags: [],
        createdAt: new Date().toISOString().split('T')[0],
      };

      products.set(product.sku, productData);
    }
  );
  
  report.totalProducts = products.size;
  console.log(`Imported ${products.size} products`);
}

// Generate chunked data by category
function generateChunkedData() {
  console.log('Generating chunked data by category...');
  
  const categoryChunks = new Map<string, any[]>();
  
  products.forEach((product) => {
    const categorySlug = product.categorySlug;
    if (!categoryChunks.has(categorySlug)) {
      categoryChunks.set(categorySlug, []);
    }
    categoryChunks.get(categorySlug)!.push(product);
  });

  // Write category chunks
  categoryChunks.forEach((chunkProducts, categorySlug) => {
    const filePath = path.join(OUTPUT_DIR, `products-${categorySlug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(chunkProducts, null, 2));
  });

  // Write index file
  const index = {
    categories: Array.from(categoryChunks.keys()).map(slug => ({
      slug,
      count: categoryChunks.get(slug)!.length,
      file: `products-${slug}.json`,
    })),
    totalProducts: products.size,
    totalCategories: categoryChunks.size,
  };
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'products-index.json'),
    JSON.stringify(index, null, 2)
  );

  console.log(`Generated ${categoryChunks.size} category chunks`);
}

// Generate brand data
function generateBrandData() {
  console.log('Generating brand data...');
  
  const brandData = Array.from(brands.values()).map((brand) => ({
    ...brand,
    productCount: Array.from(products.values()).filter(p => p.brandSlug === brand.slug).length,
  }));

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'brands.imported.json'),
    JSON.stringify(brandData, null, 2)
  );

  console.log(`Generated brand data for ${brandData.length} brands`);
}

// Generate import report
function generateReport() {
  console.log('Generating import report...');
  
  const reportPath = path.join(OUTPUT_DIR, 'import-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log('\n=== IMPORT REPORT ===');
  console.log(`Total Products: ${report.totalProducts}`);
  console.log(`Total Brands: ${report.totalBrands}`);
  console.log(`Total Categories: ${report.totalCategories}`);
  console.log(`Errors: ${report.errors.length}`);
  console.log(`Warnings: ${report.warnings.length}`);
  console.log(`Unmapped Brands: ${[...new Set(report.unmappedBrands)].length}`);
  console.log(`Unmapped Categories: ${[...new Set(report.unmappedCategories)].length}`);
  console.log(`Report saved to: ${reportPath}`);
}

// Main execution
async function main() {
  try {
    console.log('Starting catalog import...\n');
    
    await importBrands();
    await importCategories();
    await importImages();
    await importSpecifications();
    await importProducts();
    
    generateChunkedData();
    generateBrandData();
    generateReport();
    
    console.log('\n✓ Catalog import completed successfully');
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

main();
