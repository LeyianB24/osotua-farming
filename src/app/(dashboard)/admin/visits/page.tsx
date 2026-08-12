import { prisma } from "@/lib/prisma"
import { AdminSection, AdminTable, AdminRow, TD, StatusBadge } from "@/components/shared/AdminSection"

export const metadata = { title: "Farm Visits — Osotua Admin" }

export default async function AdminVisitsPage() {
  const visits = await prisma.farmVisit.findMany({ orderBy: { visitDate: "asc" } })

  return (
    <AdminSection
      eyebrow="Agritourism & Visits"
      title="Farm Visit Bookings"
      count={visits.length}
      countLabel="visit bookings"
      icon="bi-calendar-event-fill"
    >
      <AdminTable
        headers={["Name", "Email", "Phone", "Group Size", "Visit Date", "Purpose", "Status"]}
        empty={visits.length === 0}
        emptyIcon="bi-calendar-x"
        emptyText="No farm visit bookings have been made yet."
      >
        {visits.map((v, i) => (
          <AdminRow key={v.id} index={i}>
            <TD>{v.fullName}</TD>
            <TD muted>{v.email}</TD>
            <TD muted mono>{v.phone}</TD>
            <TD mono accent>{v.groupSize}</TD>
            <TD mono>{new Date(v.visitDate).toDateString()}</TD>
            <TD muted>{v.purpose || "—"}</TD>
            <TD><StatusBadge status={v.status} /></TD>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminSection>
  )
}
