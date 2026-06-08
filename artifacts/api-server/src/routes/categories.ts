import { Router, type IRouter } from "express";
import { eq, isNull, sql } from "drizzle-orm";
import { db, categoriesTable, productsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/categories", async (_req, res): Promise<void> => {
  const all = await db.select().from(categoriesTable).orderBy(categoriesTable.sortOrder);

  // Count products per category
  const counts = await db
    .select({ categorySlug: productsTable.categorySlug, count: sql<number>`count(*)` })
    .from(productsTable)
    .groupBy(productsTable.categorySlug);

  const countMap = Object.fromEntries(counts.map(c => [c.categorySlug, Number(c.count)]));

  const withCount = all.map(c => ({ ...c, productCount: countMap[c.slug] ?? 0 }));

  // Build tree: root → level2 → level3
  const roots = withCount.filter(c => !c.parentId);

  const tree = roots.map(root => ({
    id: root.id,
    name: root.name,
    slug: root.slug,
    icon: root.icon,
    image: root.image,
    description: root.description,
    productCount: root.productCount,
    children: withCount
      .filter(c => c.parentId === root.id)
      .map(child => ({
        id: child.id,
        name: child.name,
        slug: child.slug,
        icon: child.icon,
        children: withCount
          .filter(c => c.parentId === child.id)
          .map(leaf => ({ id: leaf.id, name: leaf.name, slug: leaf.slug })),
      })),
  }));

  res.json(tree);
});

export default router;
