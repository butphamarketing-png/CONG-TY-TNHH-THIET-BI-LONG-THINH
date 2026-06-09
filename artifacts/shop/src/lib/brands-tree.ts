import type { Brand } from "@/types/catalog";
import brandsImported from "@/data/brands.imported.json";

/** Use imported brands from crawler instead of mock data */
export const BRANDS: Brand[] = brandsImported as unknown as Brand[];
