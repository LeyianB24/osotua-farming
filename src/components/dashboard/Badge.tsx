import React from "react"

export type BadgeVariant = "gold" | "green" | "rust" | "blue" | "muted" | "yellow"

const variants: Record<BadgeVariant, { bg: string; color: string; border: string }> = {
  gold:   { bg: "#FEF3C7", color: "#92400E", border: "#FDE68A" },
  green:  { bg: "#E8EEDC", color: "#486326", border: "#D2DCBE" },
  rust:   { bg: "#FEE2E2", color: "#991B1B", border: "#FECACA" },
  blue:   { bg: "#EFE4D2", color: "#855B23", border: "#DDD0B9" },
  muted:  { bg: "#F3EFE6", color: "#7A6C5B", border: "#E5DDD0" },
  yellow: { bg: "#FEF9C3", color: "#854D0E", border: "#FEF08A" },
}

const statusMap: Record<string, BadgeVariant> = {
  AVAILABLE: "green", PENDING: "blue", CONFIRMED: "green", CANCELLED: "rust",
  PAID: "green", DELIVERED: "green", PROCESSING: "blue", ACTIVE: "green",
  PAUSED: "yellow", OPEN: "green", CLOSED: "muted", APPROVED: "green",
  SUSPENDED: "rust", RESERVED: "gold", SOLD: "muted", BREEDING_STOCK: "blue",
  RECEIVED: "blue", REVIEWING: "blue", SHORTLISTED: "gold",
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
      className="inline-block px-2.5 py-0.5 rounded-[2px] text-[10px] font-bold tracking-[0.1em] uppercase whitespace-nowrap font-mono"
      style={{
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
      }}
    >
      {label}
    </span>
  )
}
