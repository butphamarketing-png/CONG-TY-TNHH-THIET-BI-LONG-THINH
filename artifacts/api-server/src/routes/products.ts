import { Router, type IRouter } from "express";
import { eq, ilike, and, gte, lte, sql } from "drizzle-orm";
import { db, productsTable, reviewsTable } from "@workspace/db";
import {
  ListProductsQueryParams,
  ListProductsResponse,
  GetProductParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/products", async (req, res): Promise<void> => {
  const parsed = ListProductsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { page = 1, limit = 20, category, brand, minPrice, maxPrice, tab, q } = parsed.data;

  const conditions = [];

  if (category) conditions.push(eq(productsTable.categorySlug, category));
  if (brand) conditions.push(eq(productsTable.brandSlug, brand));
  if (minPrice != null) conditions.push(gte(productsTable.price, minPrice));
  if (maxPrice != null) conditions.push(lte(productsTable.price, maxPrice));
  if (q) conditions.push(ilike(productsTable.name, `%${q}%`));

  if (tab === "featured") conditions.push(eq(productsTable.isFeatured, true));
  else if (tab === "bestseller") conditions.push(eq(productsTable.isBestSeller, true));
  else if (tab === "sale") conditions.push(eq(productsTable.isOnSale, true));
  else if (tab === "newest") conditions.push(eq(productsTable.isNew, true));

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const offset = (page - 1) * limit;

  const [products, countResult] = await Promise.all([
    db.select().from(productsTable)
      .where(whereClause)
      .limit(limit)
      .offset(offset)
      .orderBy(productsTable.createdAt),
    db.select({ count: sql<number>`count(*)` }).from(productsTable).where(whereClause),
  ]);

  const total = Number(countResult[0]?.count ?? 0);

  res.json(ListProductsResponse.parse({
    data: products,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }));
});

router.get("/products/:slug", async (req, res): Promise<void> => {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;

  const [product] = await db.select().from(productsTable).where(eq(productsTable.slug, slug));

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  // Increment view count
  await db.update(productsTable)
    .set({ viewCount: product.viewCount + 1 })
    .where(eq(productsTable.id, product.id));

  // Get reviews
  const reviews = await db.select().from(reviewsTable)
    .where(eq(reviewsTable.productId, product.id))
    .limit(20);

  // Get related products (same brand or category)
  const related = await db.select().from(productsTable)
    .where(
      and(
        eq(productsTable.brandSlug, product.brandSlug),
        sql`${productsTable.id} != ${product.id}`
      )
    )
    .limit(8);

  const reviewsMapped = reviews.map(r => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  }));

  res.json({
    ...product,
    reviews: reviewsMapped,
    relatedProducts: related,
  });
});

export default router;
