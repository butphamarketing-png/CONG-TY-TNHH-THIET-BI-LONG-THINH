/** TDM-compatible product model — single source of truth for Phase A+ */

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductAttachment {
  id: string;
  name: string;
  url: string;
  type: "pdf" | "catalog" | "manual" | "spec" | "other";
  sizeLabel?: string;
}

export interface ProductVariant {
  id: number;
  name: string;
  value: string;
  sku?: string;
  price?: number;
  originalPrice?: number;
  inStock: boolean;
  thumbnail?: string;
}

export interface ProductAttribute {
  name: string;
  value: string;
}

export interface ShowroomStock {
  showroomId: number;
  showroomName: string;
  inStock: boolean;
  quantity?: number;
}

/** Listing + detail badges aligned with tdm.vn */
export type ProductBadge = "bestseller" | "new" | "sale" | "discontinued" | "featured";

export interface TdmProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  originalPrice?: number;
  discount?: number;

  thumbnail: string;
  images: ProductImage[];
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
  badges: ProductBadge[];
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  isOnSale: boolean;
  isDiscontinued: boolean;

  shortDescription?: string;
  fullDescription?: string;
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  attachments: ProductAttachment[];
  showroomStock: ShowroomStock[];

  /** HOÀN TIỀN — VND amount shown on TDM cards */
  cashbackAmount?: number;
  /** "(liên hệ để có giá tốt hơn)" */
  contactForPrice: boolean;

  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
}

export interface ProductListParams {
  categorySlug?: string;
  categorySlugs?: string[];
  brandSlug?: string;
  brandSlugs?: string[];
  q?: string;
  sort?: "bestseller" | "newest" | "price_asc" | "price_desc" | "default";
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
}

export interface ProductListResult {
  data: TdmProduct[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
