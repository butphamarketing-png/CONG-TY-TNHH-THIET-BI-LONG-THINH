/**
 * Infer brand from product name using brand-map keys (longest match first).
 */
export function loadBrandMap(brandMapPath, fs) {
  const raw = JSON.parse(fs.readFileSync(brandMapPath, "utf8"));
  delete raw._comment;
  return raw;
}

export function inferBrandFromName(name, brandMap) {
  if (!name) return null;
  const upper = name.toUpperCase();
  const keys = Object.keys(brandMap)
    .filter((k) => k !== "_comment")
    .sort((a, b) => b.length - a.length);

  for (const key of keys) {
    if (upper.includes(key.toUpperCase())) {
      return brandMap[key];
    }
  }
  return null;
}

export function resolveBrand(rowBrand, productName, brandMap) {
  const csvBrand = (rowBrand ?? "").trim();
  if (csvBrand && brandMap[csvBrand]) {
    return brandMap[csvBrand];
  }
  if (csvBrand) {
    const inferred = inferBrandFromName(csvBrand, brandMap);
    if (inferred) return inferred;
  }
  return inferBrandFromName(productName, brandMap);
}

export function needsBrandFix(product) {
  return (
    !product.brandName ||
    product.brandName === "UNKNOWN" ||
    product.brandSlug === "unknown" ||
    !product.brandSlug
  );
}
