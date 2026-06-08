export interface SortTab {
  label: string;
  value: string;
}

interface CategoryListingToolbarProps {
  tabs?: SortTab[];
  value: string;
  onChange: (value: string) => void;
  total: number;
}

const DEFAULT_TABS: SortTab[] = [
  { label: "Bán chạy", value: "bestseller" },
  { label: "Mới nhất", value: "newest" },
  { label: "Giá thấp → cao", value: "price_asc" },
  { label: "Giá cao → thấp", value: "price_desc" },
];

/** TDM-style sort tabs above product grid */
export function CategoryListingToolbar({
  tabs = DEFAULT_TABS,
  value,
  onChange,
  total,
}: CategoryListingToolbarProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
        <p className="text-sm text-gray-600">
          Có <span className="font-bold text-gray-900">{total.toLocaleString("vi-VN")}</span> sản phẩm
        </p>
      </div>
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`shrink-0 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              value === tab.value
                ? "border-orange-600 text-orange-600 bg-white"
                : "border-transparent text-gray-600 hover:text-orange-600 hover:border-orange-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
