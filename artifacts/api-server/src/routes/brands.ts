import { Router, type IRouter } from "express";
import { sql } from "drizzle-orm";
import { db, brandsTable, productsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/brands", async (_req, res): Promise<void> => {
  const brands = await db.select().from(brandsTable).orderBy(brandsTable.sortOrder);

  const counts = await db
    .select({ brandSlug: productsTable.brandSlug, count: sql<number>`count(*)` })
    .from(productsTable)
    .groupBy(productsTable.brandSlug);

  const countMap = Object.fromEntries(counts.map(c => [c.brandSlug, Number(c.count)]));

  const result = brands.map(b => ({
    id: b.id,
    name: b.name,
    slug: b.slug,
    logo: b.logo,
    description: b.description,
    isFeatured: b.isFeatured,
    productCount: countMap[b.slug] ?? 0,
  }));

  res.json(result);
});

export default router;
