"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface BreedData {
  id: string
  name: string
  speciesId: string
  purpose: string
  description: string
  origin: string
  maleWeight?: string | null
  femaleWeight?: string | null
  image?: string | null
  pricePerHead: number
  inStock: number
  featured: boolean
}

export default function AdminBreedEditForm({
  breed,
  speciesList,
}: {
  breed: BreedData
  speciesList: { id: string; name: string }[]
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: breed.name,
    speciesId: breed.speciesId,
    purpose: breed.purpose,
    description: breed.description,
    origin: breed.origin,
    maleWeight: breed.maleWeight || "",
    femaleWeight: breed.femaleWeight || "",
    image: breed.image || "",
    pricePerHead: breed.pricePerHead,
    inStock: breed.inStock,
    featured: breed.featured,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/breeds/${breed.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          pricePerHead: Number(formData.pricePerHead),
          inStock: Number(formData.inStock),
          image: formData.image || null,
        }),
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || "Failed to update breed")
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/admin/breeds")
        router.refresh()
      }, 1200)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error updating breed")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete "${breed.name}"?`)) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/breeds/${breed.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Delete failed")
      router.push("/admin/breeds")
      router.refresh()
    } catch {
      alert("Failed to delete breed")
      setDeleting(false)
    }
  }

  return (
    <div style={{ background: "#FBF7F0", minHeight: "100vh" }} className="p-6 sm:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/admin/breeds"
            className="font-mono text-[11px] text-[#8E5E16] uppercase tracking-wider font-bold hover:text-[#C4882A] inline-flex items-center gap-1.5"
          >
            <i className="bi bi-arrow-left" /> Back to Breeds
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="text-xs font-mono font-bold text-[#DC2626] bg-[#FEF2F2] border border-[#FCA5A5] px-3.5 py-2 rounded-xl hover:bg-[#FEE2E2] transition-colors"
          >
            {deleting ? "Deleting..." : "Delete Breed"}
          </button>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(196, 136, 42, 0.25)",
            borderRadius: "28px",
            boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
          }}
          className="p-8 sm:p-10"
        >
          <div className="eyebrow text-[#8E5E16] mb-1 font-bold">Livestock Registry</div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1208] font-light mb-6">
            Edit Breed: {breed.name}
          </h1>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs flex items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill text-[#DC2626]" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-[#2E7D32]/12 border border-[#2E7D32]/35 text-[#2E7D32] text-xs flex items-center gap-2">
              <i className="bi bi-check-circle-fill" />
              <span>Breed updated successfully! Redirecting...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                  Breed Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                  Species *
                </label>
                <select
                  required
                  value={formData.speciesId}
                  onChange={(e) => setFormData({ ...formData, speciesId: e.target.value })}
                  className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                >
                  {speciesList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                  Purpose / Commercial Use *
                </label>
                <input
                  type="text"
                  required
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                  Origin Country / Region *
                </label>
                <input
                  type="text"
                  required
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                  Male Weight Range
                </label>
                <input
                  type="text"
                  value={formData.maleWeight}
                  onChange={(e) => setFormData({ ...formData, maleWeight: e.target.value })}
                  placeholder="e.g. 700–850 kg"
                  className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                  Female Weight Range
                </label>
                <input
                  type="text"
                  value={formData.femaleWeight}
                  onChange={(e) => setFormData({ ...formData, femaleWeight: e.target.value })}
                  placeholder="e.g. 450–550 kg"
                  className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                  Price Per Head (KES) *
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={formData.pricePerHead}
                  onChange={(e) => setFormData({ ...formData, pricePerHead: Number(e.target.value) })}
                  className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                  Available Head in Stock *
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  value={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: Number(e.target.value) })}
                  className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/images/boran bulls.jpg or https://..."
                className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                Breed Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="featured-toggle"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 accent-[#C4882A]"
              />
              <label htmlFor="featured-toggle" className="text-xs text-[#1C1208] font-medium cursor-pointer">
                Feature on Homepage &amp; Top Catalogue
              </label>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-[#C4882A]/15">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary py-3 px-8 text-xs shadow-sm"
              >
                {loading ? "Saving Changes..." : "Update Breed"}
              </button>
              <Link href="/admin/breeds" className="btn-ghost text-xs py-3 px-6" style={{ color: "#1C1208" }}>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
