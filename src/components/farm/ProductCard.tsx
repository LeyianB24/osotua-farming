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

const categoryIcons: Record<string, string> = {
  "Beef Cuts":      "bi-basket3",
  "Dairy Products": "bi-droplet-fill",
  "Vegetables":     "bi-tree-fill",
  "Fruits":         "bi-flower1",
  "Ranch Box":      "bi-box-seam",
  "Goat Meat":      "bi-scissors",
  "Sheep Meat":     "bi-scissors",
}

export default function ProductCard({ product, dark }: Props) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const src = product.image ?? imageForCategory(product.category.name)
  const icon = categoryIcons[product.category.name] || "bi-bag"

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

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setWishlist((v) => !v)
  }

  return (
    <div className="group h-full flex flex-col justify-between rounded-3xl p-5 bg-[#FFFFFF] border border-[#C4882A]/25 hover:border-[#C4882A] shadow-lg shadow-[#1C1208]/04 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300">
      
      {/* ── IMAGE SECTION ── */}
      <div>
        <Link
          href={`/barn/${product.slug}`}
          className="relative block w-full h-52 rounded-2xl bg-[#FAF5EB] border border-[#C4882A]/15 overflow-hidden mb-4"
        >
          {src ? (
            <Image
              src={src}
              alt={product.name}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover group-hover:scale-108 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#C4882A]/40">
              <i className={`bi ${icon} text-5xl`} />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category Tag Top Left */}
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#1C1208]/80 text-[#FFFFFF] backdrop-blur-md border border-white/20 shadow-xs">
            <i className={`bi ${icon} text-[#D99A30]`} />
            <span>{product.category.name}</span>
          </div>

          {/* Wishlist Button Top Right */}
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#1C1208]/75 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-red-400 transition-colors shadow-xs"
          >
            <i className={`bi ${wishlist ? "bi-heart-fill text-red-400" : "bi-heart"} text-xs`} />
          </button>

          {/* Stock Status Bottom Left */}
          <div
            className={`absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border shadow-xs ${
              product.inStock
                ? "bg-[#2E7D32]/90 text-white border-green-400/40"
                : "bg-red-800/90 text-white border-red-400/40"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-[#86efac]" : "bg-red-300"}`} />
            <span>{product.inStock ? "In Stock" : "Sold Out"}</span>
          </div>
        </Link>

        {/* ── CARD CONTENT ── */}
        <div className="space-y-1 mb-4">
          <span className="text-[10px] font-mono text-[#8E5E16] uppercase tracking-wider font-bold block">
            Ranch Direct &bull; Kajiado
          </span>
          <Link
            href={`/barn/${product.slug}`}
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "1.75rem",
              fontWeight: 400,
              lineHeight: 1.15,
              color: dark ? "#F5EFE4" : "#1C1208",
            }}
            className="group-hover:text-[#C4882A] transition-colors block"
          >
            {product.name}
          </Link>
        </div>
      </div>

      {/* ── CARD FOOTER ── */}
      <div className="pt-4 border-t border-[#C4882A]/15 flex items-center justify-between gap-3 mt-2">
        <div>
          <span className="text-[10px] font-mono text-[#786550] uppercase block">Price</span>
          <span className="font-mono text-base sm:text-lg font-bold text-[#1C1208]">
            KES {product.price.toLocaleString()}
            <span className="text-xs text-[#786550] font-normal ml-1">/{product.unit}</span>
          </span>
        </div>

        {product.inStock ? (
          <button
            type="button"
            onClick={handleAdd}
            className={`btn-primary py-2 px-3.5 text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer shrink-0 ${
              added ? "bg-[#2E7D32] border-[#2E7D32] text-white" : ""
            }`}
          >
            <i className={`bi ${added ? "bi-check-lg" : "bi-bag-plus-fill"}`} />
            <span>{added ? "Added" : "Add"}</span>
          </button>
        ) : (
          <span className="text-xs font-mono font-bold text-[#A0431E] bg-red-50 border border-red-200 py-1.5 px-3 rounded-full uppercase shrink-0">
            Sold Out
          </span>
        )}
      </div>

    </div>
  )
}
