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

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const isAdmin = pathname?.startsWith("/admin")
  const links = isAdmin ? adminLinks : customerLinks

  const userInitial = session?.user?.name ? session.user.name[0].toUpperCase() : "O"

  return (
    <aside
      className="w-64 bg-[#1C1208] flex flex-col fixed h-full border-r border-[#C4882A]/20 z-30 shadow-2xl select-none"
      style={{
        background: "linear-gradient(180deg, #1C1208 0%, #150e06 50%, #0d0803 100%)",
        WebkitBackdropFilter: "blur(24px)",
        backdropFilter: "blur(24px)",
      }}
    >
      {/* Top ambient gold line */}
      <div
        style={{
          height: "2px",
          background: "linear-gradient(90deg, #C4882A 0%, rgba(196,136,42,0.4) 60%, transparent 100%)",
        }}
      />

      {/* Header Logo & Tier Pill */}
      <div style={{ padding: "1.5rem 1.25rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo size="sm" />
          <span
            style={{
              fontFamily: "var(--font-space-grotesk), monospace",
              fontSize: "0.55rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              padding: "0.25rem 0.65rem",
              borderRadius: "100px",
              background: isAdmin ? "rgba(160,67,30,0.2)" : "rgba(196,136,42,0.2)",
              border: isAdmin ? "1px solid rgba(160,67,30,0.4)" : "1px solid rgba(196,136,42,0.4)",
              color: isAdmin ? "#c55f3a" : "#C4882A",
            }}
          >
            {isAdmin ? "Admin HQ" : "VIP Member"}
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "1rem 0.75rem" }} className="space-y-1">
        {links.map((item, idx) => {
          if ("section" in item && item.section) {
            return (
              <div
                key={`sec-${idx}`}
                style={{
                  fontFamily: "var(--font-space-grotesk), monospace",
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C4882A",
                  padding: "1rem 0.75rem 0.35rem",
                  opacity: 0.85,
                }}
              >
                {item.section}
              </div>
            )
          }

          const link = item as { label: string; href: string; icon: string }
          const active = pathname === link.href || (link.href !== "/admin" && link.href !== "/dashboard" && pathname?.startsWith(link.href))

          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.65rem 0.875rem",
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: "0.78rem",
                fontFamily: "var(--font-space-grotesk), monospace",
                fontWeight: active ? 700 : 500,
                letterSpacing: "0.06em",
                transition: "all 0.2s ease",
                background: active
                  ? "linear-gradient(90deg, rgba(196,136,42,0.2) 0%, rgba(196,136,42,0.05) 100%)"
                  : "transparent",
                color: active ? "#C4882A" : "rgba(245,239,228,0.6)",
                borderLeft: active ? "3px solid #C4882A" : "3px solid transparent",
              }}
              className="hover:text-[#C4882A] hover:bg-white/[0.04]"
            >
              <i
                className={`bi ${link.icon}`}
                style={{
                  fontSize: "1rem",
                  color: active ? "#C4882A" : "rgba(196,136,42,0.6)",
                  transition: "transform 0.2s ease",
                }}
              />
              <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {link.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* User Info & Footer Bar */}
      <div style={{ padding: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
        {session?.user && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.875rem" }}>
            <div
              style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "linear-gradient(135deg, #C4882A, #A8721F)",
                color: "#1C1208", fontWeight: 700, fontSize: "0.9rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, boxShadow: "0 2px 8px rgba(196,136,42,0.3)",
              }}
            >
              {userInitial}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "#F5EFE4", fontSize: "0.82rem", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {session.user.name || "Member"}
              </div>
              <div style={{ color: "rgba(245,239,228,0.4)", fontSize: "0.68rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {session.user.email}
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              title="Sign Out"
              style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px", width: "30px", height: "30px",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(245,239,228,0.5)", cursor: "pointer", transition: "all 0.2s ease",
              }}
              className="hover:text-[#c55f3a] hover:border-[#c55f3a]/40"
            >
              <i className="bi bi-box-arrow-right" style={{ fontSize: "0.85rem" }} />
            </button>
          </div>
        )}

        <Link
          href="/"
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            color: "rgba(245,239,228,0.45)", fontSize: "0.7rem",
            fontFamily: "var(--font-space-grotesk), monospace",
            letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
            transition: "color 0.2s ease",
          }}
          className="hover:text-[#C4882A]"
        >
          <i className="bi bi-arrow-left" style={{ fontSize: "0.8rem" }} />
          Back to Public Site
        </Link>
      </div>
    </aside>
  )
}
