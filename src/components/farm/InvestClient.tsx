"use client"

import { useState } from "react"
import Image from "next/image"
import { LOGO } from "@/lib/images"

const TIERS = [
  {
    label: "Seedling",
    min: 100000,
    max: 499999,
    icon: "ti-plant-2",
    color: "#2E7D32",
    perks: ["Quarterly digital audited reports", "Farm visit priority scheduling", "Seasonal Gazette updates"],
  },
  {
    label: "Rancher",
    min: 500000,
    max: 1999999,
    icon: "ti-award",
    color: "#C4882A",
    perks: ["Semi-annual yield statements", "Named livestock pedigree dedication", "Barn Store lifetime 15% discount", "Annual private investor briefing"],
  },
  {
    label: "Partner",
    min: 2000000,
    max: null,
    icon: "ti-diamond",
    color: "#D99A30",
    perks: ["Monthly detailed yield statements", "Advisory board observer seat", "Exclusive breed co-ownership rights", "Private ranch lodge retreat access"],
  },
]

const PILLARS = [
  {
    icon: "ti-chart-arrows-vertical",
    label: "Pedigree Livestock Enterprise",
    desc: "Breeding, raising, and distributing climate-resilient Boran cattle, Sahiwal dairy stock, Boer goats, and Dorper sheep across East Africa.",
    stat: "16% p.a.",
    statLabel: "Projected ROI",
    image: "/images/boran bulls.jpg",
  },
  {
    icon: "ti-building-store",
    label: "Direct Barn Store Network",
    desc: "Supplying dry-aged grass-fed beef, pasture dairy, and dawn-harvested organic produce directly to Nairobi kitchens and luxury hospitality partners.",
    stat: "14% p.a.",
    statLabel: "Projected ROI",
    image: "/images/beef cuts.jpg",
  },
  {
    icon: "ti-shield-check",
    label: "Asset-Backed Security",
    desc: "Every capital unit is fully backed by audited herd inventory and 3,200+ titled rangeland acres in Kajiado County — physical, verifiable, and transparent.",
    stat: "3,200+",
    statLabel: "Titled Acres",
    image: "/images/osotua-rangelands-herd.jpg",
  },
]

export default function InvestClient() {
  const [amount, setAmount] = useState(500000)
  const [duration, setDuration] = useState(3)
  const [investmentType, setInvestmentType] = useState<"breeding" | "barn">("breeding")

  // Modal / Form state
  const [showModal, setShowModal] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [note, setNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  const roiRate = investmentType === "breeding" ? 0.16 : 0.14
  const estimatedReturn = amount * Math.pow(1 + roiRate, duration)
  const profit = estimatedReturn - amount

  const activeTier =
    amount >= 2000000 ? TIERS[2] : amount >= 500000 ? TIERS[1] : TIERS[0]

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/invest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone: phone || undefined,
          amount,
          durationYears: duration,
          investmentType,
          note: note || undefined,
        }),
      })

      if (res.ok) {
        setFormSuccess(true)
        setTimeout(() => {
          setShowModal(false)
          setFormSuccess(false)
        }, 2000)
      } else {
        alert("Failed to submit inquiry. Please verify your details.")
      }
    } catch (err) {
      console.error(err)
      alert("Submission error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ background: "#FBF7F0", color: "#1C1208", width: "100%", overflowX: "hidden" }}>

      {/* ── HERO BANNER ── */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-24 overflow-hidden" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="os-container relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{
                color: "#C99A2E",
                fontFamily: "var(--font-source-sans), sans-serif",
              }}
            >
              INVESTOR RELATIONS · IMPACT AGRIBUSINESS
            </span>
            <div className="h-[1px] w-12 bg-[#C99A2E]/50" />
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#1C1208] leading-[1.08] max-w-5xl mb-6"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}
          >
            Invest in <br />
            <span style={{ color: "#C99A2E" }}>Africa&apos;s Pastoral Future</span>
          </h1>

          <p
            className="text-base sm:text-lg text-[#1C1208]/80 max-w-2xl leading-relaxed mb-10 font-normal"
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
          >
            Osotua Farming offers a tangible, asset-backed agribusiness opportunity uniting climate-resilient livestock genetics, organic supply chains, and modern precision logistics from a titled estate in Kajiado.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-[#D4C9B0]">
            {[
              { value: "16%", label: "Livestock ROI p.a." },
              { value: "KES 2B+", label: "Herd Asset Value" },
              { value: "3,200", label: "Titled Acres" },
              { value: "4", label: "Purebred Species" },
            ].map((s) => (
              <div key={s.label} className="border-l-2 border-[#C99A2E]/40 pl-4">
                <div
                  className="text-3xl sm:text-4xl font-bold text-[#C99A2E]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {s.value}
                </div>
                <div
                  className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1C1208]/70 mt-1"
                  style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILLARS SECTION WITH IMAGES ── */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "#FAF7F2", borderTop: "1px solid #D4C9B0" }}>
        <div className="os-container relative z-10 space-y-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{
                  color: "#C99A2E",
                  fontFamily: "var(--font-source-sans), sans-serif",
                }}
              >
                INVESTMENT THESIS
              </span>
              <div className="h-[1px] w-12 bg-[#C99A2E]/50" />
            </div>
            <h2
              className="text-3xl sm:text-5xl font-bold text-[#1C1208] m-0"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Why Invest in <span style={{ color: "#C4602A" }}>Osotua</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((p) => (
              <div
                key={p.label}
                className="flex flex-col justify-between h-full bg-[#FAF7F2] border border-[#D4C9B0] transition-all duration-300 hover:shadow-lg group"
                style={{ borderRadius: "2px" }}
              >
                {/* Visual Header Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#1C1208]">
                  <Image
                    src={p.image}
                    alt={p.label}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute top-3.5 left-3.5 text-[#F5F0E8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
                    style={{ backgroundColor: "#1C1208", borderRadius: "2px" }}
                  >
                    {p.statLabel}: {p.stat}
                  </div>
                </div>

                <div className="px-7 pt-7 pb-4 space-y-3">
                  <h3
                    className="text-2xl font-bold text-[#1C1208] m-0"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {p.label}
                  </h3>
                  <p
                    className="text-sm text-[#1C1208]/75 leading-relaxed m-0 font-normal"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    {p.desc}
                  </p>
                </div>

                <div className="px-7 pb-7 pt-4 mt-auto flex items-center justify-between border-t border-[#E8E0D2]">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8E7E70]"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    Audited Yield
                  </span>
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "#C4602A", fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {p.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALCULATOR & TIERS SECTION ── */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "#F5F0E8" }}>
        <div className="os-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Interactive Calculator */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.2em]"
                    style={{
                      color: "#C99A2E",
                      fontFamily: "var(--font-source-sans), sans-serif",
                    }}
                  >
                    FINANCIAL MODEL
                  </span>
                  <div className="h-[1px] w-12 bg-[#C99A2E]/50" />
                </div>
                <h2
                  className="text-3xl sm:text-5xl font-bold text-[#1C1208] leading-tight m-0"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Yield Calculator
                </h2>
                <p
                  className="text-base text-[#1C1208]/75 leading-relaxed font-normal"
                  style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  Project your returns based on historical compounding rates across our pedigree breeding and direct farm store dispatch networks.
                </p>
              </div>

              <div
                className="p-8 sm:p-10 space-y-8 bg-[#FAF7F2] border border-[#D4C9B0] shadow-sm"
                style={{ borderRadius: "2px" }}
              >
                {/* Investment Type Selector */}
                <div>
                  <label
                    className="block text-[11px] uppercase tracking-[0.14em] text-[#8E7E70] font-semibold mb-3"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    Investment Focus
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setInvestmentType("breeding")}
                      className="py-3 px-4 text-xs font-bold uppercase tracking-[0.14em] transition-all cursor-pointer"
                      style={{
                        borderRadius: "2px",
                        backgroundColor: investmentType === "breeding" ? "#1C1208" : "transparent",
                        color: investmentType === "breeding" ? "#F5F0E8" : "#1C1208",
                        border: "1px solid #1C1208",
                        fontFamily: "var(--font-source-sans), sans-serif",
                      }}
                    >
                      Pedigree (16% p.a.)
                    </button>
                    <button
                      type="button"
                      onClick={() => setInvestmentType("barn")}
                      className="py-3 px-4 text-xs font-bold uppercase tracking-[0.14em] transition-all cursor-pointer"
                      style={{
                        borderRadius: "2px",
                        backgroundColor: investmentType === "barn" ? "#1C1208" : "transparent",
                        color: investmentType === "barn" ? "#F5F0E8" : "#1C1208",
                        border: "1px solid #1C1208",
                        fontFamily: "var(--font-source-sans), sans-serif",
                      }}
                    >
                      Barn (14% p.a.)
                    </button>
                  </div>
                </div>

                {/* Amount Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label
                      className="text-[11px] uppercase tracking-[0.14em] text-[#8E7E70] font-semibold"
                      style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                    >
                      Principal Capital (KES)
                    </label>
                    <span
                      className="text-xl font-bold"
                      style={{ color: "#C4602A", fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      KES {amount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100000}
                    max={10000000}
                    step={100000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full accent-[#C99A2E] cursor-pointer"
                  />
                  <div
                    className="flex justify-between text-[11px] text-[#8E7E70] mt-1"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    <span>KES 100K</span>
                    <span>KES 5M</span>
                    <span>KES 10M+</span>
                  </div>
                </div>

                {/* Duration Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label
                      className="text-[11px] uppercase tracking-[0.14em] text-[#8E7E70] font-semibold"
                      style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                    >
                      Investment Tenor (Years)
                    </label>
                    <span
                      className="text-xl font-bold"
                      style={{ color: "#C4602A", fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      {duration} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full accent-[#C99A2E] cursor-pointer"
                  />
                  <div
                    className="flex justify-between text-[11px] text-[#8E7E70] mt-1"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    <span>1 Year</span>
                    <span>5 Years</span>
                    <span>10 Years</span>
                  </div>
                </div>

                {/* Yield Output Box */}
                <div
                  className="p-6 bg-[#F5F0E8] border border-[#D4C9B0] space-y-3"
                  style={{ borderRadius: "2px" }}
                >
                  <div className="flex justify-between items-center text-xs text-[#1C1208]/75">
                    <span>Projected Total Value:</span>
                    <strong
                      className="text-xl font-bold text-[#1C1208]"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      KES {Math.round(estimatedReturn).toLocaleString()}
                    </strong>
                  </div>
                  <div className="flex justify-between items-center text-xs text-[#1C1208]/75 pt-2 border-t border-[#D4C9B0]">
                    <span>Total Estimated Gain:</span>
                    <strong
                      className="text-2xl font-bold text-[#6B7A3F]"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      + KES {Math.round(profit).toLocaleString()}
                    </strong>
                  </div>
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  className="w-full btn-gold py-4 cursor-pointer"
                  style={{ borderRadius: "2px" }}
                >
                  <i className="bi bi-envelope" />
                  <span>REQUEST DETAILED INVESTOR PROSPECTUS</span>
                </button>
              </div>
            </div>

            {/* Right Column: Investor Tiers */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.2em]"
                    style={{
                      color: "#6B7A3F",
                      fontFamily: "var(--font-source-sans), sans-serif",
                    }}
                  >
                    PORTFOLIO TIERS
                  </span>
                  <div className="h-[1px] w-12 bg-[#6B7A3F]/50" />
                </div>
                <h2
                  className="text-3xl sm:text-5xl font-bold text-[#1C1208] leading-tight m-0"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Investor Benefits
                </h2>
              </div>

              <div className="space-y-4">
                {TIERS.map((tier) => {
                  const isCurrent = activeTier.label === tier.label
                  return (
                    <div
                      key={tier.label}
                      className="p-7 space-y-4 transition-all duration-300 bg-[#FAF7F2] border"
                      style={{
                        borderRadius: "2px",
                        borderColor: isCurrent ? "#C99A2E" : "#D4C9B0",
                        boxShadow: isCurrent ? "0 4px 20px rgba(201, 154, 46, 0.15)" : "none",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 flex items-center justify-center text-lg"
                            style={{
                              backgroundColor: "#F5F0E8",
                              color: "#C99A2E",
                              border: "1px solid #D4C9B0",
                              borderRadius: "2px",
                            }}
                          >
                            <i className="bi bi-shield-check" />
                          </div>
                          <div>
                            <h3
                              className="text-xl font-bold text-[#1C1208] m-0"
                              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                            >
                              {tier.label} Tier
                            </h3>
                            <div
                              className="text-[11px] uppercase tracking-[0.14em] text-[#8E7E70]"
                              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                            >
                              From KES {tier.min.toLocaleString()}{tier.max ? ` to KES ${tier.max.toLocaleString()}` : "+"}
                            </div>
                          </div>
                        </div>

                        {isCurrent && (
                          <span
                            className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
                            style={{
                              backgroundColor: "#C99A2E",
                              color: "#1C1208",
                              borderRadius: "2px",
                            }}
                          >
                            Active Match
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 pt-2 border-t border-[#E8E0D2]">
                        {tier.perks.map((p) => (
                          <div
                            key={p}
                            className="flex items-center gap-2 text-xs text-[#1C1208]/80 font-normal"
                            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                          >
                            <i className="bi bi-check2 text-[#6B7A3F] font-bold" />
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MODAL PROSPECTUS FORM ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="p-8 sm:p-10 max-w-lg w-full bg-[#FAF7F2] border border-[#D4C9B0] shadow-2xl relative"
            style={{ borderRadius: "2px" }}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-6 top-6 text-[#1C1208]/60 hover:text-[#1C1208] p-1 cursor-pointer text-xl"
            >
              <i className="bi bi-x" />
            </button>

            {formSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div
                  className="w-16 h-16 flex items-center justify-center mx-auto text-3xl"
                  style={{
                    backgroundColor: "#F5F0E8",
                    color: "#6B7A3F",
                    border: "1px solid #D4C9B0",
                    borderRadius: "2px",
                  }}
                >
                  <i className="bi bi-check-circle" />
                </div>
                <h3
                  className="text-2xl font-bold text-[#1C1208]"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Prospectus Request Received
                </h3>
                <p
                  className="text-sm text-[#1C1208]/75"
                  style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  Our managing partner will dispatch the investment documentation and audited financials to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div className="space-y-1">
                  <div
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C99A2E]"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    INVESTOR BRIEFING
                  </div>
                  <h3
                    className="text-2xl font-bold text-[#1C1208]"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    Request Term Sheet
                  </h3>
                  <p
                    className="text-xs text-[#1C1208]/75"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    Estimated allocation: <strong style={{ color: "#C4602A" }}>KES {amount.toLocaleString()}</strong> ({duration} Years)
                  </p>
                </div>

                <div>
                  <label
                    className="block text-[11px] uppercase tracking-[0.14em] text-[#8E7E70] font-semibold mb-1"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Moses Ole Sironka"
                    className="w-full bg-[#F5F0E8] border border-[#D4C9B0] p-3 text-xs text-[#1C1208] outline-none focus:border-[#C99A2E]"
                    style={{ borderRadius: "2px", fontFamily: "var(--font-source-sans), sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-[11px] uppercase tracking-[0.14em] text-[#8E7E70] font-semibold mb-1"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="moses@example.com"
                    className="w-full bg-[#F5F0E8] border border-[#D4C9B0] p-3 text-xs text-[#1C1208] outline-none focus:border-[#C99A2E]"
                    style={{ borderRadius: "2px", fontFamily: "var(--font-source-sans), sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-[11px] uppercase tracking-[0.14em] text-[#8E7E70] font-semibold mb-1"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 700 000 000"
                    className="w-full bg-[#F5F0E8] border border-[#D4C9B0] p-3 text-xs text-[#1C1208] outline-none focus:border-[#C99A2E]"
                    style={{ borderRadius: "2px", fontFamily: "var(--font-source-sans), sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-[11px] uppercase tracking-[0.14em] text-[#8E7E70] font-semibold mb-1"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    Notes / Portfolio Objectives
                  </label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Individual investor, institutional fund, or family office..."
                    className="w-full bg-[#F5F0E8] border border-[#D4C9B0] p-3 text-xs text-[#1C1208] outline-none focus:border-[#C99A2E]"
                    style={{ borderRadius: "2px", fontFamily: "var(--font-source-sans), sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-dark-fill py-3.5 text-xs tracking-widest justify-center cursor-pointer"
                  style={{ borderRadius: "2px" }}
                >
                  {isSubmitting ? (
                    <span>Transmitting Request...</span>
                  ) : (
                    <span>SUBMIT PROSPECTUS REQUEST</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
