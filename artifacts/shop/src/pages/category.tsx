import { useState } from "react";
import { Link } from "wouter";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useListProducts, useListBrands, useListCategories } from "@workspace/api-client-react";
import { ChevronRight, Filter, SlidersHorizontal, LayoutGrid, List, ArrowUpDown } from "lucide-react";

const PRICE_PRESETS = [
  { label: "Dưới 5 triệu", min: 0, max: 5000000 },
  { label: "5 - 10 triệu", min: 5000000, max: 10000000 },
  { label: "10 - 20 triệu", min: 10000000, max: 20000000 },
  { label: "20 - 35 triệu", min: 20000000, max: 35000000 },
  { label: "Trên 35 triệu", min: 35000000, max: undefined },
];

const SORT_OPTIONS = [
  { label: "Mặc định", value: "default" },
  { label: "Giá tăng dần", value: "price_asc" },
  { label: "Giá giảm dần", value: "price_desc" },
  { label: "Bán chạy nhất", value: "bestseller" },
  { label: "Mới nhất", value: "newest" },
];

export function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = params.slug === "all" ? undefined : params.slug;
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [pricePreset, setPricePreset] = useState<number | null>(null);

  const { data: productsData, isLoading } = useListProducts({
    category: slug,
    page,
    limit: 12,
    minPrice,
    maxPrice,
    brand: selectedBrands.length > 0 ? selectedBrands.join(",") : undefined,
    tab: sortBy === "bestseller" ? "bestseller" : sortBy === "newest" ? "newest" : undefined,
  });

  const { data: brands } = useListBrands();
  const { data: categories } = useListCategories();

  const currentCategory = categories?.find(c =>
    c.slug === slug || c.children?.some(ch => ch.slug === slug)
  );
  const currentSubcategory = currentCategory?.children?.find(ch => ch.slug === slug);
  const categoryName = currentSubcategory?.name || currentCategory?.name || (slug ? slug : "Tất cả sản phẩm");

  const handleBrandChange = (brandSlug: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandSlug) ? prev.filter(b => b !== brandSlug) : [...prev, brandSlug]
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

  const clearFilters = () => {
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSelectedBrands([]);
    setPricePreset(null);
    setPage(1);
  };

  const hasFilters = minPrice != null || maxPrice != null || selectedBrands.length > 0;

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="container mx-auto px-4 py-5">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-4 gap-1.5">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          {currentCategory && currentSubcategory && (
            <>
              <Link href={`/danh-muc/${currentCategory.slug}`} className="hover:text-primary transition-colors">
                {currentCategory.name}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
            </>
          )}
          <span className="text-foreground font-medium">{categoryName}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar Filters */}
          <div className="w-full md:w-60 shrink-0">
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden sticky top-20">
              <div className="bg-primary/5 px-4 py-3 border-b border-border flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2 text-sm">
                  <SlidersHorizontal className="w-4 h-4" />
                  Bộ lọc sản phẩm
                </h3>
                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs text-destructive hover:underline">
                    Xóa tất cả
                  </button>
                )}
              </div>

              <div className="p-4 space-y-5">
                {/* Price Presets */}
                <div>
                  <h4 className="font-semibold text-sm mb-3">Khoảng giá</h4>
                  <div className="space-y-1.5">
                    {PRICE_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => pricePreset === idx ? (setPricePreset(null), setMinPrice(undefined), setMaxPrice(undefined)) : handlePricePreset(idx)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${pricePreset === idx ? "bg-primary text-primary-foreground" : "hover:bg-primary/5 border border-border"}`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Input
                      type="number"
                      placeholder="Từ"
                      value={minPrice || ""}
                      onChange={e => { setMinPrice(e.target.value ? Number(e.target.value) : undefined); setPricePreset(null); }}
                      className="h-8 text-xs"
                    />
                    <Input
                      type="number"
                      placeholder="Đến"
                      value={maxPrice || ""}
                      onChange={e => { setMaxPrice(e.target.value ? Number(e.target.value) : undefined); setPricePreset(null); }}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>

                {/* Brand Filter */}
                {brands && brands.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-3">Thương hiệu</h4>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {brands.map(brand => (
                        <label key={brand.id} className="flex items-center gap-2.5 cursor-pointer group">
                          <Checkbox
                            id={`brand-${brand.id}`}
                            checked={selectedBrands.includes(brand.slug)}
                            onCheckedChange={() => handleBrandChange(brand.slug)}
                          />
                          <span className="text-sm group-hover:text-primary transition-colors">
                            {brand.name}
                            <span className="text-muted-foreground ml-1">({brand.productCount})</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-grow min-w-0">
            {/* Toolbar */}
            <div className="bg-white p-3 rounded-xl border border-border shadow-sm mb-4 flex flex-wrap justify-between items-center gap-3">
              <div>
                <h1 className="text-lg font-bold">{categoryName}</h1>
                <p className="text-xs text-muted-foreground">{productsData?.total || 0} sản phẩm</p>
              </div>
              <div className="flex items-center gap-2">
                {/* Sort */}
                <div className="flex items-center gap-1.5 text-sm">
                  <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="text-sm border border-border rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {SORT_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                {/* View toggle */}
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 transition-colors ${viewMode === "grid" ? "bg-primary text-white" : "hover:bg-gray-50"}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 transition-colors ${viewMode === "list" ? "bg-primary text-white" : "hover:bg-gray-50"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-100 aspect-[3/4] rounded-xl" />
                ))}
              </div>
            ) : productsData?.data && productsData.data.length > 0 ? (
              <>
                <div className={viewMode === "grid"
                  ? "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
                  : "flex flex-col gap-3"
                }>
                  {productsData.data.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {productsData.totalPages > 1 && (
                  <div className="flex justify-center mt-8 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === 1}
                      onClick={() => setPage(p => p - 1)}
                    >
                      &laquo; Trước
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(productsData.totalPages, 7) }).map((_, i) => (
                        <Button
                          key={i}
                          variant={page === i + 1 ? "default" : "outline"}
                          size="sm"
                          className="w-9 h-9 p-0"
                          onClick={() => setPage(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === productsData.totalPages}
                      onClick={() => setPage(p => p + 1)}
                    >
                      Sau &raquo;
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-border">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="font-semibold text-lg mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-muted-foreground mb-6">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác.</p>
                <Button onClick={clearFilters} variant="outline">
                  Xóa bộ lọc
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
