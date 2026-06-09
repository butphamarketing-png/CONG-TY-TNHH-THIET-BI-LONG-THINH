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
      <div className="relative h-32 md:h-40 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg overflow-hidden group-hover:shadow-lg transition-all duration-300">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.jpg";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gray-900/80 text-white px-3 py-2">
          <span className="text-sm font-medium line-clamp-1">{name}</span>
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
    <section className="bg-white mb-6">
      {/* Center aligned large orange title */}
      <div className="text-center py-6">
        <h2 className="text-2xl md:text-3xl font-bold text-orange-600 uppercase tracking-wide">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-gray-500 mt-2">{description}</p>
        )}
      </div>

      {/* Large product image cards grid */}
      <div className="px-4 md:px-6 pb-6">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {subcats.slice(0, 8).map((cat) => (
            <CategoryImageCard key={cat.id} name={cat.name} slug={cat.slug} />
          ))}
        </div>
      </div>

      {/* View all link */}
      <div className="text-center pb-6">
        <Link
          href={categoryUrl(groupSlug)}
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold hover:underline"
        >
          Xem tất cả <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
