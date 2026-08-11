"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

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
    <div className="min-h-[80vh] bg-[#1C1208] flex items-center justify-center p-6 text-[#FBF7F0]">
      <div className="max-w-md w-full text-center space-y-6 bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#A0431E]/20 border border-[#A0431E]/30 text-[#A0431E] flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <span className="eyebrow justify-center text-[#C4882A] mb-2">System Notice</span>
          <h1 className="font-serif text-3xl text-[#FBF7F0]">Something went wrong</h1>
          <p className="text-xs text-[#FBF7F0]/60 mt-2 font-sans">
            An unexpected error occurred while loading this farm resource. Our technical ranch team has been notified.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto btn-primary py-3 px-6 text-xs flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto btn-ghost py-3 px-6 text-xs flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
