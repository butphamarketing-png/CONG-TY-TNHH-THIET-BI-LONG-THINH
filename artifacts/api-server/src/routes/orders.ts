import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, ordersTable } from "@workspace/db";
import { CreateOrderBody } from "@workspace/api-zod";

function generateOrderCode(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TDM-${ts}-${rand}`;
}

const router: IRouter = Router();

router.post("/orders", async (req, res): Promise<void> => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { fullName, phone, address, email, note, paymentMethod, items } = parsed.data;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const code = generateOrderCode();

  const [order] = await db.insert(ordersTable).values({
    code,
    fullName,
    phone,
    address,
    email: email ?? null,
    note: note ?? null,
    paymentMethod: paymentMethod ?? "cod",
    status: "pending",
    total,
    items: items as unknown[],
  }).returning();

  res.status(201).json({ ...order, createdAt: order.createdAt.toISOString() });
});

router.get("/orders/:code", async (req, res): Promise<void> => {
  const code = Array.isArray(req.params.code) ? req.params.code[0] : req.params.code;

  const [order] = await db.select().from(ordersTable).where(eq(ordersTable.code, code));

  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  res.json({ ...order, createdAt: order.createdAt.toISOString() });
});

export default router;
