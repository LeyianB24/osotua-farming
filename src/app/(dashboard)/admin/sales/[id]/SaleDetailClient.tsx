"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export interface SaleDetailData {
  id: string
  reference: string
  customerName: string
  customerPhone?: string | null
  quantity: number
  unitPrice: number
  totalAmount: number
  channel: string
  status: "PENDING" | "COMPLETED" | "REFUNDED" | "CANCELLED"
  paidAt: string
  note?: string | null
  breed?: { id: string; name: string } | null
  product?: { id: string; name: string; unit?: string } | null
}

export default function SaleDetailClient({ sale }: { sale: SaleDetailData }) {
  const router = useRouter()
  const [currentStatus, setCurrentStatus] = useState(sale.status)
  const [updating, setUpdating] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const handleStatusChange = async (newStatus: SaleDetailData["status"]) => {
    setUpdating(true)
    setSuccessMsg(null)
    try {
      const res = await fetch(`/api/sales/${sale.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error("Failed to update status")
      setCurrentStatus(newStatus)
      setSuccessMsg(`Status updated to ${newStatus}`)
      setTimeout(() => setSuccessMsg(null), 3000)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error updating status")
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete transaction ${sale.reference}?`)) return
    setUpdating(true)
    try {
      const res = await fetch(`/api/sales/${sale.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete sale")
      router.push("/admin/sales")
      router.refresh()
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error deleting transaction")
      setUpdating(false)
    }
  }

  const itemName = sale.breed?.name || sale.product?.name || "Farm Produce / Livestock"

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <Link
          href="/admin/sales"
          className="text-xs font-mono font-bold uppercase tracking-wider text-[#7A6C5B] hover:text-[#C48D2A] flex items-center gap-1.5 transition-colors"
        >
          <i className="bi bi-arrow-left" /> Back to Sales Ledger
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-[2px] bg-white border border-[#DDD4C4] text-xs font-mono font-bold text-[#1A1208] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <i className="bi bi-printer" /> Print Receipt
          </button>
          <button
            onClick={handleDelete}
            disabled={updating}
            className="px-3 py-1.5 rounded-[2px] bg-[#FEF2F2] border border-[#FCA5A5] text-xs font-mono font-bold text-[#991B1B] hover:bg-red-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <i className="bi bi-trash" /> Delete Record
          </button>
        </div>
      </div>

      {/* Success alert */}
      {successMsg && (
        <div className="p-3 bg-[#E8EEDC] border border-[#D2DCBE] text-[#486326] text-xs font-mono font-semibold rounded-[2px] flex items-center gap-2">
          <i className="bi bi-check-circle-fill text-sm" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Receipt Card */}
      <div className="bg-white border border-[#E5DDD0] rounded-[2px] p-6 sm:p-10 shadow-sm space-y-8">
        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#EFE9DF]">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#BA5932] font-bold">
              OFFICIAL ESTATE RECEIPT &bull; OSOTUA RANCH
            </div>
            <h1
              className="text-3xl font-bold text-[#1A1208] mt-1"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
            >
              {sale.reference}
            </h1>
            <p className="text-xs font-mono text-[#7A6C5B] mt-1">
              Date: {new Date(sale.paidAt).toLocaleDateString("en-KE", { dateStyle: "full" })}
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-[2px] bg-[#EFE9DF] text-[#7A6C5B] border border-[#DDD4C4]">
                {sale.channel} CHANNEL
              </span>
              <span
                className={`font-mono text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-[2px] ${
                  currentStatus === "COMPLETED"
                    ? "bg-[#E8EEDC] text-[#486326] border border-[#D2DCBE]"
                    : currentStatus === "PENDING"
                    ? "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]"
                    : "bg-[#FEF2F2] text-[#991B1B] border border-[#FCA5A5]"
                }`}
              >
                {currentStatus}
              </span>
            </div>

            {/* Quick Status Selector */}
            <div className="flex items-center gap-2 print:hidden pt-1">
              <span className="text-[10px] font-mono text-[#7A6C5B] uppercase font-bold">Update Status:</span>
              <select
                value={currentStatus}
                disabled={updating}
                onChange={(e) => handleStatusChange(e.target.value as SaleDetailData["status"])}
                className="bg-[#FAF7F2] border border-[#DDD4C4] rounded-[2px] px-2 py-1 text-xs font-mono font-bold text-[#1A1208] outline-none cursor-pointer"
              >
                <option value="COMPLETED">COMPLETED</option>
                <option value="PENDING">PENDING</option>
                <option value="REFUNDED">REFUNDED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
          </div>
        </div>

        {/* Customer & Transaction Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-[#EFE9DF] text-xs">
          <div>
            <span className="font-mono text-[10px] font-bold text-[#7A6C5B] uppercase tracking-wider block mb-1">
              Customer Details
            </span>
            <div className="font-bold text-sm text-[#1A1208]">{sale.customerName}</div>
            {sale.customerPhone ? (
              <div className="font-mono text-[#7A6C5B] mt-0.5 flex items-center gap-1.5">
                <i className="bi bi-telephone text-[#C48D2A]" />
                <a href={`tel:${sale.customerPhone}`} className="hover:underline">
                  {sale.customerPhone}
                </a>
              </div>
            ) : (
              <div className="text-[#A89886] font-mono">No phone recorded</div>
            )}
          </div>

          <div>
            <span className="font-mono text-[10px] font-bold text-[#7A6C5B] uppercase tracking-wider block mb-1">
              Estate Location
            </span>
            <div className="font-bold text-sm text-[#1A1208]">Osotua Rangelands Ranch HQ</div>
            <div className="font-mono text-[#7A6C5B] mt-0.5">Kajiado County, Kenya</div>
          </div>
        </div>

        {/* Itemized Table */}
        <div>
          <div className="font-mono text-[10px] font-bold text-[#7A6C5B] uppercase tracking-wider mb-3">
            Itemized Goods & Livestock
          </div>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#EFE9DF] font-mono text-[10px] text-[#7A6C5B] uppercase font-bold">
                <th className="py-2.5">Item Description</th>
                <th className="py-2.5 text-center">Quantity</th>
                <th className="py-2.5 text-right">Unit Price</th>
                <th className="py-2.5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF7F2]">
              <tr>
                <td className="py-3 font-semibold text-[#1A1208]">{itemName}</td>
                <td className="py-3 text-center font-mono">{sale.quantity}</td>
                <td className="py-3 text-right font-mono text-[#7A6C5B]">KES {sale.unitPrice.toLocaleString()}</td>
                <td className="py-3 text-right font-mono font-bold text-[#BA5932]">KES {sale.totalAmount.toLocaleString()}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t border-[#DDD4C4] font-bold">
                <td colSpan={3} className="py-4 text-right uppercase font-mono text-xs text-[#1A1208]">
                  Total Amount Paid:
                </td>
                <td className="py-4 text-right text-lg text-[#BA5932] font-mono">
                  KES {sale.totalAmount.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Note if any */}
        {sale.note && (
          <div className="p-3.5 rounded-[2px] bg-[#FAF7F2] border border-[#DDD4C4] text-xs">
            <span className="font-mono text-[10px] font-bold text-[#7A6C5B] uppercase tracking-wider block mb-1">
              Internal Ledger Note
            </span>
            <p className="text-[#1A1208]">{sale.note}</p>
          </div>
        )}

        {/* Footer Guarantee */}
        <div className="pt-4 border-t border-[#EFE9DF] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-[#7A6C5B] gap-2">
          <div>Verified Pastoral Chain &bull; Authorized by Osotua Ranch Operations</div>
          <div className="text-[#C48D2A] font-bold">Osotua Farming Ltd &bull; info@osotuafarming.co.ke</div>
        </div>
      </div>
    </div>
  )
}
