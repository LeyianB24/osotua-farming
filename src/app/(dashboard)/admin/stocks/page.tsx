import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { AdminSection, AdminTable, AdminRow, TD, StatusBadge } from "@/components/shared/AdminSection"

export const metadata = { title: "Stocks — Osotua Admin" }

export default async function AdminStocksPage() {
  const stocks = await prisma.stock.findMany({
    include: { product: true, breed: { include: { species: true } } },
    orderBy: { name: "asc" },
  })

  const lowStockCount = stocks.filter((s) => s.quantity <= s.reorderAt).length

  return (
    <AdminSection
      eyebrow="Inventory Management"
      title="Stock Records"
      count={stocks.length}
      countLabel={`inventory lines · ${lowStockCount} need reorder`}
      icon="bi-box-seam-fill"
      action={
        <Link
          href="/admin/stocks/new"
          className="btn-primary"
          style={{ fontSize: "0.75rem", padding: "0.6rem 1.25rem" }}
        >
          <i className="bi bi-plus-lg" /> Add Stock
        </Link>
      }
    >
      <AdminTable
        headers={["Name", "Linked Item", "Unit", "Quantity", "Reorder At", "Status"]}
        empty={stocks.length === 0}
        emptyIcon="bi-box"
        emptyText="No stock records found."
      >
        {stocks.map((s, i) => (
          <AdminRow key={s.id} index={i}>
            <TD>{s.name}</TD>
            <TD muted>{s.product?.name ?? s.breed?.name ?? "—"}</TD>
            <TD muted>{s.unit}</TD>
            <TD mono>{s.quantity}</TD>
            <TD mono muted>{s.reorderAt}</TD>
            <TD>
              <StatusBadge status={s.quantity <= s.reorderAt ? "PENDING" : "ACTIVE"} />
            </TD>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminSection>
  )
}
