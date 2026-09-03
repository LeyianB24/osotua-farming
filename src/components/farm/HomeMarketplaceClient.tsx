"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useCart } from "@/components/shared/CartContext"
import CountUp from "@/components/shared/CountUp"
import TerrainWave from "@/components/shared/TerrainWave"
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
    name: "Sukuma Wiki (Collard Greens)",
    slug: "sukuma-wiki",
    price: 30,
    unit: "bunch",
    image: "/images/cabbages.jpeg",
    farmName: "Kiambu Greens",
    categoryName: "Vegetables",
    tag: "Daily Harvest",
  },
  {
    id: "h2",
    name: "Heritage Sun-Ripened Tomatoes",
    slug: "heritage-tomatoes",
    price: 90,
    unit: "kg",
    image: "/images/ripe tomatoes.jpg",
    farmName: "Kajiado Co-op",
    categoryName: "Vegetables",
    tag: "Vine Ripened",
  },
  {
    id: "h3",
    name: "Hass Avocados",
    slug: "hass-avocados",
    price: 25,
    unit: "pc",
    image: "/images/pineapples.jpg",
    farmName: "Nakuru Farms",
    categoryName: "Fruit",
    tag: "Rich Butterfat",
  },
  {
    id: "h4",
    name: "Free-Range Kienyeji Eggs",
    slug: "kienyeji-eggs",
    price: 420,
    unit: "tray of 30",
    image: "/images/chickens.jpg",
    farmName: "Kajiado Co-op",
    categoryName: "Dairy and Eggs",
    tag: "Pasture Fed",
  },
  {
    id: "h5",
    name: "Raw Whole Sahiwal Milk",
    slug: "raw-sahiwal-milk",
    price: 60,
    unit: "L",
    image: "/images/sahiwal cow.jpg",
    farmName: "Nakuru Farms",
    categoryName: "Dairy and Eggs",
    tag: "Unpasteurised",
  },
  {
    id: "h6",
    name: "Stone-Ground Maize Flour",
    slug: "stone-ground-maize-flour",
    price: 150,
    unit: "2kg pack",
    image: "/images/vegetables.jpg",
    farmName: "Kiambu Greens",
    categoryName: "Grains",
    tag: "Artisan Milled",
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
    <div style={{ background: "#FBF7F0", color: "#1C1208" }}>
      
      {/* ── 1. LUXURY SUN-DRENCHED HERO SECTION ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Pastoral rangeland backdrop */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/images/grazing.jpg"
            alt="Pastoral rangelands at Osotua Farming"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20 scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 80% at 20% 20%, rgba(196,136,42,0.18) 0%, transparent 60%),
                radial-gradient(ellipse 60% 60% at 80% 80%, rgba(46,125,50,0.12) 0%, transparent 50%),
                linear-gradient(180deg, rgba(251,247,240,0.85) 0%, rgba(251,247,240,0.95) 60%, #FBF7F0 100%)
              `,
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-[#C4882A]/12 border border-[#C4882A]/35 text-[#8E5E16] shadow-xs"
          >
            <i className="bi bi-patch-check-fill text-[#C4882A]" />
            <span>Direct Farm-to-Table Marketplace &bull; Kajiado, Kenya</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              color: "#1C1208",
            }}
          >
            Fresh produce, straight from <br className="hidden sm:inline" />
            <em style={{ color: "#C4882A", fontStyle: "italic" }}>Kenyan farmers</em> to your table
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base text-[#5C4835] max-w-2xl mx-auto leading-relaxed"
          >
            Buy seasonal vegetables, stone-ground flours, pasture eggs, and organic dairy from our cooperative of small-scale farmers in Kajiado, Nakuru, and Kiambu.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center justify-center gap-4 flex-wrap pt-2"
          >
            <Link
              href="/shop"
              className="btn-primary py-3.5 px-7 text-xs font-mono uppercase tracking-wider font-bold shadow-lg shadow-[#C4882A]/25 inline-flex items-center gap-2"
            >
              <i className="bi bi-basket3-fill" />
              <span>Shop Produce</span>
              <i className="bi bi-arrow-right" />
            </Link>
            <Link
              href="/partners"
              className="btn-ghost py-3.5 px-6 text-xs font-mono uppercase tracking-wider font-bold bg-[#FFFFFF] inline-flex items-center gap-2"
              style={{ color: "#1C1208", borderColor: "rgba(196,136,42,0.3)" }}
            >
              <i className="bi bi-people" />
              <span>Meet Our Farmers</span>
            </Link>
          </motion.div>
        </div>

        {/* 4 Floating Statistics */}
        <div className="w-full max-w-5xl mx-auto mt-14 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-6 shadow-xl shadow-[#1C1208]/04">
            {[
              { label: "Partner Farms", value: 40, suffix: "+", icon: "bi-people-fill", color: "#C4882A" },
              { label: "Acres Farmed", value: 12500, suffix: "+", icon: "bi-geo-alt-fill", color: "#2E7D32" },
              { label: "Daily Harvests", value: 100, suffix: "%", icon: "bi-leaf-fill", color: "#C4882A" },
              { label: "Same-Day Delivery", value: 100, suffix: "%", icon: "bi-truck", color: "#2E7D32" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-2">
                <i className={`bi ${stat.icon} text-lg mb-1 block`} style={{ color: stat.color }} />
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 600,
                    color: "#1C1208",
                    lineHeight: 1,
                  }}
                >
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-mono text-[10px] text-[#8E5E16] font-bold uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ── 2. THIS WEEK'S HARVEST (Cooperative Produce Grid) ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#C4882A]/15">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#2E7D32]/12 text-[#2E7D32] border border-[#2E7D32]/30 mb-2">
              <i className="bi bi-stars" />
              Fresh From The Shamba
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
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
            className="btn-ghost text-xs py-2 px-4 flex items-center gap-2 bg-[#FFFFFF]"
            style={{ color: "#1C1208", borderColor: "rgba(196,136,42,0.3)" }}
          >
            <span>View All Produce</span>
            <i className="bi bi-arrow-right" />
          </Link>
        </div>

        {/* Harvest Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {harvest.map((item) => {
            const isAdded = addedId === item.id
            return (
              <div
                key={item.id}
                className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-5 shadow-lg shadow-[#1C1208]/04 hover:border-[#C4882A] hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo container */}
                  <div className="w-full h-48 rounded-2xl bg-[#FAF5EB] border border-[#C4882A]/15 relative overflow-hidden mb-4">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#C4882A]">
                        <i className="bi bi-basket text-4xl" />
                      </div>
                    )}
                    {item.tag && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-[#FFFFFF]/90 backdrop-blur-md text-[#8E5E16] border border-[#C4882A]/30">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  {/* Cooperative Attribution */}
                  <div className="text-[11px] font-mono text-[#2E7D32] font-bold uppercase tracking-wider mb-1">
                    <i className="bi bi-geo-alt-fill mr-1" />
                    {item.farmName}
                  </div>

                  {/* Title */}
                  <Link
                    href={`/shop/${item.slug || item.id}`}
                    className="font-serif text-xl font-normal text-[#1C1208] hover:text-[#C4882A] transition-colors block leading-tight mb-2"
                  >
                    {item.name}
                  </Link>
                </div>

                {/* Price & Add to Cart */}
                <div className="flex items-center justify-between pt-4 border-t border-[#C4882A]/15 mt-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#786550] block uppercase">Direct Price</span>
                    <span className="font-mono text-base font-bold text-[#1C1208]">
                      KES {item.price}
                      <span className="text-xs text-[#786550] font-normal ml-1">/{item.unit}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleAdd(item)}
                    className={`btn-primary py-2 px-3.5 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                      isAdded
                        ? "bg-[#2E7D32] border-[#2E7D32] text-white"
                        : "shadow-sm"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <i className="bi bi-check-lg" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <i className="bi bi-plus-lg" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── 3. TRUST & VALUE PILLARS ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Pillar 1 */}
          <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-8 shadow-lg shadow-[#1C1208]/04 flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#C4882A]/15 border border-[#C4882A]/30 flex items-center justify-center text-[#C4882A] shrink-0">
              <i className="bi bi-people-fill text-2xl" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-2xl text-[#1C1208] font-normal">
                40+ Partner Farm Cooperatives
              </h3>
              <p className="text-xs text-[#5C4835] leading-relaxed">
                Every purchase directly empowers smallholder Kenyan farmers in Kajiado, Nakuru, and Kiambu with fair pricing and zero middleman exploitation.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#FFFFFF] border border-[#2E7D32]/25 rounded-3xl p-8 shadow-lg shadow-[#1C1208]/04 flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#2E7D32]/15 border border-[#2E7D32]/30 flex items-center justify-center text-[#2E7D32] shrink-0">
              <i className="bi bi-truck text-2xl" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-2xl text-[#1C1208] font-normal">
                Same-Day Express Cold-Chain
              </h3>
              <p className="text-xs text-[#5C4835] leading-relaxed">
                Orders placed by 10:00 AM are harvested fresh, packed under temperature control, and dispatched direct to your residence the very same day.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Terrain wave */}
      <div className="w-full">
        <TerrainWave fillColor="#FAF5EB" />
      </div>

    </div>
  )
}
