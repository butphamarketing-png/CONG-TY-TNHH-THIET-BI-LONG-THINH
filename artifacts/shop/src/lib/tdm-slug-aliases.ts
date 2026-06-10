/**
 * TDM.vn slug aliases — scraped 2026-06-09 from https://www.tdm.vn/
 *
 * canonical: real TDM URL slug (returns 200)
 * aliases: legacy/wrong slugs that should resolve + load same product chunks
 */
export const TDM_CANONICAL_ALIASES: Record<string, string[]> = {
  "bon-cau-bet-ve-sinh": ["bon-cau"],
  "ban-cau-2-khoi": ["bon-cau-2-khoi"],
  "ban-nap-bon-cau": ["nap-bon-cau"],
  "nap-bon-cau-thong-minh": ["nap-bon-cau-dien-tu"],
  "chau-rua-lavabo": ["chau-lavabo"],
  "chau-treo-tuong": ["lavabo-treo-tuong"],
  "chau-dat-ban": ["lavabo-dat-ban"],
  "chau-am-ban": ["lavabo-am-ban"],
  "voi-nuoc-nong-lanh": ["voi-lavabo-nong-lanh"],
  "voi-rua-cam-ung": ["voi-cam-ung"],
  "bo-xa-chau-rua-mat-lavabo": ["bo-xa-lavabo"],
  "voi-sen-cay": ["voi-sen", "sen-cay"],
  "voi-sen-tam-am-tuong": ["sen-am-tuong", "voi-sen-tam-am-tuong"],
  "bo-voi-sen-xa-bon": ["voi-bon-tam"],
  "bon-tieu-nam-nu": ["bon-tieu"],
  "bon-tieu-nam-treo-tuong": ["bon-tieu-treo-tuong"],
  "bon-tieu-nam-dat-san": ["bon-tieu-dat-san"],
  "gia-xa-phong-ban-chai": ["gia-xa-phong"],
  "ke-kinh-phong-tam": ["ke-kinh"],
  "lo-giay-ve-sinh": ["lo-giay"],
  "thoat-san": ["pheu-thoat-san"],
  "voi-xa-lanh": ["voi-lanh-gan-tuong"],
  "bep-hong-ngoai": ["bep-dien-hong-ngoai"],
  "lo-nuong-da-nang": ["lo-nuong"],
  "may-rua-chen-bat": ["may-rua-chen"],
  "may-rua-bat-am-tu": ["may-rua-chen-am-tu"],
  "may-rua-bat-doc-lap": ["may-rua-chen-doc-lap"],
  "voi-bep-voi-rua-chen": ["voi-rua-chen"],
  "chau-rua-inox": ["chau-rua-chen"],
  "bon-nuoc-inox": ["bon-inox"],
  "bon-nuoc-nhua": ["bon-nhua"],
  "bon-nuoc-cong-nghiep": ["bon-cong-nghiep"],
  "vat-lieu-nuoc": ["thiet-bi-nuoc"],
  "may-nuoc-nong-nang-luong-mat-troi": ["nang-luong-mat-troi"],
  "chau-rua-inox-dai-thanh": ["chau-inox-dai-thanh"],
  "chau-rua-inox-son-ha": ["chau-inox-son-ha"],
  "may-nuoc-nong-dien-ferroli": ["may-nuoc-nong-ferroli"],
  "may-nuoc-nong-dien-ariston": ["may-nuoc-nong-ariston"],
  "may-nuoc-nong-dien-panasonic": ["may-nuoc-nong-panasonic"],
  "thiet-bi-khoa-cua": ["thiet-bi-khoa", "khoa-cua"],
  "khoa-bam-moc-yale": ["khoa-moc-yale"],
  "gia-dung": ["do-gia-dung"],
  "thiet-bi-ve-sinh-toto": ["toto"],
  "thiet-bi-ve-sinh-inax": ["inax"],
  "thiet-bi-ve-sinh-caesar": ["caesar"],
  "thiet-bi-ve-sinh-american-standard": ["american-standard"],
  "thiet-bi-ve-sinh-viglacera": ["viglacera"],
  "thiet-bi-ve-sinh-cotto": ["cotto"],
  "thiet-bi-ve-sinh-grohe": ["grohe"],
  "thiet-bi-ve-sinh-moen": ["moen"],
  "thiet-bi-bep-bosch": ["bosch"],
  "thiet-bi-bep-teka": ["teka"],
  "thiet-bi-bep-malloca": ["malloca"],
  "khoa-yale": ["yale"],
  "gls-mirror": ["gls"],
  "su-thien-thanh": ["thien-thanh"],
  "mitsubishi-cleansui": ["cleansui"],
  "hafele": ["thiet-bi-bep-hafele"],
  "cong-tac-o-cam-panasonic": ["cong-tac-panasonic"],
  "cong-tac-o-cam-schneider": ["cong-tac-schneider"],
  "den-led.panasonic": ["den-led-panasonic"],
  "quat": ["quat-dien"],
  "phu-kien-cua-kinh-yale": ["phu-kien-kinh-yale"],
  "lo-nuong-bosch": ["lo-vi-song-bosch"],
  "lo-nuong-hafele": ["lo-vi-song-hafele"],
  "lo-nuong-malloca": ["lo-vi-song-malloca"],
  "lo-nuong-teka": ["lo-vi-song-teka"],
  "cb-thiet-bi-dong-cat": ["cb-dong-cat"],
  "dien-dan-dung": ["dien-gia-dung"],
};

import tdmScrapedSlugs from "@/data/tdm-category-slugs.json";

let scrapedSlugSet: Set<string> | null = null;

/** All slugs found on tdm.vn homepage menu (193 URLs) */
export function isTdmLiveSlug(slug: string): boolean {
  if (!scrapedSlugSet) scrapedSlugSet = new Set(tdmScrapedSlugs as string[]);
  return scrapedSlugSet.has(slug);
}

/** Reverse map: any alias → canonical TDM slug */
const aliasToCanonical = new Map<string, string>();

function buildReverseMap() {
  if (aliasToCanonical.size > 0) return;
  for (const [canonical, aliases] of Object.entries(TDM_CANONICAL_ALIASES)) {
    aliasToCanonical.set(canonical, canonical);
    for (const a of aliases) aliasToCanonical.set(a, canonical);
  }
}

export function toCanonicalTdmSlug(slug: string): string {
  buildReverseMap();
  return aliasToCanonical.get(slug) ?? slug;
}

/** All slugs to load product chunks for a category page */
export function expandCategorySlugs(slug: string): string[] {
  buildReverseMap();
  const canonical = toCanonicalTdmSlug(slug);
  const aliases = TDM_CANONICAL_ALIASES[canonical] ?? [];
  return [...new Set([canonical, slug, ...aliases])];
}

/** All slugs that should resolve as valid category/brand pages */
export function getAllResolvableCategorySlugs(): Set<string> {
  buildReverseMap();
  const slugs = new Set<string>();
  for (const [canonical, aliases] of Object.entries(TDM_CANONICAL_ALIASES)) {
    slugs.add(canonical);
    for (const a of aliases) slugs.add(a);
  }
  return slugs;
}
