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
import { Button } from "@/components/ui/button";
import { BANNERS } from "@/lib/tdm-data";

export function HeroBanner() {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4500, stopOnInteraction: true })
  );

  if (!BANNERS?.length) return null;

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 pt-4 pb-2">
        <Carousel
          plugins={[autoplayPlugin.current]}
          className="w-full rounded-xl overflow-hidden shadow-sm"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {BANNERS.map((banner) => (
              <CarouselItem key={banner.id}>
                <Link href={banner.link || "#"} className="block relative w-full" style={{ aspectRatio: "16/5" }}>
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

        {/* Brand promo strip below banner — like tdm.vn seasonal promos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
          {BANNERS.slice(0, 4).map((banner) => (
            <Link
              key={`promo-${banner.id}`}
              href={banner.link || "#"}
              className="rounded-lg overflow-hidden border border-gray-200 hover:border-orange-400 hover:shadow transition-all group"
            >
              <div className="relative" style={{ aspectRatio: "3/1" }}>
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {banner.buttonText && (
                <div className="px-2 py-1.5 text-center">
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="h-auto py-0 text-xs text-orange-600 font-semibold hover:bg-transparent"
                  >
                    <span>{banner.title}</span>
                  </Button>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
