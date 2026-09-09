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
        title="Customers"
        sub={`${customers.length} registered customers`}
      />
      <div className="p-4 sm:p-8">
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
            name:   <span className="font-medium" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>{c.name ?? "—"}</span>,
            email:  <span className="text-xs" style={{ color: "rgba(245,239,228,0.5)" }}>{c.email}</span>,
            phone:  <span className="text-xs font-mono" style={{ color: "rgba(245,239,228,0.4)" }}>{c.phone ?? "—"}</span>,
            orders: <span className="font-mono text-sm" style={{ color: "#C4882A" }}>{c._count.orders}</span>,
            role:   <Badge label={c.role} variant="muted" />,
            joined: <span className="text-xs" style={{ color: "rgba(245,239,228,0.35)" }}>{new Date(c.createdAt).toLocaleDateString()}</span>,
          }))}
          empty="No customers registered yet."
        />
      </div>
    </div>
  )
}
