"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/shared/CartContext"

interface ProduceItem {
  id: string
  name: string
  price: number
  unit: string
  category: string
  icon: string
  image: string
  link: string
  tag: string
  origin: string
}

const PRODUCE_ITEMS: ProduceItem[] = [
  {
    id: "prod-carrots",
    name: "Crisp Sweet Carrots",
    price: 80,
    unit: "kg",
    category: "vegetables",
    icon: "ti ti-carrot",
    image: "/images/carrots.jpg",
    link: "/barn",
    tag: "Morning Harvest",
    origin: "Kiambu Greens Co-op",
  },
  {
    id: "prod-avocados",
    name: "Rich Hass Avocados",
    price: 25,
    unit: "pc",
    category: "fruits",
    icon: "ti ti-apple",
    image: "/images/pineapples.jpg",
    link: "/barn",
    tag: "Tree Ripened",
    origin: "Nakuru Orchards",
  },
  {
    id: "prod-eggs",
    name: "Pasture Kienyeji Eggs",
    price: 420,
    unit: "tray (30)",
    category: "dairy-eggs",
    icon: "ti ti-egg",
    image: "/images/eggs.jpg",
    link: "/barn",
    tag: "Free Range",
    origin: "Kajiado Rangelands",
  },
  {
    id: "prod-milk",
    name: "Pure Sahiwal Whole Milk",
    price: 60,
    unit: "Liter",
    category: "dairy-eggs",
    icon: "ti ti-milk",
    image: "/images/sahiwal cow.jpg",
    link: "/barn",
    tag: "Raw Pasture",
    origin: "Osotua Dairy Unit",
  },
  {
    id: "prod-tomatoes",
    name: "Heritage Red Tomatoes",
    price: 90,
    unit: "kg",
    category: "vegetables",
    icon: "ti ti-flower",
    image: "/images/ripe tomatoes.jpg",
    link: "/barn",
    tag: "Vine Ripened",
    origin: "Kajiado Organic Plots",
  },
  {
    id: "prod-cabbages",
    name: "Crisp Sugar Cabbages",
    price: 50,
    unit: "head",
    category: "vegetables",
    icon: "ti ti-plant",
    image: "/images/cabbages.jpeg",
    link: "/barn",
    tag: "Farm Fresh",
    origin: "Kiambu Valley Co-op",
  },
  {
    id: "prod-beef",
    name: "Prime Boran Beef Ribeye",
    price: 950,
    unit: "kg",
    category: "meat",
    icon: "ti ti-meat",
    image: "/images/grazing.jpg",
    link: "/barn",
    tag: "100% Grass-Fed",
    origin: "Osotua Stud Ranch",
  },
  {
    id: "prod-honey",
    name: "Acacia Blossom Honey",
    price: 650,
    unit: "500g jar",
    category: "dairy-eggs",
    icon: "ti ti-droplet",
    image: "/images/dorper sheep.jpg",
    link: "/barn",
    tag: "Raw Unfiltered",
    origin: "Kajiado Wild Apiary",
  },
]

const CATEGORIES = [
  { id: "all", label: "All Harvest", icon: "bi-grid-fill" },
  { id: "vegetables", label: "Vegetables", icon: "bi-tree-fill" },
  { id: "dairy-eggs", label: "Dairy & Eggs", icon: "bi-egg-fill" },
  { id: "fruits", label: "Orchard Fruits", icon: "bi-apple" },
  { id: "meat", label: "Grass-Fed Meat", icon: "bi-fire" },
]

export default function HarvestProduceGrid() {
  const { addToCart } = useCart()
  const [activeCat, setActiveCat] = useState("all")
  const [addedId, setAddedId] = useState<string | null>(null)

  const filteredItems = activeCat === "all"
    ? PRODUCE_ITEMS
    : PRODUCE_ITEMS.filter((item) => item.category === activeCat)

  const handleAddToCart = (item: ProduceItem, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        unit: item.unit,
        image: item.image,
        type: "product",
      },
      1
    )
    setAddedId(item.id)
    setTimeout(() => setAddedId(null), 1800)
  }

  return (
    <div className="w-full space-y-10">
      {/* ── HEADER ROW ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EDE6D6]">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10.5px] font-bold uppercase tracking-widest bg-emerald-800/10 text-emerald-900 border border-emerald-800/20">
            <i className="ti ti-plant-2 text-sm" />
            <span>DAILY SHAMBA HARVEST &bull; COLD-CHAIN DISPATCH</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1208] m-0 leading-tight"
            style={{
              fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
            }}
          >
            This Week&apos;s <span className="text-gradient-emerald font-normal italic">Fresh Harvest</span>
          </h2>
          <p className="text-[15px] text-[#6B6558] max-w-xl leading-relaxed m-0">
            Harvested at sunrise across Kajiado, Nakuru &amp; Kiambu. 100% pesticide-free, pasture-fresh, and delivered direct.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((cat) => {
            const active = activeCat === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                type="button"
                className={`text-[12.5px] font-bold px-4 py-2 rounded-full transition-all duration-300 inline-flex items-center gap-2 cursor-pointer ${
                  active
                    ? "bg-[#2E6B34] text-white shadow-sm"
                    : "bg-white text-[#1C1208]/75 hover:text-[#2E6B34] hover:bg-stone-100 border border-[#EDE5D8]"
                }`}
              >
                <i className={`bi ${cat.icon} text-xs`} />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── GRID OF ITEMS WITH GENEROUS AIR ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const isAdded = addedId === item.id
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 border border-[#EDE6D6] shadow-xs hover:shadow-xl hover:border-emerald-700/30 transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                {/* Image Box */}
                <Link href={item.link} className="no-underline block">
                  <div className="h-56 sm:h-60 rounded-2xl mb-4 relative overflow-hidden bg-stone-100 border border-stone-100 flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Tag badge */}
                    <div className="absolute top-3 left-3 bg-[#14100A]/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase border border-white/15">
                      {item.tag}
                    </div>
                  </div>

                  <div className="px-1 space-y-1.5">
                    <div className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#8E5E16] flex items-center gap-1">
                      <i className="bi bi-geo-alt-fill text-amber-500 text-xs" />
                      <span className="truncate">{item.origin}</span>
                    </div>
                    <h3
                      className="text-xl font-normal text-[#1C1208] m-0 group-hover:text-[#2E6B34] transition-colors truncate"
                      style={{ fontFamily: "var(--font-fraunces), serif" }}
                    >
                      {item.name}
                    </h3>
                    <div className="flex items-baseline gap-1.5 pt-0.5">
                      <span className="text-[17px] font-bold text-[#1C1208]">
                        KES {item.price.toLocaleString()}
                      </span>
                      <span className="text-[12px] font-semibold text-[#8C8475]">
                        / {item.unit}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={(e) => handleAddToCart(item, e)}
                type="button"
                className={`mt-5 w-full text-[12px] font-bold py-2.5 px-4 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  isAdded
                    ? "bg-[#2E6B34] text-white border-[#2E6B34] shadow-sm"
                    : "bg-[#FBF7F0] hover:bg-[#2E6B34] text-[#1C1208] hover:text-white border-[#EDE6D6] hover:border-[#2E6B34]"
                }`}
              >
                {isAdded ? (
                  <>
                    <i className="ti ti-check text-base font-bold" />
                    <span>Added to Basket</span>
                  </>
                ) : (
                  <>
                    <i className="ti ti-shopping-cart-plus text-base" />
                    <span>Add to Basket</span>
                  </>
                )}
              </button>
            </div>
          )
        })}
      </div>

      {/* ── COLD CHAIN DISPATCH NOTIFICATION ── */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-50 via-emerald-100/40 to-amber-50/50 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-[#1C1208]">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <i className="ti ti-truck-delivery text-xl" />
          </div>
          <p className="text-[13.5px] m-0 font-medium">
            <strong className="text-emerald-950 font-bold">Same-day delivery:</strong> Orders placed before 10:00 AM are harvested fresh and delivered by refrigerated courier today across Nairobi &amp; Kajiado.
          </p>
        </div>
        <Link
          href="/barn"
          className="btn-emerald text-[11px] font-bold py-2 px-4 whitespace-nowrap inline-flex items-center gap-1.5 no-underline shrink-0"
        >
          <span>Explore All Produce</span>
          <i className="bi bi-arrow-right text-xs" />
        </Link>
      </div>
    </div>
  )
}

