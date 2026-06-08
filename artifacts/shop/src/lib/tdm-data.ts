// MOCK DATA TDM.VN STYLE
export const CATEGORIES = [
  { id: 1, name: "Thiết bị vệ sinh", slug: "thiet-bi-ve-sinh", icon: "toilet", banner: "https://placehold.co/1600x300/dc2626/white?text=THIET+BI+VE+SINH", description: "Danh mục thiết bị vệ sinh chính hãng", children: [
    { id: 10, name: "Bồn cầu", slug: "bon-cau", icon: "toilet", children: [
      { id: 100, name: "Bồn cầu thông minh", slug: "bon-cau-thong-minh" },
      { id: 101, name: "Bồn cầu 1 khối", slug: "bon-cau-1-khoi" },
      { id: 102, name: "Bồn cầu 2 khối", slug: "bon-cau-2-khoi" },
      { id: 103, name: "Bồn cầu treo tường", slug: "bon-cau-treo-tuong" }
    ]},
    { id: 11, name: "Nắp bồn cầu", slug: "nap-bon-cau", icon: "lid", children: [] },
    { id: 12, name: "Chậu lavabo", slug: "chau-lavabo", icon: "sink", children: [] },
    { id: 13, name: "Vòi chậu", slug: "voi-chau", icon: "faucet", children: [] },
    { id: 14, name: "Vòi cảm ứng", slug: "voi-cam-ung", icon: "touch", children: [] },
    { id: 15, name: "Bồn tiểu", slug: "bon-tieu", icon: "urinal", children: [] },
    { id: 17, name: "Vòi sen", slug: "voi-sen", icon: "shower", children: [
      { id: 170, name: "Sen cây", slug: "sen-cay" },
      { id: 171, name: "Sen âm tường", slug: "sen-am-tuong" }
    ]},
    { id: 18, name: "Bồn tắm", slug: "bon-tam", icon: "bathtub", children: [] },
    { id: 20, name: "Phụ kiện phòng tắm", slug: "phu-kien-phong-tam", icon: "accessory", children: [] },
    { id: 22, name: "Vòi xịt vệ sinh", slug: "voi-xit-ve-sinh", icon: "bidet", children: [] }
  ]},
  { id: 2, name: "Thiết bị bếp", slug: "thiet-bi-bep", icon: "stove", banner: "https://placehold.co/1600x300/1e3a8a/white?text=THIET+BI+BEP", description: "Thiết bị bếp cao cấp", children: [
    { id: 23, name: "Bếp điện từ", slug: "bep-dien-tu", icon: "stove", children: [
      { id: 230, name: "Bếp từ", slug: "bep-tu" },
      { id: 231, name: "Bếp điện hồng ngoại", slug: "bep-dien-hong-ngoai" },
      { id: 233, name: "Bếp đơn", slug: "bep-don" },
      { id: 234, name: "Bếp 2 vùng nấu", slug: "bep-2-vung-nau" },
      { id: 235, name: "Bếp 3 vùng nấu", slug: "bep-3-vung-nau" }
    ]},
    { id: 24, name: "Bếp gas", slug: "bep-gas", icon: "gas-stove", children: [] },
    { id: 25, name: "Máy hút mùi", slug: "may-hut-mui", icon: "vent-hood", children: [] },
    { id: 26, name: "Lò nướng", slug: "lo-nuong", icon: "oven", children: [] },
    { id: 27, name: "Lò vi sóng", slug: "lo-vi-song", icon: "microwave", children: [] },
    { id: 28, name: "Máy rửa chén", slug: "may-rua-chen", icon: "dishwasher", children: [] },
    { id: 29, name: "Tủ lạnh", slug: "tu-lanh", icon: "fridge", children: [] },
    { id: 30, name: "Vòi rửa chén", slug: "voi-rua-chen", icon: "faucet", children: [] }
  ]},
  { id: 3, name: "Thiết bị nước", slug: "thiet-bi-nuoc", icon: "water-tank", banner: "https://placehold.co/1600x300/059669/white?text=THIET+BI+NUOC", description: "Bồn nước, bồn inox chất lượng", children: [
    { id: 31, name: "Bồn inox", slug: "bon-inox", icon: "tank", children: [] },
    { id: 32, name: "Bồn nhựa", slug: "bon-nhua", icon: "tank", children: [] },
    { id: 34, name: "Bồn tự hoại", slug: "bon-tu-hoai", icon: "septic", children: [] }
  ]},
  { id: 4, name: "Thiết bị điện", slug: "thiet-bi-dien", icon: "zap", banner: "https://placehold.co/1600x300/7c3aed/white?text=THIET+BI+DIEN", description: "Thiết bị điện gia dụng", children: [] },
  { id: 5, name: "Phụ kiện nhà tắm", slug: "phu-kien-nha-tam", icon: "shower", banner: "https://placehold.co/1600x300/f59e0b/white?text=PHU+KIEN+NHA+TAM", description: "Phụ kiện phòng tắm đẹp, tiện dụng", children: [] }
];
export const BRANDS = [
  { id: 1, name: "TOTO", slug: "toto", logo: "https://placehold.co/150x75/0066CC/white?text=TOTO", isFeatured: true, description: "TOTO là thương hiệu thiết bị vệ sinh hàng đầu thế giới từ Nhật Bản, nổi tiếng với công nghệ sáng tạo, chất lượng vượt trội và thiết kế tinh tế.", banner: "https://placehold.co/1600x400/0066CC/white?text=TOTO+BRAND", featuredProducts: [1, 2, 4, 5], news: [1] },
  { id: 2, name: "INAX", slug: "inax", logo: "https://placehold.co/150x75/E3000F/white?text=INAX", isFeatured: true, description: "INAX là thương hiệu thiết bị vệ sinh cao cấp Nhật Bản, mang đến những sản phẩm hiện đại, tiện nghi và bền bỉ cho mọi gia đình.", banner: "https://placehold.co/1600x400/E3000F/white?text=INAX+BRAND", featuredProducts: [2], news: [] },
  { id: 3, name: "American Standard", slug: "american-standard", logo: "https://placehold.co/150x75/005599/white?text=AS", isFeatured: true, description: "Thương hiệu thiết bị vệ sinh quốc tế Mỹ, uy tín hàng đầu về chất lượng và thiết kế hiện đại.", banner: "https://placehold.co/1600x400/005599/white?text=AMERICAN+STANDARD", featuredProducts: [], news: [] },
  { id: 4, name: "Caesar", slug: "caesar", logo: "https://placehold.co/150x75/FF9900/white?text=CAESAR", isFeatured: true, description: "Thương hiệu thiết bị vệ sinh Đài Loan, chất lượng tốt, giá hợp lý.", banner: "https://placehold.co/1600x400/FF9900/white?text=CAESAR+BRAND", featuredProducts: [], news: [] },
  { id: 5, name: "Viglacera", slug: "viglacera", logo: "https://placehold.co/150x75/2E7D32/white?text=VIGLACERA", isFeatured: true, description: "Thương hiệu thiết bị vệ sinh Việt Nam uy tín, chất lượng, phù hợp với thị trường nội địa.", banner: "https://placehold.co/1600x400/2E7D32/white?text=VIGLACERA", featuredProducts: [7], news: [] },
  { id: 11, name: "Bosch", slug: "bosch", logo: "https://placehold.co/150x75/CC0000/white?text=BOSCH", isFeatured: true, description: "Thương hiệu thiết bị bếp Đức, công nghệ tiên tiến, chất lượng cao cấp.", banner: "https://placehold.co/1600x400/CC0000/white?text=BOSCH+BRAND", featuredProducts: [3], news: [2] },
  { id: 12, name: "Malloca", slug: "malloca", logo: "https://placehold.co/150x75/006666/white?text=MALLOCA", isFeatured: true, description: "Thương hiệu thiết bị bếp Ý, thiết kế sang trọng, chất lượng quốc tế.", banner: "https://placehold.co/1600x400/006666/white?text=MALLOCA", featuredProducts: [6], news: [] },
  { id: 13, name: "Teka", slug: "teka", logo: "https://placehold.co/150x75/444444/white?text=TEKA", isFeatured: true, description: "Thương hiệu thiết bị bếp Đức, chuyên nghiệp, bền bỉ.", banner: "https://placehold.co/1600x400/444444/white?text=TEKA", featuredProducts: [], news: [] },
  { id: 14, name: "Hafele", slug: "hafele", logo: "https://placehold.co/150x75/003366/white?text=HAFELE", isFeatured: true, description: "Thương hiệu phụ kiện bếp Đức, chất lượng tốt, thiết kế hiện đại.", banner: "https://placehold.co/1600x400/003366/white?text=HAFELE", featuredProducts: [8], news: [] }
];
export const PRODUCTS = [
  { id: 1, name: "Bồn cầu TOTO CW986PB 1 khối nắp êm", slug: "bon-cau-toto-cw986pb", sku: "CW986PB", price: 12990000, originalPrice: 15990000, discount: 19, thumbnail: "https://placehold.co/400x400/f0f0f0/666666?text=TOTO+CW986PB", images: [{ url: "https://placehold.co/800x800/f0f0f0/666666?text=TOTO+CW986PB", alt: "Bồn cầu TOTO CW986PB" }, { url: "https://placehold.co/800x800/f0f0f0/666666?text=Front+View", alt: "Mặt trước" }, { url: "https://placehold.co/800x800/f0f0f0/666666?text=Side+View", alt: "Mặt bên" }], videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", categoryId: 10, categorySlug: "bon-cau", categoryName: "Bồn cầu", brandId: 1, brandSlug: "toto", brandName: "TOTO", inStock: true, stockCount: 50, soldCount: 125, viewCount: 2100, rating: 4.8, reviewCount: 42, tags: ["bestseller", "featured"], isFeatured: true, isBestSeller: true, isNew: false, isOnSale: true, shortDescription: "Bồn cầu 1 khối cao cấp TOTO với công nghệ xả Tornado Flush siêu tiết kiệm nước", fullDescription: "<p>Bồn cầu TOTO CW986PB là dòng sản phẩm 1 khối cao cấp với thiết kế hiện đại, phù hợp với mọi không gian phòng tắm.</p><ul><li>Công nghệ Tornado Flush tiết kiệm nước</li><li>Nắp êm đóng chậm</li><li>Chất liệu sứ thạch cao chống bám bẩn</li><li>Bảo hành chính hãng 5 năm</li></ul>", attributes: [{ name: "Chất liệu", value: "Sứ thạch cao" }, { name: "Kích thước", value: "700x420x750 mm" }, { name: "Tâm xả", value: "305 mm" }, { name: "Loại xả", value: "Xả xoáy Tornado Flush" }, { name: "Lượng nước xả", value: "3/4.5 lít" }, { name: "Màu sắc", value: "Trắng" }, { name: "Bảo hành", value: "5 năm" }, { name: "Xuất xứ", value: "Nhật Bản" }], createdAt: "2026-01-15" },
  { id: 2, name: "Bồn cầu INAX AC-989VN 1 khối", slug: "bon-cau-inax-ac-989vn", sku: "AC-989VN", price: 5090000, originalPrice: 7910000, discount: 36, thumbnail: "https://placehold.co/400x400/f0f0f0/666666?text=INAX+AC-989VN", categoryId: 10, categorySlug: "bon-cau", categoryName: "Bồn cầu", brandId: 2, brandSlug: "inax", brandName: "INAX", inStock: true, stockCount: 120, soldCount: 350, rating: 4.6, reviewCount: 89, isFeatured: true, isBestSeller: true, isNew: true, isOnSale: true, shortDescription: "Bồn cầu INAX AC-989VN giá tốt, chất lượng cao, bảo hành chính hãng", attributes: [{ name: "Chất liệu", value: "Sành sứ" }, { name: "Kích thước", value: "680x400x740 mm" }, { name: "Loại xả", value: "Xả kép 3/6 lít" }, { name: "Bảo hành", value: "3 năm" }, { name: "Xuất xứ", value: "Việt Nam" }] },
  { id: 3, name: "Bếp từ Bosch PPI82560MS 2 vùng nấu", slug: "bep-tu-bosch-ppi82560ms", sku: "PPI82560MS", price: 13291000, originalPrice: 13990000, discount: 5, thumbnail: "https://placehold.co/400x400/f0f0f0/666666?text=BOSCH+PPI82560MS", categoryId: 23, categorySlug: "bep-dien-tu", categoryName: "Bếp điện từ", brandId: 11, brandSlug: "bosch", brandName: "Bosch", inStock: true, stockCount: 25, soldCount: 78, rating: 4.9, reviewCount: 23, isFeatured: true, isBestSeller: false, isNew: true, isOnSale: true, shortDescription: "Bếp từ cao cấp Bosch 2 vùng nấu, công nghệ PowerBoost", attributes: [{ name: "Chất liệu mặt bếp", value: "Kính Schott Ceran" }, { name: "Số vùng nấu", value: "2 vùng" }, { name: "Công suất", value: "3700W" }, { name: "Kích thước lắp", value: "560x490 mm" }, { name: "Bảo hành", value: "2 năm" }, { name: "Xuất xứ", value: "Đức" }] },
  { id: 4, name: "Chậu lavabo TOTO LW1506CG âm bàn", slug: "chau-lavabo-toto-lw1506cg", sku: "LW1506CG", price: 3402000, originalPrice: 4253000, discount: 20, thumbnail: "https://placehold.co/400x400/f0f0f0/666666?text=TOTO+LW1506CG", categoryId: 12, categorySlug: "chau-lavabo", categoryName: "Chậu lavabo", brandId: 1, brandSlug: "toto", brandName: "TOTO", inStock: true, stockCount: 85, soldCount: 145, rating: 4.7, reviewCount: 34, isFeatured: true, isBestSeller: false, isNew: false, isOnSale: true, shortDescription: "Chậu lavabo TOTO âm bàn thiết kế thanh lịch", attributes: [{ name: "Chất liệu", value: "Sứ thạch cao" }, { name: "Kích thước", value: "550x400x200 mm" }, { name: "Số lỗ vòi", value: "1 lỗ" }, { name: "Màu sắc", value: "Trắng" }, { name: "Bảo hành", value: "5 năm" }] },
  { id: 5, name: "Vòi sen cây TOTO TX471S", slug: "voi-sen-cay-toto-tx471s", sku: "TX471S", price: 8990000, originalPrice: 10990000, discount: 18, thumbnail: "https://placehold.co/400x400/f0f0f0/666666?text=TOTO+TX471S", categoryId: 17, categorySlug: "voi-sen", categoryName: "Vòi sen", brandId: 1, brandSlug: "toto", brandName: "TOTO", inStock: true, stockCount: 35, soldCount: 95, rating: 4.8, reviewCount: 25, isFeatured: false, isBestSeller: true, isNew: false, isOnSale: true, shortDescription: "Cột sen TOTO TX471S thiết kế hiện đại, 3 chế độ nước", attributes: [{ name: "Chất liệu", value: "Thau mạ Crôm" }, { name: "Số chức năng", value: "3 chế độ" }, { name: "Nóng lạnh", value: "Có" }, { name: "Chiều cao", value: "1200 mm" }, { name: "Bảo hành", value: "3 năm" }] },
  { id: 6, name: "Máy hút mùi Malloca MHM-9060", slug: "may-hut-mui-malloca-mhm-9060", sku: "MHM-9060", price: 12990000, originalPrice: 15990000, discount: 19, thumbnail: "https://placehold.co/400x400/f0f0f0/666666?text=MALLOCA+MHM-9060", categoryId: 25, categorySlug: "may-hut-mui", categoryName: "Máy hút mùi", brandId: 12, brandSlug: "malloca", brandName: "Malloca", inStock: true, stockCount: 20, soldCount: 45, rating: 4.6, reviewCount: 12, isFeatured: true, isBestSeller: false, isNew: true, isOnSale: true, shortDescription: "Máy hút mùi Malloca âm tủ, lưu lượng hút 1000m³/h", attributes: [{ name: "Lưu lượng hút", value: "1000 m³/h" }, { name: "Số tốc độ", value: "3 tốc độ" }, { name: "Độ ồn", value: "58 dB" }, { name: "Kích thước", value: "900 mm" }, { name: "Bảo hành", value: "2 năm" }] },
  { id: 7, name: "Bồn cầu Viglacera V45 nắp êm", slug: "bon-cau-viglacera-v45", sku: "V45", price: 3070000, originalPrice: 4900000, discount: 37, thumbnail: "https://placehold.co/400x400/f0f0f0/666666?text=VIGLACERA+V45", categoryId: 10, categorySlug: "bon-cau", categoryName: "Bồn cầu", brandId: 5, brandSlug: "viglacera", brandName: "Viglacera", inStock: true, stockCount: 180, soldCount: 420, rating: 4.5, reviewCount: 105, isFeatured: true, isBestSeller: true, isNew: false, isOnSale: true, shortDescription: "Bồn cầu Viglacera V45 giá tốt, phù hợp gia đình Việt", attributes: [{ name: "Chất liệu", value: "Sành sứ" }, { name: "Kích thước", value: "680x380x720 mm" }, { name: "Loại xả", value: "Xả kép" }, { name: "Bảo hành", value: "2 năm" }, { name: "Xuất xứ", value: "Việt Nam" }] },
  { id: 8, name: "Bếp từ Hafele HC-I772D 2 vùng", slug: "bep-tu-hafele-hc-i772d", sku: "HC-I772D", price: 17779000, originalPrice: 25398000, discount: 30, thumbnail: "https://placehold.co/400x400/f0f0f0/666666?text=HAFELE+HC-I772D", categoryId: 23, categorySlug: "bep-dien-tu", categoryName: "Bếp điện từ", brandId: 14, brandSlug: "hafele", brandName: "Hafele", inStock: false, stockCount: 0, soldCount: 32, rating: 4.7, reviewCount: 15, isFeatured: false, isBestSeller: false, isNew: true, isOnSale: true, shortDescription: "Bếp từ Hafele 2 vùng nấu cao cấp", attributes: [{ name: "Chất liệu mặt bếp", value: "Kính Ceramic" }, { name: "Số vùng nấu", value: "2 vùng" }, { name: "Công suất", value: "3500W" }, { name: "Bảo hành", value: "2 năm" }] }
];
export const NEWS = [
  { id: 1, title: "Top 10 bồn cầu TOTO tốt nhất năm 2026", slug: "top-10-bon-cau-toto-tot-nhat-2026", excerpt: "Tổng hợp top 10 bồn cầu TOTO chất lượng, phổ biến nhất năm 2026", thumbnail: "https://placehold.co/800x450/f0f0f0/666666?text=TIN+TUC+TOTO", category: "Tin tức sản phẩm", brandSlug: "toto", viewCount: 3450, createdAt: "2026-06-01", content: "<p>Nội dung bài viết...</p>" },
  { id: 2, title: "Hướng dẫn chọn mua bếp từ Bosch chính hãng", slug: "huong-dan-chon-mua-bep-tu-bosch-chinh-hang", excerpt: "Bí quyết chọn mua bếp từ Bosch chính hãng, chất lượng tốt", thumbnail: "https://placehold.co/800x450/f0f0f0/666666?text=TIN+TUC+BOSCH", category: "Hướng dẫn mua hàng", brandSlug: "bosch", viewCount: 2100, createdAt: "2026-05-28", content: "<p>Nội dung bài viết...</p>" },
  { id: 3, title: "Khuyến mãi mùa hè 2026: Giảm sốc đến 50%", slug: "khuyen-mai-mua-he-2026", excerpt: "Chương trình khuyến mãi mùa hè 2026 với hàng ngàn sản phẩm giảm giá sốc", thumbnail: "https://placehold.co/800x450/f0f0f0/666666?text=KHUYEN+MAI", category: "Khuyến mãi", viewCount: 5600, createdAt: "2026-06-05", content: "<p>Nội dung bài viết...</p>" }
];
export const SHOWROOMS = [
  { id: 1, name: "Showroom TDM Hồ Chí Minh", address: "504 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q.12, TP. Hồ Chí Minh", phone: "028.2244.8333", hours: "08:00 - 20:00" },
  { id: 2, name: "Showroom TDM Hà Nội", address: "123 Phố Huế, P. Đúc Thiện, Q. Đống Đa, TP. Hà Nội", phone: "024.3567.8901", hours: "08:00 - 20:00" },
  { id: 3, name: "Showroom TDM Đà Nẵng", address: "456 Nguyễn Văn Linh, P. Thạc Giân, Q. Hải Châu, TP. Đà Nẵng", phone: "0236.3456.789", hours: "08:00 - 20:00" }
];
export const BANNERS = [
  { id: 1, title: "KHUYẾN MÃI MÙA HÈ 2026", subtitle: "GIẢM SỐC LÊN ĐẾN 50%", image: "https://placehold.co/1600x500/FF4444/white?text=FLASH+SALE+50%25", link: "/khuyen-mai", buttonText: "Xem ngay", isActive: true, sortOrder: 1 },
  { id: 2, title: "TẤT TẤT SẢN PHẨM TOTO", subtitle: "Bảo hành 5 năm - Giá tốt nhất thị trường", image: "https://placehold.co/1600x500/0066CC/white?text=TOTO+PROMO", link: "/thuong-hieu/toto", buttonText: "Khám phá", isActive: true, sortOrder: 2 },
  { id: 3, title: "BẾP TỪ BOSCH - GIẢM 20%", subtitle: "Sản phẩm chính hãng - Bảo hành 2 năm", image: "https://placehold.co/1600x500/CC0000/white?text=BOSCH+DEAL", link: "/danh-muc/bep-dien-tu", buttonText: "Mua ngay", isActive: true, sortOrder: 3 }
];
export const PROMOTIONS = [
  { id: 1, title: "Giảm giá sốc TOTO lên đến 30%", endDate: "2026-07-15", image: "https://placehold.co/600x400/dc2626/white?text=PROMO+TOTO", products: [1,2,4,5], badge: "HOT" },
  { id: 2, title: "Mua bếp Bosch tặng nồi áp suất", endDate: "2026-06-30", image: "https://placehold.co/600x400/1e3a8a/white?text=PROMO+BOSCH", products: [3], badge: "NEW" }
];
export const POLICIES = [
  { id: 1, title: "GIAO HÀNG NHANH", description: "Giao hàng nội thành 3h", icon: "truck" },
  { id: 2, title: "CHÍNH HÃNG 100%", description: "Đảm bảo chính hãng", icon: "shield" },
  { id: 3, title: "LẤP ĐẶT CHUYÊN NGHIỆP", description: "Lắp đặt đúng tiêu chuẩn", icon: "headset" },
  { id: 4, title: "BẢO HÀNH DÀI HẠN", description: "Bảo hành từ 2-5 năm", icon: "refresh" }
];
