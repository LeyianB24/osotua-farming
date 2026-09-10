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
        eyebrow="Human Resources & Careers"
        title="Ranch Career Postings"
        sub={`${jobs.length} positions · ${jobs.filter(j => j.isOpen).length} currently open`}
        action={
          <Link
            href="/admin/jobs/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-[0.14em] transition-all bg-[#D4A045] text-[#160F08] hover:bg-[#C28E2B] shadow-sm"
          >
            <i className="bi bi-plus-lg text-xs" /> Post Job
          </Link>
        }
      />
      <div className="p-6 sm:p-8">
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
            title:  <span className="font-bold text-[#1A1208]">{j.title}</span>,
            dept:   <span className="text-xs text-[#7A6C5B]">{j.department}</span>,
            type:   <span className="text-xs font-mono uppercase text-[#7A6C5B]">{j.type}</span>,
            loc:    <span className="text-xs text-[#7A6C5B]">{j.location}</span>,
            apps:   <span className="font-mono text-xs font-bold text-[#C58F28]">{j._count.applications}</span>,
            status: <Badge label={j.isOpen ? "Open" : "Closed"} variant={j.isOpen ? "green" : "muted"} />,
          }))}
          empty="No jobs posted yet."
        />
      </div>
    </div>
  )
}
