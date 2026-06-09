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
    <section className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-4 md:px-6 py-4 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="px-4 md:px-6 py-6">
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={brandUrl(brand.slug)}
              className="opacity-70 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
            >
              {brand.logo ? (
                <img src={brand.logo} alt={brand.name} className="h-10 md:h-12 object-contain" />
              ) : (
                <span className="inline-flex items-center justify-center min-w-[80px] h-10 px-4 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:border-orange-500 hover:text-orange-600">
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
