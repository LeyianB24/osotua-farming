"use client"

import { useState } from "react"
import Link from "next/link"

interface DashboardProps {
  coopName?: string
  metrics?: {
    ordersThisWeek: number
    revenue: number
    activeListings: number
    lowStock: number
  }
  recentOrders?: Array<{
    id: string
    customerName: string
    itemsDescription: string
    status: "Delivered" | "Packing" | "Pending" | "Confirmed"
  }>
  inventoryItems?: Array<{
    id: string
    name: string
    percentage: number
    color: "green" | "red" | "amber"
  }>
  categories?: Array<{ id: string; name: string }>
}

export default function FarmerDashboardClient({
  coopName = "Kajiado Co-op",
  metrics = {
    ordersThisWeek: 38,
    revenue: 21400,
    activeListings: 12,
    lowStock: 2,
  },
  recentOrders = [
    { id: "1", customerName: "Amina W.", itemsDescription: "Sukuma wiki x5", status: "Delivered" },
    { id: "2", customerName: "Joseph K.", itemsDescription: "Tomatoes x2", status: "Packing" },
    { id: "3", customerName: "Grace M.", itemsDescription: "Eggs x3 trays", status: "Pending" },
    { id: "4", customerName: "Peter O.", itemsDescription: "Maize flour x4", status: "Delivered" },
  ],
  inventoryItems = [
    { id: "1", name: "Sukuma wiki", percentage: 80, color: "green" },
    { id: "2", name: "Tomatoes", percentage: 15, color: "red" },
    { id: "3", name: "Eggs", percentage: 60, color: "amber" },
  ],
  categories = [],
}: DashboardProps) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({
    name: "",
    price: "",
    unit: "kg",
    categoryId: categories[0]?.id || "",
    stockQty: "20",
    description: "",
  })

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdding(true)
    try {
      const slug = form.name.toLowerCase().trim().replace(/[^a-z0-9]/g, "-")
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          slug: `${slug}-${Date.now().toString().slice(-4)}`,
          price: Number(form.price),
          unit: form.unit,
          categoryId: form.categoryId || categories[0]?.id,
          stockQty: Number(form.stockQty),
          description: form.description || `Freshly harvested ${form.name} from ${coopName}.`,
          inStock: true,
        }),
      })
      if (res.ok) {
        setShowAddModal(false)
        window.location.reload()
      } else {
        alert("Could not save listing")
      }
    } catch {
      alert("Error saving listing")
    } finally {
      setAdding(false)
    }
  }

  return (
    <div style={{ background: "#FBF7F0", minHeight: "100vh" }} className="pt-24 pb-24 text-[#1C1208]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── TOP HEADER ── */}
        <div className="bg-gradient-to-r from-[#FFFFFF] via-[#FAF5EB] to-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-6 sm:p-10 shadow-lg shadow-[#1C1208]/04 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#C4882A]/12 border border-[#C4882A]/30 text-[#8E5E16] mb-2">
                <i className="bi bi-person-check-fill text-[#C4882A]" />
                Cooperative Producer Portal
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: "#1C1208",
                }}
              >
                Welcome back, {coopName}
              </h1>
              <p className="text-xs text-[#5C4835] font-mono mt-1">
                Real-time weekly order dispatch, revenue ledger, and rangeland inventory status.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary py-2.5 px-4 text-xs font-mono uppercase tracking-wider font-bold shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
              >
                <i className="bi bi-plus-lg" />
                <span>+ Add Listing</span>
              </button>
              <Link
                href="/admin"
                className="btn-ghost py-2.5 px-4 text-xs font-mono uppercase tracking-wider font-bold bg-[#FFFFFF]"
                style={{ color: "#1C1208", borderColor: "rgba(196,136,42,0.3)" }}
              >
                Admin HQ &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* ── 4 METRIC CARDS ROW ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          
          {/* Card 1: Orders this week */}
          <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-2xl p-5 shadow-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
              Orders this week
            </div>
            <div className="font-mono text-3xl font-bold text-[#1C1208]">
              {metrics.ordersThisWeek}
            </div>
          </div>

          {/* Card 2: Revenue */}
          <div className="bg-[#FFFFFF] border border-[#2E7D32]/25 rounded-2xl p-5 shadow-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#2E7D32] font-bold mb-1">
              Revenue
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#1C1208]">
              KES {metrics.revenue.toLocaleString()}
            </div>
          </div>

          {/* Card 3: Active listings */}
          <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-2xl p-5 shadow-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
              Active listings
            </div>
            <div className="font-mono text-3xl font-bold text-[#1C1208]">
              {metrics.activeListings}
            </div>
          </div>

          {/* Card 4: Low stock */}
          <div className="bg-[#FFFFFF] border border-[#DC2626]/25 rounded-2xl p-5 shadow-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#DC2626] font-bold mb-1">
              Low stock
            </div>
            <div className="font-mono text-3xl font-bold text-[#DC2626]">
              {metrics.lowStock}
            </div>
          </div>

        </div>

        {/* ── 2 COLUMNS: RECENT ORDERS & INVENTORY STATUS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Column 1: Recent Orders */}
          <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-6 shadow-lg shadow-[#1C1208]/04">
            <h2 className="font-serif text-2xl text-[#1C1208] font-normal mb-4 pb-3 border-b border-[#C4882A]/15">
              Recent Customer Orders
            </h2>

            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#FAF6EE] border border-[#C4882A]/15 rounded-xl px-4 py-3.5 flex items-center justify-between gap-4"
                >
                  <div className="text-xs font-bold text-[#1C1208] truncate">
                    {order.customerName} — <span className="font-normal text-[#5C4835]">{order.itemsDescription}</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${
                      order.status.toLowerCase() === "delivered"
                        ? "bg-[#2E7D32]/12 text-[#2E7D32] border border-[#2E7D32]/30"
                        : order.status.toLowerCase() === "packing"
                        ? "bg-[#C4882A]/12 text-[#8E5E16] border border-[#C4882A]/30"
                        : "bg-zinc-200 text-zinc-700 border border-zinc-300"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Inventory Status */}
          <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-6 shadow-lg shadow-[#1C1208]/04">
            <h2 className="font-serif text-2xl text-[#1C1208] font-normal mb-4 pb-3 border-b border-[#C4882A]/15">
              Inventory Stock Levels
            </h2>

            <div className="space-y-5">
              {inventoryItems.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#1C1208] font-bold">{item.name}</span>
                    <span className="text-[#786550] font-mono font-bold">{item.percentage}% Available</span>
                  </div>
                  <div className="w-full bg-[#FAF5EB] h-2.5 rounded-full overflow-hidden border border-[#C4882A]/20">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.color === "green"
                          ? "bg-[#2E7D32]"
                          : item.color === "red"
                          ? "bg-[#DC2626]"
                          : "bg-[#C4882A]"
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ── ADD LISTING MODAL ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#C4882A]/30 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#C4882A]/20">
              <h3 className="font-serif text-2xl text-[#1C1208] font-normal">Add Produce Listing</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#786550] hover:text-[#1C1208] text-xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                  Produce Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sukuma wiki, Tomatoes, Avocados"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-[#1C1208] outline-none focus:border-[#C4882A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                    Price (KES) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 50"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-[#1C1208] font-mono font-bold outline-none focus:border-[#C4882A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                    Packaging / Unit *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. bunch, kg, pc, tray"
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-[#1C1208] outline-none focus:border-[#C4882A]"
                  />
                </div>
              </div>

              {categories.length > 0 && (
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                    Category *
                  </label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-[#1C1208] outline-none focus:border-[#C4882A]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                  Stock Quantity (Units) *
                </label>
                <input
                  type="number"
                  required
                  value={form.stockQty}
                  onChange={(e) => setForm({ ...form, stockQty: e.target.value })}
                  className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-[#1C1208] font-mono font-bold outline-none focus:border-[#C4882A]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#C4882A]/15">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-[#786550] hover:text-[#1C1208]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding}
                  className="btn-primary py-2.5 px-6 text-xs font-mono uppercase tracking-wider font-bold shadow-sm cursor-pointer"
                >
                  {adding ? "Saving..." : "Save Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
