import type { BrandMapEntry, CrawlerProductRow, ImportIssue, ImportedTdmProduct } from "./types.js";
import { RESERVED_SLUGS } from "./shop-catalog.js";

export interface ValidationContext {
  categoryMap: Record<string, string>;
  brandMap: Record<string, BrandMapEntry>;
  validCategorySlugs: Set<string>;
  validBrandSlugs: Set<string>;
  existingCategorySlugs: Set<string>;
  existingBrandSlugs: Set<string>;
}

export interface ValidationResult {
  products: ImportedTdmProduct[];
  issues: ImportIssue[];
  duplicateSkus: string[];
  duplicateSlugs: string[];
}

function issue(
  severity: ImportIssue["severity"],
  code: string,
  row: CrawlerProductRow,
  message: string,
  field?: string,
): ImportIssue {
  return {
    severity,
    code,
    sku: row.sku ?? "",
    slug: row.slug ?? "",
    message,
    field,
  };
}

export function validateAndMapProducts(
  rows: CrawlerProductRow[],
  mappedProducts: ImportedTdmProduct[],
  ctx: ValidationContext,
): ValidationResult {
  const issues: ImportIssue[] = [];
  const skuCounts = new Map<string, number>();
  const slugCounts = new Map<string, number>();

  for (const row of rows) {
    const sku = (row.sku ?? "").trim();
    const slug = (row.slug ?? "").trim();
    if (sku) skuCounts.set(sku, (skuCounts.get(sku) ?? 0) + 1);
    if (slug) slugCounts.set(slug, (slugCounts.get(slug) ?? 0) + 1);
  }

  const duplicateSkus = [...skuCounts.entries()]
    .filter(([, c]) => c > 1)
    .map(([s]) => s);
  const duplicateSlugs = [...slugCounts.entries()]
    .filter(([, c]) => c > 1)
    .map(([s]) => s);

  for (const sku of duplicateSkus) {
    const row = rows.find((r) => r.sku === sku)!;
    issues.push(issue("error", "DUPLICATE_SKU", row, `Duplicate SKU: ${sku}`, "sku"));
  }

  for (const slug of duplicateSlugs) {
    const row = rows.find((r) => r.slug === slug)!;
    issues.push(issue("error", "DUPLICATE_SLUG", row, `Duplicate slug: ${slug}`, "slug"));
  }

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const product = mappedProducts[i];
    const categoryKey = (row.category ?? "").trim();
    const brandKey = (row.brand ?? "").trim();

    if (!ctx.categoryMap[categoryKey] && categoryKey !== "") {
      issues.push(
        issue(
          "error",
          "CATEGORY_NOT_MAPPED",
          row,
          `Category not mapped: "${categoryKey}"`,
          "category",
        ),
      );
    } else if (categoryKey === "" && !ctx.categoryMap[""]) {
      issues.push(
        issue("error", "CATEGORY_NOT_MAPPED", row, "Empty category with no fallback", "category"),
      );
    } else {
      const slug = ctx.categoryMap[categoryKey];
      if (slug && !ctx.validCategorySlugs.has(slug)) {
        issues.push(
          issue(
            "error",
            "CATEGORY_SLUG_INVALID",
            row,
            `Mapped category slug not in tree: ${slug}`,
            "category",
          ),
        );
      }
    }

    if (!ctx.brandMap[brandKey]) {
      issues.push(
        issue(
          "error",
          "BRAND_NOT_MAPPED",
          row,
          `Brand not mapped: "${brandKey}"`,
          "brand",
        ),
      );
    } else if (!ctx.validBrandSlugs.has(ctx.brandMap[brandKey].brandSlug)) {
      issues.push(
        issue(
          "error",
          "BRAND_SLUG_INVALID",
          row,
          `Mapped brand slug not in tree: ${ctx.brandMap[brandKey].brandSlug}`,
          "brand",
        ),
      );
    }

    if (!product.thumbnail) {
      issues.push(
        issue("error", "MISSING_THUMBNAIL", row, "Missing thumbnail image", "thumbnail"),
      );
    }

    if (product.slug && RESERVED_SLUGS.has(product.slug)) {
      issues.push(
        issue(
          "error",
          "RESERVED_SLUG",
          row,
          `Product slug conflicts with reserved route: ${product.slug}`,
          "slug",
        ),
      );
    }

    if (product.slug && ctx.existingCategorySlugs.has(product.slug)) {
      issues.push(
        issue(
          "error",
          "SLUG_COLLISION_CATEGORY",
          row,
          `Product slug collides with category: ${product.slug}`,
          "slug",
        ),
      );
    }

    if (product.slug && ctx.existingBrandSlugs.has(product.slug)) {
      issues.push(
        issue(
          "error",
          "SLUG_COLLISION_BRAND",
          row,
          `Product slug collides with brand: ${product.slug}`,
          "slug",
        ),
      );
    }

    if (!product.seoTitle) {
      issues.push(
        issue("warning", "MISSING_SEO_TITLE", row, "Missing SEO title", "seoTitle"),
      );
    }

    if (!product.seoDescription) {
      issues.push(
        issue(
          "warning",
          "MISSING_SEO_DESCRIPTION",
          row,
          "Missing SEO description",
          "seoDescription",
        ),
      );
    }

    if (product.images.length <= 1) {
      issues.push(
        issue(
          "warning",
          "MISSING_EXTRA_IMAGES",
          row,
          "Only thumbnail present (no additional images)",
          "images",
        ),
      );
    }

    if (product.attributes.length === 0) {
      issues.push(
        issue(
          "warning",
          "MISSING_SPECIFICATIONS",
          row,
          "No specifications imported for SKU",
          "attributes",
        ),
      );
    }
  }

  const errorSkus = new Set(
    issues.filter((i) => i.severity === "error").map((i) => i.sku),
  );

  const validProducts = mappedProducts.filter((p) => !errorSkus.has(p.sku));

  return {
    products: validProducts,
    issues,
    duplicateSkus,
    duplicateSlugs,
  };
}

export function validationPassed(issues: ImportIssue[], imported: number): boolean {
  const errors = issues.filter((i) => i.severity === "error");
  if (errors.length > 0) return false;
  if (imported === 0) return false;
  return true;
}
