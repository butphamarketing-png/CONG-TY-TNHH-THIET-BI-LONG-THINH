import type { TdmProduct } from "@/types/product";
import productsImported from "@/data/products.imported.json";

/** Use imported products from crawler instead of mock data */
export const PRODUCTS_SEED: TdmProduct[] = productsImported as TdmProduct[];
