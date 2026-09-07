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
      className="group bg-white rounded-3xl border border-[#EDE6D6] overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-700/30 transition-all duration-500 flex flex-col justify-between h-full"
    >
      {/* ── IMAGE SECTION WITH MINIMALIST LUXURY BADGES ── */}
      <div>
        <Link
          href={`/barn/${product.slug}`}
          className="relative block h-60 sm:h-68 w-full bg-stone-100 overflow-hidden"
        >
          {src ? (
            <Image
              src={src}
              alt={product.name}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-400">
              <i className="bi bi-basket text-4xl" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Top-left: Category */}
          <div className="absolute top-4 left-4 bg-[#14100A]/80 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/15 shadow-sm">
            {product.category.name}
          </div>

          {/* Top-right: Status */}
          <div
            className={`absolute top-4 right-4 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${
              product.inStock ? "bg-[#2E6B34]/95 backdrop-blur-md" : "bg-red-800/90 backdrop-blur-md"
            }`}
          >
            {product.inStock ? "In Stock" : "Sold Out"}
          </div>
        </Link>

        {/* ── CARD CONTENT ── */}
        <div className="p-7 pb-3 space-y-2">
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#8E5E16]">
            {product.category.name} &bull; Farm Fresh
          </div>
          <Link
            href={`/barn/${product.slug}`}
            className="text-2xl font-normal text-[#1C1208] leading-tight block hover:text-[#2E6B34] transition-colors no-underline m-0"
            style={{
              fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
            }}
          >
            {product.name}
          </Link>
        </div>
      </div>

      {/* ── CARD FOOTER ── */}
      <div className="p-7 pt-4 flex justify-between items-center border-t border-stone-100 mt-3">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C8475]">
            FARM GATE PRICE
          </div>
          <div
            className="text-xl font-bold text-[#1C1208] mt-0.5"
            style={{
              fontFamily: "var(--font-fraunces, 'Fraunces'), serif",
            }}
          >
            KES {product.price.toLocaleString()}
            <span className="text-xs font-semibold text-[#8C8475] ml-1">
              /{product.unit}
            </span>
          </div>
        </div>

        {product.inStock ? (
          <button
            type="button"
            onClick={handleAdd}
            className={`text-[11px] font-bold py-2.5 px-5 rounded-xl tracking-wider uppercase transition-all duration-300 border cursor-pointer shrink-0 ${
              added
                ? "bg-[#2E6B34] text-white border-[#2E6B34] shadow-sm"
                : "bg-[#FBF7F0] hover:bg-[#2E6B34] text-[#1C1208] hover:text-white border-[#EDE6D6] hover:border-[#2E6B34]"
            }`}
          >
            {added ? "✓ ADDED" : "+ ADD TO BASKET"}
          </button>
        ) : (
          <span
            className="bg-stone-100 text-stone-500 text-[10px] font-bold py-2 px-4 rounded-xl uppercase tracking-wider"
          >
            Sold Out
          </span>
        )}
      </div>

    </div>
  )
}
