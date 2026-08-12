import { prisma } from "@/lib/prisma"
import { AdminSection, AdminTable, AdminRow, TD, StatusBadge } from "@/components/shared/AdminSection"

export const metadata = { title: "Partner Farmers — Osotua Admin" }

export default async function AdminPartnersPage() {
  const partners = await prisma.partnerFarmer.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <AdminSection
      eyebrow="Supply Network"
      title="Partner Farmers"
      count={partners.length}
      countLabel="partner applications"
      icon="bi-people-fill"
    >
      <AdminTable
        headers={["Name", "Email", "Phone", "Location", "Supply Type", "Status", "Date"]}
        empty={partners.length === 0}
        emptyIcon="bi-person-check"
        emptyText="No partner farmer applications yet."
      >
        {partners.map((p, i) => (
          <AdminRow key={p.id} index={i}>
            <TD>{p.fullName}</TD>
            <TD muted>{p.email}</TD>
            <TD muted mono>{p.phone}</TD>
            <TD muted>{p.location}</TD>
            <TD muted>{p.supplyType}</TD>
            <TD><StatusBadge status={p.status} /></TD>
            <TD muted mono>{new Date(p.createdAt).toLocaleDateString("en-KE")}</TD>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminSection>
  )
}
