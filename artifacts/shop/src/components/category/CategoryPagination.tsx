import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("ellipsis");

  pages.push(total);
  return pages;
}

/** TDM-style pagination — 48 products per page */
export function CategoryPagination({
  page,
  totalPages,
  onPageChange,
}: CategoryPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages);

  return (
    <nav
      className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
      aria-label="Phân trang sản phẩm"
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-orange-400 hover:text-orange-600 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Trước
      </button>

      <div className="flex items-center gap-1 flex-wrap justify-center">
        {pages.map((p, idx) =>
          p === "ellipsis" ? (
            <span key={`e-${idx}`} className="px-2 text-gray-400 text-sm">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`min-w-[36px] h-9 px-2 text-sm font-medium rounded-lg border transition-colors ${
                page === p
                  ? "bg-orange-600 border-orange-600 text-white shadow-sm"
                  : "bg-white border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-600"
              }`}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:border-orange-400 hover:text-orange-600 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        Sau
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
