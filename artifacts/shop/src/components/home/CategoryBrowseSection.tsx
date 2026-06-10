import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, ChevronRight as ViewAllIcon } from "lucide-react";
import { CATEGORIES } from "@/lib/tdm-data";
import { getHomepageTilesForGroup } from "@/lib/category-utils";
import { getListingSlugForTile } from "@/lib/homepage-tiles";
import { getCategoryTileImage } from "@/lib/category-tile-images";
import { getTileThumbnailsForSlugs, getProductListingsForCategory } from "@/lib/catalog-service";
import { listingToProduct } from "@/lib/catalog-store";
import { getCategoryIconComponent } from "@/lib/category-icons";
import { categoryUrl } from "@/lib/urls";
import { ProductCard } from "@/components/product-card";
import { SectionPagination } from "@/components/home/SectionPagination";
import type { TdmMenuGroup } from "@/types/catalog";
import { cn } from "@/lib/utils";

const PRODUCTS_PER_PAGE = 4;

interface CategoryBrowseSectionProps {
  groupSlug: TdmMenuGroup;
  title: string;
}

function CategoryTileButton({
  name,
  tileSlug,
  imageUrl,
  selected,
  onSelect,
}: {
  name: string;
  tileSlug: string;
  imageUrl?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = getCategoryIconComponent(tileSlug);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex-shrink-0 w-[calc((100%-1.25rem)/3)] sm:w-[calc((100%-2rem)/4)] lg:w-[calc((100%-2.5rem)/6)] snap-start",
        "rounded-xl overflow-hidden transition-all duration-300 text-left",
        selected
          ? "ring-2 ring-orange-400 shadow-md scale-[1.02]"
          : "ring-1 ring-gray-200/80 hover:ring-orange-200 hover:shadow-sm",
      )}
    >
      <div className="relative aspect-[4/5] bg-gradient-to-b from-[#c4c4c4] via-[#a8a8a8] to-[#8e8e8e]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="absolute inset-x-0 top-0 w-full h-[76%] object-contain object-center p-1 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center pb-6">
            {Icon && <Icon className="w-10 h-10 text-white/70" />}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-black/90 px-1 py-1.5 min-h-[24%] flex items-center justify-center">
          <span className="text-[9px] sm:text-[10px] font-semibold text-white text-center line-clamp-2 leading-tight uppercase">
            {name}
          </span>
        </div>
      </div>
    </button>
  );
}

export function CategoryBrowseSection({ groupSlug, title }: CategoryBrowseSectionProps) {
  const tiles = getHomepageTilesForGroup(CATEGORIES, groupSlug);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [selectedTileSlug, setSelectedTileSlug] = useState(tiles[0]?.slug ?? "");
  const [productPage, setProductPage] = useState(1);
  const [products, setProducts] = useState<ReturnType<typeof listingToProduct>[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [fallbackThumbs, setFallbackThumbs] = useState<Record<string, string>>({});

  const missingSlugs = tiles
    .filter((c) => !getCategoryTileImage(c.slug))
    .map((c) => getListingSlugForTile(c.slug));
  const uniqueMissing = [...new Set(missingSlugs)];

  useEffect(() => {
    if (!uniqueMissing.length) return;
    getTileThumbnailsForSlugs(uniqueMissing).then(setFallbackThumbs);
  }, [uniqueMissing.join(",")]);

  useEffect(() => {
    if (!selectedTileSlug) return;
    setLoadingProducts(true);
    setProductPage(1);
    const listingSlug = getListingSlugForTile(selectedTileSlug);
    getProductListingsForCategory(listingSlug, true).then((listings) => {
      setProducts(listings.map(listingToProduct));
      setLoadingProducts(false);
    });
  }, [selectedTileSlug]);

  if (!tiles.length) return null;

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE) || 1;
  const pageProducts = products.slice(
    (productPage - 1) * PRODUCTS_PER_PAGE,
    productPage * PRODUCTS_PER_PAGE,
  );

  const scrollTiles = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const selectedTile = tiles.find((t) => t.slug === selectedTileSlug);

  return (
    <section className="container mx-auto px-4 py-6 md:py-8">
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 md:p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
            {title}
          </h2>
          <Link
            href={categoryUrl(groupSlug)}
            className="hidden sm:inline-flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            Xem tất cả <ViewAllIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollTiles("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/95 border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:text-orange-600 hover:border-orange-300 transition-colors -ml-1"
            aria-label="Lướt trái"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-2.5 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-1 py-1"
          >
            {tiles.map((cat) => {
              const listingSlug = getListingSlugForTile(cat.slug);
              const imageUrl = getCategoryTileImage(cat.slug) ?? fallbackThumbs[listingSlug];
              return (
                <CategoryTileButton
                  key={cat.id}
                  name={cat.name}
                  tileSlug={cat.slug}
                  imageUrl={imageUrl}
                  selected={selectedTileSlug === cat.slug}
                  onSelect={() => setSelectedTileSlug(cat.slug)}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollTiles("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/95 border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:text-orange-600 hover:border-orange-300 transition-colors -mr-1"
            aria-label="Lướt phải"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {selectedTile && (
          <div className="mt-6 pt-5 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm md:text-base font-semibold text-gray-700">
                Sản phẩm{" "}
                <span className="text-orange-600">{selectedTile.name}</span>
              </h3>
              <Link
                href={categoryUrl(getListingSlugForTile(selectedTile.slug))}
                className="text-xs text-orange-600 hover:underline"
              >
                Xem thêm →
              </Link>
            </div>

            {loadingProducts ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-xl bg-gray-100 animate-pulse" />
                ))}
              </div>
            ) : pageProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {pageProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <SectionPagination
                  page={productPage}
                  totalPages={totalPages}
                  onPageChange={setProductPage}
                />
              </>
            ) : (
              <p className="text-sm text-gray-500 text-center py-6">Chưa có sản phẩm trong danh mục này.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
