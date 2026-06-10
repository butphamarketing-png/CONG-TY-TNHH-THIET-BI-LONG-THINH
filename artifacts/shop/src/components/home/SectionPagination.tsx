import type { RefObject } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  /** Cuộn tới đầu khối sản phẩm khi đổi trang */
  scrollTargetRef?: RefObject<HTMLElement | null>;
}

const MAX_VISIBLE = 5;

function getVisiblePages(current: number, total: number): number[] {
  if (total <= MAX_VISIBLE) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  let start = Math.max(1, current - Math.floor(MAX_VISIBLE / 2));
  let end = start + MAX_VISIBLE - 1;
  if (end > total) {
    end = total;
    start = Math.max(1, end - MAX_VISIBLE + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function SectionPagination({
  page,
  totalPages,
  onPageChange,
  className,
  scrollTargetRef,
}: SectionPaginationProps) {
  const safePage = Math.min(Math.max(1, page), totalPages);

  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(safePage, totalPages);
  const showStartEllipsis = visiblePages[0] > 1;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

  const scrollToTop = () => {
    if (scrollTargetRef?.current) {
      const top =
        scrollTargetRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goTo = (next: number) => {
    const p = Math.min(Math.max(1, next), totalPages);
    if (p === safePage) return;
    onPageChange(p);
    requestAnimationFrame(scrollToTop);
  };

  return (
    <div className={cn("flex flex-col items-center gap-2 mt-6", className)}>
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => goTo(safePage - 1)}
          disabled={safePage <= 1}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600 disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-sm"
          aria-label="Trang trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {showStartEllipsis && (
            <>
              <PageButton n={1} active={safePage === 1} onClick={() => goTo(1)} />
              <span className="text-gray-400 text-sm px-0.5">…</span>
            </>
          )}

          {visiblePages.map((p) => (
            <PageButton key={p} n={p} active={p === safePage} onClick={() => goTo(p)} />
          ))}

          {showEndEllipsis && (
            <>
              <span className="text-gray-400 text-sm px-0.5">…</span>
              <PageButton n={totalPages} active={safePage === totalPages} onClick={() => goTo(totalPages)} />
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => goTo(safePage + 1)}
          disabled={safePage >= totalPages}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600 disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-sm"
          aria-label="Trang sau"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-gray-500">
        Trang {safePage} / {totalPages}
      </p>
    </div>
  );
}

function PageButton({
  n,
  active,
  onClick,
}: {
  n: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-w-[32px] h-8 px-2 rounded-full text-sm font-medium transition-colors",
        active
          ? "bg-orange-500 text-white shadow-sm"
          : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600",
      )}
    >
      {n}
    </button>
  );
}
