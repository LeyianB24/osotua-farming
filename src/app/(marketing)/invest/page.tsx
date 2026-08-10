"use client"

import { useState } from "react"

export default function InvestPage() {
  const [amount, setAmount] = useState(500000)
  const [duration, setDuration] = useState(3)
  const [investmentType, setInvestmentType] = useState<"breeding" | "barn">("breeding")
  const [requested, setRequested] = useState(false)

  // Estimated ROI calculations
  const roiRate = investmentType === "breeding" ? 0.16 : 0.14
  const estimatedReturn = amount * Math.pow(1 + roiRate, duration)
  const profit = estimatedReturn - amount

  return (
    <div className="bg-[#FBF7F0] pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-[#1C1208] py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="eyebrow text-[#C4882A] mb-4">
            Investor Relations
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-light text-[#F5EFE4] mb-4 leading-tight tracking-tight">
            Invest in <em className="text-[#C4882A] not-italic">Africa&apos;s future</em>
          </h1>
          <p className="text-[#F5EFE4]/70 max-w-xl leading-relaxed text-base">
            Osotua Farming offers a high-yield opportunity uniting climate-resilient livestock genetics, organic produce supply, and modern agribusiness tech.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Interactive ROI Calculator */}
        <div className="os-card p-6 sm:p-10 mb-16 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-[#1C1208]/08 pb-6">
            <div>
              <div className="eyebrow text-[#C4882A] mb-1">Interactive Calculator</div>
              <h2 className="font-serif text-3xl text-[#1C1208] font-light">
                Projected <em className="text-[#3D6B3E] not-italic">Return on Investment</em>
              </h2>
            </div>
            <div className="flex bg-[#F5EFE4] p-1 rounded border border-[#EDE5D8]">
              <button
                onClick={() => setInvestmentType("breeding")}
                className={`px-4 py-2 rounded text-xs font-mono transition-all ${
                  investmentType === "breeding"
                    ? "bg-[#C4882A] text-[#1C1208] font-bold shadow-sm"
                    : "text-[#1C1208]/60 hover:text-[#1C1208]"
                }`}
              >
                Livestock Equity (16% p.a)
              </button>
              <button
                onClick={() => setInvestmentType("barn")}
                className={`px-4 py-2 rounded text-xs font-mono transition-all ${
                  investmentType === "barn"
                    ? "bg-[#C4882A] text-[#1C1208] font-bold shadow-sm"
                    : "text-[#1C1208]/60 hover:text-[#1C1208]"
                }`}
              >
                Barn Retail Expansion (14% p.a)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2 font-mono text-xs">
                  <span className="text-[#1C1208]/60 uppercase tracking-wider">Investment Amount:</span>
                  <span className="font-bold text-[#C4882A] text-base">
                    KES {amount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={5000000}
                  step={50000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full accent-[#C4882A] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#1C1208]/40 mt-1">
                  <span>KES 100,000</span>
                  <span>KES 5,000,000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2 font-mono text-xs">
                  <span className="text-[#1C1208]/60 uppercase tracking-wider">Tenure / Duration:</span>
                  <span className="font-bold text-[#1C1208] text-base">
                    {duration} {duration === 1 ? "Year" : "Years"}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full accent-[#3D6B3E] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#1C1208]/40 mt-1">
                  <span>1 Year</span>
                  <span>5 Years</span>
                </div>
              </div>
            </div>

            {/* Projected Outputs */}
            <div className="bg-[#1C1208] text-[#F5EFE4] rounded p-6 flex flex-col justify-between space-y-4 shadow-xl">
              <div className="space-y-3">
                <div className="eyebrow text-[#C4882A]">Estimated Outcome</div>
                <div className="flex justify-between items-baseline border-b border-[#F5EFE4]/10 pb-2">
                  <span className="text-xs text-[#F5EFE4]/60">Initial Capital:</span>
                  <span className="font-mono text-sm font-semibold">KES {amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-[#F5EFE4]/10 pb-2">
                  <span className="text-xs text-[#F5EFE4]/60">Est. Profit Yield:</span>
                  <span className="font-mono text-sm font-semibold text-[#3D6B3E]">
                    + KES {Math.round(profit).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="font-serif text-base">Total Projected Value:</span>
                  <span className="font-mono text-2xl font-bold text-[#C4882A]">
                    KES {Math.round(estimatedReturn).toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-[#F5EFE4]/40 font-mono italic">
                *Projections based on historical yield rates and rangeland expansion modeling.
              </p>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[
            { icon: "bi-graph-up-arrow", label: "Livestock Enterprise", desc: "Breeding, importing, and distributing climate-resilient bulls, heifers, Boer goats, and Dorper sheep." },
            { icon: "bi-pie-chart", label: "Barn Store Network", desc: "Direct-to-consumer and B2B supply of aged beef, fresh dairy, organic produce, and weekly subscription boxes." },
            { icon: "bi-shield-check", label: "Asset Backed Growth", desc: "Every investment unit is backed by physical herd inventory and titled rangeland assets in Kajiado." },
          ].map((item) => (
            <div key={item.label} className="os-card p-6">
              <div className="w-12 h-12 rounded bg-[#C4882A]/10 border border-[#C4882A]/25 flex items-center justify-center mb-4">
                <i className={`bi ${item.icon} text-xl text-[#C4882A]`} />
              </div>
              <div className="font-serif text-2xl text-[#1C1208] mb-2">{item.label}</div>
              <div className="text-[#1C1208]/60 text-sm leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Prospectus Request Box */}
        <div className="bg-[#1C1208] rounded p-12 text-center text-[#F5EFE4] shadow-2xl relative overflow-hidden">
          <div className="eyebrow justify-center text-[#C4882A] mb-3">Official Prospectus</div>
          <h2 className="font-serif text-4xl font-light mb-4">Request the Full Investment Brief</h2>
          <p className="text-[#F5EFE4]/60 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Our 2026 investment brief covers audited financial projections, rangeland expansion blueprints, legal framework, and partner equity structures.
          </p>

          {requested ? (
            <div className="inline-flex items-center gap-2 text-sm text-[#3D6B3E] font-mono bg-[#3D6B3E]/15 border border-[#3D6B3E]/30 px-6 py-3 rounded">
              <i className="bi bi-check-circle" />
              <span>Investment Brief sent to your email!</span>
            </div>
          ) : (
            <button
              onClick={() => setRequested(true)}
              className="btn-primary"
            >
              <i className="bi bi-download" />
              <span>Download 2026 Investment Brief</span>
            </button>
          )}
        </div>

      </div>
    </div>
  )
}
