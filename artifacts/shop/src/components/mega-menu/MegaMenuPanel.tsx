import { Link } from "wouter";
import { MEGA_MENU_COLUMNS } from "@/lib/mega-menu-config";
import type { TdmMenuGroup } from "@/types/catalog";
import { categoryUrl } from "@/lib/urls";

interface MegaMenuPanelProps {
  groupSlug: TdmMenuGroup;
}

function MenuGroupBlock({
  heading,
  headingSlug,
  links,
}: {
  heading: string;
  headingSlug: string;
  links: { name: string; slug: string }[];
}) {
  return (
    <div className="mb-5 last:mb-0">
      <Link
        href={categoryUrl(headingSlug)}
        className="block font-bold text-[#f37021] text-sm mb-2 hover:underline"
      >
        {heading}
      </Link>
      {links.length > 0 && (
        <div className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.slug}
              href={categoryUrl(link.slug)}
              className="block text-[13px] text-gray-700 hover:text-[#f37021] leading-snug transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/** TDM column layout: each column stacks multiple L2 groups vertically */
export function MegaMenuPanel({ groupSlug }: MegaMenuPanelProps) {
  const columns = MEGA_MENU_COLUMNS[groupSlug] ?? [];
  const colCount = columns.length;

  return (
    <div className="flex-1 bg-white min-w-0 overflow-hidden">
      <div
        className="flex max-h-[480px] overflow-y-auto"
        style={{ minHeight: 360 }}
      >
        {columns.map((col, colIdx) => (
          <div
            key={colIdx}
            className="flex-1 min-w-0 px-5 py-4 border-r border-gray-100 last:border-r-0"
            style={{ flexBasis: `${100 / colCount}%` }}
          >
            {col.groups.map((group) => (
              <MenuGroupBlock
                key={group.headingSlug}
                heading={group.heading}
                headingSlug={group.headingSlug}
                links={group.links}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
