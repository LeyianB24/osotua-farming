import { prisma } from "@/lib/prisma"
import PageHeader from "@/components/dashboard/PageHeader"
import DataTable from "@/components/dashboard/DataTable"
import Badge from "@/components/dashboard/Badge"

export const metadata = { title: "Orders — Admin · Osotua Farming" }

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  }).catch(() => [])

  const total = orders.reduce((s, o) => s + (o.totalAmount || 0), 0)

  return (
    <div>
      <PageHeader
        eyebrow="Sales Management"
        title="All Orders"
        sub={`${orders.length} orders · KES ${total.toLocaleString()} total revenue`}
      />
      <div className="p-6 sm:p-8">
        <DataTable
          columns={[
            { key: "id",      label: "Order ID",  width: "120px" },
            { key: "name",    label: "Customer" },
            { key: "phone",   label: "Phone",     width: "140px" },
            { key: "type",    label: "Type",      width: "100px" },
            { key: "amount",  label: "Amount",    width: "140px" },
            { key: "method",  label: "Payment",   width: "110px" },
            { key: "status",  label: "Status",    width: "140px" },
            { key: "date",    label: "Date",      width: "120px" },
          ]}
          rows={orders.map(o => ({
            id:     <span className="font-mono text-xs font-bold text-[#7A6C5B]">#{o.id.slice(-6).toUpperCase()}</span>,
            name:   <span className="font-bold text-[#1A1208]">{o.customerName}</span>,
            phone:  <span className="text-xs font-mono text-[#7A6C5B]">{o.customerPhone || "—"}</span>,
            type:   <span className="text-xs font-mono uppercase text-[#7A6C5B]">{o.type}</span>,
            amount: <span className="font-bold text-[#BA5932]">KES {o.totalAmount.toLocaleString()}</span>,
            method: <span className="text-xs font-mono uppercase text-[#7A6C5B]">{o.paymentMethod ?? "—"}</span>,
            status: <Badge label={o.status} />,
            date:   <span className="text-xs font-mono text-[#7A6C5B]">{new Date(o.createdAt).toLocaleDateString()}</span>,
          }))}
          empty="No orders placed yet."
        />
      </div>
    </div>
  )
}
