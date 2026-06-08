import { useRef } from "react";
import type { TdmProduct } from "@/types/product";
import { TdmProductCard } from "@/components/category/TdmProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductRelatedCarouselProps {
  title: string;
  products: TdmProduct[];
  brandLogos: Map<string, string>;
}

export function ProductRelatedCarousel({
  title,
  products,
  brandLogos,
}: ProductRelatedCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) return null;

  const scroll = (dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-orange-600 rounded" />
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:border-orange-400 hover:text-orange-600 transition-colors"
            aria-label="Trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:border-orange-400 hover:text-orange-600 transition-colors"
            aria-label="Sau"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="shrink-0 w-[200px] sm:w-[220px] snap-start"
          >
            <TdmProductCard
              product={product}
              brandLogo={brandLogos.get(product.brandSlug)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
