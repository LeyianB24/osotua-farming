import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { AdminSection, AdminTable, AdminRow, TD, StatusBadge } from "@/components/shared/AdminSection"

export const metadata = { title: "New Catches — Osotua Admin" }

export default async function AdminCatchesPage() {
  const catches = await prisma.newCatch.findMany({
    include: { breed: { include: { species: true } } },
    orderBy: { caughtAt: "desc" },
  })

  return (
    <AdminSection
      eyebrow="Fresh Arrivals"
      title="New Catches"
      count={catches.length}
      countLabel="batch records"
      icon="bi-basket3-fill"
      action={
        <Link
          href="/admin/catches/new"
          className="btn-primary"
          style={{ fontSize: "0.75rem", padding: "0.6rem 1.25rem" }}
        >
          <i className="bi bi-plus-lg" /> Log New Catch
        </Link>
      }
    >
      <AdminTable
        headers={["Name", "Breed (Species)", "Qty / Unit", "Price (KES)", "Caught", "Status"]}
        empty={catches.length === 0}
        emptyIcon="bi-basket3"
        emptyText="No catches logged yet."
      >
        {catches.map((c, i) => (
          <AdminRow key={c.id} index={i}>
            <TD>
              <Link
                href={`/admin/catches/${c.id}`}
                style={{ color: "#F5EFE4", textDecoration: "none" }}
                className="hover:text-[#C4882A] transition-colors"
              >
                {c.name}
              </Link>
            </TD>
            <TD muted>{c.breed ? `${c.breed.name} (${c.breed.species.name})` : "—"}</TD>
            <TD mono>{c.quantity} {c.unit}</TD>
            <TD mono accent>KES {c.price.toLocaleString()}</TD>
            <TD muted mono>{new Date(c.caughtAt).toLocaleDateString("en-KE")}</TD>
            <TD><StatusBadge status={c.status} /></TD>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminSection>
  )
}
