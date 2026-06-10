import { NEWS, SHOWROOMS, HERO_MAIN_BANNER, SIDE_BANNERS } from "@/lib/tdm-data";

export interface SiteContent {
  company: {
    name: string;
    legalName: string;
    taxCode: string;
    phone: string;
    phoneDisplay: string;
    hotline: string;
    email: string;
    address: string;
  };
  banners: {
    hero: { title: string; image: string; link: string };
    sideTop: { title: string; image: string; link: string };
    sideBottom: { title: string; image: string; link: string };
  };
  showrooms: typeof SHOWROOMS;
  news: typeof NEWS;
  socialLinks: Array<{
    id: string;
    label: string;
    href: string;
    type: string;
  }>;
}

const DEFAULTS: SiteContent = {
  company: {
    name: "LONG THỊNH",
    legalName: "CÔNG TY TNHH THIẾT BỊ LONG THỊNH",
    taxCode: "0311528071-001",
    phone: "0906752821",
    phoneDisplay: "0906 752 821",
    hotline: "0933.322.232 - 028.2244.8333",
    email: "info@longthinh.vn",
    address: "504 Nguyễn Văn Quá, P. Đông Hưng Thuận, TP Hồ Chí Minh",
  },
  banners: {
    hero: HERO_MAIN_BANNER,
    sideTop: SIDE_BANNERS.top,
    sideBottom: SIDE_BANNERS.bottom,
  },
  showrooms: SHOWROOMS,
  news: NEWS,
  socialLinks: [],
};

let cache: SiteContent | null = null;

export async function loadSiteContent(): Promise<SiteContent> {
  if (cache) return cache;
  try {
    const res = await fetch("/data/site-content.json");
    if (res.ok) {
      const data = (await res.json()) as SiteContent;
      cache = { ...DEFAULTS, ...data };
      return cache;
    }
  } catch {
    /* use defaults */
  }
  cache = DEFAULTS;
  return cache;
}

export function getSiteContentSync(): SiteContent {
  return cache ?? DEFAULTS;
}
