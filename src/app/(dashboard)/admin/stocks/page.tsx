import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const metadata = { title: "Stocks — Admin" }

export default async function AdminStocksPage() {
  const stocks = await prisma.stock.findMany({
    include: { product: true, breed: { include: { species: true } } },
    orderBy: { name: "asc" },
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#1C1208]">Stocks</h1>
          <p className="text-[#1C1208]/50 text-sm mt-1">{stocks.length} inventory records</p>
        </div>
        <Link href="/admin/stocks/new" className="bg-[#C4882A] text-[#1C1208] px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-[#d99a30] transition-colors">
          + Add Stock
        </Link>
      </div>

      <div className="bg-white border border-[#1C1208]/08 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FBF7F0] border-b border-[#1C1208]/08">
            <tr>
              {["Name", "Linked To", "Unit", "Quantity", "Reorder At", "Status"].map((h) => (
                <th key={h} className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stocks.map((s, i) => (
              <tr key={s.id} className={i % 2 === 0 ? "" : "bg-[#FBF7F0]/50"}>
                <td className="px-4 py-3 font-medium text-[#1C1208]">{s.name}</td>
                <td className="px-4 py-3 text-[#1C1208]/60">{s.product?.name ?? s.breed?.name ?? "—"}</td>
                <td className="px-4 py-3 text-[#1C1208]/60">{s.unit}</td>
                <td className="px-4 py-3 text-[#1C1208]">{s.quantity}</td>
                <td className="px-4 py-3 text-[#1C1208]/60">{s.reorderAt}</td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-[9px] px-2 py-1 rounded-sm border ${s.quantity <= s.reorderAt ? "bg-[#A0431E]/10 text-[#A0431E] border-[#A0431E]/20" : "bg-[#3D6B3E]/10 text-[#3D6B3E] border-[#3D6B3E]/20"}`}>
                    {s.quantity <= s.reorderAt ? "REORDER" : "OK"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {stocks.length === 0 && <div className="text-center py-10 text-[#1C1208]/40 text-sm">No stocks recorded. Add your first.</div>}
      </div>
    </div>
  )
}
