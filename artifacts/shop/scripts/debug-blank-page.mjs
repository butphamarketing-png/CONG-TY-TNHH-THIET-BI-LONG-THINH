import { chromium } from "playwright";
import fs from "fs";

const targets = [
  "https://website001-dxn.pages.dev/",
  "http://localhost:3000/",
];

const report = [];

for (const url of targets) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  const failedRequests = [];

  page.on("pageerror", (e) => {
    errors.push({
      type: "pageerror",
      message: e.message,
      stack: e.stack,
    });
  });
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errors.push({ type: "console", message: msg.text() });
    }
  });
  page.on("requestfailed", (req) => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
  });

  let rootLen = -1;
  let navError = null;
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    rootLen = await page.evaluate(() => document.getElementById("root")?.innerHTML?.length ?? -1);
  } catch (e) {
    navError = e.message;
  }

  report.push({ url, rootLen, navError, errors, failedRequests });
  await browser.close();
}

const out = JSON.stringify(report, null, 2);
fs.writeFileSync("debug-blank-page-report.json", out);
console.log(out);
