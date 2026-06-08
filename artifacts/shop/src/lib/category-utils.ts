import type { Brand, CategoryNode, IndustryGroup, TdmMenuGroup } from "@/types/catalog";
import { TDM_MENU_GROUPS } from "@/types/catalog";
import { TDM_HOMEPAGE_TILES } from "@/lib/homepage-tiles";

export function flattenCategories(nodes: CategoryNode[]): CategoryNode[] {
  const result: CategoryNode[] = [];
  const walk = (list: CategoryNode[]) => {
    for (const node of list) {
      result.push(node);
      if (node.children?.length) walk(node.children);
    }
  };
  walk(nodes);
  return result;
}

/** TDM mega menu: 6 industry groups only */
export function getTdmMenuGroups(categories: CategoryNode[]): CategoryNode[] {
  return TDM_MENU_GROUPS.map((slug) =>
    categories.find((c) => c.slug === slug && c.level === 1),
  ).filter((c): c is CategoryNode => c != null);
}

/** @deprecated Use getTdmMenuGroups — returns all L1 including hidden groups */
export function getMainGroups(categories: CategoryNode[]): CategoryNode[] {
  return categories.filter((c) => c.level === 1).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function findCategoryBySlug(
  categories: CategoryNode[],
  slug: string,
): CategoryNode | undefined {
  return flattenCategories(categories).find((c) => c.slug === slug);
}

export function getBreadcrumb(
  categories: CategoryNode[],
  slug: string,
): CategoryNode[] {
  const flat = flattenCategories(categories);
  const byId = new Map(flat.map((c) => [c.id, c]));
  const node = flat.find((c) => c.slug === slug);
  if (!node) return [];

  const trail: CategoryNode[] = [];
  let current: CategoryNode | undefined = node;
  while (current) {
    trail.unshift(current);
    current = current.parentId != null ? byId.get(current.parentId) : undefined;
  }
  return trail;
}

export function getDescendantSlugs(node: CategoryNode): string[] {
  const slugs: string[] = [node.slug];
  if (node.children) {
    for (const child of node.children) {
      slugs.push(...getDescendantSlugs(child));
    }
  }
  return slugs;
}

export function getBrandsForGroup(brands: Brand[], group: IndustryGroup): Brand[] {
  return brands
    .filter((b) => b.industryGroups.includes(group))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function hasChildCategories(node: CategoryNode): boolean {
  return (node.children?.length ?? 0) > 0;
}

export function isLeafCategory(node: CategoryNode): boolean {
  return !hasChildCategories(node) || node.showProductGrid === true;
}

/** Resolve TDM homepage tile slugs to category nodes */
export function getHomepageTilesForGroup(
  categories: CategoryNode[],
  group: TdmMenuGroup,
): CategoryNode[] {
  const slugs = TDM_HOMEPAGE_TILES[group] ?? [];
  return slugs
    .map((slug) => findCategoryBySlug(categories, slug))
    .filter((c): c is CategoryNode => c != null);
}
