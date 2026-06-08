/** Shared types for Phase 0 product import pipeline */

export interface CrawlerProductRow {
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

export interface CrawlerSpecRow {
  sku: string;
  attribute_name: string;
  attribute_value: string;
}

export interface CrawlerImageRow {
  sku: string;
  image_url: string;
  sort_order: string;
}

export interface BrandMapEntry {
  brandId: number;
  brandSlug: string;
  brandName: string;
}

export interface ShopCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ImportedTdmProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  thumbnail: string;
  images: { url: string; alt: string }[];
  videoUrl?: string;
  categoryId: number;
  categorySlug: string;
  categoryName: string;
  brandId: number;
  brandSlug: string;
  brandName: string;
  inStock: boolean;
  stockCount?: number;
  soldCount: number;
  viewCount?: number;
  rating?: number;
  reviewCount?: number;
  tags: string[];
  badges: ("bestseller" | "new" | "sale" | "discontinued" | "featured")[];
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  isOnSale: boolean;
  isDiscontinued: boolean;
  shortDescription?: string;
  fullDescription?: string;
  attributes: { name: string; value: string }[];
  variants: [];
  attachments: [];
  showroomStock: [];
  contactForPrice: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
}

export type IssueSeverity = "error" | "warning";

export interface ImportIssue {
  severity: IssueSeverity;
  code: string;
  sku: string;
  slug: string;
  message: string;
  field?: string;
}

export interface ImportReport {
  generatedAt: string;
  source: {
    productsCsv: string;
    specificationsCsv: string;
    imagesCsv: string;
    limit: number;
  };
  summary: {
    totalRows: number;
    imported: number;
    errors: number;
    warnings: number;
    passed: boolean;
  };
  mapping: {
    categoryMappedPercent: number;
    brandMappedPercent: number;
    withThumbnailPercent: number;
    withSeoTitlePercent: number;
    withSeoDescriptionPercent: number;
    withExtraImagesPercent: number;
    withSpecificationsPercent: number;
  };
  duplicates: {
    sku: string[];
    slug: string[];
  };
  issues: ImportIssue[];
}
