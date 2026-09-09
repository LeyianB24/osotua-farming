import Link from "next/link"

interface StatCardProps {
  title: string
  value: string | number
  sub?: string
  icon: string
  href?: string
  accent?: "gold" | "green" | "rust" | "default"
}

const accents = {
  gold:    { bg: "rgba(196,136,42,0.1)",  border: "rgba(196,136,42,0.25)",  icon: "#C4882A" },
  green:   { bg: "rgba(61,107,62,0.1)",   border: "rgba(61,107,62,0.25)",   icon: "#3D6B3E" },
  rust:    { bg: "rgba(160,67,30,0.1)",   border: "rgba(160,67,30,0.25)",   icon: "#A0431E" },
  default: { bg: "rgba(245,239,228,0.04)", border: "rgba(245,239,228,0.08)", icon: "rgba(196,136,42,0.7)" },
}

export default function StatCard({ title, value, sub, icon, href, accent = "default" }: StatCardProps) {
  const a = accents[accent]
  const Tag = href ? Link : "div"

  return (
    <Tag
      href={href as string}
      className="block p-5 rounded-xl transition-all duration-300 group hover:border-[rgba(196,136,42,0.4)]"
      style={{
        background: a.bg,
        border: `1px solid ${a.border}`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${a.border}` }}
        >
          <i className={`bi ${icon} text-lg`} style={{ color: a.icon }} />
        </div>
        {href && (
          <i
            className="bi bi-arrow-up-right text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: a.icon }}
          />
        )}
      </div>

      <div
        className="text-3xl font-light mb-1 leading-none"
        style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}
      >{value}</div>

      <div
        className="text-xs font-medium mb-1"
        style={{ color: "rgba(245,239,228,0.5)", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}
      >{title}</div>

      {sub && (
        <div className="text-xs mt-1" style={{ color: "rgba(245,239,228,0.3)" }}>{sub}</div>
      )}
    </Tag>
  )
}
