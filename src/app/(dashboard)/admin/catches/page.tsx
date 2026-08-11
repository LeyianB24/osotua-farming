import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const metadata = { title: "New Catches — Admin" }

const STATUS_STYLES: Record<string, string> = {
  FRESH:     "bg-[#3D6B3E]/10 text-[#3D6B3E] border-[#3D6B3E]/20",
  AGING:     "bg-[#C4882A]/10 text-[#C4882A] border-[#C4882A]/20",
  SOLD_OUT:  "bg-[#A0431E]/10 text-[#A0431E] border-[#A0431E]/20",
  RESERVED:  "bg-[#1C1208]/05 text-[#1C1208]/60 border-[#1C1208]/10",
}

export default async function AdminCatchesPage() {
  const catches = await prisma.newCatch.findMany({
    include: { breed: { include: { species: true } } },
    orderBy: { caughtAt: "desc" },
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#1C1208]">New Catches</h1>
          <p className="text-[#1C1208]/50 text-sm mt-1">{catches.length} batch records</p>
        </div>
        <Link href="/admin/catches/new" className="bg-[#C4882A] text-[#1C1208] px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-[#d99a30] transition-colors">
          + Log New Catch
        </Link>
      </div>

      <div className="bg-white border border-[#1C1208]/08 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FBF7F0] border-b border-[#1C1208]/08">
            <tr>
              {["Name", "Breed", "Quantity", "Price", "Caught", "Status"].map((h) => (
                <th key={h} className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {catches.map((c, i) => (
              <tr key={c.id} className={i % 2 === 0 ? "" : "bg-[#FBF7F0]/50"}>
                <td className="px-4 py-3 font-medium text-[#1C1208]">
                  <Link href={`/admin/catches/${c.id}`} className="hover:underline">{c.name}</Link>
                </td>
                <td className="px-4 py-3 text-[#1C1208]/60">{c.breed ? `${c.breed.name} (${c.breed.species.name})` : "—"}</td>
                <td className="px-4 py-3 text-[#1C1208]">{c.quantity} {c.unit}</td>
                <td className="px-4 py-3 text-[#C4882A] font-medium">KES {c.price.toLocaleString()}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{new Date(c.caughtAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-[9px] px-2 py-1 rounded-sm border ${STATUS_STYLES[c.status]}`}>{c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {catches.length === 0 && <div className="text-center py-10 text-[#1C1208]/40 text-sm">No catches logged.</div>}
      </div>
    </div>
  )
}
