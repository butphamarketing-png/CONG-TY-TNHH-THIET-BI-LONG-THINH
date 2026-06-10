import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function SectionPagination({
  page,
  totalPages,
  onPageChange,
  className,
}: SectionPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={cn("flex items-center justify-center gap-2 mt-6", className)}>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600 disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-sm"
        aria-label="Trang trước"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1.5">
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={cn(
              "min-w-[32px] h-8 px-2 rounded-full text-sm font-medium transition-colors",
              p === page
                ? "bg-orange-500 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600",
            )}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600 disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-sm"
        aria-label="Trang sau"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
