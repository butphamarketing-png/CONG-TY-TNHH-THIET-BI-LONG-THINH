import { Link } from "wouter";
import type { Brand } from "@/types/catalog";
import { brandUrl } from "@/lib/urls";

interface MegaMenuBrandStripProps {
  brands: Brand[];
  label?: string;
}

export function MegaMenuBrandStrip({ brands, label = "Thương hiệu nổi bật" }: MegaMenuBrandStripProps) {
  if (brands.length === 0) return null;

  return (
    <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
      <div className="text-[11px] font-semibold text-gray-500 uppercase mb-2 tracking-wide">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={brandUrl(brand.slug)}
            className="inline-flex items-center justify-center min-w-[72px] h-9 px-3 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-colors"
          >
            {brand.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
