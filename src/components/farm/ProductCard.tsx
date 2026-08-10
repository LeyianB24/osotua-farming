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
  "Beef Cuts":      "bi-basket",
  "Dairy Products": "bi-droplet",
  "Vegetables":     "bi-tree",
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
    <div
      className={`group relative flex flex-col rounded overflow-hidden transition-all duration-300 hover:-translate-y-1.5 border ${
        dark
          ? "bg-[#F5EFE4]/05 border-[#F5EFE4]/10 hover:border-[#C4882A]/40 hover:shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
          : "bg-white border-black/8 hover:border-[#C4882A]/40 hover:shadow-[0_24px_64px_rgba(28,18,8,0.12)]"
      }`}
    >
      {/* Image area */}
      <Link href={`/barn/${product.slug}`} className="block relative overflow-hidden aspect-[4/3]">
        {src ? (
          <Image
            src={src}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: dark ? "#2D1F0E" : "#F5EFE4" }}>
            <i className={`bi ${icon}`} style={{ fontSize: "3rem", color: "#C4882A", opacity: 0.6 }} />
          </div>
        )}

        {/* Category badge — top left */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5"
          style={{
            background: "rgba(28,18,8,0.75)",
            backdropFilter: "blur(8px)",
            color: "#F5EFE4",
            fontSize: "0.58rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "0.3rem 0.7rem",
            borderRadius: "2px",
          }}
        >
          <i className={`bi ${icon}`} style={{ fontSize: "0.75rem" }} />
          {product.category.name}
        </div>

        {/* Wishlist — top right */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3"
          style={{
            width: "32px", height: "32px",
            borderRadius: "2px",
            background: wishlist ? "#C4882A" : "rgba(28,18,8,0.65)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: wishlist ? "#1C1208" : "rgba(255,255,255,0.8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <i className={`bi ${wishlist ? "bi-heart-fill" : "bi-heart"}`} style={{ fontSize: "0.85rem" }} />
        </button>

        {/* Stock badge */}
        <div
          className="absolute bottom-3 left-3"
          style={{
            background: product.inStock ? "rgba(61,107,62,0.9)" : "rgba(160,67,30,0.9)",
            color: "#F5EFE4",
            fontSize: "0.56rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "0.2rem 0.6rem",
            borderRadius: "2px",
          }}
        >
          {product.inStock ? (
            <><i className="bi bi-check-circle mr-1" />In Stock</>
          ) : (
            <><i className="bi bi-x-circle mr-1" />Sold Out</>
          )}
        </div>
      </Link>

      {/* Card body */}
      <Link href={`/barn/${product.slug}`} className="flex flex-col flex-1 no-underline p-5">
        {/* Category label */}
        <div className="eyebrow-plain mb-2" style={{ color: "#C4882A", fontSize: "0.57rem" }}>
          {product.category.name}
        </div>

        {/* Product name */}
        <div
          className="font-serif"
          style={{
            fontSize: "1.2rem",
            fontWeight: 400,
            color: dark ? "#F5EFE4" : "#1C1208",
            lineHeight: 1.3,
            marginBottom: "0.4rem",
          }}
        >
          {product.name}
        </div>

        <div style={{ color: "rgba(28,18,8,0.4)", fontSize: "0.78rem", marginBottom: "1rem" }}>
          Ranch-direct · Osotua Farming, Kajiado
        </div>

        {/* Price + Add button */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/6">
          <div>
            <div className="eyebrow-plain mb-0.5" style={{ color: "rgba(28,18,8,0.4)", fontSize: "0.54rem" }}>
              Price
            </div>
            <div
              className="font-serif"
              style={{ fontSize: "1.4rem", fontWeight: 500, color: dark ? "#C4882A" : "#1C1208", lineHeight: 1 }}
            >
              KES {product.price.toLocaleString()}
              <span style={{ fontSize: "0.75rem", fontWeight: 300, opacity: 0.5, marginLeft: "4px" }}>
                /{product.unit}
              </span>
            </div>
          </div>

          {product.inStock ? (
            <button
              onClick={handleAdd}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                background: added ? "#3D6B3E" : "#C4882A",
                color: added ? "#F5EFE4" : "#1C1208",
                border: "none",
                borderRadius: "2px",
                padding: "0.6rem 1rem",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <i className={`bi ${added ? "bi-check-lg" : "bi-bag-plus"}`} style={{ fontSize: "0.9rem" }} />
              {added ? "Added" : "Add"}
            </button>
          ) : (
            <span
              style={{
                fontSize: "0.65rem",
                color: "#A0431E",
                background: "rgba(160,67,30,0.08)",
                border: "1px solid rgba(160,67,30,0.25)",
                borderRadius: "2px",
                padding: "0.4rem 0.8rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Unavailable
            </span>
          )}
        </div>
      </Link>
    </div>
  )
}
