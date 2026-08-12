import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { AdminSection, AdminTable, AdminRow, TD, StatusBadge } from "@/components/shared/AdminSection"

export const metadata = { title: "Imports — Osotua Admin" }

export default async function AdminImportsPage() {
  const imports = await prisma.import.findMany({
    include: { breed: { include: { species: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <AdminSection
      eyebrow="Supply Chain"
      title="Import Consignments"
      count={imports.length}
      countLabel="inbound consignments"
      icon="bi-truck-front-fill"
      action={
        <Link
          href="/admin/imports/new"
          className="btn-primary"
          style={{ fontSize: "0.75rem", padding: "0.6rem 1.25rem" }}
        >
          <i className="bi bi-plus-lg" /> Log Import
        </Link>
      }
    >
      <AdminTable
        headers={["Reference", "Supplier", "Item", "Qty", "Total Value (KES)", "Status"]}
        empty={imports.length === 0}
        emptyIcon="bi-truck"
        emptyText="No import consignments logged."
      >
        {imports.map((im, i) => (
          <AdminRow key={im.id} index={i}>
            <TD mono accent>
              <Link
                href={`/admin/imports/${im.id}`}
                style={{ color: "#C4882A", textDecoration: "none" }}
                className="hover:underline"
              >
                {im.reference}
              </Link>
            </TD>
            <TD>{im.supplierName}</TD>
            <TD muted>{im.breed?.name ?? im.productName ?? "—"}</TD>
            <TD mono>{im.quantity}</TD>
            <TD mono accent>KES {im.totalValue.toLocaleString()}</TD>
            <TD><StatusBadge status={im.status.replace("_", " ")} /></TD>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminSection>
  )
}
