import type {
  BrandMapEntry,
  CrawlerImageRow,
  CrawlerProductRow,
  CrawlerSpecRow,
  ImportedTdmProduct,
  ShopCategory,
} from "./types.js";

function parseNumber(value: string | undefined): number | undefined {
  if (!value || value.trim() === "") return undefined;
  const n = Number(value.replace(/,/g, ""));
  return Number.isFinite(n) ? n : undefined;
}

function cleanText(value: string | undefined): string {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

function cleanAttributeName(name: string): string {
  return name
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

function extractVideoUrl(html: string): string | undefined {
  const embedMatch = html.match(
    /(?:youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  if (embedMatch) {
    return `https://www.youtube.com/embed/${embedMatch[1]}`;
  }
  const watchMatch = html.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  return undefined;
}

function buildImages(
  sku: string,
  name: string,
  imageRows: CrawlerImageRow[],
): { thumbnail: string; images: { url: string; alt: string }[] } {
  const sorted = [...imageRows].sort(
    (a, b) => Number(a.sort_order) - Number(b.sort_order),
  );
  const urls = sorted
    .map((r) => r.image_url?.trim())
    .filter((u) => u && u.length > 0);

  const thumbnail = urls[0] ?? "";
  const images = urls.map((url, i) => ({
    url,
    alt: i === 0 ? name : `${name} - ảnh ${i + 1}`,
  }));

  return { thumbnail, images };
}

function buildAttributes(specRows: CrawlerSpecRow[]): { name: string; value: string }[] {
  const seen = new Set<string>();
  const attrs: { name: string; value: string }[] = [];

  for (const row of specRows) {
    const name = cleanAttributeName(row.attribute_name);
    const value = cleanText(row.attribute_value);
    if (!name || !value) continue;
    const key = `${name}::${value}`;
    if (seen.has(key)) continue;
    seen.add(key);
    attrs.push({ name, value });
  }

  return attrs;
}

export function mapCrawlerRowToProduct(
  row: CrawlerProductRow,
  id: number,
  category: ShopCategory,
  brand: BrandMapEntry,
  specRows: CrawlerSpecRow[],
  imageRows: CrawlerImageRow[],
): ImportedTdmProduct {
  const price = parseNumber(row.price) ?? 0;
  const originalPrice = parseNumber(row.original_price);
  const discount = parseNumber(row.discount_percent);
  const hasDiscount =
    originalPrice != null && originalPrice > price && price > 0;

  const { thumbnail, images } = buildImages(row.sku, row.name, imageRows);
  const attributes = buildAttributes(specRows);
  const fullDescription = row.full_description ?? "";
  const videoUrl = extractVideoUrl(fullDescription);

  return {
    id,
    name: cleanText(row.name),
    slug: cleanText(row.slug),
    sku: cleanText(row.sku),
    price,
    originalPrice: hasDiscount ? originalPrice : undefined,
    discount: hasDiscount ? Math.round(discount ?? 0) || undefined : undefined,
    thumbnail,
    images,
    videoUrl,
    categoryId: category.id,
    categorySlug: category.slug,
    categoryName: category.name,
    brandId: brand.brandId,
    brandSlug: brand.brandSlug,
    brandName: brand.brandName,
    inStock: true,
    stockCount: 10,
    soldCount: 0,
    viewCount: 0,
    rating: 4.5,
    reviewCount: 0,
    tags: [],
    badges: hasDiscount ? ["sale"] : [],
    isFeatured: false,
    isBestSeller: false,
    isNew: false,
    isOnSale: hasDiscount,
    isDiscontinued: false,
    shortDescription: cleanText(row.short_description) || undefined,
    fullDescription: fullDescription || undefined,
    attributes,
    variants: [],
    attachments: [],
    showroomStock: [],
    contactForPrice: false,
    seoTitle: cleanText(row.seo_title) || undefined,
    seoDescription: cleanText(row.seo_description) || undefined,
    createdAt: new Date().toISOString().slice(0, 10),
  };
}
