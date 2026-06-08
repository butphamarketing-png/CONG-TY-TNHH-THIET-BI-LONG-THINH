import type { Brand, CategoryNode } from "@/types/catalog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal, X } from "lucide-react";

export interface PricePreset {
  label: string;
  min: number;
  max: number | undefined;
}

interface CategoryFilterSidebarProps {
  brands: Brand[];
  subcategories: CategoryNode[];
  pricePresets: PricePreset[];
  selectedBrands: string[];
  selectedProductTypes: string[];
  pricePreset: number | null;
  minPrice?: number;
  maxPrice?: number;
  onBrandToggle: (slug: string) => void;
  onProductTypeToggle: (slug: string) => void;
  onPricePreset: (idx: number) => void;
  onClearPricePreset: () => void;
  onMinPriceChange: (value: number | undefined) => void;
  onMaxPriceChange: (value: number | undefined) => void;
  onClearAll: () => void;
  hasFilters: boolean;
}

export function CategoryFilterSidebar({
  brands,
  subcategories,
  pricePresets,
  selectedBrands,
  selectedProductTypes,
  pricePreset,
  minPrice,
  maxPrice,
  onBrandToggle,
  onProductTypeToggle,
  onPricePreset,
  onClearPricePreset,
  onMinPriceChange,
  onMaxPriceChange,
  onClearAll,
  hasFilters,
}: CategoryFilterSidebarProps) {
  return (
    <aside className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/80">
        <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-orange-600" />
          Bộ lọc
        </h2>
        {hasFilters && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-orange-600 hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Xóa tất cả
          </button>
        )}
      </div>

      <div className="p-4 space-y-5">
        {/* Brand */}
        {brands.length > 0 && (
          <section>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2.5">
              Thương hiệu
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {brands.map((brand) => (
                <label
                  key={brand.id}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <Checkbox
                    id={`sidebar-brand-${brand.id}`}
                    checked={selectedBrands.includes(brand.slug)}
                    onCheckedChange={() => onBrandToggle(brand.slug)}
                  />
                  <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors">
                    {brand.name}
                  </span>
                </label>
              ))}
            </div>
          </section>
        )}

        {/* Price range */}
        <section>
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2.5">
            Khoảng giá
          </h3>
          <div className="flex flex-col gap-1.5">
            {pricePresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() =>
                  pricePreset === idx ? onClearPricePreset() : onPricePreset(idx)
                }
                className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                  pricePreset === idx
                    ? "bg-orange-600 text-white font-medium"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-700"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <Input
              type="number"
              placeholder="Từ"
              value={minPrice ?? ""}
              onChange={(e) =>
                onMinPriceChange(e.target.value ? Number(e.target.value) : undefined)
              }
              className="h-8 text-xs"
            />
            <Input
              type="number"
              placeholder="Đến"
              value={maxPrice ?? ""}
              onChange={(e) =>
                onMaxPriceChange(e.target.value ? Number(e.target.value) : undefined)
              }
              className="h-8 text-xs"
            />
          </div>
        </section>

        {/* Product type (subcategories) */}
        {subcategories.length > 0 && (
          <section>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2.5">
              Loại sản phẩm
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {subcategories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <Checkbox
                    id={`sidebar-type-${cat.id}`}
                    checked={selectedProductTypes.includes(cat.slug)}
                    onCheckedChange={() => onProductTypeToggle(cat.slug)}
                  />
                  <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {cat.name}
                  </span>
                </label>
              ))}
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}
