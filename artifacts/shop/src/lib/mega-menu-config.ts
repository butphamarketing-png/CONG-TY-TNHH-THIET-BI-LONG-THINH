/**
 * Mega menu — mirrors https://www.tdm.vn/
 *
 * Layout: sidebar (L1 tabs) → right panel with COLUMNS, each column stacks 1–3 L2 groups.
 * Do NOT flatten groups into a grid — that breaks TDM column alignment.
 */
import type { IndustryGroup, TdmMenuGroup } from "@/types/catalog";

export type MegaMenuTab = "brands" | TdmMenuGroup;

export interface MegaMenuLink {
  name: string;
  slug: string;
}

/** One L2 group (orange heading + L3 links) */
export interface MegaMenuGroupItem {
  heading: string;
  headingSlug: string;
  links: MegaMenuLink[];
}

/** One visual column — multiple L2 groups stacked vertically (TDM style) */
export interface MegaMenuColumn {
  groups: MegaMenuGroupItem[];
}

export interface MegaMenuSidebarItem {
  id: MegaMenuTab;
  name: string;
  subtitle: string;
  groupSlug?: IndustryGroup;
}

export interface MegaMenuBrandGroup {
  heading: string;
  groupSlug: IndustryGroup;
  brands: MegaMenuLink[];
}

/** Left sidebar — order matches TDM.vn */
export const MEGA_MENU_SIDEBAR: MegaMenuSidebarItem[] = [
  { id: "brands", name: "Thương hiệu", subtitle: "Các thương hiệu nổi bật" },
  { id: "thiet-bi-ve-sinh", name: "Thiết bị vệ sinh", subtitle: "Bàn cầu, Lavabo, Vòi…", groupSlug: "thiet-bi-ve-sinh" },
  { id: "thiet-bi-bep", name: "Thiết bị bếp", subtitle: "Bếp điện, máy hút mùi…", groupSlug: "thiet-bi-bep" },
  { id: "thiet-bi-nuoc", name: "Vật liệu nước", subtitle: "Bồn nước, Pin mặt trời, ống …", groupSlug: "thiet-bi-nuoc" },
  { id: "thiet-bi-khoa", name: "Thiết bị khóa cửa", subtitle: "Khóa điện tử, ổ khóa..", groupSlug: "thiet-bi-khoa" },
  { id: "thiet-bi-dien", name: "Thiết bị điện", subtitle: "Công tắc, đèn led…", groupSlug: "thiet-bi-dien" },
];

/** Brand panel — grouped by industry (TDM.vn order) */
export const MEGA_MENU_BRANDS: MegaMenuBrandGroup[] = [
  {
    heading: "Thiết bị vệ sinh",
    groupSlug: "thiet-bi-ve-sinh",
    brands: [
      { name: "TOTO", slug: "thiet-bi-ve-sinh-toto" },
      { name: "INAX", slug: "thiet-bi-ve-sinh-inax" },
      { name: "AMERICAN STANDARD", slug: "thiet-bi-ve-sinh-american-standard" },
      { name: "CAESAR", slug: "thiet-bi-ve-sinh-caesar" },
      { name: "VIGLACERA", slug: "thiet-bi-ve-sinh-viglacera" },
      { name: "COTTO", slug: "thiet-bi-ve-sinh-cotto" },
      { name: "GROHE", slug: "thiet-bi-ve-sinh-grohe" },
      { name: "MOEN", slug: "thiet-bi-ve-sinh-moen" },
      { name: "KANLY", slug: "kanly" },
      { name: "GLS", slug: "gls-mirror" },
      { name: "THIÊN THANH", slug: "su-thien-thanh" },
      { name: "ĐÌNH QUỐC", slug: "dinh-quoc" },
    ],
  },
  {
    heading: "Thiết bị nước",
    groupSlug: "thiet-bi-nuoc",
    brands: [
      { name: "ARISTON", slug: "may-nuoc-nong-ariston" },
      { name: "FERROLI", slug: "may-nuoc-nong-ferroli" },
      { name: "STIEBEL ELTRON", slug: "stiebel-eltron" },
      { name: "ĐẠI THÀNH", slug: "dai-thanh" },
      { name: "SƠN HÀ", slug: "son-ha" },
      { name: "PANASONIC", slug: "may-nuoc-nong-dien-panasonic" },
      { name: "TOÀN MỸ", slug: "bon-nuoc-toan-my" },
    ],
  },
  {
    heading: "Thiết bị điện",
    groupSlug: "thiet-bi-dien",
    brands: [
      { name: "PANASONIC", slug: "thiet-bi-dien-panasonic" },
      { name: "MPE", slug: "thiet-bi-dien-mpe" },
    ],
  },
  {
    heading: "Thiết bị bếp",
    groupSlug: "thiet-bi-bep",
    brands: [
      { name: "BOSCH", slug: "thiet-bi-bep-bosch" },
      { name: "TEKA", slug: "thiet-bi-bep-teka" },
      { name: "MALLOCA", slug: "thiet-bi-bep-malloca" },
      { name: "HAFELE", slug: "hafele" },
      { name: "CHEFS", slug: "thiet-bi-bep-chefs" },
      { name: "EUROSUN", slug: "thiet-bi-bep-eurosun" },
      { name: "CLEANSUI", slug: "mitsubishi-cleansui" },
    ],
  },
  {
    heading: "Thiết bị khóa",
    groupSlug: "thiet-bi-khoa",
    brands: [{ name: "YALE", slug: "khoa-yale" }],
  },
];

const G = (heading: string, headingSlug: string, links: MegaMenuLink[]): MegaMenuGroupItem => ({
  heading,
  headingSlug,
  links,
});

/** Right panel — column layout per industry (matches TDM.vn screenshots) */
export const MEGA_MENU_COLUMNS: Record<TdmMenuGroup, MegaMenuColumn[]> = {
  "thiet-bi-ve-sinh": [
    {
      groups: [
        G("Bồn Cầu", "bon-cau-bet-ve-sinh", [
          { name: "Bồn Cầu 1 Khối", slug: "bon-cau-1-khoi" },
          { name: "Bồn Cầu 2 Khối", slug: "ban-cau-2-khoi" },
          { name: "Bồn Cầu Thông Minh", slug: "bon-cau-thong-minh" },
          { name: "Bồn Cầu Treo Tường", slug: "bon-cau-treo-tuong" },
          { name: "Vòi Xịt", slug: "voi-xit-ve-sinh" },
          { name: "Phụ Kiện Bồn Cầu", slug: "phu-kien-bon-cau" },
        ]),
        G("Chậu Rửa Mặt", "chau-rua-lavabo", [
          { name: "Lavabo Treo Tường", slug: "chau-treo-tuong" },
          { name: "Lavabo Đặt Bàn", slug: "chau-dat-ban" },
          { name: "Lavabo Âm Bàn", slug: "chau-am-ban" },
          { name: "Tủ Lavabo", slug: "tu-lavabo" },
        ]),
      ],
    },
    {
      groups: [
        G("Vòi Lavabo", "voi-lavabo", [
          { name: "Vòi Lavabo Nóng Lạnh", slug: "voi-nuoc-nong-lanh" },
          { name: "Vòi Lavabo Lạnh", slug: "voi-lavabo-lanh" },
          { name: "Vòi Lavabo Âm Tường", slug: "voi-lavabo-am-tuong" },
          { name: "Vòi Lavabo Cảm Ứng", slug: "voi-rua-cam-ung" },
          { name: "Bộ Xả Lavabo", slug: "bo-xa-chau-rua-mat-lavabo" },
        ]),
        G("Vòi Sen, Sen Cây", "voi-sen-cay", [
          { name: "Vòi Sen Nóng Lạnh", slug: "voi-sen-nong-lanh" },
          { name: "Vòi Sen Nhiệt Độ", slug: "voi-sen-nhiet-do" },
          { name: "Vòi Sen Lạnh", slug: "voi-sen-lanh" },
          { name: "Tay Sen Tắm", slug: "tay-sen-tam" },
          { name: "Thanh Trượt Sen", slug: "thanh-truot-sen" },
          { name: "Vòi Sen Cây", slug: "voi-sen-cay" },
          { name: "Vòi Sen Âm Tường", slug: "voi-sen-tam-am-tuong" },
        ]),
      ],
    },
    {
      groups: [
        G("Bồn Tắm", "bon-tam", [
          { name: "Bồn Tắm Thường", slug: "bon-tam-thuong" },
          { name: "Bồn Tắm Massage", slug: "bon-tam-massage" },
          { name: "Bồn Tắm Góc", slug: "bon-tam-goc" },
          { name: "Bồn Tắm Đặt Sàn", slug: "bon-tam-dat-san" },
          { name: "Vòi Bồn Tắm", slug: "bo-voi-sen-xa-bon" },
          { name: "Phòng Tắm Đứng", slug: "phong-tam-dung" },
        ]),
        G("Bồn Tiểu", "bon-tieu-nam-nu", [
          { name: "Bồn Tiểu Cảm ứng", slug: "bon-tieu-cam-ung" },
          { name: "Bồn Tiểu Treo Tường", slug: "bon-tieu-nam-treo-tuong" },
          { name: "Bồn Tiểu Đặt Sàn", slug: "bon-tieu-nam-dat-san" },
          { name: "Van Xả Tiểu", slug: "van-xa-tieu" },
        ]),
      ],
    },
    {
      groups: [
        G("Phụ Kiện Phòng Tắm", "phu-kien-phong-tam", [
          { name: "Giá Treo Khăn", slug: "gia-treo-khan" },
          { name: "Giá Xà Phòng", slug: "gia-xa-phong-ban-chai" },
          { name: "Kệ Kính", slug: "ke-kinh-phong-tam" },
          { name: "Lô Giấy", slug: "lo-giay-ve-sinh" },
          { name: "Gương Phòng Tắm", slug: "guong-phong-tam" },
          { name: "Máy Sấy Tay", slug: "may-say-tay" },
          { name: "Phểu Thoát Sàn", slug: "thoat-san" },
          { name: "Vòi Lạnh Gắn Tường", slug: "voi-xa-lanh" },
        ]),
        G("Nắp Bồn Cầu", "ban-nap-bon-cau", [
          { name: "Nắp Bồn Cầu Điện Tử", slug: "nap-bon-cau-thong-minh" },
          { name: "Nắp Bồn Cầu Rửa Cơ", slug: "nap-bon-cau-rua-co" },
        ]),
      ],
    },
  ],

  "thiet-bi-bep": [
    {
      groups: [
        G("Bếp Điện - Bếp Từ", "bep-dien-tu", [
          { name: "Bếp Điện Từ Kết Hợp", slug: "bep-dien-tu-ket-hop" },
          { name: "Bếp Từ", slug: "bep-tu" },
          { name: "Bếp Điện Hồng Ngoại", slug: "bep-hong-ngoai" },
        ]),
        G("Bếp Gas", "bep-gas", [
          { name: "Bếp Gas Teka", slug: "bep-gas-teka" },
          { name: "Bếp Gas Malloca", slug: "bep-gas-malloca" },
        ]),
        G("Máy Hút Mùi", "may-hut-mui", [
          { name: "Máy Hút Mùi Ống Khói", slug: "may-hut-mui-ong-khoi" },
          { name: "Máy Hút Mùi Đảo", slug: "may-hut-mui-dao" },
          { name: "Máy Hút Mùi Âm Tủ", slug: "may-hut-mui-am-tu" },
          { name: "Máy Hút Mùi Cổ Điển", slug: "may-hut-mui-co-dien" },
        ]),
      ],
    },
    {
      groups: [
        G("Máy Rửa Chén", "may-rua-chen-bat", [
          { name: "Máy Rửa Chén Âm Tủ", slug: "may-rua-bat-am-tu" },
          { name: "Máy Rửa Chén Độc Lập", slug: "may-rua-bat-doc-lap" },
          { name: "Máy Rửa Chén Mini", slug: "may-rua-chen-mini" },
          { name: "Máy Rửa Chén Bosch", slug: "may-rua-chen-bosch" },
          { name: "Máy Rửa Chén Teka", slug: "may-rua-chen-teka" },
          { name: "Máy Rửa Chén Malloca", slug: "may-rua-chen-malloca" },
        ]),
        G("Lò Nướng Đa Năng", "lo-nuong-da-nang", [
          { name: "Lò Nướng Bosch", slug: "lo-nuong-bosch" },
          { name: "Lò Nướng Hafele", slug: "lo-nuong-hafele" },
          { name: "Lò Nướng Malloca", slug: "lo-nuong-malloca" },
          { name: "Lò Nướng Teka", slug: "lo-nuong-teka" },
        ]),
      ],
    },
    {
      groups: [
        G("Lò Vi Sóng", "lo-vi-song", [
          { name: "Lò Vi Sóng Bosch", slug: "lo-nuong-bosch" },
          { name: "Lò Vi Sóng Hafele", slug: "lo-nuong-hafele" },
          { name: "Lò Vi Sóng Malloca", slug: "lo-nuong-malloca" },
          { name: "Lò Vi Sóng Teka", slug: "lo-nuong-teka" },
        ]),
        G("Tủ Lạnh", "tu-lanh", [
          { name: "Tủ Lạnh Bosch", slug: "tu-lanh-bosch" },
          { name: "Tủ Lạnh Hafele", slug: "tu-lanh-hafele" },
          { name: "Tủ Lạnh Teka", slug: "tu-lanh-teka" },
        ]),
        G("Chậu Rửa Chén", "chau-rua-inox", [
          { name: "Chậu Rửa Chén Inox", slug: "chau-rua-chen-inox" },
          { name: "Chậu Rửa Chén Đá", slug: "chau-rua-chen-da" },
        ]),
      ],
    },
    {
      groups: [
        G("Vòi Rửa Chén", "voi-bep-voi-rua-chen", [
          { name: "Vòi Bếp Rút Dây", slug: "voi-bep-rut-day" },
          { name: "Vòi Bếp Đá", slug: "voi-rua-chen-da" },
          { name: "Vòi Bếp Lạnh", slug: "voi-rua-chen-lanh" },
        ]),
        G("Tủ Rượu", "tu-ruou", []),
        G("Máy Lọc Nước", "may-loc-nuoc", []),
        G("Máy Giặt – Máy Sấy", "may-giat-may-say", []),
        G("Đồ Gia Dụng", "gia-dung", []),
      ],
    },
  ],

  "thiet-bi-nuoc": [
    {
      groups: [
        G("Bồn nước", "bon-nuoc", [
          { name: "Bồn Nước Đại Thành", slug: "bon-nuoc-dai-thanh" },
          { name: "Bồn Nước Sơn Hà", slug: "bon-nuoc-son-ha" },
          { name: "Bồn Nước Inox", slug: "bon-nuoc-inox" },
          { name: "Bồn Nước Nhựa", slug: "bon-nuoc-nhua" },
          { name: "Bồn Nước Công Nghiệp", slug: "bon-nuoc-cong-nghiep" },
          { name: "Bồn Tự Hoại", slug: "bon-tu-hoai" },
        ]),
        G("Năng Lượng Mặt Trời", "may-nuoc-nong-nang-luong-mat-troi", [
          { name: "Máy Nước Nóng Đại Thành", slug: "may-nuoc-nong-dai-thanh" },
          { name: "Thái Dương Năng Sơn Hà", slug: "thai-duong-nang" },
          { name: "Máy Nước Nóng Ferroli", slug: "may-nuoc-nong-nang-luong-mat-troi-ferroli" },
          { name: "Máy Nước Nóng Ariston", slug: "may-nuoc-nong-nang-luong-mat-troi-ariston" },
        ]),
      ],
    },
    {
      groups: [
        G("Máy Lọc Nước", "may-loc-nuoc", [
          { name: "Máy Lọc Nước Đại Thành", slug: "may-loc-nuoc-dai-thanh" },
          { name: "Máy Lọc Nước Sơn Hà", slug: "may-loc-nuoc-son-ha" },
          { name: "Máy Lọc Nước Cleansui", slug: "may-loc-nuoc-cleansui" },
        ]),
        G("Chậu Rửa Inox", "chau-rua-inox", [
          { name: "Chậu Inox Đại Thành", slug: "chau-rua-inox-dai-thanh" },
          { name: "Chậu Inox Sơn Hà", slug: "chau-rua-inox-son-ha" },
          { name: "Chậu Rửa Chén Malloca", slug: "chau-rua-chen-malloca" },
          { name: "Chậu Rửa Chén Hafele", slug: "chau-rua-chen-hafele" },
          { name: "Chậu Rửa Chén Teka", slug: "chau-rua-chen-teka" },
        ]),
      ],
    },
    {
      groups: [
        G("Máy Nước Nóng", "may-nuoc-nong", [
          { name: "Máy Nước Nóng Trực Tiếp", slug: "may-nuoc-nong-truc-tiep" },
          { name: "Máy Nước Nóng Gián Tiếp", slug: "may-nuoc-nong-gian-tiep" },
          { name: "Máy Nước Nóng Ferroli", slug: "may-nuoc-nong-dien-ferroli" },
          { name: "Máy Nước Nóng Ariston", slug: "may-nuoc-nong-dien-ariston" },
          { name: "Máy Nước Nóng Stiebel Eltron", slug: "may-nuoc-nong-stiebel-eltron" },
          { name: "Máy Nước Nóng Panasonic", slug: "may-nuoc-nong-dien-panasonic" },
        ]),
      ],
    },
  ],

  "thiet-bi-khoa": [
    {
      groups: [
        G("Khóa Điện Tử", "khoa-dien-tu", [{ name: "Khóa điện tử Yale", slug: "khoa-dien-tu-yale" }]),
        G("Khóa Cửa Chính", "khoa-cua-chinh", [{ name: "Khóa cửa chính Yale", slug: "khoa-cua-chinh-yale" }]),
        G("Khóa Cửa Phòng", "khoa-cua-phong", [{ name: "Khóa cửa phòng Yale", slug: "khoa-cua-phong-yale" }]),
        G("Khóa Bấm Móc", "khoa-bam-moc", [{ name: "Khóa móc Yale", slug: "khoa-bam-moc-yale" }]),
      ],
    },
    {
      groups: [
        G("Khóa Du Lịch", "khoa-du-lich", [{ name: "Khóa du lịch Yale", slug: "khoa-du-lich-yale" }]),
        G("Phụ Kiện Cửa", "phu-kien-cua", [{ name: "Phụ kiện cửa Yale", slug: "phu-kien-cua-yale" }]),
        G("Bản Lề Phụ Kiện Kính", "ban-le-phu-kien-kinh", [{ name: "Phụ kiện kính Yale", slug: "phu-kien-cua-kinh-yale" }]),
        G("Két Sắt", "ket-sat", []),
      ],
    },
  ],

  "thiet-bi-dien": [
    {
      groups: [
        G("Công Tắc – Ổ Cắm", "cong-tac-o-cam", [
          { name: "Công Tắc Panasonic", slug: "cong-tac-o-cam-panasonic" },
          { name: "Công Tắc Schneider", slug: "cong-tac-o-cam-schneider" },
        ]),
        G("Đèn Led Chiếu Sáng", "den-led-chieu-sang", [
          { name: "Đèn Led Panasonic", slug: "den-led.panasonic" },
          { name: "Đèn Led Duhal", slug: "den-led-duhal" },
          { name: "Đèn Led MPE", slug: "den-led-mpe" },
        ]),
        G("Đèn Trang Trí", "den-trang-tri", []),
      ],
    },
    {
      groups: [
        G("Thiết Bị Quạt", "thiet-bi-quat", [
          { name: "Quạt", slug: "quat" },
          { name: "Quạt Hút Thông Gió", slug: "quat-hut-thong-gio" },
          { name: "Máy Lọc Không Khí", slug: "may-loc-khong-khi" },
        ]),
        G("CB – Đóng Cắt", "cb-thiet-bi-dong-cat", []),
        G("Dây Cáp Điện", "day-cap-dien", []),
        G("Ống Luồn Dây Điện", "ong-luon-day-dien", []),
        G("Tủ Điện", "tu-dien", []),
        G("Điện Gia Dụng", "dien-dan-dung", []),
      ],
    },
  ],
};

/** Flatten L2 groups for mobile accordion */
export function getMegaMenuFlatGroups(groupSlug: TdmMenuGroup): MegaMenuGroupItem[] {
  return (MEGA_MENU_COLUMNS[groupSlug] ?? []).flatMap((col) => col.groups);
}

let megaMenuCategorySlugsCache: Set<string> | null = null;

/** All category slugs referenced in mega menu (L2 headings + L3 links) */
export function getMegaMenuCategorySlugs(): Set<string> {
  if (megaMenuCategorySlugsCache) return megaMenuCategorySlugsCache;
  const slugs = new Set<string>();
  for (const cols of Object.values(MEGA_MENU_COLUMNS)) {
    for (const col of cols) {
      for (const group of col.groups) {
        slugs.add(group.headingSlug);
        for (const link of group.links) slugs.add(link.slug);
      }
    }
  }
  megaMenuCategorySlugsCache = slugs;
  return slugs;
}

export function getMegaMenuBrandSlugs(): string[] {
  const slugs = new Set<string>();
  for (const group of MEGA_MENU_BRANDS) {
    for (const b of group.brands) slugs.add(b.slug);
  }
  return [...slugs];
}
