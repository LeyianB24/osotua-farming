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
    <div className="bg-mesh-earth noise min-h-screen" style={{ padding: "2.5rem 2rem 5rem" }}>
      {/* Header card */}
      <div
        className="glass-dark"
        style={{
          padding: "2rem 2.5rem",
          borderRadius: "20px",
          marginBottom: "2.5rem",
          border: "1px solid rgba(196,136,42,0.25)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            position: "absolute", top: "-5rem", right: "-5rem", width: "300px", height: "300px",
            borderRadius: "50%", background: "radial-gradient(circle, rgba(196,136,42,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              fontFamily: "var(--font-space-grotesk), monospace",
              fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#C4882A", marginBottom: "0.75rem",
            }}
          >
            {icon && <i className={`bi ${icon}`} />}
            {eyebrow}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#F5EFE4", lineHeight: 1.05,
            }}
          >
            {title}
          </h1>
          {count !== undefined && (
            <div style={{ marginTop: "0.5rem", color: "rgba(245,239,228,0.5)", fontSize: "0.82rem" }}>
              <span style={{ color: "#C4882A", fontFamily: "var(--font-space-grotesk), monospace", fontWeight: 700 }}>
                {count}
              </span>{" "}
              {countLabel}
            </div>
          )}
        </div>
        {action && <div style={{ position: "relative", zIndex: 1 }}>{action}</div>}
      </div>

      {children}
    </div>
  )
}

/* ── Dark glass table ─────────────────────────────── */
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
      className="glass-dark"
      style={{
        borderRadius: "20px",
        border: "1px solid rgba(196,136,42,0.2)",
        overflow: "hidden",
      }}
    >
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "640px" }}>
          <thead>
            <tr style={{ background: "rgba(0,0,0,0.35)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {headers.map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "0.875rem 1.25rem",
                    fontFamily: "var(--font-space-grotesk), monospace",
                    fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.2em",
                    textTransform: "uppercase", color: "#C4882A",
                    textAlign: "left",
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
          <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <i
              className={`bi ${emptyIcon || "bi-inbox"}`}
              style={{ fontSize: "2.5rem", color: "rgba(196,136,42,0.25)", display: "block", marginBottom: "1rem" }}
            />
            <p style={{ color: "rgba(245,239,228,0.35)", fontSize: "0.9rem" }}>
              {emptyText || "No records found."}
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
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: index % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
        transition: "background 0.15s ease",
      }}
      className="hover:bg-white/[0.04]"
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
      style={{
        padding: "0.875rem 1.25rem",
        fontFamily: mono ? "var(--font-space-grotesk), monospace" : "inherit",
        fontSize: mono ? "0.78rem" : "0.88rem",
        color: accent ? "#C4882A" : muted ? "rgba(245,239,228,0.5)" : "#F5EFE4",
        fontWeight: mono ? 600 : 400,
      }}
    >
      {children}
    </td>
  )
}

/* ── Status badge ─────────────────────────────── */
export function StatusBadge({ status }: { status: string }) {
  const s = status?.toUpperCase() ?? ""

  const color =
    s === "ACTIVE" || s === "DELIVERED" || s === "PAID" || s === "COMPLETED" || s === "CONFIRMED"
      ? { bg: "rgba(61,107,62,0.2)", border: "rgba(61,107,62,0.4)", text: "#5a9e5c" }
      : s === "PENDING" || s === "PROCESSING"
      ? { bg: "rgba(196,136,42,0.2)", border: "rgba(196,136,42,0.4)", text: "#C4882A" }
      : s === "CANCELLED" || s === "SUSPENDED" || s === "REJECTED"
      ? { bg: "rgba(160,67,30,0.2)", border: "rgba(160,67,30,0.4)", text: "#c55f3a" }
      : { bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.15)", text: "rgba(245,239,228,0.6)" }

  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.25rem 0.65rem",
        borderRadius: "100px",
        background: color.bg,
        border: `1px solid ${color.border}`,
        color: color.text,
        fontFamily: "var(--font-space-grotesk), monospace",
        fontSize: "0.58rem",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
      }}
    >
      {status}
    </span>
  )
}
