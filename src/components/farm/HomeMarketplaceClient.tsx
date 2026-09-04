"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/shared/CartContext"
import { useState } from "react"

export interface HarvestProduct {
  id: string
  name: string
  slug: string
  price: number
  unit: string
  image?: string | null
  farmName: string
  categoryName: string
  tag?: string
}

const DEFAULT_HARVEST: HarvestProduct[] = [
  {
    id: "h1",
    name: "Crisp Sweet Carrots",
    slug: "carrots",
    price: 80,
    unit: "kg",
    image: "/images/carrots.jpg",
    farmName: "Kiambu Greens",
    categoryName: "Vegetables",
    tag: "Morning Harvest",
  },
  {
    id: "h2",
    name: "Rich Hass Avocados",
    slug: "hass-avocados",
    price: 25,
    unit: "pc",
    image: "/images/pineapples.jpg",
    farmName: "Nakuru Farms",
    categoryName: "Fruit",
    tag: "Tree Ripened",
  },
  {
    id: "h3",
    name: "Pasture Kienyeji Eggs",
    slug: "farm-eggs",
    price: 420,
    unit: "tray of 30",
    image: "/images/eggs.jpg",
    farmName: "Kajiado Co-op",
    categoryName: "Dairy & Eggs",
    tag: "Free Range",
  },
  {
    id: "h4",
    name: "Pure Fresh Whole Milk",
    slug: "fresh-milk",
    price: 60,
    unit: "L",
    image: "/images/sahiwal cow.jpg",
    farmName: "Nakuru Farms",
    categoryName: "Dairy & Eggs",
    tag: "Raw Pasture",
  },
  {
    id: "h5",
    name: "Crisp Sukuma Wiki",
    slug: "sukuma-wiki",
    price: 30,
    unit: "bunch",
    image: "/images/cabbages.jpeg",
    farmName: "Kiambu Greens",
    categoryName: "Vegetables",
    tag: "Daily Harvest",
  },
  {
    id: "h6",
    name: "Heritage Red Tomatoes",
    slug: "heritage-tomatoes",
    price: 90,
    unit: "kg",
    image: "/images/ripe tomatoes.jpg",
    farmName: "Kajiado Co-op",
    categoryName: "Vegetables",
    tag: "Vine Ripened",
  },
]

export default function HomeMarketplaceClient({
  harvest = DEFAULT_HARVEST,
}: {
  harvest?: HarvestProduct[]
}) {
  const { addToCart } = useCart()
  const [addedId, setAddedId] = useState<string | null>(null)

  const handleAdd = (item: HarvestProduct) => {
    addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        unit: item.unit,
        image: item.image || undefined,
        categoryName: item.categoryName,
        type: "product",
      },
      1
    )
    setAddedId(item.id)
    setTimeout(() => setAddedId(null), 1500)
  }

  return (
    <div className="w-full space-y-16">

      {/* ── 1. PROMO BANNER (Two-column dark block matching design system) ── */}
      <section
        style={{
          background: "#211C15",
          borderRadius: "14px",
          overflow: "hidden",
        }}
        className="relative text-[#FFFFFF] border border-[#C4922E]/30 shadow-xl"
      >
        <div className="p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div
              style={{
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "9px",
                color: "#C4922E",
                fontWeight: 700,
                background: "rgba(196,146,46,0.15)",
                border: "1px solid rgba(196,146,46,0.35)",
                padding: "4px 10px",
                borderRadius: "100px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>◈</span>
              <span>Fresh From The Shamba &bull; Kajiado, Kenya</span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 400,
                lineHeight: 1.1,
                color: "#FFFFFF",
              }}
            >
              Fresh produce, straight from <br className="hidden sm:inline" />
              <em style={{ color: "#C4922E", fontStyle: "italic" }}>Kenyan farmers</em> to your table
            </h1>

            <p style={{ fontSize: "14px", color: "#CFC7B4", lineHeight: 1.6, maxWidth: "540px" }}>
              Buy seasonal vegetables, organic stone-ground flours, free-range eggs, and pasture dairy from our cooperative of small-scale farmers in Kajiado, Nakuru, and Kiambu.
            </p>

            <div className="flex items-center gap-3.5 flex-wrap pt-2">
              <Link
                href="/shop"
                style={{
                  background: "#C4922E",
                  color: "#211C15",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
                className="hover:bg-[#A97B22] transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <span>SHOP PRODUCE</span>
                <span>→</span>
              </Link>
              <Link
                href="/partners"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "10px 18px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
                className="hover:bg-white/15 transition-colors inline-flex items-center gap-2"
              >
                <span>MEET OUR FARMERS</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-white/10 shadow-lg group">
              <Image
                src="/images/vegetables.jpg"
                alt="Fresh farm harvest from Kajiado and Kiambu"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-[#C4922E]">Daily Shamba Harvest</div>
                  <div style={{ fontFamily: "var(--font-fraunces, 'Fraunces'), serif", fontSize: "17px" }}>
                    100% Pesticide-Free &bull; Cold-Chain
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. THIS WEEK'S HARVEST (Unified Card Anatomy) ── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-3 border-b border-[#EDE6D6]">
          <div>
            <div
              style={{
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "9px",
                color: "#3F6B3F",
                fontWeight: 700,
                background: "rgba(63,107,63,0.12)",
                padding: "3px 8px",
                borderRadius: "100px",
                display: "inline-block",
                marginBottom: "6px",
              }}
            >
              Seasonal Harvest Bounty
            </div>
            <h2
              style={{
                fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(22px, 3.5vw, 30px)",
                fontWeight: 400,
                color: "#211C15",
                margin: 0,
              }}
            >
              This Week&apos;s Harvest
            </h2>
          </div>

          <Link
            href="/shop"
            style={{
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: "10px",
              color: "#C4922E",
              fontWeight: 700,
              textDecoration: "none",
            }}
            className="hover:underline flex items-center gap-1.5"
          >
            <span>VIEW ALL →</span>
          </Link>
        </div>

        {/* Unified 3-Column Harvest Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {harvest.map((item) => {
            const isAdded = addedId === item.id
            return (
              <div
                key={item.id}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "14px",
                  border: "1px solid #EDE6D6",
                }}
                className="group overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full"
              >
                {/* ── IMAGE SECTION WITH BADGES ── */}
                <div>
                  <Link
                    href={`/shop/${item.slug || item.id}`}
                    className="relative block h-44 w-full bg-stone-200 overflow-hidden"
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400">
                        <i className="bi bi-basket text-4xl" />
                      </div>
                    )}

                    {/* Top-left: Category pill */}
                    <div className="absolute top-2 left-2 bg-[#14100A]/70 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                      {item.tag || "FRESH HARVEST"}
                    </div>

                    {/* Bottom-left: Origin pill */}
                    <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white font-medium uppercase tracking-wider flex items-center gap-1 drop-shadow-md bg-[#14100A]/60 backdrop-blur-xs px-2 py-0.5 rounded max-w-[85%] truncate">
                      <i className="bi bi-geo-alt-fill text-[#C4922E]" />
                      <span className="truncate">{item.farmName}</span>
                    </div>
                  </Link>

                  {/* ── CARD CONTENT ── */}
                  <div className="p-3.5 pb-1">
                    <div
                      style={{
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontSize: "9px",
                        color: "#C4922E",
                        fontWeight: 700,
                      }}
                    >
                      {item.categoryName || "VEGETABLES"}
                    </div>
                    <Link
                      href={`/shop/${item.slug || item.id}`}
                      style={{
                        fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                        fontSize: "17px",
                        margin: "2px 0 6px",
                        color: "#211C15",
                        lineHeight: 1.2,
                        textDecoration: "none",
                      }}
                      className="truncate block hover:text-[#C4922E] transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p style={{ fontSize: "12px", color: "#6B6558", lineHeight: 1.4, margin: 0 }} className="line-clamp-1">
                      Picked fresh at peak ripeness and packed cold-chain.
                    </p>
                  </div>
                </div>

                {/* ── CARD FOOTER ── */}
                <div className="p-3.5 pt-0 flex justify-between items-center border-t border-stone-100 mt-3">
                  <div>
                    <div
                      style={{
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontSize: "8px",
                        color: "#6B6558",
                        fontWeight: 600,
                      }}
                    >
                      FARM GATE PRICE
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                        fontSize: "16px",
                        color: "#211C15",
                        fontWeight: 600,
                      }}
                    >
                      KSh {item.price.toLocaleString()}
                      <span style={{ fontSize: "11px", color: "#6B6558", fontWeight: 400, marginLeft: "3px" }}>
                        /{item.unit}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAdd(item)}
                    type="button"
                    style={{
                      background: isAdded ? "#3F6B3F" : "#C4922E",
                      color: isAdded ? "#FFFFFF" : "#211C15",
                      fontSize: "9px",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                    }}
                    className="hover:opacity-90 transition-all shrink-0"
                  >
                    {isAdded ? "✓ ADDED" : "+ ADD"}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── 3. TRUST & VALUE PILLARS ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Pillar 1 */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "14px",
            border: "1px solid #EDE6D6",
            padding: "24px",
          }}
          className="flex items-start gap-4 shadow-xs"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#C4922E] shrink-0 text-xl">
            <i className="bi bi-people-fill" />
          </div>
          <div className="space-y-1">
            <h3 style={{ fontFamily: "var(--font-fraunces, 'Fraunces'), serif", fontSize: "18px", color: "#211C15", margin: 0 }}>
              40+ Partner Farm Cooperatives
            </h3>
            <p style={{ fontSize: "13px", color: "#6B6558", margin: 0, lineHeight: 1.5 }}>
              Every purchase directly supports local Kenyan smallholder cooperatives with guaranteed fair-market prices.
            </p>
          </div>
        </div>

        {/* Pillar 2 */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "14px",
            border: "1px solid #EDE6D6",
            padding: "24px",
          }}
          className="flex items-start gap-4 shadow-xs"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#3F6B3F] shrink-0 text-xl">
            <i className="bi bi-truck" />
          </div>
          <div className="space-y-1">
            <h3 style={{ fontFamily: "var(--font-fraunces, 'Fraunces'), serif", fontSize: "18px", color: "#211C15", margin: 0 }}>
              Same-Day Express Cold Delivery
            </h3>
            <p style={{ fontSize: "13px", color: "#6B6558", margin: 0, lineHeight: 1.5 }}>
              Ordered by 10:00 AM, harvested from the soil, temperature-controlled packed, and delivered the very same day.
            </p>
          </div>
        </div>

      </section>

    </div>
  )
}
