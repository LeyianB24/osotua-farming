import Link from "next/link"
import Logo from "@/components/shared/Logo"

const sidebarLinks = [
  { label: "Overview", href: "/admin", icon: "📊" },
  { label: "Breeds", href: "/admin/breeds", icon: "🐄" },
  { label: "Livestock", href: "/admin/livestock", icon: "🐂" },
  { label: "Products", href: "/admin/products", icon: "🥩" },
  { label: "Orders", href: "/admin/orders", icon: "📦" },
  { label: "Customers", href: "/admin/customers", icon: "👥" },
  { label: "Farm Visits", href: "/admin/visits", icon: "🗓️" },
  { label: "Partner Farmers", href: "/admin/partners", icon: "🌾" },
  { label: "Jobs", href: "/admin/jobs", icon: "💼" },
  { label: "Blog", href: "/admin/blog", icon: "📝" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#FBF7F0]">
      {/* Sidebar */}
      <aside className="w-60 bg-[#1C1208] flex flex-col fixed h-full">
        <div className="p-6 border-b border-[#F5EFE4]/10">
          <Logo size="sm" />
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded text-[#F5EFE4]/60 hover:text-[#C4882A] hover:bg-[#C4882A]/08 transition-colors text-sm mb-1"
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#F5EFE4]/10">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#F5EFE4]/40 hover:text-[#F5EFE4]/70 text-xs transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-60 flex-1 min-h-screen">
        {children}
      </main>
    </div>
  )
}
