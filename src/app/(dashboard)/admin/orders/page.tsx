import { prisma } from "@/lib/prisma"

export const metadata = { title: "Orders — Admin" }

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
  CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
  DEPOSIT_PAID: "bg-purple-50 text-purple-700 border-purple-200",
  PAID: "bg-green-50 text-green-700 border-green-200",
  PROCESSING: "bg-orange-50 text-orange-700 border-orange-200",
  READY: "bg-teal-50 text-teal-700 border-teal-200",
  DELIVERED: "bg-[#3D6B3E]/10 text-[#3D6B3E] border-[#3D6B3E]/20",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
}

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#1C1208]">Orders</h1>
          <p className="text-[#1C1208]/50 text-sm mt-1">{orders.length} total orders</p>
        </div>
      </div>

      <div className="bg-white border border-[#1C1208]/08 rounded overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-[#FBF7F0] border-b border-[#1C1208]/08">
            <tr>
              {["Order ID", "Customer", "Phone", "Type", "Amount", "Status", "Date"].map((h) => (
                <th key={h} className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order.id} className={i % 2 === 0 ? "" : "bg-[#FBF7F0]/50"}>
                <td className="px-4 py-3 font-mono text-xs text-[#C4882A]">#{order.id.slice(-6).toUpperCase()}</td>
                <td className="px-4 py-3 text-[#1C1208]">{order.customerName}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{order.customerPhone}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{order.type}</td>
                <td className="px-4 py-3 font-medium text-[#1C1208]">KES {order.totalAmount.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-[9px] px-2 py-1 rounded-sm border ${statusColors[order.status] || ""}`}>
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
        {orders.length === 0 && (
          <div className="text-center py-10 text-[#1C1208]/40 text-sm">No orders yet.</div>
        )}
      </div>
    </div>
  )
}
