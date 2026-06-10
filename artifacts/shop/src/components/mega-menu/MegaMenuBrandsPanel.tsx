import { Link } from "wouter";
import { MEGA_MENU_BRANDS } from "@/lib/mega-menu-config";
import { brandUrl } from "@/lib/urls";

/** Brands panel — TDM.vn "Thương hiệu" tab */
export function MegaMenuBrandsPanel() {
  return (
    <div className="flex-1 p-5 overflow-y-auto max-h-[480px] bg-white">
      <div className="grid grid-cols-1 gap-5">
        {MEGA_MENU_BRANDS.map((group) => (
          <div key={group.groupSlug}>
            <h4 className="text-sm font-bold text-[#f37021] mb-2.5">
              {group.heading}
            </h4>
            <div className="flex flex-wrap gap-2">
              {group.brands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={brandUrl(brand.slug)}
                  className="inline-flex items-center justify-center min-h-[34px] px-3 py-1.5 bg-white border border-gray-200 rounded-sm text-xs font-bold text-gray-700 hover:border-[#f37021] hover:text-[#f37021] transition-colors uppercase tracking-wide"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
