/**
 * Static marketing/config data + backward-compatible re-exports.
 * Catalog entities (categories, brands, products) live in catalog-service.
 */
export { CATEGORIES } from "./categories-tree";
export { BRANDS } from "./brands-tree";
export { PRODUCTS_SEED as PRODUCTS } from "@/data/products.seed";

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

export const BANNERS = [
  { id: 1, title: "KHUYẾN MÃI MÙA HÈ 2026", subtitle: "GIẢM SỐC LÊN ĐẾN 50%", image: "https://placehold.co/1600x500/FF4444/white?text=FLASH+SALE+50%25", link: "/khuyen-mai", buttonText: "Xem ngay", isActive: true, sortOrder: 1 },
  { id: 2, title: "TẤT TẤT SẢN PHẨM TOTO", subtitle: "Bảo hành 5 năm - Giá tốt nhất thị trường", image: "https://placehold.co/1600x500/0066CC/white?text=TOTO+PROMO", link: brandUrl("toto"), buttonText: "Khám phá", isActive: true, sortOrder: 2 },
  { id: 3, title: "BẾP TỪ BOSCH - GIẢM 20%", subtitle: "Sản phẩm chính hãng - Bảo hành 2 năm", image: "https://placehold.co/1600x500/CC0000/white?text=BOSCH+DEAL", link: categoryUrl("bep-dien-tu"), buttonText: "Mua ngay", isActive: true, sortOrder: 3 },
];

export const PROMOTIONS = [
  { id: 1, title: "Giảm giá sốc TOTO lên đến 30%", endDate: "2026-07-15", image: "https://placehold.co/600x400/dc2626/white?text=PROMO+TOTO", products: [1, 2, 4, 5], badge: "HOT" },
  { id: 2, title: "Mua bếp Bosch tặng nồi áp suất", endDate: "2026-06-30", image: "https://placehold.co/600x400/1e3a8a/white?text=PROMO+BOSCH", products: [3], badge: "NEW" },
];

export const POLICIES = [
  { id: 1, title: "GIAO HÀNG NHANH", description: "Giao hàng nội thành 3h", icon: "truck" },
  { id: 2, title: "CHÍNH HÃNG 100%", description: "Đảm bảo chính hãng", icon: "shield" },
  { id: 3, title: "LẮP ĐẶT CHUYÊN NGHIỆP", description: "Lắp đặt đúng tiêu chuẩn", icon: "headset" },
  { id: 4, title: "BẢO HÀNH DÀI HẠN", description: "Bảo hành từ 2-5 năm", icon: "refresh" },
];
