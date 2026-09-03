"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

interface Category {
  id: string
  name: string
}

export default function AdminProductCreateForm({
  categories,
}: {
  categories: Category[]
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    categoryId: categories[0]?.id || "",
    description: "",
    price: 1000,
    unit: "kg",
    image: "",
    inStock: true,
    stockQty: 25,
    featured: false,
  })

  // Auto-generate slug from name if not manually edited
  const handleNameChange = (val: string) => {
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: generatedSlug,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!formData.name.trim() || !formData.slug.trim()) {
      setError("Product name and slug are required.")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stockQty: Number(formData.stockQty),
          image: formData.image.trim() || null,
        }),
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || "Failed to create product")
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/admin/products")
        router.refresh()
      }, 1000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error creating product")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: "#FBF7F0", minHeight: "100vh" }} className="p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Navigation bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/admin/products"
            className="font-mono text-xs text-[#8E5E16] uppercase tracking-wider font-bold hover:text-[#C4882A] inline-flex items-center gap-2 bg-[#FFFFFF] px-4 py-2 rounded-xl border border-[#C4882A]/25 shadow-xs"
          >
            <i className="bi bi-arrow-left" /> Back to Product Catalogue
          </Link>
          <span className="text-xs font-mono text-[#786550]">
            Barn Store Inventory Management
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-8 sm:p-12 shadow-xl shadow-[#1C1208]/04">
          <div className="pb-6 border-b border-[#C4882A]/15 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#C4882A]/12 border border-[#C4882A]/30 text-[#8E5E16] mb-2">
                <i className="bi bi-plus-circle-fill text-[#C4882A]" />
                New Inventory Item
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1208] font-normal">
                Add Barn Store Product
              </h1>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs flex items-center gap-3">
              <i className="bi bi-exclamation-triangle-fill text-[#DC2626] text-lg shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-2xl bg-[#2E7D32]/12 border border-[#2E7D32]/35 text-[#2E7D32] text-xs flex items-center gap-3">
              <i className="bi bi-check-circle-fill text-lg shrink-0" />
              <span>Product successfully added to inventory! Redirecting to catalogue...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Name & Slug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Boran Ribeye Steak"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3.5 text-xs text-[#1C1208] outline-none focus:border-[#C4882A] focus:ring-1 focus:ring-[#C4882A]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                  URL Slug (Automated) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. boran-ribeye-steak"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3.5 text-xs font-mono text-[#1C1208] outline-none focus:border-[#C4882A] focus:ring-1 focus:ring-[#C4882A]"
                />
              </div>
            </div>

            {/* Row 2: Category & Unit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                  Category *
                </label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3.5 text-xs text-[#1C1208] outline-none focus:border-[#C4882A] focus:ring-1 focus:ring-[#C4882A]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                  Packaging / Unit *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. kg, 500g vacuum pack, 1L bottle, 350g jar"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3.5 text-xs text-[#1C1208] outline-none focus:border-[#C4882A] focus:ring-1 focus:ring-[#C4882A]"
                />
              </div>
            </div>

            {/* Row 3: Price & Initial Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                  Unit Price (KES) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#8E5E16]">
                    KES
                  </span>
                  <input
                    type="number"
                    required
                    min={0}
                    step={50}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl pl-14 pr-4 py-3.5 text-xs font-mono font-bold text-[#1C1208] outline-none focus:border-[#C4882A] focus:ring-1 focus:ring-[#C4882A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                  Initial Available Stock Quantity (Units) *
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={formData.stockQty}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stockQty: Number(e.target.value),
                      inStock: Number(e.target.value) > 0,
                    })
                  }
                  className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3.5 text-xs font-mono font-bold text-[#1C1208] outline-none focus:border-[#C4882A] focus:ring-1 focus:ring-[#C4882A]"
                />
              </div>
            </div>

            {/* Image URL & Live Preview */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                Product Image URL / Relative Path
              </label>
              <div className="flex gap-4 items-start">
                <input
                  type="text"
                  placeholder="/images/prime beef.jpg or https://images.unsplash.com/..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="flex-1 bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3.5 text-xs text-[#1C1208] outline-none focus:border-[#C4882A] focus:ring-1 focus:ring-[#C4882A]"
                />
                {formData.image && (
                  <div className="w-14 h-14 rounded-xl border border-[#C4882A]/30 overflow-hidden relative shrink-0 bg-[#FAF5EB]">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = "none"
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                Product Description &amp; Origin Notes *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Detail aging method (e.g. 28-day dry aged), pasture location, butchery cut specifications, and preservation guidance..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3.5 text-xs text-[#1C1208] outline-none focus:border-[#C4882A] focus:ring-1 focus:ring-[#C4882A]"
              />
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 accent-[#C4882A] rounded cursor-pointer"
                />
                <span className="text-xs font-bold text-[#1C1208]">
                  Available in Barn Store (Active for Orders)
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#C4882A] rounded cursor-pointer"
                />
                <span className="text-xs font-bold text-[#1C1208]">
                  Feature on Store Homepage &amp; Hero Carousel
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-6 border-t border-[#C4882A]/15">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary py-3 px-8 text-xs font-mono uppercase tracking-wider font-bold shadow-md shadow-[#C4882A]/25 cursor-pointer"
              >
                {loading ? (
                  <>
                    <i className="bi bi-arrow-repeat animate-spin mr-1.5" />
                    <span>Adding Product...</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-check2-circle mr-1.5" />
                    <span>Publish to Barn Store</span>
                  </>
                )}
              </button>
              <Link
                href="/admin/products"
                className="btn-ghost py-3 px-6 text-xs font-mono font-bold"
                style={{ color: "#1C1208" }}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
