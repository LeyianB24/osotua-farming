import { prisma } from "@/lib/prisma"

export const metadata = { title: "Farm Visits — Admin" }

export default async function AdminVisitsPage() {
  const visits = await prisma.farmVisit.findMany({ orderBy: { visitDate: "asc" } })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#1C1208]">Farm Visits</h1>
          <p className="text-[#1C1208]/50 text-sm mt-1">{visits.length} bookings</p>
        </div>
      </div>

      <div className="bg-white border border-[#1C1208]/08 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FBF7F0] border-b border-[#1C1208]/08">
            <tr>
              {["Name", "Email", "Phone", "Group Size", "Visit Date", "Purpose", "Status"].map((h) => (
                <th key={h} className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visits.map((visit, i) => (
              <tr key={visit.id} className={i % 2 === 0 ? "" : "bg-[#FBF7F0]/50"}>
                <td className="px-4 py-3 font-medium text-[#1C1208]">{visit.fullName}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{visit.email}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{visit.phone}</td>
                <td className="px-4 py-3 text-[#1C1208] text-center">{visit.groupSize}</td>
                <td className="px-4 py-3 text-[#1C1208]">{new Date(visit.visitDate).toDateString()}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{visit.purpose || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-[9px] px-2 py-1 rounded-sm border ${
                    visit.status === "CONFIRMED" ? "bg-[#3D6B3E]/10 text-[#3D6B3E] border-[#3D6B3E]/20" :
                    visit.status === "CANCELLED" ? "bg-red-50 text-red-700 border-red-200" :
                    "bg-yellow-50 text-yellow-700 border-yellow-200"
                  }`}>
                    {visit.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visits.length === 0 && (
          <div className="text-center py-10 text-[#1C1208]/40 text-sm">No visit bookings yet.</div>
        )}
      </div>
    </div>
  )
}
