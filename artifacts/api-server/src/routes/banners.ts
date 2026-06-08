import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, bannersTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/banners", async (_req, res): Promise<void> => {
  const banners = await db.select().from(bannersTable)
    .where(eq(bannersTable.isActive, true))
    .orderBy(bannersTable.sortOrder);
  res.json(banners);
});

export default router;
