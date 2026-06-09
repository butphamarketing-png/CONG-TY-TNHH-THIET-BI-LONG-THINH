/**
 * Comprehensive data import script for TDM catalog
 * Imports all products, brands, categories, images, and specifications from CSV files
 */

import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CRAWLER_DIR = path.resolve(__dirname, '../../../../tdm-crawler');
const DATA_DIR = path.resolve(__dirname, '../src/data');

// Data storage
const products = new Map();
const brands = new Map();
const categories = new Map();
const images = new Map(); // sku -> array of image URLs
const specifications = new Map(); // sku -> array of specifications

// Import statistics
const stats = {
  totalProducts: 0,
  totalBrands: 0,
  totalCategories: 0,
  totalImages: 0,
  totalSpecifications: 0,
  errors: [],
  warnings: [],
  unmappedCategories: new Set(),
  unmappedBrands: new Set()
};

// Helper: Parse CSV file
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

// Helper: Slugify Vietnamese text
function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Helper: Parse price from string
function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const cleaned = priceStr.toString().replace(/[^\d]/g, '');
  return parseInt(cleaned, 10) || 0;
}

// Helper: Parse discount percentage
function parseDiscount(discountStr) {
  if (!discountStr) return 0;
  const cleaned = discountStr.toString().replace(/[^\d]/g, '');
  return parseInt(cleaned, 10) || 0;
}

// Import brands
async function importBrands() {
  console.log('Importing brands...');
  try {
    const brandsData = await parseCSV(path.join(CRAWLER_DIR, 'brands.csv'));
    
    brandsData.forEach((row, index) => {
      if (!row.name || !row.slug) return;
      
      const brand = {
        id: parseInt(row.id) || index + 1,
        name: row.name.trim(),
        slug: row.slug.trim(),
        description: row.description || `Thương hiệu ${row.name} chính hãng`,
        logo: row.logo_url || '',
        industryGroups: [],
        isFeatured: index < 3, // First 3 brands are featured
        sortOrder: index + 1,
        productCount: 0
      };
      
      brands.set(brand.slug, brand);
      stats.totalBrands++;
    });
    
    console.log(`✓ Imported ${stats.totalBrands} brands`);
  } catch (error) {
    console.error('Error importing brands:', error);
    stats.errors.push(`Brands import failed: ${error.message}`);
  }
}

// Import categories
async function importCategories() {
  console.log('Importing categories...');
  try {
    const categoriesData = await parseCSV(path.join(CRAWLER_DIR, 'categories.csv'));
    
    categoriesData.forEach((row, index) => {
      if (!row.name || !row.slug) return;
      
      const category = {
        id: parseInt(row.id) || index + 1,
        name: row.name.trim(),
        slug: row.slug.trim(),
        parentSlug: row.parent_slug || null,
        description: row.description || ''
      };
      
      categories.set(category.slug, category);
      stats.totalCategories++;
    });
    
    console.log(`✓ Imported ${stats.totalCategories} categories`);
  } catch (error) {
    console.error('Error importing categories:', error);
    stats.errors.push(`Categories import failed: ${error.message}`);
  }
}

// Import images
async function importImages() {
  console.log('Importing images...');
  try {
    const imagesData = await parseCSV(path.join(CRAWLER_DIR, 'images_100.csv'));
    
    imagesData.forEach((row) => {
      if (!row.sku || !row.image_url) return;
      
      const sku = row.sku.trim();
      const imageUrl = row.image_url.trim();
      const sortOrder = parseInt(row.sort_order) || 0;
      
      if (!images.has(sku)) {
        images.set(sku, []);
      }
      
      images.get(sku).push({
        url: imageUrl,
        alt: imageUrl,
        sortOrder
      });
      
      stats.totalImages++;
    });
    
    console.log(`✓ Imported ${stats.totalImages} image mappings`);
  } catch (error) {
    console.error('Error importing images:', error);
    stats.errors.push(`Images import failed: ${error.message}`);
  }
}

// Import specifications
async function importSpecifications() {
  console.log('Importing specifications...');
  try {
    const specsData = await parseCSV(path.join(CRAWLER_DIR, 'specifications_100.csv'));
    
    specsData.forEach((row) => {
      if (!row.sku || !row.attribute_name) return;
      
      const sku = row.sku.trim();
      const attributeName = row.attribute_name.trim();
      const attributeValue = row.attribute_value ? row.attribute_value.trim() : '';
      
      if (!specifications.has(sku)) {
        specifications.set(sku, []);
      }
      
      specifications.get(sku).push({
        name: attributeName,
        value: attributeValue
      });
      
      stats.totalSpecifications++;
    });
    
    console.log(`✓ Imported ${stats.totalSpecifications} specification entries`);
  } catch (error) {
    console.error('Error importing specifications:', error);
    stats.errors.push(`Specifications import failed: ${error.message}`);
  }
}

// Import products
async function importProducts() {
  console.log('Importing products...');
  try {
    const productsData = await parseCSV(path.join(CRAWLER_DIR, 'products_100.csv'));
    
    let productIdCounter = 1;
    
    productsData.forEach((row) => {
      if (!row.sku || !row.name) return;
      
      const sku = row.sku.trim();
      const name = row.name.trim();
      const slug = row.slug ? row.slug.trim() : slugify(name);
      
      // Find or create brand
      let brandSlug = slugify(row.brand || '');
      let brandName = row.brand ? row.brand.trim() : '';
      let brandId = 1;
      
      if (brands.has(brandSlug)) {
        brandId = brands.get(brandSlug).id;
        brands.get(brandSlug).productCount++;
      } else if (brandName) {
        // Create brand on-the-fly
        const newBrand = {
          id: brands.size + 1,
          name: brandName,
          slug: brandSlug,
          description: `Thương hiệu ${brandName} chính hãng`,
          logo: '',
          industryGroups: [],
          isFeatured: false,
          sortOrder: brands.size + 1,
          productCount: 1
        };
        brands.set(brandSlug, newBrand);
        brandId = newBrand.id;
        stats.totalBrands++;
        stats.warnings.push(`Created brand on-the-fly: ${brandName}`);
      } else {
        stats.unmappedBrands.add(sku);
      }
      
      // Find or create category
      let categorySlug = slugify(row.category || '');
      let categoryName = row.category ? row.category.trim() : '';
      let categoryId = 1;
      
      if (categories.has(categorySlug)) {
        categoryId = categories.get(categorySlug).id;
      } else if (categoryName) {
        // Create category on-the-fly
        const newCategory = {
          id: categories.size + 1,
          name: categoryName,
          slug: categorySlug,
          parentSlug: null,
          description: ''
        };
        categories.set(categorySlug, newCategory);
        categoryId = newCategory.id;
        stats.totalCategories++;
        stats.warnings.push(`Created category on-the-fly: ${categoryName}`);
      } else {
        stats.unmappedCategories.add(sku);
      }
      
      // Parse prices
      const price = parsePrice(row.price);
      const originalPrice = parsePrice(row.original_price);
      const discountPercent = parseDiscount(row.discount_percent);
      
      // Get images for this product
      const productImages = images.get(sku) || [];
      const thumbnail = productImages.length > 0 ? productImages[0].url : '';
      
      // Get specifications for this product
      const productSpecs = specifications.get(sku) || [];
      const attributes = productSpecs.slice(0, 10).map(spec => ({
        name: spec.name,
        value: spec.value
      }));
      
      // Create product
      const product = {
        id: productIdCounter++,
        name: name,
        slug: slug,
        sku: sku,
        price: price,
        originalPrice: originalPrice,
        discount: discountPercent,
        thumbnail: thumbnail,
        images: productImages,
        videoUrl: '',
        categoryId: categoryId,
        categorySlug: categorySlug,
        categoryName: categoryName,
        brandId: brandId,
        brandSlug: brandSlug,
        brandName: brandName,
        inStock: true,
        stockCount: 10,
        soldCount: 0,
        viewCount: 0,
        rating: 4.5,
        reviewCount: 0,
        tags: [],
        badges: price < originalPrice ? ['sale'] : [],
        isFeatured: false,
        isBestSeller: false,
        isNew: false,
        isOnSale: price < originalPrice,
        isDiscontinued: false,
        shortDescription: row.short_description ? row.short_description.trim().substring(0, 200) : '',
        fullDescription: row.full_description || row.short_description || '',
        attributes: attributes,
        variants: [],
        attachments: [],
        showroomStock: [
          { showroomId: 1, showroomName: "Showroom", inStock: true, quantity: 5 }
        ],
        cashbackAmount: undefined,
        contactForPrice: false,
        seoTitle: row.seo_title || name,
        seoDescription: row.seo_description || row.short_description || '',
        seoKeywords: row.seo_keywords || '',
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      products.set(sku, product);
      stats.totalProducts++;
      
      // Progress logging
      if (stats.totalProducts % 10000 === 0) {
        console.log(`  Progress: ${stats.totalProducts} products imported...`);
      }
    });
    
    console.log(`✓ Imported ${stats.totalProducts} products`);
  } catch (error) {
    console.error('Error importing products:', error);
    stats.errors.push(`Products import failed: ${error.message}`);
  }
}

// Save imported data
async function saveData() {
  console.log('Saving imported data...');
  
  try {
    // Save products
    const productsArray = Array.from(products.values());
    fs.writeFileSync(
      path.join(DATA_DIR, 'products.imported.json'),
      JSON.stringify(productsArray, null, 2)
    );
    
    // Save brands
    const brandsArray = Array.from(brands.values());
    fs.writeFileSync(
      path.join(DATA_DIR, 'brands.imported.json'),
      JSON.stringify(brandsArray, null, 2)
    );
    
    // Save categories
    const categoriesArray = Array.from(categories.values());
    fs.writeFileSync(
      path.join(DATA_DIR, 'categories.imported.json'),
      JSON.stringify(categoriesArray, null, 2)
    );
    
    console.log('✓ Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    stats.errors.push(`Data save failed: ${error.message}`);
  }
}

// Generate import report
function generateReport() {
  console.log('Generating import report...');
  
  const report = {
    timestamp: new Date().toISOString(),
    totalProducts: stats.totalProducts,
    totalBrands: stats.totalBrands,
    totalCategories: stats.totalCategories,
    totalImages: stats.totalImages,
    totalSpecifications: stats.totalSpecifications,
    errors: stats.errors,
    warnings: stats.warnings,
    unmappedProducts: Array.from(stats.unmappedCategories).slice(0, 100),
    unmappedBrands: Array.from(stats.unmappedBrands).slice(0, 100)
  };
  
  fs.writeFileSync(
    path.join(DATA_DIR, 'import-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('✓ Import report generated');
  console.log('\n=== IMPORT SUMMARY ===');
  console.log(`Products: ${stats.totalProducts}`);
  console.log(`Brands: ${stats.totalBrands}`);
  console.log(`Categories: ${stats.totalCategories}`);
  console.log(`Images: ${stats.totalImages}`);
  console.log(`Specifications: ${stats.totalSpecifications}`);
  console.log(`Errors: ${stats.errors.length}`);
  console.log(`Warnings: ${stats.warnings.length}`);
}

// Main execution
async function main() {
  console.log('=== TDM CATALOG IMPORT ===\n');
  
  await importBrands();
  await importCategories();
  await importImages();
  await importSpecifications();
  await importProducts();
  await saveData();
  generateReport();
  
  console.log('\n=== IMPORT COMPLETE ===');
}

main().catch(console.error);
