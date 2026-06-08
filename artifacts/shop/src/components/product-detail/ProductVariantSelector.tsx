import type { VariantGroup } from "./useProductVariantSelection";

interface ProductVariantSelectorProps {
  groups: VariantGroup[];
  selected: Record<string, number>;
  onSelect: (groupName: string, variantId: number) => void;
}

/** TDM-style horizontal variant / model selector */
export function ProductVariantSelector({
  groups,
  selected,
  onSelect,
}: ProductVariantSelectorProps) {
  if (groups.length === 0) return null;

  return (
    <div className="space-y-4 mb-5">
      {groups.map((group) => (
        <div key={group.name}>
          <p className="text-sm font-semibold text-gray-700 mb-2">
            {group.name}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.options.map((option) => {
              const isActive = selected[group.name] === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={!option.inStock}
                  onClick={() => onSelect(group.name, option.id)}
                  className={`px-4 py-2 text-sm rounded-lg border-2 transition-all ${
                    isActive
                      ? "border-orange-600 bg-orange-50 text-orange-700 font-semibold"
                      : option.inStock
                        ? "border-gray-200 bg-white text-gray-700 hover:border-orange-400 hover:text-orange-600"
                        : "border-gray-100 bg-gray-50 text-gray-400 line-through cursor-not-allowed"
                  }`}
                >
                  {option.value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
