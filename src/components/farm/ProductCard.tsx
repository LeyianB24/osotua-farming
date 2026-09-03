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

const categoryGradients: Record<string, string> = {
  "Beef Cuts":      "radial-gradient(ellipse at 40% 30%, rgba(160,67,30,0.4) 0%, rgba(28,18,8,0.95) 70%)",
  "Dairy Products": "radial-gradient(ellipse at 40% 30%, rgba(196,136,42,0.35) 0%, rgba(28,18,8,0.95) 70%)",
  "Vegetables":     "radial-gradient(ellipse at 40% 30%, rgba(61,107,62,0.4) 0%, rgba(15,25,12,0.95) 70%)",
  "Fruits":         "radial-gradient(ellipse at 40% 30%, rgba(196,136,42,0.3) 0%, rgba(28,18,8,0.95) 70%)",
  "Ranch Box":      "radial-gradient(ellipse at 40% 30%, rgba(59,37,6,0.5) 0%, rgba(28,18,8,0.95) 70%)",
  "Goat Meat":      "radial-gradient(ellipse at 40% 30%, rgba(61,107,62,0.3) 0%, rgba(20,30,15,0.95) 70%)",
  "Sheep Meat":     "radial-gradient(ellipse at 40% 30%, rgba(196,136,42,0.25) 0%, rgba(28,18,8,0.95) 70%)",
}

export default function ProductCard({ product, dark }: Props) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const src = product.image ?? imageForCategory(product.category.name)
  const icon = categoryIcons[product.category.name] || "bi-bag"
  const cardBg = categoryGradients[product.category.name] || categoryGradients["Beef Cuts"]

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
    setTimeout(() => setAdded(false), 2500)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setWishlist((v) => !v)
  }

  return (
    <div
      className="group"
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
        background: dark
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.92)",
        border: dark
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(28,18,8,0.08)",
        backdropFilter: dark ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: dark ? "blur(20px) saturate(180%)" : "none",
        boxShadow: dark
          ? "0 8px 32px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "0 2px 12px rgba(28,18,8,0.06)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = "translateY(-8px) scale(1.01)"
        el.style.boxShadow = dark
          ? "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(196,136,42,0.35), inset 0 1px 0 rgba(255,255,255,0.12)"
          : "0 24px 64px rgba(28,18,8,0.14), 0 0 0 1px rgba(196,136,42,0.2)"
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = ""
        el.style.boxShadow = dark
          ? "0 8px 32px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "0 2px 12px rgba(28,18,8,0.06)"
      }}
    >
      {/* Image area */}
      <Link href={`/barn/${product.slug}`} style={{ display: "block", position: "relative", overflow: "hidden", aspectRatio: "4/3", textDecoration: "none" }}>
        <div style={{ position: "absolute", inset: 0, background: cardBg }} />
        {src ? (
          <Image
            src={src}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className={`bi ${icon}`} style={{ fontSize: "4rem", color: "rgba(196,136,42,0.35)" }} />
          </div>
        )}

        {/* Overlay gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(28,18,8,0.85) 0%, rgba(28,18,8,0.1) 50%, transparent 100%)" }} />

        {/* Category badge */}
        <div
          style={{
            position: "absolute",
            top: "0.75rem",
            left: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.3rem 0.75rem",
            borderRadius: "100px",
            background: "rgba(28,18,8,0.72)",
            border: "1px solid rgba(255,255,255,0.1)",
            WebkitBackdropFilter: "blur(8px)",
            backdropFilter: "blur(8px)",
            color: "#F5EFE4",
            fontSize: "0.56rem",
            fontFamily: "var(--font-space-grotesk), monospace",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <i className={`bi ${icon}`} />
          {product.category.name}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: wishlist ? "#C4882A" : "rgba(28,18,8,0.65)",
            WebkitBackdropFilter: "blur(8px)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${wishlist ? "rgba(196,136,42,0.8)" : "rgba(255,255,255,0.12)"}`,
            color: wishlist ? "#1C1208" : "rgba(255,255,255,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <i className={`bi ${wishlist ? "bi-heart-fill" : "bi-heart"}`} style={{ fontSize: "0.85rem" }} />
        </button>

        {/* Stock badge */}
        <div
          style={{
            position: "absolute",
            bottom: "0.75rem",
            left: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: "0.25rem 0.65rem",
            borderRadius: "100px",
            background: product.inStock ? "rgba(61,107,62,0.85)" : "rgba(160,67,30,0.85)",
            border: `1px solid ${product.inStock ? "rgba(61,107,62,0.6)" : "rgba(160,67,30,0.5)"}`,
            color: "#F5EFE4",
            fontSize: "0.56rem",
            fontFamily: "var(--font-space-grotesk), monospace",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <i className={`bi ${product.inStock ? "bi-check-circle-fill" : "bi-x-circle-fill"}`} />
          {product.inStock ? "In Stock" : "Sold Out"}
        </div>
      </Link>

      {/* Card body container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "1.25rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-space-grotesk), monospace",
            fontSize: "0.56rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C4882A",
            marginBottom: "0.5rem",
          }}
        >
          {product.category.name}
        </div>

        <Link
          href={`/barn/${product.slug}`}
          className="hover:text-[#C4882A] transition-colors"
          style={{
            fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
            fontSize: "1.3rem",
            fontWeight: 400,
            color: dark ? "#F5EFE4" : "#1C1208",
            lineHeight: 1.2,
            marginBottom: "0.4rem",
            textDecoration: "none",
          }}
        >
          {product.name}
        </Link>

        <div style={{ color: dark ? "rgba(245,239,228,0.4)" : "rgba(28,18,8,0.4)", fontSize: "0.78rem", marginBottom: "1rem" }}>
          Ranch-direct &bull; Osotua Farming, Kajiado
        </div>

        {/* Price + Add button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: "1rem",
            borderTop: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(28,18,8,0.06)",
          }}
        >
          <div>
            <div style={{
              fontFamily: "var(--font-space-grotesk), monospace",
              fontSize: "0.52rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: dark ? "rgba(245,239,228,0.3)" : "rgba(28,18,8,0.35)",
              marginBottom: "0.2rem",
            }}>
              Price
            </div>
            <div style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "1.5rem",
              fontWeight: 500,
              color: "#C4882A",
              lineHeight: 1,
            }}>
              KES {product.price.toLocaleString()}
              <span style={{ fontSize: "0.75rem", fontWeight: 300, color: dark ? "rgba(245,239,228,0.35)" : "rgba(28,18,8,0.35)", marginLeft: "4px" }}>
                /{product.unit}
              </span>
            </div>
          </div>

          {product.inStock ? (
            <button
              type="button"
              onClick={handleAdd}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                background: added
                  ? "rgba(61,107,62,0.15)"
                  : "rgba(196,136,42,0.15)",
                border: added
                  ? "1px solid rgba(61,107,62,0.35)"
                  : "1px solid rgba(196,136,42,0.35)",
                color: added ? "#2E7D32" : "#8E5E16",
                borderRadius: "100px",
                padding: "0.6rem 1.1rem",
                fontSize: "0.68rem",
                fontFamily: "var(--font-space-grotesk), monospace",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              <i className={`bi ${added ? "bi-check-lg" : "bi-bag-plus-fill"}`} style={{ fontSize: "0.9rem" }} />
              {added ? "Added!" : "Add"}
            </button>
          ) : (
            <span style={{
              fontSize: "0.62rem",
              fontFamily: "var(--font-space-grotesk), monospace",
              color: "#A0431E",
              background: "rgba(160,67,30,0.08)",
              border: "1px solid rgba(160,67,30,0.2)",
              borderRadius: "100px",
              padding: "0.4rem 0.8rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              Sold Out
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
