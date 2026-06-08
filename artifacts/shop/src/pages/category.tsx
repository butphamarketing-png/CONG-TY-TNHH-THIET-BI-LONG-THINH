import { useState } from "react";
import { useLocation } from "wouter";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useListProducts, useListBrands } from "@workspace/api-client-react";
import { Slider } from "@/components/ui/slider";
import { ChevronRight, Filter } from "lucide-react";

export function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = params.slug === "all" ? undefined : params.slug;
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
  const { data: productsData, isLoading } = useListProducts({ 
    category: slug,
    page,
    limit: 12,
    minPrice,
    maxPrice,
    brand: selectedBrands.length > 0 ? selectedBrands.join(",") : undefined
  });
  
  const { data: brands } = useListBrands();

  const handleBrandChange = (brandSlug: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandSlug) 
        ? prev.filter(b => b !== brandSlug)
        : [...prev, brandSlug]
    );
    setPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <span>Trang chủ</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">
          {slug === "all" || !slug ? "Tất cả sản phẩm" : slug}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0 space-y-6">
          <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Bộ lọc
            </h3>
            
            <div className="space-y-6">
              {/* Price Filter */}
              <div>
                <h4 className="font-medium mb-3">Mức giá</h4>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      type="number" 
                      placeholder="Từ" 
                      value={minPrice || ""} 
                      onChange={e => setMinPrice(e.target.value ? Number(e.target.value) : undefined)} 
                    />
                    <Input 
                      type="number" 
                      placeholder="Đến" 
                      value={maxPrice || ""} 
                      onChange={e => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)} 
                    />
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => setPage(1)}>Áp dụng</Button>
                </div>
              </div>

              {/* Brand Filter */}
              {brands && brands.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Thương hiệu</h4>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <div key={brand.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`brand-${brand.id}`} 
                          checked={selectedBrands.includes(brand.slug)}
                          onCheckedChange={() => handleBrandChange(brand.slug)}
                        />
                        <Label htmlFor={`brand-${brand.id}`} className="cursor-pointer font-normal">
                          {brand.name} ({brand.productCount})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="bg-white p-4 rounded-xl border border-border shadow-sm mb-6 flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold">
              {slug === "all" || !slug ? "Tất cả sản phẩm" : slug}
            </h1>
            <div className="text-sm text-muted-foreground">
              {productsData?.total || 0} sản phẩm
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="animate-pulse bg-gray-100 aspect-[3/4] rounded-xl"></div>
              ))}
            </div>
          ) : productsData?.data && productsData.data.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {productsData.data.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {productsData.totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                  <Button 
                    variant="outline" 
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                  >
                    Trước
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: productsData.totalPages }).map((_, i) => (
                      <Button
                        key={i}
                        variant={page === i + 1 ? "default" : "outline"}
                        className="w-10 h-10 p-0"
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    disabled={page === productsData.totalPages}
                    onClick={() => setPage(p => p + 1)}
                  >
                    Sau
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-border">
              <p className="text-muted-foreground mb-4">Không tìm thấy sản phẩm nào phù hợp.</p>
              <Button onClick={() => {
                setMinPrice(undefined);
                setMaxPrice(undefined);
                setSelectedBrands([]);
                setPage(1);
              }}>Xóa bộ lọc</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
