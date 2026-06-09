
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../src/data');
const productsImportedPath = path.join(DATA_DIR, 'products.imported.json');
const productsIndexPath = path.join(DATA_DIR, 'products-index.json');

// Load imported products
console.log('Loading products.imported.json...');
const products = JSON.parse(fs.readFileSync(productsImportedPath, 'utf8'));
console.log(`Loaded ${products.length} products`);

// Group products by category slug
console.log('Grouping products by category...');
const productsByCategory = {};
products.forEach(product => {
  const slug = product.categorySlug;
  if (!productsByCategory[slug]) {
    productsByCategory[slug] = [];
  }
  productsByCategory[slug].push(product);
});

const categories = [];

// Write category chunks
console.log('Writing category chunks...');
for (const [slug, categoryProducts] of Object.entries(productsByCategory)) {
  // Generate safe filename
  const safeSlug = slug.replace(/[^a-z0-9-_]/gi, '-');
  const filename = `products-${safeSlug}.json`;
  const filepath = path.join(DATA_DIR, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(categoryProducts, null, 2));
  
  categories.push({
    slug,
    count: categoryProducts.length,
    file: filename
  });
  
  console.log(`  Wrote ${filename} (${categoryProducts.length} products)`);
}

// Update products-index.json
console.log('Updating products-index.json...');
const productsIndex = {
  categories,
  totalProducts: products.length,
  totalCategories: categories.length
};

fs.writeFileSync(productsIndexPath, JSON.stringify(productsIndex, null, 2));
console.log(`Updated products-index.json (${products.length} total products, ${categories.length} categories)`);

console.log('\n✅ Done!');
