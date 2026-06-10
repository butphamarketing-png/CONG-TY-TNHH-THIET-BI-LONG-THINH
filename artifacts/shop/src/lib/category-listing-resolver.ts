/**
 * Resolves TDM mega-menu / category-tree slugs → product listing chunks.
 *
 * Product data is chunked by ~29 L2 slugs (bon-cau-bet-ve-sinh, phu-kien-phong-tam…)
 * while URLs/mega menu use ~193 L3 leaf slugs (bon-cau-1-khoi, may-say-tay…).
 */
import { CATEGORY_TREE } from "@/lib/categories-tree";
import { findCategoryBySlug, getBreadcrumb, getDescendantSlugs } from "@/lib/category-utils";
import { MEGA_MENU_COLUMNS } from "@/lib/mega-menu-config";
import { loadProductsIndex } from "@/lib/catalog-store";
import {
  expandCategorySlugs,
  toCanonicalTdmSlug,
} from "@/lib/tdm-slug-aliases";
import type { CategoryNode } from "@/types/catalog";
import type { ProductListing } from "@/types/product";

export interface MegaMenuLinkMeta {
  name: string;
  heading: string;
  headingSlug: string;
}

const leafToChunk = new Map<string, string>();
const leafMeta = new Map<string, MegaMenuLinkMeta>();

function buildMegaMenuMaps() {
  if (leafToChunk.size > 0) return;
  for (const cols of Object.values(MEGA_MENU_COLUMNS)) {
    for (const col of cols) {
      for (const group of col.groups) {
        leafToChunk.set(group.headingSlug, group.headingSlug);
        leafMeta.set(group.headingSlug, {
          name: group.heading,
          heading: group.heading,
          headingSlug: group.headingSlug,
        });
        for (const link of group.links) {
          leafToChunk.set(link.slug, group.headingSlug);
          leafMeta.set(link.slug, {
            name: link.name,
            heading: group.heading,
            headingSlug: group.headingSlug,
          });
        }
      }
    }
  }
}

export function getMegaMenuLinkMeta(slug: string): MegaMenuLinkMeta | undefined {
  buildMegaMenuMaps();
  return leafMeta.get(toCanonicalTdmSlug(slug)) ?? leafMeta.get(slug);
}

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function productText(p: ProductListing): string {
  return normalizeText(`${p.name} ${p.slug}`);
}

/** Heuristic filters for L3 leaf slugs within an L2 listing chunk. */
const LEAF_FILTERS: Record<string, (p: ProductListing) => boolean> = {
  "bon-cau-1-khoi": (p) => {
    const t = productText(p);
    const one = /1[\s-]?khoi|mot[\s-]?khoi/.test(t);
    const two = /2[\s-]?khoi|hai[\s-]?khoi/.test(t);
    const smart = /thong minh|cam ung|dien tu|washlet|neorest|regio|saras/.test(t);
    const wall = /treo tuong/.test(t);
    return one && !two && !smart && !wall;
  },
  "ban-cau-2-khoi": (p) => {
    const t = productText(p);
    return /2[\s-]?khoi|hai[\s-]?khoi/.test(t) && !/thong minh|cam ung|dien tu/.test(t);
  },
  "bon-cau-2-khoi": (p) => LEAF_FILTERS["ban-cau-2-khoi"]!(p),
  "bon-cau-thong-minh": (p) => {
    const t = productText(p);
    return /thong minh|cam ung|dien tu|washlet|neorest|regio|saras|tu dong/.test(t);
  },
  "bon-cau-treo-tuong": (p) => /treo tuong/.test(productText(p)),
  "voi-xit-ve-sinh": (p) => /voi xit|xit ve sinh|bidet|xịt/.test(productText(p)),
  "phu-kien-bon-cau": (p) => /phu kien|nap bon|nắp|nap bon|bo xa|bộ xả/.test(productText(p)),
  "lavabo-treo-tuong": (p) => /treo tuong|treo tường/.test(productText(p)) && /lavabo|chau|chậu/.test(productText(p)),
  "chau-treo-tuong": (p) => LEAF_FILTERS["lavabo-treo-tuong"]!(p),
  "lavabo-dat-ban": (p) => /dat ban|đặt bàn|de ban/.test(productText(p)),
  "chau-dat-ban": (p) => LEAF_FILTERS["lavabo-dat-ban"]!(p),
  "lavabo-am-ban": (p) => /am ban|âm bàn/.test(productText(p)),
  "chau-am-ban": (p) => LEAF_FILTERS["lavabo-am-ban"]!(p),
  "tu-lavabo": (p) => /tu lavabo|tủ lavabo/.test(productText(p)),
  "voi-lavabo-nong-lanh": (p) => /nong lanh|nóng lạnh/.test(productText(p)) && /lavabo|voi/.test(productText(p)),
  "voi-nuoc-nong-lanh": (p) => LEAF_FILTERS["voi-lavabo-nong-lanh"]!(p),
  "voi-cam-ung": (p) => /cam ung|cảm ứng/.test(productText(p)),
  "voi-rua-cam-ung": (p) => LEAF_FILTERS["voi-cam-ung"]!(p),
  "may-say-tay": (p) => /may say|máy sấy|say tay|sấy tay|hand dryer|dryer/.test(productText(p)),
  "gia-treo-khan": (p) => /gia treo khan|giá treo khăn|treo khan/.test(productText(p)),
  "gia-xa-phong-ban-chai": (p) => /xa phong|xà phòng|xa phong/.test(productText(p)),
  "gia-xa-phong": (p) => LEAF_FILTERS["gia-xa-phong-ban-chai"]!(p),
  "ke-kinh-phong-tam": (p) => /ke kinh|kệ kính/.test(productText(p)),
  "ke-kinh": (p) => LEAF_FILTERS["ke-kinh-phong-tam"]!(p),
  "lo-giay-ve-sinh": (p) => /lo giay|lô giấy|giay ve sinh/.test(productText(p)),
  "lo-giay": (p) => LEAF_FILTERS["lo-giay-ve-sinh"]!(p),
  "guong-phong-tam": (p) => /guong|gương/.test(productText(p)),
  "thoat-san": (p) => /pheu thoat|phễu thoát|thoat san/.test(productText(p)),
  "pheu-thoat-san": (p) => LEAF_FILTERS["thoat-san"]!(p),
  "voi-xa-lanh": (p) => /voi lanh|vòi lạnh/.test(productText(p)),
  "voi-lanh-gan-tuong": (p) => LEAF_FILTERS["voi-xa-lanh"]!(p),
  "van-xa-tieu": (p) => /van xa|van xả|xả tiểu/.test(productText(p)),
  "bon-tieu-cam-ung": (p) => /cam ung|cảm ứng/.test(productText(p)) && /tieu|tiểu/.test(productText(p)),
  "bon-tieu-treo-tuong": (p) => /treo tuong/.test(productText(p)) && /tieu|tiểu/.test(productText(p)),
  "bon-tieu-nam-treo-tuong": (p) => LEAF_FILTERS["bon-tieu-treo-tuong"]!(p),
  "bon-tieu-dat-san": (p) => /dat san|đặt sàn/.test(productText(p)) && /tieu|tiểu/.test(productText(p)),
  "bon-tieu-nam-dat-san": (p) => LEAF_FILTERS["bon-tieu-dat-san"]!(p),
  "nap-bon-cau-dien-tu": (p) => /dien tu|điện tử|thong minh/.test(productText(p)) && /nap|nắp/.test(productText(p)),
  "nap-bon-cau-thong-minh": (p) => LEAF_FILTERS["nap-bon-cau-dien-tu"]!(p),
  "nap-bon-cau-rua-co": (p) => /rua co|rửa cơ/.test(productText(p)) && /nap|nắp/.test(productText(p)),
};

function walkAncestorsForChunk(
  slug: string,
  indexSlugs: Set<string>,
): string | undefined {
  buildMegaMenuMaps();
  const fromMenu = leafToChunk.get(slug);
  if (fromMenu && indexSlugs.has(fromMenu)) return fromMenu;

  const breadcrumb = getBreadcrumb(CATEGORY_TREE, slug);
  for (let i = breadcrumb.length - 1; i >= 0; i--) {
    const s = breadcrumb[i].slug;
    const chunk = leafToChunk.get(s);
    if (chunk && indexSlugs.has(chunk)) return chunk;
    if (indexSlugs.has(s)) return s;
  }
  return undefined;
}

export async function resolveListingChunkSlugs(
  categorySlug: string,
  includeDescendants = true,
): Promise<string[]> {
  buildMegaMenuMaps();
  const canonical = toCanonicalTdmSlug(categorySlug);
  const index = await loadProductsIndex();
  const indexSlugs = new Set(index.categories.map((c) => c.slug));

  if (indexSlugs.has(canonical)) {
    if (!includeDescendants) return [canonical];
    const node = findCategoryBySlug(CATEGORY_TREE, canonical);
    if (!node?.children?.length) return [canonical];

    const chunks = new Set<string>();
    for (const desc of getDescendantSlugs(node)) {
      const chunk = leafToChunk.get(desc) ?? (indexSlugs.has(desc) ? desc : undefined);
      if (chunk) chunks.add(chunk);
    }
    return chunks.size > 0 ? [...chunks] : [canonical];
  }

  const node = findCategoryBySlug(CATEGORY_TREE, canonical);
  if (node && includeDescendants && node.children?.length) {
    const chunks = new Set<string>();
    for (const desc of getDescendantSlugs(node)) {
      const chunk =
        leafToChunk.get(toCanonicalTdmSlug(desc)) ??
        (indexSlugs.has(desc) ? desc : walkAncestorsForChunk(desc, indexSlugs));
      if (chunk) chunks.add(chunk);
    }
    if (chunks.size > 0) return [...chunks];
  }

  const single = walkAncestorsForChunk(canonical, indexSlugs);
  if (single) return [single];

  for (const alias of expandCategorySlugs(canonical)) {
    if (indexSlugs.has(alias)) return [alias];
    const chunk = walkAncestorsForChunk(alias, indexSlugs);
    if (chunk) return [chunk];
  }

  return [];
}

export function hasLeafCategoryFilter(categorySlug: string): boolean {
  const canonical = toCanonicalTdmSlug(categorySlug);
  return canonical in LEAF_FILTERS;
}

export function applyLeafCategoryFilter(
  listings: ProductListing[],
  categorySlug: string,
): ProductListing[] {
  const filter = LEAF_FILTERS[toCanonicalTdmSlug(categorySlug)];
  return filter ? listings.filter(filter) : listings;
}

export function filterListingsForCategory(
  listings: ProductListing[],
  categorySlug: string,
  includeDescendants = true,
): ProductListing[] {
  const canonical = toCanonicalTdmSlug(categorySlug);
  const expanded = new Set(expandCategorySlugs(canonical));

  const direct = listings.filter((p) => expanded.has(toCanonicalTdmSlug(p.categorySlug)));
  if (direct.length > 0 && listings.length === direct.length) {
    return listings;
  }

  if (!includeDescendants) {
    const filter = LEAF_FILTERS[canonical];
    if (filter) return listings.filter(filter);
    return direct.length > 0 ? direct : listings;
  }

  const node = findCategoryBySlug(CATEGORY_TREE, canonical);
  if (node?.children?.length) {
    return listings;
  }

  const filter = LEAF_FILTERS[canonical];
  if (filter) return listings.filter(filter);

  if (getMegaMenuLinkMeta(canonical)) {
    return listings;
  }

  return direct.length > 0 ? direct : listings;
}

export function buildVirtualCategory(slug: string): CategoryNode | undefined {
  const meta = getMegaMenuLinkMeta(slug);
  if (!meta) return undefined;

  const canonical = toCanonicalTdmSlug(slug);
  const parentSlug = meta.headingSlug;
  const parent = findCategoryBySlug(CATEGORY_TREE, parentSlug);

  return {
    id: -Math.abs(canonical.split("").reduce((a, c) => a + c.charCodeAt(0), 0)),
    name: meta.name,
    slug: canonical,
    parentId: parent?.id ?? null,
    level: (parent?.level ?? 2) + 1,
    groupSlug: parent?.groupSlug ?? "thiet-bi-ve-sinh",
    sortOrder: 0,
    showProductGrid: true,
  };
}
