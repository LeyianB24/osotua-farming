"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Dashboard route error:", error)
  }, [error])

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 bg-[#FAF7F2] text-[#1A1208]">
      <div className="max-w-md w-full text-center space-y-6 p-8 bg-white border border-[#E5DDD0] rounded-[2px] shadow-sm">
        <div className="w-14 h-14 rounded-[2px] bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] flex items-center justify-center mx-auto text-2xl">
          <i className="bi bi-shield-exclamation" />
        </div>

        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-2 text-[#BA5932]">
            Portal Notice
          </span>
          <h2
            className="text-2xl font-bold text-[#1A1208]"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            Dashboard Notice
          </h2>
          <p className="text-xs mt-2 text-[#7A6C5B]">
            Unable to load member resources or operational metrics. Please try again or return to overview.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-[2px] text-xs font-mono uppercase tracking-wider font-bold bg-[#D4A045] text-[#160F08] hover:bg-[#C28E2B] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <i className="bi bi-arrow-clockwise text-sm" />
            <span>Try Again</span>
          </button>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-5 py-2.5 rounded-[2px] text-xs font-mono uppercase tracking-wider font-bold border border-[#DDD4C4] hover:bg-[#FAF7F2] text-[#5C4A2A] transition-all flex items-center justify-center gap-2"
          >
            <i className="bi bi-grid-fill text-sm" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
