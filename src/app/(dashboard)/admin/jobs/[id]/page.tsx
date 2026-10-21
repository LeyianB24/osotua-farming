import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import AdminJobDetailClient, { JobDetailAdminData } from "./AdminJobDetailClient"

export const metadata = { title: "Manage Career Post & Applications — Admin" }

export default async function AdminJobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      applications: {
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!job) notFound()

  const formatted: JobDetailAdminData = {
    id: job.id,
    title: job.title,
    department: job.department,
    type: job.type,
    location: job.location,
    description: job.description,
    requirements: job.requirements,
    isOpen: job.isOpen,
    createdAt: job.createdAt.toISOString(),
    applications: job.applications.map((a) => ({
      id: a.id,
      fullName: a.fullName,
      email: a.email,
      phone: a.phone,
      cvUrl: a.cvUrl,
      coverLetter: a.coverLetter,
      status: a.status as JobDetailAdminData["applications"][number]["status"],
      createdAt: a.createdAt.toISOString(),
    })),
  }

  return <AdminJobDetailClient job={formatted} />
}
