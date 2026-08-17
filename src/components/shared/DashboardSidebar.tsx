"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "@/components/shared/Logo"
import { useSession, signOut } from "next-auth/react"

const adminLinks = [
  { section: "CORE COMMAND" },
  { label: "Overview",       href: "/admin",            icon: "bi-grid-1x2-fill" },
  { label: "Terminal",       href: "/admin/terminal",   icon: "bi-terminal-fill" },

  { section: "HERD & LIVESTOCK" },
  { label: "Pedigree Breeds",href: "/admin/breeds",     icon: "bi-bullseye" },
  { label: "Livestock Herd", href: "/admin/livestock",  icon: "bi-shield-check" },
  { label: "New Catches",    href: "/admin/catches",    icon: "bi-basket2-fill" },
  { label: "Stock Records",  href: "/admin/stocks",     icon: "bi-boxes" },

  { section: "STORE & SALES" },
  { label: "Barn Menus",     href: "/admin/menus",      icon: "bi-card-list" },
  { label: "Products",       href: "/admin/products",   icon: "bi-basket-fill" },
  { label: "Customer Orders",href: "/admin/orders",     icon: "bi-box-seam-fill" },
  { label: "Sales Ledger",   href: "/admin/sales",      icon: "bi-receipt-cutoff" },
  { label: "Imports",        href: "/admin/imports",    icon: "bi-truck" },

  { section: "OPERATIONS" },
  { label: "Customers",      href: "/admin/customers",  icon: "bi-people-fill" },
  { label: "Farm Visits",    href: "/admin/visits",     icon: "bi-calendar-check-fill" },
  { label: "Partner Farmers",href: "/admin/partners",   icon: "bi-tree-fill" },
  { label: "Careers & Jobs", href: "/admin/jobs",       icon: "bi-briefcase-fill" },
  { label: "Blog & Stories", href: "/admin/blog",       icon: "bi-journal-text" },
]

const customerLinks = [
  { section: "MEMBER PORTAL" },
  { label: "Command Center",  href: "/dashboard",               icon: "bi-speedometer2" },
  { label: "My Orders",       href: "/dashboard/orders",        icon: "bi-bag-check-fill" },
  { label: "Subscriptions",   href: "/dashboard/subscriptions", icon: "bi-arrow-repeat" },

  { section: "EXPLORE RANCH" },
  { label: "Pedigree Breeds", href: "/breeds",                 icon: "bi-bullseye" },
  { label: "The Barn Store",  href: "/barn",                   icon: "bi-shop" },
  { label: "Schedule Visit",  href: "/visit",                  icon: "bi-calendar-event-fill" },
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
  const sessionRes = useSession?.()
  const session = sessionRes?.data
  const isAdmin = pathname?.startsWith("/admin")
  const userIsAdmin = (session?.user as { role?: string })?.role === "ADMIN"
  const links = isAdmin ? adminLinks : customerLinks

  const userInitial = session?.user?.name ? session.user.name[0].toUpperCase() : "O"

  return (
    <aside
      className={`bg-[#FBF7F0] text-[#1C1208] flex flex-col fixed top-0 bottom-0 left-0 z-40 border-r border-[#C4882A]/25 shadow-[4px_0_24px_rgba(28,18,8,0.08)] select-none transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } ${
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
      style={{
        background: "linear-gradient(180deg, #FBF7F0 0%, #F5EFE4 45%, #EFE5D3 100%)",
        WebkitBackdropFilter: "blur(24px)",
        backdropFilter: "blur(24px)",
      }}
    >
      {/* Top ambient gold line */}
      <div
        style={{
          height: "3px",
          background: "linear-gradient(90deg, #C4882A 0%, rgba(196,136,42,0.6) 60%, rgba(217,154,48,0.2) 100%)",
        }}
      />

      {/* Header Logo, Tier Pill & Toggle Button */}
      <div className="p-4 border-b border-[#C4882A]/15 flex items-center justify-between gap-2 bg-[#FBF7F0]/60">
        {!collapsed && (
          <div className="flex items-center justify-between flex-1 min-w-0">
            <Logo size="sm" textColor="dark" />
            <span
              style={{
                fontFamily: "var(--font-space-grotesk), monospace",
                fontSize: "0.55rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                padding: "0.25rem 0.65rem",
                borderRadius: "100px",
                background: isAdmin ? "rgba(160,67,30,0.12)" : "rgba(196,136,42,0.15)",
                border: isAdmin ? "1px solid rgba(160,67,30,0.3)" : "1px solid rgba(196,136,42,0.35)",
                color: isAdmin ? "#A0431E" : "#8E5E16",
              }}
            >
              {isAdmin ? "Admin HQ" : "VIP Member"}
            </span>
          </div>
        )}

        {/* Sidebar Desktop Toggle Button */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex w-8 h-8 rounded-lg bg-[#1C1208]/5 border border-[#1C1208]/10 items-center justify-center text-[#8E5E16] hover:bg-[#C4882A]/20 hover:text-[#1C1208] transition-all flex-shrink-0"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label="Toggle Sidebar"
          >
            <i className={`bi ${collapsed ? "bi-chevron-right" : "bi-chevron-left"} text-sm`} />
          </button>
        )}

        {/* Mobile Close Button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden w-8 h-8 rounded-lg bg-[#1C1208]/5 border border-[#1C1208]/10 flex items-center justify-center text-[#1C1208]/70 hover:text-[#1C1208] hover:bg-[#1C1208]/10 transition-all"
            aria-label="Close Mobile Navigation"
          >
            <i className="bi bi-x-lg text-sm" />
          </button>
        )}
      </div>

      {/* Admin Quick Switch Portal Banner (If logged in user is ADMIN) */}
      {userIsAdmin && !collapsed && (
        <div className="mx-3 mt-3 p-2.5 rounded-xl bg-gradient-to-r from-[#FBF7F0] to-[#EDE5D8] border border-[#C4882A]/30 shadow-xs flex items-center justify-between">
          <div className="text-[10px] font-mono">
            <span className="font-bold text-[#1C1208] block">{isAdmin ? "Admin Control" : "Admin Account"}</span>
            <span className="text-[#8E5E16]">{isAdmin ? "Viewing HQ" : "Member Portal"}</span>
          </div>
          <Link
            href={isAdmin ? "/dashboard" : "/admin"}
            className="px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider rounded-lg bg-[#C4882A] text-[#1C1208] hover:bg-[#D99A30] shadow-xs hover:shadow-sm transition-all"
          >
            {isAdmin ? "Member View" : "Admin HQ"}
          </Link>
        </div>
      )}

      {/* Navigation List */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          padding: collapsed ? "1rem 0.5rem" : "1rem 0.75rem",
        }}
        className="space-y-1 scrollbar-thin scrollbar-thumb-[#C4882A]/20"
      >
        {links.map((item, idx) => {
          if ("section" in item && item.section) {
            if (collapsed) return <div key={`sec-${idx}`} className="my-2 border-t border-[#C4882A]/20" />
            return (
              <div
                key={`sec-${idx}`}
                style={{
                  fontFamily: "var(--font-space-grotesk), monospace",
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#8E5E16",
                  padding: "0.9rem 0.75rem 0.35rem",
                  opacity: 0.9,
                }}
              >
                {item.section}
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
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "flex-start",
                gap: "0.75rem",
                padding: collapsed ? "0.75rem 0" : "0.625rem 0.875rem",
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: "0.8rem",
                fontFamily: "var(--font-space-grotesk), monospace",
                fontWeight: active ? 700 : 500,
                letterSpacing: "0.05em",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                background: active
                  ? "linear-gradient(90deg, rgba(196,136,42,0.18) 0%, rgba(251,247,240,0.8) 100%)"
                  : "transparent",
                color: active ? "#1C1208" : "#3D2B17",
                borderLeft: !collapsed && active ? "3.5px solid #C4882A" : "3.5px solid transparent",
                border: active ? "1px solid rgba(196,136,42,0.25)" : "1px solid transparent",
                boxShadow: active ? "0 2px 8px rgba(196,136,42,0.12)" : "none",
              }}
              className={
                active
                  ? ""
                  : "hover:text-[#1C1208] hover:bg-[#C4882A]/10 hover:border-[#C4882A]/15"
              }
            >
              <i
                className={`bi ${link.icon}`}
                style={{
                  fontSize: "1.1rem",
                  color: active ? "#C4882A" : "#8E5E16",
                  transition: "transform 0.2s ease, color 0.2s ease",
                }}
              />
              {!collapsed && (
                <span
                  style={{
                    flex: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Info & Footer Bar */}
      <div
        style={{
          padding: "1rem",
          borderTop: "1px solid rgba(196,136,42,0.2)",
          background: "linear-gradient(180deg, rgba(237, 229, 216, 0.7) 0%, rgba(228, 218, 201, 0.9) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        {session?.user && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.875rem",
              justifyContent: collapsed ? "center" : "flex-start",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #C4882A, #8E5E16)",
                color: "#FBF7F0",
                fontWeight: 700,
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 2px 8px rgba(196,136,42,0.35)",
              }}
              className="ring-2 ring-white/60"
              title={session.user.name || "User"}
            >
              {userInitial}
            </div>
            {!collapsed && (
              <>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      color: "#1C1208",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {session.user.name || "Member"}
                  </div>
                  <div
                    style={{
                      color: "#6B4B24",
                      fontSize: "0.68rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {session.user.email}
                  </div>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  title="Sign Out"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(196,136,42,0.25)",
                    borderRadius: "8px",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#3D2B17",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  className="hover:text-[#A0431E] hover:bg-[#A0431E]/10 hover:border-[#A0431E]/30"
                  aria-label="Sign Out"
                >
                  <i className="bi bi-box-arrow-right" style={{ fontSize: "0.85rem" }} />
                </button>
              </>
            )}
          </div>
        )}

        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: "0.5rem",
            color: "#6B4B24",
            fontSize: "0.7rem",
            fontFamily: "var(--font-space-grotesk), monospace",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 600,
            textDecoration: "none",
            transition: "color 0.2s ease",
          }}
          className="hover:text-[#C4882A]"
          title={collapsed ? "Back to Public Site" : undefined}
        >
          <i className="bi bi-arrow-left" style={{ fontSize: "0.8rem" }} />
          {!collapsed && "Back to Public Site"}
        </Link>
      </div>
    </aside>
  )
}
