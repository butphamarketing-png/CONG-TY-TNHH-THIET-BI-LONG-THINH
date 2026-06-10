import { Link } from "wouter";
import { HERO_MAIN_BANNER, SIDE_BANNERS } from "@/lib/tdm-data";
import { useSiteContent } from "@/hooks/use-site-content";

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

/** Hero: slideshow chữ nhật trái + flashsale1 & catalogue vuông phải */
export function HeroWithCategoryMenu() {
  const cms = useSiteContent();
  const hero = cms?.banners.hero ?? HERO_MAIN_BANNER;
  const sideTop = cms?.banners.sideTop ?? SIDE_BANNERS.top;
  const sideBottom = cms?.banners.sideBottom ?? SIDE_BANNERS.bottom;

  return (
    <section className="bg-gradient-to-b from-white to-gray-50/80">
      <div className="container mx-auto px-4 md:px-6 py-5 md:py-6">
        <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_300px] lg:grid-rows-[280px_280px] xl:grid-rows-[300px_300px] lg:gap-4">
          <div className="lg:row-span-2 lg:col-start-1 overflow-hidden rounded-2xl shadow-md hover:shadow-xl ring-1 ring-black/5 transition-shadow duration-300">
            <FullImageBanner
              href={hero.link}
              image={hero.image}
              title={hero.title}
              className="h-full min-h-[576px] xl:min-h-[616px]"
            />
          </div>

          <div className="lg:col-start-2 lg:row-start-1 overflow-hidden rounded-2xl shadow-md hover:shadow-xl ring-1 ring-black/5 transition-shadow duration-300 h-[280px] xl:h-[300px]">
            <FullImageBanner href={sideTop.link} image={sideTop.image} title={sideTop.title} />
          </div>

          <div className="lg:col-start-2 lg:row-start-2 overflow-hidden rounded-2xl shadow-md hover:shadow-xl ring-1 ring-black/5 transition-shadow duration-300 h-[280px] xl:h-[300px]">
            <FullImageBanner href={sideBottom.link} image={sideBottom.image} title={sideBottom.title} />
          </div>
        </div>

        <div className="lg:hidden space-y-3.5">
          <div className="overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 w-full aspect-[16/9]">
            <FullImageBanner href={hero.link} image={hero.image} title={hero.title} />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 aspect-square">
              <FullImageBanner href={sideTop.link} image={sideTop.image} title={sideTop.title} />
            </div>
            <div className="overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 aspect-square">
              <FullImageBanner href={sideBottom.link} image={sideBottom.image} title={sideBottom.title} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
