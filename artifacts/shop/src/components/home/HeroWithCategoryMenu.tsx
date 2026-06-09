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
    <section className="bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Category Menu */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden h-full shadow-md hover:shadow-lg transition-all duration-300">
              <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-4 font-bold text-sm">
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
                    className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 text-sm text-gray-700 border-l-2 border-transparent hover:border-orange-500"
                  >
                    <span className="text-orange-600">{getCategoryIcon(cat.groupSlug)}</span>
                    <span className="flex-1 font-medium">{cat.name}</span>
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
              className="w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
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
              <CarouselPrevious className="left-4 bg-white/90 hover:bg-white border-0 shadow-lg w-10 h-10" />
              <CarouselNext className="right-4 bg-white/90 hover:bg-white border-0 shadow-lg w-10 h-10" />
            </Carousel>
          </div>

          {/* RIGHT: Promotion Banners */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="flex flex-col gap-4 h-full">
              {BANNERS.slice(0, 2).map((banner) => (
                <Link
                  key={`promo-${banner.id}`}
                  href={banner.link || "#"}
                  className="rounded-xl overflow-hidden border border-gray-200 hover:border-orange-400 hover:shadow-xl transition-all duration-500 group flex-1"
                >
                  <div className="relative h-full">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
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
