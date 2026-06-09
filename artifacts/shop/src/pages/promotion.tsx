import { Link } from "wouter";
import { PROMOTIONS } from "@/lib/tdm-data";
import { useEffect, useState } from "react";
import { loadSearchIndex, listingToProduct } from "@/lib/catalog-store";
import type { TdmProduct } from "@/types/product";
import { categoryUrl } from "@/lib/urls";
import { ProductCard } from "@/components/product-card";
import { Flame, Clock, ArrowRight } from "lucide-react";

// Countdown component
function CountdownTimer({ endDate }: { endDate: string }) {
  // For demo purposes, calculate remaining time from now to endDate
  const end = new Date(endDate);
  const now = new Date();
  const diff = Math.max(0, end.getTime() - now.getTime());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return (
    <div className="flex items-center gap-3 text-white">
      <Clock className="w-5 h-5" />
      <div className="flex items-center gap-1">
        <span className="bg-black/30 px-2 py-1 rounded-lg font-bold text-lg">{hours.toString().padStart(2, '0')}</span>
        <span className="font-bold">:</span>
        <span className="bg-black/30 px-2 py-1 rounded-lg font-bold text-lg">{minutes.toString().padStart(2, '0')}</span>
        <span className="font-bold">:</span>
        <span className="bg-black/30 px-2 py-1 rounded-lg font-bold text-lg">{seconds.toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
}

export function PromotionPage() {
  const [PRODUCTS, setProducts] = useState<TdmProduct[]>([]);

  useEffect(() => {
    loadSearchIndex().then((index) => {
      setProducts(index.filter((p) => p.isOnSale).map(listingToProduct));
    });
  }, []);

  const saleProducts = PRODUCTS;
  
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="container mx-auto px-4 py-6">
        {/* Hero banner for promotions */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-8 text-white mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-3 flex items-center gap-3">
                <Flame className="w-10 h-10" />
                KHUYẾN MÃI SỐC
              </h1>
              <p className="text-lg opacity-95 mb-4">Giảm giá tới 50% cho hàng ngàn sản phẩm thiết bị vệ sinh và nội thất!</p>
              <CountdownTimer endDate="2026-07-01" />
            </div>
            <Link href={categoryUrl("thiet-bi-ve-sinh")} className="bg-white text-red-600 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2">
              Mua ngay <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* List of promotions */}
        {PROMOTIONS.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-5 text-gray-800">Chương trình khuyến mãi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROMOTIONS.map(promo => (
                <div key={promo.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-r from-red-500 to-orange-400 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-2xl font-black">{promo.badge}</div>
                      <div className="text-lg font-semibold">{promo.title}</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{promo.title}</h3>
                    <div className="text-sm text-gray-500 mb-4">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Kết thúc: {promo.endDate}
                    </div>
                    {promo.products.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm font-semibold text-gray-700 mb-2">Sản phẩm tham gia:</div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {promo.products.map(pid => {
                            const product = PRODUCTS.find(p => p.id === pid);
                            return product ? (
                              <ProductCard key={product.id} product={{ ...product, images: [{ url: product.thumbnail, alt: product.name }] }} />
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                    <Link href={categoryUrl("thiet-bi-ve-sinh")} className="text-red-600 font-semibold text-sm hover:underline">
                      Xem tất cả →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All sale products */}
        <section>
          <h2 className="text-2xl font-bold mb-5 text-gray-800 flex items-center gap-3">
            <Flame className="w-8 h-8 text-red-600" />
            Tất cả sản phẩm khuyến mãi
          </h2>
          {saleProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {saleProducts.map(product => (
                <ProductCard key={product.id} product={{ ...product, images: [{ url: product.thumbnail, alt: product.name }] }} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <div className="text-5xl mb-4">🛍️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Hiện tại chưa có khuyến mãi</h3>
              <p className="text-gray-500">Vui lòng quay lại sau!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
