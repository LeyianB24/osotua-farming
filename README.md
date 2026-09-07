# Osotua Farming — Pastoral Smart Farm Platform

> **"From Our Land, To Your Table"**  
> An integrated, ultra-premium agribusiness and direct-to-consumer e-commerce platform built for **Osotua Farming** in Kajiado County, Kenya.

---

## 🌾 Overview

Osotua Farming is a modern agribusiness platform designed to bridge Kenyan smallholder pastoralists and consumers. It powers:
- **Pedigree Livestock Catalog**: Verified Boran cattle, Sahiwal dairy, Boer goats, and Dorper sheep with Kenya Stud Book genetics and live stock tracking.
- **The Barn Market**: Farm-to-table seasonal produce, cold-chain grass-fed meats, raw comb honey, and pasture eggs.
- **Agritourism & Farm Tours**: Real-time tour reservation and ranch experience scheduling.
- **Farmer Outgrower Network**: Guaranteed offtake schemes and agronomy support for 40+ partner cooperatives.
- **Enterprise Operations & Portal**: Complete order fulfillment, inventory management, user portal, and RBAC admin headquarters.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) with React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Vanilla CSS design system tokens + Tailwind CSS v4 + Glassmorphism
- **Database**: PostgreSQL (Neon Serverless) via [Prisma ORM v6](https://www.prisma.io/)
- **Authentication**: [Auth.js / NextAuth v5](https://authjs.dev/) with JWT session strategy & Edge middleware
- **Payments**: Safaricom M-Pesa Daraja STK Push & Stripe Checkout
- **Media & Assets**: Cloudinary Media API + Next.js Image Optimization
- **Communications**: Resend Email API + WhatsApp Business integration
- **Deployment**: Vercel Serverless Platform (`fra1` Frankfurt region)

---

## ⚙️ Environment Variables Reference

Copy `.env.example` to `.env` and provide your development credentials:

```bash
cp .env.example .env
```

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `DATABASE_URL` | Pooled Neon PostgreSQL connection URL | `postgresql://user:pass@ep-xyz-pooler.neon.tech/osotua` |
| `DIRECT_URL` | Direct Neon PostgreSQL connection URL | `postgresql://user:pass@ep-xyz.neon.tech/osotua` |
| `NEXTAUTH_SECRET` | 32-character random string for JWT signing | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Base application URL | `http://localhost:3000` (Dev) / `https://osotuafarming.co.ke` (Prod) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name | `osotua-farm` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | `1234567890` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | `secret` |
| `STRIPE_SECRET_KEY` | Stripe Secret API Key | `sk_test_...` / `sk_live_...` |
| `STRIPE_PUBLISHABLE_KEY`| Stripe Publishable Key | `pk_test_...` / `pk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook Secret | `whsec_...` |
| `MPESA_CONSUMER_KEY` | Safaricom Daraja Consumer Key | Key from Safaricom portal |
| `MPESA_CONSUMER_SECRET` | Safaricom Daraja Consumer Secret | Secret from Safaricom portal |
| `MPESA_SHORTCODE` | Business ShortCode / Paybill / Till | `174379` (Sandbox) |
| `MPESA_PASSKEY` | Daraja Online Lipa Na M-Pesa Passkey | Passkey from Safaricom portal |
| `MPESA_ENV` | M-Pesa Environment Mode | `sandbox` or `production` |
| `RESEND_API_KEY` | Resend Transactional Email API Key | `re_...` |

---

## 🚀 Local Development Setup

1. **Clone repository & install dependencies**:
   ```bash
   git clone https://github.com/LeyianB24/osotua-farming.git
   cd osotua-farming
   npm install
   ```

2. **Generate Prisma Client & Push Database Schema**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Seed Database with Initial Breeds, Products, Categories, & Admin**:
   ```bash
   npm run db:seed
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Deployment (Vercel)

1. **Connect to Vercel**:
   - Import `LeyianB24/osotua-farming` repository into Vercel.
   - Configure all environment variables in **Settings → Environment Variables**.
   - Set `NEXTAUTH_URL` to `https://osotuafarming.co.ke`.
   - Set `MPESA_ENV` to `production`.

2. **Database Migration & Seeding on Production**:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

3. **Configure Webhooks & Callbacks**:
   - Update Safaricom Daraja callback endpoint to `https://osotuafarming.co.ke/api/payments/mpesa/callback`.
   - Add Stripe webhook destination `https://osotuafarming.co.ke/api/payments/stripe/webhook` in Stripe Dashboard.

---

## 👨‍💻 Designed & Developed By

Architected and developed by **[Bezalel Technologies LTD](https://www.bezalel.website/)**.  
All rights reserved © Osotua Farming Ltd.
