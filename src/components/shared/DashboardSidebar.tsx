"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "@/components/shared/Logo"
import { useSession, signOut } from "next-auth/react"

const adminLinks = [
  { section: "COMMAND & METRICS" },
  { label: "Dashboard HQ",   href: "/admin",            icon: "bi-grid-1x2-fill" },
  { label: "Terminal Console",href: "/admin/terminal",  icon: "bi-terminal-fill" },

  { section: "HERD & LIVESTOCK" },
  { label: "Pedigree Breeds", href: "/admin/breeds",    icon: "bi-bullseye" },
  { label: "Livestock Herd",  href: "/admin/livestock", icon: "bi-shield-check" },
  { label: "Fresh Catches",   href: "/admin/catches",   icon: "bi-basket2-fill" },
  { label: "Cold Room Stocks",href: "/admin/stocks",    icon: "bi-boxes" },

  { section: "STORE & COMMERCE" },
  { label: "Customer Orders", href: "/admin/orders",    icon: "bi-box-seam-fill" },
  { label: "Products Catalog",href: "/admin/products",  icon: "bi-basket-fill" },
  { label: "Barn Menus",      href: "/admin/menus",     icon: "bi-card-list" },
  { label: "Sales Ledger",    href: "/admin/sales",     icon: "bi-receipt-cutoff" },
  { label: "Genetics Imports",href: "/admin/imports",   icon: "bi-truck" },

  { section: "RANCH RELATIONS" },
  { label: "Farm Visits",     href: "/admin/visits",    icon: "bi-calendar-check-fill" },
  { label: "Customer Base",   href: "/admin/customers", icon: "bi-people-fill" },
  { label: "Partner Network", href: "/admin/partners",  icon: "bi-tree-fill" },
  { label: "Stories & News",  href: "/admin/blog",      icon: "bi-journal-text" },
  { label: "Career Postings", href: "/admin/jobs",      icon: "bi-briefcase-fill" },
]

const memberLinks = [
  { section: "MEMBER COMMAND" },
  { label: "Overview",        href: "/dashboard",               icon: "bi-speedometer2" },
  { label: "Order History",   href: "/dashboard/orders",        icon: "bi-bag-check-fill" },
  { label: "Subscriptions",   href: "/dashboard/subscriptions", icon: "bi-arrow-repeat" },

  { section: "RANCH EXPERIENCES" },
  { label: "The Barn Store",  href: "/barn",                    icon: "bi-shop" },
  { label: "Pedigree Breeds", href: "/breeds",                  icon: "bi-bullseye" },
  { label: "Book Farm Visit", href: "/visit",                   icon: "bi-calendar-event-fill" },
  { label: "Partner Network", href: "/partners",                icon: "bi-tree-fill" },
]

interface DashboardSidebarProps {
  collapsed?: boolean
  mobileOpen?: boolean
  onToggleCollapse?: () => void
  onCloseMobile?: () => void
}

export default function DashboardSidebar({
  collapsed = false,
  mobileOpen = false,
  onToggleCollapse,
  onCloseMobile,
}: DashboardSidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const isAdminRoute = pathname?.startsWith("/admin")
  const userIsAdmin = (session?.user as { role?: string } | undefined)?.role === "ADMIN"
  const links = isAdminRoute ? adminLinks : memberLinks

  const userInitial = session?.user?.name ? session.user.name[0].toUpperCase() : "O"

  return (
    <aside
      className={`admin-sidebar bg-[#FAF7F2] text-[#1C1208] flex flex-col fixed top-0 bottom-0 left-0 z-40 border-r border-[#C4882A]/20 shadow-[4px_0_24px_rgba(28,18,8,0.04)] select-none transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } ${
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
      style={{
        background: "#FAF7F2",
      }}
    >
      {/* Brand Top Gradient Strip */}
      <div
        style={{
          height: "3px",
          background: isAdminRoute
            ? "linear-gradient(90deg, #C2410C 0%, #C4882A 50%, #3D6B3E 100%)"
            : "linear-gradient(90deg, #3D6B3E 0%, #C4882A 50%, #E59A24 100%)",
        }}
      />

      {/* Header Logo, Tier Pill & Toggle Button */}
      <div className="p-4 border-b border-[#C4882A]/15 flex items-center justify-between gap-2 bg-white/75 backdrop-blur-md">
        {!collapsed && (
          <div className="flex items-center justify-between flex-1 min-w-0">
            <Logo size="sm" textColor="dark" />
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase"
              style={{
                background: isAdminRoute ? "rgba(194, 65, 12, 0.1)" : "rgba(46, 125, 50, 0.1)",
                border: isAdminRoute ? "1px solid rgba(194, 65, 12, 0.3)" : "1px solid rgba(46, 125, 50, 0.3)",
                color: isAdminRoute ? "#C2410C" : "#2E7D32",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: isAdminRoute ? "#C2410C" : "#2E7D32" }}
              />
              {isAdminRoute ? "Admin HQ" : "Member"}
            </span>
          </div>
        )}

        {/* Sidebar Desktop Toggle Button */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex w-7 h-7 rounded-lg bg-white border border-[#C4882A]/20 items-center justify-center text-[#8E5E16] hover:bg-[#C4882A]/15 hover:text-[#1C1208] shadow-xs transition-all flex-shrink-0 cursor-pointer"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label="Toggle Sidebar"
          >
            <i className={`bi ${collapsed ? "bi-chevron-right" : "bi-chevron-left"} text-xs`} />
          </button>
        )}

        {/* Mobile Close Button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden w-8 h-8 rounded-lg bg-white border border-[#C4882A]/20 flex items-center justify-center text-[#1C1208]/70 hover:text-[#1C1208] hover:bg-[#C4882A]/15 shadow-xs transition-all cursor-pointer"
            aria-label="Close Mobile Navigation"
          >
            <i className="bi bi-x-lg text-sm" />
          </button>
        )}
      </div>

      {/* Admin Quick Switch Portal Banner (If logged in user is ADMIN) */}
      {userIsAdmin && !collapsed && (
        <div className="mx-3 mt-3 p-2.5 rounded-lg border border-[#C4882A]/25 bg-white/90 shadow-xs flex items-center justify-between">
          <div className="min-w-0">
            <span className="font-mono text-[10px] font-bold text-[#1C1208] block leading-tight truncate">
              {isAdminRoute ? "Admin Mode Active" : "Member View Active"}
            </span>
            <span className="font-mono text-[9px] text-[#786550] block truncate">
              {isAdminRoute ? "Full ranch control" : "Viewing as patron"}
            </span>
          </div>
          <Link
            href={isAdminRoute ? "/dashboard" : "/admin"}
            className="px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider uppercase rounded bg-[#C4882A] text-white hover:bg-[#D99A30] transition-colors shadow-xs shrink-0"
          >
            {isAdminRoute ? "Member View" : "Admin HQ"}
          </Link>
        </div>
      )}

      {/* Navigation List */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          padding: collapsed ? "1rem 0.5rem" : "0.85rem 0.75rem",
        }}
        className="space-y-1 scrollbar-thin scrollbar-thumb-[#C4882A]/20"
      >
        {links.map((item, idx) => {
          if ("section" in item && item.section) {
            if (collapsed) return <div key={`sec-${idx}`} className="my-2 border-t border-[#C4882A]/15" />
            return (
              <div
                key={`sec-${idx}`}
                className="font-mono text-[9px] font-bold tracking-[0.18em] uppercase text-[#8E5E16] pt-3 pb-1 px-3 flex items-center gap-2"
              >
                <span>{item.section}</span>
                <span className="flex-1 h-px bg-gradient-to-r from-[#C4882A]/25 to-transparent" />
              </div>
            )
          }

          const link = item as { label: string; href: string; icon: string }
          const active =
            pathname === link.href ||
            (link.href !== "/admin" && link.href !== "/dashboard" && pathname?.startsWith(link.href))

          return (
            <Link
              key={link.href}
              href={link.href}
              title={collapsed ? link.label : undefined}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono transition-all duration-200 ${
                collapsed ? "justify-center px-0 py-2.5" : ""
              } ${
                active
                  ? "bg-white font-bold text-[#1C1208] shadow-[0_2px_8px_rgba(196,136,42,0.12)] border border-[#C4882A]/30 border-l-[3px] border-l-[#C4882A]"
                  : "text-[#5C4835] hover:text-[#1C1208] hover:bg-white/70"
              }`}
            >
              <i
                className={`bi ${link.icon} text-base transition-colors ${
                  active ? "text-[#C4882A]" : "text-[#8E5E16]"
                }`}
              />
              {!collapsed && (
                <span className="flex-1 truncate">
                  {link.label}
                </span>
              )}
              {!collapsed && active && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4882A]" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Info & Footer Bar */}
      <div className="p-3 border-t border-[#C4882A]/20 bg-white/90">
        {session?.user && (
          <div
            className={`flex items-center gap-2.5 mb-2.5 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div className="relative flex-shrink-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-xs"
                style={{
                  background: isAdminRoute
                    ? "linear-gradient(135deg, #C2410C 0%, #C4882A 100%)"
                    : "linear-gradient(135deg, #3D6B3E 0%, #C4882A 100%)",
                }}
                title={session.user.name || "User"}
              >
                {userInitial}
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#2E7D32] ring-2 ring-white" />
            </div>

            {!collapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[#1C1208] truncate">
                    {session.user.name || "Osotua Member"}
                  </div>
                  <div className="text-[10px] text-[#786550] truncate font-mono">
                    {session.user.email}
                  </div>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  title="Sign Out"
                  className="w-7 h-7 rounded-md bg-[#FBF7F0] border border-[#C4882A]/20 flex items-center justify-center text-[#786550] hover:text-[#DC2626] hover:bg-[#FEF2F2] hover:border-[#FCA5A5] transition-colors cursor-pointer"
                  aria-label="Sign Out"
                >
                  <i className="bi bi-box-arrow-right text-xs" />
                </button>
              </>
            )}
          </div>
        )}

        <Link
          href="/"
          className={`flex items-center gap-2 text-[11px] font-mono font-medium text-[#8E5E16] hover:text-[#C4882A] transition-colors py-1 ${
            collapsed ? "justify-center" : "px-1"
          }`}
          title={collapsed ? "Back to Public Ranch" : undefined}
        >
          <i className="bi bi-arrow-left text-xs" />
          {!collapsed && <span>Exit to Public Store</span>}
        </Link>
      </div>
    </aside>
  )
}
