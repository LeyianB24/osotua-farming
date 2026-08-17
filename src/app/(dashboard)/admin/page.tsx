import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const metadata = { title: "Admin Dashboard — Osotua Farming" }

export default async function AdminPage() {
  const [breeds, products, orders, visits, partners, jobs, stocks, menus, catches, imports, sales] = await Promise.all([
    prisma.breed.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.farmVisit.count(),
    prisma.partnerFarmer.count(),
    prisma.job.count({ where: { isOpen: true } }),
    prisma.stock.count(),
    prisma.menu.count(),
    prisma.newCatch.count(),
    prisma.import.count(),
    prisma.sale.count({ where: { status: "COMPLETED" } }),
  ])

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  })

  const stats = [
    { label: "Breeds", value: breeds, href: "/admin/breeds", icon: "bi-shield-check", color: "#C4882A" },
    { label: "Stocks", value: stocks, href: "/admin/stocks", icon: "bi-box-seam-fill", color: "#3D6B3E" },
    { label: "Barn Menus", value: menus, href: "/admin/menus", icon: "bi-menu-button-wide-fill", color: "#C4882A" },
    { label: "New Catches", value: catches, href: "/admin/catches", icon: "bi-basket3-fill", color: "#A0431E" },
    { label: "Imports", value: imports, href: "/admin/imports", icon: "bi-truck-front-fill", color: "#3D6B3E" },
    { label: "Sales (Paid)", value: sales, href: "/admin/sales", icon: "bi-currency-exchange", color: "#C4882A" },
    { label: "Products", value: products, href: "/admin/products", icon: "bi-droplet-fill", color: "#3D6B3E" },
    { label: "Orders", value: orders, href: "/admin/orders", icon: "bi-receipt-cutoff", color: "#C4882A" },
    { label: "Farm Visits", value: visits, href: "/admin/visits", icon: "bi-calendar-event-fill", color: "#3D6B3E" },
    { label: "Partner Farmers", value: partners, href: "/admin/partners", icon: "bi-people-fill", color: "#C4882A" },
    { label: "Open Jobs", value: jobs, href: "/admin/jobs", icon: "bi-briefcase-fill", color: "#3D6B3E" },
  ]

  return (
    <div className="bg-mesh-earth noise min-h-screen p-6 sm:p-10">
      {/* Header */}
      <div className="glass-dark p-8 rounded-2xl mb-10 border border-[#C4882A]/20">
        <div className="eyebrow text-[#C4882A] mb-2">Platform Administration</div>
        <h1 className="font-serif text-4xl text-[#F5EFE4] font-light mb-2">Executive Command Center</h1>
        <p className="text-[#F5EFE4]/60 text-sm max-w-xl">
          Real-time metrics, order ledgers, and operational oversight for Osotua Farming&apos;s Kajiado operations.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="glass-dark p-6 rounded-xl hover:-translate-y-1 transition-all duration-300 border border-white/10 hover:border-[#C4882A]/50 block no-underline group"
          >
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-[#C4882A]/20 transition-colors">
              <i className={`bi ${stat.icon} text-lg`} style={{ color: stat.color }} />
            </div>
            <div className="font-serif text-3xl text-[#F5EFE4] font-light mb-1">{stat.value}</div>
            <div className="font-mono text-[10px] text-[#F5EFE4]/50 tracking-widest uppercase">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent Orders Ledger */}
      <div className="glass-dark p-8 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div>
            <div className="eyebrow text-[#C4882A] mb-1">Transaction Ledger</div>
            <h2 className="font-serif text-2xl text-[#F5EFE4] font-light">Recent Customer Orders</h2>
          </div>
          <Link href="/admin/orders" className="btn-ghost text-xs py-2 px-4 flex items-center gap-1.5">
            <span>View All Orders</span>
            <i className="bi bi-arrow-right" />
          </Link>

        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                {["Order ID", "Customer", "Type", "Amount", "Status", "Date"].map((h) => (
                  <th key={h} className="font-mono text-[10px] text-[#F5EFE4]/50 tracking-widest uppercase text-left p-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-3 font-mono text-xs text-[#C4882A]">#{order.id.slice(-6).toUpperCase()}</td>
                  <td className="p-3 text-[#F5EFE4]">{order.customerName}</td>
                  <td className="p-3 text-[#F5EFE4]/70">{order.type}</td>
                  <td className="p-3 font-mono text-xs font-semibold text-[#F5EFE4]">KES {order.totalAmount.toLocaleString()}</td>
                  <td className="p-3">
                    <span className="font-mono text-[10px] bg-[#3D6B3E]/20 text-[#4E8A4F] border border-[#3D6B3E]/40 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-[#F5EFE4]/50 font-mono text-xs">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentOrders.length === 0 && (
            <div className="text-center py-10 text-[#F5EFE4]/40 text-sm">No orders recorded in the system.</div>
          )}
        </div>
      </div>
    </div>
  )
}
