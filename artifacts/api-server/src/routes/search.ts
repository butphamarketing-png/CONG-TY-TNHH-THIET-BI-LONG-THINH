import { Router, type IRouter } from "express";
import { ilike, or, sql } from "drizzle-orm";
import { db, productsTable, categoriesTable, brandsTable } from "@workspace/db";
import { SearchProductsQueryParams, GetSearchSuggestionsQueryParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/search", async (req, res): Promise<void> => {
  const parsed = SearchProductsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { q, page = 1, limit = 20 } = parsed.data;
  const offset = (page - 1) * limit;

  const whereClause = or(
    ilike(productsTable.name, `%${q}%`),
    ilike(productsTable.brandName, `%${q}%`),
    ilike(productsTable.categoryName, `%${q}%`),
  );

  const [products, countResult] = await Promise.all([
    db.select().from(productsTable)
      .where(whereClause)
      .limit(limit)
      .offset(offset),
    db.select({ count: sql<number>`count(*)` }).from(productsTable).where(whereClause),
  ]);

  const total = Number(countResult[0]?.count ?? 0);

  res.json({
    data: products,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
});

router.get("/search/suggestions", async (req, res): Promise<void> => {
  const parsed = GetSearchSuggestionsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { q } = parsed.data;

  const [products, categories, brands] = await Promise.all([
    db.select({ name: productsTable.name, slug: productsTable.slug, thumbnail: productsTable.thumbnail, price: productsTable.price })
      .from(productsTable)
      .where(ilike(productsTable.name, `%${q}%`))
      .limit(5),
    db.select({ name: categoriesTable.name, slug: categoriesTable.slug })
      .from(categoriesTable)
      .where(ilike(categoriesTable.name, `%${q}%`))
      .limit(3),
    db.select({ name: brandsTable.name, slug: brandsTable.slug })
      .from(brandsTable)
      .where(ilike(brandsTable.name, `%${q}%`))
      .limit(3),
  ]);

  const suggestions = [
    ...products.map(p => ({ type: "product" as const, label: p.name, slug: p.slug, thumbnail: p.thumbnail, price: p.price })),
    ...categories.map(c => ({ type: "category" as const, label: c.name, slug: c.slug, thumbnail: null, price: null })),
    ...brands.map(b => ({ type: "brand" as const, label: b.name, slug: b.slug, thumbnail: null, price: null })),
  ];

  res.json(suggestions);
});

export default router;
