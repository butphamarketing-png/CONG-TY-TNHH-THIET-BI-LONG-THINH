import { Link } from "wouter";
import type { Brand } from "@/types/catalog";
import { brandUrl } from "@/lib/urls";

interface BrandShowcaseProps {
  brands: Brand[];
  title: string;
}

export function BrandShowcase({ brands, title }: BrandShowcaseProps) {
  if (brands.length === 0) return null;

  return (
    <section className="bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Horizontal logo strip */}
        <div className="flex items-center gap-6 md:gap-8 overflow-x-auto pb-2 scrollbar-hide">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={brandUrl(brand.slug)}
              className="flex-shrink-0 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
            >
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 md:h-16 w-auto object-contain"
                />
              ) : (
                <span className="inline-flex items-center justify-center h-12 md:h-16 px-6 bg-white border border-gray-200 rounded text-sm md:text-base font-bold text-gray-600 hover:border-orange-500 hover:text-orange-600">
                  {brand.name}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
