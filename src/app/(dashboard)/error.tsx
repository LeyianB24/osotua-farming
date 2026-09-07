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
    <div style={{ background: "#FBF7F0", minHeight: "75vh" }} className="flex items-center justify-center p-6 text-[#1C1208]">
      <div
        className="max-w-md w-full text-center space-y-6 p-8 bg-white border border-[#C4882A]/25 rounded-3xl shadow-xl"
      >
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[#8E5E16] flex items-center justify-center mx-auto text-2xl">
          <i className="bi bi-shield-exclamation" />
        </div>

        <div>
          <span className="eyebrow justify-center text-[#8E5E16] mb-2 font-bold">Portal Notice</span>
          <h2 className="font-serif text-3xl text-[#1C1208] font-normal">Dashboard Error</h2>
          <p className="text-sm text-[#5C4835] mt-2 font-sans">
            Unable to load member resources or operational metrics. Please try again or re-authenticate.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto btn-primary py-3 px-6 text-xs flex items-center justify-center gap-2"
          >
            <i className="bi bi-arrow-clockwise text-sm" />
            <span>Try Again</span>
          </button>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto btn-outline-dark py-3 px-6 text-xs flex items-center justify-center gap-2"
          >
            <i className="bi bi-speedometer2 text-sm" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
