import fs from "node:fs";
import { createReadStream } from "node:fs";
import csv from "csv-parser";

export async function readCsv<T extends Record<string, string>>(
  filePath: string,
): Promise<T[]> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSV not found: ${filePath}`);
  }

  const rows: T[] = [];
  return new Promise((resolve, reject) => {
    createReadStream(filePath)
      .pipe(csv())
      .on("data", (data: T) => rows.push(data))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}

export function writeCsv(
  filePath: string,
  headers: string[],
  rows: Record<string, string>[],
): void {
  const escape = (v: string) => {
    if (v.includes(",") || v.includes('"') || v.includes("\n")) {
      return `"${v.replace(/"/g, '""')}"`;
    }
    return v;
  };

  const lines = [
    headers.join(","),
    ...rows.map((row) => headers.map((h) => escape(row[h] ?? "")).join(",")),
  ];
  fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
}
