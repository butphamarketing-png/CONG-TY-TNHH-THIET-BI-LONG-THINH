import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { getCategoryIconComponent } from "@/lib/category-icons";
import { categoryUrl } from "@/lib/urls";
import { CATEGORIES } from "@/lib/tdm-data";
import { getTileThumbnailsForSlugs } from "@/lib/catalog-service";
import { getHomepageTilesForGroup } from "@/lib/category-utils";
import { getListingSlugForTile } from "@/lib/homepage-tiles";

interface CategoryHeroSectionProps {
  groupSlug: string;
  title: string;
  description?: string;
}

function CategoryImageCard({
  name,
  tileSlug,
  imageUrl,
}: {
  name: string;
  tileSlug: string;
  imageUrl?: string;
}) {
  const linkSlug = getListingSlugForTile(tileSlug);
  const Icon = getCategoryIconComponent(tileSlug);

  return (
    <Link href={categoryUrl(linkSlug)} className="group block">
      <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="absolute inset-0 w-full h-[78%] object-contain object-center p-2 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center pb-8">
            {Icon && <Icon className="w-14 h-14 text-white/70" />}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-black px-2 py-2.5 min-h-[22%] flex items-center justify-center">
          <span className="text-[11px] sm:text-xs font-semibold text-white text-center line-clamp-2 leading-tight">
            {name}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CategoryHeroSection({ groupSlug, title, description }: CategoryHeroSectionProps) {
  const subcats = getHomepageTilesForGroup(CATEGORIES, groupSlug as any);
  const listingSlugs = [...new Set(subcats.map((c) => getListingSlugForTile(c.slug)))];
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!listingSlugs.length) return;
    getTileThumbnailsForSlugs(listingSlugs).then(setThumbnails);
  }, [listingSlugs.join(",")]);

  if (!subcats.length) return null;

  return (
    <section className="bg-white mb-4">
      <div className="text-center py-6 md:py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-orange-600 uppercase tracking-wider italic">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-gray-600 mt-2 font-medium">{description}</p>
        )}
      </div>

      <div className="px-2 md:px-4 pb-6">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 md:gap-3">
          {subcats.map((cat) => (
            <CategoryImageCard
              key={cat.id}
              name={cat.name}
              tileSlug={cat.slug}
              imageUrl={thumbnails[getListingSlugForTile(cat.slug)]}
            />
          ))}
        </div>
      </div>

      <div className="text-center pb-6">
        <Link
          href={categoryUrl(groupSlug)}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg text-sm"
        >
          Xem tất cả <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
