import { Link } from "wouter";
import { getCategoryIcon } from "@/lib/category-icons";
import { categoryUrl } from "@/lib/urls";
import { CATEGORIES } from "@/lib/tdm-data";

interface FeaturedCategorySectionProps {
  limit?: number;
}

export function FeaturedCategorySection({ limit = 6 }: FeaturedCategorySectionProps) {
  const mainCategories = CATEGORIES.filter((c) => c.level === 1).slice(0, limit);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {mainCategories.map((category) => (
          <Link
            key={category.id}
            href={categoryUrl(category.slug)}
            className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300"
          >
            <div className="aspect-square p-4 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 mb-3 flex items-center justify-center bg-orange-50 rounded-full group-hover:bg-orange-100 transition-colors">
                <span className="text-orange-600 text-2xl">
                  {getCategoryIcon(category.groupSlug)}
                </span>
              </div>
              <h3 className="font-semibold text-sm text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
