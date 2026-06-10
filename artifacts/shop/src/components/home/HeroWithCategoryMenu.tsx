import { Link } from "wouter";
import { HERO_MAIN_BANNER, SIDE_BANNERS } from "@/lib/tdm-data";

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
      className={`block w-full h-full overflow-hidden group ${className}`}
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

/** Hero: 1 banner chữ nhật lớn + 2 banner vuông bên phải */
export function HeroWithCategoryMenu() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50/80">
      <div className="container mx-auto px-4 md:px-6 py-5 md:py-6">
        {/* Desktop: main rectangle + 2 squares */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_300px] lg:grid-rows-2 gap-3.5 xl:gap-4">
          <div className="lg:row-span-2 relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl ring-1 ring-black/5 transition-shadow duration-300 min-h-0">
            <FullImageBanner
              href={HERO_MAIN_BANNER.link}
              image={HERO_MAIN_BANNER.image}
              title={HERO_MAIN_BANNER.title}
              className="absolute inset-0"
            />
          </div>

          <div className="aspect-square overflow-hidden rounded-2xl shadow-md hover:shadow-xl ring-1 ring-black/5 transition-shadow duration-300">
            <FullImageBanner
              href={SIDE_BANNERS.top.link}
              image={SIDE_BANNERS.top.image}
              title={SIDE_BANNERS.top.title}
            />
          </div>

          <div className="aspect-square overflow-hidden rounded-2xl shadow-md hover:shadow-xl ring-1 ring-black/5 transition-shadow duration-300">
            <FullImageBanner
              href={SIDE_BANNERS.bottom.link}
              image={SIDE_BANNERS.bottom.image}
              title={SIDE_BANNERS.bottom.title}
            />
          </div>
        </div>

        {/* Mobile / tablet: main on top, 2 squares below */}
        <div className="lg:hidden space-y-3.5">
          <div className="relative overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 aspect-[16/9] sm:aspect-[2/1]">
            <FullImageBanner
              href={HERO_MAIN_BANNER.link}
              image={HERO_MAIN_BANNER.image}
              title={HERO_MAIN_BANNER.title}
              className="absolute inset-0"
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="aspect-square overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5">
              <FullImageBanner
                href={SIDE_BANNERS.top.link}
                image={SIDE_BANNERS.top.image}
                title={SIDE_BANNERS.top.title}
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5">
              <FullImageBanner
                href={SIDE_BANNERS.bottom.link}
                image={SIDE_BANNERS.bottom.image}
                title={SIDE_BANNERS.bottom.title}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
