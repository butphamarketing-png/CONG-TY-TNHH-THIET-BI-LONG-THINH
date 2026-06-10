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
        loading="eager"
        decoding="async"
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
        <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:grid-rows-[280px_280px] lg:gap-4">
          <div className="lg:row-span-2 lg:col-start-1 overflow-hidden rounded-2xl shadow-md hover:shadow-xl ring-1 ring-black/5 transition-shadow duration-300">
            <FullImageBanner
              href={HERO_MAIN_BANNER.link}
              image={HERO_MAIN_BANNER.image}
              title={HERO_MAIN_BANNER.title}
              className="h-full min-h-[576px]"
            />
          </div>

          <div className="lg:col-start-2 lg:row-start-1 overflow-hidden rounded-2xl shadow-md hover:shadow-xl ring-1 ring-black/5 transition-shadow duration-300 h-[280px]">
            <FullImageBanner
              href={SIDE_BANNERS.top.link}
              image={SIDE_BANNERS.top.image}
              title={SIDE_BANNERS.top.title}
            />
          </div>

          <div className="lg:col-start-2 lg:row-start-2 overflow-hidden rounded-2xl shadow-md hover:shadow-xl ring-1 ring-black/5 transition-shadow duration-300 h-[280px]">
            <FullImageBanner
              href={SIDE_BANNERS.bottom.link}
              image={SIDE_BANNERS.bottom.image}
              title={SIDE_BANNERS.bottom.title}
            />
          </div>
        </div>

        {/* Mobile / tablet */}
        <div className="lg:hidden space-y-3.5">
          <div className="overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 w-full aspect-[16/9]">
            <FullImageBanner
              href={HERO_MAIN_BANNER.link}
              image={HERO_MAIN_BANNER.image}
              title={HERO_MAIN_BANNER.title}
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 aspect-square">
              <FullImageBanner
                href={SIDE_BANNERS.top.link}
                image={SIDE_BANNERS.top.image}
                title={SIDE_BANNERS.top.title}
              />
            </div>
            <div className="overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 aspect-square">
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
