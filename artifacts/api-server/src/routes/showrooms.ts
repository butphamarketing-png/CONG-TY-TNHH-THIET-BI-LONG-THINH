import { Router, type IRouter } from "express";
import { db, showroomsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/showrooms", async (_req, res): Promise<void> => {
  const showrooms = await db.select().from(showroomsTable);
  res.json(showrooms);
});

export default router;
