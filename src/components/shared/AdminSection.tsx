"use client"

import React from "react"
import Link from "next/link"

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
    <div className="min-h-screen text-[#F5EFE4]" style={{ background: "#0E0A05" }}>
      {/* Header panel */}
      <div
        className="px-8 py-7 border-b flex items-start justify-between gap-4 flex-wrap"
        style={{ borderColor: "rgba(196,136,42,0.1)" }}
      >
        <div>
          <div
            className="text-[10px] tracking-[0.22em] uppercase mb-2 flex items-center gap-1.5"
            style={{ color: "#C4882A", fontFamily: "monospace" }}
          >
            {icon && <i className={`bi ${icon}`} />}
            <span>{eyebrow}</span>
          </div>

          <h1
            className="font-light leading-tight"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              color: "#F5EFE4",
            }}
          >
            {title}
          </h1>

          {count !== undefined && (
            <p className="text-sm mt-1" style={{ color: "rgba(245,239,228,0.4)" }}>
              {count} {countLabel || "records in database"}
            </p>
          )}
        </div>

        {action && <div className="flex-shrink-0">{action}</div>}
      </div>

      <div className="p-4 sm:p-8">
        {children}
      </div>
    </div>
  )
}

/* ── Crisp table container ─────────────────────────────── */
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
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: "1px solid rgba(196,136,42,0.1)",
        background: "rgba(245,239,228,0.02)",
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(196,136,42,0.1)", background: "rgba(255,255,255,0.02)" }}>
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-5 py-3"
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(245,239,228,0.4)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>

        {empty && (
          <div className="text-center py-16 px-4">
            <i
              className={`bi ${emptyIcon || "bi-inbox"} text-4xl block mb-3`}
              style={{ color: "rgba(196,136,42,0.3)" }}
            />
            <p className="text-xs font-mono" style={{ color: "rgba(245,239,228,0.4)" }}>
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
      className="transition-colors duration-150 hover:bg-white/[0.03]"
      style={{ borderBottom: "1px solid rgba(245,239,228,0.04)" }}
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
      className={`px-5 py-3.5 align-middle ${mono ? "font-mono" : "font-sans"} text-xs`}
      style={{
        color: accent
          ? "#C4882A"
          : muted
          ? "rgba(245,239,228,0.5)"
          : "#F5EFE4",
        fontFamily: mono ? "monospace" : undefined,
      }}
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
      className="inline-block px-2.5 py-0.5 rounded-xs text-[9px] font-medium tracking-[0.12em] uppercase font-mono whitespace-nowrap"
      style={{
        background: isSuccess
          ? "rgba(61,107,62,0.12)"
          : isPending
          ? "rgba(196,136,42,0.12)"
          : isDanger
          ? "rgba(160,67,30,0.12)"
          : "rgba(245,239,228,0.05)",
        color: isSuccess
          ? "#4E8A4F"
          : isPending
          ? "#D99A30"
          : isDanger
          ? "#C05A2A"
          : "rgba(245,239,228,0.4)",
        border: isSuccess
          ? "1px solid rgba(61,107,62,0.3)"
          : isPending
          ? "1px solid rgba(196,136,42,0.3)"
          : isDanger
          ? "1px solid rgba(160,67,30,0.3)"
          : "1px solid rgba(245,239,228,0.1)",
      }}
    >
      {status}
    </span>
  )
}
