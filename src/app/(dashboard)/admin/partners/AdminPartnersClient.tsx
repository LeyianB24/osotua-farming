"use client"

import { useState } from "react"
import Badge from "@/components/dashboard/Badge"

export interface PartnerFarmerItem {
  id: string
  fullName: string
  email: string
  phone: string
  location: string
  supplyType: string
  status: "PENDING" | "APPROVED" | "ACTIVE" | "SUSPENDED"
  createdAt: string
}

export default function AdminPartnersClient({
  initialPartners,
}: {
  initialPartners: PartnerFarmerItem[]
}) {
  const [partners, setPartners] = useState<PartnerFarmerItem[]>(initialPartners)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [actionSuccess, setActionSuccess] = useState<string | null>(null)

  const handleStatusChange = async (id: string, newStatus: PartnerFarmerItem["status"]) => {
    setUpdatingId(id)
    setActionSuccess(null)
    try {
      const res = await fetch(`/api/partners/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error("Failed to update status")
      const updated = await res.json()
      setPartners((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: updated.status } : p))
      )
      setActionSuccess(`Partner status updated to ${newStatus}`)
      setTimeout(() => setActionSuccess(null), 3000)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error updating partner status")
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from partner records?`)) return
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/partners/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete partner")
      setPartners((prev) => prev.filter((p) => p.id !== id))
      setActionSuccess("Partner removed successfully")
      setTimeout(() => setActionSuccess(null), 3000)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error deleting partner")
    } finally {
      setUpdatingId(null)
    }
  }

  const filtered = partners.filter((p) => {
    const matchesStatus = statusFilter === "ALL" || p.status === statusFilter
    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      p.fullName.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.phone.includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.supplyType.toLowerCase().includes(q)
    return matchesStatus && matchesSearch
  })

  const counts = {
    ALL: partners.length,
    PENDING: partners.filter((p) => p.status === "PENDING").length,
    APPROVED: partners.filter((p) => p.status === "APPROVED").length,
    ACTIVE: partners.filter((p) => p.status === "ACTIVE").length,
    SUSPENDED: partners.filter((p) => p.status === "SUSPENDED").length,
  }

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {actionSuccess && (
        <div className="p-3 bg-[#E8EEDC] border border-[#D2DCBE] text-[#486326] text-xs font-mono font-semibold rounded-[2px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="bi bi-check-circle-fill text-sm" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess(null)} className="text-[#486326] hover:opacity-75">
            <i className="bi bi-x text-base" />
          </button>
        </div>
      )}

      {/* Control Bar: Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-[2px] border border-[#E5DDD0] shadow-xs">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(["ALL", "PENDING", "APPROVED", "ACTIVE", "SUSPENDED"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider rounded-[2px] uppercase transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-[#D4A045] text-[#160F08] shadow-xs"
                  : "bg-[#FAF7F2] text-[#7A6C5B] border border-[#DDD4C4] hover:bg-[#EFE9DF]"
              }`}
            >
              {st} ({counts[st]})
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6C5B] text-xs pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, county..."
            className="w-full bg-[#FAF7F2] border border-[#DDD4C4] rounded-[2px] py-1.5 pl-8 pr-3 text-xs text-[#1A1208] outline-none focus:border-[#D4A045] transition-colors"
          />
        </div>
      </div>

      {/* Partners List / Table */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-[#E5DDD0] rounded-[2px] p-12 text-center shadow-xs">
          <i className="bi bi-tree text-3xl text-[#C48D2A] mb-3 block" />
          <h3 className="font-serif text-lg font-bold text-[#1A1208]">No partner applications found</h3>
          <p className="text-xs text-[#7A6C5B] mt-1">
            {search || statusFilter !== "ALL"
              ? "Try adjusting your search query or status filter."
              : "No partner farmers have applied yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((partner) => {
            const isUpdating = updatingId === partner.id
            const whatsappUrl = `https://wa.me/${partner.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
              `Hello ${partner.fullName}, this is the Osotua Farming Outgrower Network desk regarding your partner farmer registration.`
            )}`

            return (
              <div
                key={partner.id}
                className="bg-white border border-[#E5DDD0] rounded-[2px] p-5 shadow-xs hover:border-[#D4A045] transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Partner Info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-bold text-base text-[#1A1208]">{partner.fullName}</span>
                      <Badge label={partner.status} />
                      <span className="px-2.5 py-0.5 rounded-[2px] bg-[#EFE9DF] text-[#7A6C5B] text-[10px] font-mono font-bold uppercase tracking-wider border border-[#DDD4C4]">
                        {partner.supplyType}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#7A6C5B] font-mono">
                      <span className="flex items-center gap-1.5">
                        <i className="bi bi-geo-alt text-[#C48D2A]" />
                        {partner.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <i className="bi bi-telephone text-[#C48D2A]" />
                        <a href={`tel:${partner.phone}`} className="hover:underline text-[#1A1208] font-bold">
                          {partner.phone}
                        </a>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <i className="bi bi-envelope text-[#C48D2A]" />
                        <a href={`mailto:${partner.email}`} className="hover:underline">
                          {partner.email}
                        </a>
                      </span>
                      <span className="text-[#A89886]">
                        Applied: {new Date(partner.createdAt).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </div>

                  {/* Actions & Status Control */}
                  <div className="flex items-center gap-2 flex-wrap shrink-0">
                    {/* Contact Actions */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 rounded-[2px] bg-[#E8EEDC] text-[#486326] border border-[#D2DCBE] text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-[#d8e2c7] transition-colors"
                      title="WhatsApp Partner"
                    >
                      <i className="bi bi-whatsapp" /> WhatsApp
                    </a>

                    {/* Status Changer Select */}
                    <select
                      value={partner.status}
                      disabled={isUpdating}
                      onChange={(e) => handleStatusChange(partner.id, e.target.value as PartnerFarmerItem["status"])}
                      className="bg-[#FAF7F2] border border-[#DDD4C4] rounded-[2px] px-2.5 py-1.5 text-xs font-mono font-bold text-[#1A1208] outline-none focus:border-[#D4A045] cursor-pointer"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="SUSPENDED">SUSPENDED</option>
                    </select>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(partner.id, partner.fullName)}
                      disabled={isUpdating}
                      className="p-1.5 text-[#BA5932] hover:bg-[#FEF2F2] border border-transparent hover:border-[#FCA5A5] rounded-[2px] transition-colors cursor-pointer"
                      title="Remove Partner"
                    >
                      <i className="bi bi-trash text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
