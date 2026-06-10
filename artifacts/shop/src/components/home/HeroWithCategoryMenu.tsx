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
import { HERO_SLIDES, SIDE_BANNERS } from "@/lib/tdm-data";

function FullImageBanner({
  href,
  image,
  title,
  className = "",
}: {
  href: string;
  image: string;
  title: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`block w-full h-full overflow-hidden rounded-xl group ${className}`}
      aria-label={title}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
      />
    </Link>
  );
}

/** Hero banner — mega menu lives in header only (TDM.vn style). */
export function HeroWithCategoryMenu() {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4500, stopOnInteraction: true })
  );

  if (!HERO_SLIDES.length) return null;

  return (
    <section className="bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
          <div className="lg:col-span-10 min-h-[200px] sm:min-h-[280px] lg:min-h-[360px]">
            <Carousel
              plugins={[autoplayPlugin.current]}
              className="w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              opts={{ loop: true }}
            >
              <CarouselContent className="h-full">
                {HERO_SLIDES.map((slide) => (
                  <CarouselItem key={slide.id} className="h-full">
                    <div className="w-full h-full min-h-[200px] sm:min-h-[280px] lg:min-h-[360px]">
                      <FullImageBanner
                        href={slide.link}
                        image={slide.image}
                        title={slide.title}
                        className="rounded-xl shadow-inner"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {HERO_SLIDES.length > 1 && (
                <>
                  <CarouselPrevious className="left-4 bg-white/90 hover:bg-white border-0 shadow-lg w-10 h-10" />
                  <CarouselNext className="right-4 bg-white/90 hover:bg-white border-0 shadow-lg w-10 h-10" />
                </>
              )}
            </Carousel>
          </div>

          <div className="hidden lg:grid lg:col-span-2 grid-rows-2 gap-4 lg:gap-5 min-h-[360px]">
            <FullImageBanner
              href={SIDE_BANNERS.top.link}
              image={SIDE_BANNERS.top.image}
              title={SIDE_BANNERS.top.title}
              className="shadow-md hover:shadow-xl border border-gray-100"
            />
            <FullImageBanner
              href={SIDE_BANNERS.bottom.link}
              image={SIDE_BANNERS.bottom.image}
              title={SIDE_BANNERS.bottom.title}
              className="shadow-md hover:shadow-xl border border-gray-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
