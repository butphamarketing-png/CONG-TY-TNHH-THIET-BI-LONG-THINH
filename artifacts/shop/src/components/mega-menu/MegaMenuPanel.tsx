import { Link } from "wouter";
import type { CategoryNode } from "@/types/catalog";
import type { Brand } from "@/types/catalog";
import { MegaMenuBrandStrip } from "./MegaMenuBrandStrip";
import { categoryUrl } from "@/lib/urls";

interface MegaMenuPanelProps {
  group: CategoryNode;
  brands: Brand[];
}

export function MegaMenuPanel({ group, brands }: MegaMenuPanelProps) {
  const columns = group.children ?? [];

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 max-h-[420px] overflow-y-auto">
        {columns.map((col) => (
          <div key={col.id} className="min-w-0">
            <Link
              href={categoryUrl(col.slug)}
              className="block font-semibold text-gray-800 hover:text-orange-600 text-sm pb-1.5 mb-1.5 border-b border-gray-100"
            >
              {col.name}
            </Link>
            <div className="space-y-0.5">
              {(col.children ?? []).map((item) => (
                <Link
                  key={item.id}
                  href={categoryUrl(item.slug)}
                  className="block py-1 text-[13px] text-gray-600 hover:text-orange-600 hover:pl-0.5 transition-all truncate"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <MegaMenuBrandStrip brands={brands} />
    </div>
  );
}
