# TDM Shop — Website Thương Mại Điện Tử

Hệ thống bán lẻ điện thoại, laptop, máy tính bảng và phụ kiện chính hãng của **CÔNG TY TNHH THIẾT BỊ LONG THỊNH** — 504 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q.12, TP. Hồ Chí Minh.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5 (artifacts/api-server, port 5000)
- Frontend: React + Vite (artifacts/shop)
- DB: PostgreSQL + Drizzle ORM (lib/db)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec at lib/api-spec)
- State: Zustand (cart), React Query (server state)
- Router: Wouter
- UI: shadcn/ui + Tailwind CSS

## Where things live

- `artifacts/shop/src/pages/` — all page components
- `artifacts/shop/src/components/layout.tsx` — header, footer, floating buttons, nav
- `artifacts/shop/src/components/product-card.tsx` — product card component
- `artifacts/shop/src/hooks/use-cart.ts` — Zustand cart store
- `artifacts/api-server/src/routes/` — all API routes
- `lib/db/src/schema/index.ts` — Drizzle DB schema (source of truth)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contract)

## Architecture decisions

- **Contract-first API**: OpenAPI spec → Orval codegen → React Query hooks + Zod schemas in `lib/api-client-react` and `lib/api-zod`
- **PostgreSQL JSONB**: `attributes` and `images` columns use JSONB with `::jsonb` cast in seed SQL; `tags` uses text[] with `ARRAY['val1']` syntax
- **API routes**: Mounted at `/api` in `app.ts`; route files do NOT include `/api` prefix
- **BASE_URL**: Frontend uses `import.meta.env.BASE_URL` for wouter Router base path
- **Cart**: Zustand store persisted to localStorage via `use-cart.ts`

## Product

Pages built:
- **Trang chủ** (`/`) — banner slider, Flash Sale countdown, policy bar, category grid, tabbed products, brands, news
- **Danh mục** (`/danh-muc/:slug`) — filter sidebar (price presets, brand checkboxes), sort, grid/list toggle, pagination
- **Chi tiết sản phẩm** (`/san-pham/:slug`) — image gallery, discount badge, variant selector, Mua ngay + Thêm giỏ, installment payment, store pickup, tabs (description/specs/reviews), promotions sidebar, related products
- **Tìm kiếm** (`/tim-kiem`) — search results with pagination
- **Giỏ hàng** (`/gio-hang`) — cart items, coupon codes (TDMSHOP10, LONGTHINHVIP, FREESHIP, GIAMGIA15), order summary
- **Thanh toán** (`/dat-hang`) — shipping form, payment method selection (COD/bank/MoMo)
- **Xác nhận đơn hàng** (`/dat-hang/xac-nhan`) — order success with code
- **Tra cứu đơn hàng** (`/tra-cuu-don-hang`) — order status lookup
- **Tin tức** (`/tin-tuc`, `/tin-tuc/:slug`) — news list + article detail with related
- **Yêu thích** (`/yeu-thich`) — wishlist (localStorage-based)

## User preferences

- Vietnamese language throughout
- Company: CÔNG TY TNHH THIẾT BỊ LONG THỊNH
- Address: 504 Nguyễn Văn Quá, P. Đông Hưng Thuận, Q.12, TP. Hồ Chí Minh
- Hotline: 1900.1234 (mua hàng), 1900.1235 (bảo hành)

## Gotchas

- PostgreSQL `text[]` arrays must use `ARRAY['val1','val2']` syntax in SQL (NOT JSON stringify)
- JSONB columns need `::jsonb` cast in raw SQL seeds
- `product.discount` = percentage (e.g. 11 = 11%); `product.price` = current price; `product.originalPrice` = pre-discount price
- **Never use `console.log` in server code** — use `req.log` (in route handlers) or the `logger` singleton
- Run `pnpm --filter @workspace/api-spec run codegen` after any OpenAPI spec changes

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
