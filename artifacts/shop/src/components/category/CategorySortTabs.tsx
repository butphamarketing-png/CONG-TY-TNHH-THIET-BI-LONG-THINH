interface SortOption {
  label: string;
  value: string;
}

interface CategorySortTabsProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  total: number;
}

/** Horizontal sort tabs matching tdm.vn category page */
export function CategorySortTabs({ options, value, onChange, total }: CategorySortTabsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-gray-100">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-800">{total}</span> sản phẩm
        </p>
      </div>
      <div className="flex overflow-x-auto scrollbar-hide">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`shrink-0 px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              value === opt.value
                ? "border-orange-600 text-orange-600 bg-orange-50/50"
                : "border-transparent text-gray-600 hover:text-orange-600 hover:bg-gray-50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
