import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { ShoppingBag, Calendar, User } from "lucide-react"

export const metadata = { title: "Customer Portal — Osotua Farming" }

interface OrderItem {
  id: string
  type: string
  totalAmount: number
  status: string
  createdAt: Date | string
}

export default async function CustomerDashboard() {
  const session = await auth()

  let userOrders: OrderItem[] = []
  if (session?.user?.id) {
    try {
      userOrders = await prisma.order.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 5,
      })
    } catch {
      userOrders = []
    }
  }

  const userName = session?.user?.name || "Ranch Client"

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#FBF7F0] pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="bg-[#1C1208] text-[#F5EFE4] rounded-md p-8 sm:p-10 mb-10 shadow-xl border border-[#C4882A]/20 relative overflow-hidden">
            <div className="relative z-10">
              <span className="eyebrow text-[#C4882A] mb-2">Customer Control Panel</span>
              <h1 className="font-serif text-4xl font-light mb-2">
                Welcome back, <em className="text-[#C4882A]">{userName}</em>
              </h1>
              <p className="text-xs text-[#F5EFE4]/60 max-w-md leading-relaxed">
                Track your active livestock reservations, fresh Barn orders, and ranch visit bookings in one place.
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border border-[#1C1208]/10 rounded-md p-6 shadow-sm hover:border-[#C4882A] transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-[#1C1208]/40 uppercase tracking-widest">Total Orders</span>
                <div className="w-10 h-10 rounded-full bg-[#C4882A]/10 text-[#C4882A] flex items-center justify-center">
                  <ShoppingBag size={20} />
                </div>
              </div>
              <div className="font-serif text-3xl font-bold text-[#1C1208] mb-1">
                {userOrders.length}
              </div>
              <div className="text-xs text-[#3D6B3E] font-mono">Active Purchases</div>
            </div>

            <div className="bg-white border border-[#1C1208]/10 rounded-md p-6 shadow-sm hover:border-[#C4882A] transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-[#1C1208]/40 uppercase tracking-widest">Farm Visits</span>
                <div className="w-10 h-10 rounded-full bg-[#3D6B3E]/10 text-[#3D6B3E] flex items-center justify-center">
                  <Calendar size={20} />
                </div>
              </div>
              <div className="font-serif text-3xl font-bold text-[#1C1208] mb-1">
                1
              </div>
              <div className="text-xs text-[#C4882A] font-mono">Scheduled Tour</div>
            </div>

            <div className="bg-white border border-[#1C1208]/10 rounded-md p-6 shadow-sm hover:border-[#C4882A] transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-[#1C1208]/40 uppercase tracking-widest">Account Status</span>
                <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center">
                  <User size={20} />
                </div>
              </div>
              <div className="font-serif text-xl font-bold text-[#1C1208] mb-1">
                Verified Member
              </div>
              <div className="text-xs text-[#1C1208]/50 font-mono">Kajiado Ranch Circle</div>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="bg-white border border-[#1C1208]/10 rounded-md p-6 shadow-md mb-12">
            <div className="flex items-center justify-between border-b border-[#1C1208]/08 pb-4 mb-6">
              <h2 className="font-serif text-2xl text-[#1C1208]">Your Recent Orders</h2>
              <Link href="/barn" className="btn btn-outline btn-sm font-mono text-xs">
                Shop Barn Store →
              </Link>
            </div>

            {userOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#FBF7F0] border-b border-[#1C1208]/08">
                    <tr>
                      {["Order Ref", "Type", "Total Amount", "Status", "Date"].map((h) => (
                        <th key={h} className="font-mono text-[9px] text-[#1C1208]/40 uppercase tracking-widest text-left px-4 py-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {userOrders.map((order: OrderItem, i: number) => (
                      <tr key={order.id} className={i % 2 === 0 ? "" : "bg-[#FBF7F0]/40"}>
                        <td className="px-4 py-3.5 font-mono text-xs font-bold text-[#C4882A]">
                          #{order.id.slice(-6).toUpperCase()}
                        </td>
                        <td className="px-4 py-3.5 text-xs text-[#1C1208]/70">{order.type}</td>
                        <td className="px-4 py-3.5 font-mono font-semibold text-[#1C1208] text-xs">
                          KES {order.totalAmount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="font-mono text-[10px] bg-[#3D6B3E]/10 text-[#3D6B3E] border border-[#3D6B3E]/20 px-2.5 py-1 rounded-sm uppercase tracking-wide">
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-[#1C1208]/40 font-mono">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-[#1C1208]/40 space-y-3">
                <div className="text-4xl">🌾</div>
                <p className="font-serif text-lg text-[#1C1208]">No recent orders found</p>
                <p className="text-xs text-[#1C1208]/50 max-w-sm mx-auto">
                  Browse our fresh produce, grass-fed cuts, or livestock breeds to get started.
                </p>
                <div>
                  <Link href="/barn" className="btn btn-primary btn-sm mt-2">
                    Explore Barn Store
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}

