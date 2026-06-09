import { Link } from "wouter";
import { BANNERS } from "@/lib/tdm-data";

export function PromotionBanners() {
  if (!BANNERS?.length) return null;

  return (
    <section className="bg-gradient-to-r from-gray-50 to-white py-10 border-y border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BANNERS.slice(0, 2).map((banner) => (
            <Link
              key={`promo-banner-${banner.id}`}
              href={banner.link || "#"}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-gray-200 hover:border-orange-300"
            >
              <div className="relative" style={{ aspectRatio: "2/1" }}>
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
