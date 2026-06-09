import { useRef } from "react";
import { Link } from "wouter";
import { ChevronRight, Menu } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { BANNERS } from "@/lib/tdm-data";
import { CATEGORIES } from "@/lib/tdm-data";
import { getCategoryIcon } from "@/lib/category-icons";
import { categoryUrl } from "@/lib/urls";
import { getMainGroups } from "@/lib/category-utils";

export function HeroWithCategoryMenu() {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4500, stopOnInteraction: true })
  );

  const mainGroups = getMainGroups(CATEGORIES);
  const topCategories = mainGroups.slice(0, 5);

  if (!BANNERS?.length) return null;

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* LEFT: Category Menu */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden h-full">
              <div className="bg-orange-600 text-white px-4 py-3 font-bold text-sm">
                <div className="flex items-center gap-2">
                  <Menu className="w-4 h-4" />
                  DANH MỤC
                </div>
              </div>
              <div className="py-2">
                {topCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={categoryUrl(cat.slug)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 hover:text-orange-600 transition-colors text-sm text-gray-700"
                  >
                    <span className="text-orange-600">{getCategoryIcon(cat.groupSlug)}</span>
                    <span className="flex-1">{cat.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER: Hero Slider */}
          <div className="lg:col-span-8">
            <Carousel
              plugins={[autoplayPlugin.current]}
              className="w-full rounded-lg overflow-hidden shadow-sm"
              opts={{ loop: true }}
            >
              <CarouselContent>
                {BANNERS.map((banner) => (
                  <CarouselItem key={banner.id}>
                    <Link
                      href={banner.link || "#"}
                      className="block relative w-full"
                      style={{ aspectRatio: "16/6" }}
                    >
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3 bg-white/80 hover:bg-white border-0 shadow" />
              <CarouselNext className="right-3 bg-white/80 hover:bg-white border-0 shadow" />
            </Carousel>
          </div>

          {/* RIGHT: Promotion Banners */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="flex flex-col gap-3 h-full">
              {BANNERS.slice(0, 2).map((banner) => (
                <Link
                  key={`promo-${banner.id}`}
                  href={banner.link || "#"}
                  className="rounded-lg overflow-hidden border border-gray-200 hover:border-orange-400 hover:shadow transition-all group flex-1"
                >
                  <div className="relative h-full">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
