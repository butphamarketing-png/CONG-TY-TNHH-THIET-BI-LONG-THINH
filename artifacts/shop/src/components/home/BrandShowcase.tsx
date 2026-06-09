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
    <section className="bg-gradient-to-r from-gray-50 to-white py-8 border-y border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        {/* Horizontal logo strip */}
        <div className="flex items-center justify-center gap-8 md:gap-12 overflow-x-auto pb-2 scrollbar-hide">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={brandUrl(brand.slug)}
              className="flex-shrink-0 opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105"
            >
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-14 md:h-20 w-auto object-contain filter drop-shadow-sm"
                />
              ) : (
                <span className="inline-flex items-center justify-center h-14 md:h-20 px-8 bg-white border-2 border-gray-200 rounded-xl text-sm md:text-base font-bold text-gray-600 hover:border-orange-500 hover:text-orange-600 hover:shadow-md transition-all">
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
