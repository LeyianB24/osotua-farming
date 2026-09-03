import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const metadata = { title: "Admin HQ — Osotua Farming" }

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
    take: 6,
    orderBy: { createdAt: "desc" },
  })

  const stats = [
    { label: "Barn Products", value: products, href: "/admin/products", icon: "bi-basket3-fill", color: "#C4882A", note: "View & Add Inventory" },
    { label: "Breeds Catalogue", value: breeds, href: "/admin/breeds", icon: "bi-shield-check", color: "#2E7D32", note: "Pedigree Livestock" },
    { label: "Customer Orders", value: orders, href: "/admin/orders", icon: "bi-receipt-cutoff", color: "#C4882A", note: "Sales Ledger" },
    { label: "Farm Visits", value: visits, href: "/admin/visits", icon: "bi-calendar-event-fill", color: "#2E7D32", note: "Agritourism Bookings" },
    { label: "Partner Farmers", value: partners, href: "/admin/partners", icon: "bi-people-fill", color: "#C4882A", note: "Supply Network" },
    { label: "Paid Sales", value: sales, href: "/admin/sales", icon: "bi-currency-exchange", color: "#2E7D32", note: "Settled Invoices" },
    { label: "Cold Room Stocks", value: stocks, href: "/admin/stocks", icon: "bi-box-seam-fill", color: "#C4882A", note: "Warehouse Balance" },
    { label: "Fresh Catches", value: catches, href: "/admin/catches", icon: "bi-basket2-fill", color: "#8E5E16", note: "Daily Harvest" },
    { label: "Import Shipments", value: imports, href: "/admin/imports", icon: "bi-truck-front-fill", color: "#2E7D32", note: "Genetics Transit" },
    { label: "Barn Menus", value: menus, href: "/admin/menus", icon: "bi-menu-button-wide-fill", color: "#C4882A", note: "Restaurant Bundles" },
    { label: "Open Vacancies", value: jobs, href: "/admin/jobs", icon: "bi-briefcase-fill", color: "#2E7D32", note: "Careers Postings" },
  ]

  return (
    <div style={{ background: "#FBF7F0", minHeight: "100vh" }} className="p-6 sm:p-10 text-[#1C1208]">
      {/* Header with Quick Action Bar */}
      <div className="bg-gradient-to-r from-[#FFFFFF] via-[#FAF5EB] to-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-6 sm:p-10 shadow-lg shadow-[#1C1208]/04 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#C4882A]/12 border border-[#C4882A]/30 text-[#8E5E16] mb-2">
              <i className="bi bi-shield-lock-fill text-[#C4882A]" />
              Executive Ranch Operations
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1208] font-normal">
              Command Center
            </h1>
            <p className="text-xs text-[#5C4835] mt-1 max-w-xl font-mono">
              Live metrics, inventory management, customer orders, and supply chain oversight.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/admin/products/new"
              className="btn-primary py-2.5 px-4 text-xs font-mono uppercase tracking-wider font-bold shadow-sm"
            >
              <i className="bi bi-plus-lg" />
              <span>Add Product</span>
            </Link>
            <Link
              href="/admin/breeds/new"
              className="btn-ghost py-2.5 px-4 text-xs font-mono uppercase tracking-wider font-bold bg-[#FFFFFF]"
              style={{ color: "#1C1208", borderColor: "rgba(196,136,42,0.3)" }}
            >
              <i className="bi bi-plus-lg text-[#C4882A]" />
              <span>Add Breed</span>
            </Link>
            <Link
              href="/admin/orders"
              className="btn-ghost py-2.5 px-4 text-xs font-mono uppercase tracking-wider font-bold bg-[#FFFFFF]"
              style={{ color: "#1C1208", borderColor: "rgba(196,136,42,0.3)" }}
            >
              <i className="bi bi-receipt" />
              <span>Orders ({orders})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-[#FFFFFF] border border-[#C4882A]/20 hover:border-[#C4882A] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 block no-underline group"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl bg-[#FAF5EB] border border-[#C4882A]/20 flex items-center justify-center group-hover:bg-[#C4882A]/20 transition-colors"
              >
                <i className={`bi ${stat.icon} text-lg`} style={{ color: stat.color }} />
              </div>
              <i className="bi bi-arrow-up-right text-xs text-[#786550] group-hover:text-[#C4882A] transition-colors" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#1C1208] mb-1">
              {stat.value}
            </div>
            <div className="font-mono text-[10px] text-[#8E5E16] font-bold tracking-wider uppercase">
              {stat.label}
            </div>
            <div className="text-[10px] text-[#786550] mt-1 truncate">
              {stat.note}
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders Ledger Card */}
      <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-6 sm:p-8 shadow-lg shadow-[#1C1208]/04">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#C4882A]/15">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E5E16] font-bold mb-1">
              Real-Time Activity
            </div>
            <h2 className="font-serif text-2xl text-[#1C1208] font-normal">
              Recent Customer Transactions
            </h2>
          </div>
          <Link
            href="/admin/orders"
            className="btn-ghost text-xs py-2 px-4 flex items-center gap-1.5 self-start sm:self-auto"
            style={{ color: "#1C1208", borderColor: "rgba(196,136,42,0.3)" }}
          >
            <span>View All {orders} Orders</span>
            <i className="bi bi-arrow-right" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF6EE] border-b border-[#C4882A]/15 font-mono text-[10px] text-[#8E5E16] font-bold uppercase tracking-wider">
                <th className="text-left p-3.5">Order Ref</th>
                <th className="text-left p-3.5">Customer</th>
                <th className="text-left p-3.5">Type</th>
                <th className="text-left p-3.5">Amount (KES)</th>
                <th className="text-left p-3.5">Status</th>
                <th className="text-left p-3.5">Action</th>
                <th className="text-left p-3.5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C4882A]/10 font-mono">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FAF6EE] transition-colors">
                  <td className="p-3.5 font-bold text-[#C4882A]">
                    <Link href={`/orders/${order.id}`} className="hover:underline">
                      #{order.id.slice(-8).toUpperCase()}
                    </Link>
                  </td>
                  <td className="p-3.5 font-sans font-medium text-[#1C1208]">{order.customerName}</td>
                  <td className="p-3.5 text-[#5C4835] font-sans">{order.type}</td>
                  <td className="p-3.5 font-bold text-[#1C1208]">KES {order.totalAmount.toLocaleString()}</td>
                  <td className="p-3.5">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        order.status === "DELIVERED"
                          ? "bg-[#2E7D32]/12 text-[#2E7D32] border border-[#2E7D32]/30"
                          : "bg-[#C4882A]/12 text-[#8E5E16] border border-[#C4882A]/30"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-[11px] text-[#8E5E16] hover:text-[#C4882A] font-bold flex items-center gap-1"
                    >
                      <i className="bi bi-eye" /> View
                    </Link>
                  </td>
                  <td className="p-3.5 text-[#786550] text-[11px]">
                    {new Date(order.createdAt).toLocaleDateString("en-KE")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentOrders.length === 0 && (
            <div className="text-center py-12 text-[#786550] text-xs font-mono">
              No orders recorded in the ledger yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
