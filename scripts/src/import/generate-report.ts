import fs from "node:fs";
import path from "node:path";
import { writeCsv } from "./csv-utils.js";
import type { ImportIssue, ImportReport, ImportedTdmProduct } from "./types.js";

export interface ReportInput {
  productsCsv: string;
  specificationsCsv: string;
  imagesCsv: string;
  limit: number;
  totalRows: number;
  products: ImportedTdmProduct[];
  issues: ImportIssue[];
  duplicateSkus: string[];
  duplicateSlugs: string[];
  passed: boolean;
  outputDir: string;
}

function pct(n: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((n / total) * 10000) / 100;
}

export function generateReport(input: ReportInput): ImportReport {
  const errors = input.issues.filter((i) => i.severity === "error");
  const warnings = input.issues.filter((i) => i.severity === "warning");
  const total = input.totalRows;

  const withSeoTitle = input.products.filter((p) => p.seoTitle).length;
  const withSeoDesc = input.products.filter((p) => p.seoDescription).length;
  const withExtraImages = input.products.filter((p) => p.images.length > 1).length;
  const withSpecs = input.products.filter((p) => p.attributes.length > 0).length;
  const withThumbnail = input.products.filter((p) => p.thumbnail).length;

  const report: ImportReport = {
    generatedAt: new Date().toISOString(),
    source: {
      productsCsv: input.productsCsv,
      specificationsCsv: input.specificationsCsv,
      imagesCsv: input.imagesCsv,
      limit: input.limit,
    },
    summary: {
      totalRows: total,
      imported: input.products.length,
      errors: errors.length,
      warnings: warnings.length,
      passed: input.passed,
    },
    mapping: {
      categoryMappedPercent: input.passed ? 100 : pct(input.products.length, total),
      brandMappedPercent: input.passed ? 100 : pct(input.products.length, total),
      withThumbnailPercent: pct(withThumbnail, input.products.length),
      withSeoTitlePercent: pct(withSeoTitle, input.products.length),
      withSeoDescriptionPercent: pct(withSeoDesc, input.products.length),
      withExtraImagesPercent: pct(withExtraImages, input.products.length),
      withSpecificationsPercent: pct(withSpecs, input.products.length),
    },
    duplicates: {
      sku: input.duplicateSkus,
      slug: input.duplicateSlugs,
    },
    issues: input.issues,
  };

  fs.mkdirSync(input.outputDir, { recursive: true });

  const reportPath = path.join(input.outputDir, "import-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf-8");

  writeCsv(
    path.join(input.outputDir, "import-errors.csv"),
    ["code", "sku", "slug", "field", "message"],
    errors.map((e) => ({
      code: e.code,
      sku: e.sku,
      slug: e.slug,
      field: e.field ?? "",
      message: e.message,
    })),
  );

  writeCsv(
    path.join(input.outputDir, "import-warnings.csv"),
    ["code", "sku", "slug", "field", "message"],
    warnings.map((w) => ({
      code: w.code,
      sku: w.sku,
      slug: w.slug,
      field: w.field ?? "",
      message: w.message,
    })),
  );

  return report;
}
