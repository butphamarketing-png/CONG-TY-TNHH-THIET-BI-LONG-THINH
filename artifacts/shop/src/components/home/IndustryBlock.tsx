import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import type { CategoryNode } from "@/types/catalog";
import type { Brand } from "@/types/catalog";
import { getCategoryIcon } from "@/lib/category-icons";
import { brandUrl, categoryUrl } from "@/lib/urls";
import { getHomepageTilesForGroup } from "@/lib/category-utils";
import { CATEGORIES } from "@/lib/tdm-data";

interface IndustryBlockProps {
  group: CategoryNode;
  brands: Brand[];
}

function CategoryTile({ cat }: { cat: CategoryNode }) {
  return (
    <Link href={categoryUrl(cat.slug)} className="group flex flex-col items-center text-center">
      <div className="w-full aspect-square max-w-[100px] mx-auto bg-gray-50 border border-gray-100 rounded-lg overflow-hidden group-hover:border-orange-400 group-hover:shadow-md transition-all mb-2">
        <img
          src={`https://placehold.co/120x120/f8f8f8/999?text=${encodeURIComponent(cat.name.split(" ").slice(0, 2).join("+"))}`}
          alt={cat.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <span className="text-xs font-medium text-gray-700 group-hover:text-orange-600 leading-tight line-clamp-2 px-1">
        {cat.name}
      </span>
    </Link>
  );
}

/** Industry section matching tdm.vn: L2 category tiles + brand strip */
export function IndustryBlock({ group, brands }: IndustryBlockProps) {
  const subcats = getHomepageTilesForGroup(CATEGORIES, group.groupSlug as any);
  if (subcats.length === 0) return null;

  return (
    <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-orange-600">{getCategoryIcon(group.groupSlug)}</span>
          {group.name}
        </h2>
        <Link
          href={categoryUrl(group.slug)}
          className="text-sm text-orange-600 hover:underline flex items-center gap-1 font-medium"
        >
          Xem tất cả <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="px-4 md:px-6 py-5">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-11 gap-3 md:gap-4">
          {subcats.map((cat) => (
            <CategoryTile key={cat.id} cat={cat} />
          ))}
        </div>
      </div>

      {brands.length > 0 && (
        <div className="bg-gray-50 px-4 md:px-6 py-4 border-t border-gray-100">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            Hãng {group.name.toLowerCase()}
          </h3>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={brandUrl(brand.slug)}
                className="opacity-70 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
              >
                {brand.logo ? (
                  <img src={brand.logo} alt={brand.name} className="h-8 md:h-10 object-contain" />
                ) : (
                  <span className="inline-flex items-center justify-center min-w-[72px] h-9 px-3 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:border-orange-500 hover:text-orange-600">
                    {brand.name}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
