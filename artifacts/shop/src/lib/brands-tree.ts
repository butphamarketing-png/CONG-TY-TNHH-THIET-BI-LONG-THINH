import type { Brand } from "@/types/catalog";

/** Full TDM-aligned brand tree (30+ brands) */
export const BRANDS: Brand[] = [
  // ── Thiết bị vệ sinh ──
  { id: 1, name: "TOTO", slug: "toto", logo: "https://placehold.co/150x75/0066CC/white?text=TOTO", industryGroups: ["thiet-bi-ve-sinh"], isFeatured: true, sortOrder: 1, seoTitle: "Showroom thiết bị vệ sinh TOTO Việt Nam chính hãng - Đại lý SỐ 1", description: "TOTO là thương hiệu thiết bị vệ sinh hàng đầu thế giới từ Nhật Bản.", banner: "https://placehold.co/1600x400/0066CC/white?text=TOTO+BRAND", featuredProducts: [1, 2, 4, 5] },
  { id: 2, name: "INAX", slug: "inax", logo: "https://placehold.co/150x75/E3000F/white?text=INAX", industryGroups: ["thiet-bi-ve-sinh"], isFeatured: true, sortOrder: 2, description: "INAX là thương hiệu thiết bị vệ sinh cao cấp Nhật Bản.", banner: "https://placehold.co/1600x400/E3000F/white?text=INAX+BRAND", featuredProducts: [2] },
  { id: 3, name: "American Standard", slug: "american-standard", logo: "https://placehold.co/150x75/005599/white?text=AS", industryGroups: ["thiet-bi-ve-sinh"], isFeatured: true, sortOrder: 3, description: "Thương hiệu thiết bị vệ sinh quốc tế Mỹ.", featuredProducts: [] },
  { id: 4, name: "Caesar", slug: "caesar", logo: "https://placehold.co/150x75/FF9900/white?text=CAESAR", industryGroups: ["thiet-bi-ve-sinh"], isFeatured: true, sortOrder: 4, description: "Thương hiệu thiết bị vệ sinh Đài Loan.", featuredProducts: [] },
  { id: 5, name: "Viglacera", slug: "viglacera", logo: "https://placehold.co/150x75/2E7D32/white?text=VIGLACERA", industryGroups: ["thiet-bi-ve-sinh", "gach-op-lat"], isFeatured: true, sortOrder: 5, description: "Thương hiệu thiết bị vệ sinh Việt Nam uy tín.", featuredProducts: [7] },
  { id: 6, name: "Cotto", slug: "cotto", logo: "https://placehold.co/150x75/8B4513/white?text=COTTO", industryGroups: ["thiet-bi-ve-sinh"], isFeatured: true, sortOrder: 6, description: "Thương hiệu thiết bị vệ sinh Thái Lan.", featuredProducts: [] },
  { id: 7, name: "Grohe", slug: "grohe", logo: "https://placehold.co/150x75/1a1a1a/white?text=GROHE", industryGroups: ["thiet-bi-ve-sinh", "phu-kien"], isFeatured: true, sortOrder: 7, description: "Thương hiệu vòi sen, thiết bị vệ sinh Đức.", featuredProducts: [] },
  { id: 8, name: "Moen", slug: "moen", logo: "https://placehold.co/150x75/333333/white?text=MOEN", industryGroups: ["thiet-bi-ve-sinh"], isFeatured: true, sortOrder: 8, description: "Thương hiệu vòi sen Mỹ.", featuredProducts: [] },
  { id: 9, name: "Kanly", slug: "kanly", logo: "https://placehold.co/150x75/666666/white?text=KANLY", industryGroups: ["thiet-bi-ve-sinh"], isFeatured: true, sortOrder: 9, description: "Thương hiệu thiết bị vệ sinh.", featuredProducts: [] },
  { id: 10, name: "GLS", slug: "gls", logo: "https://placehold.co/150x75/444444/white?text=GLS", industryGroups: ["thiet-bi-ve-sinh"], isFeatured: true, sortOrder: 10, description: "Thương hiệu thiết bị vệ sinh GLS.", featuredProducts: [] },

  // ── Thiết bị bếp ──
  { id: 11, name: "Bosch", slug: "bosch", logo: "https://placehold.co/150x75/CC0000/white?text=BOSCH", industryGroups: ["thiet-bi-bep"], isFeatured: true, sortOrder: 1, description: "Thương hiệu thiết bị bếp Đức.", banner: "https://placehold.co/1600x400/CC0000/white?text=BOSCH+BRAND", featuredProducts: [3] },
  { id: 12, name: "Malloca", slug: "malloca", logo: "https://placehold.co/150x75/006666/white?text=MALLOCA", industryGroups: ["thiet-bi-bep"], isFeatured: true, sortOrder: 2, description: "Thương hiệu thiết bị bếp Ý.", featuredProducts: [6] },
  { id: 13, name: "Teka", slug: "teka", logo: "https://placehold.co/150x75/444444/white?text=TEKA", industryGroups: ["thiet-bi-bep"], isFeatured: true, sortOrder: 3, description: "Thương hiệu thiết bị bếp Đức.", featuredProducts: [] },
  { id: 14, name: "Hafele", slug: "hafele", logo: "https://placehold.co/150x75/003366/white?text=HAFELE", industryGroups: ["thiet-bi-bep", "phu-kien"], isFeatured: true, sortOrder: 4, description: "Thương hiệu phụ kiện bếp Đức.", featuredProducts: [8] },
  { id: 15, name: "Eurosun", slug: "eurosun", logo: "https://placehold.co/150x75/333333/white?text=EUROSUN", industryGroups: ["thiet-bi-bep"], isFeatured: true, sortOrder: 5, description: "Thương hiệu thiết bị bếp.", featuredProducts: [] },
  { id: 16, name: "Chefs", slug: "chefs", logo: "https://placehold.co/150x75/222222/white?text=CHEFS", industryGroups: ["thiet-bi-bep"], isFeatured: true, sortOrder: 6, description: "Thương hiệu thiết bị bếp Chefs.", featuredProducts: [] },

  // ── Vật liệu nước ──
  { id: 21, name: "Đại Thành", slug: "dai-thanh", logo: "https://placehold.co/150x75/0066CC/white?text=DAI+THANH", industryGroups: ["thiet-bi-nuoc"], isFeatured: true, sortOrder: 1, description: "Thương hiệu bồn nước Việt Nam.", featuredProducts: [] },
  { id: 22, name: "Sơn Hà", slug: "son-ha", logo: "https://placehold.co/150x75/FF6600/white?text=SON+HA", industryGroups: ["thiet-bi-nuoc"], isFeatured: true, sortOrder: 2, description: "Thương hiệu bồn nước Việt Nam.", featuredProducts: [] },
  { id: 23, name: "Ferroli", slug: "ferroli", logo: "https://placehold.co/150x75/CC0000/white?text=FERROLI", industryGroups: ["thiet-bi-nuoc"], isFeatured: true, sortOrder: 3, description: "Thương hiệu máy nước nóng Ý.", featuredProducts: [] },
  { id: 24, name: "Ariston", slug: "ariston", logo: "https://placehold.co/150x75/CC0000/white?text=ARISTON", industryGroups: ["thiet-bi-nuoc"], isFeatured: true, sortOrder: 4, description: "Thương hiệu máy nước nóng Ý.", featuredProducts: [] },
  { id: 25, name: "Stiebel Eltron", slug: "stiebel-eltron", logo: "https://placehold.co/150x75/1a1a1a/white?text=STIEBEL", industryGroups: ["thiet-bi-nuoc"], isFeatured: true, sortOrder: 5, description: "Thương hiệu máy nước nóng Đức.", featuredProducts: [] },
  { id: 26, name: "Cleansui", slug: "cleansui", logo: "https://placehold.co/150x75/0066CC/white?text=CLEANSUI", industryGroups: ["thiet-bi-nuoc"], isFeatured: true, sortOrder: 6, description: "Máy lọc nước Mitsubishi Cleansui.", featuredProducts: [] },
  { id: 27, name: "Toàn Mỹ", slug: "toan-my", logo: "https://placehold.co/150x75/FF6600/white?text=TOAN+MY", industryGroups: ["thiet-bi-nuoc"], isFeatured: true, sortOrder: 7, description: "Thương hiệu thiết bị nước Toàn Mỹ.", featuredProducts: [] },

  // ── Thiết bị điện ──
  { id: 31, name: "Panasonic", slug: "panasonic", logo: "https://placehold.co/150x75/1a1a1a/white?text=PANASONIC", industryGroups: ["thiet-bi-dien", "thiet-bi-nuoc"], isFeatured: true, sortOrder: 1, description: "Thương hiệu thiết bị điện Nhật Bản.", featuredProducts: [] },
  { id: 32, name: "MPE", slug: "mpe", logo: "https://placehold.co/150x75/333333/white?text=MPE", industryGroups: ["thiet-bi-dien"], isFeatured: true, sortOrder: 2, description: "Đèn LED MPE.", featuredProducts: [] },
  { id: 33, name: "Duhal", slug: "duhal", logo: "https://placehold.co/150x75/FFD700/white?text=DUHAL", industryGroups: ["thiet-bi-dien"], isFeatured: true, sortOrder: 3, description: "Đèn LED Duhal.", featuredProducts: [] },
  { id: 34, name: "Schneider", slug: "schneider", logo: "https://placehold.co/150x75/00A651/white?text=SCHNEIDER", industryGroups: ["thiet-bi-dien"], isFeatured: true, sortOrder: 4, description: "Công tắc ổ cắm Schneider.", featuredProducts: [] },

  // ── Thiết bị khóa ──
  { id: 41, name: "Yale", slug: "yale", logo: "https://placehold.co/150x75/FFD700/white?text=YALE", industryGroups: ["thiet-bi-khoa"], isFeatured: true, sortOrder: 1, description: "Thương hiệu khóa điện tử hàng đầu.", featuredProducts: [] },
  { id: 42, name: "Hafale", slug: "hafale", logo: "https://placehold.co/150x75/003366/white?text=HAFALE", industryGroups: ["thiet-bi-khoa"], isFeatured: true, sortOrder: 2, description: "Phụ kiện cửa Hafale.", featuredProducts: [] },
];
