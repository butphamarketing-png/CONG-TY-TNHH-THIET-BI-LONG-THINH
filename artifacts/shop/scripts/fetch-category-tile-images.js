/**
 * Download homepage category tile images from tdm.vn
 * Run from repo: node ../../../tdm-crawler/fetch-category-tiles.js
 * Or: cd tdm-crawler && node fetch-category-tiles.js
 */
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const SHOP_ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(SHOP_ROOT, "public", "categories");
const MANIFEST = path.join(SHOP_ROOT, "src", "data", "category-tile-manifest.json");

const TDM_BASE = "https://www.tdm.vn";

const TILE_TDM_PATHS = {
  "bon-cau": "bon-cau-bet-ve-sinh",
  "bon-cau-dien-tu": "bon-cau-thong-minh",
  "nap-bon-cau": "ban-nap-bon-cau",
  "chau-lavabo": "chau-rua-lavabo",
  "voi-lavabo": "voi-lavabo",
  "voi-cam-ung": "voi-rua-cam-ung",
  "bon-tieu": "bon-tieu-nam-nu",
  "van-xa-tieu": "van-xa-tieu",
  "voi-sen": "voi-sen-cay",
  "sen-cay": "voi-sen-cay",
  "sen-am-tuong": "voi-sen-tam-am-tuong",
  "bon-tam": "bon-tam",
  "voi-bon-tam": "voi-bon-tam",
  "phu-kien-phong-tam": "phu-kien-phong-tam",
  "pheu-thoat-san": "pheu-thoat-san",
  "voi-xit-ve-sinh": "voi-xit-ve-sinh",
  "bep-dien-tu": "bep-dien-tu",
  "bep-gas": "bep-gas",
  "may-hut-mui": "may-hut-mui",
  "lo-nuong": "lo-nuong-da-nang",
  "lo-vi-song": "lo-vi-song",
  "may-rua-chen": "may-rua-chen-bat",
  "tu-lanh": "tu-lanh",
  "voi-rua-chen": "voi-bep-voi-rua-chen",
  "bon-inox": "bon-nuoc-inox",
  "bon-nhua": "bon-nuoc-nhua",
  "bon-cong-nghiep": "bon-nuoc-cong-nghiep",
  "bon-tu-hoai": "bon-tu-hoai",
  "nang-luong-mat-troi": "may-nuoc-nong-nang-luong-mat-troi",
  "may-nuoc-nong": "may-nuoc-nong",
  "may-loc-nuoc": "may-loc-nuoc",
  "chau-rua-inox": "chau-rua-inox",
  "khoa-dien-tu": "khoa-dien-tu",
  "khoa-cua-chinh": "khoa-cua-chinh",
  "khoa-cua-phong": "khoa-cua-phong",
  "khoa-bam-moc": "khoa-bam-moc",
  "phu-kien-cua": "phu-kien-cua",
  "ket-sat": "ket-sat",
  "cong-tac-o-cam": "cong-tac-o-cam",
  "den-led-chieu-sang": "den-led-chieu-sang",
  "thiet-bi-quat": "thiet-bi-quat",
  "day-cap-dien": "day-cap-dien",
  "tu-dien": "tu-dien",
};

function resolveUrl(src) {
  if (!src) return null;
  const clean = src.split("?")[0];
  if (clean.startsWith("http")) return clean;
  if (clean.startsWith("//")) return `https:${clean}`;
  if (clean.startsWith("/")) return `${TDM_BASE}${clean}`;
  return `${TDM_BASE}/${clean}`;
}

function pickBestImage(images) {
  return images
    .map((url) => {
      const u = url.toLowerCase();
      let score = 0;
      if (u.includes("logo") || u.includes("banner") || u.includes("icon")) score -= 50;
      if (u.includes("catalog")) score += 10;
      if (u.includes("category") || u.includes("danh-muc")) score += 20;
      if (u.includes("placeholder") || u.includes("dummy")) score -= 30;
      return { url, score };
    })
    .sort((a, b) => b.score - a.score)[0]?.url;
}

async function scrapeHomepageTiles() {
  const { data } = await axios.get(TDM_BASE, {
    timeout: 30000,
    headers: { "User-Agent": "Mozilla/5.0 (compatible; LongThinhBot/1.0)" },
  });
  const $ = cheerio.load(data);
  const byPath = new Map();

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") || "";
    const match = href.match(/\/([^/?#]+)\.html$/);
    if (!match) return;
    const tdmPath = match[1];
    const imgEl = $(el).find("img").first();
    const src =
      imgEl.attr("src") ||
      imgEl.attr("data-src") ||
      imgEl.attr("data-original") ||
      imgEl.attr("data-lazy");
    const url = resolveUrl(src);
    if (!url || !/\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(url)) return;
    if (!byPath.has(tdmPath)) byPath.set(tdmPath, url);
  });

  return byPath;
}

async function scrapeCategoryPageImage(tdmPath) {
  try {
    const { data } = await axios.get(`${TDM_BASE}/${tdmPath}.html`, {
      timeout: 20000,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LongThinhBot/1.0)" },
    });
    const $ = cheerio.load(data);
    const images = new Set();

    $(
      ".category-image img, .box-category img, .category-block img, .image-category img, .categogy-image img",
    ).each((_, el) => {
      const url = resolveUrl($(el).attr("src") || $(el).attr("data-src"));
      if (url) images.add(url);
    });

    const og = $('meta[property="og:image"]').attr("content");
    if (og) images.add(resolveUrl(og));

    if (images.size === 0) {
      $(".product-layout .image img, .product-thumb img, .product-grid .image img").each((_, el) => {
        const url = resolveUrl($(el).attr("src") || $(el).attr("data-src"));
        if (url) images.add(url);
      });
    }

    return images.size ? pickBestImage([...images]) : null;
  } catch {
    return null;
  }
}

async function downloadImage(url, destPath) {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
    timeout: 30000,
    headers: { "User-Agent": "Mozilla/5.0", Referer: TDM_BASE },
  });
  fs.writeFileSync(destPath, response.data);
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log("Scraping tdm.vn category tile images...");
  const homepageMap = await scrapeHomepageTiles();
  console.log(`Found ${homepageMap.size} homepage tile images`);

  const manifest = {};
  let ok = 0;
  let fail = 0;

  for (const [tileSlug, tdmPath] of Object.entries(TILE_TDM_PATHS)) {
    let imageUrl = homepageMap.get(tdmPath) ?? null;
    if (!imageUrl) imageUrl = await scrapeCategoryPageImage(tdmPath);

    if (!imageUrl) {
      console.warn(`  x ${tileSlug} (${tdmPath}) - no image`);
      fail++;
      continue;
    }

    let ext = ".jpg";
    try {
      ext = path.extname(new URL(imageUrl).pathname) || ".jpg";
    } catch {
      ext = ".jpg";
    }
    const filename = `${tileSlug}${ext}`;
    const dest = path.join(OUT_DIR, filename);

    try {
      await downloadImage(imageUrl, dest);
      manifest[tileSlug] = `/categories/${filename}`;
      console.log(`  ok ${tileSlug} -> ${filename}`);
      ok++;
    } catch (e) {
      console.warn(`  x ${tileSlug} download failed: ${e.message}`);
      fail++;
    }

    await new Promise((r) => setTimeout(r, 120));
  }

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`\nDone: ${ok} saved, ${fail} failed`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
