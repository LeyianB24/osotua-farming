import React from "react"

interface PageHeaderProps {
  eyebrow?: string
  title: string
  sub?: string
  action?: React.ReactNode
}

export default function PageHeader({ eyebrow, title, sub, action }: PageHeaderProps) {
  return (
    <div className="px-6 sm:px-8 py-6 border-b border-[#E5DDD0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-transparent">
      <div>
        {eyebrow && (
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#7A6C5B] font-bold mb-1">
            {eyebrow}
          </div>
        )}
        <h1
          className="font-bold text-[#1A1208] tracking-tight leading-tight"
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
            fontSize: "26px",
            lineHeight: "1.2",
          }}
        >
          {title}
        </h1>
        {sub && (
          <p className="text-xs text-[#7A6C5B] mt-1 font-medium">{sub}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}
