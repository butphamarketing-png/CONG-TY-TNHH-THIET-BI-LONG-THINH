import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  MEGA_MENU_SIDEBAR,
  MEGA_MENU_BRANDS,
  getMegaMenuFlatGroups,
} from "@/lib/mega-menu-config";
import type { MegaMenuTab } from "@/lib/mega-menu-config";
import type { TdmMenuGroup } from "@/types/catalog";
import { brandUrl, categoryUrl } from "@/lib/urls";

export function MobileCategoryMenu() {
  const [openTab, setOpenTab] = useState<MegaMenuTab | null>(null);

  return (
    <div className="overflow-y-auto flex-1 pb-4">
      <div className="px-4 py-3 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">
        Danh mục sản phẩm
      </div>

      {MEGA_MENU_SIDEBAR.map((item) => {
        const isOpen = openTab === item.id;
        const isBrands = item.id === "brands";

        return (
          <div key={item.id} className="border-b border-gray-100">
            <button
              type="button"
              onClick={() => setOpenTab(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <div>
                <div className="font-semibold text-sm text-gray-900">{item.name}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{item.subtitle}</div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && isBrands && (
              <div className="px-4 pb-4 space-y-4 bg-gray-50/80">
                {MEGA_MENU_BRANDS.map((group) => (
                  <div key={group.groupSlug}>
                    <div className="text-xs font-bold text-[#f37021] mb-2">{group.heading}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.brands.map((brand) => (
                        <Link
                          key={brand.slug}
                          href={brandUrl(brand.slug)}
                          className="text-xs px-2 py-1 bg-white border border-gray-200 rounded hover:border-[#f37021] hover:text-[#f37021] font-medium uppercase"
                        >
                          {brand.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isOpen && !isBrands && (
              <div className="px-4 pb-4 bg-gray-50/80 space-y-3">
                {getMegaMenuFlatGroups(item.id as TdmMenuGroup).map((group) => (
                  <div key={group.headingSlug}>
                    <Link
                      href={categoryUrl(group.headingSlug)}
                      className="flex items-center text-sm font-bold text-[#f37021] mb-1"
                    >
                      <ChevronRight className="w-3 h-3 mr-0.5" />
                      {group.heading}
                    </Link>
                    {group.links.length > 0 && (
                      <div className="pl-4 space-y-0.5">
                        {group.links.map((link) => (
                          <Link
                            key={link.slug}
                            href={categoryUrl(link.slug)}
                            className="block text-sm text-gray-700 hover:text-[#f37021] py-0.5"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
