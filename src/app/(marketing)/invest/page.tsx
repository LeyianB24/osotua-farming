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

export default function InvestPage() {
  const [amount, setAmount] = useState(500000)
  const [duration, setDuration] = useState(3)
  const [investmentType, setInvestmentType] = useState<"breeding" | "barn">("breeding")
  const [requested, setRequested] = useState(false)

  const roiRate = investmentType === "breeding" ? 0.16 : 0.14
  const estimatedReturn = amount * Math.pow(1 + roiRate, duration)
  const profit = estimatedReturn - amount

  const activeTier =
    amount >= 2000000 ? TIERS[2] : amount >= 500000 ? TIERS[1] : TIERS[0]

  return (
    <div style={{ background: "#FBF7F0" }} className="pt-20 min-h-screen">

      {/* ── HERO HEADER ── */}
      <div
        className="bg-mesh-earth noise"
        style={{ padding: "8rem 0 7rem", position: "relative", overflow: "hidden" }}
      >
        {/* Ambient glow blobs */}
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
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk), monospace",
                    fontSize: "0.58rem",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(245,239,228,0.45)",
                    marginTop: "0.4rem",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PILLARS ── */}
      <section
        className="bg-mesh-green noise"
        style={{ padding: "7rem 0" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "560px", marginBottom: "4rem" }}>
            <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1rem" }}>
              Three Revenue Pillars
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.4rem, 4vw, 4rem)",
                fontWeight: 300,
                color: "#F5EFE4",
                lineHeight: 1.1,
              }}
            >
              How your capital{" "}
              <em style={{ color: "#C4882A", fontStyle: "italic" }}>multiplies</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {PILLARS.map((p, i) => (
              <div
                key={p.label}
                className="glass-dark"
                style={{ padding: "2.25rem", display: "flex", flexDirection: "column", gap: "1rem", position: "relative", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", top: "-2rem", right: "-2rem", width: "120px", height: "120px", borderRadius: "50%", background: `radial-gradient(circle, rgba(196,136,42,0.12) 0%, transparent 70%)`, pointerEvents: "none" }} />
                <div
                  style={{
                    width: "52px", height: "52px", borderRadius: "14px",
                    background: "rgba(196,136,42,0.12)",
                    border: "1px solid rgba(196,136,42,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <i className={`bi ${p.icon}`} style={{ fontSize: "1.5rem", color: "#C4882A" }} />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "1.6rem",
                    fontWeight: 400,
                    color: "#F5EFE4",
                  }}
                >
                  {p.label}
                </div>
                <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.88rem", lineHeight: 1.75, flex: 1 }}>
                  {p.desc}
                </p>
                <div style={{ paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                      fontSize: "2.2rem",
                      fontWeight: 300,
                      color: "#C4882A",
                      lineHeight: 1,
                    }}
                  >
                    {p.stat}
                  </div>
                  <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.4)" }}>
                    {p.statLabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI CALCULATOR ── */}
      <section
        className="bg-mesh-earth noise"
        style={{ padding: "7rem 0" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "560px", marginBottom: "4rem" }}>
            <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1rem" }}>
              Interactive Calculator
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.4rem, 4vw, 4rem)",
                fontWeight: 300,
                color: "#F5EFE4",
                lineHeight: 1.1,
              }}
            >
              Project your{" "}
              <em style={{ color: "#3D6B3E", fontStyle: "italic" }}>return on investment</em>
            </h2>
          </div>

          <div className="glass-dark" style={{ padding: "2.5rem", borderRadius: "24px", position: "relative", overflow: "hidden" }}>
            {/* Accent glow */}
            <div style={{ position: "absolute", top: "-4rem", right: "-4rem", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,136,42,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

            {/* Type toggle */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2.5rem", background: "rgba(255,255,255,0.05)", padding: "0.3rem", borderRadius: "10px", width: "fit-content" }}>
              {[
                { key: "breeding" as const, label: "Livestock Equity", rate: "16% p.a." },
                { key: "barn" as const, label: "Barn Retail", rate: "14% p.a." },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setInvestmentType(t.key)}
                  style={{
                    padding: "0.6rem 1.5rem",
                    borderRadius: "7px",
                    background: investmentType === t.key ? "#C4882A" : "transparent",
                    color: investmentType === t.key ? "#1C1208" : "rgba(245,239,228,0.5)",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-space-grotesk), monospace",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    transition: "all 0.25s ease",
                  }}
                >
                  {t.label} · {t.rate}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative">
              {/* Sliders */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {/* Amount */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.875rem" }}>
                    <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)" }}>
                      Investment Amount
                    </span>
                    <span style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif", fontSize: "1.8rem", fontWeight: 300, color: "#C4882A", lineHeight: 1 }}>
                      KES {amount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range" min={100000} max={5000000} step={50000}
                    value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#C4882A", cursor: "pointer", height: "4px" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.55rem", color: "rgba(245,239,228,0.3)", letterSpacing: "0.08em" }}>
                    <span>KES 100K</span>
                    <span>KES 5M</span>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.875rem" }}>
                    <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)" }}>
                      Investment Tenure
                    </span>
                    <span style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif", fontSize: "1.8rem", fontWeight: 300, color: "#F5EFE4", lineHeight: 1 }}>
                      {duration} {duration === 1 ? "Year" : "Years"}
                    </span>
                  </div>
                  <input
                    type="range" min={1} max={5} step={1}
                    value={duration} onChange={(e) => setDuration(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#3D6B3E", cursor: "pointer", height: "4px" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.55rem", color: "rgba(245,239,228,0.3)", letterSpacing: "0.08em" }}>
                    <span>1 Year</span>
                    <span>5 Years</span>
                  </div>
                </div>

                {/* Tier badge */}
                <div
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.75rem",
                    padding: "0.875rem 1.25rem",
                    borderRadius: "12px",
                    background: `rgba(${activeTier.color === "#3D6B3E" ? "61,107,62" : "196,136,42"}, 0.12)`,
                    border: `1px solid ${activeTier.color}33`,
                  }}
                >
                  <i className={`bi ${activeTier.icon}`} style={{ fontSize: "1.2rem", color: activeTier.color }} />
                  <div>
                    <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.4)" }}>
                      Investor Tier
                    </div>
                    <div style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif", fontSize: "1.3rem", fontWeight: 400, color: activeTier.color }}>
                      {activeTier.label}
                    </div>
                  </div>
                </div>
              </div>

              {/* Results panel */}
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: "16px",
                  padding: "2rem",
                  border: "1px solid rgba(196,136,42,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div className="eyebrow" style={{ color: "#C4882A" }}>Projected Outcome</div>

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
                    Tier Benefits
                  </div>
                  {activeTier.perks.map((perk) => (
                    <div key={perk} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                      <i className="bi bi-check-circle-fill" style={{ fontSize: "0.75rem", color: "#3D6B3E" }} />
                      <span style={{ fontSize: "0.8rem", color: "rgba(245,239,228,0.6)" }}>{perk}</span>
                    </div>
                  ))}
                </div>

                <p style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.52rem", color: "rgba(245,239,228,0.25)", fontStyle: "italic", marginTop: "auto", letterSpacing: "0.04em" }}>
                  *Projections based on historical yield rates and rangeland expansion modeling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROSPECTUS CTA ── */}
      <section
        className="bg-mesh-gold noise"
        style={{ padding: "7rem 0" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,136,42,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div className="eyebrow justify-center" style={{ color: "#C4882A", marginBottom: "1.5rem" }}>
            Official Prospectus
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(2.8rem, 5vw, 5rem)",
              fontWeight: 300,
              color: "#F5EFE4",
              lineHeight: 1.05,
              marginBottom: "1.25rem",
            }}
          >
            Request the Full Investment Brief
          </h2>
          <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.95rem", lineHeight: 1.8, maxWidth: "520px", margin: "0 auto 3rem" }}>
            Our 2026 investment brief covers audited financial projections, rangeland expansion blueprints, legal framework, and partner equity structures.
          </p>

          {requested ? (
            <div
              className="glass"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.75rem",
                padding: "1rem 2rem",
                color: "#3D6B3E",
                fontFamily: "var(--font-space-grotesk), monospace",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
              }}
            >
              <i className="bi bi-check-circle-fill" />
              Investment Brief Sent to Your Email
            </div>
          ) : (
            <button onClick={() => setRequested(true)} className="btn-primary">
              <i className="bi bi-download" />
              Download 2026 Investment Brief
            </button>
          )}
        </div>
      </section>
    </div>
  )
}
