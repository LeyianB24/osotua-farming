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
    <div style={{ background: "#0E0A05", minHeight: "75vh" }} className="flex items-center justify-center p-6 text-[#F5EFE4]">
      <div
        className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl"
        style={{
          background: "rgba(245,239,228,0.02)",
          border: "1px solid rgba(196,136,42,0.25)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-2xl"
          style={{
            background: "rgba(196,136,42,0.1)",
            border: "1px solid rgba(196,136,42,0.3)",
            color: "#C4882A",
          }}
        >
          <i className="bi bi-shield-exclamation" />
        </div>

        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-2" style={{ color: "#C4882A" }}>
            Portal Notice
          </span>
          <h2 className="font-light text-2xl" style={{ fontFamily: "Georgia, serif", color: "#F5EFE4" }}>
            Dashboard Error
          </h2>
          <p className="text-xs mt-2 font-mono" style={{ color: "rgba(245,239,228,0.5)" }}>
            Unable to load member resources or operational metrics. Please try again or return to overview.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #C4882A, #D99A30)",
              color: "#1C1208",
            }}
          >
            <i className="bi bi-arrow-clockwise text-sm" />
            <span>Try Again</span>
          </button>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2"
            style={{
              background: "rgba(245,239,228,0.04)",
              border: "1px solid rgba(196,136,42,0.25)",
              color: "#F5EFE4",
            }}
          >
            <i className="bi bi-speedometer2 text-sm" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
