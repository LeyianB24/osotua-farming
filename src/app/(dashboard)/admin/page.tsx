import { prisma } from "@/lib/prisma"
import Link from "next/link"
import StatCard from "@/components/dashboard/StatCard"
import PageHeader from "@/components/dashboard/PageHeader"
import DataTable from "@/components/dashboard/DataTable"
import Badge from "@/components/dashboard/Badge"

export const metadata = { title: "Admin — Osotua Farming" }

export default async function AdminPage() {
  const [breeds, products, orders, visits, partners, jobs, recentOrders] =
    await Promise.all([
      prisma.breed.count().catch(() => 0),
      prisma.product.count().catch(() => 0),
      prisma.order.count().catch(() => 0),
      prisma.farmVisit.count().catch(() => 0),
      prisma.partnerFarmer.count().catch(() => 0),
      prisma.job.count({ where: { isOpen: true } }).catch(() => 0),
      prisma.order.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
      }).catch(() => []),
    ])

  return (
    <div>
      <PageHeader
        eyebrow="Admin Portal"
        title="Farm Overview"
        sub={`${new Date().toLocaleDateString("en-KE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`}
        action={
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #C4882A, #D99A30)",
              color: "#1C1208",
              boxShadow: "0 4px 16px rgba(196,136,42,0.3)",
            }}
          >
            <i className="bi bi-house text-sm" />
            View Site
          </Link>
        }
      />

      <div className="p-4 sm:p-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
          <StatCard title="Breeds"        value={breeds}   icon="bi-bullseye"        href="/admin/breeds"    accent="gold" />
          <StatCard title="Products"      value={products} icon="bi-box-seam"        href="/admin/products"  accent="default" />
          <StatCard title="Orders"        value={orders}   icon="bi-bag-check"       href="/admin/orders"    accent="green" />
          <StatCard title="Farm Visits"   value={visits}   icon="bi-calendar-check"  href="/admin/visits"    accent="default" />
          <StatCard title="Partners"      value={partners} icon="bi-tree"            href="/admin/partners"  accent="green" />
          <StatCard title="Open Jobs"     value={jobs}     icon="bi-briefcase"       href="/admin/jobs"      accent="gold" />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="text-[10px] tracking-[0.22em] uppercase" style={{ color: "#C4882A", fontFamily: "monospace" }}>
            Recent Orders
          </div>
          <div className="flex-1 h-px" style={{ background: "rgba(196,136,42,0.1)" }} />
          <Link
            href="/admin/orders"
            className="text-[10px] tracking-[0.14em] uppercase transition-colors hover:text-[#C4882A]"
            style={{ color: "rgba(245,239,228,0.4)", fontFamily: "monospace" }}
          >View all <i className="bi bi-arrow-right ml-1" /></Link>
        </div>

        <DataTable
          columns={[
            { key: "id",     label: "Order ID",  width: "120px" },
            { key: "name",   label: "Customer" },
            { key: "type",   label: "Type",      width: "120px" },
            { key: "amount", label: "Amount",    width: "140px" },
            { key: "status", label: "Status",    width: "140px" },
            { key: "date",   label: "Date",      width: "140px" },
          ]}
          rows={recentOrders.map(o => ({
            id:     <span className="font-mono text-xs" style={{ color: "#C4882A" }}>#{o.id.slice(-6).toUpperCase()}</span>,
            name:   <span style={{ color: "#F5EFE4" }}>{o.customerName}</span>,
            type:   <span className="text-xs" style={{ color: "rgba(245,239,228,0.5)" }}>{o.type}</span>,
            amount: <span className="font-medium" style={{ color: "#F5EFE4" }}>KES {o.totalAmount.toLocaleString()}</span>,
            status: <Badge label={o.status} />,
            date:   <span className="text-xs" style={{ color: "rgba(245,239,228,0.35)" }}>{new Date(o.createdAt).toLocaleDateString()}</span>,
          }))}
          empty="No orders yet. Share your breeds catalogue to get started."
        />
      </div>
    </div>
  )
}
