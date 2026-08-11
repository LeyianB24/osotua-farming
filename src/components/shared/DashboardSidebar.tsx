"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "@/components/shared/Logo"

const adminLinks = [
  { label: "Overview",       href: "/admin",            icon: "bi-grid-1x2" },
  { label: "Admin Terminal", href: "/admin/terminal",   icon: "bi-terminal" },
  { label: "Breeds",         href: "/admin/breeds",     icon: "bi-bullseye" },
  { label: "Livestock",      href: "/admin/livestock",  icon: "bi-shield-check" },
  { label: "New Catches",    href: "/admin/catches",    icon: "bi-basket2" },
  { label: "Stocks",         href: "/admin/stocks",     icon: "bi-boxes" },
  { label: "Barn Menus",     href: "/admin/menus",      icon: "bi-card-list" },
  { label: "Imports",        href: "/admin/imports",    icon: "bi-truck" },
  { label: "Sales",          href: "/admin/sales",      icon: "bi-receipt" },
  { label: "Products",       href: "/admin/products",   icon: "bi-basket" },
  { label: "Orders",         href: "/admin/orders",     icon: "bi-box-seam" },
  { label: "Customers",      href: "/admin/customers",  icon: "bi-people" },
  { label: "Farm Visits",    href: "/admin/visits",     icon: "bi-calendar-check" },
  { label: "Partner Farmers",href: "/admin/partners",   icon: "bi-tree" },
  { label: "Jobs",           href: "/admin/jobs",       icon: "bi-briefcase" },
  { label: "Blog",           href: "/admin/blog",       icon: "bi-journal-text" },
]

const customerLinks = [
  { label: "Member Overview",   href: "/dashboard",               icon: "bi-speedometer2" },
  { label: "My Farm Orders",    href: "/dashboard/orders",        icon: "bi-bag-check" },
  { label: "Subscriptions",     href: "/dashboard/subscriptions", icon: "bi-arrow-repeat" },
  { label: "Pedigree Breeds",   href: "/breeds",                 icon: "bi-bullseye" },
  { label: "The Barn Store",    href: "/barn",                   icon: "bi-basket3" },
  { label: "Schedule Visit",    href: "/visit",                  icon: "bi-calendar-event" },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")
  const links = isAdmin ? adminLinks : customerLinks

  return (
    <aside
      className="w-64 bg-[#1C1208] flex flex-col fixed h-full border-r border-[#C4882A]/20 z-30 shadow-2xl"
      style={{
        background: "linear-gradient(180deg, #1C1208 0%, #150d06 100%)",
        WebkitBackdropFilter: "blur(20px)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Header logo */}
      <div className="p-6 border-b border-[#F5EFE4]/10 flex items-center justify-between">
        <Logo size="sm" />
        <span
          className="font-mono text-[9px] px-2 py-0.5 rounded uppercase tracking-widest font-semibold"
          style={{
            background: isAdmin ? "rgba(160,67,30,0.2)" : "rgba(196,136,42,0.2)",
            border: `1px solid ${isAdmin ? "rgba(160,67,30,0.4)" : "rgba(196,136,42,0.4)"}`,
            color: isAdmin ? "#e06040" : "#C4882A",
          }}
        >
          {isAdmin ? "Admin" : "Member"}
        </span>
      </div>

      {/* Nav list */}
      <nav className="flex-1 p-4 overflow-y-auto space-y-1">
        <div className="font-mono text-[9px] text-[#C4882A] uppercase tracking-[0.22em] px-3.5 py-2 font-semibold">
          {isAdmin ? "Management Control" : "Ranch Client Portal"}
        </div>
        {links.map((link) => {
          const active = pathname === link.href || (link.href !== "/admin" && link.href !== "/dashboard" && pathname?.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded transition-all duration-200 text-xs font-mono tracking-wider uppercase group ${
                active
                  ? "bg-[#C4882A]/20 text-[#C4882A] border border-[#C4882A]/35 shadow-lg shadow-[#C4882A]/10 font-bold"
                  : "text-[#F5EFE4]/65 hover:text-[#C4882A] hover:bg-[#C4882A]/10"
              }`}
            >
              <i className={`bi ${link.icon} text-base ${active ? "text-[#C4882A]" : "text-[#C4882A]/70"} group-hover:scale-110 transition-transform`} />
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer link */}
      <div className="p-4 border-t border-[#F5EFE4]/10 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#F5EFE4]/50 hover:text-[#C4882A] text-xs font-mono transition-colors"
        >
          <i className="bi bi-arrow-left" />
          Back to Public Site
        </Link>
      </div>
    </aside>
  )
}
