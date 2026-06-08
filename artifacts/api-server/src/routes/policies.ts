import { Router, type IRouter } from "express";
import { db, policiesTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/policies", async (_req, res): Promise<void> => {
  const policies = await db.select().from(policiesTable).orderBy(policiesTable.sortOrder);
  res.json(policies);
});

export default router;
