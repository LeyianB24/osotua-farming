import Link from "next/link"

interface StatCardProps {
  title: string
  value: string | number
  sub?: string
  icon: string
  href?: string
  accent?: "gold" | "green" | "rust" | "default"
}

export default function StatCard({ title, value, sub, icon, href, accent = "default" }: StatCardProps) {
  const Tag = href ? Link : "div"

  const isHighlighted = accent === "rust"

  return (
    <Tag
      href={href as string}
      className={`block p-5 bg-white border rounded-[2px] transition-all duration-200 group shadow-xs ${
        isHighlighted
          ? "border-[#B85D30] ring-1 ring-[#B85D30]"
          : "border-[#E5DDD0] hover:border-[#C48D2A]"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-[2px] bg-[#FAF7F2] border border-[#DDD4C4] flex items-center justify-center">
          <i className={`bi ${icon} text-base text-[#C48D2A]`} />
        </div>
        {href && (
          <i className="bi bi-arrow-up-right text-xs text-[#9F9384] group-hover:text-[#C48D2A] transition-colors" />
        )}
      </div>

      <div
        className="text-3xl font-bold mb-1 leading-none text-[#1A1208]"
        style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
      >
        {value}
      </div>

      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#7A6C5B] font-bold">
        {title}
      </div>

      {sub && (
        <div className="text-xs text-[#5C6D37] font-semibold mt-1 flex items-center gap-1">
          {sub}
        </div>
      )}
    </Tag>
  )
}
