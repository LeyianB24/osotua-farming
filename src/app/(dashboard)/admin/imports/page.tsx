import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const metadata = { title: "Imports — Admin" }

const STATUS_STYLES: Record<string, string> = {
  PENDING:     "bg-[#C4882A]/10 text-[#C4882A] border-[#C4882A]/20",
  IN_TRANSIT:  "bg-[#1C1208]/05 text-[#1C1208]/60 border-[#1C1208]/10",
  RECEIVED:    "bg-[#3D6B3E]/10 text-[#3D6B3E] border-[#3D6B3E]/20",
  CANCELLED:   "bg-[#A0431E]/10 text-[#A0431E] border-[#A0431E]/20",
}

export default async function AdminImportsPage() {
  const imports = await prisma.import.findMany({
    include: { breed: { include: { species: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#1C1208]">Imports</h1>
          <p className="text-[#1C1208]/50 text-sm mt-1">{imports.length} inbound consignments</p>
        </div>
        <Link href="/admin/imports/new" className="bg-[#C4882A] text-[#1C1208] px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-[#d99a30] transition-colors">
          + Log Import
        </Link>
      </div>

      <div className="bg-white border border-[#1C1208]/08 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FBF7F0] border-b border-[#1C1208]/08">
            <tr>
              {["Reference", "Supplier", "Item", "Qty", "Total Value", "Status"].map((h) => (
                <th key={h} className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {imports.map((im, i) => (
              <tr key={im.id} className={i % 2 === 0 ? "" : "bg-[#FBF7F0]/50"}>
                <td className="px-4 py-3 font-mono text-xs text-[#C4882A]">
                  <Link href={`/admin/imports/${im.id}`} className="hover:underline">{im.reference}</Link>
                </td>
                <td className="px-4 py-3 text-[#1C1208]">{im.supplierName}</td>
                <td className="px-4 py-3 text-[#1C1208]/60">{im.breed?.name ?? im.productName ?? "—"}</td>
                <td className="px-4 py-3 text-[#1C1208]">{im.quantity}</td>
                <td className="px-4 py-3 text-[#C4882A] font-medium">KES {im.totalValue.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-[9px] px-2 py-1 rounded-sm border ${STATUS_STYLES[im.status]}`}>{im.status.replace("_", " ")}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {imports.length === 0 && <div className="text-center py-10 text-[#1C1208]/40 text-sm">No imports logged.</div>}
      </div>
    </div>
  )
}
