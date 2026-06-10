import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { getCategoryIconComponent } from "@/lib/category-icons";
import { categoryUrl } from "@/lib/urls";
import { CATEGORIES } from "@/lib/tdm-data";
import { getHomepageTilesForGroup } from "@/lib/category-utils";
import { getListingSlugForTile } from "@/lib/homepage-tiles";
import { getCategoryTileImage } from "@/lib/category-tile-images";

interface CategoryHeroSectionProps {
  groupSlug: string;
  title: string;
  description?: string;
}

function CategoryImageCard({ name, tileSlug }: { name: string; tileSlug: string }) {
  const linkSlug = getListingSlugForTile(tileSlug);
  const imageUrl = getCategoryTileImage(tileSlug);
  const Icon = getCategoryIconComponent(tileSlug);

  return (
    <Link href={categoryUrl(linkSlug)} className="group block">
      <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-gradient-to-b from-[#b8b8b8] via-[#9a9a9a] to-[#7a7a7a]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="absolute inset-x-0 top-0 w-full h-[78%] object-contain object-center p-1.5 group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center pb-8">
            {Icon && <Icon className="w-14 h-14 text-white/70" />}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-black px-1.5 py-2 min-h-[22%] flex items-center justify-center border-t border-black">
          <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold text-white text-center line-clamp-2 leading-tight uppercase tracking-wide">
            {name}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CategoryHeroSection({ groupSlug, title, description }: CategoryHeroSectionProps) {
  const subcats = getHomepageTilesForGroup(CATEGORIES, groupSlug as any);

  if (!subcats.length) return null;

  return (
    <section className="bg-white mb-2">
      <div className="text-center py-6 md:py-8">
        <h2 className="text-2xl md:text-[28px] font-bold text-[#e85d04] uppercase tracking-wide italic">
          {title}
        </h2>
        {description && (
          <p className="hidden md:block text-sm text-gray-600 mt-2 font-medium">{description}</p>
        )}
      </div>

      <div className="px-1 sm:px-2 md:px-4 pb-4">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5 sm:gap-2 md:gap-2.5 max-w-[1400px] mx-auto">
          {subcats.map((cat) => (
            <CategoryImageCard key={cat.id} name={cat.name} tileSlug={cat.slug} />
          ))}
        </div>
      </div>

      <div className="text-center pb-4 md:pb-6">
        <Link
          href={categoryUrl(groupSlug)}
          className="inline-flex items-center gap-2 px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-md transition-colors duration-300 shadow text-sm"
        >
          Xem tất cả <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
