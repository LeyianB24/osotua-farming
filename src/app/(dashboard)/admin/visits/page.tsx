import { prisma } from "@/lib/prisma"
import PageHeader from "@/components/dashboard/PageHeader"
import AdminVisitsClient, { VisitItem } from "./AdminVisitsClient"

export const metadata = { title: "Ranch Visits — Admin · Osotua Farming" }

export default async function AdminVisitsPage() {
  const visits = await prisma.farmVisit.findMany({
    orderBy: { visitDate: "asc" },
  }).catch(() => [])

  const initialVisits: VisitItem[] = visits.map((v) => ({
    id: v.id,
    fullName: v.fullName,
    email: v.email,
    phone: v.phone,
    groupSize: v.groupSize,
    visitDate: v.visitDate.toISOString(),
    purpose: v.purpose,
    status: v.status as VisitItem["status"],
    createdAt: v.createdAt.toISOString(),
  }))

  const upcoming = visits.filter((v) => new Date(v.visitDate) >= new Date()).length
  const pending = visits.filter((v) => v.status === "PENDING").length

  return (
    <div>
      <PageHeader
        eyebrow="Ranch & Rangeland Visits"
        title="Visit Bookings & Consultations"
        sub={`${visits.length} total bookings · ${upcoming} upcoming · ${pending} pending confirmation`}
      />
      <div className="p-6 sm:p-8">
        <AdminVisitsClient initialVisits={initialVisits} />
      </div>
    </div>
  )
}
