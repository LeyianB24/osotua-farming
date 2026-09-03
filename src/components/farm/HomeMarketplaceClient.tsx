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
    setTimeout(() => setAddedId(null), 1400)
  }

  return (
    <div className="w-full space-y-20">

      {/* ── 1. CINEMATIC AACo-STYLE HERO BANNER ── */}
      <section className="relative overflow-hidden rounded-3xl bg-[#1C1208] text-[#FFFFFF] border border-[#C4882A]/30 shadow-2xl">
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/images/grazing.jpg"
            alt="Osotua pastoral rangelands"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 70% 70% at 20% 30%, rgba(196,136,42,0.3) 0%, transparent 70%),
                linear-gradient(90deg, rgba(28,18,8,0.92) 0%, rgba(28,18,8,0.75) 55%, rgba(28,18,8,0.4) 100%)
              `,
            }}
          />
        </div>

        <div className="relative z-10 p-8 sm:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-[0.2em] uppercase bg-[#C4882A]/25 border border-[#C4882A]/40 text-[#E59A24]">
              <i className="bi bi-stars" />
              <span>Fresh From The Shamba &bull; Kajiado, Kenya</span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.4rem, 5vw, 4.4rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                color: "#FFFFFF",
              }}
            >
              Fresh produce, straight from <br className="hidden sm:inline" />
              <em style={{ color: "#D99A30", fontStyle: "italic" }}>Kenyan farmers</em> to your table
            </h1>

            <p className="text-sm sm:text-base text-stone-300 font-sans leading-relaxed max-w-xl">
              Buy seasonal vegetables, organic stone-ground flours, free-range eggs, and pasture dairy from our cooperative of small-scale farmers in Kajiado, Nakuru, and Kiambu.
            </p>

            <div className="flex items-center gap-4 flex-wrap pt-2">
              <Link
                href="/shop"
                className="btn-primary py-3.5 px-7 text-xs font-mono uppercase tracking-wider font-bold shadow-lg shadow-[#C4882A]/30 inline-flex items-center gap-2"
              >
                <i className="bi bi-basket3-fill" />
                <span>Shop Produce</span>
                <i className="bi bi-arrow-right" />
              </Link>
              <Link
                href="/partners"
                className="btn-ghost py-3.5 px-6 text-xs font-mono uppercase tracking-wider font-bold bg-white/10 hover:bg-white/20 border-white/25 text-white inline-flex items-center gap-2"
              >
                <i className="bi bi-people" />
                <span>Meet Our Farmers</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-[#C4882A]/35 shadow-2xl group">
              <Image
                src="/images/vegetables.jpg"
                alt="Fresh farm harvest from Kajiado and Kiambu"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#D99A30] font-bold">Daily Shamba Harvest</div>
                  <div className="font-serif text-xl">100% Pesticide-Free &bull; Cold-Chain</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#C4882A] text-soil flex items-center justify-center font-bold text-sm shadow-md">
                  <i className="bi bi-patch-check-fill text-white text-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. THIS WEEK'S HARVEST (Luxury Editorial Cards) ── */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#C4882A]/20">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#2E7D32]/12 text-[#2E7D32] border border-[#2E7D32]/30 mb-2">
              <i className="bi bi-flower1 text-[#2E7D32]" />
              Seasonal Harvest Bounty
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                fontWeight: 400,
                color: "#1C1208",
                lineHeight: 1.1,
              }}
            >
              This Week&apos;s Harvest
            </h2>
          </div>

          <Link
            href="/shop"
            className="btn-ghost text-xs py-2.5 px-5 flex items-center gap-2 bg-[#FFFFFF] shadow-xs hover:border-[#C4882A]"
            style={{ color: "#1C1208", borderColor: "rgba(196,136,42,0.3)" }}
          >
            <span>View Full Produce Store</span>
            <i className="bi bi-arrow-right" />
          </Link>
        </div>

        {/* Luxury Harvest Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {harvest.map((item) => {
            const isAdded = addedId === item.id
            return (
              <div
                key={item.id}
                className="group bg-[#FFFFFF] rounded-3xl border border-[#C4882A]/20 hover:border-[#C4882A] p-5 shadow-lg shadow-[#1C1208]/04 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full min-w-0 overflow-hidden"
              >
                {/* ── TOP MEDIA & CONTENT ── */}
                <div className="min-w-0 w-full">
                  {/* Framed Media Window */}
                  <div className="relative w-full h-56 rounded-2xl bg-[#FAF5EB] overflow-hidden mb-4 border border-[#C4882A]/15">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#C4882A]/40">
                        <i className="bi bi-basket text-5xl" />
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                    {/* Top Tag Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#8E5E16] border border-amber-200/70 shadow-xs max-w-[70%] truncate">
                      {item.tag || "Fresh Harvest"}
                    </div>

                    {/* Cooperative Origin Pill */}
                    <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white font-bold uppercase tracking-wider flex items-center gap-1 drop-shadow-md bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/15 max-w-[80%] truncate">
                      <i className="bi bi-geo-alt-fill text-[#D99A30] shrink-0" />
                      <span className="truncate">{item.farmName}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-1.5 min-w-0">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C4882A] truncate">
                      {item.categoryName || "Fresh Shamba Produce"}
                    </div>
                    <Link
                      href={`/shop/${item.slug || item.id}`}
                      style={{
                        fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                        fontSize: "1.45rem",
                        fontWeight: 500,
                        lineHeight: 1.2,
                        color: "#1C1208",
                      }}
                      className="group-hover:text-[#C4882A] transition-colors block truncate"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-[#6B5744] line-clamp-2 leading-relaxed min-h-[36px]">
                      Picked at peak ripeness, carefully graded, and packed cold-chain from our local smallholder cooperatives.
                    </p>
                  </div>
                </div>

                {/* ── FOOTER: PRICE & ADD BUTTON ── */}
                <div className="pt-4 border-t border-[#C4882A]/15 mt-4 flex items-center justify-between gap-3 w-full">
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#8A7560] block font-semibold">
                      Farm Gate Price
                    </span>
                    <span className="font-mono text-lg font-bold text-[#1C1208] whitespace-nowrap">
                      KSh {item.price.toLocaleString()}
                      <span className="text-xs text-[#786550] font-normal ml-1">/{item.unit}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleAdd(item)}
                    type="button"
                    className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-all duration-200 shrink-0 ${
                      isAdded
                        ? "bg-[#2E7D32] text-white"
                        : "bg-[#1C1208] hover:bg-[#C4882A] text-white"
                    }`}
                  >
                    <i className={`bi ${isAdded ? "bi-check-lg" : "bi-plus-lg"}`} />
                    <span>{isAdded ? "Added" : "Add"}</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── 3. TRUST & VALUE PILLARS (AACo Luxury Format) ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pillar 1: 40+ Partner Farms */}
        <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-8 shadow-lg shadow-[#1C1208]/04 flex items-start gap-6 hover:border-[#C4882A] transition-colors">
          <div className="w-16 h-16 rounded-2xl bg-[#C4882A]/15 border border-[#C4882A]/30 flex items-center justify-center text-[#C4882A] shrink-0 shadow-xs">
            <i className="bi bi-people-fill text-3xl" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl text-[#1C1208] font-normal">
              40+ Partner Farm Cooperatives
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4835] font-sans leading-relaxed">
              Every purchase directly supports a local Kenyan smallholder cooperative with guaranteed fair-market prices, ethical contracts, and community empowerment.
            </p>
          </div>
        </div>

        {/* Pillar 2: Same-day delivery */}
        <div className="bg-[#FFFFFF] border border-[#2E7D32]/25 rounded-3xl p-8 shadow-lg shadow-[#1C1208]/04 flex items-start gap-6 hover:border-[#2E7D32] transition-colors">
          <div className="w-16 h-16 rounded-2xl bg-[#2E7D32]/15 border border-[#2E7D32]/30 flex items-center justify-center text-[#2E7D32] shrink-0 shadow-xs">
            <i className="bi bi-truck text-3xl" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl text-[#1C1208] font-normal">
              Same-Day Express Cold Delivery
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4835] font-sans leading-relaxed">
              Ordered by 10:00 AM, harvested from the soil, temperature-controlled packed, and delivered directly to your kitchen the very same day.
            </p>
          </div>
        </div>

      </section>

    </div>
  )
}
