import { prisma } from "@/lib/prisma"
import PageHeader from "@/components/dashboard/PageHeader"
import DataTable from "@/components/dashboard/DataTable"
import Badge from "@/components/dashboard/Badge"

export const metadata = { title: "Customers — Admin · Osotua Farming" }

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true } } },
  }).catch(() => [])

  return (
    <div>
      <PageHeader
        eyebrow="Customer Relations"
        title="Patrons & Customers"
        sub={`${customers.length} registered estate patrons`}
      />
      <div className="p-6 sm:p-8">
        <DataTable
          columns={[
            { key: "name",   label: "Name" },
            { key: "email",  label: "Email" },
            { key: "phone",  label: "Phone",   width: "140px" },
            { key: "orders", label: "Orders",  width: "90px" },
            { key: "role",   label: "Role",    width: "110px" },
            { key: "joined", label: "Joined",  width: "130px" },
          ]}
          rows={customers.map(c => ({
            name:   <span className="font-bold text-[#1A1208]">{c.name ?? "Valued Patron"}</span>,
            email:  <span className="text-xs text-[#7A6C5B]">{c.email}</span>,
            phone:  <span className="text-xs font-mono text-[#7A6C5B]">{c.phone ?? "—"}</span>,
            orders: <span className="font-mono text-xs font-bold text-[#C58F28]">{c._count.orders}</span>,
            role:   <Badge label={c.role} variant="muted" />,
            joined: <span className="text-xs font-mono text-[#7A6C5B]">{new Date(c.createdAt).toLocaleDateString()}</span>,
          }))}
          empty="No customers registered yet."
        />
      </div>
    </div>
  )
}
