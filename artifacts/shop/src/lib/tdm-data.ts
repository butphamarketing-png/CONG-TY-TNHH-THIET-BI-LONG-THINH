/**
 * Static marketing/config data + backward-compatible re-exports.
 * Catalog entities (categories, brands, products) live in catalog-service.
 */
export { CATEGORIES } from "./categories-tree";
export { BRANDS } from "./brands-tree";

import { brandUrl, categoryUrl } from "@/lib/urls";

export const NEWS = [
  { id: 1, title: "Top 10 bồn cầu TOTO tốt nhất năm 2026", slug: "top-10-bon-cau-toto-tot-nhat-2026", excerpt: "Tổng hợp top 10 bồn cầu TOTO chất lượng, phổ biến nhất năm 2026", thumbnail: "https://placehold.co/800x450/f0f0f0/666666?text=TIN+TUC+TOTO", category: "Tin tức sản phẩm", brandSlug: "toto", viewCount: 3450, createdAt: "2026-06-01", content: "<p>Nội dung bài viết...</p>" },
  { id: 2, title: "Hướng dẫn chọn mua bếp từ Bosch chính hãng", slug: "huong-dan-chon-mua-bep-tu-bosch-chinh-hang", excerpt: "Bí quyết chọn mua bếp từ Bosch chính hãng, chất lượng tốt", thumbnail: "https://placehold.co/800x450/f0f0f0/666666?text=TIN+TUC+BOSCH", category: "Hướng dẫn mua hàng", brandSlug: "bosch", viewCount: 2100, createdAt: "2026-05-28", content: "<p>Nội dung bài viết...</p>" },
  { id: 3, title: "Khuyến mãi mùa hè 2026: Giảm sốc đến 50%", slug: "khuyen-mai-mua-he-2026", excerpt: "Chương trình khuyến mãi mùa hè 2026 với hàng ngàn sản phẩm giảm giá sốc", thumbnail: "https://placehold.co/800x450/f0f0f0/666666?text=KHUYEN+MAI", category: "Khuyến mãi", viewCount: 5600, createdAt: "2026-06-05", content: "<p>Nội dung bài viết...</p>" },
];

export const SHOWROOMS = [
  { id: 1, name: "TDM Center", address: "Số 203 Xuyên Á, P. Dĩ An, TPHCM", phone: "028.2244.8333", hours: "T2-T6: 7:30-18:00; T7: 7:30-17:00; CN: 8:00-11:00 & 14:00-16:30" },
  { id: 2, name: "TDM Gò Vấp", address: "467/8 Tân Sơn, P. An Hội Tây, TPHCM", phone: "028.6675.5504", hours: "T2-T7: 7:30-17:00; CN: 8:00-11:00 & 14:00-16:30" },
  { id: 3, name: "TDM Hà Nội", address: "210 Võ Chí Công, P. Tây Hồ, Hà Nội", phone: "024.6689.7899", hours: "T2-T7: 8:00-17:00; CN: 8:00-11:00 & 14:00-16:30" },
  { id: 4, name: "TDM Quận 7", address: "142 Gò Ô Môi, P. Phú Thuận, TPHCM", phone: "028.6681.8685", hours: "T2-T7: 7:30-17:00; CN: 8:00-11:00 & 14:00-16:30" },
  { id: 5, name: "TDM Thủ Dầu Một", address: "112 Nguyễn Văn Trỗi, P. Phú Lợi, TPHCM", phone: "028.2219.2232", hours: "T2-T7: 7:30-17:00; CN: 8:00-11:00 & 14:00-16:30" },
  { id: 6, name: "TDM Bình Tân", address: "426 Trần Văn Giàu, P. Tân Tạo, TPHCM", phone: "028.2224.2232", hours: "T2-T7: 7:30-17:00; CN: 8:00-11:00 & 14:00-16:30" },
];

export type ImageBanner = {
  id: number;
  title: string;
  image: string;
  link: string;
};

/** Banner chính — full ảnh + link (chỉnh tại đây) */
export const HERO_MAIN_BANNER: ImageBanner = {
  id: 1,
  title: "LONG THỊNH",
  image: "/slideshow.png",
  link: "/",
};

/** @deprecated Dùng HERO_MAIN_BANNER */
export const HERO_SLIDES: ImageBanner[] = [HERO_MAIN_BANNER];

/** Banner cột phải trên / dưới — full ảnh + link */
export const SIDE_BANNERS = {
  top: { id: 3, title: "Flash Sale", image: "/flashsale1.png", link: "/khuyen-mai" } satisfies ImageBanner,
  bottom: { id: 4, title: "Catalogue 2024", image: "/catalogue.png", link: "/khuyen-mai" } satisfies ImageBanner,
};

/** @deprecated Dùng HERO_SLIDES + SIDE_BANNERS — giữ tương thích các section cũ */
export const BANNERS = [
  ...HERO_SLIDES,
  SIDE_BANNERS.top,
  SIDE_BANNERS.bottom,
].map((b, i) => ({
  ...b,
  subtitle: "",
  buttonText: "",
  isActive: true,
  sortOrder: i + 1,
}));

export const PROMOTIONS = [
  { id: 1, title: "Giảm giá sốc TOTO lên đến 30%", endDate: "2026-07-15", image: "https://placehold.co/600x400/dc2626/white?text=PROMO+TOTO", products: [1, 2, 4, 5], badge: "HOT" },
  { id: 2, title: "Mua bếp Bosch tặng nồi áp suất", endDate: "2026-06-30", image: "https://placehold.co/600x400/1e3a8a/white?text=PROMO+BOSCH", products: [3], badge: "NEW" },
];

export const POLICIES = [
  { id: 1, title: "Giao hàng", description: "Giao hàng nội thành nhanh chóng trong ngày", icon: "truck" },
  { id: 2, title: "Chính hãng", description: "Đảm bảo 100% chính hãng và bảo hành hãng", icon: "shield" },
  { id: 3, title: "Lắp đặt", description: "Lắp đúng tiêu chuẩn, chính xác", icon: "headset" },
  { id: 4, title: "Giá thành", description: "Luôn đảm bảo giá tốt, đúng giá", icon: "refresh" },
];
