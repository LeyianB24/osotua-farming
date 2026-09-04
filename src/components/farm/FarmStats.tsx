"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import TerrainWave from "@/components/shared/TerrainWave"

export default function FarmStats() {
  const [monthlyVolumeKg, setMonthlyVolumeKg] = useState<number>(15)

  const carbonSequesteredKg = Math.round(monthlyVolumeKg * 4.2)
  const pastureSupportedM2 = Math.round(monthlyVolumeKg * 28.5)
  const pastoralistIncomeKes = Math.round(monthlyVolumeKg * 850)

  return (
    <>
      {/* ── STATS & SUSTAINABILITY SECTION (Spacious, Airy Layout) ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FBF7F0 0%, #FAF5EB 50%, #FFFFFF 100%)",
          padding: "5rem 0 7rem",
        }}
      >
        <div className="os-container relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto" style={{ marginBottom: "3.5rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontSize: "10px",
                color: "#C4922E",
                fontWeight: 700,
                background: "rgba(196,146,46,0.12)",
                padding: "4px 12px",
                borderRadius: "100px",
                display: "inline-block",
                marginBottom: "0.75rem",
              }}
            >
              Estates &amp; Impact Metrics
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 400,
                color: "#1C1208",
                lineHeight: 1.15,
              }}
            >
              Regenerative Farming{" "}
              <em style={{ color: "#C4922E", fontStyle: "italic" }}>by the Numbers</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ marginTop: "0.75rem", color: "#6B6558", lineHeight: 1.7, fontSize: "15px" }}
            >
              Every Osotua subscription directly rejuvenates Kenyan grasslands and supports indigenous pastoral communities.
            </motion.p>
          </div>

          {/* ── SUSTAINABILITY CALCULATOR ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "#FFFFFF",
              border: "1px solid #EDE6D6",
              boxShadow: "0 16px 48px rgba(33, 28, 21, 0.06)",
              borderRadius: "24px",
              padding: "2.5rem",
              position: "relative",
              overflow: "hidden",
            }}
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
