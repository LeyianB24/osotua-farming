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
    <div className="w-full min-h-screen bg-[#F5F0E8] text-[#1C1208] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] p-6 sm:p-10 shadow-sm mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#C99A2E] bg-[#C99A2E]/10 border border-[#C99A2E]/30 rounded-[2px] mb-3">
            <i className="bi bi-basket3-fill" />
            <span>FARM-TO-TABLE MARKETPLACE</span>
          </div>
          <h1
            className="text-3xl sm:text-5xl font-bold text-[#1C1208] leading-tight m-0"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            Direct Cooperative Produce Store
          </h1>
          <p className="text-sm text-[#5C4A2A] mt-2 max-w-xl font-normal">
            Sourced daily from smallholder pastoralists and growers in Kajiado, Nakuru, and Kiambu. Cold-chain dispatched.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT SIDEBAR FILTERS ── */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* Category Pills Card */}
            <div className="bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] p-5 shadow-sm">
              <h3 className="text-[10px] font-mono tracking-widest uppercase text-[#5C4A2A] font-bold mb-3 pb-2 border-b border-[#D4C9B0]">
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
                      className={`text-left px-3.5 py-2 rounded-[2px] text-xs font-semibold uppercase tracking-wider font-mono transition-all cursor-pointer ${
                        active
                          ? "bg-[#C99A2E] text-[#1C1208] shadow-xs"
                          : "text-[#5C4A2A] hover:text-[#1C1208] hover:bg-[#EDE6DA]"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Farm Cooperative Filters */}
            <div className="bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] p-5 shadow-sm">
              <h3 className="text-[10px] font-mono tracking-widest uppercase text-[#5C4A2A] font-bold mb-3 pb-2 border-b border-[#D4C9B0]">
                Partner Cooperatives
              </h3>
              <div className="flex flex-col space-y-2.5">
                {DEFAULT_FARMS.map((farm) => {
                  const checked = selectedFarms.includes(farm)
                  return (
                    <label
                      key={farm}
                      className="flex items-center gap-2.5 text-xs text-[#1C1208] hover:text-[#C99A2E] cursor-pointer select-none font-mono uppercase tracking-wider"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleFarmToggle(farm)}
                        className="w-4 h-4 rounded-[2px] border-[#D4C9B0] bg-white text-[#C99A2E] focus:ring-0 cursor-pointer accent-[#C99A2E]"
                      />
                      <span>{farm}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* ── MAIN PRODUCT GRID ── */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar */}
            <div className="bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:max-w-md">
                <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E7E70] text-xs" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search harvest by name or variety..."
                  className="w-full bg-[#FFFFFF] border border-[#D4C9B0] rounded-[2px] pl-9 pr-4 py-2 text-xs text-[#1C1208] placeholder-[#8E7E70] outline-none focus:border-[#C99A2E]"
                />
              </div>

              <div className="w-full sm:w-auto flex items-center justify-end gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#FFFFFF] border border-[#D4C9B0] rounded-[2px] px-3.5 py-2 text-xs text-[#1C1208] font-mono uppercase tracking-wider outline-none focus:border-[#C99A2E] cursor-pointer"
                >
                  <option value="freshest">Sort: Freshest Harvest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Cards */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const farm = getProductFarm(product)
                  const isAdded = addedId === product.id

                  return (
                    <div
                      key={product.id}
                      className="bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] p-5 shadow-sm hover:border-[#C99A2E] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Media container */}
                        <Link
                          href={`/shop/${product.slug || product.id}`}
                          className="w-full h-44 rounded-[2px] bg-[#1C1208] border border-[#D4C9B0] relative overflow-hidden mb-3.5 block"
                        >
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#C99A2E]">
                              <i className="bi bi-basket text-4xl" />
                            </div>
                          )}
                          <div className="absolute top-2.5 left-2.5">
                            <span className="text-[9px] font-mono font-bold tracking-[0.14em] uppercase px-2 py-0.5 bg-[#6B7A3F] text-white rounded-[2px]">
                              {farm}
                            </span>
                          </div>
                        </Link>

                        {/* Title */}
                        <Link
                          href={`/shop/${product.slug || product.id}`}
                          className="font-serif text-xl font-semibold text-[#1C1208] hover:text-[#C4602A] transition-colors block leading-tight mb-2 truncate"
                          style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                        >
                          {product.name}
                        </Link>
                      </div>

                      {/* Price & Add to Cart */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#D4C9B0]/70 mt-3">
                        <div>
                          <span
                            className="text-lg font-bold text-[#C4602A]"
                            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                          >
                            KES {product.price}
                          </span>
                          <span className="text-xs text-[#8E7E70] font-mono ml-1">/{product.unit}</span>
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          aria-label={`Add ${product.name} to cart`}
                          className={`btn-cart py-1.5 px-3 text-[11px] font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                            isAdded
                              ? "bg-[#6B7A3F] border-[#6B7A3F] text-white"
                              : ""
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
              <div className="bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] p-12 text-center text-[#8E7E70] text-xs font-mono uppercase tracking-wider">
                <i className="bi bi-basket text-4xl text-[#C99A2E]/40 block mb-2" />
                No produce items found matching your filters.
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  )
}
