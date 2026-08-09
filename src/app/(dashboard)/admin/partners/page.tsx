import { prisma } from "@/lib/prisma"

export const metadata = { title: "Partner Farmers — Admin" }

export default async function AdminPartnersPage() {
  const partners = await prisma.partnerFarmer.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-[#1C1208]">Partner Farmers</h1>
        <p className="text-[#1C1208]/50 text-sm mt-1">{partners.length} applications</p>
      </div>

      <div className="bg-white border border-[#1C1208]/08 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FBF7F0] border-b border-[#1C1208]/08">
            <tr>
              {["Name", "Email", "Phone", "Location", "Supply Type", "Status", "Date"].map((h) => (
                <th key={h} className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {partners.map((p, i) => (
              <tr key={p.id} className={i % 2 === 0 ? "" : "bg-[#FBF7F0]/50"}>
                <td className="px-4 py-3 font-medium text-[#1C1208]">{p.fullName}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{p.email}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{p.phone}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{p.location}</td>
                <td className="px-4 py-3 text-[#1C1208] text-xs">{p.supplyType}</td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-[9px] px-2 py-1 rounded-sm border ${
                    p.status === "ACTIVE" ? "bg-[#3D6B3E]/10 text-[#3D6B3E] border-[#3D6B3E]/20" :
                    p.status === "APPROVED" ? "bg-blue-50 text-blue-700 border-blue-200" :
                    p.status === "SUSPENDED" ? "bg-red-50 text-red-700 border-red-200" :
                    "bg-yellow-50 text-yellow-700 border-yellow-200"
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#1C1208]/40 text-xs">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {partners.length === 0 && (
          <div className="text-center py-10 text-[#1C1208]/40 text-sm">No partner applications yet.</div>
        )}
      </div>
    </div>
  )
}
