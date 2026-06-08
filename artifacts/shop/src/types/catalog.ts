export type IndustryGroup =
  | "thiet-bi-ve-sinh"
  | "thiet-bi-bep"
  | "thiet-bi-nuoc"
  | "thiet-bi-dien"
  | "thiet-bi-khoa"
  | "gach-op-lat"
  | "phu-kien";

/** 6 groups shown in TDM mega menu + homepage */
export type TdmMenuGroup =
  | "thiet-bi-ve-sinh"
  | "thiet-bi-bep"
  | "thiet-bi-nuoc"
  | "thiet-bi-khoa"
  | "thiet-bi-dien";

export interface CategorySeoContent {
  title: string;
  metaDescription?: string;
  /** HTML content block at bottom of category page (TDM style) */
  html: string;
  /** Optional price reference tables */
  priceTableHtml?: string;
}

/** Brand-as-filter tile on category page — e.g. "Bồn Cầu TOTO 1 Khối" */
export interface BrandFilterTile {
  id: string;
  name: string;
  slug: string;
  /** Target category slug when clicked */
  categorySlug: string;
  brandSlug?: string;
  tileImage?: string;
  sortOrder: number;
}

export interface CategoryNode {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  groupSlug: IndustryGroup;
  icon?: string;
  tileImage?: string;
  banner?: string;
  description?: string;
  showBrandTiles?: boolean;
  showProductGrid?: boolean;
  /** Show on homepage industry block (TDM L2 tiles) */
  showOnHomepage?: boolean;
  homepageOrder?: number;
  sortOrder: number;
  children?: CategoryNode[];
  /** Sidebar + tile brand filters for this category */
  brandFilters?: BrandFilterTile[];
  /** SEO block — inline or resolved from category-seo.ts */
  seo?: CategorySeoContent;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
  industryGroups: IndustryGroup[];
  isFeatured: boolean;
  sortOrder: number;
  description?: string;
  banner?: string;
  featuredProducts?: number[];
  news?: number[];
  /** TDM brand page SEO title */
  seoTitle?: string;
}

export const INDUSTRY_GROUP_LABELS: Record<IndustryGroup, string> = {
  "thiet-bi-ve-sinh": "Thiết bị vệ sinh",
  "thiet-bi-bep": "Thiết bị bếp",
  "thiet-bi-nuoc": "Vật liệu nước",
  "thiet-bi-dien": "Thiết bị điện",
  "thiet-bi-khoa": "Thiết bị khóa cửa",
  "gach-op-lat": "Gạch ốp lát",
  "phu-kien": "Phụ kiện",
};

/** TDM mega menu + homepage industry order */
export const TDM_MENU_GROUPS: TdmMenuGroup[] = [
  "thiet-bi-ve-sinh",
  "thiet-bi-bep",
  "thiet-bi-nuoc",
  "thiet-bi-khoa",
  "thiet-bi-dien",
];

export type SlugEntityType = "category" | "brand" | "product";

export interface SlugEntry {
  type: SlugEntityType;
  slug: string;
}
