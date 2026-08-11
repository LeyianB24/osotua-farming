# Project Memory — Osotua Farming

## Stack
- Next.js 16.3.0 (App Router, React 19), TypeScript, Tailwind v4, Prisma 6 (PostgreSQL), NextAuth v5 beta, TanStack Query, react-hook-form + zod, framer-motion, lucide-react, shadcn (base-ui), Stripe, Resend, Cloudinary, axios.

## Domain
Livestock + farm products ecommerce with subscriptions, barn store, breeds, blog, careers, farm visits, partner farmers, investors, admin dashboard.

## Route Groups
- (marketing): about, blog, breeds, careers, contact, invest, partners, visit
- (shop): barn, cart, checkout, orders
- (dashboard): admin, dashboard
- (auth): login, register
- api: auth, blog, breeds, jobs, livestock, orders, partners, payments, products, subscriptions, upload, visits

## Audit findings (priority order)
1. CRITICAL Checkout is fake — `setTimeout` + fabricated orderRef; never calls /api/orders or /api/payments.
2. CRITICAL NO auth on any mutating API route — anon can POST/DELETE breeds, products, livestock, upload, etc.
3. CRITICAL Mass-assignment — every POST/PATCH does `prisma.create({data: body})` with raw input. zod installed but ZERO usage.
4. HIGH No admin CRUD UI — 11 read-only tables; dead links to /admin/breeds/new (404).
5. HIGH No admin user in seed.ts — admin pages unreachable.
6. HIGH /api/orders & /api/subscriptions GET leak all rows + `user: true` to anon.
7. HIGH No PATCH /api/visits/[id]; no partner approval API; no admin order status update UI.
8. HIGH Contact + Invest + NewsletterForm are all mock `setTimeout/alert` stubs.
9. MEDIUM Double Navbar/Footer rendering on root page.tsx, barn/[slug], dashboard/page.
10. MEDIUM Customer dashboard shares admin sidebar.
11. MEDIUM No loading.tsx/error.tsx/not-found.tsx anywhere; no generateMetadata on dynamic routes.
12. MEDIUM 4 empty component files: FarmStats, HeroSection, LivestockCard, OrderForm.
13. LOW prisma.ts logs queries; .env may be committed.

## Plan for 2hr enhancement
- Add zod schemas + auth guards to ALL mutating API routes (biggest safety win).
- Wire checkout to real /api/orders + /api/payments/mpesa + stripe.
- Add admin user seed + admin CRUD UI forms (breeds, products, livestock, blog).
- Add PATCH /api/visits/[id] + admin order status + partner approve UI.
- Real /api/contact + /api/newsletter; fix NewsletterForm.
- Add error.tsx + loading.tsx + not-found.tsx + generateMetadata.
- Remove duplicate Navbar/Footer from inline pages.
- Delete 4 empty component files.
- Run lint + typecheck.

## Status
- User asked to "enhance this project" with a 2-hour deadline.
- Audit complete. Starting implementation.

## Notes
- AGENTS.md warns: this Next.js version may have breaking changes; consult node_modules/next/dist/docs/ before writing Next.js-specific code.
- Avoid creating docs/README files unless asked.
- No comments in code unless asked.
