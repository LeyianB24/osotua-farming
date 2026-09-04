"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/shared/CartContext"

interface HarvestItem {
  id: string
  name: string
  price: number
  unit: string
  icon: string
  image: string
  link: string
  badge?: string
}

const DEFAULT_HARVEST_ITEMS: HarvestItem[] = [
  {
    id: "prod-carrots",
    name: "Carrots",
    price: 80,
    unit: "kg",
    icon: "ti ti-carrot",
    image: "/images/carrots.jpg",
    link: "/shop/carrots",
    badge: "Fresh Picked",
  },
  {
    id: "prod-avocados",
    name: "Avocados",
    price: 25,
    unit: "pc",
    icon: "ti ti-apple",
    image: "/images/pineapples.jpg",
    link: "/shop/avocados",
    badge: "Tree Ripened",
  },
  {
    id: "prod-eggs",
    name: "Farm eggs",
    price: 420,
    unit: "tray",
    icon: "ti ti-egg",
    image: "/images/eggs.jpg",
    link: "/shop/farm-eggs",
    badge: "Free Range",
  },
  {
    id: "prod-milk",
    name: "Fresh milk",
    price: 60,
    unit: "L",
    icon: "ti ti-milk",
    image: "/images/sahiwal cow.jpg",
    link: "/shop/fresh-milk",
    badge: "Sahiwal Pure",
  },
]

export default function OsotuaFarmMockup({
  items = DEFAULT_HARVEST_ITEMS,
}: {
  items?: HarvestItem[]
}) {
  const { addToCart } = useCart()
  const [addedId, setAddedId] = useState<string | null>(null)

  const handleAddToCart = (item: HarvestItem, e: React.MouseEvent) => {
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
    <div className="w-full max-w-5xl mx-auto my-6 px-3 sm:px-6">
      <h2 className="sr-only">
        Homepage mockup for Osotua Farming, a farm-to-market website with a hero banner, featured produce, and community story sections
      </h2>

      <div
        className="shadow-xl transition-all duration-300"
        style={{
          background: "var(--surface-1)",
          borderRadius: "16px",
          border: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        {/* ── HEADER / TOP BAR ── */}
        <div
          className="flex justify-between items-center px-5 py-3.5 flex-wrap gap-3"
          style={{
            borderBottom: "0.5px solid var(--border)",
            background: "var(--surface-2)",
          }}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-medium text-[15px] text-[#1C1208] hover:opacity-85 transition-opacity no-underline"
          >
            <i
              className="ti ti-plant-2 text-xl"
              style={{ color: "var(--text-accent)" }}
              aria-hidden="true"
            />
            <span className="font-semibold tracking-tight">Osotua Farming</span>
          </Link>

          {/* Nav Links */}
          <div
            className="flex items-center gap-5 text-[13px] font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            <Link
              href="/barn"
              className="hover:text-[#1C1208] transition-colors no-underline"
            >
              Shop
            </Link>
            <Link
              href="/partners"
              className="hover:text-[#1C1208] transition-colors no-underline"
            >
              Our farmers
            </Link>
            <Link
              href="/about"
              className="hover:text-[#1C1208] transition-colors no-underline"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#1C1208] transition-colors no-underline"
            >
              Contact
            </Link>
          </div>

          {/* Action Button */}
          <Link
            href="/login"
            className="text-[13px] font-medium px-3.5 py-1.5 rounded-lg border border-[var(--border)] bg-white hover:bg-stone-50 text-[#1C1208] transition-colors shadow-xs no-underline inline-block"
          >
            Sign in
          </Link>
        </div>

        {/* ── HERO BANNER ── */}
        <div
          className="c-green m-4 p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6 rounded-xl relative overflow-hidden"
        >
          <div className="flex-1 space-y-3 z-10">
            <p
              className="font-semibold tracking-wider uppercase text-[11px] sm:text-[12px] m-0"
              style={{ color: "var(--text-secondary)" }}
            >
              FRESH FROM THE SHAMBA
            </p>
            <h1
              className="text-[22px] sm:text-[26px] md:text-[28px] font-bold text-[#1C1208] leading-tight max-w-[420px] m-0"
              style={{
                fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
              }}
            >
              Fresh produce, straight from Kenyan farmers to your table
            </h1>
            <p
              className="text-[13px] sm:text-[14px] leading-relaxed max-w-[420px] m-0"
              style={{ color: "var(--text-secondary)" }}
            >
              Buy seasonal vegetables, fruit, and dairy from a cooperative of small-scale farmers near you.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <Link
                href="/barn"
                className="inline-flex items-center justify-center font-medium text-[13px] sm:text-[14px] px-4.5 py-2 rounded-lg transition-all duration-200 shadow-xs hover:shadow-md hover:opacity-95 no-underline cursor-pointer"
                style={{
                  background: "var(--fill-primary)",
                  color: "var(--on-primary)",
                  border: "none",
                }}
              >
                Shop produce
              </Link>
              <Link
                href="/partners"
                className="inline-flex items-center justify-center font-medium text-[13px] sm:text-[14px] px-4.5 py-2 rounded-lg bg-white/80 hover:bg-white text-[#1C1208] border border-[var(--border)] transition-colors no-underline cursor-pointer"
              >
                Meet our farmers
              </Link>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div
            className="w-full md:w-[240px] h-[160px] rounded-xl overflow-hidden relative shadow-sm border border-emerald-800/10 flex items-center justify-center shrink-0 group"
            style={{ background: "var(--surface-2)" }}
          >
            <Image
              src="/images/vegetables.jpg"
              alt="Fresh harvest produce from Kenyan farms"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="240px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
            <div className="absolute top-2.5 right-2.5 bg-black/40 backdrop-blur-xs text-white p-1.5 rounded-lg">
              <i className="ti ti-photo text-base" aria-hidden="true" />
            </div>
            <div className="absolute bottom-2 left-3 text-white text-[11px] font-semibold tracking-wide uppercase drop-shadow-xs">
              Kajiado &bull; Kiambu
            </div>
          </div>
        </div>

        {/* ── THIS WEEK'S HARVEST ── */}
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-baseline mb-4 pb-2 border-b border-[var(--border)]">
            <h2
              className="text-lg sm:text-xl font-bold text-[#1C1208] m-0"
              style={{
                fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
              }}
            >
              This week&apos;s harvest
            </h2>
            <Link
              href="/barn"
              className="text-[13px] font-semibold hover:underline no-underline inline-flex items-center gap-1"
              style={{ color: "var(--text-accent)" }}
            >
              <span>View all</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* 4-Column Produce Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {items.map((item) => {
              const isAdded = addedId === item.id
              return (
                <div
                  key={item.id}
                  className="rounded-xl p-3 border transition-all duration-200 hover:shadow-md hover:border-emerald-700/30 flex flex-col justify-between group"
                  style={{
                    background: "var(--surface-2)",
                    borderColor: "var(--border)",
                  }}
                >
                  {/* Visual Top Preview */}
                  <Link href={item.link} className="no-underline block">
                    <div
                      className="h-[100px] rounded-lg mb-2.5 relative overflow-hidden flex items-center justify-center border border-[var(--border)]/60"
                      style={{ background: "var(--surface-1)" }}
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        />
                      ) : (
                        <i
                          className={`${item.icon} text-[24px]`}
                          style={{ color: "var(--text-muted)" }}
                          aria-hidden="true"
                        />
                      )}
                      {item.badge && (
                        <div className="absolute top-1.5 left-1.5 bg-white/90 backdrop-blur-xs text-[#1C1208] text-[9px] font-bold px-2 py-0.5 rounded shadow-2xs">
                          {item.badge}
                        </div>
                      )}
                      <div className="absolute bottom-1.5 right-1.5 bg-[#1C1208]/60 backdrop-blur-xs text-white p-1 rounded-md text-[11px] flex items-center justify-center">
                        <i className={item.icon} aria-hidden="true" />
                      </div>
                    </div>

                    {/* Information */}
                    <div>
                      <p className="text-[14px] font-bold text-[#1C1208] m-0 group-hover:text-[var(--text-accent)] transition-colors">
                        {item.name}
                      </p>
                      <p
                        className="text-[12px] font-medium mt-0.5 mb-2"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        KSh {item.price.toLocaleString()} / {item.unit}
                      </p>
                    </div>
                  </Link>

                  {/* Add Action Button */}
                  <button
                    onClick={(e) => handleAddToCart(item, e)}
                    type="button"
                    className="w-full text-[11px] font-bold py-1.5 px-3 rounded-lg border transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                    style={{
                      background: isAdded ? "var(--fill-primary)" : "var(--surface-1)",
                      color: isAdded ? "var(--on-primary)" : "#1C1208",
                      borderColor: isAdded ? "var(--fill-primary)" : "var(--border)",
                    }}
                  >
                    {isAdded ? (
                      <>
                        <i className="ti ti-check" />
                        <span>Added to cart</span>
                      </>
                    ) : (
                      <>
                        <i className="ti ti-plus" />
                        <span>Add to cart</span>
                      </>
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── COMMUNITY & VALUE PILLARS (2 Columns) ── */}
        <div className="px-6 pb-6 sm:px-8 sm:pb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Partner Farms Card */}
          <div
            className="c-amber rounded-xl p-5 flex items-start gap-4 transition-transform duration-200 hover:-translate-y-0.5 shadow-xs"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-100/80 border border-amber-300 flex items-center justify-center text-[#8E5E16] shrink-0 text-xl">
              <i className="ti ti-users-group text-[22px]" aria-hidden="true" />
            </div>
            <div>
              <p className="font-bold text-[15px] m-0 mb-1 text-[#4A2D02]">
                40+ partner farms
              </p>
              <p className="text-[13px] m-0 text-[#6B4B18] leading-relaxed">
                Every purchase supports a local cooperative directly with guaranteed fair-market prices.
              </p>
            </div>
          </div>

          {/* Same-Day Delivery Card */}
          <div
            className="c-teal rounded-xl p-5 flex items-start gap-4 transition-transform duration-200 hover:-translate-y-0.5 shadow-xs"
          >
            <div className="w-10 h-10 rounded-lg bg-teal-100/80 border border-teal-300 flex items-center justify-center text-[#0D6E67] shrink-0 text-xl">
              <i className="ti ti-truck-delivery text-[22px]" aria-hidden="true" />
            </div>
            <div>
              <p className="font-bold text-[15px] m-0 mb-1 text-[#094843]">
                Same-day delivery
              </p>
              <p className="text-[13px] m-0 text-[#13615A] leading-relaxed">
                Ordered by 10am, harvested and delivered today fresh to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
