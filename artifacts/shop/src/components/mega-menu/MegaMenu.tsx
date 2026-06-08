import { useState } from "react";
import { Menu } from "lucide-react";
import { CATEGORIES, BRANDS } from "@/lib/tdm-data";
import { getMainGroups, getBrandsForGroup } from "@/lib/category-utils";
import type { IndustryGroup } from "@/types/catalog";
import { MegaMenuSidebar, MegaMenuBrandsPanel } from "./MegaMenuSidebar";
import { MegaMenuPanel } from "./MegaMenuPanel";

export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<IndustryGroup | "brands">("thiet-bi-ve-sinh");

  const mainGroups = getMainGroups(CATEGORIES);
  const activeGroup = mainGroups.find((g) => g.groupSlug === activeSlug) ?? mainGroups[0];
  const activeBrands = activeSlug === "brands"
    ? BRANDS.filter((b) => b.isFeatured)
    : getBrandsForGroup(BRANDS, activeSlug as IndustryGroup);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-3.5 font-bold text-sm bg-orange-600 hover:bg-orange-700 transition-colors whitespace-nowrap"
        aria-expanded={open}
      >
        <Menu className="w-4 h-4" />
        Danh mục sản phẩm
      </button>

      {open && (
        <div className="absolute top-full left-0 w-[min(960px,calc(100vw-2rem))] bg-white text-gray-800 border border-gray-200 shadow-2xl z-50 flex">
          <MegaMenuSidebar
            groups={mainGroups}
            activeSlug={activeSlug}
            onSelect={setActiveSlug}
          />
          {activeSlug === "brands" ? (
            <MegaMenuBrandsPanel groups={mainGroups} brands={BRANDS} />
          ) : (
            <MegaMenuPanel group={activeGroup} brands={activeBrands} />
          )}
        </div>
      )}
    </div>
  );
}
