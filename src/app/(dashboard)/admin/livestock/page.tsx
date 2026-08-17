import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { AdminSection, AdminTable, AdminRow, TD, StatusBadge } from "@/components/shared/AdminSection"

export const metadata = { title: "Livestock Registry — Osotua Admin" }

export default async function AdminLivestockPage() {
  const livestock = await prisma.livestock.findMany({
    include: { breed: { include: { species: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <AdminSection
      eyebrow="Herd Registry"
      title="Individual Livestock Records"
      count={livestock.length}
      countLabel="animals tagged"
      icon="bi-shield-check"
      action={
        <Link
          href="/admin/livestock/new"
          className="btn-primary"
          style={{ fontSize: "0.75rem", padding: "0.6rem 1.25rem" }}
        >
          <i className="bi bi-plus-lg" /> Register Animal
        </Link>
      }
    >
      <AdminTable
        headers={["Tag #", "Breed", "Species", "Gender", "Weight", "Status", "Birth Date"]}
        empty={livestock.length === 0}
        emptyIcon="bi-clipboard-x"
        emptyText="No individual livestock tagged yet."
      >
        {livestock.map((animal, i) => (
          <AdminRow key={animal.id} index={i}>
            <TD mono accent>{animal.tagNumber}</TD>
            <TD>{animal.breed.name}</TD>
            <TD muted>{animal.breed.species.name}</TD>
            <TD muted>{animal.gender}</TD>
            <TD mono>{animal.weight ? `${animal.weight} kg` : "—"}</TD>
            <TD>
              <StatusBadge
                status={
                  animal.status === "AVAILABLE"
                    ? "ACTIVE"
                    : animal.status === "SOLD"
                    ? "CANCELLED"
                    : animal.status === "RESERVED"
                    ? "PENDING"
                    : "CONFIRMED"
                }
              />
            </TD>
            <TD muted>
              {animal.birthDate ? new Date(animal.birthDate).toLocaleDateString() : "—"}
            </TD>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminSection>
  )
}
