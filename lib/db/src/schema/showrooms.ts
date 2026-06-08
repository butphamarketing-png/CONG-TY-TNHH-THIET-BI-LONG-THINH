import { pgTable, text, serial, doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const showroomsTable = pgTable("showrooms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  lat: doublePrecision("lat"),
  lng: doublePrecision("lng"),
  openHours: text("open_hours"),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertShowroomSchema = createInsertSchema(showroomsTable).omit({ id: true, createdAt: true });
export type InsertShowroom = z.infer<typeof insertShowroomSchema>;
export type Showroom = typeof showroomsTable.$inferSelect;
