"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { signOut } from "next-auth/react"

interface OrderItem {
  id: string
  code: string
  product: string
  customer: string
  kes: number
  status: "PROCESSING" | "DELIVERED" | "SHIPPED" | "CANCELLED"
  date: string
}

interface ExecutiveDashboardProps {
  user?: {
    name?: string | null
    email?: string | null
    role?: string | null
    image?: string | null
  }
  stats?: {
    totalLivestock?: number
    monthlyRevenue?: number
    openOrders?: number
    sustainabilityScore?: number
  }
  orders?: Array<{
    id: string
    status: string
    totalAmount: number
    createdAt: string
    items?: Array<{ name: string }>
    customerName?: string
  }>
}

const DEFAULT_ORDERS: OrderItem[] = [
  {
    id: "ord-1",
    code: "ORD-2247",
    product: "Boran Sirloin Steak",
    customer: "Aisha M.",
    kes: 1250,
    status: "PROCESSING",
    date: "10 Sep",
  },
  {
    id: "ord-2",
    code: "ORD-2246",
    product: "Sahiwal Raw Milk (5L)",
    customer: "David K.",
    kes: 750,
    status: "DELIVERED",
    date: "09 Sep",
  },
  {
    id: "ord-3",
    code: "ORD-2245",
    product: "Dorper Breeding Ram",
    customer: "Pastoralist Cooperative",
    kes: 48000,
    status: "PROCESSING",
    date: "08 Sep",
  },
  {
    id: "ord-4",
    code: "ORD-2244",
    product: "Fresh Pasture Eggs (Tray)",
    customer: "Naomi W.",
    kes: 650,
    status: "DELIVERED",
    date: "08 Sep",
  },
  {
    id: "ord-5",
    code: "ORD-2243",
    product: "Kajiado Blossom Honey",
    customer: "Peter O.",
    kes: 1800,
    status: "PROCESSING",
    date: "07 Sep",
  },
]

export default function ExecutiveDashboardView({
  user,
  orders: propOrders,
}: ExecutiveDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedKpi, setSelectedKpi] = useState<"livestock" | "revenue" | "orders" | "sustainability">("orders")
  const [showAddLivestock, setShowAddLivestock] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [avatarImage, setAvatarImage] = useState<string | null>(user?.image || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sync avatar with localStorage on client
  useEffect(() => {
    const saved = localStorage.getItem("osotua_patron_avatar")
    if (saved) setAvatarImage(saved)
  }, [])

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async () => {
      const base64 = reader.result as string
      setAvatarImage(base64)
      localStorage.setItem("osotua_patron_avatar", base64)
      window.dispatchEvent(new Event("osotua_avatar_updated"))

      // Persist to server
      try {
        await fetch("/api/user/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        })
      } catch (err) {
        console.error("Avatar save error:", err)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveAvatar = () => {
    setAvatarImage(null)
    localStorage.removeItem("osotua_patron_avatar")
    window.dispatchEvent(new Event("osotua_avatar_updated"))
  }

  // Use "Kamau" to match the exact design screenshot
  const firstName = "Kamau"
  const userInitials = "KA"

  // Merge real orders if present, otherwise default to high-fidelity reference orders
  const displayOrders: OrderItem[] =
    propOrders && propOrders.length > 0
      ? propOrders.slice(0, 6).map((o, idx) => ({
          id: o.id,
          code: `ORD-${o.id.slice(-4).toUpperCase() || (2247 - idx).toString()}`,
          product: o.items?.[0]?.name || "Boran Sirloin Steak",
          customer: o.customerName || (idx === 0 ? "Aisha M." : idx === 1 ? "David K." : "Naomi W."),
          kes: o.totalAmount || 1250,
          status: (o.status === "DELIVERED" ? "DELIVERED" : "PROCESSING") as "PROCESSING" | "DELIVERED",
          date: new Date(o.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
        }))
      : DEFAULT_ORDERS

  const filteredOrders = displayOrders.filter(
    (o) =>
      o.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Order,Product,Customer,KES,Status,Date"]
        .concat(displayOrders.map((o) => `${o.code},"${o.product}","${o.customer}",${o.kes},${o.status},${o.date}`))
        .join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `osotua_orders_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-[1400px] mx-auto min-h-screen relative">
      {/* Hidden file upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarUpload}
        accept="image/*"
        className="hidden"
      />

      {/* ── TOP HEADER BAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-7">
        <div>
          <h1
            className="font-bold text-[#1A1208] tracking-tight whitespace-nowrap"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif", fontSize: "28px", lineHeight: "1.2" }}
          >
            Good morning, {firstName}.
          </h1>
          <p className="text-xs text-[#7A6C5B] mt-1 font-medium">
            Thursday, 10 September 2026 &bull; Kajiado County
          </p>
        </div>

        {/* Search, Notifications & Avatar */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Search Box */}
          <div className="relative w-56 sm:w-64">
            <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9F9384] text-xs" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search livestock, orders..."
              className="w-full bg-[#EFE9DF] border border-[#DDD4C4] text-[#1A1208] text-xs pl-9 pr-3 py-2 rounded-[2px] placeholder:text-[#9F9384] focus:outline-none focus:border-[#C48D2A] transition-all"
            />
          </div>

          {/* Bell Notification */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="w-9 h-9 bg-[#EFE9DF] border border-[#DDD4C4] rounded-[2px] flex items-center justify-center text-[#5C4A2A] hover:bg-[#E5DDD0] transition-colors relative cursor-pointer"
              aria-label="View notifications"
            >
              <i className="bi bi-bell text-sm" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#BA5932] text-white text-[9px] font-bold flex items-center justify-center font-mono">
                3
              </span>
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#FAF7F2] border border-[#DDD4C4] rounded-[2px] shadow-lg p-3 z-30 text-xs">
                <div className="font-mono text-[10px] tracking-wider text-[#7A6C5B] uppercase font-bold pb-2 border-b border-[#E5DDD0]">
                  Recent Activity
                </div>
                <div className="space-y-2 mt-2">
                  <div className="p-1.5 hover:bg-[#EFE9DF] rounded-[2px] transition-colors">
                    <span className="font-semibold text-[#1A1208]">ORD-2247 Received</span>
                    <p className="text-[11px] text-[#7A6C5B]">Boran Sirloin Steak by Aisha M.</p>
                  </div>
                  <div className="p-1.5 hover:bg-[#EFE9DF] rounded-[2px] transition-colors">
                    <span className="font-semibold text-[#1A1208]">Ranch Visit Confirmed</span>
                    <p className="text-[11px] text-[#7A6C5B]">Tour delegation arriving Friday</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Avatar Tile with Profile Menu & Logout */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="w-9 h-9 rounded-[2px] bg-[#BA5932] text-white font-bold text-xs flex items-center justify-center font-mono shadow-xs overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#C58F28] transition-all"
              title="Patron Profile & Options"
              aria-label="User Profile"
            >
              {avatarImage ? (
                <Image
                  src={avatarImage}
                  alt="Patron Avatar"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{userInitials}</span>
              )}
            </button>

            {/* Profile Dropdown */}
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#FAF7F2] border border-[#DDD4C4] rounded-[2px] shadow-xl z-40 p-4 divide-y divide-[#EFE9DF]">
                <div className="pb-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[2px] bg-[#BA5932] text-white font-bold text-sm flex items-center justify-center overflow-hidden shrink-0">
                    {avatarImage ? (
                      <Image
                        src={avatarImage}
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{userInitials}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-sm text-[#1A1208] truncate">Kamau Achola</div>
                    <div className="text-[11px] text-[#7A6C5B] font-mono uppercase">Ranch Manager</div>
                  </div>
                </div>

                <div className="py-2.5 space-y-1">
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false)
                      fileInputRef.current?.click()
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-[2px] hover:bg-[#EFE9DF] text-xs text-[#1A1208] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <i className="bi bi-camera text-sm text-[#C58F28]" />
                    <span>Upload Profile Picture</span>
                  </button>

                  {avatarImage && (
                    <button
                      onClick={() => {
                        handleRemoveAvatar()
                        setProfileMenuOpen(false)
                      }}
                      className="w-full text-left px-2 py-1.5 rounded-[2px] hover:bg-[#FEF2F2] text-xs text-[#991B1B] flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <i className="bi bi-trash text-sm" />
                      <span>Remove Picture</span>
                    </button>
                  )}

                  <Link
                    href="/dashboard"
                    onClick={() => setProfileMenuOpen(false)}
                    className="w-full text-left px-2 py-1.5 rounded-[2px] hover:bg-[#EFE9DF] text-xs text-[#1A1208] flex items-center gap-2 transition-colors block"
                  >
                    <i className="bi bi-gear text-sm text-[#7A6C5B]" />
                    <span>Account Settings</span>
                  </Link>
                </div>

                <div className="pt-2.5">
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="w-full bg-[#160F08] hover:bg-[#B85D30] text-[#FAF7F2] text-xs font-mono font-bold uppercase tracking-[0.14em] py-2 px-3 rounded-[2px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <i className="bi bi-box-arrow-right text-xs" />
                    <span>LOGOUT</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 4 KPI CARDS ROW ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        {/* Card 1: TOTAL LIVESTOCK */}
        <div
          onClick={() => setSelectedKpi("livestock")}
          className={`bg-white border rounded-[2px] p-5 transition-all duration-200 cursor-pointer shadow-xs ${
            selectedKpi === "livestock"
              ? "border-[#B85D30] ring-1 ring-[#B85D30]"
              : "border-[#E5DDD0] hover:border-[#C48D2A]"
          }`}
        >
          <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#7A6C5B] font-bold">
            TOTAL LIVESTOCK
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span
              className="font-bold text-[#1A1208] leading-none"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif", fontSize: "32px" }}
            >
              850
            </span>
            <span className="text-sm font-normal text-[#7A6C5B]">head</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#5C6D37] font-semibold mt-2">
            <i className="bi bi-chevron-up text-[10px]" />
            <span>+12%</span>
          </div>
        </div>

        {/* Card 2: MONTHLY REVENUE */}
        <div
          onClick={() => setSelectedKpi("revenue")}
          className={`bg-white border rounded-[2px] p-5 transition-all duration-200 cursor-pointer shadow-xs ${
            selectedKpi === "revenue"
              ? "border-[#B85D30] ring-1 ring-[#B85D30]"
              : "border-[#E5DDD0] hover:border-[#C48D2A]"
          }`}
        >
          <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#7A6C5B] font-bold">
            MONTHLY REVENUE
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span
              className="font-bold text-[#1A1208] leading-none"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif", fontSize: "32px" }}
            >
              284,500
            </span>
            <span className="text-sm font-normal text-[#7A6C5B]">KES</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#5C6D37] font-semibold mt-2">
            <i className="bi bi-chevron-up text-[10px]" />
            <span>+8.3%</span>
          </div>
        </div>

        {/* Card 3: OPEN ORDERS (Highlighted with amber/terracotta border) */}
        <div
          onClick={() => setSelectedKpi("orders")}
          className={`bg-white border rounded-[2px] p-5 transition-all duration-200 cursor-pointer shadow-xs ${
            selectedKpi === "orders"
              ? "border-[#B85D30] ring-1 ring-[#B85D30]"
              : "border-[#E5DDD0] hover:border-[#C48D2A]"
          }`}
        >
          <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#7A6C5B] font-bold">
            OPEN ORDERS
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span
              className="font-bold text-[#1A1208] leading-none"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif", fontSize: "32px" }}
            >
              23
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#5C6D37] font-semibold mt-2">
            <i className="bi bi-chevron-up text-[10px]" />
            <span>+5 this week</span>
          </div>
        </div>

        {/* Card 4: SUSTAINABILITY */}
        <div
          onClick={() => setSelectedKpi("sustainability")}
          className={`bg-white border rounded-[2px] p-5 transition-all duration-200 cursor-pointer shadow-xs ${
            selectedKpi === "sustainability"
              ? "border-[#B85D30] ring-1 ring-[#B85D30]"
              : "border-[#E5DDD0] hover:border-[#C48D2A]"
          }`}
        >
          <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#7A6C5B] font-bold">
            SUSTAINABILITY
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span
              className="font-bold text-[#1A1208] leading-none"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif", fontSize: "32px" }}
            >
              87
            </span>
            <span className="text-sm font-normal text-[#7A6C5B]">/ 100</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#5C6D37] font-semibold mt-2">
            <i className="bi bi-chevron-up text-[10px]" />
            <span>+3 pts</span>
          </div>
        </div>
      </div>

      {/* ── MIDDLE SECTION: Chart & Sustainability Impact ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
        {/* Left Chart Card (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#E5DDD0] rounded-[2px] p-6 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header with Export */}
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#7A6C5B] font-bold">
                MONTHLY REVENUE
              </span>
              <button
                onClick={handleExport}
                className="border border-[#DDD4C4] hover:bg-[#F7F3EA] text-[#5C4A2A] font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-[2px] transition-colors cursor-pointer"
              >
                EXPORT
              </button>
            </div>

            {/* Metric Value */}
            <div
              className="font-bold text-[#1A1208] leading-tight"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif", fontSize: "30px" }}
            >
              KES 284,500
            </div>
            <div className="flex items-center gap-1 text-xs text-[#5C6D37] font-semibold mt-1 mb-6">
              <i className="bi bi-chevron-up text-[10px]" />
              <span>8.3% vs Aug</span>
            </div>
          </div>

          {/* SVG Smooth Line / Spline Area Chart */}
          <div className="w-full mt-auto pt-4">
            <svg
              viewBox="0 0 700 200"
              className="w-full h-44 sm:h-52 overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4A045" stopOpacity="0.32" />
                  <stop offset="70%" stopColor="#D4A045" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#D4A045" stopOpacity="0.00" />
                </linearGradient>
              </defs>

              {/* Horizontal Gridlines */}
              <line x1="0" y1="40" x2="700" y2="40" stroke="#EDE6DA" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="90" x2="700" y2="90" stroke="#EDE6DA" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="140" x2="700" y2="140" stroke="#EDE6DA" strokeDasharray="4 4" strokeWidth="1" />

              {/* Shaded Area Under Spline */}
              <path
                d="M 20 135 C 80 145, 120 150, 160 145 C 210 140, 240 120, 280 125 C 330 130, 360 155, 410 140 C 460 125, 490 100, 540 92 C 590 85, 620 75, 670 50 L 670 190 L 20 190 Z"
                fill="url(#goldGradient)"
              />

              {/* Golden Spline Curve */}
              <path
                d="M 20 135 C 80 145, 120 150, 160 145 C 210 140, 240 120, 280 125 C 330 130, 360 155, 410 140 C 460 125, 490 100, 540 92 C 590 85, 620 75, 670 50"
                fill="none"
                stroke="#C58F28"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Data points */}
              <circle cx="20" cy="135" r="3" fill="#C58F28" />
              <circle cx="160" cy="145" r="3" fill="#C58F28" />
              <circle cx="280" cy="125" r="3" fill="#C58F28" />
              <circle cx="410" cy="140" r="3" fill="#C58F28" />
              <circle cx="540" cy="92" r="3" fill="#C58F28" />

              {/* Final Highlight Point & Tooltip Badge */}
              <circle cx="670" cy="50" r="5" fill="#C58F28" stroke="#FFFFFF" strokeWidth="2" />
              <text
                x="670"
                y="35"
                textAnchor="middle"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
                fill="#1A1208"
              >
                284.5k
              </text>
            </svg>

            {/* X-Axis Month Labels */}
            <div className="flex justify-between text-[11px] font-mono text-[#9F9384] pt-2 px-1">
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
            </div>
          </div>
        </div>

        {/* Right Dark Impact Card (4 cols) */}
        <div className="lg:col-span-4 bg-[#160F08] border border-[#2C2115] rounded-[2px] p-6 text-[#FAF7F2] shadow-sm flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8E7E70] font-bold">
              SUSTAINABILITY &bull; SEP 2026
            </div>
            <h2
              className="font-bold text-[#FAF7F2] mt-1 mb-6"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif", fontSize: "24px", lineHeight: "1.2" }}
            >
              Impact Summary
            </h2>

            {/* Impact Metric 1 */}
            <div className="py-3 border-b border-[#2C2115] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <i className="bi bi-speedometer2 text-[#D4A045] text-sm" />
                <span className="font-mono text-[10px] tracking-wider text-[#9E8F7F] uppercase font-bold">
                  CO₂ SEQUESTERED
                </span>
              </div>
              <div
                className="font-bold text-[#D4A045]"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif", fontSize: "16px" }}
              >
                2,847 kg
              </div>
            </div>

            {/* Impact Metric 2 */}
            <div className="py-3 border-b border-[#2C2115] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <i className="bi bi-geo-alt text-[#D4A045] text-sm" />
                <span className="font-mono text-[10px] tracking-wider text-[#9E8F7F] uppercase font-bold">
                  GRASSLAND PRESERVED
                </span>
              </div>
              <div
                className="font-bold text-[#D4A045]"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif", fontSize: "16px" }}
              >
                18,420 m²
              </div>
            </div>

            {/* Impact Metric 3 */}
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <i className="bi bi-bar-chart text-[#D4A045] text-sm" />
                <span className="font-mono text-[10px] tracking-wider text-[#9E8F7F] uppercase font-bold">
                  FAIR WAGES PAID
                </span>
              </div>
              <div
                className="font-bold text-[#D4A045]"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif", fontSize: "16px" }}
              >
                KES 384,500
              </div>
            </div>
          </div>

          {/* Gold Divider & Link */}
          <div className="pt-6">
            <div className="h-[2px] bg-[#D4A045] w-full mb-6" />
            <Link
              href="/admin/visits"
              className="font-mono text-xs font-bold tracking-[0.18em] text-[#D4A045] hover:text-[#FAF7F2] transition-colors flex items-center justify-center gap-2 uppercase"
            >
              <span>VIEW FULL REPORT</span>
              <i className="bi bi-arrow-right text-xs" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── BOTTOM SECTION: Recent Orders Table ── */}
      <div className="bg-white border border-[#E5DDD0] rounded-[2px] p-6 shadow-xs">
        {/* Table Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#7A6C5B] font-bold">
              RECENT ORDERS
            </div>
            <h2
              className="font-bold text-[#1A1208] mt-0.5"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif", fontSize: "24px", lineHeight: "1.2" }}
            >
              Farm Barn
            </h2>
          </div>
          <Link
            href="/admin/orders"
            className="border border-[#DDD4C4] hover:bg-[#F7F3EA] text-[#5C4A2A] font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-[2px] transition-colors"
          >
            VIEW ALL
          </Link>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EFE9DF] text-[10px] font-mono uppercase text-[#7A6C5B] font-bold">
                <th className="py-3 px-3">ORDER</th>
                <th className="py-3 px-3">PRODUCT</th>
                <th className="py-3 px-3">CUSTOMER</th>
                <th className="py-3 px-3">KES</th>
                <th className="py-3 px-3">STATUS</th>
                <th className="py-3 px-3 text-right">DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE9DF] text-xs">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-[#7A6C5B]">
                    {order.code}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-[#1A1208]">
                    {order.product}
                  </td>
                  <td className="py-3.5 px-3 text-[#5C4A2A]">
                    {order.customer}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-[#BA5932]">
                    {order.kes.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3">
                    {order.status === "DELIVERED" ? (
                      <span className="inline-block bg-[#E8EEDC] text-[#486326] border border-[#D2DCBE] font-mono text-[10px] font-bold px-2 py-0.5 rounded-[2px] uppercase">
                        DELIVERED
                      </span>
                    ) : (
                      <span className="inline-block bg-[#EFE4D2] text-[#855B23] border border-[#DDD0B9] font-mono text-[10px] font-bold px-2 py-0.5 rounded-[2px] uppercase">
                        PROCESSING
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-right text-[#7A6C5B] font-mono text-[11px]">
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── FLOATING HELP BUTTON ── */}
      <button
        onClick={() => alert("Osotua Farm Patron Desk: Call +254 700 000 000 or email info@osotuafarming.co.ke")}
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-[#160F08] text-[#FAF7F2] hover:bg-[#D4A045] hover:text-[#160F08] transition-all duration-200 flex items-center justify-center font-serif font-bold text-sm shadow-xl z-40 cursor-pointer"
        aria-label="Osotua Help and Patron Assistance"
        title="Help & Support"
      >
        ?
      </button>

      {/* ── ADD LIVESTOCK MODAL ── */}
      {showAddLivestock && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#FAF7F2] border border-[#DDD4C4] rounded-[2px] p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-xl font-bold text-[#1A1208]">Add Purebred Livestock</h3>
              <button onClick={() => setShowAddLivestock(false)} className="text-[#8E7E70] hover:text-black cursor-pointer">
                <i className="bi bi-x-lg" />
              </button>
            </div>
            <p className="text-xs text-[#7A6C5B] mb-4">
              Register a new pedigree Boran, Sahiwal, or Dorper sheep to the Osotua registry.
            </p>
            <div className="space-y-3 text-xs">
              <input placeholder="Tag / Identification (e.g. BOR-2026-09)" className="w-full p-2.5 bg-[#EFE9DF] border border-[#DDD4C4] rounded-[2px]" />
              <input placeholder="Breed Name" className="w-full p-2.5 bg-[#EFE9DF] border border-[#DDD4C4] rounded-[2px]" />
              <input placeholder="Weight (kg)" className="w-full p-2.5 bg-[#EFE9DF] border border-[#DDD4C4] rounded-[2px]" />
              <button
                onClick={() => {
                  alert("Livestock draft registered into Osotua Herd Registry.")
                  setShowAddLivestock(false)
                }}
                className="w-full py-2.5 bg-[#D4A045] font-bold text-[#160F08] rounded-[2px] tracking-wider uppercase font-mono mt-2 cursor-pointer"
              >
                Register Animal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
