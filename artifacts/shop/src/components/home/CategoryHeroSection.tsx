import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import type { CategoryNode } from "@/types/catalog";
import { getCategoryIcon } from "@/lib/category-icons";
import { categoryUrl } from "@/lib/urls";
import { CATEGORIES } from "@/lib/tdm-data";
import { getHomepageTilesForGroup } from "@/lib/category-utils";

interface CategoryHeroSectionProps {
  groupSlug: string;
  title: string;
  description: string;
  categoryIcons: Array<{
    name: string;
    slug: string;
    icon: string;
  }>;
}

function CategoryIconTile({ name, slug }: { name: string; slug: string }) {
  return (
    <Link href={categoryUrl(slug)} className="group flex flex-col items-center text-center">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-white border border-gray-200 rounded-lg overflow-hidden group-hover:border-orange-400 group-hover:shadow-md transition-all mb-2 flex items-center justify-center">
        <span className="text-2xl md:text-3xl">🚿</span>
      </div>
      <span className="text-xs font-medium text-gray-700 group-hover:text-orange-600 leading-tight line-clamp-2 px-1">
        {name}
      </span>
    </Link>
  );
}

export function CategoryHeroSection({
  groupSlug,
  title,
  description,
  categoryIcons,
}: CategoryHeroSectionProps) {
  const subcats = getHomepageTilesForGroup(CATEGORIES, groupSlug as any);

  return (
    <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-6">
      <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-orange-600">{getCategoryIcon(groupSlug)}</span>
            {title}
          </h2>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <Link
          href={categoryUrl(groupSlug)}
          className="text-sm text-orange-600 hover:underline flex items-center gap-1 font-medium"
        >
          Xem tất cả <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="px-4 md:px-6 py-5">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-11 gap-3 md:gap-4">
          {subcats.slice(0, 11).map((cat) => (
            <CategoryIconTile key={cat.id} name={cat.name} slug={cat.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
