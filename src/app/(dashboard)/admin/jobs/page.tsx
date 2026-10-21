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
            { key: "action", label: "Actions",      width: "130px" },
          ]}
          rows={jobs.map(j => ({
            title: (
              <Link href={`/admin/jobs/${j.id}`} className="font-bold text-[#1A1208] hover:text-[#C48D2A] hover:underline flex items-center gap-1.5">
                <span>{j.title}</span>
                <i className="bi bi-arrow-right text-[11px] opacity-70" />
              </Link>
            ),
            dept:   <span className="text-xs text-[#7A6C5B]">{j.department}</span>,
            type:   <span className="text-xs font-mono uppercase text-[#7A6C5B]">{j.type}</span>,
            loc:    <span className="text-xs text-[#7A6C5B]">{j.location}</span>,
            apps: (
              <Link href={`/admin/jobs/${j.id}`} className="font-mono text-xs font-bold text-[#BA5932] hover:underline">
                {j._count.applications} {j._count.applications === 1 ? "applicant" : "applicants"}
              </Link>
            ),
            status: <Badge label={j.isOpen ? "Open" : "Closed"} variant={j.isOpen ? "green" : "muted"} />,
            action: (
              <Link
                href={`/admin/jobs/${j.id}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] bg-[#FAF7F2] border border-[#DDD4C4] text-[11px] font-mono font-bold text-[#1A1208] hover:bg-[#EFE9DF] transition-colors"
              >
                <i className="bi bi-people text-xs text-[#C48D2A]" />
                <span>Review</span>
              </Link>
            ),
          }))}
          empty="No jobs posted yet."
        />
      </div>
    </div>
  )
}
