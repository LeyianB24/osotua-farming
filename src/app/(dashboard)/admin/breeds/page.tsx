import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { AdminSection, AdminTable, AdminRow, TD, StatusBadge } from "@/components/shared/AdminSection"

export const metadata = { title: "Breeds — Osotua Admin" }

export default async function AdminBreedsPage() {
  const breeds = await prisma.breed.findMany({
    include: { species: true },
    orderBy: { name: "asc" },
  })

  return (
    <AdminSection
      eyebrow="Livestock Registry"
      title="Breed Catalogue"
      count={breeds.length}
      countLabel="breeds registered"
      icon="bi-shield-check"
      action={
        <Link
          href="/admin/breeds/new"
          className="btn-primary"
          style={{ fontSize: "0.75rem", padding: "0.6rem 1.25rem" }}
        >
          <i className="bi bi-plus-lg" /> Add Breed
        </Link>
      }
    >
      <AdminTable
        headers={["Breed Name", "Species", "Purpose", "Price / Head (KES)", "In Stock", "Featured", "Actions"]}
        empty={breeds.length === 0}
        emptyIcon="bi-shield-x"
        emptyText="No breeds registered yet."
      >
        {breeds.map((b, i) => (
          <AdminRow key={b.id} index={i}>
            <TD>{b.name}</TD>
            <TD muted>{b.species.name}</TD>
            <TD muted>{b.purpose}</TD>
            <TD mono accent>KES {b.pricePerHead.toLocaleString()}</TD>
            <TD mono>{b.inStock}</TD>
            <TD><StatusBadge status={b.featured ? "ACTIVE" : "PENDING"} /></TD>
            <td style={{ padding: "0.875rem 1.25rem" }}>
              <Link
                href={`/admin/breeds/${b.id}`}
                style={{
                  color: "#C4882A", fontSize: "0.78rem",
                  fontFamily: "var(--font-space-grotesk), monospace",
                  textDecoration: "none",
                  display: "inline-flex", alignItems: "center", gap: "0.3rem",
                }}
                className="hover:underline"
              >
                <i className="bi bi-pencil-square" /> Edit
              </Link>
            </td>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminSection>
  )
}
