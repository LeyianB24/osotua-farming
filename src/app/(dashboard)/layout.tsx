"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  icon: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

const memberSections: NavSection[] = [
  {
    title: "MEMBER COMMAND",
    items: [
      { label: "Overview", href: "/dashboard", icon: "bi-speedometer2" },
      { label: "My Orders", href: "/dashboard/orders", icon: "bi-bag-check-fill" },
      { label: "Subscriptions", href: "/dashboard/subscriptions", icon: "bi-arrow-repeat" },
    ],
  },
  {
    title: "RANCH EXPERIENCES",
    items: [
      { label: "The Barn Store", href: "/barn", icon: "bi-house-door" },
      { label: "Pedigree Breeds", href: "/breeds", icon: "bi-bullseye" },
      { label: "Book Farm Visit", href: "/visit", icon: "bi-geo-alt" },
      { label: "Partner Network", href: "/partners", icon: "bi-tree-fill" },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      { label: "Patron Settings", href: "/dashboard", icon: "bi-gear" },
    ],
  },
]

const adminSections: NavSection[] = [
  {
    title: "COMMAND & METRICS",
    items: [
      { label: "Dashboard HQ", href: "/admin", icon: "bi-grid-1x2-fill" },
      { label: "Terminal Console", href: "/admin/terminal", icon: "bi-terminal-fill" },
    ],
  },
  {
    title: "HERD & LIVESTOCK",
    items: [
      { label: "Pedigree Breeds", href: "/admin/breeds", icon: "bi-bullseye" },
      { label: "Livestock Herd", href: "/admin/livestock", icon: "bi-shield-check" },
      { label: "Fresh Catches", href: "/admin/catches", icon: "bi-basket2-fill" },
      { label: "Cold Room Stocks", href: "/admin/stocks", icon: "bi-boxes" },
    ],
  },
  {
    title: "STORE & COMMERCE",
    items: [
      { label: "Customer Orders", href: "/admin/orders", icon: "bi-box-seam-fill" },
      { label: "Products Catalog", href: "/admin/products", icon: "bi-basket-fill" },
      { label: "Barn Menus", href: "/admin/menus", icon: "bi-card-list" },
      { label: "Sales Ledger", href: "/admin/sales", icon: "bi-receipt-cutoff" },
      { label: "Genetics Imports", href: "/admin/imports", icon: "bi-truck" },
    ],
  },
  {
    title: "RANCH RELATIONS",
    items: [
      { label: "Farm Visits", href: "/admin/visits", icon: "bi-calendar-check-fill" },
      { label: "Customer Base", href: "/admin/customers", icon: "bi-people-fill" },
      { label: "Partner Network", href: "/admin/partners", icon: "bi-tree-fill" },
      { label: "Stories & News", href: "/admin/blog", icon: "bi-journal-text" },
      { label: "Career Postings", href: "/admin/jobs", icon: "bi-briefcase-fill" },
    ],
  },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [avatarImage, setAvatarImage] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("osotua_patron_avatar") || null
    }
    return null
  })
  const sidebarFileRef = useRef<HTMLInputElement>(null)

  const isAdminRoute = path?.startsWith("/admin")
  const userIsAdmin = (session?.user as { role?: string } | undefined)?.role === "ADMIN"
  const sections = isAdminRoute ? adminSections : memberSections
  const portalLabel = isAdminRoute ? "ADMIN CONSOLE" : "MEMBER PORTAL"

  useEffect(() => {
    const handleUpdate = () => {
      const updated = localStorage.getItem("osotua_patron_avatar")
      setAvatarImage(updated)
    }

    window.addEventListener("osotua_avatar_updated", handleUpdate)
    return () => window.removeEventListener("osotua_avatar_updated", handleUpdate)
  }, [])

  const handleSidebarAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async () => {
      const base64 = reader.result as string
      setAvatarImage(base64)
      localStorage.setItem("osotua_patron_avatar", base64)
      window.dispatchEvent(new Event("osotua_avatar_updated"))

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

  const userName = session?.user?.name || "Kamau Achola"
  const userRole = userIsAdmin
    ? (isAdminRoute ? "Estate Administrator" : "Estate Admin (Member View)")
    : "Ranch Patron / Member"
  const userInitials = (session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "KA")

  const renderNavLinks = (onItemClick?: () => void) => (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
      {/* Admin Switcher Banner: Rendered ONLY if authenticated user is ADMIN */}
      {userIsAdmin && (
        <div className="p-2.5 rounded-[2px] border border-[#D4A045]/30 bg-[#22160C] flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <span className="font-mono text-[9px] font-bold text-[#D4A045] block uppercase tracking-wider">
              {isAdminRoute ? "ADMIN HQ ACTIVE" : "MEMBER VIEW ACTIVE"}
            </span>
            <span className="text-[10px] text-[#A89886] block truncate">
              {isAdminRoute ? "Full ranch control" : "Viewing as patron"}
            </span>
          </div>
          <Link
            href={isAdminRoute ? "/dashboard" : "/admin"}
            onClick={onItemClick}
            className="px-2.5 py-1 text-[9px] font-mono font-bold tracking-wider uppercase rounded-[2px] bg-[#D4A045] text-[#160F08] hover:bg-[#C28E2B] transition-colors shrink-0"
          >
            {isAdminRoute ? "Member View" : "Admin HQ"}
          </Link>
        </div>
      )}

      {sections.map((section) => (
        <div key={section.title}>
          <div className="px-3 mb-2">
            <span className="text-[9px] font-mono tracking-[0.22em] text-[#A89886] uppercase font-bold">
              {section.title}
            </span>
          </div>
          <nav className="space-y-0.5">
            {section.items.map((item) => {
              const active =
                path === item.href ||
                (item.href !== "/admin" && item.href !== "/dashboard" && path.startsWith(item.href))
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onItemClick}
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
      ))}
    </div>
  )

  const renderActionButtons = (onItemClick?: () => void) => (
    <div className="space-y-2">
      {isAdminRoute ? (
        <>
          <Link
            href="/admin/livestock"
            onClick={onItemClick}
            className="w-full bg-[#D4A045] hover:bg-[#C28E2B] active:scale-[0.99] text-[#160F08] font-mono text-[10px] font-bold tracking-[0.16em] py-2.5 px-3 rounded-[2px] transition-colors flex items-center justify-center gap-1.5 shadow-xs uppercase"
          >
            <i className="bi bi-plus-lg text-xs" />
            <span>ADD LIVESTOCK</span>
          </Link>
          <Link
            href="/admin/orders"
            onClick={onItemClick}
            className="w-full bg-transparent hover:bg-white/5 active:scale-[0.99] border border-[#3A2D1F] text-[#D4C9B0] font-mono text-[10px] font-bold tracking-[0.16em] py-2 px-3 rounded-[2px] transition-colors flex items-center justify-center gap-1.5 uppercase"
          >
            <i className="bi bi-plus-lg text-xs" />
            <span>NEW ORDER</span>
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/barn"
            onClick={onItemClick}
            className="w-full bg-[#D4A045] hover:bg-[#C28E2B] active:scale-[0.99] text-[#160F08] font-mono text-[10px] font-bold tracking-[0.16em] py-2.5 px-3 rounded-[2px] transition-colors flex items-center justify-center gap-1.5 shadow-xs uppercase"
          >
            <i className="bi bi-shop text-xs" />
            <span>SHOP THE BARN</span>
          </Link>
          <Link
            href="/dashboard/orders"
            onClick={onItemClick}
            className="w-full bg-transparent hover:bg-white/5 active:scale-[0.99] border border-[#3A2D1F] text-[#D4C9B0] font-mono text-[10px] font-bold tracking-[0.16em] py-2 px-3 rounded-[2px] transition-colors flex items-center justify-center gap-1.5 uppercase"
          >
            <i className="bi bi-bag-check text-xs" />
            <span>MY ORDERS</span>
          </Link>
        </>
      )}
    </div>
  )

  const renderUserProfile = () => (
    <div className="flex items-center gap-3 pt-2 border-t border-[#2C2115]/80">
      <button
        onClick={() => sidebarFileRef.current?.click()}
        className="w-8 h-8 rounded-[2px] bg-[#BA5932] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer hover:opacity-90 relative group"
        title="Click to Upload Profile Picture"
      >
        {avatarImage ? (
          <Image
            src={avatarImage}
            alt="Patron Avatar"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{userInitials}</span>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px]">
          <i className="bi bi-camera text-white" />
        </div>
      </button>

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
        className="text-[#8E7E70] hover:text-[#C4882A] p-1.5 rounded-[2px] hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-1"
        title="Logout from Osotua Estate"
        aria-label="Logout"
      >
        <i className="bi bi-box-arrow-right text-base" />
      </button>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] text-[#1A1208]">
      {/* Hidden file input for quick sidebar upload */}
      <input
        type="file"
        ref={sidebarFileRef}
        onChange={handleSidebarAvatarUpload}
        accept="image/*"
        className="hidden"
      />

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
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono tracking-[0.16em] uppercase text-[#D4A045] px-2 py-0.5 border border-[#D4A045]/40 rounded-[2px]">
            {portalLabel}
          </span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 rounded flex items-center justify-center text-[#D4A045] hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <i className={cn("bi text-lg", mobileOpen ? "bi-x-lg" : "bi-list")} />
          </button>
        </div>
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
          "lg:hidden fixed top-0 left-0 h-full w-[260px] flex flex-col z-50 transition-transform duration-300 bg-[#160F08] border-r border-[#2C2115] text-[#FAF7F2]",
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
              {portalLabel}
            </div>
          </Link>
        </div>

        {/* Scrollable Navigation */}
        {renderNavLinks(() => setMobileOpen(false))}

        {/* Action Buttons & Profile */}
        <div className="p-4 border-t border-[#2C2115] bg-[#160F08] space-y-3">
          {renderActionButtons(() => setMobileOpen(false))}
          {renderUserProfile()}
        </div>
      </aside>

      {/* ── DESKTOP STICKY SIDEBAR (lg+) ── */}
      <aside className="hidden lg:flex flex-col w-[260px] shrink-0 sticky top-0 h-screen bg-[#160F08] border-r border-[#2C2115] text-[#FAF7F2] z-40">
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
              {portalLabel}
            </div>
          </Link>
        </div>

        {/* Scrollable Navigation */}
        {renderNavLinks()}

        {/* Sidebar Footer with Action Buttons & User Profile */}
        <div className="p-4 border-t border-[#2C2115] bg-[#160F08] space-y-3">
          {renderActionButtons()}
          {renderUserProfile()}
        </div>
      </aside>

      {/* ── MAIN CONTENT CANVAS ── */}
      <main className="flex-1 min-w-0 min-h-screen pt-14 lg:pt-0 bg-[#FAF7F2]">
        {children}
      </main>
    </div>
  )
}
