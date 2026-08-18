"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Uncaught application error:", error)
  }, [error])

  return (
    <div style={{ background: "#FBF7F0", minHeight: "80vh" }} className="flex items-center justify-center p-6 text-[#1C1208]">
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(196, 136, 42, 0.25)",
          borderRadius: "28px",
          boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
        }}
        className="max-w-md w-full text-center space-y-6 p-8"
      >
        <div className="w-16 h-16 rounded-full bg-[#C2410C]/12 border border-[#C2410C]/30 text-[#C2410C] flex items-center justify-center mx-auto text-2xl">
          <i className="bi bi-exclamation-triangle-fill" />
        </div>

        <div>
          <span className="eyebrow justify-center text-[#8E5E16] mb-2 font-bold">System Notice</span>
          <h1 className="font-serif text-3xl text-[#1C1208] font-normal">Something went wrong</h1>
          <p className="text-xs text-[#5C4835] mt-2 font-sans">
            An unexpected error occurred while loading this farm resource. Our technical ranch team has been notified.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto btn-primary py-3 px-6 text-xs flex items-center justify-center gap-2"
          >
            <i className="bi bi-arrow-clockwise text-sm" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto btn-ghost py-3 px-6 text-xs flex items-center justify-center gap-2"
          >
            <i className="bi bi-house-door text-sm" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
