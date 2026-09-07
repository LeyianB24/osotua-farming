"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function ShopError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Shop route error:", error)
  }, [error])

  return (
    <div style={{ background: "#FBF7F0", minHeight: "75vh" }} className="flex items-center justify-center p-6 text-[#1C1208]">
      <div
        className="max-w-md w-full text-center space-y-6 p-8 bg-white border border-emerald-700/25 rounded-3xl shadow-xl"
      >
        <div className="w-16 h-16 rounded-2xl bg-emerald-700/10 border border-emerald-700/30 text-[#2E6B34] flex items-center justify-center mx-auto text-2xl">
          <i className="bi bi-basket-fill" />
        </div>

        <div>
          <span className="eyebrow justify-center text-[#2E6B34] mb-2 font-bold">Barn Store Notice</span>
          <h2 className="font-serif text-3xl text-[#1C1208] font-normal">Marketplace Error</h2>
          <p className="text-sm text-[#5C4835] mt-2 font-sans">
            Unable to load produce or inventory right now. Please refresh or return to the store catalog.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto btn-primary py-3 px-6 text-xs flex items-center justify-center gap-2"
          >
            <i className="bi bi-arrow-clockwise text-sm" />
            <span>Reload Store</span>
          </button>

          <Link
            href="/barn"
            className="w-full sm:w-auto btn-outline-dark py-3 px-6 text-xs flex items-center justify-center gap-2"
          >
            <i className="bi bi-bag text-sm" />
            <span>The Barn</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
