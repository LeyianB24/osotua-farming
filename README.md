# Osotua Farming 🌿

> Premium Kenyan Agribusiness Platform — "From Our Land, To Your Table"

An integrated agribusiness platform for Kajiado County, Kenya featuring livestock management, stud breeding catalogue, e-commerce Barn store, farm visit bookings, investment inquiries, and admin management.

## Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 & custom CSS tokens
- **Database**: Neon PostgreSQL via Prisma ORM v6
- **Auth**: Auth.js v5 (JWT session strategy)
- **Payments**: M-Pesa Daraja STK Push & Stripe
- **Media**: Cloudinary
- **Emails**: Resend

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   - `DATABASE_URL` & `DIRECT_URL` (Neon PostgreSQL)
   - `NEXTAUTH_SECRET` & `NEXTAUTH_URL`
   - `MPESA_*` & `STRIPE_*`

3. Generate Prisma client & sync database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Attribution

Built by [Bezalel Technologies](https://www.bezalel.website/). All rights reserved.
