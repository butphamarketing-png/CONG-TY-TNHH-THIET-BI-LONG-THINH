import { useState } from "react";
import { Link } from "wouter";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronRight,
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ArrowUpDown,
  Flame,
  Grid3X3,
} from "lucide-react";
import { CATEGORIES, BRANDS, PRODUCTS } from "@/lib/tdm-data";

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
  const slug = params.slug;
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [pricePreset, setPricePreset] = useState<number | null>(null);

  // Find current category
  let currentCategory: any = null;
  let currentSubcategory: any = null;
  
  for (const cat of CATEGORIES) {
    if (cat.slug === slug) {
      currentCategory = cat;
      break;
    }
    if (cat.children) {
      for (const child of cat.children) {
        if (child.slug === slug) {
          currentCategory = cat;
          currentSubcategory = child;
          break;
        }
        if (child.children) {
          for (const grandChild of child.children) {
            if (grandChild.slug === slug) {
              currentCategory = cat;
              currentSubcategory = child;
              break;
            }
          }
        }
      }
    }
  }

  const categoryName = currentSubcategory?.name || currentCategory?.name || slug;
  const activeCategory = currentSubcategory || currentCategory;
  const categoryBanner = activeCategory?.banner || currentCategory?.banner;
  const categoryDescription = activeCategory?.description || currentCategory?.description;
  const subcategories = activeCategory?.children || (currentSubcategory ? [] : currentCategory?.children || []);

  // Filter products
  let filteredProducts = [...PRODUCTS];
  if (slug) {
    filteredProducts = filteredProducts.filter(p =>
      p.categorySlug === slug ||
      CATEGORIES.some(c => c.slug === slug && c.children?.some(ch => ch.slug === p.categorySlug))
    );
  }

  const bestSellers = [...filteredProducts].sort((a,b) => b.soldCount - a.soldCount).slice(0, 6);
  const categoryBrands = BRANDS.filter(b => 
    filteredProducts.some(p => p.brandSlug === b.slug)
  );

  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedBrands.includes(p.brandSlug));
  }

  if (minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
  }
  if (maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
  }

  // Sort products
  if (sortBy === "price_asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price_desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "bestseller") {
    filteredProducts.sort((a, b) => b.soldCount - a.soldCount);
  } else if (sortBy === "newest") {
    filteredProducts.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  }

  const total = filteredProducts.length;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(total / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleBrandChange = (brandSlug: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandSlug) ? prev.filter((b) => b !== brandSlug) : [...prev, brandSlug]
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
        <div className="flex items-center text-sm text-gray-500 mb-4 gap-1.5">
          <Link href="/" className="hover:text-red-600 transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          {currentCategory && currentSubcategory && (
            <>
              <Link href={`/danh-muc/${currentCategory.slug}`} className="hover:text-red-600 transition-colors">
                {currentCategory.name}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
            </>
          )}
          <span className="text-gray-800 font-medium">{categoryName}</span>
        </div>

        {/* Category Banner */}
        {categoryBanner && (
          <div className="mb-6 rounded-xl overflow-hidden h-40 md:h-48 flex items-center justify-center bg-red-600">
            <div className="text-white text-center">
              <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
              {categoryDescription && <p className="text-sm opacity-90">{categoryDescription}</p>}
            </div>
          </div>
        )}

        {/* Subcategories Grid */}
        {subcategories && subcategories.length > 0 && (
          <div className="mb-6 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <Grid3X3 className="w-4 h-4 text-red-600" />
              Danh mục con
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {subcategories.map((subcat: any) => (
                <Link
                  key={subcat.id}
                  href={`/danh-muc/${subcat.slug}`}
                  className="flex flex-col items-center p-3 rounded-lg border border-gray-100 hover:border-red-500 hover:bg-red-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl mb-2 group-hover:bg-white">
                    {subcat.icon || "🛒"}
                  </div>
                  <span className="text-xs text-gray-700 text-center font-medium group-hover:text-red-600 line-clamp-2">
                    {subcat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Featured Brands */}
        {categoryBrands.length > 0 && (
          <div className="mb-6 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Thương hiệu nổi bật</h3>
            <div className="flex flex-wrap gap-3">
              {categoryBrands.slice(0, 12).map((brand) => (
                <Link
                  key={brand.id}
                  href={`/thuong-hieu/${brand.slug}`}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-red-500 hover:text-red-600 transition-colors"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Best Sellers Section */}
        {bestSellers.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-bold text-gray-800">Sản phẩm bán chạy</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={{ ...product, images: [{ url: product.thumbnail, alt: product.name }] }} />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar Filters */}
          <div className="w-full md:w-60 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-20">
              <div className="bg-red-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2 text-sm">
                  <SlidersHorizontal className="w-4 h-4" />
                  Bộ lọc sản phẩm
                </h3>
                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs text-red-600 hover:underline">
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
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${pricePreset === idx ? "bg-red-600 text-white" : "hover:bg-red-50 border border-gray-200"}`}
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
                      onChange={(e) => {
                        setMinPrice(e.target.value ? Number(e.target.value) : undefined);
                        setPricePreset(null);
                      }}
                      className="h-8 text-xs"
                    />
                    <Input
                      type="number"
                      placeholder="Đến"
                      value={maxPrice || ""}
                      onChange={(e) => {
                        setMaxPrice(e.target.value ? Number(e.target.value) : undefined);
                        setPricePreset(null);
                      }}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <h4 className="font-semibold text-sm mb-3">Thương hiệu</h4>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {BRANDS.map((brand) => (
                      <label key={brand.id} className="flex items-center gap-2.5 cursor-pointer group">
                        <Checkbox
                          id={`brand-${brand.id}`}
                          checked={selectedBrands.includes(brand.slug)}
                          onCheckedChange={() => handleBrandChange(brand.slug)}
                        />
                        <span className="text-sm group-hover:text-red-600 transition-colors">{brand.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-grow min-w-0">
            {/* Toolbar */}
            <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm mb-4 flex flex-wrap justify-between items-center gap-3">
              <div>
                <h1 className="text-lg font-bold">{categoryName}</h1>
                <p className="text-xs text-gray-500">{total} sản phẩm</p>
              </div>
              <div className="flex items-center gap-2">
                {/* Sort */}
                <div className="flex items-center gap-1.5 text-sm">
                  <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-red-600"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                {/* View toggle */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 transition-colors ${viewMode === "grid" ? "bg-red-600 text-white" : "hover:bg-gray-50"}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 transition-colors ${viewMode === "list" ? "bg-red-600 text-white" : "hover:bg-gray-50"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {paginatedProducts.length > 0 ? (
              <>
                <div className={viewMode === "grid"
                  ? "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
                  : "flex flex-col gap-3"
                }>
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={{ ...product, images: [{ url: product.thumbnail, alt: product.name }] }} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      &laquo; Trước
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => (
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
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Sau &raquo;
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="font-semibold text-lg mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500 mb-6">Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác.</p>
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
