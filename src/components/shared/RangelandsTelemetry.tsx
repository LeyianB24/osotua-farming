"use client";

import { useState, useEffect } from "react";

export default function RangelandsTelemetry() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-KE", {
          timeZone: "Africa/Nairobi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#160D05] border-b border-[#C4882A]/20 text-[#FBF7F0]/70 py-2 px-4 overflow-hidden relative z-40 text-xs font-mono select-none">
      <div className="os-container flex items-center justify-between gap-6 flex-wrap">
        
        {/* Left: Location & Local Rangeland Time */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-[#C4882A] uppercase tracking-widest text-[10px]">
              KAJIADO RANGELANDS TELEMETRY
            </span>
          </div>

          <span className="hidden sm:inline text-white/20">&bull;</span>

          <div className="hidden sm:flex items-center gap-1.5 text-[#FBF7F0]/90">
            <i className="bi bi-clock text-[#C4882A]" aria-hidden="true" />
            <span>{time || "06:00:00 AM"} EAT</span>
          </div>
        </div>

        {/* Center: Live Sensor Telemetry */}
        <div className="hidden md:flex items-center gap-6 text-[11px] text-[#FBF7F0]/60">
          <div className="flex items-center gap-1.5">
            <i className="bi bi-sun text-[#C4882A]" aria-hidden="true" />
            <span>26&deg;C &bull; Savanna</span>
          </div>

          <div className="flex items-center gap-1.5">
            <i className="bi bi-droplet text-emerald-400" aria-hidden="true" />
            <span>Humidity 42%</span>
          </div>

          <div className="flex items-center gap-1.5">
            <i className="bi bi-tree text-emerald-400" aria-hidden="true" />
            <span>Sector 4-B Active Rotational Pasture</span>
          </div>

          <div className="flex items-center gap-1.5">
            <i className="bi bi-truck text-[#C4882A]" aria-hidden="true" />
            <span className="text-[#FBF7F0]/90">Cold-Chain Dispatch Live</span>
          </div>
        </div>

        {/* Right: Certified Status Pill */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C4882A]/15 border border-[#C4882A]/30 text-[#C4882A] text-[10px] font-bold">
            <i className="bi bi-patch-check" aria-hidden="true" />
            <span>KENYA STUD BOOK CERTIFIED</span>
          </div>
        </div>

      </div>
    </div>
  );
}
