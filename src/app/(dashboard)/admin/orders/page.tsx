import { prisma } from "@/lib/prisma"
import { AdminSection, AdminTable, AdminRow, TD, StatusBadge } from "@/components/shared/AdminSection"

export const metadata = { title: "Orders — Osotua Admin" }

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  })

  return (
    <AdminSection
      eyebrow="Sales Operations"
      title="Customer Orders"
      count={orders.length}
      countLabel="total orders in the system"
      icon="bi-receipt-cutoff"
    >
      <AdminTable
        headers={["Order Ref", "Customer", "Phone", "Type", "Amount (KES)", "Status", "Date"]}
        empty={orders.length === 0}
        emptyIcon="bi-receipt"
        emptyText="No orders have been placed yet."
      >
        {orders.map((order, i) => (
          <AdminRow key={order.id} index={i}>
            <TD mono accent>#{order.id.slice(-8).toUpperCase()}</TD>
            <TD>{order.customerName}</TD>
            <TD muted mono>{order.customerPhone}</TD>
            <TD muted>{order.type}</TD>
            <TD mono>KES {order.totalAmount.toLocaleString()}</TD>
            <TD><StatusBadge status={order.status} /></TD>
            <TD muted mono>{new Date(order.createdAt).toLocaleDateString("en-KE")}</TD>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminSection>
  )
}
