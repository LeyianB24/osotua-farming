"use client"

import { useState } from "react"
import Image from "next/image"

const SEASONS = [
  {
    id: "current",
    name: "Active Harvest (This Week)",
    subtitle: "Picked at 6:00 AM &bull; Dispatched Same-Day",
    items: [
      { name: "Organic Crisp Cabbages", category: "Vegetables", image: "/images/cabbages.jpeg", peak: "Peak Harvest", yieldKg: "1,400 kg / wk" },
      { name: "Vine-Ripened Sweet Tomatoes", category: "Vegetables", image: "/images/ripe tomatoes.jpg", peak: "Peak Harvest", yieldKg: "850 kg / wk" },
      { name: "Sweet Rangeland Pineapples", category: "Fruits", image: "/images/pineapples.jpg", peak: "Limited Harvest", yieldKg: "450 kg / wk" },
      { name: "Pasture Dry-Aged Beef", category: "Grass-Fed Meat", image: "/images/beef cuts.jpg", peak: "Continuous", yieldKg: "2,000 kg / wk" },
    ],
  },
  {
    id: "upcoming",
    name: "Upcoming Harvests (Next 30 Days)",
    subtitle: "Pre-order for Priority Farm-Gate Dispatch",
    items: [
      { name: "Organic Farm Carrots", category: "Vegetables", image: "/images/carrots.jpg", peak: "Harvest in 12 days", yieldKg: "900 kg" },
      { name: "Crisp Green Apples", category: "Fruits", image: "/images/apples.jpg", peak: "Harvest in 18 days", yieldKg: "600 kg" },
      { name: "High-Elevation Red Onions", category: "Vegetables", image: "/images/red onions.jpg", peak: "Harvest in 21 days", yieldKg: "1,200 kg" },
      { name: "Spring Lamb Chops", category: "Grass-Fed Meat", image: "/images/lamb chops.jpg", peak: "Reserve Now", yieldKg: "800 kg" },
    ],
  },
]

export default function HarvestCalendar() {
  const [activeSeason, setActiveSeason] = useState<string>("current")
  const selected = SEASONS.find((s) => s.id === activeSeason) || SEASONS[0]

  return (
    <div className="card-luxury p-8 sm:p-12 space-y-8 bg-gradient-to-b from-white via-[#FAF8F5] to-white border-amber-500/30 shadow-2xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-500/10 text-[#2E6B34] border border-emerald-500/25">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            LIVE HARVEST CALENDAR &bull; SAME-DAY DISPATCH
          </div>
          <h3
            className="text-3xl sm:text-4xl font-light text-[#1C1208] m-0"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Ranch Harvest Schedule
          </h3>
          <p className="text-sm text-[#5C4835] max-w-xl font-normal">
            We operate on a zero-storage farm model: crops are harvested upon order confirmation at sunrise and delivered refrigerated to Nairobi by 2:00 PM.
          </p>
        </div>

        {/* Season Toggles */}
        <div className="flex bg-[#FAF6EE] p-1.5 rounded-2xl border border-amber-900/15 shrink-0">
          {SEASONS.map((s) => {
            const active = activeSeason === s.id
            return (
              <button
                key={s.id}
                onClick={() => setActiveSeason(s.id)}
                className={`py-2.5 px-5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  active
                    ? "bg-gradient-to-r from-[#C4882A] to-[#D99A30] text-white shadow-md"
                    : "text-[#5C4835] hover:text-[#1C1208]"
                }`}
              >
                {s.id === "current" ? "Active Harvest" : "Next 30 Days"}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid of Harvest items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {selected.items.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                {item.category}
              </div>
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-emerald-700/80 backdrop-blur-md text-emerald-100 text-[10px] font-mono font-bold uppercase tracking-wider">
                {item.peak}
              </div>
            </div>

            <div className="p-5 space-y-2">
              <h4
                className="text-lg font-bold text-[#1C1208] m-0"
                style={{ fontFamily: "var(--font-fraunces), serif" }}
              >
                {item.name}
              </h4>
              <div className="flex items-center justify-between text-xs font-mono text-[#8E5E16] pt-2 border-t border-stone-100">
                <span>Ranch Capacity:</span>
                <strong className="text-[#1C1208]">{item.yieldKg}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Dispatch Route Guarantee */}
      <div className="p-6 rounded-2xl bg-[#FAF6EE] border border-amber-900/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs font-mono text-[#5C4835]">
          <i className="ti ti-truck-delivery text-xl text-[#C4882A]" />
          <span>Daily Nairobi Cold Routes: Karen &bull; Lavington &bull; Westlands &bull; Muthaiga &bull; Runda</span>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#2E6B34]">
          <i className="ti ti-check" />
          <span>Dawn Harvest Guarantee</span>
        </div>
      </div>

    </div>
  )
}
