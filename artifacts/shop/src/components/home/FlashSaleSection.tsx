import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Flame, ChevronRight } from "lucide-react";
import { loadSearchIndex, listingToProduct } from "@/lib/catalog-store";
import { ProductCard } from "@/components/product-card";
import type { TdmProduct } from "@/types/product";
import { CountdownTimer } from "@/components/home/CountdownTimer";
import { SectionPagination } from "@/components/home/SectionPagination";

const PER_PAGE = 8;

export function FlashSaleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [products, setProducts] = useState<TdmProduct[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSearchIndex().then((index) => {
      const sale = index
        .filter((p) => p.isOnSale)
        .map((entry) => listingToProduct({
          id: entry.id,
          name: entry.name,
          slug: entry.slug,
          sku: entry.sku,
          price: entry.price,
          thumbnail: entry.thumbnail,
          categoryId: 0,
          categorySlug: entry.categorySlug,
          categoryName: entry.categoryName,
          brandId: 0,
          brandSlug: entry.brandSlug,
          brandName: entry.brandName,
          inStock: true,
          soldCount: 0,
          badges: ["sale"],
          isFeatured: false,
          isBestSeller: false,
          isNew: false,
          isOnSale: true,
        }));
      setProducts(sale);
      setLoading(false);
    });
  }, []);

  const totalPages = Math.max(1, Math.ceil(products.length / PER_PAGE));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  if (loading) return null;
  if (!products.length) return null;

  const safePage = Math.min(Math.max(1, page), totalPages);
  const pageProducts = products.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  return (
    <section ref={sectionRef} className="container mx-auto px-4 py-6 md:py-8">
      <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 p-5 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-wide">
                Sản phẩm khuyến mãi
              </h2>
              <p className="text-white/80 text-xs md:text-sm">Ưu đãi có thời hạn — kết thúc hôm nay</p>
            </div>
          </div>
          <CountdownTimer />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {pageProducts.map((product) => (
            <div key={product.id} className="rounded-xl overflow-hidden">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <SectionPagination
          page={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
          scrollTargetRef={sectionRef}
        />

        <div className="text-center mt-4">
          <Link
            href="/khuyen-mai"
            className="inline-flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium transition-colors"
          >
            Xem tất cả khuyến mãi <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
