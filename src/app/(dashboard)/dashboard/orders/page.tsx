import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function CustomerOrdersPage() {
  const session = await auth()
  if (!session) redirect("/login")

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { breed: true, product: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-[#FBF7F0] pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-3xl text-[#1C1208] mb-2">My Orders</h1>
        <p className="text-[#1C1208]/50 text-sm mb-10">Full history of your orders.</p>

        {orders.length > 0 ? (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-[#1C1208]/08 rounded overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C1208]/08 bg-[#FBF7F0]">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#C4882A]">#{order.id.slice(-6).toUpperCase()}</span>
                    <span className="text-[#1C1208]/50 text-xs">{new Date(order.createdAt).toDateString()}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-[#1C1208]">KES {order.totalAmount.toLocaleString()}</span>
                    <span className="font-mono text-[9px] bg-[#3D6B3E]/10 text-[#3D6B3E] border border-[#3D6B3E]/20 px-2 py-1 rounded-sm">
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-[#1C1208]/05 last:border-0">
                      <span className="text-sm text-[#1C1208]">
                        {item.breed?.name || item.product?.name || "Item"}
                      </span>
                      <span className="text-sm text-[#1C1208]/60">
                        {item.quantity} × KES {item.unitPrice.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-[#1C1208]/40">
            <div className="text-5xl mb-4">📦</div>
            <p className="font-serif text-xl">No orders yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
