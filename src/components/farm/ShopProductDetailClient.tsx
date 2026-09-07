"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/shared/CartContext"

interface ProductDetailProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    unit: string
    image?: string | null
    description: string
    inStock: boolean
    stockQty: number
    category: { id: string; name: string; slug: string }
  }
}

export default function ShopProductDetailClient({ product }: ProductDetailProps) {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: product.image || undefined,
        categoryName: product.category.name,
        type: "product",
      },
      qty
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  // Derive cooperative name based on product
  const farmName = product.name.toLowerCase().includes("sukuma") || product.name.toLowerCase().includes("spinach") || product.name.toLowerCase().includes("maize")
    ? "Kiambu Greens Cooperative"
    : product.name.toLowerCase().includes("milk") || product.name.toLowerCase().includes("avocado")
    ? "Nakuru Farms Cooperative"
    : "Kajiado Smallholder Cooperative"

  return (
    <div className="w-full min-h-screen bg-[#F5F0E8] text-[#1C1208] pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[11px] text-[#8E7E70] mb-8 font-mono tracking-wider uppercase">
          <Link href="/shop" className="hover:text-[#C99A2E] transition-colors font-bold">
            Shop
          </Link>
          <span>/</span>
          <span>{product.category.name}</span>
          <span>/</span>
          <span className="text-[#1C1208] font-semibold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] p-6 sm:p-10 shadow-sm">
          
          {/* Left: Product Media */}
          <div className="w-full h-80 sm:h-96 bg-[#1C1208] border border-[#D4C9B0] rounded-[2px] relative overflow-hidden flex items-center justify-center">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <i className="bi bi-box-seam text-6xl text-[#C99A2E]/40" />
            )}
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-mono font-bold tracking-[0.14em] uppercase px-2.5 py-1 bg-[#6B7A3F] text-white rounded-[2px]">
                {product.category.name}
              </span>
            </div>
          </div>

          {/* Right: Info & Purchase Controls */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] text-[10px] font-mono font-bold text-[#6B7A3F] bg-[#6B7A3F]/12 border border-[#6B7A3F]/30 mb-3 uppercase tracking-wider">
                <i className="bi bi-check-circle-fill text-[10px]" />
                Fresh Harvest &bull; {product.inStock ? "Available" : "Sold Out"} ({product.stockQty || 25} {product.unit} on hand)
              </div>

              <h1
                className="text-3xl sm:text-4xl text-[#1C1208] font-bold mb-2"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                {product.name}
              </h1>

              <div className="text-xs font-mono text-[#C99A2E] font-bold uppercase tracking-wider mb-4">
                Sourced &amp; Packed by{" "}
                <span className="underline">{farmName}</span>
              </div>

              <div
                className="text-3xl font-bold text-[#C4602A] mb-6"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                KES {product.price.toLocaleString()}
                <span className="text-xs text-[#8E7E70] font-normal ml-1.5 font-mono">
                  /{product.unit}
                </span>
              </div>

              <p className="text-sm text-[#5C4A2A] leading-relaxed border-t border-b border-[#D4C9B0] py-4 font-normal">
                {product.description ||
                  "Sourced directly from partner smallholder cooperatives. Freshly harvested, sorted, and packed under rigorous hygiene and temperature-controlled standards."}
              </p>
            </div>

            {/* Quantity & CTA */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[#5C4A2A] uppercase font-bold tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#D4C9B0] rounded-[2px] bg-white overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center text-[#1C1208] font-bold hover:bg-[#EDE6DA] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-xs font-mono font-bold text-[#1C1208]">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-9 h-9 flex items-center justify-center text-[#1C1208] font-bold hover:bg-[#EDE6DA] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full btn-cart py-3.5 text-xs font-mono uppercase tracking-wider font-bold cursor-pointer flex items-center justify-center gap-2 ${
                  added ? "bg-[#6B7A3F] border-[#6B7A3F] text-white" : ""
                }`}
              >
                {added ? (
                  <>
                    <i className="bi bi-check-lg" />
                    <span>Added to Basket</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-bag-plus-fill" />
                    <span>Add to Basket &bull; KES {(product.price * qty).toLocaleString()}</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-mono text-[#8E7E70] uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <i className="bi bi-truck text-[#6B7A3F]" />
                  <span>Cold-Chain Transit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <i className="bi bi-shield-check text-[#C99A2E]" />
                  <span>100% Ranch Guaranteed</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
