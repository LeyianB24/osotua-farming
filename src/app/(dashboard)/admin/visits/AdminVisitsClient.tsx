"use client"

import { useState } from "react"
import Badge from "@/components/dashboard/Badge"

export interface VisitItem {
  id: string
  fullName: string
  email: string
  phone: string
  groupSize: number
  visitDate: string
  purpose: string | null
  status: "PENDING" | "CONFIRMED" | "CANCELLED"
  createdAt: string
}

export default function AdminVisitsClient({
  initialVisits,
}: {
  initialVisits: VisitItem[]
}) {
  const [visits, setVisits] = useState<VisitItem[]>(initialVisits)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"ALL" | "UPCOMING" | "PENDING" | "CONFIRMED" | "CANCELLED">("UPCOMING")
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [alertMsg, setAlertMsg] = useState<string | null>(null)

  const handleStatusChange = async (id: string, newStatus: VisitItem["status"]) => {
    setUpdatingId(id)
    setAlertMsg(null)
    try {
      const res = await fetch(`/api/visits/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error("Failed to update status")
      const updated = await res.json()
      setVisits((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: updated.status } : v))
      )
      setAlertMsg(`Booking marked as ${newStatus}`)
      setTimeout(() => setAlertMsg(null), 3000)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error updating visit status")
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Cancel and remove the visit booking for ${name}?`)) return
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/visits/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete booking")
      setVisits((prev) => prev.filter((v) => v.id !== id))
      setAlertMsg("Visit record removed")
      setTimeout(() => setAlertMsg(null), 3000)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error deleting visit")
    } finally {
      setUpdatingId(null)
    }
  }

  const now = new Date()
  const filtered = visits.filter((v) => {
    const vDate = new Date(v.visitDate)
    let matchesCategory = true
    if (filter === "UPCOMING") matchesCategory = vDate >= now
    else if (filter !== "ALL") matchesCategory = v.status === filter

    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      v.fullName.toLowerCase().includes(q) ||
      v.email.toLowerCase().includes(q) ||
      v.phone.includes(q) ||
      (v.purpose && v.purpose.toLowerCase().includes(q))
    return matchesCategory && matchesSearch
  })

  const counts = {
    UPCOMING: visits.filter((v) => new Date(v.visitDate) >= now).length,
    PENDING: visits.filter((v) => v.status === "PENDING").length,
    CONFIRMED: visits.filter((v) => v.status === "CONFIRMED").length,
    CANCELLED: visits.filter((v) => v.status === "CANCELLED").length,
    ALL: visits.length,
  }

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {alertMsg && (
        <div className="p-3 bg-[#E8EEDC] border border-[#D2DCBE] text-[#486326] text-xs font-mono font-semibold rounded-[2px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="bi bi-check-circle-fill text-sm" />
            <span>{alertMsg}</span>
          </div>
          <button onClick={() => setAlertMsg(null)} className="text-[#486326] hover:opacity-75">
            <i className="bi bi-x text-base" />
          </button>
        </div>
      )}

      {/* Control Bar: Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-[2px] border border-[#E5DDD0] shadow-xs">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(["UPCOMING", "PENDING", "CONFIRMED", "ALL"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider rounded-[2px] uppercase transition-all cursor-pointer ${
                filter === tab
                  ? "bg-[#D4A045] text-[#160F08] shadow-xs"
                  : "bg-[#FAF7F2] text-[#7A6C5B] border border-[#DDD4C4] hover:bg-[#EFE9DF]"
              }`}
            >
              {tab} ({counts[tab]})
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
            placeholder="Search visitor, phone, tour..."
            className="w-full bg-[#FAF7F2] border border-[#DDD4C4] rounded-[2px] py-1.5 pl-8 pr-3 text-xs text-[#1A1208] outline-none focus:border-[#D4A045] transition-colors"
          />
        </div>
      </div>

      {/* Visits List */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-[#E5DDD0] rounded-[2px] p-12 text-center shadow-xs">
          <i className="bi bi-calendar-x text-3xl text-[#C48D2A] mb-3 block" />
          <h3 className="font-serif text-lg font-bold text-[#1A1208]">No bookings found</h3>
          <p className="text-xs text-[#7A6C5B] mt-1">
            {search || filter !== "ALL"
              ? "Try adjusting your search query or filter selection."
              : "No visitors have booked a ranch tour yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((visit) => {
            const isUpdating = updatingId === visit.id
            const visitDateObj = new Date(visit.visitDate)
            const isPast = visitDateObj < now
            const whatsappUrl = `https://wa.me/${visit.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
              `Hello ${visit.fullName}, this is Osotua Farming ranch concierge regarding your tour booking for ${visitDateObj.toLocaleDateString("en-KE", { dateStyle: "full" })}.`
            )}`

            return (
              <div
                key={visit.id}
                className="bg-white border border-[#E5DDD0] rounded-[2px] p-5 shadow-xs hover:border-[#D4A045] transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Visitor details */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-bold text-base text-[#1A1208]">{visit.fullName}</span>
                      <Badge label={visit.status} />
                      <span className="px-2.5 py-0.5 rounded-[2px] bg-[#EFE9DF] text-[#7A6C5B] text-[10px] font-mono font-bold uppercase tracking-wider border border-[#DDD4C4]">
                        {visit.groupSize} {visit.groupSize === 1 ? "visitor" : "visitors"}
                      </span>
                      {isPast && (
                        <span className="text-[10px] font-mono font-bold text-[#A89886] uppercase bg-gray-100 px-2 py-0.5 rounded-[2px]">
                          Past Date
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-semibold text-[#BA5932] flex items-center gap-2">
                      <i className="bi bi-calendar-event" />
                      <span>{visitDateObj.toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>

                    {visit.purpose && (
                      <p className="text-xs text-[#5C4A2A] font-medium bg-[#FAF7F2] p-2.5 rounded-[2px] border border-[#EFE9DF] max-w-2xl">
                        {visit.purpose}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#7A6C5B] font-mono pt-1">
                      <span className="flex items-center gap-1.5">
                        <i className="bi bi-telephone text-[#C48D2A]" />
                        <a href={`tel:${visit.phone}`} className="hover:underline text-[#1A1208] font-bold">
                          {visit.phone}
                        </a>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <i className="bi bi-envelope text-[#C48D2A]" />
                        <a href={`mailto:${visit.email}`} className="hover:underline">
                          {visit.email}
                        </a>
                      </span>
                      <span className="text-[#A89886]">
                        Booked: {new Date(visit.createdAt).toLocaleDateString("en-KE")}
                      </span>
                    </div>
                  </div>

                  {/* Actions & Status Control */}
                  <div className="flex items-center gap-2 flex-wrap shrink-0">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 rounded-[2px] bg-[#E8EEDC] text-[#486326] border border-[#D2DCBE] text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-[#d8e2c7] transition-colors"
                      title="WhatsApp Guest"
                    >
                      <i className="bi bi-whatsapp" /> WhatsApp
                    </a>

                    {visit.status === "PENDING" && (
                      <button
                        onClick={() => handleStatusChange(visit.id, "CONFIRMED")}
                        disabled={isUpdating}
                        className="px-3 py-1.5 rounded-[2px] bg-[#6B7A3F] text-white text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#586533] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <i className="bi bi-check-lg" /> Confirm
                      </button>
                    )}

                    {visit.status === "CONFIRMED" && (
                      <button
                        onClick={() => handleStatusChange(visit.id, "CANCELLED")}
                        disabled={isUpdating}
                        className="px-2.5 py-1.5 rounded-[2px] bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs font-mono font-bold uppercase hover:bg-red-100 transition-colors cursor-pointer"
                      >
                        Cancel Tour
                      </button>
                    )}

                    {visit.status === "CANCELLED" && (
                      <button
                        onClick={() => handleStatusChange(visit.id, "PENDING")}
                        disabled={isUpdating}
                        className="px-2.5 py-1.5 rounded-[2px] bg-[#FAF7F2] border border-[#DDD4C4] text-[#7A6C5B] text-xs font-mono font-bold uppercase hover:bg-[#EFE9DF] transition-colors cursor-pointer"
                      >
                        Re-open
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(visit.id, visit.fullName)}
                      disabled={isUpdating}
                      className="p-1.5 text-[#BA5932] hover:bg-[#FEF2F2] border border-transparent hover:border-[#FCA5A5] rounded-[2px] transition-colors cursor-pointer"
                      title="Delete Record"
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
