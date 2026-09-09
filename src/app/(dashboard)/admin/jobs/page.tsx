import { prisma } from "@/lib/prisma"
import Link from "next/link"
import PageHeader from "@/components/dashboard/PageHeader"
import DataTable from "@/components/dashboard/DataTable"
import Badge from "@/components/dashboard/Badge"

export const metadata = { title: "Jobs — Admin · Osotua Farming" }

export default async function AdminJobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { applications: true } } },
  }).catch(() => [])

  return (
    <div>
      <PageHeader
        eyebrow="Human Resources"
        title="Job Listings"
        sub={`${jobs.length} positions · ${jobs.filter(j => j.isOpen).length} open`}
        action={
          <Link
            href="/admin/jobs/new"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-95"
            style={{
              background: "linear-gradient(135deg, #C4882A, #D99A30)",
              color: "#1C1208",
              boxShadow: "0 4px 16px rgba(196,136,42,0.3)",
            }}
          >
            <i className="bi bi-plus-lg text-sm" /> Post Job
          </Link>
        }
      />
      <div className="p-4 sm:p-8">
        <DataTable
          columns={[
            { key: "title",  label: "Position" },
            { key: "dept",   label: "Department",   width: "140px" },
            { key: "type",   label: "Type",         width: "120px" },
            { key: "loc",    label: "Location",     width: "120px" },
            { key: "apps",   label: "Applications", width: "120px" },
            { key: "status", label: "Status",       width: "100px" },
          ]}
          rows={jobs.map(j => ({
            title:  <span className="font-medium" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>{j.title}</span>,
            dept:   <span className="text-xs" style={{ color: "rgba(245,239,228,0.5)" }}>{j.department}</span>,
            type:   <span className="text-xs" style={{ color: "rgba(245,239,228,0.5)" }}>{j.type}</span>,
            loc:    <span className="text-xs" style={{ color: "rgba(245,239,228,0.5)" }}>{j.location}</span>,
            apps:   <span className="font-mono text-sm" style={{ color: "#C4882A" }}>{j._count.applications}</span>,
            status: <Badge label={j.isOpen ? "Open" : "Closed"} variant={j.isOpen ? "green" : "muted"} />,
          }))}
          empty="No jobs posted yet."
        />
      </div>
    </div>
  )
}
