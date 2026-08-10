"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Check, Heart, Star, Zap } from "lucide-react"
import { imageForCategory } from "@/lib/images"
import { useCart } from "@/components/shared/CartContext"
import { useState } from "react"

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
  "Beef Cuts": "🥩",
  "Dairy Products": "🥛",
  "Vegetables": "🥬",
  "Fruits": "🍋",
  "Ranch Box": "📦",
  "Goat Meat": "🐐",
  "Sheep Meat": "🐑",
}

const categoryColors: Record<string, string> = {
  "Beef Cuts": "from-red-900 to-amber-900",
  "Dairy Products": "from-blue-900 to-cyan-900",
  "Vegetables": "from-green-900 to-emerald-900",
  "Fruits": "from-yellow-900 to-orange-900",
  "Ranch Box": "from-purple-900 to-indigo-900",
  "Goat Meat": "from-amber-900 to-stone-900",
  "Sheep Meat": "from-stone-900 to-zinc-900",
}

export default function ProductCard({ product, dark }: Props) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const icon = categoryIcons[product.category.name] || "🌿"
  const gradientFallback = categoryColors[product.category.name] || "from-stone-900 to-amber-900"
  const src = product.image ?? imageForCategory(product.category.name)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
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
    setTimeout(() => setAdded(false), 2500)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlist((v) => !v)
  }

  return (
    <div className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 ease-out
      ${dark
        ? "bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#C4882A]/50 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        : "bg-white border border-black/5 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
      }
      hover:-translate-y-2`}
    >
      {/* Image container */}
      <Link href={`/barn/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradientFallback} text-6xl`}>
            {icon}
          </div>
        )}

        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top left: category chip */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/10 shadow-lg">
          <span>{icon}</span>
          <span className="tracking-wide">{product.category.name}</span>
        </div>

        {/* Top right: wishlist + stock */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
          <button
            onClick={handleWishlist}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 shadow-lg ${
              wishlist
                ? "bg-rose-500 border-rose-400 text-white scale-110"
                : "bg-black/50 border-white/20 text-white/80 hover:bg-rose-500/80 hover:border-rose-400 hover:scale-110"
            }`}
          >
            <Heart size={14} fill={wishlist ? "white" : "none"} />
          </button>

          {!product.inStock && (
            <span className="bg-red-500/90 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-lg tracking-widest uppercase">
              Sold Out
            </span>
          )}

          {product.inStock && (
            <span className="bg-emerald-500/90 backdrop-blur-md text-white text-[9px] font-semibold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
              <Zap size={9} />
              In Stock
            </span>
          )}
        </div>

        {/* Bottom: quick-add button on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          {product.inStock && (
            <button
              onClick={handleAdd}
              className={`w-full py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-xl
                ${added
                  ? "bg-emerald-500 text-white"
                  : "bg-[#C4882A] text-[#1C1208] hover:bg-[#D99A30]"
                }`}
            >
              {added ? (
                <>
                  <Check size={14} />
                  Added to Basket!
                </>
              ) : (
                <>
                  <ShoppingBag size={14} />
                  Quick Add
                </>
              )}
            </button>
          )}
        </div>
      </Link>

      {/* Card body */}
      <Link href={`/barn/${product.slug}`} className="flex flex-col flex-1 p-4">
        {/* Rating row */}
        <div className="flex items-center gap-1 mb-2">
          {[1,2,3,4,5].map((s) => (
            <Star key={s} size={10} className={s <= 4 ? "text-[#C4882A] fill-[#C4882A]" : "text-gray-300 fill-gray-300"} />
          ))}
          <span className="text-[10px] text-gray-400 ml-1">Farm fresh</span>
        </div>

        <h3 className={`font-bold text-base leading-snug group-hover:text-[#C4882A] transition-colors duration-200 mb-1 line-clamp-2 ${dark ? "text-white" : "text-[#1C1208]"}`}>
          {product.name}
        </h3>

        <p className={`text-[11px] leading-relaxed mb-3 line-clamp-1 ${dark ? "text-white/50" : "text-[#1C1208]/50"}`}>
          Ranch-direct · Osotua Farming, Kajiado
        </p>

        {/* Price + add button */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="text-[9px] font-semibold text-[#C4882A] uppercase tracking-widest mb-0.5">Price</div>
            <div className={`font-black text-lg leading-none ${dark ? "text-[#C4882A]" : "text-[#1C1208]"}`}>
              KES {product.price.toLocaleString()}
              <span className={`font-normal text-[11px] ml-1 ${dark ? "text-white/40" : "text-[#1C1208]/40"}`}>/{product.unit}</span>
            </div>
          </div>

          {product.inStock ? (
            <button
              onClick={handleAdd}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md flex-shrink-0 ${
                added
                  ? "bg-emerald-500 text-white scale-110"
                  : "bg-[#C4882A] text-[#1C1208] hover:bg-[#D99A30] hover:scale-110 active:scale-95"
              }`}
            >
              {added ? <Check size={16} /> : <ShoppingBag size={16} />}
            </button>
          ) : (
            <span className="text-[9px] font-semibold text-red-400 bg-red-50 border border-red-200 px-2.5 py-1.5 rounded-lg">
              Unavailable
            </span>
          )}
        </div>
      </Link>
    </div>
  )
}
