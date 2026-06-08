import type { TdmMenuGroup } from "@/types/catalog";

/**
 * TDM homepage L2 tile slugs per industry group.
 * Order matches https://www.tdm.vn/ homepage blocks.
 */
export const TDM_HOMEPAGE_TILES: Record<TdmMenuGroup, string[]> = {
  "thiet-bi-ve-sinh": [
    "bon-cau",
    "bon-cau-dien-tu",
    "nap-bon-cau",
    "chau-lavabo",
    "voi-lavabo",
    "voi-cam-ung",
    "bon-tieu",
    "van-xa-tieu",
    "voi-sen",
    "sen-cay",
    "sen-am-tuong",
    "bon-tam",
    "voi-bon-tam",
    "phu-kien-phong-tam",
    "pheu-thoat-san",
    "voi-xit-ve-sinh",
  ],
  "thiet-bi-bep": [
    "bep-dien-tu",
    "bep-gas",
    "may-hut-mui",
    "lo-nuong",
    "lo-vi-song",
    "may-rua-chen",
    "tu-lanh",
    "voi-rua-chen",
  ],
  "thiet-bi-nuoc": [
    "bon-inox",
    "bon-nhua",
    "bon-cong-nghiep",
    "bon-tu-hoai",
    "nang-luong-mat-troi",
    "may-nuoc-nong",
    "may-loc-nuoc",
    "chau-rua-inox",
  ],
  "thiet-bi-khoa": [
    "khoa-dien-tu",
    "khoa-cua-chinh",
    "khoa-cua-phong",
    "khoa-bam-moc",
    "phu-kien-cua",
    "ket-sat",
  ],
  "thiet-bi-dien": [
    "cong-tac-o-cam",
    "den-led-chieu-sang",
    "thiet-bi-quat",
    "day-cap-dien",
    "tu-dien",
  ],
};
