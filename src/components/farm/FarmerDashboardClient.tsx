"use client"

import { useState } from "react"
import Link from "next/link"

interface OrderItemSummary {
  id: string
  name: string
  quantity: number
  unitPrice: number
  image?: string | null
}

interface OrderSummary {
  id: string
  status: string
  totalAmount: number
  createdAt: string
  deliveryAddress?: string | null
  paymentMethod?: string | null
  items: OrderItemSummary[]
}

interface SubscriptionSummary {
  id: string
  productName: string
  categoryName: string
  frequency: string
  status: string
  nextDelivery: string | null
}

interface FarmVisitSummary {
  id: string
  visitDate: string
  groupSize: number
  purpose?: string | null
  status: string
}

interface MemberDashboardProps {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  orders: OrderSummary[]
  subscriptions: SubscriptionSummary[]
  visits: FarmVisitSummary[]
  partnerProfile?: {
    fullName: string
    location: string
    supplyType: string
    status: string
  } | null
  categories: Array<{ id: string; name: string }>
  totalSpent: number
}

export default function FarmerDashboardClient({
  user,
  orders,
  subscriptions,
  visits,
  partnerProfile,
  categories,
  totalSpent,
}: MemberDashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "subscriptions" | "visits">("overview")
  const [showAddProduceModal, setShowAddProduceModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [produceForm, setProduceForm] = useState({
    name: "",
    price: "",
    unit: "kg",
    categoryId: categories[0]?.id || "",
    stockQty: "25",
    description: "",
  })

  const firstName = user.name ? user.name.split(" ")[0] : "Patron"
  const memberCode = `OS-${user.id.slice(-6).toUpperCase()}`

  const handleProduceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const slug = produceForm.name.toLowerCase().trim().replace(/[^a-z0-9]/g, "-")
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: produceForm.name,
          slug: `${slug}-${Date.now().toString().slice(-4)}`,
          price: Number(produceForm.price),
          unit: produceForm.unit,
          categoryId: produceForm.categoryId || categories[0]?.id,
          stockQty: Number(produceForm.stockQty),
          description: produceForm.description || `Organic farm harvest supplied by ${user.name}.`,
          inStock: true,
        }),
      })

      if (res.ok) {
        alert("Produce listing submitted successfully to Osotua Cold Storage catalog!")
        setShowAddProduceModal(false)
        setProduceForm({
          name: "",
          price: "",
          unit: "kg",
          categoryId: categories[0]?.id || "",
          stockQty: "25",
          description: "",
        })
      } else {
        const data = await res.json().catch(() => ({}))
        alert(data.error || "Failed to submit produce listing. Please check required fields.")
      }
    } catch {
      alert("Network error while submitting listing.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FBF7F0] p-4 sm:p-8 lg:p-10 text-[#1C1208]">
      {/* ── 1. PATRON WELCOME BANNER ── */}
      <div className="os-panel mb-8 p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-white to-[#F5EFE4] border border-[#C4882A]/20 shadow-[0_4px_24px_rgba(28,18,8,0.04)]">
        {/* Background decorative watermark */}
        <div
          className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#C4882A]/5 pointer-events-none blur-2xl"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#3D6B3E]/10 border border-[#3D6B3E]/25 text-[#2E7D32] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] animate-pulse" />
              <span>Verified Patron Suite &bull; {memberCode}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1208] font-normal leading-tight">
              Welcome back, <em className="italic font-normal text-[#C4882A]">{firstName}</em>
            </h1>
            <p className="text-xs sm:text-sm text-[#5C4835] mt-1.5 max-w-xl font-mono">
              Live tracking for your grass-fed orders, recurring harvests, and ranch reservations at Osotua Kajiado.
            </p>
          </div>

          {/* Quick Action Speed Dial */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/barn"
              className="btn-primary py-2.5 px-4 text-xs font-mono uppercase tracking-wider font-bold shadow-xs flex items-center gap-2"
            >
              <i className="bi bi-shop" />
              <span>Shop The Barn</span>
            </Link>

            <Link
              href="/visit"
              className="btn-ghost py-2.5 px-4 text-xs font-mono uppercase tracking-wider font-bold bg-white text-[#1C1208] border-[#C4882A]/30 hover:border-[#C4882A] flex items-center gap-2 shadow-xs"
            >
              <i className="bi bi-calendar2-heart text-[#C4882A]" />
              <span>Book Visit</span>
            </Link>

            <button
              onClick={() => setShowAddProduceModal(true)}
              className="btn-ghost py-2.5 px-4 text-xs font-mono uppercase tracking-wider font-bold bg-white text-[#1C1208] border-[#C4882A]/30 hover:border-[#C4882A] flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <i className="bi bi-plus-circle text-[#3D6B3E]" />
              <span>Supply Harvest</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. METRIC KPI CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        <div className="bg-white rounded-xl p-5 border border-[#C4882A]/15 shadow-xs hover:shadow-md hover:border-[#C4882A]/30 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="w-10 h-10 rounded-xl bg-[#FAF5EB] border border-[#C4882A]/20 flex items-center justify-center text-[#C4882A] group-hover:scale-105 transition-transform">
              <i className="bi bi-bag-check-fill text-lg" />
            </span>
            <span className="text-[10px] font-mono uppercase font-bold text-[#786550]">
              Orders
            </span>
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-[#1C1208]">
            {orders.length}
          </div>
          <div className="text-[11px] font-mono text-[#8E5E16] mt-1 truncate">
            KES {totalSpent.toLocaleString()} spent
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#C4882A]/15 shadow-xs hover:shadow-md hover:border-[#C4882A]/30 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="w-10 h-10 rounded-xl bg-[#F0F5F0] border border-[#3D6B3E]/20 flex items-center justify-center text-[#2E7D32] group-hover:scale-105 transition-transform">
              <i className="bi bi-arrow-repeat text-lg" />
            </span>
            <span className="text-[10px] font-mono uppercase font-bold text-[#786550]">
              Subscriptions
            </span>
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-[#1C1208]">
            {subscriptions.length}
          </div>
          <div className="text-[11px] font-mono text-[#2E7D32] mt-1 truncate">
            {subscriptions.filter((s) => s.status === "ACTIVE").length} Active Boxes
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#C4882A]/15 shadow-xs hover:shadow-md hover:border-[#C4882A]/30 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="w-10 h-10 rounded-xl bg-[#FAF5EB] border border-[#C4882A]/20 flex items-center justify-center text-[#8E5E16] group-hover:scale-105 transition-transform">
              <i className="bi bi-calendar-event-fill text-lg" />
            </span>
            <span className="text-[10px] font-mono uppercase font-bold text-[#786550]">
              Experiences
            </span>
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-[#1C1208]">
            {visits.length}
          </div>
          <div className="text-[11px] font-mono text-[#8E5E16] mt-1 truncate">
            {visits.length > 0 ? "Ranch Visit Scheduled" : "Bookings Available"}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#C4882A]/15 shadow-xs hover:shadow-md hover:border-[#C4882A]/30 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="w-10 h-10 rounded-xl bg-[#FBF7F0] border border-[#C4882A]/20 flex items-center justify-center text-[#C4882A] group-hover:scale-105 transition-transform">
              <i className="bi bi-shield-check text-lg" />
            </span>
            <span className="text-[10px] font-mono uppercase font-bold text-[#786550]">
              Status
            </span>
          </div>
          <div className="font-mono text-lg sm:text-xl font-bold text-[#1C1208] truncate">
            {partnerProfile ? "Partner Farmer" : "Patron Member"}
          </div>
          <div className="text-[11px] font-mono text-[#3D6B3E] mt-1 truncate">
            100% Grass-Fed Certified
          </div>
        </div>
      </div>

      {/* ── 3. VIEW FILTER TABS ── */}
      <div className="flex items-center gap-2 border-b border-[#C4882A]/20 mb-6 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "overview"
              ? "bg-[#1C1208] text-white shadow-xs"
              : "text-[#5C4835] hover:text-[#1C1208] hover:bg-white/60"
          }`}
        >
          <i className="bi bi-grid-fill mr-2 text-[#C4882A]" />
          Overview
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "orders"
              ? "bg-[#1C1208] text-white shadow-xs"
              : "text-[#5C4835] hover:text-[#1C1208] hover:bg-white/60"
          }`}
        >
          <i className="bi bi-box-seam mr-2 text-[#C4882A]" />
          My Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "subscriptions"
              ? "bg-[#1C1208] text-white shadow-xs"
              : "text-[#5C4835] hover:text-[#1C1208] hover:bg-white/60"
          }`}
        >
          <i className="bi bi-arrow-repeat mr-2 text-[#C4882A]" />
          Subscriptions ({subscriptions.length})
        </button>

        <button
          onClick={() => setActiveTab("visits")}
          className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "visits"
              ? "bg-[#1C1208] text-white shadow-xs"
              : "text-[#5C4835] hover:text-[#1C1208] hover:bg-white/60"
          }`}
        >
          <i className="bi bi-calendar2-check mr-2 text-[#C4882A]" />
          Farm Visits ({visits.length})
        </button>
      </div>

      {/* ── 4. TAB CONTENTS ── */}

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Recent Orders Overview Card */}
          <div className="bg-white rounded-2xl border border-[#C4882A]/15 overflow-hidden shadow-xs">
            <div className="p-5 sm:p-6 border-b border-[#C4882A]/15 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#1C1208] font-normal">
                  Recent Orders & Deliveries
                </h2>
                <p className="text-xs text-[#786550] font-mono mt-0.5">
                  Live dispatch ledger and shipment updates
                </p>
              </div>
              <Link
                href="/dashboard/orders"
                className="text-xs font-mono font-bold text-[#8E5E16] hover:text-[#C4882A] flex items-center gap-1"
              >
                <span>View All Orders</span>
                <i className="bi bi-arrow-right" />
              </Link>
            </div>

            {orders.length > 0 ? (
              <div className="divide-y divide-[#C4882A]/10">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="p-5 sm:p-6 hover:bg-[#FAF8F4] transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-[#C4882A]">
                          #{order.id.slice(-8).toUpperCase()}
                        </span>
                        <span className="text-xs font-mono text-[#786550]">
                          &bull; {new Date(order.createdAt).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-base font-bold text-[#1C1208]">
                          KES {order.totalAmount.toLocaleString()}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            order.status === "DELIVERED"
                              ? "bg-[#2E7D32]/12 text-[#2E7D32] border border-[#2E7D32]/30"
                              : "bg-[#C4882A]/15 text-[#8E5E16] border border-[#C4882A]/35"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="text-xs text-[#5C4835] flex items-center justify-between">
                          <span className="font-medium text-[#1C1208]">
                            {item.quantity}× {item.name}
                          </span>
                          <span className="font-mono text-[#786550]">
                            KES {(item.quantity * item.unitPrice).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {order.deliveryAddress && (
                      <div className="text-[11px] font-mono text-[#786550] flex items-center gap-1.5">
                        <i className="bi bi-geo-alt text-[#C4882A]" />
                        <span>Delivery to: {order.deliveryAddress}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center">
                <i className="bi bi-basket text-4xl text-[#C4882A]/40 block mb-3" />
                <h3 className="font-serif text-lg text-[#1C1208] mb-1">No orders yet</h3>
                <p className="text-xs text-[#786550] font-mono mb-4">
                  Browse pasture-raised meat, organic honey, and dairy in our Barn Store.
                </p>
                <Link href="/barn" className="btn-primary py-2 px-4 text-xs font-mono font-bold uppercase tracking-wider inline-flex">
                  Explore Barn Store
                </Link>
              </div>
            )}
          </div>

          {/* Subscriptions & Farm Visits Dual Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subscriptions Overview */}
            <div className="bg-white rounded-2xl border border-[#C4882A]/15 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <i className="bi bi-arrow-repeat text-[#2E7D32] text-lg" />
                    <h3 className="font-serif text-xl text-[#1C1208]">Active Farm Subscriptions</h3>
                  </div>
                  <Link href="/dashboard/subscriptions" className="text-xs font-mono font-bold text-[#8E5E16] hover:text-[#C4882A]">
                    Manage &rarr;
                  </Link>
                </div>

                {subscriptions.length > 0 ? (
                  <div className="space-y-3">
                    {subscriptions.slice(0, 2).map((sub) => (
                      <div key={sub.id} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#C4882A]/15 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-[#1C1208]">{sub.productName}</div>
                          <div className="text-[10px] font-mono text-[#786550] uppercase">
                            {sub.frequency} &bull; {sub.categoryName}
                          </div>
                        </div>
                        <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider font-bold rounded-full bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/30">
                          {sub.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#786550] font-mono py-4">
                    No recurring farm boxes active. Subscribe to weekly dairy, vegetables, or cuts.
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#C4882A]/15 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#786550]">Weekly & Monthly Harvests</span>
                <Link href="/barn" className="text-xs font-mono font-bold text-[#C4882A] hover:underline">
                  Subscribe Now
                </Link>
              </div>
            </div>

            {/* Farm Visits Overview */}
            <div className="bg-white rounded-2xl border border-[#C4882A]/15 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <i className="bi bi-compass text-[#C4882A] text-lg" />
                    <h3 className="font-serif text-xl text-[#1C1208]">Ranch Agritourism</h3>
                  </div>
                  <Link href="/visit" className="text-xs font-mono font-bold text-[#8E5E16] hover:text-[#C4882A]">
                    Book &rarr;
                  </Link>
                </div>

                {visits.length > 0 ? (
                  <div className="space-y-3">
                    {visits.slice(0, 2).map((visit) => (
                      <div key={visit.id} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#C4882A]/15 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-[#1C1208]">
                            {new Date(visit.visitDate).toLocaleDateString("en-KE", { dateStyle: "medium" })}
                          </div>
                          <div className="text-[10px] font-mono text-[#786550]">
                            Party of {visit.groupSize} {visit.purpose ? `&bull; ${visit.purpose}` : ""}
                          </div>
                        </div>
                        <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider font-bold rounded-full bg-[#C4882A]/10 text-[#8E5E16] border border-[#C4882A]/30">
                          {visit.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#786550] font-mono py-4">
                    Tour our Kajiado rangelands, taste artisanal cheese, and view champion pedigree stock.
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#C4882A]/15 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#786550]">Kajiado County, Kenya</span>
                <Link href="/visit" className="text-xs font-mono font-bold text-[#C4882A] hover:underline">
                  Schedule Experience
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-2xl border border-[#C4882A]/15 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#C4882A]/15">
            <div>
              <h2 className="font-serif text-2xl text-[#1C1208]">Complete Order History</h2>
              <p className="text-xs font-mono text-[#786550] mt-0.5">
                Every transaction, delivery tracking, and invoice receipt
              </p>
            </div>
            <Link href="/barn" className="btn-primary py-2 px-4 text-xs font-mono font-bold uppercase tracking-wider self-start sm:self-auto">
              Place New Order
            </Link>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-[#C4882A]/20 bg-[#FAF8F5] p-5 hover:border-[#C4882A]/40 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#C4882A]/15">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-[#C4882A]">
                          #{order.id.slice(-8).toUpperCase()}
                        </span>
                        <span className="text-xs font-mono text-[#786550]">
                          &bull; {new Date(order.createdAt).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                      {order.deliveryAddress && (
                        <div className="text-[11px] font-mono text-[#786550] mt-1">
                          <i className="bi bi-geo-alt text-[#C4882A] mr-1" />
                          {order.deliveryAddress}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-mono text-base font-bold text-[#1C1208]">
                          KES {order.totalAmount.toLocaleString()}
                        </div>
                        <div className="text-[10px] font-mono text-[#786550]">
                          {order.paymentMethod || "M-Pesa"}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                          order.status === "DELIVERED"
                            ? "bg-[#2E7D32]/12 text-[#2E7D32] border border-[#2E7D32]/30"
                            : "bg-[#C4882A]/15 text-[#8E5E16] border border-[#C4882A]/35"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs">
                        <span className="font-medium text-[#1C1208]">
                          {item.name} <span className="text-[#786550]">× {item.quantity}</span>
                        </span>
                        <span className="font-mono text-[#5C4835]">
                          KES {(item.quantity * item.unitPrice).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <i className="bi bi-receipt text-5xl text-[#C4882A]/30 block mb-3" />
              <h3 className="font-serif text-xl text-[#1C1208] mb-1">No Orders Found</h3>
              <p className="text-xs text-[#786550] font-mono max-w-sm mx-auto mb-6">
                You haven&apos;t placed any orders yet. Visit the Barn Store to purchase pasture-fed meat and farm supplies.
              </p>
              <Link href="/barn" className="btn-primary py-2.5 px-6 text-xs font-mono font-bold uppercase tracking-wider">
                Browse The Barn
              </Link>
            </div>
          )}
        </div>
      )}

      {/* SUBSCRIPTIONS TAB */}
      {activeTab === "subscriptions" && (
        <div className="bg-white rounded-2xl border border-[#C4882A]/15 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#C4882A]/15">
            <div>
              <h2 className="font-serif text-2xl text-[#1C1208]">Recurring Harvest Subscriptions</h2>
              <p className="text-xs font-mono text-[#786550] mt-0.5">
                Fresh farm-to-table deliveries on a recurring schedule
              </p>
            </div>
            <Link href="/barn" className="btn-primary py-2 px-4 text-xs font-mono font-bold uppercase tracking-wider self-start sm:self-auto">
              Add Farm Box
            </Link>
          </div>

          {subscriptions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="p-5 rounded-xl border border-[#C4882A]/20 bg-[#FAF8F5] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E5E16] bg-[#C4882A]/10 px-2.5 py-0.5 rounded-full border border-[#C4882A]/25">
                        {sub.categoryName}
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2E7D32]/12 text-[#2E7D32] border border-[#2E7D32]/30">
                        {sub.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#1C1208] mb-1">{sub.productName}</h3>
                    <div className="text-xs font-mono text-[#786550] mb-3">
                      Cadence: <span className="font-bold text-[#1C1208]">{sub.frequency}</span>
                    </div>

                    {sub.nextDelivery && (
                      <div className="text-xs font-mono text-[#2E7D32] bg-[#2E7D32]/5 p-2 rounded-lg border border-[#2E7D32]/20">
                        <i className="bi bi-clock-history mr-1.5" />
                        Next dispatch: {new Date(sub.nextDelivery).toLocaleDateString("en-KE", { dateStyle: "medium" })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <i className="bi bi-arrow-repeat text-5xl text-[#C4882A]/30 block mb-3" />
              <h3 className="font-serif text-xl text-[#1C1208] mb-1">No Active Subscriptions</h3>
              <p className="text-xs text-[#786550] font-mono max-w-sm mx-auto mb-6">
                Receive recurring weekly pasture eggs, dairy, or fresh butchery cuts straight from our Kajiado ranch.
              </p>
              <Link href="/barn" className="btn-primary py-2.5 px-6 text-xs font-mono font-bold uppercase tracking-wider">
                Discover Farm Boxes
              </Link>
            </div>
          )}
        </div>
      )}

      {/* VISITS TAB */}
      {activeTab === "visits" && (
        <div className="bg-white rounded-2xl border border-[#C4882A]/15 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#C4882A]/15">
            <div>
              <h2 className="font-serif text-2xl text-[#1C1208]">Ranch Tours & Reservations</h2>
              <p className="text-xs font-mono text-[#786550] mt-0.5">
                Private livestock tours, pasture walks, and family ranch visits
              </p>
            </div>
            <Link href="/visit" className="btn-primary py-2 px-4 text-xs font-mono font-bold uppercase tracking-wider self-start sm:self-auto">
              Schedule New Visit
            </Link>
          </div>

          {visits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visits.map((visit) => (
                <div key={visit.id} className="p-5 rounded-xl border border-[#C4882A]/20 bg-[#FAF8F5]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#C4882A]">
                      <i className="bi bi-calendar2-check mr-1.5" />
                      {new Date(visit.visitDate).toLocaleDateString("en-KE", { dateStyle: "full" })}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#C4882A]/15 text-[#8E5E16] border border-[#C4882A]/30">
                      {visit.status}
                    </span>
                  </div>

                  <div className="text-sm font-bold text-[#1C1208] mb-1">
                    Group size: {visit.groupSize} {visit.groupSize === 1 ? "guest" : "guests"}
                  </div>
                  {visit.purpose && (
                    <div className="text-xs text-[#786550] font-mono">
                      Purpose: {visit.purpose}
                    </div>
                  )}
                  <div className="mt-4 pt-3 border-t border-[#C4882A]/15 flex items-center justify-between text-[11px] font-mono text-[#786550]">
                    <span>Location: Kajiado County Hub</span>
                    <span className="text-[#3D6B3E] font-bold">Directions sent to email</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <i className="bi bi-geo-alt text-5xl text-[#C4882A]/30 block mb-3" />
              <h3 className="font-serif text-xl text-[#1C1208] mb-1">No Scheduled Visits</h3>
              <p className="text-xs text-[#786550] font-mono max-w-sm mx-auto mb-6">
                Come experience our sustainable rangelands, observe pedigree breeding bulls, and meet our Maasai herders.
              </p>
              <Link href="/visit" className="btn-primary py-2.5 px-6 text-xs font-mono font-bold uppercase tracking-wider">
                Book a Ranch Visit
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ── 5. PRODUCE LISTING MODAL FOR PARTNER PRODUCERS ── */}
      {showAddProduceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#C4882A]/30 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative">
            <button
              onClick={() => setShowAddProduceModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF5EB] border border-[#C4882A]/20 flex items-center justify-center text-[#786550] hover:text-[#1C1208] cursor-pointer"
              aria-label="Close"
            >
              <i className="bi bi-x-lg text-sm" />
            </button>

            <div className="mb-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E5E16] font-bold mb-1">
                Partner Farmer Supply
              </div>
              <h3 className="font-serif text-2xl text-[#1C1208]">
                List Harvest for Osotua Cold Storage
              </h3>
              <p className="text-xs text-[#786550] font-mono mt-1">
                Submit your fresh agricultural lot to be vetted and aggregated into the Osotua Barn catalog.
              </p>
            </div>

            <form onSubmit={handleProduceSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#5C4835] mb-1">
                  Produce Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Cold-Pressed Acacia Honey"
                  value={produceForm.name}
                  onChange={(e) => setProduceForm({ ...produceForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#C4882A]/30 text-xs font-mono focus:border-[#C4882A] focus:outline-none bg-[#FAF8F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#5C4835] mb-1">
                    Price (KES) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="1200"
                    value={produceForm.price}
                    onChange={(e) => setProduceForm({ ...produceForm, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C4882A]/30 text-xs font-mono focus:border-[#C4882A] focus:outline-none bg-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#5C4835] mb-1">
                    Unit (e.g., kg, jar, liter)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="kg"
                    value={produceForm.unit}
                    onChange={(e) => setProduceForm({ ...produceForm, unit: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C4882A]/30 text-xs font-mono focus:border-[#C4882A] focus:outline-none bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#5C4835] mb-1">
                    Initial Stock Qty
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={produceForm.stockQty}
                    onChange={(e) => setProduceForm({ ...produceForm, stockQty: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C4882A]/30 text-xs font-mono focus:border-[#C4882A] focus:outline-none bg-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#5C4835] mb-1">
                    Category
                  </label>
                  <select
                    value={produceForm.categoryId}
                    onChange={(e) => setProduceForm({ ...produceForm, categoryId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#C4882A]/30 text-xs font-mono focus:border-[#C4882A] focus:outline-none bg-[#FAF8F5]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#5C4835] mb-1">
                  Description / Origin Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide origin, harvest date, packaging details..."
                  value={produceForm.description}
                  onChange={(e) => setProduceForm({ ...produceForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#C4882A]/30 text-xs font-mono focus:border-[#C4882A] focus:outline-none bg-[#FAF8F5]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddProduceModal(false)}
                  className="px-4 py-2.5 rounded-lg text-xs font-mono font-bold text-[#786550] hover:text-[#1C1208] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary py-2.5 px-6 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
                >
                  {submitting ? "Submitting..." : "Submit Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
