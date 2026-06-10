/**
 * Download homepage category tile images from tdm.vn (lozad data-src)
 * Requires: run from tdm-crawler folder OR npm install axios cheerio in shop
 */
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const SHOP_ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(SHOP_ROOT, "public", "categories");
const MANIFEST = path.join(SHOP_ROOT, "src", "data", "category-tile-manifest.json");
const TDM_BASE = "https://www.tdm.vn";

const TDM_CAT_TO_TILE = {
  "bon-cau": "bon-cau",
  "bon-cau-dien-tu": "bon-cau-dien-tu",
  "nap-bon-cau": "nap-bon-cau",
  "chau-lavabo": "chau-lavabo",
  "voi-chau": "voi-lavabo",
  "voi-cam-ung": "voi-cam-ung",
  "bon-tieu": "bon-tieu",
  "van-xa-tieu": "van-xa-tieu",
  "voi-sen": "voi-sen",
  "sen-cay": "sen-cay",
  "sen-am-tuong": "sen-am-tuong",
  "bon-tam": "bon-tam",
  "voi-bon-tam": "voi-bon-tam",
  "phu-kien": "phu-kien-phong-tam",
  "pheu-thoat-san": "pheu-thoat-san",
  "voi-xit": "voi-xit-ve-sinh",
  "bep-tu": "bep-dien-tu",
  "bep-gas": "bep-gas",
  "may-hut-mau": "may-hut-mui",
  "may-hut-mui": "may-hut-mui",
  "lo-nuong": "lo-nuong",
  "lo-vi-song": "lo-vi-song",
  "may-rua-chen": "may-rua-chen",
  "tu-lanh": "tu-lanh",
  "voi-bep": "voi-rua-chen",
  "bon-inox": "bon-inox",
  "bon-nhua": "bon-nhua",
  "bon-nuoc-cong-nghiep": "bon-cong-nghiep",
  "bon-tu-hoai": "bon-tu-hoai",
  "may-nuoc-nong-nang-luong-mat-troi": "nang-luong-mat-troi",
  "may-nuoc-nong": "may-nuoc-nong",
  "may-loc-nuoc": "may-loc-nuoc",
  "chau-rua-chen": "chau-rua-inox",
  "khoa-dien-tu": "khoa-dien-tu",
  "khoa-cua-chinh": "khoa-cua-chinh",
  "khoa-cua-phong": "khoa-cua-phong",
  "khoa-cua-bam": "khoa-bam-moc",
  "phu-kien-cua": "phu-kien-cua",
  "ket-sat": "ket-sat",
  "cong-tac-o-cam": "cong-tac-o-cam",
  "den-led": "den-led-chieu-sang",
  "den-led-chieu-sang": "den-led-chieu-sang",
  "quat-dien": "thiet-bi-quat",
  "thiet-bi-quat": "thiet-bi-quat",
  "day-cap-dien": "day-cap-dien",
  "tu-dien": "tu-dien",
};

function tileFromDataSrc(dataSrc) {
  const m = dataSrc.match(/\/cat-([^-]+(?:-[^-]+)*?)(?:-\d+x\d+)?\.png/i);
  if (!m) return null;
  return TDM_CAT_TO_TILE[m[1]] ?? m[1];
}

async function scrapeHomepageLozadTiles() {
  const { data } = await axios.get(TDM_BASE, {
    timeout: 30000,
    headers: { "User-Agent": "Mozilla/5.0 (compatible; LongThinhBot/1.0)" },
  });
  const $ = cheerio.load(data);
  const byTile = new Map();

  $("img.lozad[data-src], img[data-src*='cat-']").each((_, el) => {
    const dataSrc = $(el).attr("data-src") || "";
    if (!dataSrc.includes("/cat-")) return;
    const tileSlug = tileFromDataSrc(dataSrc);
    if (tileSlug && !byTile.has(tileSlug)) {
      byTile.set(tileSlug, dataSrc.startsWith("http") ? dataSrc : `${TDM_BASE}/${dataSrc}`);
    }
  });

  return byTile;
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

  console.log("Scraping tdm.vn homepage lozad category tiles...");
  const tileMap = await scrapeHomepageLozadTiles();
  console.log(`Found ${tileMap.size} category tile images`);

  const manifest = {};
  let ok = 0;

  for (const [tileSlug, imageUrl] of tileMap.entries()) {
    const filename = `${tileSlug}.png`;
    const dest = path.join(OUT_DIR, filename);
    try {
      await downloadImage(imageUrl, dest);
      manifest[tileSlug] = `/categories/${filename}`;
      console.log(`  ok ${tileSlug}`);
      ok++;
    } catch (e) {
      console.warn(`  x ${tileSlug}: ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 80));
  }

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`\nDone: ${ok}/${tileMap.size} saved → ${MANIFEST}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
