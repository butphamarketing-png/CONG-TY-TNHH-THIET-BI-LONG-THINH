# Blank Page Root Cause Report

**Site:** https://website001-dxn.pages.dev  
**Date:** 2026-06-09  
**Symptom:** Completely blank white page, deploy succeeds, `#root` empty

---

## Exact Runtime Error

```
Minified React error #130
Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.
```

**Decoded:** React tried to render `<Icon />` where `Icon` was already a **React element object**, not a component function/class.

**Captured via:** Playwright headless browser on production and local preview (before fix).

| URL | root innerHTML length | Error |
|-----|----------------------|-------|
| https://website001-dxn.pages.dev/ | 0 | React #130 |
| http://localhost:3000/ (before fix) | 0 | React #130 |
| http://localhost:4173/ (after fix) | 96,922 | none |

---

## Root Cause

**File:** `artifacts/shop/src/components/home/CategoryHeroSection.tsx`  
**Line:** 25 and 42

```tsx
// Line 25 — getCategoryIcon() returns JSX element, not a component type
const Icon = getCategoryIcon(slug);

// Line 42 — invalid: treats element object as component
{Icon && <Icon className="w-16 h-16" />}
```

**File:** `artifacts/shop/src/lib/category-icons.tsx`  
**Lines:** 6–16 (before fix)

`getCategoryIcon()` returned pre-built JSX like `<Bath className="w-4 h-4" />`.

When a category tile had **no product thumbnail**, `CategoryImageCard` hit the fallback branch and executed `<Icon />` — crashing the entire React tree → blank page.

**Trigger path:** Homepage → `Home` → `CategoryHeroSection` (Thiết bị vệ sinh section) → `CategoryImageCard` fallback render.

---

## Fix Applied

### 1. `category-icons.tsx`
Added `getCategoryIconComponent()` returning Lucide **component types** (`Bath`, `Flame`, etc.).  
Kept `getCategoryIcon()` for existing inline usages.

### 2. `CategoryHeroSection.tsx`
```diff
- import { getCategoryIcon } from "@/lib/category-icons";
+ import { getCategoryIconComponent } from "@/lib/category-icons";

- const Icon = getCategoryIcon(slug);
+ const Icon = getCategoryIconComponent(slug);
```

Line 42 `<Icon className="w-16 h-16" />` is now valid.

---

## Verification Checklist

### Homepage bundle imports — PASS
Searched entire project for:
- `PRODUCTS_SEED` — not found in source
- `products.seed` — only deprecated empty `products.seed.ts`
- `import { PRODUCTS` — not found
- `PRODUCTS.map(` — only local state in `promotion.tsx`, not catalog import

`products.seed.ts` contains only `export {}`.

### Production JS bundle — PASS
- Size: 571 KB
- Does NOT contain `products.imported` or `PRODUCTS_SEED`

### Network / data files — PASS (production)
| File | HTTP Status |
|------|-------------|
| `/data/search-index.json` | 200 |
| `/data/slug-registry.json` | 200 |
| `/data/products-index.json` | 200 |
| `/data/brands.imported.json` | 200 |
| `/data/products-listing-bon-cau.json` | 200 |

### `dist/public/data/` after build — PASS
- `search-index.json` ✓
- `slug-registry.json` ✓
- `products-index.json` ✓
- `brands.imported.json` ✓
- 18 `products-listing-*.json` chunks ✓
- 675 `products/detail/*.json` files ✓
- No file > 25 MB ✓

### `catalog-store.ts` fetch paths — PASS
All paths use `DATA_BASE = "/data"`:
- `products-index.json`
- `search-index.json`
- `slug-registry.json`
- `brands.imported.json`
- `products-listing-{category}.json` (via index)
- `products/detail/{slug}.json` (via slug registry)

Paths match files in `dist/public/data/`.

### Local production preview — PASS (after fix)
```bash
pnpm --filter @workspace/shop build
pnpm --filter @workspace/shop serve   # or: vite preview --port 4173
```
- root HTML length: 96,922 chars
- Page text includes "Thiết bị vệ sinh"
- Zero JavaScript errors

---

## Not the Cause

| Ruled out | Evidence |
|-----------|----------|
| Missing JSON data files | All return HTTP 200 on production |
| `products.imported.json` in bundle | Not present in JS bundle |
| `PRODUCTS` static import | No imports found |
| Cloudflare asset size limit | Build passes, all assets < 25 MB |
| Fetch path mismatch | `/data/*` paths match dist layout |

---

## Deploy Next Step

Push fix commit to trigger Cloudflare redeploy. New bundle hash: `index-LKgEoGyd.js`.

---

## Secondary Issues Found (not blank-page cause)

These do NOT cause the white screen but should be fixed next:

1. `catalog-slug-page.tsx` — `resolveCatalogSlug()` is async but called without await
2. `App.tsx` — `/:slug` route registered before `/showroom`, `/tim-kiem`, etc.

---

*Report generated from Playwright runtime capture — not guessed.*
