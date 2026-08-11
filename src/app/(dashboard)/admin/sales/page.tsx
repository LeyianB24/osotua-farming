import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const metadata = { title: "Sales — Admin" }

const STATUS_STYLES: Record<string, string> = {
  PENDING:    "bg-[#C4882A]/10 text-[#C4882A] border-[#C4882A]/20",
  COMPLETED:  "bg-[#3D6B3E]/10 text-[#3D6B3E] border-[#3D6B3E]/20",
  REFUNDED:   "bg-[#A0431E]/10 text-[#A0431E] border-[#A0431E]/20",
  CANCELLED:  "bg-[#1C1208]/05 text-[#1C1208]/60 border-[#1C1208]/10",
}

export default async function AdminSalesPage() {
  const sales = await prisma.sale.findMany({
    include: { breed: true, product: true },
    orderBy: { paidAt: "desc" },
    take: 100,
  })

  const totalKES = sales
    .filter((s) => s.status === "COMPLETED")
    .reduce((sum, s) => sum + s.totalAmount, 0)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#1C1208]">Sales Ledger</h1>
          <p className="text-[#1C1208]/50 text-sm mt-1">{sales.length} sales · KES {totalKES.toLocaleString()} completed</p>
        </div>
        <Link href="/admin/sales/new" className="bg-[#C4882A] text-[#1C1208] px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-[#d99a30] transition-colors">
          + Record Sale
        </Link>
      </div>

      <div className="bg-white border border-[#1C1208]/08 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FBF7F0] border-b border-[#1C1208]/08">
            <tr>
              {["Reference", "Customer", "Item", "Qty", "Total", "Channel", "Status"].map((h) => (
                <th key={h} className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sales.map((s, i) => (
              <tr key={s.id} className={i % 2 === 0 ? "" : "bg-[#FBF7F0]/50"}>
                <td className="px-4 py-3 font-mono text-xs text-[#C4882A]">
                  <Link href={`/admin/sales/${s.id}`} className="hover:underline">{s.reference}</Link>
                </td>
                <td className="px-4 py-3 text-[#1C1208]">{s.customerName}</td>
                <td className="px-4 py-3 text-[#1C1208]/60">{s.breed?.name ?? s.product?.name ?? "—"}</td>
                <td className="px-4 py-3 text-[#1C1208]">{s.quantity}</td>
                <td className="px-4 py-3 text-[#C4882A] font-medium">KES {s.totalAmount.toLocaleString()}</td>
                <td className="px-4 py-3 text-[#1C1208]/60 text-xs">{s.channel.toLowerCase()}</td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-[9px] px-2 py-1 rounded-sm border ${STATUS_STYLES[s.status]}`}>{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sales.length === 0 && <div className="text-center py-10 text-[#1C1208]/40 text-sm">No sales recorded yet.</div>}
      </div>
    </div>
  )
}
