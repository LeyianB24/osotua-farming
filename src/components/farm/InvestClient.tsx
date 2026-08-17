"use client"

import { useState } from "react"

const TIERS = [
  {
    label: "Seedling",
    min: 100000,
    max: 499999,
    icon: "bi-tree",
    color: "#3D6B3E",
    perks: ["Quarterly digital reports", "Farm visit priority access", "Newsletter updates"],
  },
  {
    label: "Rancher",
    min: 500000,
    max: 1999999,
    icon: "bi-award",
    color: "#C4882A",
    perks: ["Semi-annual yield statements", "Named livestock dedication", "Barn Store discount 15%", "Annual investor briefing"],
  },
  {
    label: "Partner",
    min: 2000000,
    max: null,
    icon: "bi-gem",
    color: "#D99A30",
    perks: ["Monthly yield statements", "Board observer seat", "Exclusive breed co-ownership rights", "Private ranch retreat access"],
  },
]

const PILLARS = [
  { icon: "bi-graph-up-arrow", label: "Livestock Enterprise", desc: "Breeding, importing, and distributing climate-resilient Boran cattle, Sahiwal dairy cows, Boer goats, and Dorper sheep across Kenya and East Africa.", stat: "16% p.a.", statLabel: "Projected ROI" },
  { icon: "bi-shop", label: "Barn Store Network", desc: "Direct-to-consumer and B2B supply of aged beef, fresh dairy, organic produce, and weekly subscription boxes to Nairobi and regional markets.", stat: "14% p.a.", statLabel: "Projected ROI" },
  { icon: "bi-shield-check", label: "Asset-Backed Growth", desc: "Every investment unit is backed by physical herd inventory and titled rangeland assets in Kajiado County — transparent, tangible, and audited.", stat: "3,200+", statLabel: "Acres Titled" },
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
  const [requested, setRequested] = useState(false)
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
        setRequested(true)
        setTimeout(() => setShowModal(false), 2000)
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
    <div style={{ background: "#FBF7F0" }} className="pt-20 min-h-screen">
      {/* ── HERO HEADER ── */}
      <div
        className="bg-mesh-earth noise"
        style={{ padding: "8rem 0 7rem", position: "relative", overflow: "hidden" }}
      >
        <div style={{ position: "absolute", top: "10%", left: "5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,136,42,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "8%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(61,107,62,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1.5rem" }}>
            Investor Relations
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              fontWeight: 300,
              color: "#F5EFE4",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "2rem",
              maxWidth: "800px",
            }}
          >
            Invest in{" "}
            <em style={{ color: "#C4882A", fontStyle: "italic" }}>Africa&apos;s future</em>
          </h1>
          <p style={{ color: "rgba(245,239,228,0.65)", maxWidth: "520px", lineHeight: 1.8, fontSize: "1rem", marginBottom: "3rem" }}>
            Osotua Farming offers a high-yield opportunity uniting climate-resilient livestock genetics, organic produce supply, and modern agribusiness technology — all from a single titled ranch in Kajiado.
          </p>

          {/* Key stats row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(196,136,42,0.2)" }}>
            {[
              { value: "16%", label: "Livestock ROI p.a." },
              { value: "KES 2B+", label: "Herd Asset Value" },
              { value: "3,200", label: "Titled Acres" },
              { value: "4", label: "Species Bred" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "2.4rem",
                    fontWeight: 300,
                    color: "#C4882A",
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,239,228,0.4)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PILLARS ── */}
      <section style={{ padding: "6rem 0", borderBottom: "1px solid #EDE5D8" }}>
        <div className="os-container">
          <div style={{ maxWidth: "600px", marginBottom: "4rem" }}>
            <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "0.75rem" }}>
              Our Business Model
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                color: "#1C1208",
                lineHeight: 1.1,
              }}
            >
              Three Diversified <em style={{ color: "#C4882A" }}>Revenue Pillars</em>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {PILLARS.map((p) => (
              <div
                key={p.label}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #EDE5D8",
                  borderRadius: "20px",
                  padding: "2.5rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "rgba(196,136,42,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.5rem",
                      color: "#C4882A",
                    }}
                  >
                    <i className={`bi ${p.icon}`} style={{ fontSize: "1.3rem" }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                      fontSize: "1.6rem",
                      fontWeight: 400,
                      color: "#1C1208",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {p.label}
                  </h3>
                  <p style={{ color: "#6B3E1A", fontSize: "0.88rem", lineHeight: 1.7 }}>
                    {p.desc}
                  </p>
                </div>

                <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #EDE5D8", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B3E1A" }}>
                    {p.statLabel}
                  </span>
                  <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "1.2rem", fontWeight: 700, color: "#3D6B3E" }}>
                    {p.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE CALCULATOR ── */}
      <section
        className="bg-mesh-earth noise"
        style={{ padding: "7rem 0", color: "#F5EFE4" }}
      >
        <div className="os-container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 4rem" }}>
            <div className="eyebrow justify-center" style={{ color: "#C4882A", marginBottom: "0.75rem" }}>
              Yield Simulator
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                fontWeight: 300,
                color: "#F5EFE4",
                lineHeight: 1.1,
              }}
            >
              Simulate Your <em style={{ color: "#C4882A" }}>Projected Returns</em>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
            className="lg:grid-cols-[1.2fr_1fr]"
          >
            {/* Left — Controls */}
            <div
              className="glass-dark"
              style={{
                padding: "2.5rem",
                borderRadius: "24px",
                border: "1px solid rgba(196,136,42,0.25)",
              }}
            >
              {/* Type Switcher */}
              <div style={{ marginBottom: "2.5rem" }}>
                <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C4882A", marginBottom: "0.75rem" }}>
                  1. Enterprise Focus
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {[
                    { id: "breeding", label: "Livestock Enterprise (16% ROI)", sub: "Breeding, genetics & rangeland expansion" },
                    { id: "barn", label: "Barn Network (14% ROI)", sub: "Cold-chain retail, meat & dairy distribution" },
                  ].map((t) => {
                    const active = investmentType === t.id
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setInvestmentType(t.id as "breeding" | "barn")}
                        style={{
                          padding: "1rem",
                          borderRadius: "14px",
                          textAlign: "left",
                          background: active ? "rgba(196,136,42,0.2)" : "rgba(255,255,255,0.04)",
                          border: active ? "1px solid #C4882A" : "1px solid rgba(255,255,255,0.08)",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.72rem", fontWeight: 600, color: "#F5EFE4" }}>{t.label}</div>
                        <div style={{ fontSize: "0.68rem", color: "rgba(245,239,228,0.4)", marginTop: "0.25rem" }}>{t.sub}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Amount Slider */}
              <div style={{ marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
                  <label style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C4882A" }}>
                    2. Capital Allocation
                  </label>
                  <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "1.1rem", fontWeight: 700, color: "#C4882A" }}>
                    KES {amount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={10000000}
                  step={50000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#C4882A", cursor: "pointer" }}
                />
              </div>

              {/* Duration Slider */}
              <div style={{ marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
                  <label style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C4882A" }}>
                    3. Investment Horizon
                  </label>
                  <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "1.1rem", fontWeight: 700, color: "#C4882A" }}>
                    {duration} Years
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={7}
                  step={1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#C4882A", cursor: "pointer" }}
                />
              </div>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <i className="bi bi-file-earmark-text" />
                Inquire &amp; Request Prospectus
              </button>
            </div>

            {/* Right — Projected Summary */}
            <div
              className="glass-dark"
              style={{
                padding: "2.5rem",
                borderRadius: "24px",
                border: "1px solid rgba(196,136,42,0.25)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {[
                { label: "Principal Capital", value: `KES ${amount.toLocaleString()}`, color: "rgba(245,239,228,0.8)" },
                { label: "Estimated Yield", value: `+ KES ${Math.round(profit).toLocaleString()}`, color: "#3D6B3E" },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: "0.875rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,239,228,0.4)" }}>
                    {row.label}
                  </span>
                  <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "1rem", fontWeight: 700, color: row.color }}>
                    {row.value}
                  </span>
                </div>
              ))}

              <div>
                <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,239,228,0.35)", marginBottom: "0.5rem" }}>
                  Total Projected Value
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "3rem",
                    fontWeight: 300,
                    color: "#C4882A",
                    lineHeight: 1,
                  }}
                >
                  KES {Math.round(estimatedReturn).toLocaleString()}
                </div>
              </div>

              <div style={{ marginTop: "0.5rem" }}>
                <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,239,228,0.3)", marginBottom: "0.75rem" }}>
                  Tier Benefits ({activeTier.label})
                </div>
                {activeTier.perks.map((perk) => (
                  <div key={perk} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                    <i className="bi bi-check-circle-fill" style={{ fontSize: "0.75rem", color: "#3D6B3E" }} />
                    <span style={{ fontSize: "0.8rem", color: "rgba(245,239,228,0.6)" }}>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODAL INQUIRY ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1208]/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#1C1208] border border-[#C4882A]/30 rounded-2xl p-6 sm:p-8 text-[#F5EFE4] shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-[#F5EFE4]/60 hover:text-white"
              aria-label="Close"
            >
              <i className="bi bi-x-lg text-lg" />
            </button>

            <div className="eyebrow text-[#C4882A] mb-1">Investor Enquiry</div>
            <h3 className="font-serif text-2xl font-light mb-4">Request Official 2026 Prospectus</h3>

            {formSuccess ? (
              <div className="p-4 rounded-xl bg-[#3D6B3E]/20 border border-[#3D6B3E]/40 text-[#3D6B3E] text-center my-4">
                <i className="bi bi-check-circle-fill text-2xl mb-1 block" />
                <p className="font-semibold text-sm">Prospectus Request Received!</p>
                <p className="text-xs text-[#F5EFE4]/60 mt-1">Our investor relations desk will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F5EFE4]/60 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Senator Grace Mutua"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-[#F5EFE4] outline-none focus:border-[#C4882A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F5EFE4]/60 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@investor.co.ke"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-[#F5EFE4] outline-none focus:border-[#C4882A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F5EFE4]/60 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+254 700 000000"
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-[#F5EFE4] outline-none focus:border-[#C4882A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F5EFE4]/60 mb-1">
                    Investment Notes or Inquiries (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Tell us about your portfolio horizon, syndicate, or specific questions..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-[#F5EFE4] outline-none focus:border-[#C4882A]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-3 text-xs justify-center"
                  >
                    {isSubmitting ? "Submitting Request..." : `Submit Inquiry (KES ${amount.toLocaleString()})`}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
