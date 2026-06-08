import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  sku: text("sku"),
  price: doublePrecision("price").notNull(),
  originalPrice: doublePrecision("original_price"),
  discount: integer("discount"),
  thumbnail: text("thumbnail").notNull().default(""),
  images: jsonb("images").notNull().default([]),
  videoUrl: text("video_url"),
  categoryId: integer("category_id").notNull(),
  categorySlug: text("category_slug").notNull(),
  categoryName: text("category_name").notNull(),
  brandId: integer("brand_id"),
  brandSlug: text("brand_slug").notNull().default(""),
  brandName: text("brand_name").notNull().default(""),
  inStock: boolean("in_stock").notNull().default(true),
  stockCount: integer("stock_count"),
  soldCount: integer("sold_count").notNull().default(0),
  viewCount: integer("view_count").notNull().default(0),
  rating: doublePrecision("rating").notNull().default(4.5),
  reviewCount: integer("review_count").notNull().default(0),
  tags: text("tags").array().notNull().default([]),
  isFeatured: boolean("is_featured").notNull().default(false),
  isBestSeller: boolean("is_best_seller").notNull().default(false),
  isNew: boolean("is_new").notNull().default(false),
  isOnSale: boolean("is_on_sale").notNull().default(false),
  shortDescription: text("short_description"),
  fullDescription: text("full_description"),
  attributes: jsonb("attributes").notNull().default([]),
  variants: jsonb("variants").notNull().default([]),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;
