import type { Brand } from "@/types/catalog";

interface CategoryBrandFilterTilesProps {
  brands: Brand[];
  selectedBrandSlugs: string[];
  onBrandToggle: (brandSlug: string) => void;
}

/** TDM-style brand logo tiles above product listing */
export function CategoryBrandFilterTiles({
  brands,
  selectedBrandSlugs,
  onBrandToggle,
}: CategoryBrandFilterTilesProps) {
  if (brands.length === 0) return null;

  const featured = brands.filter((b) => b.isFeatured).slice(0, 12);
  const tiles = featured.length > 0 ? featured : brands.slice(0, 12);

  return (
    <div className="mb-5 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <h2 className="text-sm font-bold text-gray-800 mb-3">Thương hiệu</h2>
      <div className="flex flex-wrap gap-2">
        {tiles.map((brand) => {
          const active = selectedBrandSlugs.includes(brand.slug);
          return (
            <button
              key={brand.id}
              type="button"
              onClick={() => onBrandToggle(brand.slug)}
              title={brand.name}
              className={`flex items-center justify-center h-12 min-w-[88px] px-3 rounded-lg border-2 transition-all ${
                active
                  ? "border-orange-500 bg-orange-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-orange-400 hover:bg-orange-50/30"
              }`}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-7 max-w-[72px] object-contain"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
