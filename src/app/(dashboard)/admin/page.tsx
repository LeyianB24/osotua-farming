import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const metadata = { title: "Admin Command Center — Osotua Farming" }

export default async function AdminDashboardPage() {
  const [
    breedsCount,
    productsCount,
    ordersCount,
    pendingOrdersCount,
    visitsCount,
    pendingVisitsCount,
    partnersCount,
    jobsCount,
    stocksCount,
    menusCount,
    catchesCount,
    importsCount,
    salesCount,
    customersCount,
    recentOrders,
    recentVisits,
    ordersRevenueAgg,
    salesRevenueAgg,
  ] = await Promise.all([
    prisma.breed.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.farmVisit.count(),
    prisma.farmVisit.count({ where: { status: "PENDING" } }),
    prisma.partnerFarmer.count(),
    prisma.job.count({ where: { isOpen: true } }),
    prisma.stock.count(),
    prisma.menu.count(),
    prisma.newCatch.count(),
    prisma.import.count(),
    prisma.sale.count({ where: { status: "COMPLETED" } }),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
    prisma.farmVisit.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.aggregate({
      _sum: { totalAmount: true },
    }),
    prisma.sale.aggregate({
      where: { status: "COMPLETED" },
      _sum: { totalAmount: true },
    }),
  ])

  const totalGrossRevenue =
    (ordersRevenueAgg._sum.totalAmount || 0) + (salesRevenueAgg._sum.totalAmount || 0)

  // Top 4 High-Impact Hero KPI Cards
  const heroKpis = [
    {
      label: "Total Gross Sales",
      value: `KES ${totalGrossRevenue.toLocaleString()}`,
      subtext: `${salesCount} settled ledger records`,
      href: "/admin/sales",
      icon: "bi-currency-exchange",
      color: "#2E7D32",
      bg: "bg-[#2E7D32]/10",
      border: "border-[#2E7D32]/25",
    },
    {
      label: "Pedigree Livestock Herd",
      value: `${breedsCount} Breeds`,
      subtext: "Champion genetics catalog",
      href: "/admin/breeds",
      icon: "bi-shield-check",
      color: "#C4882A",
      bg: "bg-[#C4882A]/10",
      border: "border-[#C4882A]/25",
    },
    {
      label: "Barn Store Products",
      value: `${productsCount} Items`,
      subtext: `${stocksCount} cold room batches`,
      href: "/admin/products",
      icon: "bi-basket-fill",
      color: "#8E5E16",
      bg: "bg-[#8E5E16]/10",
      border: "border-[#8E5E16]/25",
    },
    {
      label: "Customer Orders",
      value: `${ordersCount} Orders`,
      subtext: `${pendingOrdersCount} pending dispatch`,
      href: "/admin/orders",
      icon: "bi-box-seam-fill",
      color: pendingOrdersCount > 0 ? "#C2410C" : "#2E7D32",
      bg: pendingOrdersCount > 0 ? "bg-[#C2410C]/10" : "bg-[#2E7D32]/10",
      border: pendingOrdersCount > 0 ? "border-[#C2410C]/25" : "border-[#2E7D32]/25",
    },
  ]

  // All 14 Departments Directory
  const departments = [
    { label: "Terminal Console", href: "/admin/terminal", icon: "bi-terminal-fill", count: "Live", note: "System Shell" },
    { label: "Livestock Herd", href: "/admin/livestock", icon: "bi-shield-check", count: "Active", note: "Ear Tag Registry" },
    { label: "Fresh Daily Catches", href: "/admin/catches", icon: "bi-basket2-fill", count: catchesCount, note: "Harvest Queue" },
    { label: "Cold Room Stocks", href: "/admin/stocks", icon: "bi-boxes", count: stocksCount, note: "Inventory Records" },
    { label: "Barn Menus", href: "/admin/menus", icon: "bi-card-list", count: menusCount, note: "Store Bundles" },
    { label: "Sales Ledger", href: "/admin/sales", icon: "bi-receipt-cutoff", count: salesCount, note: "Invoices & Receipts" },
    { label: "Genetics Imports", href: "/admin/imports", icon: "bi-truck", count: importsCount, note: "Air/Road Shipments" },
    { label: "Customer Base", href: "/admin/customers", icon: "bi-people-fill", count: customersCount, note: "Patron Profiles" },
    { label: "Farm Visits & Tours", href: "/admin/visits", icon: "bi-calendar-check-fill", count: visitsCount, note: `${pendingVisitsCount} Pending` },
    { label: "Partner Farmers", href: "/admin/partners", icon: "bi-tree-fill", count: partnersCount, note: "Outgrowers Network" },
    { label: "Careers & Jobs", href: "/admin/jobs", icon: "bi-briefcase-fill", count: jobsCount, note: "Active Openings" },
    { label: "Stories & Blog", href: "/admin/blog", icon: "bi-journal-text", count: "CMS", note: "Editor Articles" },
  ]

  return (
    <div className="min-h-screen bg-[#FBF7F0] p-4 sm:p-8 lg:p-10 text-[#1C1208]">
      {/* ── 1. EXECUTIVE RANCH BANNER ── */}
      <div className="os-panel mb-8 p-6 sm:p-8 bg-gradient-to-br from-[#1C1208] via-[#2E1C08] to-[#1C1208] text-[#FBF7F0] rounded-2xl border border-[#C4882A]/30 shadow-xl relative overflow-hidden">
        {/* Background glow effects */}
        <div
          className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#C4882A]/10 pointer-events-none blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#C4882A]/20 border border-[#C4882A]/40 text-[#D99A30] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D99A30] animate-pulse" />
              <span>Kajiado Operations Live &bull; Executive Command</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
              Executive Ranch Operations
            </h1>
            <p className="text-xs sm:text-sm text-[#FBF7F0]/70 mt-1 max-w-2xl font-mono">
              Live ledger, livestock pedigree oversight, real-time customer transactions, and cold-room supply fulfillment.
            </p>
          </div>

          {/* Quick Action Speed Dial */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/admin/products/new"
              className="btn-primary py-2.5 px-4 text-xs font-mono uppercase tracking-wider font-bold shadow-sm flex items-center gap-1.5"
            >
              <i className="bi bi-plus-lg" />
              <span>Add Product</span>
            </Link>

            <Link
              href="/admin/breeds/new"
              className="px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-[#FBF7F0] border border-white/20 transition-all flex items-center gap-1.5"
            >
              <i className="bi bi-shield-plus text-[#C4882A]" />
              <span>Add Breed</span>
            </Link>

            <Link
              href="/admin/blog/new"
              className="px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-[#FBF7F0] border border-white/20 transition-all flex items-center gap-1.5"
            >
              <i className="bi bi-pencil-square text-[#C4882A]" />
              <span>Write Story</span>
            </Link>

            <Link
              href="/admin/terminal"
              className="px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-[#C4882A]/20 hover:bg-[#C4882A]/30 text-[#D99A30] border border-[#C4882A]/40 transition-all flex items-center gap-1.5"
            >
              <i className="bi bi-terminal" />
              <span>Terminal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── 2. HERO KPI CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        {heroKpis.map((kpi) => (
          <Link
            key={kpi.label}
            href={kpi.href}
            className="bg-white rounded-2xl p-6 border border-[#C4882A]/20 shadow-xs hover:shadow-md hover:border-[#C4882A]/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className={`w-11 h-11 rounded-xl ${kpi.bg} ${kpi.border} border flex items-center justify-center text-lg group-hover:scale-105 transition-transform`}
                style={{ color: kpi.color }}
              >
                <i className={`bi ${kpi.icon}`} />
              </span>
              <i className="bi bi-arrow-up-right text-xs text-[#786550] group-hover:text-[#C4882A] transition-colors" />
            </div>

            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#1C1208] mb-1">
              {kpi.value}
            </div>

            <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#8E5E16]">
              {kpi.label}
            </div>

            <div className="text-[11px] font-mono text-[#786550] mt-1 truncate">
              {kpi.subtext}
            </div>
          </Link>
        ))}
      </div>

      {/* ── 3. OPERATIONAL ACTION QUEUES ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Recent Transactions Queue (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#C4882A]/20 overflow-hidden shadow-xs">
          <div className="p-5 sm:p-6 border-b border-[#C4882A]/15 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E5E16] font-bold mb-0.5">
                Real-Time Fulfillment
              </div>
              <h2 className="font-serif text-2xl text-[#1C1208]">
                Recent Customer Orders
              </h2>
            </div>

            <Link
              href="/admin/orders"
              className="text-xs font-mono font-bold text-[#8E5E16] hover:text-[#C4882A] flex items-center gap-1"
            >
              <span>View All {ordersCount} Orders</span>
              <i className="bi bi-arrow-right" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#C4882A]/15 font-mono text-[10px] text-[#8E5E16] font-bold uppercase tracking-wider">
                  <th className="p-3.5 pl-6">Order Ref</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Total</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C4882A]/10 font-mono">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="p-3.5 pl-6 font-bold text-[#C4882A]">
                      <Link href={`/orders/${order.id}`} className="hover:underline">
                        #{order.id.slice(-8).toUpperCase()}
                      </Link>
                    </td>
                    <td className="p-3.5 font-sans font-medium text-[#1C1208]">
                      <div>{order.customerName}</div>
                      <div className="text-[10px] font-mono text-[#786550]">{order.customerPhone}</div>
                    </td>
                    <td className="p-3.5 font-bold text-[#1C1208]">
                      KES {order.totalAmount.toLocaleString()}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          order.status === "DELIVERED"
                            ? "bg-[#2E7D32]/12 text-[#2E7D32] border border-[#2E7D32]/30"
                            : "bg-[#C4882A]/15 text-[#8E5E16] border border-[#C4882A]/35"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3.5 pr-6 text-right">
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-xs text-[#8E5E16] hover:text-[#C4882A] font-bold inline-flex items-center gap-1"
                      >
                        <span>Inspect</span>
                        <i className="bi bi-chevron-right text-[10px]" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {recentOrders.length === 0 && (
              <div className="text-center py-12 text-[#786550] text-xs font-mono">
                No orders recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Pending Farm Visits Queue (1 col) */}
        <div className="bg-white rounded-2xl border border-[#C4882A]/20 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#C4882A]/15">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E5E16] font-bold mb-0.5">
                  Agritourism Inbound
                </div>
                <h3 className="font-serif text-xl text-[#1C1208]">Upcoming Farm Visits</h3>
              </div>
              <Link href="/admin/visits" className="text-xs font-mono font-bold text-[#8E5E16] hover:text-[#C4882A]">
                All ({visitsCount}) &rarr;
              </Link>
            </div>

            {recentVisits.length > 0 ? (
              <div className="space-y-3">
                {recentVisits.map((visit) => (
                  <div key={visit.id} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#C4882A]/15">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-[#1C1208]">
                        {visit.fullName}
                      </span>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C4882A]/10 text-[#8E5E16] border border-[#C4882A]/25">
                        {visit.status}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-[#786550] flex items-center justify-between">
                      <span>Date: {new Date(visit.visitDate).toLocaleDateString("en-KE", { dateStyle: "medium" })}</span>
                      <span>Party of {visit.groupSize}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#786550] font-mono py-6 text-center">
                No scheduled visits in queue.
              </p>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#C4882A]/15">
            <Link
              href="/admin/visits"
              className="btn-ghost w-full justify-center text-xs py-2 font-mono font-bold text-[#1C1208] border-[#C4882A]/30 hover:border-[#C4882A] flex items-center gap-2"
            >
              <i className="bi bi-calendar2-check text-[#C4882A]" />
              <span>Review Agritourism Bookings</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── 4. ALL 12 DEPARTMENTS DIRECTORY ── */}
      <div>
        <div className="mb-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E5E16] font-bold">
            Operational Infrastructure
          </div>
          <h2 className="font-serif text-2xl text-[#1C1208]">
            Ranch Sub-Departments & Portals
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {departments.map((dept) => (
            <Link
              key={dept.label}
              href={dept.href}
              className="bg-white rounded-xl p-4.5 border border-[#C4882A]/15 shadow-xs hover:shadow-md hover:border-[#C4882A]/35 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#C4882A]/20 flex items-center justify-center text-[#8E5E16] group-hover:text-[#C4882A] group-hover:bg-[#C4882A]/10 transition-colors">
                  <i className={`bi ${dept.icon} text-base`} />
                </span>
                <span className="font-mono text-xs font-bold text-[#1C1208] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#C4882A]/15">
                  {dept.count}
                </span>
              </div>

              <div className="font-mono text-xs font-bold text-[#1C1208] group-hover:text-[#C4882A] transition-colors truncate">
                {dept.label}
              </div>

              <div className="text-[10px] font-mono text-[#786550] mt-0.5 truncate">
                {dept.note}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
