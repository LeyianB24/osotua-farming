import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"

export const metadata = { title: "My Orders & Receipts — Osotua Farming" }

export default async function CustomerOrdersPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login?callbackUrl=/dashboard/orders")

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { breed: true, product: true } } },
    orderBy: { createdAt: "desc" },
  })

  const totalSpent = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)

  return (
    <div className="min-h-screen bg-[#FBF7F0] p-4 sm:p-8 lg:p-10 text-[#1C1208]">
      {/* Header Panel */}
      <div className="os-panel mb-8 p-6 sm:p-8 bg-white border border-[#C4882A]/20 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#C4882A]/10 border border-[#C4882A]/30 text-[#8E5E16] mb-3">
              <i className="bi bi-clock-history text-[#C4882A]" />
              <span>Patron Ledger</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1208] font-normal">
              My Order History
            </h1>
            <p className="text-xs text-[#786550] font-mono mt-1 max-w-xl">
              Complete ledger of your livestock purchases, cold room orders, and live delivery status.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="bg-[#FAF8F5] border border-[#C4882A]/20 px-4 py-2.5 rounded-xl text-right">
              <div className="text-[10px] font-mono uppercase text-[#786550] font-bold">Lifetime Total</div>
              <div className="font-mono text-lg font-bold text-[#1C1208]">KES {totalSpent.toLocaleString()}</div>
            </div>
            <Link
              href="/barn"
              className="btn-primary py-2.5 px-4 text-xs font-mono uppercase tracking-wider font-bold shadow-xs flex items-center gap-1.5"
            >
              <i className="bi bi-shop" />
              <span>Shop Barn</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Orders List Container */}
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-[#C4882A]/20 rounded-2xl p-6 shadow-xs hover:border-[#C4882A]/40 transition-all"
            >
              {/* Top Row: Ref, Date, Amount, Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#C4882A]/15">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-[#C4882A]">
                    #{order.id.slice(-8).toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-[#786550]">
                    &bull; {new Date(order.createdAt).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider bg-[#FAF5EB] px-2 py-0.5 rounded text-[#8E5E16] border border-[#C4882A]/20">
                    {order.type}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="font-mono text-lg font-bold text-[#1C1208]">
                    KES {order.totalAmount.toLocaleString()}
                  </div>
                  <span
                    className={`font-mono text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full ${
                      order.status === "DELIVERED"
                        ? "bg-[#2E7D32]/12 text-[#2E7D32] border border-[#2E7D32]/30"
                        : "bg-[#C4882A]/15 text-[#8E5E16] border border-[#C4882A]/35"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="py-4 space-y-2.5">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-xs text-[#5C4835]"
                  >
                    <span className="font-medium text-[#1C1208]">
                      {item.breed?.name || item.product?.name || "Farm Produce"} <span className="text-[#786550]">× {item.quantity}</span>
                    </span>
                    <span className="font-mono text-[#786550]">
                      KES {(item.quantity * item.unitPrice).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer: Destination & Payment Method */}
              <div className="pt-3 border-t border-[#C4882A]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono text-[#786550]">
                <div className="flex items-center gap-1.5">
                  <i className="bi bi-geo-alt text-[#C4882A]" />
                  <span>{order.deliveryAddress || "Ranch Collection Depot, Kajiado"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>Method: {order.paymentMethod || "M-Pesa / Card"}</span>
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-[#8E5E16] hover:text-[#C4882A] font-bold flex items-center gap-1"
                  >
                    <span>View Receipt</span>
                    <i className="bi bi-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-[#C4882A]/15 p-12 text-center shadow-xs">
            <i className="bi bi-inbox text-5xl text-[#C4882A]/30 block mb-3" />
            <h2 className="font-serif text-2xl text-[#1C1208] mb-1">No Orders Found</h2>
            <p className="text-xs text-[#786550] font-mono max-w-sm mx-auto mb-6">
              You haven&apos;t placed any orders yet. Visit our Barn Store to purchase organic farm goods.
            </p>
            <Link href="/barn" className="btn-primary py-2.5 px-6 text-xs font-mono font-bold uppercase tracking-wider">
              Browse Barn Store
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
