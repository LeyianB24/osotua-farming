"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const nav = [
  { label: "Overview",       href: "/admin",           icon: "bi-speedometer2" },
  { label: "Breeds",         href: "/admin/breeds",    icon: "bi-bullseye" },
  { label: "Livestock",      href: "/admin/livestock", icon: "bi-geo-alt" },
  { label: "Products",       href: "/admin/products",  icon: "bi-box-seam" },
  { label: "Orders",         href: "/admin/orders",    icon: "bi-bag-check" },
  { label: "Customers",      href: "/admin/customers", icon: "bi-people" },
  { label: "Farm Visits",    href: "/admin/visits",    icon: "bi-calendar-check" },
  { label: "Partners",       href: "/admin/partners",  icon: "bi-tree" },
  { label: "Jobs",           href: "/admin/jobs",      icon: "bi-briefcase" },
  { label: "Blog",           href: "/admin/blog",      icon: "bi-pencil-square" },
]

const customerNav = [
  { label: "My Dashboard",      href: "/dashboard",                  icon: "bi-house" },
  { label: "My Orders",         href: "/dashboard/orders",           icon: "bi-bag-check" },
  { label: "My Subscriptions",  href: "/dashboard/subscriptions",    icon: "bi-arrow-repeat" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const isAdmin = path.startsWith("/admin")
  const links = isAdmin ? nav : customerNav
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen text-[#F5EFE4]" style={{ background: "#0E0A05" }}>
      {/* ── MOBILE TOP BAR ─────────────────────────────── */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 h-14 z-50 flex items-center justify-between px-4 border-b"
        style={{
          background: "rgba(18,11,4,0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderColor: "rgba(196,136,42,0.15)",
        }}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #C4882A, #D99A30)",
              boxShadow: "0 2px 8px rgba(196,136,42,0.4)",
            }}
          >
            <span className="text-[#1C1208] font-bold text-[10px]" style={{ fontFamily: "Georgia, serif" }}>OF</span>
          </div>
          <span className="text-xs font-medium tracking-wide" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>
            Osotua Farming
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[#C4882A] hover:bg-white/5 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <i className={cn("bi text-lg", mobileOpen ? "bi-x-lg" : "bi-list")} />
        </button>
      </div>

      {/* ── MOBILE OVERLAY ─────────────────────────────── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* ── SIDEBAR ─────────────────────────────────────── */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-[240px] flex flex-col z-50 transition-transform duration-300 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          background: "rgba(18,11,4,0.98)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          borderRight: "1px solid rgba(196,136,42,0.12)",
        }}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b" style={{ borderColor: "rgba(196,136,42,0.1)" }}>
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #C4882A, #D99A30)",
                boxShadow: "0 4px 16px rgba(196,136,42,0.4)",
              }}
            >
              <span
                className="text-[#1C1208] font-bold text-xs"
                style={{ fontFamily: "Georgia, serif" }}
              >OF</span>
            </div>
            <div>
              <div
                className="text-sm font-medium leading-tight"
                style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}
              >Osotua Farming</div>
              <div
                className="text-[9px] tracking-[0.18em] uppercase mt-0.5"
                style={{ color: "#C4882A", fontFamily: "monospace" }}
              >{isAdmin ? "Admin Portal" : "Member Portal"}</div>
            </div>
          </Link>
        </div>

        {/* Nav label */}
        <div className="px-6 pt-5 pb-2">
          <span
            className="text-[9px] tracking-[0.2em] uppercase"
            style={{ color: "rgba(245,239,228,0.25)", fontFamily: "monospace" }}
          >{isAdmin ? "Management" : "My Account"}</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 pb-4 overflow-y-auto">
          {links.map((link) => {
            const active = path === link.href || (link.href !== "/admin" && link.href !== "/dashboard" && path.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md mb-0.5 text-sm transition-all duration-200 group",
                  active
                    ? "text-[#1C1208]"
                    : "text-[rgba(245,239,228,0.5)] hover:text-[#F5EFE4] hover:bg-white/[0.03]"
                )}
                style={active ? {
                  background: "linear-gradient(135deg, #C4882A, #D99A30)",
                  boxShadow: "0 4px 16px rgba(196,136,42,0.3)",
                } : {}}
              >
                <i className={cn("bi text-base flex-shrink-0", link.icon,
                  active ? "text-[#1C1208]" : "text-[rgba(196,136,42,0.6)] group-hover:text-[#C4882A]"
                )} />
                <span className="font-medium">{link.label}</span>
                {active && (
                  <i className="bi bi-chevron-right text-[10px] ml-auto text-[#1C1208]" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-3 pb-4 border-t pt-4" style={{ borderColor: "rgba(196,136,42,0.1)" }}>
          {isAdmin ? (
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md mb-1 text-sm transition-all duration-200 hover:bg-white/5"
              style={{ color: "rgba(245,239,228,0.6)" }}
            >
              <i className="bi bi-person text-base" style={{ color: "rgba(196,136,42,0.7)" }} />
              <span>Member View</span>
            </Link>
          ) : (
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md mb-1 text-sm transition-all duration-200 hover:bg-white/5"
              style={{ color: "rgba(245,239,228,0.6)" }}
            >
              <i className="bi bi-shield-lock text-base" style={{ color: "rgba(196,136,42,0.7)" }} />
              <span>Admin Portal</span>
            </Link>
          )}
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 hover:bg-white/5"
            style={{ color: "rgba(245,239,228,0.45)" }}
          >
            <i className="bi bi-arrow-left text-base" style={{ color: "rgba(196,136,42,0.5)" }} />
            <span>Back to Site</span>
          </Link>
        </div>
      </aside>

      {/* ── MAIN ────────────────────────────────────────── */}
      <main
        className="flex-1 min-h-screen pt-14 lg:pt-0 lg:ml-[240px]"
        style={{ background: "#0E0A05" }}
      >
        {children}
      </main>
    </div>
  )
}
