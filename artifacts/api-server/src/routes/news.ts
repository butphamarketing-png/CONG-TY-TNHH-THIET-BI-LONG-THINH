import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, newsTable } from "@workspace/db";
import { ListNewsQueryParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/news", async (req, res): Promise<void> => {
  const parsed = ListNewsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { page = 1, limit = 10 } = parsed.data;
  const offset = (page - 1) * limit;

  const [articles, countResult] = await Promise.all([
    db.select().from(newsTable)
      .orderBy(newsTable.createdAt)
      .limit(limit)
      .offset(offset),
    db.select({ count: sql<number>`count(*)` }).from(newsTable),
  ]);

  const total = Number(countResult[0]?.count ?? 0);

  const mapped = articles.map(a => ({ ...a, createdAt: a.createdAt.toISOString() }));

  res.json({
    data: mapped,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
});

router.get("/news/:slug", async (req, res): Promise<void> => {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;

  const [article] = await db.select().from(newsTable).where(eq(newsTable.slug, slug));

  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }

  await db.update(newsTable)
    .set({ viewCount: article.viewCount + 1 })
    .where(eq(newsTable.id, article.id));

  res.json({ ...article, createdAt: article.createdAt.toISOString() });
});

export default router;
