import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"

export const metadata = { title: "My Dashboard — Osotua Farming" }

export default async function CustomerDashboard() {
  const session = await auth()
  if (!session) redirect("/login")

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 5,
  })

  return (
    <div className="min-h-screen bg-[#FBF7F0] pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-3xl text-[#1C1208] mb-2">
          Welcome, {session.user.name?.split(" ")[0]}
        </h1>
        <p className="text-[#1C1208]/50 text-sm mb-10">Manage your orders and subscriptions from here.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { label: "Total Orders", value: orders.length, href: "/dashboard/orders", icon: "📦" },
            { label: "Subscriptions", value: 0, href: "/dashboard/subscriptions", icon: "🔄" },
            { label: "Visit the Barn", value: "→", href: "/barn", icon: "🌾" },
          ].map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white border border-[#1C1208]/08 rounded p-6 hover:border-[#C4882A] transition-all"
            >
              <div className="text-2xl mb-3">{card.icon}</div>
              <div className="font-serif text-2xl text-[#C4882A] font-semibold mb-1">{card.value}</div>
              <div className="font-mono text-[10px] text-[#1C1208]/40 tracking-widest uppercase">{card.label}</div>
            </Link>
          ))}
        </div>

        <h2 className="font-serif text-xl text-[#1C1208] mb-5">Recent Orders</h2>
        <div className="bg-white border border-[#1C1208]/08 rounded overflow-hidden">
          {orders.length > 0 ? (
            <table className="w-full text-sm">
              <thead className="bg-[#FBF7F0] border-b border-[#1C1208]/08">
                <tr>
                  {["Order ID", "Type", "Amount", "Status", "Date"].map((h) => (
                    <th key={h} className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase text-left px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr key={order.id} className={i % 2 === 0 ? "" : "bg-[#FBF7F0]/50"}>
                    <td className="px-4 py-3 font-mono text-xs text-[#C4882A]">#{order.id.slice(-6).toUpperCase()}</td>
                    <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{order.type}</td>
                    <td className="px-4 py-3 font-medium text-[#1C1208] text-xs">KES {order.totalAmount.toLocaleString()}</td>
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
          ) : (
            <div className="text-center py-10 text-[#1C1208]/40 text-sm">
              No orders yet. <Link href="/barn" className="text-[#C4882A]">Shop the Barn</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
