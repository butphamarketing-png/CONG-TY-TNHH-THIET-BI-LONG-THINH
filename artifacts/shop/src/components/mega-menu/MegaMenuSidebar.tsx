import { ChevronRight } from "lucide-react";
import { MEGA_MENU_SIDEBAR } from "@/lib/mega-menu-config";
import type { MegaMenuTab } from "@/lib/mega-menu-config";

interface MegaMenuSidebarProps {
  activeTab: MegaMenuTab;
  onSelect: (tab: MegaMenuTab) => void;
}

export function MegaMenuSidebar({ activeTab, onSelect }: MegaMenuSidebarProps) {
  return (
    <div className="w-[240px] shrink-0 bg-[#f5f5f5] border-r border-gray-200 flex flex-col">
      <nav className="flex-1 py-1">
        {MEGA_MENU_SIDEBAR.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onMouseEnter={() => onSelect(item.id)}
              onFocus={() => onSelect(item.id)}
              className={`relative w-full flex items-start gap-2 px-4 py-3 text-left transition-colors group ${
                isActive
                  ? "bg-[#f37021] text-white"
                  : "text-gray-800 hover:bg-white"
              }`}
            >
              {isActive && (
                <span
                  className="absolute right-0 top-0 bottom-0 w-3 translate-x-full bg-[#f37021]"
                  style={{
                    clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                  }}
                  aria-hidden
                />
              )}
              <div className="flex-1 min-w-0">
                <div className={`font-semibold text-sm leading-tight ${isActive ? "text-white" : "text-gray-900"}`}>
                  {item.name}
                </div>
                <div className={`text-[11px] mt-0.5 leading-snug ${isActive ? "text-white/90" : "text-gray-500"}`}>
                  {item.subtitle}
                </div>
              </div>
              <ChevronRight
                className={`w-3.5 h-3.5 shrink-0 mt-1 ${isActive ? "text-white" : "text-gray-400"}`}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
