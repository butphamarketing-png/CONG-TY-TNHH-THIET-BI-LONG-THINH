import { useEffect, useState } from "react";
import {
  getBrands,
  getBrandBySlug,
  getProductBySlug,
  listProducts,
  getProductListingsForCategory,
  getHomepageListings,
  getRelatedListings,
} from "@/lib/catalog-service";
import { searchListings, getBrandListings } from "@/lib/catalog-store";
import type { Brand } from "@/types/catalog";
import type { ProductListing, ProductListParams, ProductListResult, TdmProduct } from "@/types/product";

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBrands().then((b) => {
      setBrands(b);
      setLoading(false);
    });
  }, []);

  return { brands, loading };
}

export function useBrand(slug: string) {
  const [brand, setBrand] = useState<Brand | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBrandBySlug(slug).then((b) => {
      setBrand(b);
      setLoading(false);
    });
  }, [slug]);

  return { brand, loading };
}

export function useProductDetail(slug: string) {
  const [product, setProduct] = useState<TdmProduct | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductBySlug(slug).then((p) => {
      setProduct(p);
      setLoading(false);
    });
  }, [slug]);

  return { product, loading };
}

export function useProductList(params: ProductListParams) {
  const [result, setResult] = useState<ProductListResult>({
    data: [],
    total: 0,
    page: params.page ?? 1,
    limit: params.limit ?? 48,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    listProducts(params).then((r) => {
      setResult(r);
      setLoading(false);
    });
  }, [
    params.categorySlug,
    params.categorySlugs?.join(","),
    params.brandSlug,
    params.brandSlugs?.join(","),
    params.q,
    params.sort,
    params.page,
    params.limit,
    params.minPrice,
    params.maxPrice,
    params.inStockOnly,
  ]);

  return { ...result, loading };
}

export function useCategoryListings(categorySlug: string, includeDescendants = true) {
  const [listings, setListings] = useState<ProductListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductListingsForCategory(categorySlug, includeDescendants).then((l) => {
      setListings(l);
      setLoading(false);
    });
  }, [categorySlug, includeDescendants]);

  return { listings, loading };
}

export function useHomepageListings(categorySlugs: string[], limit = 12) {
  const [listings, setListings] = useState<ProductListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getHomepageListings(categorySlugs, limit).then((l) => {
      setListings(l);
      setLoading(false);
    });
  }, [categorySlugs.join(","), limit]);

  return { listings, loading };
}

export function useBrandListings(brandSlug: string) {
  const [listings, setListings] = useState<ProductListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBrandListings(brandSlug).then((l) => {
      setListings(l);
      setLoading(false);
    });
  }, [brandSlug]);

  return { listings, loading };
}

export function useSearchListings(query: string, page = 1, limit = 48) {
  const [result, setResult] = useState({
    data: [] as ProductListing[],
    total: 0,
    page,
    limit,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    searchListings(query, page, limit).then((r) => {
      setResult(r);
      setLoading(false);
    });
  }, [query, page, limit]);

  return { ...result, loading };
}

export function useRelatedListings(product: TdmProduct | undefined, limit = 12) {
  const [listings, setListings] = useState<ProductListing[]>([]);

  useEffect(() => {
    if (!product) return;
    getRelatedListings(product, limit).then(setListings);
  }, [product?.id, limit]);

  return listings;
}
