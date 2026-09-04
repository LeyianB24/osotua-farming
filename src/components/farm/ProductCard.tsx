"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { imageForCategory } from "@/lib/images"
import { useCart } from "@/components/shared/CartContext"

interface Props {
  product: {
    id: string
    name: string
    slug: string
    price: number
    unit: string
    image: string | null
    inStock: boolean
    category: { name: string }
  }
  dark?: boolean
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const src = product.image ?? imageForCategory(product.category.name)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!product.inStock) return
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: src,
      categoryName: product.category.name,
      type: "product",
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #EDE6D6",
      }}
      className="group overflow-hidden shadow-xs hover:shadow-lg hover:border-[#C4922E]/40 transition-all flex flex-col justify-between h-full"
    >
      {/* ── IMAGE SECTION WITH BADGES ── */}
      <div>
        <Link
          href={`/barn/${product.slug}`}
          className="relative block h-48 sm:h-52 w-full bg-stone-100 overflow-hidden"
        >
          {src ? (
            <Image
              src={src}
              alt={product.name}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-400">
              <i className="bi bi-basket text-4xl" />
            </div>
          )}

          {/* Top-left: Category pill */}
          <div className="absolute top-3 left-3 bg-[#14100A]/70 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-[9.5px] font-bold uppercase tracking-wider">
            {product.category.name}
          </div>

          {/* Top-right: Status pill */}
          <div
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-[9.5px] font-bold uppercase tracking-wider text-white ${
              product.inStock ? "bg-[#3F6B3F]" : "bg-red-800"
            }`}
          >
            {product.inStock ? "IN STOCK" : "SOLD OUT"}
          </div>

          {/* Bottom-left: Origin pill */}
          <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white font-medium uppercase tracking-wider flex items-center gap-1.5 drop-shadow-md bg-[#14100A]/60 backdrop-blur-xs px-2.5 py-1 rounded-md max-w-[85%] truncate">
            <i className="bi bi-geo-alt-fill text-[#C4922E]" />
            <span>Kajiado Co-op</span>
          </div>
        </Link>

        {/* ── CARD CONTENT ── */}
        <div className="p-5 pb-2 space-y-1">
          <div
            style={{
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontSize: "10px",
              color: "#C4922E",
              fontWeight: 700,
            }}
          >
            {product.category.name}
          </div>
          <Link
            href={`/barn/${product.slug}`}
            style={{
              fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
              fontSize: "18px",
              color: "#211C15",
              lineHeight: 1.25,
              textDecoration: "none",
            }}
            className="truncate block hover:text-[#C4922E] transition-colors"
          >
            {product.name}
          </Link>
        </div>
      </div>

      {/* ── CARD FOOTER ── */}
      <div className="p-5 pt-3 flex justify-between items-center border-t border-stone-100 mt-2">
        <div>
          <div
            style={{
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontSize: "9px",
              color: "#6B6558",
              fontWeight: 600,
            }}
          >
            FARM GATE PRICE
          </div>
          <div
            style={{
              fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
              fontSize: "17px",
              color: "#211C15",
              fontWeight: 500,
              marginTop: "2px",
            }}
          >
            KES {product.price.toLocaleString()}
            <span style={{ fontSize: "12px", color: "#6B6558", fontWeight: 400, marginLeft: "4px" }}>
              /{product.unit}
            </span>
          </div>
        </div>

        {product.inStock ? (
          <button
            type="button"
            onClick={handleAdd}
            style={{
              background: added ? "#3F6B3F" : "#C4922E",
              color: added ? "#FFFFFF" : "#211C15",
              fontSize: "10px",
              padding: "7px 14px",
              borderRadius: "8px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
            }}
            className="hover:opacity-90 transition-all shrink-0"
          >
            {added ? "✓ ADDED" : "+ ADD"}
          </button>
        ) : (
          <span
            style={{
              background: "#EDE6D6",
              color: "#8A7560",
              fontSize: "9px",
              padding: "5px 10px",
              borderRadius: "6px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Sold Out
          </span>
        )}
      </div>

    </div>
  )
}
