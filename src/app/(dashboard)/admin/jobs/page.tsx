import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { AdminSection, AdminTable, AdminRow, TD, StatusBadge } from "@/components/shared/AdminSection"

export const metadata = { title: "Jobs — Osotua Admin" }

export default async function AdminJobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { applications: true } } },
  })

  const openCount = jobs.filter((j) => j.isOpen).length

  return (
    <AdminSection
      eyebrow="Human Resources"
      title="Job Listings"
      count={openCount}
      countLabel={`open positions · ${jobs.length} total`}
      icon="bi-briefcase-fill"
      action={
        <Link
          href="/admin/jobs/new"
          className="btn-primary"
          style={{ fontSize: "0.75rem", padding: "0.6rem 1.25rem" }}
        >
          <i className="bi bi-plus-lg" /> Post Job
        </Link>
      }
    >

      <AdminTable
        headers={["Title", "Department", "Type", "Location", "Applications", "Status"]}
        empty={jobs.length === 0}
        emptyIcon="bi-briefcase"
        emptyText="No jobs posted yet."
      >
        {jobs.map((job, i) => (
          <AdminRow key={job.id} index={i}>
            <TD>
              <Link
                href={`/admin/jobs/${job.id}`}
                style={{ color: "#F5EFE4", textDecoration: "none" }}
                className="hover:text-[#C4882A] transition-colors"
              >
                {job.title}
              </Link>
            </TD>
            <TD muted>{job.department}</TD>
            <TD muted>{job.type}</TD>
            <TD muted>{job.location}</TD>
            <TD mono accent>{job._count.applications}</TD>
            <TD><StatusBadge status={job.isOpen ? "ACTIVE" : "CLOSED"} /></TD>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminSection>
  )
}
