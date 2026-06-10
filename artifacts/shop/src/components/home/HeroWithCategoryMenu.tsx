import { useRef } from "react";
import { Link } from "wouter";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BANNERS } from "@/lib/tdm-data";

/** Hero banner — mega menu lives in header only (TDM.vn style). */
export function HeroWithCategoryMenu() {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4500, stopOnInteraction: true })
  );

  if (!BANNERS?.length) return null;

  return (
    <section className="bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-10">
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
                      style={{ aspectRatio: "16/7" }}
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
