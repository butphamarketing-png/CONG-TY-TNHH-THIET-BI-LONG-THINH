import { useState } from "react";
import { Menu } from "lucide-react";
import type { MegaMenuTab } from "@/lib/mega-menu-config";
import type { TdmMenuGroup } from "@/types/catalog";
import { MegaMenuSidebar } from "./MegaMenuSidebar";
import { MegaMenuBrandsPanel } from "./MegaMenuBrandsPanel";
import { MegaMenuPanel } from "./MegaMenuPanel";

export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<MegaMenuTab>("thiet-bi-ve-sinh");

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-2 px-5 py-3.5 font-bold text-sm bg-[#f37021] hover:bg-[#e0651a] text-white transition-colors whitespace-nowrap"
        aria-expanded={open}
      >
        <Menu className="w-4 h-4" />
        Danh mục sản phẩm
      </button>

      {open && (
        <div className="absolute top-full left-0 w-[min(960px,calc(100vw-2rem))] bg-white border border-gray-200 shadow-2xl z-50 flex">
          <MegaMenuSidebar activeTab={activeTab} onSelect={setActiveTab} />
          {activeTab === "brands" ? (
            <MegaMenuBrandsPanel />
          ) : (
            <MegaMenuPanel groupSlug={activeTab as TdmMenuGroup} />
          )}
        </div>
      )}
    </div>
  );
}
