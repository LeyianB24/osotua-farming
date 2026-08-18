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
    { label: "Stocks", value: stocks, href: "/admin/stocks", icon: "bi-box-seam-fill", color: "#2E7D32" },
    { label: "Barn Menus", value: menus, href: "/admin/menus", icon: "bi-menu-button-wide-fill", color: "#C4882A" },
    { label: "New Catches", value: catches, href: "/admin/catches", icon: "bi-basket3-fill", color: "#8E5E16" },
    { label: "Imports", value: imports, href: "/admin/imports", icon: "bi-truck-front-fill", color: "#2E7D32" },
    { label: "Sales (Paid)", value: sales, href: "/admin/sales", icon: "bi-currency-exchange", color: "#C4882A" },
    { label: "Products", value: products, href: "/admin/products", icon: "bi-droplet-fill", color: "#2E7D32" },
    { label: "Orders", value: orders, href: "/admin/orders", icon: "bi-receipt-cutoff", color: "#C4882A" },
    { label: "Farm Visits", value: visits, href: "/admin/visits", icon: "bi-calendar-event-fill", color: "#2E7D32" },
    { label: "Partner Farmers", value: partners, href: "/admin/partners", icon: "bi-people-fill", color: "#C4882A" },
    { label: "Open Jobs", value: jobs, href: "/admin/jobs", icon: "bi-briefcase-fill", color: "#2E7D32" },
  ]

  return (
    <div style={{ background: "#FBF7F0", minHeight: "100vh" }} className="p-6 sm:p-10">
      {/* Header */}
      <div
        style={{
          padding: "2rem 2.5rem",
          borderRadius: "24px",
          marginBottom: "2.5rem",
          background: "linear-gradient(180deg, #FFFFFF 0%, #FAF5EB 100%)",
          border: "1px solid rgba(196, 136, 42, 0.25)",
          boxShadow: "0 10px 32px rgba(196, 136, 42, 0.08)",
        }}
      >
        <div className="eyebrow text-[#8E5E16] mb-2 font-bold">Platform Administration</div>
        <h1 className="font-serif text-4xl text-[#1C1208] font-light mb-2">Executive Command Center</h1>
        <p className="text-[#5C4835] text-sm max-w-xl">
          Real-time metrics, order ledgers, and operational oversight for Osotua Farming&apos;s Kajiado operations.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(196, 136, 42, 0.22)",
              boxShadow: "0 8px 24px rgba(196, 136, 42, 0.06)",
              borderRadius: "20px",
            }}
            className="p-6 hover:-translate-y-1 transition-all duration-300 hover:border-[#C4882A] hover:shadow-md block no-underline group"
          >
            <div
              style={{ background: "rgba(196, 136, 42, 0.1)", border: "1px solid rgba(196, 136, 42, 0.2)" }}
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#C4882A]/20 transition-colors"
            >
              <i className={`bi ${stat.icon} text-lg`} style={{ color: stat.color }} />
            </div>
            <div className="font-serif text-3xl text-[#1C1208] font-semibold mb-1">{stat.value}</div>
            <div className="font-mono text-[10px] text-[#8E5E16] font-bold tracking-widest uppercase">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent Orders Ledger */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(196, 136, 42, 0.22)",
          boxShadow: "0 10px 32px rgba(196, 136, 42, 0.06)",
          borderRadius: "24px",
        }}
        className="p-8"
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#C4882A]/15">
          <div>
            <div className="eyebrow text-[#8E5E16] mb-1 font-bold">Transaction Ledger</div>
            <h2 className="font-serif text-2xl text-[#1C1208] font-light">Recent Customer Orders</h2>
          </div>
          <Link href="/admin/orders" className="btn-ghost text-xs py-2 px-4 flex items-center gap-1.5" style={{ color: "#1C1208", borderColor: "rgba(196,136,42,0.3)" }}>
            <span>View All Orders</span>
            <i className="bi bi-arrow-right" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ background: "rgba(250, 245, 235, 0.9)", borderBottom: "1px solid rgba(196, 136, 42, 0.15)" }}>
                {["Order ID", "Customer", "Type", "Amount", "Status", "Date"].map((h) => (
                  <th key={h} className="font-mono text-[10px] text-[#8E5E16] font-bold tracking-widest uppercase text-left p-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-[#C4882A]/10 hover:bg-[#FAF6EE] transition-colors">
                  <td className="p-3 font-mono text-xs font-bold text-[#C4882A]">#{order.id.slice(-6).toUpperCase()}</td>
                  <td className="p-3 text-[#1C1208] font-medium">{order.customerName}</td>
                  <td className="p-3 text-[#5C4835]">{order.type}</td>
                  <td className="p-3 font-mono text-xs font-bold text-[#1C1208]">KES {order.totalAmount.toLocaleString()}</td>
                  <td className="p-3">
                    <span className="font-mono text-[10px] font-bold bg-[#2E7D32]/12 text-[#2E7D32] border border-[#2E7D32]/35 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-[#786550] font-mono text-xs">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentOrders.length === 0 && (
            <div className="text-center py-10 text-[#786550] text-sm">No orders recorded in the system.</div>
          )}
        </div>
      </div>
    </div>
  )
}
