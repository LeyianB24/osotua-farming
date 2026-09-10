"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { cn } from "@/lib/utils"

const mainNav = [
  { label: "Overview", href: "/dashboard", icon: "bi-grid-fill" },
  { label: "Livestock", href: "/admin/livestock", icon: "bi-shield-shaded" },
  { label: "The Barn", href: "/admin/products", icon: "bi-house-door" },
  { label: "Sustainability", href: "/admin/visits", icon: "bi-speedometer2" },
  { label: "Orders", href: "/admin/orders", icon: "bi-calendar4-event" },
  { label: "Ranch Visits", href: "/admin/visits", icon: "bi-geo-alt" },
  { label: "Reports", href: "/admin/sales", icon: "bi-bar-chart" },
]

const accountNav = [
  { label: "Settings", href: "/dashboard", icon: "bi-gear" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Use Kamau Achola or session user
  const userName = session?.user?.name || "Kamau Achola"
  const userRole = "Ranch Manager"
  const userInitials =
    userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "KA"

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] text-[#1A1208]">
      {/* ── MOBILE TOP BAR (< lg) ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 z-50 flex items-center justify-between px-4 bg-[#160F08] border-b border-[#2C2115]">
        <Link href="/" className="flex items-baseline gap-2">
          <span
            className="text-[#D4A045] font-serif italic text-lg font-normal tracking-wide"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            Osotua
          </span>
          <span className="text-[#D4A045]/90 text-[9px] tracking-[0.25em] font-sans font-semibold uppercase">
            FARMING
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-9 h-9 rounded flex items-center justify-center text-[#D4A045] hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <i className={cn("bi text-lg", mobileOpen ? "bi-x-lg" : "bi-list")} />
        </button>
      </div>

      {/* ── MOBILE OVERLAY ── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* ── MOBILE DRAWER SIDEBAR (< lg) ── */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 h-full w-[250px] flex flex-col z-50 transition-transform duration-300 bg-[#160F08] border-r border-[#2C2115] text-[#FAF7F2]",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="px-6 py-6 border-b border-[#2C2115]/80">
          <Link href="/" className="block group">
            <div className="flex items-baseline gap-2">
              <span
                className="text-[#D4A045] italic text-xl font-normal tracking-wide"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                Osotua
              </span>
              <span className="text-[#D4A045]/90 text-[10px] tracking-[0.25em] font-sans font-semibold uppercase">
                FARMING
              </span>
            </div>
            <div className="text-[9px] font-mono tracking-[0.22em] text-[#8E7E70] uppercase mt-1">
              MEMBER DASHBOARD
            </div>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          <div>
            <div className="px-3 mb-2">
              <span className="text-[9px] font-mono tracking-[0.22em] text-[#6E5D4B] uppercase font-bold">
                MAIN
              </span>
            </div>
            <nav className="space-y-0.5">
              {mainNav.map((item) => {
                const active = path === item.href
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-[2px] text-xs transition-colors duration-150",
                      active
                        ? "text-[#D4A045] bg-[#2A1D11] font-semibold"
                        : "text-[#9E8F7F] hover:text-[#FAF7F2] hover:bg-white/[0.03]"
                    )}
                  >
                    <i className={cn("bi text-sm flex-shrink-0", item.icon, active ? "text-[#D4A045]" : "text-[#7A6C5B]")} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div>
            <div className="px-3 mb-2">
              <span className="text-[9px] font-mono tracking-[0.22em] text-[#6E5D4B] uppercase font-bold">
                ACCOUNT
              </span>
            </div>
            <nav className="space-y-0.5">
              {accountNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-[2px] text-xs text-[#9E8F7F] hover:text-[#FAF7F2] hover:bg-white/[0.03]"
                >
                  <i className={cn("bi text-sm flex-shrink-0 text-[#7A6C5B]", item.icon)} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Action Buttons & Profile */}
        <div className="p-4 border-t border-[#2C2115] bg-[#160F08] space-y-3">
          <Link
            href="/admin/livestock"
            onClick={() => setMobileOpen(false)}
            className="w-full bg-[#D4A045] hover:bg-[#C28E2B] text-[#160F08] font-mono text-[10px] font-bold tracking-[0.16em] py-2.5 px-3 rounded-[2px] transition-colors flex items-center justify-center gap-1.5 uppercase"
          >
            <i className="bi bi-plus-lg text-xs" />
            <span>ADD LIVESTOCK</span>
          </Link>
          <Link
            href="/admin/orders"
            onClick={() => setMobileOpen(false)}
            className="w-full bg-transparent hover:bg-white/5 border border-[#3A2D1F] text-[#D4C9B0] font-mono text-[10px] font-bold tracking-[0.16em] py-2 px-3 rounded-[2px] transition-colors flex items-center justify-center gap-1.5 uppercase"
          >
            <i className="bi bi-plus-lg text-xs" />
            <span>NEW ORDER</span>
          </Link>
          <div className="flex items-center gap-3 pt-2 border-t border-[#2C2115]/80">
            <div className="w-8 h-8 rounded-[2px] bg-[#BA5932] text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
              {userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[#FAF7F2] truncate">{userName}</div>
              <div className="text-[10px] text-[#8E7E70] truncate">{userRole}</div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-[#8E7E70] hover:text-[#D4A045] p-1 cursor-pointer"
            >
              <i className="bi bi-box-arrow-right text-sm" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── DESKTOP STICKY SIDEBAR (lg+) ── */}
      <aside className="hidden lg:flex flex-col w-[250px] shrink-0 sticky top-0 h-screen bg-[#160F08] border-r border-[#2C2115] text-[#FAF7F2] z-40">
        {/* Brand Header */}
        <div className="px-6 py-6 border-b border-[#2C2115]/80">
          <Link href="/" className="block group">
            <div className="flex items-baseline gap-2">
              <span
                className="text-[#D4A045] italic text-2xl font-normal tracking-wide"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                Osotua
              </span>
              <span className="text-[#D4A045]/90 text-[10px] tracking-[0.25em] font-sans font-semibold uppercase">
                FARMING
              </span>
            </div>
            <div className="text-[9px] font-mono tracking-[0.22em] text-[#8E7E70] uppercase mt-1">
              MEMBER DASHBOARD
            </div>
          </Link>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* Main Section */}
          <div>
            <div className="px-3 mb-2">
              <span className="text-[9px] font-mono tracking-[0.22em] text-[#6E5D4B] uppercase font-bold">
                MAIN
              </span>
            </div>
            <nav className="space-y-0.5">
              {mainNav.map((item) => {
                const active =
                  path === item.href ||
                  (item.href !== "/dashboard" && path.startsWith(item.href))
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-[2px] text-xs transition-colors duration-150 group",
                      active
                        ? "text-[#D4A045] bg-[#2A1D11] font-semibold"
                        : "text-[#9E8F7F] hover:text-[#FAF7F2] hover:bg-white/[0.03]"
                    )}
                  >
                    <i
                      className={cn(
                        "bi text-sm flex-shrink-0 transition-colors",
                        item.icon,
                        active ? "text-[#D4A045]" : "text-[#7A6C5B] group-hover:text-[#D4A045]"
                      )}
                    />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Account Section */}
          <div>
            <div className="px-3 mb-2">
              <span className="text-[9px] font-mono tracking-[0.22em] text-[#6E5D4B] uppercase font-bold">
                ACCOUNT
              </span>
            </div>
            <nav className="space-y-0.5">
              {accountNav.map((item) => {
                const active = path === item.href
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-[2px] text-xs transition-colors duration-150 group",
                      active
                        ? "text-[#D4A045] bg-[#2A1D11] font-semibold"
                        : "text-[#9E8F7F] hover:text-[#FAF7F2] hover:bg-white/[0.03]"
                    )}
                  >
                    <i
                      className={cn(
                        "bi text-sm flex-shrink-0 transition-colors",
                        item.icon,
                        active ? "text-[#D4A045]" : "text-[#7A6C5B] group-hover:text-[#D4A045]"
                      )}
                    />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer with Action Buttons & User Profile */}
        <div className="p-4 border-t border-[#2C2115] bg-[#160F08] space-y-3">
          {/* Quick Action Buttons */}
          <Link
            href="/admin/livestock"
            className="w-full bg-[#D4A045] hover:bg-[#C28E2B] active:scale-[0.99] text-[#160F08] font-mono text-[10px] font-bold tracking-[0.16em] py-2.5 px-3 rounded-[2px] transition-colors flex items-center justify-center gap-1.5 shadow-xs uppercase"
          >
            <i className="bi bi-plus-lg text-xs" />
            <span>ADD LIVESTOCK</span>
          </Link>

          <Link
            href="/admin/orders"
            className="w-full bg-transparent hover:bg-white/5 active:scale-[0.99] border border-[#3A2D1F] text-[#D4C9B0] font-mono text-[10px] font-bold tracking-[0.16em] py-2 px-3 rounded-[2px] transition-colors flex items-center justify-center gap-1.5 uppercase"
          >
            <i className="bi bi-plus-lg text-xs" />
            <span>NEW ORDER</span>
          </Link>

          {/* User Profile Bar */}
          <div className="flex items-center gap-3 pt-2 border-t border-[#2C2115]/80">
            <div className="w-8 h-8 rounded-[2px] bg-[#BA5932] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 font-mono select-none">
              {userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[#FAF7F2] truncate">
                {userName}
              </div>
              <div className="text-[10px] text-[#8E7E70] truncate">
                {userRole}
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-[#8E7E70] hover:text-[#D4A045] p-1 transition-colors cursor-pointer"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <i className="bi bi-box-arrow-right text-sm" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT CANVAS ── */}
      <main className="flex-1 min-w-0 min-h-screen pt-14 lg:pt-0 bg-[#FAF7F2]">
        {children}
      </main>
    </div>
  )
}
