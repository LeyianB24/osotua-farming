import { prisma } from "@/lib/prisma"
import AdminOrdersClient from "./AdminOrdersClient"

export const metadata = { title: "Orders — Osotua Admin" }

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      customerName: true,
      customerPhone: true,
      customerEmail: true,
      type: true,
      totalAmount: true,
      status: true,
      paymentMethod: true,
      paymentRef: true,
      createdAt: true,
    },
  })

  const formatted = orders.map((o) => ({
    ...o,
    createdAt: o.createdAt.toISOString(),
  }))

  return <AdminOrdersClient initialOrders={formatted} />
}
