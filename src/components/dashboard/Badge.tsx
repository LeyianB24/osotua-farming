import React from "react"

export type BadgeVariant = "gold" | "green" | "rust" | "blue" | "muted" | "yellow"

const variants: Record<BadgeVariant, { bg: string; color: string; border: string }> = {
  gold:   { bg: "rgba(196,136,42,0.12)", color: "#D99A30",             border: "rgba(196,136,42,0.3)" },
  green:  { bg: "rgba(61,107,62,0.12)",  color: "#4E8A4F",             border: "rgba(61,107,62,0.3)" },
  rust:   { bg: "rgba(160,67,30,0.12)",  color: "#C05A2A",             border: "rgba(160,67,30,0.3)" },
  blue:   { bg: "rgba(59,130,246,0.1)",  color: "#60A5FA",             border: "rgba(59,130,246,0.25)" },
  muted:  { bg: "rgba(245,239,228,0.05)", color: "rgba(245,239,228,0.4)", border: "rgba(245,239,228,0.1)" },
  yellow: { bg: "rgba(234,179,8,0.1)",   color: "#CA8A04",             border: "rgba(234,179,8,0.25)" },
}

const statusMap: Record<string, BadgeVariant> = {
  AVAILABLE: "green", PENDING: "yellow", CONFIRMED: "green", CANCELLED: "rust",
  PAID: "green", DELIVERED: "green", PROCESSING: "blue", ACTIVE: "green",
  PAUSED: "yellow", OPEN: "green", CLOSED: "muted", APPROVED: "green",
  SUSPENDED: "rust", RESERVED: "gold", SOLD: "muted", BREEDING_STOCK: "blue",
  RECEIVED: "yellow", REVIEWING: "blue", SHORTLISTED: "gold",
  INTERVIEWED: "blue", OFFERED: "green", REJECTED: "rust",
  DEPOSIT_PAID: "gold", READY: "blue", CONFIRMED_STATUS: "green",
}

export interface BadgeProps {
  label: string
  variant?: BadgeVariant
}

export default function Badge({ label, variant }: BadgeProps) {
  const v = variant ?? statusMap[label] ?? "muted"
  const s = variants[v]
  return (
    <span
      className="inline-block px-2.5 py-0.5 rounded-xs text-[9px] font-medium tracking-[0.12em] uppercase whitespace-nowrap"
      style={{
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        fontFamily: "monospace",
      }}
    >{label}</span>
  )
}
