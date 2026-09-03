import { prisma } from "@/lib/prisma"
import AdminVisitsClient from "./AdminVisitsClient"

export const metadata = { title: "Farm Visits — Osotua Admin" }

export default async function AdminVisitsPage() {
  const visits = await prisma.farmVisit.findMany({
    orderBy: { visitDate: "asc" },
  })

  const formatted = visits.map((v) => ({
    ...v,
    visitDate: v.visitDate.toISOString(),
  }))

  return <AdminVisitsClient initialVisits={formatted} />
}
