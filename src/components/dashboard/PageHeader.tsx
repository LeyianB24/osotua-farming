import React from "react"

interface PageHeaderProps {
  eyebrow?: string
  title: string
  sub?: string
  action?: React.ReactNode
}

export default function PageHeader({ eyebrow, title, sub, action }: PageHeaderProps) {
  return (
    <div
      className="px-8 py-7 border-b flex items-start justify-between gap-4"
      style={{ borderColor: "rgba(196,136,42,0.1)" }}
    >
      <div>
        {eyebrow && (
          <div
            className="text-[10px] tracking-[0.22em] uppercase mb-2"
            style={{ color: "#C4882A", fontFamily: "monospace" }}
          >{eyebrow}</div>
        )}
        <h1
          className="font-light leading-tight"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            color: "#F5EFE4",
          }}
        >{title}</h1>
        {sub && (
          <p className="text-sm mt-1" style={{ color: "rgba(245,239,228,0.4)" }}>{sub}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}
