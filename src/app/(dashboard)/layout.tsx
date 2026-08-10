import Link from "next/link"
import Logo from "@/components/shared/Logo"

const sidebarLinks = [
  { label: "Overview",       href: "/admin",            icon: "bi-grid-1x2" },
  { label: "Admin Terminal", href: "/admin/terminal",   icon: "bi-terminal" },
  { label: "Breeds",         href: "/admin/breeds",     icon: "bi-bullseye" },
  { label: "Livestock",      href: "/admin/livestock",  icon: "bi-shield-check" },
  { label: "Products",       href: "/admin/products",   icon: "bi-basket" },
  { label: "Orders",         href: "/admin/orders",     icon: "bi-box-seam" },
  { label: "Customers",      href: "/admin/customers",  icon: "bi-people" },
  { label: "Farm Visits",    href: "/admin/visits",     icon: "bi-calendar-check" },
  { label: "Partner Farmers",href: "/admin/partners",   icon: "bi-tree" },
  { label: "Jobs",           href: "/admin/jobs",       icon: "bi-briefcase" },
  { label: "Blog",           href: "/admin/blog",       icon: "bi-journal-text" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#FBF7F0]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1C1208] flex flex-col fixed h-full border-r border-[#C4882A]/15 z-30">
        <div className="p-6 border-b border-[#F5EFE4]/10">
          <Logo size="sm" />
        </div>

        <nav className="flex-1 p-4 overflow-y-auto space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded text-[#F5EFE4]/70 hover:text-[#C4882A] hover:bg-[#C4882A]/10 transition-colors text-xs font-mono tracking-wider uppercase group"
            >
              <i className={`bi ${link.icon} text-base text-[#C4882A] group-hover:scale-110 transition-transform`} />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#F5EFE4]/10">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#F5EFE4]/50 hover:text-[#C4882A] text-xs font-mono transition-colors"
          >
            <i className="bi bi-arrow-left" />
            Back to Public Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 min-h-screen">
        {children}
      </main>
    </div>
  )
}
