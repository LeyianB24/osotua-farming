import { prisma } from "@/lib/prisma"
import { AdminSection, AdminTable, AdminRow, TD, StatusBadge } from "@/components/shared/AdminSection"

export const metadata = { title: "Customers — Osotua Admin" }

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true } } },
  })

  return (
    <AdminSection
      eyebrow="Client Relations"
      title="Registered Customers"
      count={customers.length}
      countLabel="customer accounts"
      icon="bi-people-fill"
    >
      <AdminTable
        headers={["Full Name", "Email Address", "Phone", "Orders", "Joined"]}
        empty={customers.length === 0}
        emptyIcon="bi-person-x"
        emptyText="No customers have registered yet."
      >
        {customers.map((c, i) => (
          <AdminRow key={c.id} index={i}>
            <TD>{c.name || "—"}</TD>
            <TD muted>{c.email}</TD>
            <TD muted mono>{c.phone || "—"}</TD>
            <TD mono accent>{c._count.orders}</TD>
            <TD muted mono>{new Date(c.createdAt).toLocaleDateString("en-KE")}</TD>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminSection>
  )
}
