"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/shared/CartContext"

export interface ShopProduct {
  id: string
  name: string
  slug: string
  price: number
  unit: string
  image?: string | null
  category: { id: string; name: string; slug: string }
  farmName?: string
  inStock: boolean
  stockQty?: number
}

const DEFAULT_FARMS = ["Kajiado co-op", "Nakuru farms", "Kiambu greens"]

export default function ShopClient({
  initialProducts,
}: {
  initialProducts: ShopProduct[]
}) {
  const { addToCart } = useCart()
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All produce")
  const [selectedFarms, setSelectedFarms] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("freshest")
  const [addedId, setAddedId] = useState<string | null>(null)

  // Derive cooperative farm assignment for each product if missing
  const getProductFarm = (p: ShopProduct) => {
    if (p.farmName) return p.farmName
    const lower = p.name.toLowerCase()
    if (lower.includes("sukuma") || lower.includes("spinach") || lower.includes("maize") || lower.includes("greens")) {
      return "Kiambu greens"
    }
    if (lower.includes("milk") || lower.includes("avocado") || lower.includes("fruit") || lower.includes("dorper")) {
      return "Nakuru farms"
    }
    return "Kajiado co-op"
  }

  const handleFarmToggle = (farm: string) => {
    setSelectedFarms((prev) =>
      prev.includes(farm) ? prev.filter((f) => f !== farm) : [...prev, farm]
    )
  }

  // Filter & Sort
  const filteredProducts = initialProducts
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.name.toLowerCase().includes(search.toLowerCase())

      const farm = getProductFarm(p)
      const matchesFarm = selectedFarms.length === 0 || selectedFarms.includes(farm)

      const matchesCat =
        selectedCategory === "All produce" ||
        p.category.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === "Dairy and eggs" && (p.name.toLowerCase().includes("milk") || p.name.toLowerCase().includes("egg") || p.name.toLowerCase().includes("ghee"))) ||
        (selectedCategory === "Grains" && (p.name.toLowerCase().includes("flour") || p.name.toLowerCase().includes("grain") || p.name.toLowerCase().includes("maize"))) ||
        (selectedCategory === "Fruit" && (p.category.name.toLowerCase().includes("fruit") || p.name.toLowerCase().includes("avocado"))) ||
        (selectedCategory === "Vegetables" && (p.category.name.toLowerCase().includes("vegetable") || p.name.toLowerCase().includes("tomato") || p.name.toLowerCase().includes("sukuma")))

      return matchesSearch && matchesFarm && matchesCat
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      return 0
    })

  const handleAddToCart = (product: ShopProduct) => {
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
      1
    )
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1200)
  }

  return (
    <div style={{ background: "#FBF7F0", minHeight: "100vh" }} className="pt-28 pb-24 text-[#1C1208]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#FFFFFF] via-[#FAF5EB] to-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-6 sm:p-10 shadow-lg shadow-[#1C1208]/04 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#C4882A]/12 border border-[#C4882A]/30 text-[#8E5E16] mb-2">
            <i className="bi bi-basket3-fill text-[#C4882A]" />
            Farm-to-Table Marketplace
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#1C1208",
            }}
          >
            Direct Cooperative Produce Store
          </h1>
          <p className="text-xs text-[#5C4835] font-mono mt-1 max-w-xl">
            Sourced daily from smallholder farmers in Kajiado, Nakuru, and Kiambu. Pesticide-free, organic, and cold-chain dispatched.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT SIDEBAR FILTERS ── */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* Category Pills Card */}
            <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[10px] font-mono tracking-widest uppercase text-[#8E5E16] font-bold mb-3 pb-2 border-b border-[#C4882A]/15">
                Categories
              </h3>
              <div className="flex flex-col space-y-1">
                {[
                  "All produce",
                  "Vegetables",
                  "Fruit",
                  "Dairy and eggs",
                  "Grains",
                ].map((cat) => {
                  const active = selectedCategory === cat
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        active
                          ? "bg-[#C4882A] text-white font-bold shadow-xs"
                          : "text-[#5C4835] hover:text-[#1C1208] hover:bg-[#FAF5EB]"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Farm Cooperative Filters */}
            <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[10px] font-mono tracking-widest uppercase text-[#8E5E16] font-bold mb-3 pb-2 border-b border-[#C4882A]/15">
                Partner Cooperatives
              </h3>
              <div className="flex flex-col space-y-2.5">
                {DEFAULT_FARMS.map((farm) => {
                  const checked = selectedFarms.includes(farm)
                  return (
                    <label
                      key={farm}
                      className="flex items-center gap-2.5 text-xs text-[#1C1208] hover:text-[#C4882A] cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleFarmToggle(farm)}
                        className="w-4 h-4 rounded border-[#C4882A]/40 bg-[#FAF5EB] text-[#C4882A] focus:ring-0 cursor-pointer accent-[#C4882A]"
                      />
                      <span className="font-medium">{farm}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* ── MAIN PRODUCT GRID ── */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar */}
            <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:max-w-md">
                <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E5E16] text-xs" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search harvest by name or variety..."
                  className="w-full bg-[#FAF5EB] border border-[#C4882A]/25 rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#1C1208] placeholder-[#786550] outline-none focus:border-[#C4882A]"
                />
              </div>

              <div className="w-full sm:w-auto flex items-center justify-end gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FAF5EB] border border-[#C4882A]/25 rounded-xl px-3.5 py-2.5 text-xs text-[#1C1208] font-medium outline-none focus:border-[#C4882A] cursor-pointer"
                >
                  <option value="freshest">Sort: Freshest Harvest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Cards */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product) => {
                  const farm = getProductFarm(product)
                  const isAdded = addedId === product.id

                  return (
                    <div
                      key={product.id}
                      className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-5 shadow-lg shadow-[#1C1208]/04 hover:border-[#C4882A] hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Media container */}
                        <Link
                          href={`/shop/${product.slug || product.id}`}
                          className="w-full h-44 rounded-2xl bg-[#FAF5EB] border border-[#C4882A]/15 relative overflow-hidden mb-3.5 block"
                        >
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#C4882A]">
                              <i className="bi bi-basket text-4xl" />
                            </div>
                          )}
                        </Link>

                        {/* Farm name badge */}
                        <div className="text-[10px] font-mono text-[#2E7D32] font-bold uppercase tracking-wider mb-1">
                          <i className="bi bi-geo-alt-fill mr-1" />
                          {farm}
                        </div>

                        {/* Title */}
                        <Link
                          href={`/shop/${product.slug || product.id}`}
                          className="font-serif text-lg font-normal text-[#1C1208] hover:text-[#C4882A] transition-colors block leading-tight mb-2 truncate"
                        >
                          {product.name}
                        </Link>
                      </div>

                      {/* Price & Add to Cart */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#C4882A]/15 mt-2">
                        <div>
                          <span className="font-mono text-sm font-bold text-[#1C1208]">
                            KES {product.price}
                            <span className="text-[11px] text-[#786550] font-normal ml-1">/{product.unit}</span>
                          </span>
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          aria-label={`Add ${product.name} to cart`}
                          className={`btn-primary py-1.5 px-3 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                            isAdded
                              ? "bg-[#2E7D32] border-[#2E7D32] text-white"
                              : "shadow-xs"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <i className="bi bi-check-lg" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <i className="bi bi-plus-lg" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-12 text-center text-[#786550] text-xs font-mono">
                <i className="bi bi-basket text-4xl text-[#C4882A]/40 block mb-2" />
                No produce items found matching your filters.
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  )
}
