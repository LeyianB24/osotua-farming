import { prisma } from "@/lib/prisma"
import JobDetailClient from "@/components/farm/JobDetailClient"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const job = await prisma.job.findUnique({ where: { id } })
    if (!job) return { title: "Career Opportunity — Osotua Farming" }
    return {
      title: `${job.title} (${job.department}) — Careers at Osotua Farming`,
      description: job.description.slice(0, 160),
    }
  } catch {
    return { title: "Career Opportunity — Osotua Farming" }
  }
}

async function getJob(id: string) {
  try {
    return await prisma.job.findUnique({ where: { id } })
  } catch {
    return null
  }
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = await getJob(id)

  return <JobDetailClient job={job} />
}
