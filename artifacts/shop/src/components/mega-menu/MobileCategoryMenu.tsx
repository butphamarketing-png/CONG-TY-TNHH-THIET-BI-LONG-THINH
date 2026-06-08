import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CATEGORIES, BRANDS } from "@/lib/tdm-data";
import { getMainGroups } from "@/lib/category-utils";
import { getCategoryIcon } from "@/lib/category-icons";
import type { CategoryNode } from "@/types/catalog";
import { INDUSTRY_GROUP_LABELS } from "@/types/catalog";
import { brandUrl, categoryUrl } from "@/lib/urls";

function MobileCategoryItem({ node, depth = 0 }: { node: CategoryNode; depth?: number }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = (node.children?.length ?? 0) > 0;
  const paddingLeft = 16 + depth * 12;

  return (
    <div className="border-b border-gray-50 last:border-0">
      <div className="flex items-center" style={{ paddingLeft }}>
        <Link
          href={categoryUrl(node.slug)}
          className="flex-1 py-2.5 text-sm text-gray-700 hover:text-orange-600 font-medium"
        >
          {node.name}
        </Link>
        {hasChildren && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="p-2 text-gray-400 hover:text-orange-600"
            aria-label={expanded ? "Thu gọn" : "Mở rộng"}
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
      {hasChildren && expanded && (
        <div>
          {node.children!.map((child) => (
            <MobileCategoryItem key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function MobileCategoryMenu() {
  const mainGroups = getMainGroups(CATEGORIES);
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const [showBrands, setShowBrands] = useState(false);

  return (
    <div className="overflow-y-auto flex-1 pb-4">
      <div className="px-4 py-3 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">
        Danh mục sản phẩm
      </div>

      {mainGroups.map((group) => (
        <div key={group.id} className="border-b border-gray-100">
          <button
            type="button"
            onClick={() => {
              setShowBrands(false);
              setOpenGroup(openGroup === group.id ? null : group.id);
            }}
            className="w-full flex items-center justify-between px-4 py-3 font-medium hover:bg-gray-50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="text-orange-500">{getCategoryIcon(group.groupSlug)}</span>
              {group.name}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openGroup === group.id ? "rotate-180" : ""}`} />
          </button>
          {openGroup === group.id && group.children && (
            <div className="bg-gray-50/80 pb-2">
              <Link
                href={categoryUrl(group.slug)}
                className="flex items-center px-4 py-2 text-sm text-orange-600 font-semibold"
              >
                <ChevronRight className="w-3 h-3 mr-1" />
                Xem tất cả {group.name}
              </Link>
              {group.children.map((child) => (
                <MobileCategoryItem key={child.id} node={child} depth={1} />
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="border-b border-gray-100">
        <button
          type="button"
          onClick={() => {
            setOpenGroup(null);
            setShowBrands(!showBrands);
          }}
          className="w-full flex items-center justify-between px-4 py-3 font-semibold hover:bg-gray-50 transition-colors"
        >
          Thương hiệu
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showBrands ? "rotate-180" : ""}`} />
        </button>
        {showBrands && (
          <div className="px-4 pb-4 space-y-3 bg-gray-50/80">
            {mainGroups.map((group) => {
              const groupBrands = BRANDS.filter((b) => b.industryGroups.includes(group.groupSlug));
              if (groupBrands.length === 0) return null;
              return (
                <div key={group.id}>
                  <div className="text-[10px] font-bold text-orange-600 uppercase mb-1.5">
                    {INDUSTRY_GROUP_LABELS[group.groupSlug]}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {groupBrands.map((brand) => (
                      <Link
                        key={brand.id}
                        href={brandUrl(brand.slug)}
                        className="text-xs px-2 py-1 bg-white border border-gray-200 rounded hover:border-orange-500 hover:text-orange-600"
                      >
                        {brand.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
