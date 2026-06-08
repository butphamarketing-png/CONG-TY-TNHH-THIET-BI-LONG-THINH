import type { CategoryNode, IndustryGroup } from "@/types/catalog";

const G = {
  vs: "thiet-bi-ve-sinh" as IndustryGroup,
  bep: "thiet-bi-bep" as IndustryGroup,
  nuoc: "thiet-bi-nuoc" as IndustryGroup,
  dien: "thiet-bi-dien" as IndustryGroup,
  khoa: "thiet-bi-khoa" as IndustryGroup,
  gach: "gach-op-lat" as IndustryGroup,
  pk: "phu-kien" as IndustryGroup,
};

/** Category tree aligned with https://www.tdm.vn/ mega menu structure */
export const CATEGORY_TREE: CategoryNode[] = [
  // ─── 1. THIẾT BỊ VỆ SINH ───────────────────────────────────────────
  {
    id: 1, name: "Thiết bị vệ sinh", slug: "thiet-bi-ve-sinh", parentId: null, level: 1,
    groupSlug: G.vs, icon: "toilet", sortOrder: 1,
    banner: "https://placehold.co/1600x300/dc2626/white?text=THIET+BI+VE+SINH",
    description: "Bồn cầu, lavabo, vòi sen, bồn tắm chính hãng",
    children: [
      {
        id: 10, name: "Bồn cầu", slug: "bon-cau", parentId: 1, level: 2, groupSlug: G.vs, icon: "toilet", sortOrder: 1, showBrandTiles: true,
        children: [
          {
            id: 100, name: "Bồn cầu thông minh", slug: "bon-cau-thong-minh", parentId: 10, level: 3, groupSlug: G.vs, sortOrder: 1, showBrandTiles: true,
            children: [
              {
                id: 1000, name: "Bồn cầu tự động", slug: "bon-cau-tu-dong", parentId: 100, level: 4, groupSlug: G.vs, sortOrder: 1, showBrandTiles: true,
                children: [
                  {
                    id: 10000, name: "Bồn cầu Neorest", slug: "bon-cau-neorest", parentId: 1000, level: 5, groupSlug: G.vs, sortOrder: 1,
                    children: [
                      { id: 100001, name: "Bồn cầu Washlet", slug: "bon-cau-washlet", parentId: 10000, level: 6, groupSlug: G.vs, sortOrder: 1, showProductGrid: true },
                      { id: 100002, name: "Bồn cầu treo tường tự xả nước", slug: "bon-cau-treo-tuong-tu-xa-nuoc", parentId: 10000, level: 6, groupSlug: G.vs, sortOrder: 2, showProductGrid: true },
                    ],
                  },
                  { id: 10001, name: "Bồn cầu tự động INAX", slug: "bon-cau-tu-dong-inax", parentId: 1000, level: 5, groupSlug: G.vs, sortOrder: 2, showProductGrid: true },
                  { id: 10002, name: "Bồn cầu tự động Caesar", slug: "bon-cau-tu-dong-caesar", parentId: 1000, level: 5, groupSlug: G.vs, sortOrder: 3, showProductGrid: true },
                  { id: 10003, name: "Bồn cầu tự động American Standard", slug: "bon-cau-tu-dong-american-standard", parentId: 1000, level: 5, groupSlug: G.vs, sortOrder: 4, showProductGrid: true },
                ],
              },
              { id: 1001, name: "Bồn cầu điện tử TOTO", slug: "bon-cau-dien-tu-toto", parentId: 100, level: 4, groupSlug: G.vs, sortOrder: 2, showProductGrid: true },
              { id: 1002, name: "Bồn cầu điện tử INAX", slug: "bon-cau-dien-tu-inax", parentId: 100, level: 4, groupSlug: G.vs, sortOrder: 3, showProductGrid: true },
            ],
          },
          { id: 101, name: "Bồn cầu 1 khối", slug: "bon-cau-1-khoi", parentId: 10, level: 3, groupSlug: G.vs, sortOrder: 2, showProductGrid: true },
          { id: 102, name: "Bồn cầu 2 khối", slug: "bon-cau-2-khoi", parentId: 10, level: 3, groupSlug: G.vs, sortOrder: 3, showProductGrid: true },
          {
            id: 103, name: "Bồn cầu treo tường", slug: "bon-cau-treo-tuong", parentId: 10, level: 3, groupSlug: G.vs, sortOrder: 4, showBrandTiles: true,
            children: [
              {
                id: 1030, name: "Bồn cầu TOTO treo tường", slug: "bon-cau-toto-treo-tuong", parentId: 103, level: 4, groupSlug: G.vs, sortOrder: 1,
                children: [
                  { id: 10301, name: "Nắp nhựa", slug: "bon-cau-toto-treo-tuong-nap-nhua", parentId: 1030, level: 5, groupSlug: G.vs, sortOrder: 1, showProductGrid: true },
                  { id: 10302, name: "Nắp rửa cơ", slug: "bon-cau-toto-treo-tuong-nap-rua-co", parentId: 1030, level: 5, groupSlug: G.vs, sortOrder: 2, showProductGrid: true },
                  { id: 10303, name: "Nắp điện tử", slug: "bon-cau-toto-treo-tuong-nap-dien-tu", parentId: 1030, level: 5, groupSlug: G.vs, sortOrder: 3, showProductGrid: true },
                ],
              },
              { id: 1031, name: "Bồn cầu INAX treo tường", slug: "bon-cau-inax-treo-tuong", parentId: 103, level: 4, groupSlug: G.vs, sortOrder: 2, showProductGrid: true },
            ],
          },
          { id: 104, name: "Vòi xịt vệ sinh", slug: "voi-xit-ve-sinh", parentId: 10, level: 3, groupSlug: G.vs, sortOrder: 5, showProductGrid: true },
          { id: 105, name: "Phụ kiện bồn cầu", slug: "phu-kien-bon-cau", parentId: 10, level: 3, groupSlug: G.vs, sortOrder: 6, showProductGrid: true },
        ],
      },
      {
        id: 11, name: "Chậu rửa mặt", slug: "chau-lavabo", parentId: 1, level: 2, groupSlug: G.vs, icon: "sink", sortOrder: 2,
        children: [
          { id: 110, name: "Lavabo treo tường", slug: "lavabo-treo-tuong", parentId: 11, level: 3, groupSlug: G.vs, sortOrder: 1, showProductGrid: true },
          { id: 111, name: "Lavabo đặt bàn", slug: "lavabo-dat-ban", parentId: 11, level: 3, groupSlug: G.vs, sortOrder: 2, showProductGrid: true },
          { id: 112, name: "Lavabo âm bàn", slug: "lavabo-am-ban", parentId: 11, level: 3, groupSlug: G.vs, sortOrder: 3, showProductGrid: true },
          { id: 113, name: "Tủ lavabo", slug: "tu-lavabo", parentId: 11, level: 3, groupSlug: G.vs, sortOrder: 4, showProductGrid: true },
        ],
      },
      {
        id: 12, name: "Vòi lavabo", slug: "voi-lavabo", parentId: 1, level: 2, groupSlug: G.vs, icon: "faucet", sortOrder: 3,
        children: [
          { id: 120, name: "Vòi lavabo nóng lạnh", slug: "voi-lavabo-nong-lanh", parentId: 12, level: 3, groupSlug: G.vs, sortOrder: 1, showProductGrid: true },
          { id: 121, name: "Vòi lavabo lạnh", slug: "voi-lavabo-lanh", parentId: 12, level: 3, groupSlug: G.vs, sortOrder: 2, showProductGrid: true },
          { id: 122, name: "Vòi lavabo âm tường", slug: "voi-lavabo-am-tuong", parentId: 12, level: 3, groupSlug: G.vs, sortOrder: 3, showProductGrid: true },
          { id: 123, name: "Vòi lavabo cảm ứng", slug: "voi-cam-ung", parentId: 12, level: 3, groupSlug: G.vs, sortOrder: 4, showProductGrid: true },
          { id: 124, name: "Bộ xả lavabo", slug: "bo-xa-lavabo", parentId: 12, level: 3, groupSlug: G.vs, sortOrder: 5, showProductGrid: true },
        ],
      },
      {
        id: 13, name: "Vòi sen, sen cây", slug: "voi-sen", parentId: 1, level: 2, groupSlug: G.vs, icon: "shower", sortOrder: 4,
        children: [
          { id: 130, name: "Vòi sen nóng lạnh", slug: "voi-sen-nong-lanh", parentId: 13, level: 3, groupSlug: G.vs, sortOrder: 1, showProductGrid: true },
          { id: 131, name: "Vòi sen nhiệt độ", slug: "voi-sen-nhiet-do", parentId: 13, level: 3, groupSlug: G.vs, sortOrder: 2, showProductGrid: true },
          { id: 132, name: "Vòi sen lạnh", slug: "voi-sen-lanh", parentId: 13, level: 3, groupSlug: G.vs, sortOrder: 3, showProductGrid: true },
          { id: 133, name: "Sen cây", slug: "sen-cay", parentId: 13, level: 3, groupSlug: G.vs, sortOrder: 4, showProductGrid: true },
          { id: 134, name: "Sen âm tường", slug: "sen-am-tuong", parentId: 13, level: 3, groupSlug: G.vs, sortOrder: 5, showProductGrid: true },
        ],
      },
      {
        id: 14, name: "Bồn tắm", slug: "bon-tam", parentId: 1, level: 2, groupSlug: G.vs, icon: "bathtub", sortOrder: 5,
        children: [
          { id: 140, name: "Bồn tắm thường", slug: "bon-tam-thuong", parentId: 14, level: 3, groupSlug: G.vs, sortOrder: 1, showProductGrid: true },
          { id: 141, name: "Bồn tắm massage", slug: "bon-tam-massage", parentId: 14, level: 3, groupSlug: G.vs, sortOrder: 2, showProductGrid: true },
          { id: 142, name: "Bồn tắm góc", slug: "bon-tam-goc", parentId: 14, level: 3, groupSlug: G.vs, sortOrder: 3, showProductGrid: true },
        ],
      },
      {
        id: 15, name: "Bồn tiểu", slug: "bon-tieu", parentId: 1, level: 2, groupSlug: G.vs, icon: "urinal", sortOrder: 6,
        children: [
          { id: 150, name: "Bồn tiểu cảm ứng", slug: "bon-tieu-cam-ung", parentId: 15, level: 3, groupSlug: G.vs, sortOrder: 1, showProductGrid: true },
          { id: 151, name: "Bồn tiểu treo tường", slug: "bon-tieu-treo-tuong", parentId: 15, level: 3, groupSlug: G.vs, sortOrder: 2, showProductGrid: true },
          { id: 152, name: "Bồn tiểu đặt sàn", slug: "bon-tieu-dat-san", parentId: 15, level: 3, groupSlug: G.vs, sortOrder: 3, showProductGrid: true },
        ],
      },
      {
        id: 16, name: "Nắp bồn cầu", slug: "nap-bon-cau", parentId: 1, level: 2, groupSlug: G.vs, icon: "lid", sortOrder: 7,
        children: [
          { id: 160, name: "Nắp bồn cầu điện tử", slug: "nap-bon-cau-dien-tu", parentId: 16, level: 3, groupSlug: G.vs, sortOrder: 1, showProductGrid: true },
          { id: 161, name: "Nắp bồn cầu rửa cơ", slug: "nap-bon-cau-rua-co", parentId: 16, level: 3, groupSlug: G.vs, sortOrder: 2, showProductGrid: true },
        ],
      },
      {
        id: 17, name: "Phụ kiện phòng tắm", slug: "phu-kien-phong-tam", parentId: 1, level: 2, groupSlug: G.vs, icon: "accessory", sortOrder: 8,
        children: [
          { id: 170, name: "Giá treo khăn", slug: "gia-treo-khan", parentId: 17, level: 3, groupSlug: G.vs, sortOrder: 1, showProductGrid: true },
          { id: 171, name: "Gương phòng tắm", slug: "guong-phong-tam", parentId: 17, level: 3, groupSlug: G.vs, sortOrder: 2, showProductGrid: true },
          { id: 172, name: "Phểu thoát sàn", slug: "pheu-thoat-san", parentId: 17, level: 3, groupSlug: G.vs, sortOrder: 3, showProductGrid: true },
        ],
      },
      { id: 18, name: "Bồn cầu điện tử", slug: "bon-cau-dien-tu", parentId: 1, level: 2, groupSlug: G.vs, sortOrder: 2, showProductGrid: true, showOnHomepage: true },
      { id: 19, name: "Van xả tiểu", slug: "van-xa-tieu", parentId: 1, level: 2, groupSlug: G.vs, sortOrder: 9, showProductGrid: true, showOnHomepage: true },
      { id: 181, name: "Vòi bồn tắm", slug: "voi-bon-tam", parentId: 1, level: 2, groupSlug: G.vs, sortOrder: 10, showProductGrid: true, showOnHomepage: true },
    ],
  },

  // ─── 2. THIẾT BỊ BẾP ─────────────────────────────────────────────
  {
    id: 2, name: "Thiết bị bếp", slug: "thiet-bi-bep", parentId: null, level: 1,
    groupSlug: G.bep, icon: "stove", sortOrder: 2,
    banner: "https://placehold.co/1600x300/1e3a8a/white?text=THIET+BI+BEP",
    description: "Bếp điện từ, máy hút mùi, lò nướng cao cấp",
    children: [
      {
        id: 20, name: "Bếp điện - Bếp từ", slug: "bep-dien-tu", parentId: 2, level: 2, groupSlug: G.bep, sortOrder: 1,
        children: [
          { id: 200, name: "Bếp từ", slug: "bep-tu", parentId: 20, level: 3, groupSlug: G.bep, sortOrder: 1, showProductGrid: true },
          { id: 201, name: "Bếp điện hồng ngoại", slug: "bep-dien-hong-ngoai", parentId: 20, level: 3, groupSlug: G.bep, sortOrder: 2, showProductGrid: true },
          { id: 202, name: "Bếp điện từ kết hợp", slug: "bep-dien-tu-ket-hop", parentId: 20, level: 3, groupSlug: G.bep, sortOrder: 3, showProductGrid: true },
        ],
      },
      {
        id: 21, name: "Bếp gas", slug: "bep-gas", parentId: 2, level: 2, groupSlug: G.bep, sortOrder: 2,
        children: [
          { id: 210, name: "Bếp gas Teka", slug: "bep-gas-teka", parentId: 21, level: 3, groupSlug: G.bep, sortOrder: 1, showProductGrid: true },
          { id: 211, name: "Bếp gas Malloca", slug: "bep-gas-malloca", parentId: 21, level: 3, groupSlug: G.bep, sortOrder: 2, showProductGrid: true },
        ],
      },
      {
        id: 22, name: "Máy hút mùi", slug: "may-hut-mui", parentId: 2, level: 2, groupSlug: G.bep, sortOrder: 3,
        children: [
          { id: 220, name: "Máy hút mùi ống khói", slug: "may-hut-mui-ong-khoi", parentId: 22, level: 3, groupSlug: G.bep, sortOrder: 1, showProductGrid: true },
          { id: 221, name: "Máy hút mùi đảo", slug: "may-hut-mui-dao", parentId: 22, level: 3, groupSlug: G.bep, sortOrder: 2, showProductGrid: true },
          { id: 222, name: "Máy hút mùi âm tủ", slug: "may-hut-mui-am-tu", parentId: 22, level: 3, groupSlug: G.bep, sortOrder: 3, showProductGrid: true },
        ],
      },
      { id: 23, name: "Máy rửa chén", slug: "may-rua-chen", parentId: 2, level: 2, groupSlug: G.bep, sortOrder: 4, showProductGrid: true },
      { id: 24, name: "Lò nướng", slug: "lo-nuong", parentId: 2, level: 2, groupSlug: G.bep, sortOrder: 5, showProductGrid: true },
      { id: 25, name: "Lò vi sóng", slug: "lo-vi-song", parentId: 2, level: 2, groupSlug: G.bep, sortOrder: 6, showProductGrid: true },
      { id: 26, name: "Tủ lạnh", slug: "tu-lanh", parentId: 2, level: 2, groupSlug: G.bep, sortOrder: 7, showProductGrid: true },
      { id: 27, name: "Chậu rửa chén", slug: "chau-rua-chen", parentId: 2, level: 2, groupSlug: G.bep, sortOrder: 8, showProductGrid: true },
      { id: 28, name: "Vòi rửa chén", slug: "voi-rua-chen", parentId: 2, level: 2, groupSlug: G.bep, sortOrder: 9, showProductGrid: true },
    ],
  },

  // ─── 3. THIẾT BỊ NƯỚC ──────────────────────────────────────────
  {
    id: 3, name: "Thiết bị nước", slug: "thiet-bi-nuoc", parentId: null, level: 1,
    groupSlug: G.nuoc, icon: "water-tank", sortOrder: 3,
    banner: "https://placehold.co/1600x300/059669/white?text=THIET+BI+NUOC",
    description: "Bồn nước, máy nước nóng, máy lọc nước",
    children: [
      {
        id: 30, name: "Bồn nước", slug: "bon-nuoc", parentId: 3, level: 2, groupSlug: G.nuoc, sortOrder: 1,
        children: [
          { id: 300, name: "Bồn nước Đại Thành", slug: "bon-nuoc-dai-thanh", parentId: 30, level: 3, groupSlug: G.nuoc, sortOrder: 1, showProductGrid: true },
          { id: 301, name: "Bồn nước Sơn Hà", slug: "bon-nuoc-son-ha", parentId: 30, level: 3, groupSlug: G.nuoc, sortOrder: 2, showProductGrid: true },
          { id: 302, name: "Bồn nước inox", slug: "bon-inox", parentId: 30, level: 3, groupSlug: G.nuoc, sortOrder: 3, showProductGrid: true },
          { id: 303, name: "Bồn nước nhựa", slug: "bon-nhua", parentId: 30, level: 3, groupSlug: G.nuoc, sortOrder: 4, showProductGrid: true },
        ],
      },
      {
        id: 31, name: "Máy nước nóng", slug: "may-nuoc-nong", parentId: 3, level: 2, groupSlug: G.nuoc, sortOrder: 2,
        children: [
          { id: 310, name: "Máy nước nóng trực tiếp", slug: "may-nuoc-nong-truc-tiep", parentId: 31, level: 3, groupSlug: G.nuoc, sortOrder: 1, showProductGrid: true },
          { id: 311, name: "Máy nước nóng gián tiếp", slug: "may-nuoc-nong-gian-tiep", parentId: 31, level: 3, groupSlug: G.nuoc, sortOrder: 2, showProductGrid: true },
        ],
      },
      { id: 32, name: "Năng lượng mặt trời", slug: "nang-luong-mat-troi", parentId: 3, level: 2, groupSlug: G.nuoc, sortOrder: 3, showProductGrid: true },
      { id: 33, name: "Máy lọc nước", slug: "may-loc-nuoc", parentId: 3, level: 2, groupSlug: G.nuoc, sortOrder: 4, showProductGrid: true },
      { id: 34, name: "Chậu rửa inox", slug: "chau-rua-inox", parentId: 3, level: 2, groupSlug: G.nuoc, sortOrder: 5, showProductGrid: true },
      { id: 35, name: "Bồn tự hoại", slug: "bon-tu-hoai", parentId: 3, level: 2, groupSlug: G.nuoc, sortOrder: 6, showProductGrid: true, showOnHomepage: true },
      { id: 36, name: "Bồn công nghiệp", slug: "bon-cong-nghiep", parentId: 3, level: 2, groupSlug: G.nuoc, sortOrder: 7, showProductGrid: true, showOnHomepage: true },
    ],
  },

  // ─── 4. THIẾT BỊ ĐIỆN ────────────────────────────────────────────
  {
    id: 4, name: "Thiết bị điện", slug: "thiet-bi-dien", parentId: null, level: 1,
    groupSlug: G.dien, icon: "zap", sortOrder: 4,
    banner: "https://placehold.co/1600x300/7c3aed/white?text=THIET+BI+DIEN",
    description: "Công tắc, ổ cắm, đèn LED chiếu sáng",
    children: [
      {
        id: 40, name: "Công tắc - Ổ cắm", slug: "cong-tac-o-cam", parentId: 4, level: 2, groupSlug: G.dien, sortOrder: 1,
        children: [
          { id: 400, name: "Công tắc Panasonic", slug: "cong-tac-panasonic", parentId: 40, level: 3, groupSlug: G.dien, sortOrder: 1, showProductGrid: true },
          { id: 401, name: "Công tắc Schneider", slug: "cong-tac-schneider", parentId: 40, level: 3, groupSlug: G.dien, sortOrder: 2, showProductGrid: true },
        ],
      },
      {
        id: 41, name: "Đèn LED chiếu sáng", slug: "den-led-chieu-sang", parentId: 4, level: 2, groupSlug: G.dien, sortOrder: 2,
        children: [
          { id: 410, name: "Đèn LED Panasonic", slug: "den-led-panasonic", parentId: 41, level: 3, groupSlug: G.dien, sortOrder: 1, showProductGrid: true },
          { id: 411, name: "Đèn LED Duhal", slug: "den-led-duhal", parentId: 41, level: 3, groupSlug: G.dien, sortOrder: 2, showProductGrid: true },
        ],
      },
      { id: 42, name: "Thiết bị quạt", slug: "thiet-bi-quat", parentId: 4, level: 2, groupSlug: G.dien, sortOrder: 3, showProductGrid: true },
      { id: 43, name: "Dây cáp điện", slug: "day-cap-dien", parentId: 4, level: 2, groupSlug: G.dien, sortOrder: 4, showProductGrid: true },
      { id: 44, name: "Tủ điện", slug: "tu-dien", parentId: 4, level: 2, groupSlug: G.dien, sortOrder: 5, showProductGrid: true },
    ],
  },

  // ─── 5. THIẾT BỊ KHÓA ────────────────────────────────────────────
  {
    id: 5, name: "Thiết bị khóa", slug: "thiet-bi-khoa", parentId: null, level: 1,
    groupSlug: G.khoa, icon: "lock", sortOrder: 5,
    banner: "https://placehold.co/1600x300/92400e/white?text=THIET+BI+KHOA",
    description: "Khóa điện tử, khóa cửa Yale chính hãng",
    children: [
      { id: 50, name: "Khóa điện tử", slug: "khoa-dien-tu", parentId: 5, level: 2, groupSlug: G.khoa, sortOrder: 1, showProductGrid: true },
      { id: 51, name: "Khóa cửa chính", slug: "khoa-cua-chinh", parentId: 5, level: 2, groupSlug: G.khoa, sortOrder: 2, showProductGrid: true },
      { id: 52, name: "Khóa cửa phòng", slug: "khoa-cua-phong", parentId: 5, level: 2, groupSlug: G.khoa, sortOrder: 3, showProductGrid: true },
      { id: 53, name: "Khóa bấm móc", slug: "khoa-bam-moc", parentId: 5, level: 2, groupSlug: G.khoa, sortOrder: 4, showProductGrid: true },
      { id: 54, name: "Phụ kiện cửa", slug: "phu-kien-cua", parentId: 5, level: 2, groupSlug: G.khoa, sortOrder: 5, showProductGrid: true },
      { id: 55, name: "Két sắt", slug: "ket-sat", parentId: 5, level: 2, groupSlug: G.khoa, sortOrder: 6, showProductGrid: true, showOnHomepage: true },
    ],
  },

  // ─── 6. GẠCH ỐP LÁT ──────────────────────────────────────────────
  {
    id: 6, name: "Gạch ốp lát", slug: "gach-op-lat", parentId: null, level: 1,
    groupSlug: G.gach, icon: "tile", sortOrder: 6,
    banner: "https://placehold.co/1600x300/78716c/white?text=GACH+OP+LAT",
    description: "Gạch ốp tường, gạch lát nền cao cấp",
    children: [
      { id: 60, name: "Gạch ốp tường", slug: "gach-op-tuong", parentId: 6, level: 2, groupSlug: G.gach, sortOrder: 1, showProductGrid: true },
      { id: 61, name: "Gạch lát nền", slug: "gach-lat-nen", parentId: 6, level: 2, groupSlug: G.gach, sortOrder: 2, showProductGrid: true },
      { id: 62, name: "Gạch trang trí", slug: "gach-trang-tri", parentId: 6, level: 2, groupSlug: G.gach, sortOrder: 3, showProductGrid: true },
    ],
  },

  // ─── 7. PHỤ KIỆN ─────────────────────────────────────────────────
  {
    id: 7, name: "Phụ kiện", slug: "phu-kien", parentId: null, level: 1,
    groupSlug: G.pk, icon: "accessory", sortOrder: 7,
    banner: "https://placehold.co/1600x300/f59e0b/white?text=PHU+KIEN",
    description: "Phụ kiện phòng tắm, bếp, lắp đặt",
    children: [
      { id: 70, name: "Phụ kiện phòng tắm", slug: "phu-kien-phong-tam-pk", parentId: 7, level: 2, groupSlug: G.pk, sortOrder: 1, showProductGrid: true },
      { id: 71, name: "Phụ kiện bếp", slug: "phu-kien-bep", parentId: 7, level: 2, groupSlug: G.pk, sortOrder: 2, showProductGrid: true },
      { id: 72, name: "Phụ kiện lắp đặt", slug: "phu-kien-lap-dat", parentId: 7, level: 2, groupSlug: G.pk, sortOrder: 3, showProductGrid: true },
    ],
  },
];

/** Backward-compatible export name */
export const CATEGORIES = CATEGORY_TREE;
