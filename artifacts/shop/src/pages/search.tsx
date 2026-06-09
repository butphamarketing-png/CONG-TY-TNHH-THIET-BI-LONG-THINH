import { useState } from "react";
import { useLocation } from "wouter";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useSearchListings } from "@/hooks/use-catalog";
import { listingToProduct } from "@/lib/catalog-store";
import { ChevronRight, Search as SearchIcon, AlertCircle } from "lucide-react";

export function SearchPage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const q = searchParams.get("q") || "";
  const tab = searchParams.get("tab");
  
  const [page, setPage] = useState(1);
  
  const { data, total, totalPages, loading: isLoading } = useSearchListings(q, page, 12);
  const productsData = { data: data.map(listingToProduct), total, totalPages };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <span>Trang chủ</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-foreground font-medium">Tìm kiếm</span>
      </div>

      <div className="bg-white p-4 rounded-xl border border-border shadow-sm mb-6">
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <SearchIcon className="w-6 h-6 text-primary" />
          {q ? `Kết quả tìm kiếm cho: "${q}"` : tab ? `Sản phẩm ${tab}` : "Tất cả sản phẩm"}
        </h1>
        <div className="text-sm text-muted-foreground mt-2">
          Tìm thấy {productsData?.total || 0} sản phẩm
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
            <div key={i} className="animate-pulse bg-gray-100 aspect-[3/4] rounded-xl"></div>
          ))}
        </div>
      ) : productsData?.data && productsData.data.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
        <div className="text-center py-16 bg-white rounded-xl border border-border flex flex-col items-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
          <h2 className="text-xl font-bold mb-2">Không tìm thấy kết quả</h2>
          <p className="text-muted-foreground mb-6">Xin lỗi, chúng tôi không tìm thấy sản phẩm nào phù hợp với từ khóa "{q}".</p>
          <Button asChild>
            <a href="/">Quay lại trang chủ</a>
          </Button>
        </div>
      )}
    </div>
  );
}
