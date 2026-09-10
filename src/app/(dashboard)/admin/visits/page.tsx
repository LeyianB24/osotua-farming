import { prisma } from "@/lib/prisma"
import PageHeader from "@/components/dashboard/PageHeader"
import DataTable from "@/components/dashboard/DataTable"
import Badge from "@/components/dashboard/Badge"

export const metadata = { title: "Ranch Visits — Admin · Osotua Farming" }

export default async function AdminVisitsPage() {
  const visits = await prisma.farmVisit.findMany({
    orderBy: { visitDate: "asc" },
  }).catch(() => [])

  const upcoming = visits.filter(v => new Date(v.visitDate) >= new Date()).length

  return (
    <div>
      <PageHeader
        eyebrow="Ranch & Rangeland Visits"
        title="Visit Bookings & Consultations"
        sub={`${visits.length} total bookings · ${upcoming} upcoming rangeland visits`}
      />
      <div className="p-6 sm:p-8">
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
            name:    <span className="font-bold text-[#1A1208]">{v.fullName}</span>,
            email:   <span className="text-xs text-[#7A6C5B]">{v.email}</span>,
            phone:   <span className="text-xs font-mono text-[#7A6C5B]">{v.phone}</span>,
            group:   <span className="font-mono text-xs font-bold text-[#1A1208]">{v.groupSize} visitors</span>,
            date:    <span className="text-xs font-mono text-[#BA5932] font-semibold">{new Date(v.visitDate).toDateString()}</span>,
            purpose: <span className="text-xs text-[#7A6C5B]">{v.purpose ?? "—"}</span>,
            status:  <Badge label={v.status} />,
          }))}
          empty="No visit bookings registered yet."
        />
      </div>
    </div>
  )
}
