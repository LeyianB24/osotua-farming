import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const metadata = { title: "Admin Dashboard — Osotua Farming" }

export default async function AdminPage() {
  const [breeds, products, orders, visits, partners, jobs] = await Promise.all([
    prisma.breed.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.farmVisit.count(),
    prisma.partnerFarmer.count(),
    prisma.job.count({ where: { isOpen: true } }),
  ])

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  })

  const stats = [
    { label: "Total Breeds", value: breeds, href: "/admin/breeds", icon: "🐄" },
    { label: "Products", value: products, href: "/admin/products", icon: "🥩" },
    { label: "Orders", value: orders, href: "/admin/orders", icon: "📦" },
    { label: "Farm Visits", value: visits, href: "/admin/visits", icon: "🗓️" },
    { label: "Partner Farmers", value: partners, href: "/admin/partners", icon: "🌾" },
    { label: "Open Jobs", value: jobs, href: "/admin/jobs", icon: "💼" },
  ]

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl text-[#1C1208] mb-2">Admin Dashboard</h1>
      <p className="text-[#1C1208]/50 text-sm mb-10">Welcome back. Here&apos;s what&apos;s happening at Osotua Farming.</p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white border border-[#1C1208]/08 rounded p-6 hover:border-[#C4882A] hover:shadow-md transition-all"
          >
            <div className="text-2xl mb-3">{stat.icon}</div>
            <div className="font-serif text-3xl text-[#C4882A] font-semibold mb-1">{stat.value}</div>
            <div className="font-mono text-[10px] text-[#1C1208]/40 tracking-widest uppercase">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <h2 className="font-serif text-xl text-[#1C1208] mb-5">Recent Orders</h2>
      <div className="bg-white border border-[#1C1208]/08 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FBF7F0] border-b border-[#1C1208]/08">
            <tr>
              {["Order ID", "Customer", "Type", "Amount", "Status", "Date"].map((h) => (
                <th key={h} className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, i) => (
              <tr key={order.id} className={i % 2 === 0 ? "" : "bg-[#FBF7F0]/50"}>
                <td className="px-4 py-3 font-mono text-xs text-[#C4882A]">#{order.id.slice(-6).toUpperCase()}</td>
                <td className="px-4 py-3 text-[#1C1208]">{order.customerName}</td>
                <td className="px-4 py-3 text-[#1C1208]/60">{order.type}</td>
                <td className="px-4 py-3 font-medium text-[#1C1208]">KES {order.totalAmount.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className="font-mono text-[9px] bg-[#3D6B3E]/10 text-[#3D6B3E] border border-[#3D6B3E]/20 px-2 py-1 rounded-sm">
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#1C1208]/40 text-xs">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {recentOrders.length === 0 && (
          <div className="text-center py-10 text-[#1C1208]/40 text-sm">No orders yet.</div>
        )}
      </div>
    </div>
  )
}
