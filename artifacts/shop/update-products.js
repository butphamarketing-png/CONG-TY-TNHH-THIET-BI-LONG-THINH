import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, 'src', 'data', 'products.imported.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Get all products (since we just want to mark first 36 as featured/new/bestseller)
const vsProducts = products; // Let's just use all products for now

// Set first 12 as featured
vsProducts.slice(0, 12).forEach(p => {
  p.isFeatured = true;
  p.isNew = false;
  p.isBestSeller = false;
});

// Set next 12 as new
vsProducts.slice(12, 24).forEach(p => {
  p.isFeatured = false;
  p.isNew = true;
  p.isBestSeller = false;
});

// Set next 12 as best seller
vsProducts.slice(24, 36).forEach(p => {
  p.isFeatured = false;
  p.isNew = false;
  p.isBestSeller = true;
});

// Write back
fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
console.log('Updated products!');
