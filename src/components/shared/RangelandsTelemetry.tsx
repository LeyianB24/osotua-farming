"use client"

import { useState, useEffect } from "react"

export default function RangelandsTelemetry() {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-KE", {
          timeZone: "Africa/Nairobi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full bg-[#120C05] border-b border-amber-500/20 text-stone-300 py-2.5 px-4 overflow-hidden relative z-40 text-xs font-mono select-none">
      <div className="os-container flex items-center justify-between gap-6 flex-wrap">
        
        {/* Left: Location & Local Rangeland Time */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-amber-400 uppercase tracking-widest text-[10px]">
              KAJIADO RANGELANDS TELEMETRY
            </span>
          </div>

          <span className="hidden sm:inline text-stone-500">&bull;</span>

          <div className="hidden sm:flex items-center gap-1.5 text-stone-300">
            <i className="ti ti-clock text-[#C4882A]" />
            <span>{time || "06:00:00 AM"} EAT</span>
          </div>
        </div>

        {/* Center: Live Sensor Telemetry */}
        <div className="hidden md:flex items-center gap-6 text-[11px] text-stone-400">
          <div className="flex items-center gap-1.5">
            <i className="ti ti-sun text-amber-400" />
            <span>26&deg;C &bull; Sunny</span>
          </div>

          <div className="flex items-center gap-1.5">
            <i className="ti ti-droplet text-teal-400" />
            <span>Humidity 42%</span>
          </div>

          <div className="flex items-center gap-1.5">
            <i className="ti ti-seeding text-emerald-400" />
            <span>Sector 4-B Active Rotational Grazing</span>
          </div>

          <div className="flex items-center gap-1.5">
            <i className="ti ti-truck-delivery text-amber-400" />
            <span className="text-stone-200">Cold-Chain Dispatch Live</span>
          </div>
        </div>

        {/* Right: Certified Status Pill */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
            <i className="ti ti-shield-check text-amber-400" />
            <span>KENYA STUD BOOK CERTIFIED</span>
          </div>
        </div>

      </div>
    </div>
  )
}
