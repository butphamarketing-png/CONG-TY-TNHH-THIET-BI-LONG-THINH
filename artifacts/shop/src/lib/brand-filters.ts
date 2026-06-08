import type { BrandFilterTile } from "@/types/catalog";

/**
 * TDM "Lọc tìm kiếm" brand filter tiles per category slug.
 * Pattern from https://www.tdm.vn/bon-cau-1-khoi
 */
export const CATEGORY_BRAND_FILTERS: Record<string, BrandFilterTile[]> = {
  "bon-cau-1-khoi": [
    { id: "bf-1", name: "Bồn Cầu Viglacera 1 Khối", slug: "bon-cau-viglacera-1-khoi", categorySlug: "bon-cau-1-khoi", brandSlug: "viglacera", sortOrder: 1 },
    { id: "bf-2", name: "Bồn Cầu American 1 Khối", slug: "bon-cau-american-1-khoi", categorySlug: "bon-cau-1-khoi", brandSlug: "american-standard", sortOrder: 2 },
    { id: "bf-3", name: "Bồn Cầu Caesar 1 Khối", slug: "bon-cau-caesar-1-khoi", categorySlug: "bon-cau-1-khoi", brandSlug: "caesar", sortOrder: 3 },
    { id: "bf-4", name: "Bồn Cầu INAX 1 Khối", slug: "bon-cau-inax-1-khoi", categorySlug: "bon-cau-1-khoi", brandSlug: "inax", sortOrder: 4 },
    { id: "bf-5", name: "Bồn Cầu TOTO 1 Khối", slug: "bon-cau-toto-1-khoi", categorySlug: "bon-cau-1-khoi", brandSlug: "toto", sortOrder: 5 },
    { id: "bf-6", name: "Bồn Cầu COTTO 1 Khối", slug: "bon-cau-cotto-1-khoi", categorySlug: "bon-cau-1-khoi", brandSlug: "cotto", sortOrder: 6 },
    { id: "bf-7", name: "Bồn Cầu Nahm 1 Khối", slug: "bon-cau-nahm-1-khoi", categorySlug: "bon-cau-1-khoi", brandSlug: "nahm", sortOrder: 7 },
  ],
  "thiet-bi-ve-sinh": [
    { id: "vs-1", name: "Bồn Cầu Vệ Sinh", slug: "bon-cau", categorySlug: "bon-cau", sortOrder: 1 },
    { id: "vs-2", name: "Bồn Tiểu Nam Nữ", slug: "bon-tieu", categorySlug: "bon-tieu", sortOrder: 2 },
    { id: "vs-3", name: "Vòi Rửa Cảm Ứng", slug: "voi-cam-ung", categorySlug: "voi-cam-ung", sortOrder: 3 },
    { id: "vs-4", name: "Vòi Sen Tắm Âm Tường", slug: "sen-am-tuong", categorySlug: "sen-am-tuong", sortOrder: 4 },
    { id: "vs-5", name: "Bộ Vòi Sen Bồn Tắm", slug: "voi-bon-tam", categorySlug: "voi-bon-tam", sortOrder: 5 },
    { id: "vs-6", name: "Phụ Kiện Phòng Tắm", slug: "phu-kien-phong-tam", categorySlug: "phu-kien-phong-tam", sortOrder: 6 },
  ],
};

export function getBrandFiltersForCategory(slug: string): BrandFilterTile[] {
  return CATEGORY_BRAND_FILTERS[slug] ?? [];
}
