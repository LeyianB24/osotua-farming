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
    <div style={{ background: "#FBF7F0", minHeight: "100vh" }} className="pt-28 pb-24 text-[#1C1208]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#786550] mb-8 font-mono">
          <Link href="/shop" className="hover:text-[#C4882A] transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span>{product.category.name}</span>
          <span>/</span>
          <span className="text-[#1C1208] font-bold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-6 sm:p-10 shadow-xl shadow-[#1C1208]/04">
          
          {/* Left: Product Media */}
          <div className="w-full h-80 sm:h-96 bg-[#FAF5EB] border border-[#C4882A]/20 rounded-2xl relative overflow-hidden flex items-center justify-center">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <i className="bi bi-box-seam text-6xl text-[#C4882A]/40" />
            )}
          </div>

          {/* Right: Info & Purchase Controls */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-[#2E7D32] bg-[#2E7D32]/12 border border-[#2E7D32]/30 mb-3 uppercase tracking-wider">
                <i className="bi bi-check-circle-fill text-[10px]" />
                Fresh Harvest — {product.inStock ? "Available" : "Sold Out"} ({product.stockQty || 25} {product.unit} on hand)
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1208] font-normal mb-1">
                {product.name}
              </h1>

              <div className="text-xs font-mono text-[#8E5E16] mb-4">
                Sourced &amp; Packed by{" "}
                <span className="font-bold underline">{farmName}</span>
              </div>

              <div className="font-mono text-2xl font-bold text-[#1C1208] mb-6">
                KES {product.price.toLocaleString()}
                <span className="text-xs text-[#786550] font-normal ml-1.5 font-sans">
                  /{product.unit}
                </span>
              </div>

              <p className="text-xs text-[#5C4835] leading-relaxed border-t border-b border-[#C4882A]/15 py-4">
                {product.description ||
                  "Sourced directly from partner smallholder cooperatives. Freshly harvested, sorted, and packed under rigorous hygiene and temperature-controlled standards."}
              </p>
            </div>

            {/* Quantity & CTA */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[#8E5E16] uppercase font-bold">Quantity:</span>
                <div className="flex items-center border border-[#C4882A]/30 rounded-xl bg-[#FAF5EB] overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center text-[#1C1208] font-bold hover:bg-[#C4882A]/20 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-xs font-mono font-bold text-[#1C1208]">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-9 h-9 flex items-center justify-center text-[#1C1208] font-bold hover:bg-[#C4882A]/20 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`btn-primary w-full py-3.5 text-xs font-mono uppercase tracking-wider font-bold shadow-lg shadow-[#C4882A]/25 cursor-pointer flex items-center justify-center gap-2 ${
                  added ? "bg-[#2E7D32] border-[#2E7D32] text-white" : ""
                }`}
              >
                {added ? (
                  <>
                    <i className="bi bi-check-lg" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-bag-plus-fill" />
                    <span>Add to Cart &bull; KES {(product.price * qty).toLocaleString()}</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-mono text-[#786550]">
                <div className="flex items-center gap-1.5">
                  <i className="bi bi-truck text-[#2E7D32]" />
                  <span>Same-Day Cold Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <i className="bi bi-shield-check text-[#C4882A]" />
                  <span>100% Farmer Guaranteed</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
