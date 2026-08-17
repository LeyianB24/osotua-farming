"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import CountUp from "@/components/shared/CountUp"
import TerrainWave from "@/components/shared/TerrainWave"


const stats = [
  {
    label: "Acres of Regenerative Land",
    value: 12500,
    suffix: "+",
    subtext: "Chemical-free rotational pastures",
    icon: "bi-tree-fill",
    color: "#3D6B3E",
  },
  {
    label: "Pedigree Livestock Head",
    value: 4800,
    suffix: "+",
    subtext: "Dorper, Boran & Dairy Crosses",
    icon: "bi-award-fill",
    color: "#C4882A",
  },
  {
    label: "Partner Pastoralist Families",
    value: 180,
    suffix: "+",
    subtext: "Direct fair-trade empowerment",
    icon: "bi-people-fill",
    color: "#C4882A",
  },
  {
    label: "Annual Organic Yield",
    value: 450,
    suffix: "+ Tons",
    subtext: "Grass-fed beef, mutton & dairy",
    icon: "bi-graph-up-arrow",
    color: "#3D6B3E",
  },
]

export default function FarmStats() {
  const [monthlyVolumeKg, setMonthlyVolumeKg] = useState<number>(15)

  const carbonSequesteredKg = Math.round(monthlyVolumeKg * 4.2)
  const pastureSupportedM2 = Math.round(monthlyVolumeKg * 28.5)
  const pastoralistIncomeKes = Math.round(monthlyVolumeKg * 850)

  return (
    <>
      {/* ── STATS SECTION ── */}
      <section
        className="bg-mesh-gold noise relative overflow-hidden"
        style={{ padding: "6rem 0 8rem" }}
      >
        <div className="os-container relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto" style={{ marginBottom: "4rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="eyebrow justify-center"
              style={{ color: "#C4882A", marginBottom: "1rem" }}
            >
              Estates & Impact Metrics
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 300,
                color: "#F5EFE4",
                lineHeight: 1.1,
              }}
            >
              Regenerative Farming{" "}
              <em style={{ color: "#C4882A", fontStyle: "italic" }}>by the Numbers</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ marginTop: "1rem", color: "rgba(245,239,228,0.6)", lineHeight: 1.8 }}
            >
              Every Osotua subscription directly rejuvenates Kenyan grasslands and supports indigenous pastoral communities.
            </motion.p>
          </div>

          {/* 4-stat glass-gold grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            style={{ marginBottom: "5rem" }}
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="glass-gold"
                style={{
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  cursor: "default",
                  animation: `glassFloat ${6 + idx * 0.5}s ease-in-out ${idx * 0.3}s infinite`,
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: `rgba(${stat.color === "#C4882A" ? "196,136,42" : "61,107,62"}, 0.15)`,
                    border: `1px solid rgba(${stat.color === "#C4882A" ? "196,136,42" : "61,107,62"}, 0.3)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.75rem",
                  }}
                >
                  <i className={`bi ${stat.icon}`} style={{ fontSize: "1.3rem", color: stat.color }} />
                </div>

                {/* Count-up value */}
                <div
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "2.6rem",
                    fontWeight: 300,
                    color: "#F5EFE4",
                    lineHeight: 1,
                  }}
                >
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), monospace",
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: stat.color,
                    marginTop: "0.25rem",
                  }}
                >
                  {stat.label}
                </div>
                <p style={{ fontSize: "0.8rem", color: "rgba(245,239,228,0.5)", lineHeight: 1.5 }}>
                  {stat.subtext}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── SUSTAINABILITY CALCULATOR ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass-dark"
            style={{ padding: "2.5rem 2.5rem 2.5rem", position: "relative", overflow: "hidden" }}
          >
            {/* Accent glow */}
            <div style={{
              position: "absolute", top: "-4rem", right: "-4rem",
              width: "280px", height: "280px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(196,136,42,0.18) 0%, transparent 70%)",
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
                    padding: "0.4rem 1rem",
                    borderRadius: "100px",
                    background: "rgba(196,136,42,0.15)",
                    border: "1px solid rgba(196,136,42,0.3)",
                    color: "#C4882A",
                    fontSize: "0.58rem",
                    fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), monospace",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  <Calculator className="w-3 h-3" />
                  Interactive Sustainability Calculator
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                    fontWeight: 300,
                    color: "#F5EFE4",
                    lineHeight: 1.2,
                  }}
                >
                  Calculate Your Personal Pastoral Footprint
                </h3>

                <p style={{ fontSize: "0.9rem", color: "rgba(245,239,228,0.6)", lineHeight: 1.7 }}>
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
                        fontFamily: "var(--font-space-grotesk), monospace",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#C4882A",
                      }}
                    >
                      Monthly Volume:
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "1.8rem",
                        fontWeight: 400,
                        color: "#F5EFE4",
                        lineHeight: 1,
                      }}
                    >
                      {monthlyVolumeKg} <span style={{ fontSize: "1rem", color: "rgba(245,239,228,0.5)" }}>kg / mo</span>
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
                      height: "4px",
                      background: `linear-gradient(to right, #C4882A ${((monthlyVolumeKg - 5) / 95) * 100}%, rgba(245,239,228,0.15) ${((monthlyVolumeKg - 5) / 95) * 100}%)`,
                      borderRadius: "2px",
                      appearance: "none",
                      cursor: "pointer",
                      outline: "none",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.65rem",
                      fontFamily: "var(--font-space-grotesk), monospace",
                      color: "rgba(245,239,228,0.3)",
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
                className="lg:col-span-6 glass-green"
                style={{ padding: "1.75rem" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk), monospace",
                    fontSize: "0.58rem",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#3D6B3E",
                    borderBottom: "1px solid rgba(61,107,62,0.25)",
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
                    color: "#3D6B3E",
                  },
                  {
                    icon: "bi-geo-alt-fill",
                    value: `${pastureSupportedM2.toLocaleString()} m²`,
                    label: "Native grassland preserved from commercial overgrazing",
                    color: "#C4882A",
                  },
                  {
                    icon: "bi-people-fill",
                    value: `KES ${pastoralistIncomeKes.toLocaleString()}`,
                    label: "Direct fair wages paid to partner Maasai herders",
                    color: "#3D6B3E",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.875rem",
                      marginBottom: i < 2 ? "1rem" : 0,
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: `rgba(${item.color === "#3D6B3E" ? "61,107,62" : "196,136,42"}, 0.15)`,
                        border: `1px solid rgba(${item.color === "#3D6B3E" ? "61,107,62" : "196,136,42"}, 0.3)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <i className={`bi ${item.icon}`} style={{ fontSize: "0.9rem", color: item.color }} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontSize: "1.5rem",
                          fontWeight: 400,
                          color: "#F5EFE4",
                          lineHeight: 1.1,
                        }}
                      >
                        {item.value}
                      </div>
                      <p style={{ fontSize: "0.78rem", color: "rgba(245,239,228,0.5)", lineHeight: 1.5, marginTop: "0.2rem" }}>
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
