import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import type { CategoryNode } from "@/types/catalog";
import type { IndustryGroup } from "@/types/catalog";
import { INDUSTRY_GROUP_LABELS } from "@/types/catalog";
import { getCategoryIcon } from "@/lib/category-icons";
import { brandUrl } from "@/lib/urls";

interface MegaMenuSidebarProps {
  groups: CategoryNode[];
  activeSlug: IndustryGroup | "brands";
  onSelect: (slug: IndustryGroup | "brands") => void;
}

export function MegaMenuSidebar({ groups, activeSlug, onSelect }: MegaMenuSidebarProps) {
  return (
    <div className="w-[220px] shrink-0 bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
        Danh mục
      </div>
      <nav className="flex-1 overflow-y-auto">
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            onMouseEnter={() => onSelect(group.groupSlug)}
            onFocus={() => onSelect(group.groupSlug)}
            className={`w-full flex items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors ${
              activeSlug === group.groupSlug
                ? "bg-white text-orange-600 font-semibold border-l-2 border-orange-500"
                : "text-gray-700 hover:bg-white hover:text-orange-600"
            }`}
          >
            <span className="text-orange-500 shrink-0">{getCategoryIcon(group.groupSlug)}</span>
            <span className="flex-1 leading-tight">{group.name}</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          </button>
        ))}
      </nav>
      <div className="border-t border-gray-200">
        <button
          type="button"
          onMouseEnter={() => onSelect("brands")}
          onFocus={() => onSelect("brands")}
          className={`w-full flex items-center gap-2 px-3 py-2.5 text-left text-sm transition-colors ${
            activeSlug === "brands"
              ? "bg-white text-orange-600 font-semibold border-l-2 border-orange-500"
              : "text-gray-700 hover:bg-white hover:text-orange-600"
          }`}
        >
          <span className="flex-1 font-semibold">Thương hiệu</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}

/** Brands-only panel when "Thương hiệu" tab is active */
export function MegaMenuBrandsPanel({ groups, brands }: { groups: CategoryNode[]; brands: import("@/types/catalog").Brand[] }) {
  return (
    <div className="flex-1 p-4 overflow-y-auto max-h-[460px]">
      {groups.map((group) => {
        const groupBrands = brands.filter((b) => b.industryGroups.includes(group.groupSlug));
        if (groupBrands.length === 0) return null;
        return (
          <div key={group.id} className="mb-4">
            <h4 className="text-xs font-bold text-orange-600 uppercase mb-2">
              {INDUSTRY_GROUP_LABELS[group.groupSlug]}
            </h4>
            <div className="flex flex-wrap gap-2">
              {groupBrands.map((brand) => (
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
      })}
    </div>
  );
}
