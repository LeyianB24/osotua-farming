import { prisma } from "@/lib/prisma"
import PageHeader from "@/components/dashboard/PageHeader"
import DataTable from "@/components/dashboard/DataTable"
import Badge from "@/components/dashboard/Badge"

export const metadata = { title: "Farm Visits — Admin · Osotua Farming" }

export default async function AdminVisitsPage() {
  const visits = await prisma.farmVisit.findMany({
    orderBy: { visitDate: "asc" },
  }).catch(() => [])

  const upcoming = visits.filter(v => new Date(v.visitDate) >= new Date()).length

  return (
    <div>
      <PageHeader
        eyebrow="Farm Visits"
        title="Visit Bookings"
        sub={`${visits.length} bookings · ${upcoming} upcoming`}
      />
      <div className="p-4 sm:p-8">
        <DataTable
          columns={[
            { key: "name",    label: "Name" },
            { key: "email",   label: "Email" },
            { key: "phone",   label: "Phone",      width: "140px" },
            { key: "group",   label: "Group Size", width: "110px" },
            { key: "date",    label: "Visit Date", width: "140px" },
            { key: "purpose", label: "Purpose" },
            { key: "status",  label: "Status",     width: "120px" },
          ]}
          rows={visits.map(v => ({
            name:    <span className="font-medium" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>{v.fullName}</span>,
            email:   <span className="text-xs" style={{ color: "rgba(245,239,228,0.5)" }}>{v.email}</span>,
            phone:   <span className="text-xs font-mono" style={{ color: "rgba(245,239,228,0.4)" }}>{v.phone}</span>,
            group:   <span className="font-mono text-sm" style={{ color: "#F5EFE4" }}>{v.groupSize}</span>,
            date:    <span className="text-xs font-mono" style={{ color: "rgba(245,239,228,0.5)" }}>{new Date(v.visitDate).toDateString()}</span>,
            purpose: <span className="text-xs" style={{ color: "rgba(245,239,228,0.4)" }}>{v.purpose ?? "—"}</span>,
            status:  <Badge label={v.status} />,
          }))}
          empty="No visit bookings yet."
        />
      </div>
    </div>
  )
}
