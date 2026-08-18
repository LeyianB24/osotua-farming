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
    <div style={{ background: "#FBF7F0", padding: "2.5rem 2rem 5rem", minHeight: "100vh" }}>
      {/* Header card */}
      <div
        style={{
          padding: "2rem 2.5rem",
          borderRadius: "24px",
          marginBottom: "2.5rem",
          background: "linear-gradient(180deg, #FFFFFF 0%, #FAF5EB 100%)",
          border: "1px solid rgba(196, 136, 42, 0.25)",
          boxShadow: "0 10px 32px rgba(196, 136, 42, 0.08)",
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
              fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#8E5E16", marginBottom: "0.75rem",
            }}
          >
            {icon && <i className={`bi ${icon}`} />}
            {eyebrow}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "#1C1208", lineHeight: 1.05,
            }}
          >
            {title}
          </h1>
          {count !== undefined && (
            <div style={{ marginTop: "0.5rem", color: "#6B553E", fontSize: "0.85rem" }}>
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
    <div
      style={{
        borderRadius: "24px",
        background: "#FFFFFF",
        border: "1px solid rgba(196, 136, 42, 0.22)",
        boxShadow: "0 10px 32px rgba(196, 136, 42, 0.06)",
        overflow: "hidden",
      }}
    >
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "640px" }}>
          <thead>
            <tr style={{ background: "rgba(250, 245, 235, 0.9)", borderBottom: "1px solid rgba(196, 136, 42, 0.15)" }}>
              {headers.map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "1rem 1.25rem",
                    fontFamily: "var(--font-space-grotesk), monospace",
                    fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em",
                    textTransform: "uppercase", color: "#8E5E16",
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
              style={{ fontSize: "2.5rem", color: "rgba(196,136,42,0.3)", display: "block", marginBottom: "1rem" }}
            />
            <p style={{ color: "#786550", fontSize: "0.9rem" }}>
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
        borderBottom: "1px solid rgba(196, 136, 42, 0.1)",
        background: index % 2 === 0 ? "#FFFFFF" : "#FAF8F5",
        transition: "background 0.15s ease",
      }}
      className="hover:bg-[#FAF5EB]"
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
        padding: "1rem 1.25rem",
        fontFamily: mono ? "var(--font-space-grotesk), monospace" : "inherit",
        fontSize: mono ? "0.8rem" : "0.88rem",
        color: accent ? "#C4882A" : muted ? "#786550" : "#1C1208",
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
      ? { bg: "rgba(46,125,50,0.12)", border: "rgba(46,125,50,0.35)", text: "#2E7D32" }
      : s === "PENDING" || s === "PROCESSING"
      ? { bg: "rgba(196,136,42,0.14)", border: "rgba(196,136,42,0.35)", text: "#8E5E16" }
      : s === "CANCELLED" || s === "SUSPENDED" || s === "REJECTED"
      ? { bg: "rgba(196,67,30,0.12)", border: "rgba(196,67,30,0.35)", text: "#C2410C" }
      : { bg: "rgba(28,18,8,0.06)", border: "rgba(28,18,8,0.15)", text: "#5C4835" }

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
