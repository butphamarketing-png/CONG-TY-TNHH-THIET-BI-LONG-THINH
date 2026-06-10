import { Link } from "wouter";
import { HERO_MAIN_BANNER, SIDE_SQUARE_BANNERS } from "@/lib/tdm-data";

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

/** Hero: 1 banner chữ nhật (slideshow) + banner vuông bên phải (catalogue) */
export function HeroWithCategoryMenu() {
  const sideBanner = SIDE_SQUARE_BANNERS[0];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50/80">
      <div className="container mx-auto px-4 md:px-6 py-5 md:py-6">
        {/* Desktop: rectangle trái + vuông phải */}
        <div className="hidden lg:flex lg:gap-4 lg:items-start">
          <div className="flex-1 min-w-0 overflow-hidden rounded-2xl shadow-md hover:shadow-xl ring-1 ring-black/5 transition-shadow duration-300 aspect-[16/7]">
            <FullImageBanner
              href={HERO_MAIN_BANNER.link}
              image={HERO_MAIN_BANNER.image}
              title={HERO_MAIN_BANNER.title}
            />
          </div>

          {sideBanner && (
            <div className="w-[280px] xl:w-[300px] shrink-0 aspect-square overflow-hidden rounded-2xl shadow-md hover:shadow-xl ring-1 ring-black/5 transition-shadow duration-300">
              <FullImageBanner
                href={sideBanner.link}
                image={sideBanner.image}
                title={sideBanner.title}
              />
            </div>
          )}
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

          {sideBanner && (
            <div className="overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 w-full max-w-[320px] mx-auto aspect-square">
              <FullImageBanner
                href={sideBanner.link}
                image={sideBanner.image}
                title={sideBanner.title}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
