/**
 * TDM-compatible flat URL helpers.
 * tdm.vn pattern: /bon-cau-1-khoi, /toto, /bon-cau-inax-ac-989vn
 */

export function categoryUrl(slug: string): string {
  return `/${slug}`;
}

export function brandUrl(slug: string): string {
  return `/${slug}`;
}

export function productUrl(slug: string): string {
  return `/${slug}`;
}

/** Legacy paths — kept for redirects */
export function legacyCategoryUrl(slug: string): string {
  return `/danh-muc/${slug}`;
}

export function legacyBrandUrl(slug: string): string {
  return `/thuong-hieu/${slug}`;
}

export function legacyProductUrl(slug: string): string {
  return `/san-pham/${slug}`;
}
