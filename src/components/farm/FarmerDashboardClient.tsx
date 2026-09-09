"use client"

import { useState } from "react"
import Link from "next/link"
import StatCard from "@/components/dashboard/StatCard"
import Badge from "@/components/dashboard/Badge"

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
    <div className="p-4 sm:p-8 space-y-8" style={{ background: "#0E0A05", minHeight: "100vh" }}>
      {/* ── 1. PATRON WELCOME BANNER ── */}
      <div
        className="rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(28,18,8,0.9) 0%, rgba(18,11,4,0.95) 100%)",
          border: "1px solid rgba(196,136,42,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <div
          className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full pointer-events-none blur-3xl opacity-20"
          style={{ background: "#C4882A" }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest mb-3"
              style={{
                background: "rgba(61,107,62,0.15)",
                border: "1px solid rgba(61,107,62,0.3)",
                color: "#4E8A4F",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4E8A4F] animate-pulse" />
              <span>Verified Patron Suite &bull; {memberCode}</span>
            </div>

            <h1
              className="font-light text-3xl sm:text-4xl lg:text-5xl leading-tight"
              style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}
            >
              Welcome back, <em className="italic font-normal" style={{ color: "#C4882A" }}>{firstName}</em>
            </h1>
            <p className="text-xs sm:text-sm mt-2 max-w-xl font-mono" style={{ color: "rgba(245,239,228,0.5)" }}>
              Live pastoral status for your grass-fed orders, recurring harvests, and ranch reservations at Osotua Kajiado.
            </p>
          </div>

          {/* Quick Action Speed Dial */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/barn"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #C4882A, #D99A30)",
                color: "#1C1208",
                boxShadow: "0 4px 16px rgba(196,136,42,0.3)",
              }}
            >
              <i className="bi bi-shop text-sm" />
              <span>Shop The Barn</span>
            </Link>

            <Link
              href="/visit"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all duration-200 hover:bg-white/5"
              style={{
                background: "rgba(245,239,228,0.03)",
                border: "1px solid rgba(196,136,42,0.25)",
                color: "#F5EFE4",
              }}
            >
              <i className="bi bi-calendar2-heart" style={{ color: "#C4882A" }} />
              <span>Book Visit</span>
            </Link>

            <button
              onClick={() => setShowAddProduceModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all duration-200 hover:bg-white/5 cursor-pointer"
              style={{
                background: "rgba(245,239,228,0.03)",
                border: "1px solid rgba(61,107,62,0.35)",
                color: "#F5EFE4",
              }}
            >
              <i className="bi bi-plus-circle" style={{ color: "#4E8A4F" }} />
              <span>Supply Harvest</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. METRIC KPI CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Orders"
          value={orders.length}
          sub={`KES ${totalSpent.toLocaleString()} spent`}
          icon="bi-bag-check"
          href="/dashboard/orders"
          accent="gold"
        />
        <StatCard
          title="Subscriptions"
          value={subscriptions.length}
          sub={`${subscriptions.filter((s) => s.status === "ACTIVE").length} Active Boxes`}
          icon="bi-arrow-repeat"
          href="/dashboard/subscriptions"
          accent="green"
        />
        <StatCard
          title="Farm Visits"
          value={visits.length}
          sub={visits.length > 0 ? "Ranch Visit Scheduled" : "Bookings Available"}
          icon="bi-calendar-check"
          href="/visit"
          accent="default"
        />
        <StatCard
          title="Member Tier"
          value={partnerProfile ? "Partner" : "Patron"}
          sub="100% Grass-Fed Certified"
          icon="bi-shield-check"
          accent="rust"
        />
      </div>

      {/* ── 3. VIEW FILTER TABS ── */}
      <div
        className="flex items-center gap-2 border-b pb-2 overflow-x-auto"
        style={{ borderColor: "rgba(196,136,42,0.12)" }}
      >
        <button
          onClick={() => setActiveTab("overview")}
          className="px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          style={activeTab === "overview" ? {
            background: "linear-gradient(135deg, #C4882A, #D99A30)",
            color: "#1C1208",
            boxShadow: "0 2px 10px rgba(196,136,42,0.3)",
          } : {
            color: "rgba(245,239,228,0.5)",
            background: "transparent",
          }}
        >
          <i className="bi bi-grid-fill mr-1.5" />
          Overview
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className="px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          style={activeTab === "orders" ? {
            background: "linear-gradient(135deg, #C4882A, #D99A30)",
            color: "#1C1208",
            boxShadow: "0 2px 10px rgba(196,136,42,0.3)",
          } : {
            color: "rgba(245,239,228,0.5)",
            background: "transparent",
          }}
        >
          <i className="bi bi-box-seam mr-1.5" />
          My Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab("subscriptions")}
          className="px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          style={activeTab === "subscriptions" ? {
            background: "linear-gradient(135deg, #C4882A, #D99A30)",
            color: "#1C1208",
            boxShadow: "0 2px 10px rgba(196,136,42,0.3)",
          } : {
            color: "rgba(245,239,228,0.5)",
            background: "transparent",
          }}
        >
          <i className="bi bi-arrow-repeat mr-1.5" />
          Subscriptions ({subscriptions.length})
        </button>

        <button
          onClick={() => setActiveTab("visits")}
          className="px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          style={activeTab === "visits" ? {
            background: "linear-gradient(135deg, #C4882A, #D99A30)",
            color: "#1C1208",
            boxShadow: "0 2px 10px rgba(196,136,42,0.3)",
          } : {
            color: "rgba(245,239,228,0.5)",
            background: "transparent",
          }}
        >
          <i className="bi bi-calendar2-check mr-1.5" />
          Farm Visits ({visits.length})
        </button>
      </div>

      {/* ── 4. TAB CONTENTS ── */}

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Recent Orders Overview Card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(245,239,228,0.02)",
              border: "1px solid rgba(196,136,42,0.14)",
            }}
          >
            <div
              className="p-5 sm:p-6 border-b flex items-center justify-between"
              style={{ borderColor: "rgba(196,136,42,0.1)" }}
            >
              <div>
                <h2 className="font-light text-xl sm:text-2xl" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>
                  Recent Orders &amp; Deliveries
                </h2>
                <p className="text-xs font-mono mt-0.5" style={{ color: "rgba(245,239,228,0.4)" }}>
                  Live dispatch ledger and shipment updates
                </p>
              </div>
              <Link
                href="/dashboard/orders"
                className="text-xs font-mono font-bold flex items-center gap-1 hover:underline"
                style={{ color: "#C4882A" }}
              >
                <span>View All Orders</span>
                <i className="bi bi-arrow-right" />
              </Link>
            </div>

            {orders.length > 0 ? (
              <div className="divide-y" style={{ borderColor: "rgba(245,239,228,0.04)" }}>
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="p-5 sm:p-6 hover:bg-white/[0.02] transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold" style={{ color: "#C4882A" }}>
                          #{order.id.slice(-8).toUpperCase()}
                        </span>
                        <span className="text-xs font-mono" style={{ color: "rgba(245,239,228,0.4)" }}>
                          &bull; {new Date(order.createdAt).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-base font-bold" style={{ color: "#F5EFE4" }}>
                          KES {order.totalAmount.toLocaleString()}
                        </span>
                        <Badge label={order.status} />
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="text-xs flex items-center justify-between" style={{ color: "rgba(245,239,228,0.6)" }}>
                          <span style={{ color: "#F5EFE4" }}>
                            {item.quantity}&times; {item.name}
                          </span>
                          <span className="font-mono" style={{ color: "rgba(245,239,228,0.4)" }}>
                            KES {(item.quantity * item.unitPrice).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {order.deliveryAddress && (
                      <div className="text-[11px] font-mono flex items-center gap-1.5" style={{ color: "rgba(245,239,228,0.4)" }}>
                        <i className="bi bi-geo-alt text-[#C4882A]" />
                        <span>Delivery to: {order.deliveryAddress}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center">
                <i className="bi bi-basket text-4xl block mb-3" style={{ color: "rgba(196,136,42,0.4)" }} />
                <h3 className="font-light text-lg mb-1" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>No orders yet</h3>
                <p className="text-xs font-mono mb-4" style={{ color: "rgba(245,239,228,0.4)" }}>
                  Browse pasture-raised meat, organic honey, and dairy in our Barn Store.
                </p>
                <Link
                  href="/barn"
                  className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider inline-flex rounded-lg"
                  style={{
                    background: "linear-gradient(135deg, #C4882A, #D99A30)",
                    color: "#1C1208",
                  }}
                >
                  Explore Barn Store
                </Link>
              </div>
            )}
          </div>

          {/* Subscriptions & Farm Visits Dual Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subscriptions Overview */}
            <div
              className="rounded-2xl p-6 flex flex-col justify-between"
              style={{
                background: "rgba(245,239,228,0.02)",
                border: "1px solid rgba(196,136,42,0.14)",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <i className="bi bi-arrow-repeat text-lg" style={{ color: "#4E8A4F" }} />
                    <h3 className="font-light text-xl" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>Active Farm Subscriptions</h3>
                  </div>
                  <Link href="/dashboard/subscriptions" className="text-xs font-mono font-bold hover:underline" style={{ color: "#C4882A" }}>
                    Manage &rarr;
                  </Link>
                </div>

                {subscriptions.length > 0 ? (
                  <div className="space-y-3">
                    {subscriptions.slice(0, 2).map((sub) => (
                      <div
                        key={sub.id}
                        className="p-3 rounded-xl flex items-center justify-between"
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(196,136,42,0.1)",
                        }}
                      >
                        <div>
                          <div className="text-xs font-medium" style={{ color: "#F5EFE4" }}>{sub.productName}</div>
                          <div className="text-[10px] font-mono uppercase mt-0.5" style={{ color: "rgba(245,239,228,0.4)" }}>
                            {sub.frequency} &bull; {sub.categoryName}
                          </div>
                        </div>
                        <Badge label={sub.status} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-mono py-4" style={{ color: "rgba(245,239,228,0.4)" }}>
                    No recurring farm boxes active. Subscribe to weekly dairy, vegetables, or cuts.
                  </p>
                )}
              </div>

              <div
                className="mt-6 pt-4 border-t flex items-center justify-between"
                style={{ borderColor: "rgba(196,136,42,0.1)" }}
              >
                <span className="text-[11px] font-mono" style={{ color: "rgba(245,239,228,0.4)" }}>Weekly &amp; Monthly Harvests</span>
                <Link href="/barn" className="text-xs font-mono font-bold hover:underline" style={{ color: "#C4882A" }}>
                  Subscribe Now
                </Link>
              </div>
            </div>

            {/* Farm Visits Overview */}
            <div
              className="rounded-2xl p-6 flex flex-col justify-between"
              style={{
                background: "rgba(245,239,228,0.02)",
                border: "1px solid rgba(196,136,42,0.14)",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <i className="bi bi-compass text-lg" style={{ color: "#C4882A" }} />
                    <h3 className="font-light text-xl" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>Ranch Agritourism</h3>
                  </div>
                  <Link href="/visit" className="text-xs font-mono font-bold hover:underline" style={{ color: "#C4882A" }}>
                    Book &rarr;
                  </Link>
                </div>

                {visits.length > 0 ? (
                  <div className="space-y-3">
                    {visits.slice(0, 2).map((visit) => (
                      <div
                        key={visit.id}
                        className="p-3 rounded-xl flex items-center justify-between"
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(196,136,42,0.1)",
                        }}
                      >
                        <div>
                          <div className="text-xs font-medium" style={{ color: "#F5EFE4" }}>
                            {new Date(visit.visitDate).toLocaleDateString("en-KE", { dateStyle: "medium" })}
                          </div>
                          <div className="text-[10px] font-mono mt-0.5" style={{ color: "rgba(245,239,228,0.4)" }}>
                            Party of {visit.groupSize} {visit.purpose ? `&bull; ${visit.purpose}` : ""}
                          </div>
                        </div>
                        <Badge label={visit.status} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-mono py-4" style={{ color: "rgba(245,239,228,0.4)" }}>
                    Tour our Kajiado rangelands, taste artisanal cheese, and view champion pedigree stock.
                  </p>
                )}
              </div>

              <div
                className="mt-6 pt-4 border-t flex items-center justify-between"
                style={{ borderColor: "rgba(196,136,42,0.1)" }}
              >
                <span className="text-[11px] font-mono" style={{ color: "rgba(245,239,228,0.4)" }}>Kajiado County, Kenya</span>
                <Link href="/visit" className="text-xs font-mono font-bold hover:underline" style={{ color: "#C4882A" }}>
                  Schedule Experience
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === "orders" && (
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(245,239,228,0.02)",
            border: "1px solid rgba(196,136,42,0.14)",
          }}
        >
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b"
            style={{ borderColor: "rgba(196,136,42,0.1)" }}
          >
            <div>
              <h2 className="font-light text-2xl" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>Complete Order History</h2>
              <p className="text-xs font-mono mt-0.5" style={{ color: "rgba(245,239,228,0.4)" }}>
                Every transaction, delivery tracking, and invoice receipt
              </p>
            </div>
            <Link
              href="/barn"
              className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg self-start sm:self-auto"
              style={{
                background: "linear-gradient(135deg, #C4882A, #D99A30)",
                color: "#1C1208",
              }}
            >
              Place New Order
            </Link>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl p-5 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(196,136,42,0.12)",
                  }}
                >
                  <div
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b"
                    style={{ borderColor: "rgba(196,136,42,0.08)" }}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold" style={{ color: "#C4882A" }}>
                          #{order.id.slice(-8).toUpperCase()}
                        </span>
                        <span className="text-xs font-mono" style={{ color: "rgba(245,239,228,0.4)" }}>
                          &bull; {new Date(order.createdAt).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                      {order.deliveryAddress && (
                        <div className="text-[11px] font-mono mt-1" style={{ color: "rgba(245,239,228,0.4)" }}>
                          <i className="bi bi-geo-alt mr-1 text-[#C4882A]" />
                          {order.deliveryAddress}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-mono text-base font-bold" style={{ color: "#F5EFE4" }}>
                          KES {order.totalAmount.toLocaleString()}
                        </div>
                        <div className="text-[10px] font-mono" style={{ color: "rgba(245,239,228,0.4)" }}>
                          {order.paymentMethod || "M-Pesa"}
                        </div>
                      </div>
                      <Badge label={order.status} />
                    </div>
                  </div>

                  <div className="pt-3 space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs">
                        <span style={{ color: "#F5EFE4" }}>
                          {item.name} <span style={{ color: "rgba(245,239,228,0.4)" }}>&times; {item.quantity}</span>
                        </span>
                        <span className="font-mono" style={{ color: "rgba(245,239,228,0.5)" }}>
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
              <i className="bi bi-receipt text-5xl block mb-3" style={{ color: "rgba(196,136,42,0.3)" }} />
              <h3 className="font-light text-xl mb-1" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>No Orders Found</h3>
              <p className="text-xs font-mono max-w-sm mx-auto mb-6" style={{ color: "rgba(245,239,228,0.4)" }}>
                You haven&apos;t placed any orders yet. Visit the Barn Store to purchase pasture-fed meat and farm supplies.
              </p>
              <Link
                href="/barn"
                className="px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg inline-block"
                style={{
                  background: "linear-gradient(135deg, #C4882A, #D99A30)",
                  color: "#1C1208",
                }}
              >
                Browse The Barn
              </Link>
            </div>
          )}
        </div>
      )}

      {/* SUBSCRIPTIONS TAB */}
      {activeTab === "subscriptions" && (
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(245,239,228,0.02)",
            border: "1px solid rgba(196,136,42,0.14)",
          }}
        >
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b"
            style={{ borderColor: "rgba(196,136,42,0.1)" }}
          >
            <div>
              <h2 className="font-light text-2xl" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>Recurring Harvest Subscriptions</h2>
              <p className="text-xs font-mono mt-0.5" style={{ color: "rgba(245,239,228,0.4)" }}>
                Fresh farm-to-table deliveries on a recurring schedule
              </p>
            </div>
            <Link
              href="/barn"
              className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg self-start sm:self-auto"
              style={{
                background: "linear-gradient(135deg, #C4882A, #D99A30)",
                color: "#1C1208",
              }}
            >
              Add Farm Box
            </Link>
          </div>

          {subscriptions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 rounded-xl flex flex-col justify-between"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(196,136,42,0.12)",
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-xs"
                        style={{
                          background: "rgba(196,136,42,0.1)",
                          color: "#C4882A",
                          border: "1px solid rgba(196,136,42,0.25)",
                        }}
                      >
                        {sub.categoryName}
                      </span>
                      <Badge label={sub.status} />
                    </div>

                    <h3 className="font-medium text-lg mb-1" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>{sub.productName}</h3>
                    <div className="text-xs font-mono mb-3" style={{ color: "rgba(245,239,228,0.4)" }}>
                      Cadence: <span style={{ color: "#C4882A" }}>{sub.frequency}</span>
                    </div>

                    {sub.nextDelivery && (
                      <div
                        className="text-xs font-mono p-2.5 rounded-lg flex items-center gap-2"
                        style={{
                          background: "rgba(61,107,62,0.1)",
                          color: "#4E8A4F",
                          border: "1px solid rgba(61,107,62,0.25)",
                        }}
                      >
                        <i className="bi bi-clock-history" />
                        <span>Next dispatch: {new Date(sub.nextDelivery).toLocaleDateString("en-KE", { dateStyle: "medium" })}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <i className="bi bi-arrow-repeat text-5xl block mb-3" style={{ color: "rgba(196,136,42,0.3)" }} />
              <h3 className="font-light text-xl mb-1" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>No Active Subscriptions</h3>
              <p className="text-xs font-mono max-w-sm mx-auto mb-6" style={{ color: "rgba(245,239,228,0.4)" }}>
                Receive recurring weekly pasture eggs, dairy, or fresh butchery cuts straight from our Kajiado ranch.
              </p>
              <Link
                href="/barn"
                className="px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg inline-block"
                style={{
                  background: "linear-gradient(135deg, #C4882A, #D99A30)",
                  color: "#1C1208",
                }}
              >
                Discover Farm Boxes
              </Link>
            </div>
          )}
        </div>
      )}

      {/* VISITS TAB */}
      {activeTab === "visits" && (
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(245,239,228,0.02)",
            border: "1px solid rgba(196,136,42,0.14)",
          }}
        >
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b"
            style={{ borderColor: "rgba(196,136,42,0.1)" }}
          >
            <div>
              <h2 className="font-light text-2xl" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>Ranch Tours &amp; Reservations</h2>
              <p className="text-xs font-mono mt-0.5" style={{ color: "rgba(245,239,228,0.4)" }}>
                Private livestock tours, pasture walks, and family ranch visits
              </p>
            </div>
            <Link
              href="/visit"
              className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg self-start sm:self-auto"
              style={{
                background: "linear-gradient(135deg, #C4882A, #D99A30)",
                color: "#1C1208",
              }}
            >
              Schedule New Visit
            </Link>
          </div>

          {visits.length > 0 ? (
            <div className="space-y-4">
              {visits.map((visit) => (
                <div
                  key={visit.id}
                  className="rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(196,136,42,0.12)",
                  }}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-bold" style={{ color: "#F5EFE4" }}>
                        {new Date(visit.visitDate).toLocaleDateString("en-KE", { dateStyle: "full" })}
                      </span>
                    </div>
                    <div className="text-xs font-mono mt-1" style={{ color: "rgba(245,239,228,0.4)" }}>
                      Guest Count: <span style={{ color: "#C4882A" }}>{visit.groupSize} people</span>
                      {visit.purpose && <span> &bull; Purpose: {visit.purpose}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge label={visit.status} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <i className="bi bi-geo-alt text-5xl block mb-3" style={{ color: "rgba(196,136,42,0.3)" }} />
              <h3 className="font-light text-xl mb-1" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>No Visits Scheduled</h3>
              <p className="text-xs font-mono max-w-sm mx-auto mb-6" style={{ color: "rgba(245,239,228,0.4)" }}>
                Book an exclusive pastoral tour across our 4,200 acres in Kajiado. Experience regenerative pasture management and purebred Boran herds.
              </p>
              <Link
                href="/visit"
                className="px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg inline-block"
                style={{
                  background: "linear-gradient(135deg, #C4882A, #D99A30)",
                  color: "#1C1208",
                }}
              >
                Book Farm Visit
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ── 5. SUPPLY HARVEST MODAL ── */}
      {showAddProduceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className="rounded-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            style={{
              background: "rgba(18,11,4,0.98)",
              border: "1px solid rgba(196,136,42,0.25)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.8)",
            }}
          >
            <button
              onClick={() => setShowAddProduceModal(false)}
              className="absolute top-5 right-5 text-lg hover:text-white transition-colors"
              style={{ color: "rgba(245,239,228,0.4)" }}
              aria-label="Close dialog"
            >
              <i className="bi bi-x-lg" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: "#C4882A" }}>
                Ranch Outgrower Network
              </span>
              <h3 className="text-2xl font-light mt-1" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>
                Supply Harvest to Osotua
              </h3>
              <p className="text-xs font-mono mt-1" style={{ color: "rgba(245,239,228,0.4)" }}>
                Submit your organic honey, hay, grains, or dairy batch to the Osotua Cold Room registry.
              </p>
            </div>

            <form onSubmit={handleProduceSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: "rgba(245,239,228,0.6)" }}>
                  Item / Harvest Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pure Acacia Blossom Honey"
                  value={produceForm.name}
                  onChange={(e) => setProduceForm({ ...produceForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs font-mono focus:outline-none transition-all"
                  style={{
                    background: "rgba(245,239,228,0.04)",
                    border: "1px solid rgba(196,136,42,0.2)",
                    color: "#F5EFE4",
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: "rgba(245,239,228,0.6)" }}>
                    Unit Price (KES) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1200"
                    value={produceForm.price}
                    onChange={(e) => setProduceForm({ ...produceForm, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg text-xs font-mono focus:outline-none transition-all"
                    style={{
                      background: "rgba(245,239,228,0.04)",
                      border: "1px solid rgba(196,136,42,0.2)",
                      color: "#F5EFE4",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: "rgba(245,239,228,0.6)" }}>
                    Unit of Measure
                  </label>
                  <select
                    value={produceForm.unit}
                    onChange={(e) => setProduceForm({ ...produceForm, unit: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg text-xs font-mono focus:outline-none transition-all"
                    style={{
                      background: "#181006",
                      border: "1px solid rgba(196,136,42,0.2)",
                      color: "#F5EFE4",
                    }}
                  >
                    <option value="kg">Per Kg</option>
                    <option value="liter">Per Liter</option>
                    <option value="jar">500g Glass Jar</option>
                    <option value="bale">Standard Bale</option>
                    <option value="tray">30-Egg Tray</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: "rgba(245,239,228,0.6)" }}>
                    Category
                  </label>
                  <select
                    value={produceForm.categoryId}
                    onChange={(e) => setProduceForm({ ...produceForm, categoryId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg text-xs font-mono focus:outline-none transition-all"
                    style={{
                      background: "#181006",
                      border: "1px solid rgba(196,136,42,0.2)",
                      color: "#F5EFE4",
                    }}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: "rgba(245,239,228,0.6)" }}>
                    Batch Quantity
                  </label>
                  <input
                    type="number"
                    value={produceForm.stockQty}
                    onChange={(e) => setProduceForm({ ...produceForm, stockQty: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg text-xs font-mono focus:outline-none transition-all"
                    style={{
                      background: "rgba(245,239,228,0.04)",
                      border: "1px solid rgba(196,136,42,0.2)",
                      color: "#F5EFE4",
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: "rgba(245,239,228,0.6)" }}>
                  Harvest &amp; Origin Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Harvested at organic rangelands in Kajiado, filtered naturally..."
                  value={produceForm.description}
                  onChange={(e) => setProduceForm({ ...produceForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs font-mono focus:outline-none transition-all"
                  style={{
                    background: "rgba(245,239,228,0.04)",
                    border: "1px solid rgba(196,136,42,0.2)",
                    color: "#F5EFE4",
                  }}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddProduceModal(false)}
                  className="px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider text-[rgba(245,239,228,0.5)] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all disabled:opacity-50"
                  style={{
                    background: "linear-gradient(135deg, #C4882A, #D99A30)",
                    color: "#1C1208",
                    boxShadow: "0 4px 16px rgba(196,136,42,0.3)",
                  }}
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
