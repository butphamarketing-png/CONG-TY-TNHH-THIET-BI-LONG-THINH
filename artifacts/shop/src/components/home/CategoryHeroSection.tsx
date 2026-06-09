import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import type { CategoryNode } from "@/types/catalog";
import { getCategoryIcon } from "@/lib/category-icons";
import { categoryUrl } from "@/lib/urls";
import { CATEGORIES, PRODUCTS } from "@/lib/tdm-data";
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

function CategoryImageCard({ name, slug }: { name: string; slug: string }) {
  // Find first product in this category to use as image
  const categoryProduct = PRODUCTS.find((p) => p.categorySlug === slug);
  const imageUrl = categoryProduct?.thumbnail || "/placeholder.jpg";

  return (
    <Link href={categoryUrl(slug)} className="group block">
      <div className="relative h-36 md:h-44 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-orange-300">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-90" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <span className="text-sm font-semibold text-white line-clamp-1 drop-shadow-md">{name}</span>
        </div>
      </div>
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
    <section className="bg-white mb-8">
      {/* Center aligned large orange title */}
      <div className="text-center py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-orange-600 uppercase tracking-wider">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-gray-600 mt-2 font-medium">{description}</p>
        )}
      </div>

      {/* Large product image cards grid */}
      <div className="px-4 md:px-8 pb-8">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {subcats.slice(0, 8).map((cat) => (
            <CategoryImageCard key={cat.id} name={cat.name} slug={cat.slug} />
          ))}
        </div>
      </div>

      {/* View all link */}
      <div className="text-center pb-8">
        <Link
          href={categoryUrl(groupSlug)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Xem tất cả <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
