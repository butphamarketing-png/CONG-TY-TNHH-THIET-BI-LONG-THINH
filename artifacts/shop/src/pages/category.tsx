import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import {
  getCategoryBySlug,
  getCategoryBreadcrumb,
} from "@/lib/catalog-service";
import { useBrands, useProductList } from "@/hooks/use-catalog";
import { getBrandsForGroup } from "@/lib/category-utils";
import { categoryUrl } from "@/lib/urls";
import type { ProductListParams } from "@/types/product";
import { CategoryTileGrid } from "@/components/category/CategoryTileGrid";
import { TdmProductCard } from "@/components/category/TdmProductCard";
import { CategoryBrandFilterTiles } from "@/components/category/CategoryBrandFilterTiles";
import {
  CategoryFilterSidebar,
  type PricePreset,
} from "@/components/category/CategoryFilterSidebar";
import { CategoryListingToolbar } from "@/components/category/CategoryListingToolbar";
import { CategoryPagination } from "@/components/category/CategoryPagination";
import { CategorySeoBlock } from "@/components/category/CategorySeoBlock";

const PRICE_PRESETS: PricePreset[] = [
  { label: "Dưới 5 triệu", min: 0, max: 5000000 },
  { label: "5 - 10 triệu", min: 5000000, max: 10000000 },
  { label: "10 - 20 triệu", min: 10000000, max: 20000000 },
  { label: "20 - 35 triệu", min: 20000000, max: 35000000 },
  { label: "Trên 35 triệu", min: 35000000, max: undefined },
];

const ITEMS_PER_PAGE = 48;

export function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<ProductListParams["sort"]>("bestseller");
  const [pricePreset, setPricePreset] = useState<number | null>(null);

  const { brands: BRANDS } = useBrands();
  const brandLogoMap = useMemo(
    () => new Map(BRANDS.map((b) => [b.slug, b.logo])),
    [BRANDS],
  );

  const activeCategory = getCategoryBySlug(slug);
  const breadcrumb = getCategoryBreadcrumb(slug);
  const rootCategory = breadcrumb[0] ?? activeCategory;

  const categoryName = activeCategory?.name || slug;
  const categoryDescription = activeCategory?.description || rootCategory?.description;
  const subcategories = activeCategory?.children ?? [];

  const groupBrands = rootCategory
    ? getBrandsForGroup(BRANDS, rootCategory.groupSlug)
    : [];

  const { data: paginatedProducts, total, totalPages, loading } = useProductList({
    categorySlug: selectedProductTypes.length > 0 ? undefined : slug,
    categorySlugs: selectedProductTypes.length > 0 ? selectedProductTypes : undefined,
    brandSlugs: selectedBrands.length > 0 ? selectedBrands : undefined,
    minPrice,
    maxPrice,
    sort: sortBy,
    page,
    limit: ITEMS_PER_PAGE,
  });

  const handleBrandToggle = (brandSlug: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandSlug)
        ? prev.filter((b) => b !== brandSlug)
        : [...prev, brandSlug],
    );
    setPage(1);
  };

  const handleProductTypeToggle = (typeSlug: string) => {
    setSelectedProductTypes((prev) =>
      prev.includes(typeSlug)
        ? prev.filter((s) => s !== typeSlug)
        : [...prev, typeSlug],
    );
    setPage(1);
  };

  const handlePricePreset = (idx: number) => {
    const preset = PRICE_PRESETS[idx];
    setPricePreset(idx);
    setMinPrice(preset.min || undefined);
    setMaxPrice(preset.max);
    setPage(1);
  };

  const clearPricePreset = () => {
    setPricePreset(null);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setPage(1);
  };

  const clearFilters = () => {
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSelectedBrands([]);
    setSelectedProductTypes([]);
    setPricePreset(null);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as ProductListParams["sort"]);
    setPage(1);
  };

  const hasFilters =
    minPrice != null ||
    maxPrice != null ||
    selectedBrands.length > 0 ||
    selectedProductTypes.length > 0;

  if (!activeCategory) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Không tìm thấy danh mục</h1>
        <p className="text-gray-500 mb-6">Danh mục &quot;{slug}&quot; không tồn tại.</p>
        <Button asChild>
          <Link href="/">Về trang chủ</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="container mx-auto px-4 py-5">
        {/* Breadcrumb */}
        <div className="flex items-center flex-wrap text-sm text-gray-500 mb-4 gap-1.5">
          <Link href="/" className="hover:text-orange-600 transition-colors">
            Trang chủ
          </Link>
          {breadcrumb.slice(0, -1).map((crumb) => (
            <span key={crumb.id} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5" />
              <Link
                href={categoryUrl(crumb.slug)}
                className="hover:text-orange-600 transition-colors"
              >
                {crumb.name}
              </Link>
            </span>
          ))}
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-800 font-medium">{categoryName}</span>
        </div>

        {/* Page title */}
        <div className="mb-5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{categoryName}</h1>
          {categoryDescription && (
            <p className="text-sm text-gray-500 mt-1">{categoryDescription}</p>
          )}
        </div>

        {/* Subcategory tiles */}
        <CategoryTileGrid categories={subcategories} />

        {/* Sidebar + listing */}
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="lg:w-56 xl:w-64 shrink-0">
            <CategoryFilterSidebar
              brands={groupBrands}
              subcategories={subcategories}
              pricePresets={PRICE_PRESETS}
              selectedBrands={selectedBrands}
              selectedProductTypes={selectedProductTypes}
              pricePreset={pricePreset}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onBrandToggle={handleBrandToggle}
              onProductTypeToggle={handleProductTypeToggle}
              onPricePreset={handlePricePreset}
              onClearPricePreset={clearPricePreset}
              onMinPriceChange={(v) => {
                setMinPrice(v);
                setPricePreset(null);
                setPage(1);
              }}
              onMaxPriceChange={(v) => {
                setMaxPrice(v);
                setPricePreset(null);
                setPage(1);
              }}
              onClearAll={clearFilters}
              hasFilters={hasFilters}
            />
          </div>

          <div className="flex-grow min-w-0">
            <CategoryBrandFilterTiles
              brands={groupBrands}
              selectedBrandSlugs={selectedBrands}
              onBrandToggle={handleBrandToggle}
            />

            <CategoryListingToolbar
              value={sortBy ?? "bestseller"}
              onChange={handleSortChange}
              total={total}
            />

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-100 aspect-[3/4] rounded-xl" />
                ))}
              </div>
            ) : paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                  {paginatedProducts.map((product) => (
                    <TdmProductCard
                      key={product.id}
                      product={product}
                      brandLogo={brandLogoMap.get(product.brandSlug)}
                    />
                  ))}
                </div>

                <CategoryPagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="font-semibold text-lg mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500 mb-6">
                  Thử thay đổi bộ lọc hoặc chọn danh mục con khác.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Xóa bộ lọc
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* SEO block below listing */}
        {activeCategory.seo && (
          <CategorySeoBlock seo={activeCategory.seo} categoryName={categoryName} />
        )}
      </div>
    </div>
  );
}
