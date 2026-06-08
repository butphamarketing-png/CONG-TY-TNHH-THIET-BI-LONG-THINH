import { Link } from "wouter";
import type { CategoryNode } from "@/types/catalog";
import { categoryUrl } from "@/lib/urls";

interface CategoryTileGridProps {
  categories: CategoryNode[];
  title?: string;
}

/** Sub-category icon tiles — shown first on category page (tdm.vn style) */
export function CategoryTileGrid({ categories, title = "Danh mục con" }: CategoryTileGridProps) {
  if (categories.length === 0) return null;

  return (
    <div className="mb-6 bg-white rounded-xl p-4 md:p-5 border border-gray-200 shadow-sm">
      <h2 className="text-base font-bold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={categoryUrl(cat.slug)}
            className="group flex flex-col items-center text-center"
          >
            <div className="w-full aspect-square max-w-[90px] mx-auto bg-gray-50 border border-gray-100 rounded-lg overflow-hidden group-hover:border-orange-400 group-hover:shadow-md transition-all mb-2">
              <img
                src={`https://placehold.co/100x100/f5f5f5/888?text=${encodeURIComponent(cat.name.split(" ").slice(0, 2).join("+"))}`}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-xs font-medium text-gray-700 group-hover:text-orange-600 leading-tight line-clamp-2">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
