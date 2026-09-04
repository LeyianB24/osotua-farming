"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import CountUp from "@/components/shared/CountUp"
import TerrainWave from "@/components/shared/TerrainWave"

const floatingStats = [
  {
    icon: "bi-tree-fill",
    value: 12500,
    suffix: "+",
    label: "ACRES OF REGENERATIVE LAND",
    subcopy: "Chemical-free rotational pastures",
    iconBg: "#EBF5EB",
    color: "#3F6B3F",
    labelColor: "#3F6B3F",
  },
  {
    icon: "bi-award-fill",
    value: 4800,
    suffix: "+",
    label: "PEDIGREE LIVESTOCK HEAD",
    subcopy: "Dorper, Boran & Dairy Crosses",
    iconBg: "#FBF3E3",
    color: "#C4922E",
    labelColor: "#8E5E16",
  },
  {
    icon: "bi-people-fill",
    value: 180,
    suffix: "+",
    label: "PARTNER PASTORALIST FAMILIES",
    subcopy: "Direct fair-trade empowerment",
    iconBg: "#FAF0E1",
    color: "#8E5E16",
    labelColor: "#8E5E16",
  },
  {
    icon: "bi-graph-up-arrow",
    value: 450,
    suffix: "+ Tons",
    label: "ANNUAL ORGANIC YIELD",
    subcopy: "Grass-fed beef, mutton & dairy",
    iconBg: "#EBF5EB",
    color: "#3F6B3F",
    labelColor: "#3F6B3F",
  },
]

export default function FarmStats() {
  const [monthlyVolumeKg, setMonthlyVolumeKg] = useState<number>(15)

  const carbonSequesteredKg = Math.round(monthlyVolumeKg * 4.2)
  const pastureSupportedM2 = Math.round(monthlyVolumeKg * 28.5)
  const pastoralistIncomeKes = Math.round(monthlyVolumeKg * 850)

  return (
    <>
      {/* ── ESTATES & IMPACT METRICS (Spacious, Airy Layout) ── */}
      <section
        className="relative overflow-hidden py-16 sm:py-24"
        style={{
          background: "#F6F1E6",
        }}
      >
        <div className="os-container relative z-10">

          {/* 4 Floating Stat Cards on Cream Canvas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 sm:mb-20">
            {floatingStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-[24px] p-8 border border-[#EDE6D6] shadow-[0_12px_32px_rgba(33,28,21,0.04)] hover:shadow-[0_16px_40px_rgba(33,28,21,0.08)] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Soft Rounded Icon Badge */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: stat.iconBg, color: stat.color }}
                  >
                    <i className={`bi ${stat.icon} text-xl`} />
                  </div>

                  {/* Large Serif Number */}
                  <div
                    className="text-4xl sm:text-[40px] text-[#211C15] font-normal leading-none"
                    style={{
                      fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                    }}
                  >
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Tracked Uppercase Label */}
                  <div
                    className="text-[10.5px] font-bold tracking-[0.12em] uppercase mt-3.5"
                    style={{
                      fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), monospace",
                      color: stat.labelColor,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>

                {/* Warm Gray Subcopy */}
                <p className="text-xs sm:text-sm text-[#6B6558] mt-3 leading-relaxed">
                  {stat.subcopy}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── SUSTAINABILITY CALCULATOR ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "#FFFFFF",
              border: "1px solid #EDE6D6",
              boxShadow: "0 16px 48px rgba(33, 28, 21, 0.05)",
              borderRadius: "28px",
              padding: "3rem",
              position: "relative",
              overflow: "hidden",
            }}
            className="p-6 sm:p-12"
          >
            {/* Accent glow */}
            <div style={{
              position: "absolute", top: "-4rem", right: "-4rem",
              width: "280px", height: "280px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(196,136,42,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
              {/* Left — Controls */}
              <div className="lg:col-span-6 space-y-5">
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.35rem 0.9rem",
                    borderRadius: "100px",
                    background: "rgba(196,146,46,0.12)",
                    border: "1px solid rgba(196,146,46,0.25)",
                    color: "#8E5E16",
                    fontSize: "10px",
                    fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), monospace",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  <i className="bi bi-calculator" />
                  Interactive Sustainability Calculator
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                    fontWeight: 400,
                    color: "#1C1208",
                    lineHeight: 1.2,
                  }}
                >
                  Calculate Your Personal Pastoral Footprint
                </h3>

                <p style={{ fontSize: "14px", color: "#6B6558", lineHeight: 1.7 }}>
                  Adjust your estimated monthly farm order volume to see your direct ecological and economic contribution:
                </p>

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), monospace",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#8E5E16",
                      }}
                    >
                      Monthly Volume:
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                        fontSize: "2rem",
                        fontWeight: 400,
                        color: "#211C15",
                        lineHeight: 1,
                      }}
                    >
                      {monthlyVolumeKg} <span style={{ fontSize: "14px", color: "#6B6558" }}>kg / mo</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={monthlyVolumeKg}
                    onChange={(e) => setMonthlyVolumeKg(Number(e.target.value))}
                    style={{
                      width: "100%",
                      height: "6px",
                      background: `linear-gradient(to right, #C4882A ${((monthlyVolumeKg - 5) / 95) * 100}%, rgba(28,18,8,0.1) ${((monthlyVolumeKg - 5) / 95) * 100}%)`,
                      borderRadius: "3px",
                      appearance: "none",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "11px",
                      fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), monospace",
                      fontWeight: 600,
                      color: "#6B6558",
                      marginTop: "0.5rem",
                    }}
                  >
                    <span>5 kg (Family)</span>
                    <span>50 kg (Estate)</span>
                    <span>100 kg (Commercial)</span>
                  </div>
                </div>
              </div>

              {/* Right — Results */}
              <div
                style={{
                  padding: "2rem",
                  background: "#EBF5EB",
                  border: "1px solid #D1E7D1",
                  borderRadius: "20px",
                }}
                className="lg:col-span-6"
              >
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), monospace",
                    fontSize: "10.5px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#3F6B3F",
                    borderBottom: "1px solid #D1E7D1",
                    paddingBottom: "0.75rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <i className="bi bi-tree-fill" style={{ marginRight: "0.5rem" }} />
                  Estimated Monthly Ecological Impact
                </div>

                {[
                  {
                    icon: "bi-cloud-fill",
                    value: `${carbonSequesteredKg} kg CO₂e`,
                    label: "Carbon soil-sequestered via managed rotational grazing",
                    color: "#3F6B3F",
                  },
                  {
                    icon: "bi-geo-alt-fill",
                    value: `${pastureSupportedM2.toLocaleString()} m²`,
                    label: "Native grassland preserved from commercial overgrazing",
                    color: "#C4922E",
                  },
                  {
                    icon: "bi-people-fill",
                    value: `KES ${pastoralistIncomeKes.toLocaleString()}`,
                    label: "Direct fair wages paid to partner Maasai herders",
                    color: "#3F6B3F",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "1rem",
                      marginBottom: i < 2 ? "1.25rem" : 0,
                    }}
                  >
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "12px",
                        background: item.color === "#3F6B3F" ? "#FFFFFF" : "#FFF9EE",
                        border: `1px solid ${item.color === "#3F6B3F" ? "#C6E4C6" : "#F3DEBA"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <i className={`bi ${item.icon}`} style={{ fontSize: "1rem", color: item.color }} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                          fontSize: "1.5rem",
                          fontWeight: 400,
                          color: "#211C15",
                          lineHeight: 1.1,
                        }}
                      >
                        {item.value}
                      </div>
                      <p style={{ fontSize: "13px", color: "#6B6558", lineHeight: 1.5, marginTop: "0.25rem", margin: 0 }}>
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Terrain wave bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <TerrainWave fillColor="#FBF7F0" />
        </div>
      </section>
    </>
  )
}
