import { prisma } from "@/lib/prisma"
import AdminOrdersClient, { OrderItem } from "./AdminOrdersClient"

export const metadata = { title: "Orders — Admin · Osotua Farming" }

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  }).catch(() => [])

  const initialOrders: OrderItem[] = orders.map((o) => ({
    id: o.id,
    customerName: o.customerName,
    customerPhone: o.customerPhone,
    customerEmail: o.customerEmail,
    type: o.type,
    totalAmount: o.totalAmount,
    status: o.status,
    paymentMethod: o.paymentMethod,
    paymentRef: o.paymentRef,
    createdAt: o.createdAt.toISOString(),
  }))

  return (
    <div className="p-4 sm:p-8">
      <AdminOrdersClient initialOrders={initialOrders} />
    </div>
  )
}
