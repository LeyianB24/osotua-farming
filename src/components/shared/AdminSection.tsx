"use client"

import React from "react"

/* ── Section wrapper ─────────────────────────────── */
export function AdminSection({
  eyebrow,
  title,
  count,
  countLabel,
  icon,
  action,
  children,
}: {
  eyebrow: string
  title: string
  count?: number
  countLabel?: string
  icon?: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#FBF7F0] p-4 sm:p-8 lg:p-10 text-[#1C1208]">
      {/* Header card */}
      <div className="os-panel mb-8 p-6 sm:p-8 bg-white border border-[#C4882A]/20 shadow-xs relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div
          className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#C4882A]/5 pointer-events-none blur-xl"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#C4882A]/10 border border-[#C4882A]/30 text-[#8E5E16] mb-3">
            {icon && <i className={`bi ${icon} text-[#C4882A]`} />}
            <span>{eyebrow}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1208] font-normal leading-tight">
            {title}
          </h1>

          {count !== undefined && (
            <div className="mt-2 text-xs font-mono text-[#786550] flex items-center gap-1.5">
              <span className="font-bold text-[#C4882A] text-sm">
                {count}
              </span>
              <span>{countLabel || "records active in database"}</span>
            </div>
          )}
        </div>

        {action && <div className="relative z-10 shrink-0">{action}</div>}
      </div>

      {children}
    </div>
  )
}

/* ── Crisp white table container ─────────────────────────────── */
export function AdminTable({
  headers,
  children,
  empty,
  emptyIcon,
  emptyText,
}: {
  headers: string[]
  children: React.ReactNode
  empty: boolean
  emptyIcon?: string
  emptyText?: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#C4882A]/20 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="bg-[#FAF8F5] border-b border-[#C4882A]/15 font-mono text-[10px] text-[#8E5E16] font-bold uppercase tracking-wider">
              {headers.map((h) => (
                <th key={h} className="p-4 sm:p-4.5 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C4882A]/10">{children}</tbody>
        </table>

        {empty && (
          <div className="text-center py-16 px-4">
            <i
              className={`bi ${emptyIcon || "bi-inbox"} text-4xl text-[#C4882A]/30 block mb-3`}
            />
            <p className="text-xs font-mono text-[#786550]">
              {emptyText || "No records recorded yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Table row ─────────────────────────────── */
export function AdminRow({
  children,
  index,
}: {
  children: React.ReactNode
  index: number
}) {
  return (
    <tr
      className={`transition-colors hover:bg-[#FAF8F5] ${
        index % 2 === 0 ? "bg-white" : "bg-[#FAFBF9]"
      }`}
    >
      {children}
    </tr>
  )
}

/* ── Table cell ─────────────────────────────── */
export function TD({
  children,
  mono,
  muted,
  accent,
}: {
  children: React.ReactNode
  mono?: boolean
  muted?: boolean
  accent?: boolean
}) {
  return (
    <td
      className={`p-4 sm:p-4.5 text-xs ${mono ? "font-mono" : "font-sans"} ${
        accent
          ? "text-[#C4882A] font-bold"
          : muted
          ? "text-[#786550]"
          : "text-[#1C1208] font-medium"
      }`}
    >
      {children}
    </td>
  )
}

/* ── Status badge ─────────────────────────────── */
export function StatusBadge({ status }: { status: string }) {
  const s = status?.toUpperCase() ?? ""

  const isSuccess =
    s === "ACTIVE" ||
    s === "DELIVERED" ||
    s === "PAID" ||
    s === "COMPLETED" ||
    s === "CONFIRMED" ||
    s === "APPROVED"

  const isPending =
    s === "PENDING" ||
    s === "PROCESSING" ||
    s === "DEPOSIT_PAID" ||
    s === "READY" ||
    s === "REVIEWING"

  const isDanger =
    s === "CANCELLED" ||
    s === "SUSPENDED" ||
    s === "REJECTED"

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${
        isSuccess
          ? "bg-[#2E7D32]/12 text-[#2E7D32] border border-[#2E7D32]/30"
          : isPending
          ? "bg-[#C4882A]/15 text-[#8E5E16] border border-[#C4882A]/35"
          : isDanger
          ? "bg-[#C2410C]/12 text-[#C2410C] border border-[#C2410C]/30"
          : "bg-[#1C1208]/5 text-[#5C4835] border border-[#1C1208]/15"
      }`}
    >
      {status}
    </span>
  )
}
