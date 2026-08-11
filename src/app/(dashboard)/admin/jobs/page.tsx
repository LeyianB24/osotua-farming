import { prisma } from "@/lib/prisma"

export const metadata = { title: "Jobs — Admin" }

export default async function AdminJobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { applications: true } } },
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#1C1208]">Jobs</h1>
          <p className="text-[#1C1208]/50 text-sm mt-1">{jobs.length} positions</p>
        </div>
      </div>

      <div className="bg-white border border-[#1C1208]/08 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FBF7F0] border-b border-[#1C1208]/08">
            <tr>
              {["Title", "Department", "Type", "Location", "Applications", "Status"].map((h) => (
                <th key={h} className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, i) => (
              <tr key={job.id} className={i % 2 === 0 ? "" : "bg-[#FBF7F0]/50"}>
                <td className="px-4 py-3 font-medium text-[#1C1208]">{job.title}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{job.department}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{job.type}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{job.location}</td>
                <td className="px-4 py-3 text-center">
                  <span className="font-mono text-xs text-[#C4882A] font-semibold">{job._count.applications}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-[9px] px-2 py-1 rounded-sm border ${job.isOpen ? "bg-[#3D6B3E]/10 text-[#3D6B3E] border-[#3D6B3E]/20" : "bg-[#1C1208]/05 text-[#1C1208]/40 border-[#1C1208]/10"}`}>
                    {job.isOpen ? "Open" : "Closed"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {jobs.length === 0 && (
          <div className="text-center py-10 text-[#1C1208]/40 text-sm">No jobs posted yet.</div>
        )}
      </div>
    </div>
  )
}
