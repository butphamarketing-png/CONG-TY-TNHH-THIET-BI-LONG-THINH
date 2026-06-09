import { Link } from "wouter";
import { BANNERS } from "@/lib/tdm-data";

export function PromotionBanners() {
  if (!BANNERS?.length) return null;

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BANNERS.slice(0, 2).map((banner) => (
          <Link
            key={`promo-banner-${banner.id}`}
            href={banner.link || "#"}
            className="rounded-xl overflow-hidden border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all group"
          >
            <div className="relative" style={{ aspectRatio: "2/1" }}>
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
