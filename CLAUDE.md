# OSOTUA FARMING — CLAUDE.md
# Master AI Coding Prompt v4.0
# Repo: github.com/LeyianB24/osotua-farming
# Last updated: August 2026
# Author: Bezalel Technologies LTD

---

## 🌿 PROJECT IDENTITY

```
Name:       Osotua Farming
Type:       Premium Kenyan Agribusiness Platform
Location:   Kajiado County, Kenya
Tagline:    "From Our Land, To Your Table"
Developer:  Tomaka Bezalel Leyian (Bezalel Technologies LTD)
Repo:       github.com/LeyianB24/osotua-farming
Branch:     master
```

---

## 🛠️ EXACT TECH STACK (from package.json + repo)

```
Runtime:         Node.js (latest LTS)
Framework:       Next.js 16.3.0 (App Router, Turbopack)
Language:        TypeScript (strict)
Styling:         Tailwind CSS v4
Components:      shadcn/ui — Base UI preset, Nova theme
Icons:           Bootstrap Icons v1.11.3 (CDN) — NO EMOJI EVER
Fonts:           Cormorant Garamond + DM Sans + Space Grotesk (Google Fonts)
Database:        Neon PostgreSQL (serverless)
ORM:             Prisma v6 (NOT v7 — url/directUrl stay in schema.prisma)
Auth:            Auth.js v5 (next-auth@beta) + @auth/prisma-adapter
Payments:        M-Pesa Daraja API + Stripe
Media:           Cloudinary
Email:           Resend
State:           React Server Components first, useState for local only
Forms:           react-hook-form + zod validation
HTTP client:     Native fetch (no axios)
Animation:       Framer Motion + CSS custom properties
Deployment:      Vercel
AI agents:       .claude/skills, .agents/skills, .windsurf/skills
```

---

## ⚠️ CRITICAL RULES (break these = broken build)

```
1.  PRISMA v6 — schema.prisma keeps url/directUrl. NO prisma.config.ts.
2.  NO EMOJI — Bootstrap Icons bi-* ONLY. Every single icon.
3.  NO "use client" on page.tsx files — data fetching is server-side.
4.  NO event handlers in Server Components — extract to separate client file.
5.  NO hardcoded colors — always use CSS variables or Tailwind tokens.
6.  NO localStorage/sessionStorage — breaks in Next.js App Router.
7.  NO axios — use native fetch() everywhere.
8.  ALWAYS wrap DB calls in try/catch with fallback return [].
9.  ALWAYS use next/image for all images.
10. ALWAYS use next/link for all internal navigation.
11. ALWAYS add bcryptjs for password hashing (NOT bcrypt).
12. ALWAYS check "use client" is at the very top of client files.
13. PowerShell users: NO backslash line continuation — single line commands.
14. Paths with parentheses like (marketing) must be quoted in PowerShell.
```

---

## 📁 EXACT FOLDER STRUCTURE

```
osotua-farming/
├── .claude/skills/          ← Claude Code skill files
├── .agents/skills/          ← Agent skill files
├── .windsurf/skills/        ← Windsurf skill files
├── prisma/
│   └── schema.prisma        ← Prisma v6 schema (url + directUrl in here)
├── public/                  ← Static assets, og-image.jpg, favicon
├── scripts/                 ← Seed scripts, utility scripts
├── src/
│   ├── app/
│   │   ├── (marketing)/     ← Homepage, breeds, barn, about, careers, blog
│   │   │   ├── page.tsx     ← Re-exports from (marketing)/page.tsx
│   │   │   ├── layout.tsx   ← Navbar + Footer wrapper
│   │   │   ├── breeds/
│   │   │   ├── barn/ (note: barn lives in shop group too)
│   │   │   ├── about/
│   │   │   ├── careers/
│   │   │   ├── blog/
│   │   │   ├── contact/
│   │   │   ├── invest/
│   │   │   ├── partners/
│   │   │   └── visit/
│   │   ├── (shop)/          ← Barn store, cart, checkout, orders
│   │   ├── (auth)/          ← Login, register (no navbar/footer)
│   │   ├── (dashboard)/     ← Admin + customer dashboards (sidebar layout)
│   │   │   ├── admin/       ← breeds, livestock, products, orders, etc.
│   │   │   └── dashboard/   ← Customer portal
│   │   └── api/             ← All API routes
│   │       ├── auth/
│   │       ├── breeds/
│   │       ├── livestock/
│   │       ├── products/
│   │       ├── orders/
│   │       ├── payments/
│   │       ├── jobs/
│   │       ├── blog/
│   │       ├── visits/
│   │       ├── partners/
│   │       ├── subscriptions/
│   │       └── upload/
│   ├── components/
│   │   ├── ui/              ← shadcn/ui primitives (button, card, input...)
│   │   ├── farm/            ← BreedCard, ProductCard, OrderForm, HeroSection
│   │   ├── shared/          ← Navbar, Footer, NewsletterForm, Logo
│   │   └── dashboard/       ← StatsCard, DataTable, AdminSidebar
│   ├── lib/
│   │   ├── prisma.ts        ← Prisma client singleton
│   │   ├── auth.ts          ← Auth.js v5 config
│   │   ├── mpesa.ts         ← M-Pesa Daraja STK Push
│   │   ├── stripe.ts        ← Stripe payment intent
│   │   ├── cloudinary.ts    ← Image upload
│   │   ├── email.ts         ← Resend email helpers
│   │   └── utils.ts         ← cn() and other utilities
│   ├── hooks/               ← Custom React hooks
│   ├── types/
│   │   └── index.ts         ← All TypeScript types
│   └── middleware.ts         ← Auth route protection
├── .env                     ← Never commit. gitignored.
├── .gitignore
├── CLAUDE.md                ← This file
├── AGENTS.md                ← Agent-specific instructions
├── MEMORY.md                ← Project memory bank
├── components.json          ← shadcn config (Base UI Nova preset)
├── next.config.ts           ← allowedDevOrigins, remotePatterns
├── prisma.config.ts         ← DO NOT CREATE (Prisma v6 uses schema only)
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## 🎨 DESIGN SYSTEM

### Brand Tokens (globals.css)
```css
:root {
  /* Core palette */
  --color-soil:       #1C1208;   /* Primary dark */
  --color-hide:       #3B2506;   /* Dark sections */
  --color-bark:       #6B3E1A;   /* Mid brown */
  --color-savanna:    #C4882A;   /* Gold accent — primary */
  --color-savanna-lt: #D99A30;   /* Gold hover */
  --color-savanna-dk: #A8721F;   /* Gold active */
  --color-grass:      #3D6B3E;   /* Green accent */
  --color-grass-lt:   #4E8A4F;   /* Green hover */
  --color-rust:       #A0431E;   /* Destructive */
  --color-cream:      #FBF7F0;   /* Page bg */
  --color-mist:       #F5EFE4;   /* Section bg */
  --color-parchment:  #EDE5D8;   /* Borders */
  --color-fog:        #D4C9B8;   /* Dividers */

  /* Glass system */
  --glass-light:  rgba(255,255,255,0.08);
  --glass-gold:   rgba(196,136,42,0.12);
  --glass-green:  rgba(61,107,62,0.15);
  --glass-dark:   rgba(28,18,8,0.65);
  --glass-blur:   blur(20px) saturate(180%);

  /* Motion */
  --ease-spring: cubic-bezier(0.34,1.56,0.64,1);
  --ease-smooth: cubic-bezier(0.16,1,0.3,1);
  --dur-fast:    150ms;
  --dur-base:    250ms;
  --dur-reveal:  700ms;
}
```

### Typography
```
Display  → Cormorant Garamond, 300 weight, italic for accents
Body     → DM Sans, 300-500 weight
Labels   → Space Grotesk, 500 weight, tracked uppercase
```

### Glassmorphism Classes
```css
/* Apply on dark/photo backgrounds ONLY — never on cream */
.glass       { bg: rgba(255,255,255,0.08); backdrop-filter: blur(20px); border: rgba(255,255,255,0.12) }
.glass-gold  { bg: rgba(196,136,42,0.12);  backdrop-filter: blur(24px); border: rgba(196,136,42,0.25) }
.glass-green { bg: rgba(61,107,62,0.15);   backdrop-filter: blur(20px); border: rgba(61,107,62,0.30) }
.glass-dark  { bg: rgba(28,18,8,0.65);     backdrop-filter: blur(32px); border: rgba(196,136,42,0.20) }
.glass-nav   { bg: rgba(28,18,8,0.72);     backdrop-filter: blur(40px); border-bottom: rgba(196,136,42,0.15) }
```

### Icons — Bootstrap Icons ONLY
```html
<!-- Load in layout.tsx head or globals.css -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"/>

<!-- Usage -->
<i className="bi bi-arrow-right" />
<i className="bi bi-geo-alt-fill text-[#C4882A] text-2xl" />
<i className="bi bi-shield-check" aria-label="Verified" />

<!-- Icon map for Osotua Farming -->
Navbar:    bi-list, bi-x-lg, bi-whatsapp, bi-search
Hero:      bi-chevron-down, bi-play-circle, bi-geo-alt-fill
Livestock: bi-shield-check, bi-award, bi-graph-up, bi-people-fill
Breeds:    bi-heart-pulse, bi-droplet-fill, bi-scissors, bi-flower1
Barn:      bi-bag-check, bi-cart3, bi-box-seam, bi-basket3, bi-truck
Trust:     bi-heart-pulse, bi-tree, bi-award, bi-patch-check-fill
Involved:  bi-briefcase, bi-graph-up-arrow, bi-people, bi-mortarboard, bi-building, bi-calendar-check
Contact:   bi-telephone-fill, bi-envelope-fill, bi-geo-alt-fill, bi-clock
Social:    bi-instagram, bi-facebook, bi-tiktok, bi-youtube, bi-twitter-x
Admin:     bi-speedometer2, bi-table, bi-box-seam, bi-cart3, bi-people, bi-calendar3, bi-pencil-square
```

---

## 🗄️ DATABASE SCHEMA (Prisma v6)

```prisma
// prisma/schema.prisma — Prisma v6
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")      // pooled connection (Neon)
  directUrl = env("DIRECT_URL")        // direct connection for migrations
}

// Models: User, Account, Session, Species, Breed, Livestock,
//         ProductCategory, Product, Order, OrderItem,
//         Subscription, Job, JobApplication, Post,
//         FarmVisit, PartnerFarmer
//
// User model MUST include: password String?
// (added manually — not in original shadcn scaffold)
```

### Prisma Client Singleton
```typescript
// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client"
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ log: ["query"] })
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
```

---

## 🔐 ENVIRONMENT VARIABLES (.env)

```env
# Database — Neon PostgreSQL
DATABASE_URL="postgresql://neondb_owner:PASSWORD@HOST-pooler.REGION.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
DIRECT_URL="postgresql://neondb_owner:PASSWORD@HOST.REGION.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Auth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3001"    # note: often port 3001 (3000 in use)

# Cloudinary
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""

# M-Pesa Daraja
MPESA_CONSUMER_KEY=""
MPESA_CONSUMER_SECRET=""
MPESA_SHORTCODE=""
MPESA_PASSKEY=""
MPESA_ENV="sandbox"   # change to "production" when live

# Resend
RESEND_API_KEY=""
```

---

## 🧩 COMPONENT PATTERNS

### Server Component (default — data fetching)
```tsx
// src/app/(marketing)/breeds/page.tsx
import { prisma } from "@/lib/prisma"
import BreedCard from "@/components/farm/BreedCard"

export const metadata = { title: "Our Breeds — Osotua Farming" }

async function getBreeds() {
  try {
    return await prisma.breed.findMany({
      include: { species: true },
      orderBy: { name: "asc" },
    })
  } catch {
    return []
  }
}

export default async function BreedsPage() {
  const breeds = await getBreeds()
  return ( ... )
}
```

### Client Component (interactions only)
```tsx
"use client"   // MUST be first line, no comments before it

import { useState } from "react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  // ... form logic
}
```

### API Route
```typescript
// src/app/api/breeds/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const breeds = await prisma.breed.findMany({ include: { species: true } })
    return NextResponse.json(breeds)
  } catch {
    return NextResponse.json({ error: "Failed to fetch breeds" }, { status: 500 })
  }
}
```

### Layout with Navbar + Footer
```tsx
// src/app/(marketing)/layout.tsx
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

---

## ⚡ ANIMATIONS

### CSS (globals.css)
```css
[data-reveal] {
  opacity: 0;
  transform: translateY(32px) scale(0.98);
  filter: blur(4px);
  transition: opacity 700ms cubic-bezier(0.16,1,0.3,1),
              transform 700ms cubic-bezier(0.16,1,0.3,1),
              filter 700ms cubic-bezier(0.16,1,0.3,1);
}
[data-reveal].visible { opacity:1; transform:translateY(0) scale(1); filter:blur(0); }
[data-reveal][data-delay="1"] { transition-delay: 80ms; }
[data-reveal][data-delay="2"] { transition-delay: 160ms; }
[data-reveal][data-delay="3"] { transition-delay: 240ms; }
[data-reveal][data-delay="4"] { transition-delay: 320ms; }
[data-reveal][data-delay="5"] { transition-delay: 400ms; }
[data-reveal][data-delay="6"] { transition-delay: 480ms; }

@keyframes tagFloat {
  0%,100% { transform: translateY(0); opacity: 0.5; }
  50%      { transform: translateY(-5px); opacity: 0.9; }
}
@keyframes goldShimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes terrainBreathe {
  0%,100% { opacity: 0.7; }
  50%      { opacity: 1; }
}
```

### JavaScript (layout.tsx inline script)
```javascript
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible")
      observer.unobserve(e.target)
    }
  }),
  { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
)
document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el))
```

---

## 🏗️ PAGE SECTIONS (homepage order)

```
1. Fixed glass navbar      → glass-nav, blur strengthens on scroll
2. Full-viewport hero      → gradient-earth bg, floating glass stat cards,
                             floating breed tags, breathing terrain SVG
3. Livestock counters      → 4-col strip, count-up animation, bi-* icons
4. What We Raise           → cream bg, 4 category tiles + featured BreedCards
5. Terrain SVG divider     → signature breathing element between sections
6. The Barn Store          → dark #1C1208 bg, glass product tiles, photo strip
7. How It Works            → mist bg, 4-step process with left border accent
8. Why Osotua              → grass gradient panel + value props
9. Get Involved            → hide bg, 6 glass cards, bi-* icons
10. Brand quote            → cream bg, large italic serif, gold rule lines
11. Newsletter             → savanna gold bg, form — uses NewsletterForm client component
12. Footer                 → soil dark bg, 4-column, social bi-* icons
```

---

## 🚫 KNOWN ISSUES & FIXES

```
Issue: "Event handlers cannot be passed to Client Component props"
Fix:   Extract any onClick/onSubmit into a separate "use client" component

Issue: Port 3000 in use
Fix:   npm run dev uses 3001 automatically. Update NEXTAUTH_URL accordingly.

Issue: Prisma schema validation error (url property not supported)
Fix:   DO NOT upgrade to Prisma v7. Stay on v6. Run: npm install prisma@6 @prisma/client@6

Issue: PowerShell rejects paths with parentheses like (marketing)
Fix:   Wrap paths in quotes or use $files array pattern in PowerShell

Issue: images.domains deprecated
Fix:   Use images.remotePatterns in next.config.ts instead

Issue: Cross-origin blocked warnings
Fix:   Add allowedDevOrigins: ['192.168.100.18'] to next.config.ts

Issue: "use client" not at top of file
Fix:   "use client" must be the ABSOLUTE FIRST LINE — no imports, no comments above it

Issue: bcrypt vs bcryptjs
Fix:   Always use bcryptjs (pure JS, no native bindings needed on Windows)
```

---

## 📋 COMMANDS

```powershell
# Development
npm run dev                          # starts on :3001 if :3000 is busy

# Database
npx prisma generate                  # regenerate client after schema changes
npx prisma db push                   # push schema to Neon (no migrations)
npx prisma studio                    # open visual DB browser

# shadcn components
npx shadcn@latest add button         # add a single component
npx shadcn@latest add card input     # add multiple at once

# Install dependencies
npm install bcryptjs @types/bcryptjs
npm install framer-motion
npm install @tanstack/react-query
npm install resend stripe

# Type check
npx tsc --noEmit

# Lint
npx eslint src --ext .ts,.tsx
```

---

## 🌐 NEXT.CONFIG.TS (current)

```typescript
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.100.18"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.neon.tech" },
    ],
  },
}

export default nextConfig
```

---

## 🎯 WHAT TO BUILD NEXT (priority order)

```
Priority 1 — Seed data (npx prisma db seed)
  - 4 Species: Cattle, Goats, Sheep, Poultry
  - 8 Breeds: Boran, Sahiwal, Bonsmara, Brahman, Boer, Galla, Dorper, Simmental
  - 6 ProductCategories + 12 Products
  - 1 Admin user (admin@osotuafarming.co.ke)

Priority 2 — Navbar glassmorphism (scroll-aware blur)
Priority 3 — Hero section (full glassmorphism + parallax)
Priority 4 — Breeds catalogue redesign (Bootstrap Icons, glass cards)
Priority 5 — Admin dashboard (shadcn data tables, stat cards)
Priority 6 — Barn store e-commerce (cart, checkout, M-Pesa)
Priority 7 — Auth (protected admin routes via middleware.ts)
Priority 8 — Blog CMS (rich text editor, publish flow)
Priority 9 — Farm visit booking confirmation flow
Priority 10 — Vercel deployment + domain osotuafarming.co.ke
```

---

## ✅ QUALITY CHECKLIST (before every commit)

```
[ ] No emoji anywhere — only Bootstrap Icons bi-*
[ ] No hardcoded hex colors — CSS variables or Tailwind tokens
[ ] No event handlers in server components
[ ] All async DB calls wrapped in try/catch with fallback
[ ] All images use next/image
[ ] All internal links use next/link
[ ] "use client" is absolute first line in client files
[ ] Mobile responsive (test at 375px, 768px, 1280px)
[ ] All interactive elements have focus-visible styles
[ ] All icon-only buttons have aria-label
[ ] Loading and error states for all async data
[ ] Run: npx tsc --noEmit (zero TypeScript errors)
[ ] Run: npx eslint src (zero lint errors)
[ ] .env is in .gitignore (NEVER commit secrets)
```

---

## 💡 AI AGENT INSTRUCTIONS

When working on this codebase as an AI agent:

1. **Read this file first** before writing any code
2. **Check the file exists** before creating — never duplicate
3. **Never create `prisma.config.ts`** — Prisma v6 doesn't need it
4. **Always check imports** — use `@/` alias, never relative `../../`
5. **Server vs Client** — default to Server Component, only add "use client" when strictly needed
6. **Error handling** — every API route and DB call must have try/catch
7. **Consistency** — match existing code style, naming conventions, and file structure
8. **Brand voice** — copy should be warm, premium, Kenyan, and authentic — never generic
9. **Performance** — lazy load images, avoid client-side data fetching when server-side works
10. **Accessibility** — every component must be keyboard navigable and screen reader friendly
