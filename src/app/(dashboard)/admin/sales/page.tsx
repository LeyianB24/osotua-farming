import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { AdminSection, AdminTable, AdminRow, TD, StatusBadge } from "@/components/shared/AdminSection"

export const metadata = { title: "Sales Ledger — Osotua Admin" }

export default async function AdminSalesPage() {
  const sales = await prisma.sale.findMany({
    include: { breed: true, product: true },
    orderBy: { paidAt: "desc" },
    take: 100,
  })

  const totalKES = sales
    .filter((s) => s.status === "COMPLETED")
    .reduce((sum, s) => sum + s.totalAmount, 0)

  return (
    <AdminSection
      eyebrow="Revenue Intelligence"
      title="Sales Ledger"
      count={sales.length}
      countLabel={`transactions · KES ${totalKES.toLocaleString()} completed revenue`}
      icon="bi-currency-exchange"
      action={
        <Link
          href="/admin/sales/new"
          className="btn-primary"
          style={{ fontSize: "0.75rem", padding: "0.6rem 1.25rem" }}
        >
          <i className="bi bi-plus-lg" /> Record Sale
        </Link>
      }
    >
      <AdminTable
        headers={["Reference", "Customer", "Item", "Qty", "Total (KES)", "Channel", "Status"]}
        empty={sales.length === 0}
        emptyIcon="bi-currency-exchange"
        emptyText="No sales recorded yet."
      >
        {sales.map((s, i) => (
          <AdminRow key={s.id} index={i}>
            <TD mono accent>
              <Link
                href={`/admin/sales/${s.id}`}
                style={{ color: "#C4882A", textDecoration: "none" }}
                className="hover:underline"
              >
                {s.reference}
              </Link>
            </TD>
            <TD>{s.customerName}</TD>
            <TD muted>{s.breed?.name ?? s.product?.name ?? "—"}</TD>
            <TD mono>{s.quantity}</TD>
            <TD mono accent>KES {s.totalAmount.toLocaleString()}</TD>
            <TD muted>{s.channel.toLowerCase()}</TD>
            <TD><StatusBadge status={s.status} /></TD>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminSection>
  )
}
