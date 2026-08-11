"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import TerrainWave from "@/components/shared/TerrainWave"
import CountUp from "@/components/shared/CountUp"

const WORD_STAGGER = 0.09

function WordReveal({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.7,
            delay: 0.35 + i * WORD_STAGGER,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

const floatingStats = [
  { icon: "bi-geo-alt-fill",     value: 12500, suffix: "+",    label: "Acres Rangelands",   color: "#C4882A" },
  { icon: "bi-people-fill",      value: 4800,  suffix: "+",    label: "Head of Livestock",  color: "#3D6B3E" },
  { icon: "bi-graph-up",         value: 180,   suffix: "+",    label: "Partner Families",   color: "#C4882A" },
  { icon: "bi-patch-check-fill", value: 450,   suffix: "t+",   label: "Organic Yield / yr", color: "#3D6B3E" },
]

// Gold floating particles
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 5.2) % 90}%`,
  top: `${10 + (i * 7.3) % 80}%`,
  size: 2 + (i % 4),
  delay: (i * 0.41) % 4,
  duration: 4 + (i % 5),
}))

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{
        background: `
          radial-gradient(ellipse 80% 80% at 20% 20%, rgba(196,136,42,0.25) 0%, transparent 60%),
          radial-gradient(ellipse 60% 60% at 80% 80%, rgba(61,107,62,0.2) 0%, transparent 50%),
          radial-gradient(ellipse 100% 100% at 50% 0%, rgba(59,37,6,0.6) 0%, transparent 70%),
          linear-gradient(135deg, #1C1208 0%, #2a1a0a 50%, #1a2010 100%)
        `,
      }}
    >
      {/* Noise texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.55,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Dot grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(196,136,42,0.18) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 1,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Gold particles */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: "50%",
              background: p.id % 2 === 0 ? "#C4882A" : "#3D6B3E",
              animation: `particleDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="os-container relative z-10 text-center flex flex-col items-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.45rem 1.25rem",
            borderRadius: "100px",
            background: "rgba(196,136,42,0.1)",
            border: "1px solid rgba(196,136,42,0.3)",
            color: "#C4882A",
            fontSize: "0.6rem",
            fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), monospace",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: "2rem",
            WebkitBackdropFilter: "blur(12px)",
            backdropFilter: "blur(12px)",
          }}
        >
          <i className="bi bi-stars" style={{ fontSize: "0.85rem" }} />
          Sustainable Pastoral Excellence — Kajiado, Kenya
          <i className="bi bi-stars" style={{ fontSize: "0.85rem" }} />
        </motion.div>

        {/* Hero headline */}
        <h1
          className="text-hero"
          style={{ color: "#FBF7F0", maxWidth: "900px", marginBottom: "0.5rem" }}
        >
          <WordReveal text="Pristine Livestock" />
          <br />
          <WordReveal
            text="& Artisanal Farm"
            className="italic"
          />
          {" "}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: "#C4882A", fontStyle: "normal" }}
          >
            Produce
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: "easeOut" }}
          style={{
            maxWidth: "560px",
            fontSize: "1rem",
            lineHeight: 1.8,
            fontWeight: 300,
            color: "rgba(245,239,228,0.65)",
            marginTop: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          Directly from Kenya&apos;s sun-drenched pastures to your table. Ethical breeding,
          100% grass-fed livestock, organic dairy, and raw honey harvested with centuries of pastoral heritage.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}
        >
          <Link href="/barn" className="btn-primary">
            <i className="bi bi-bag-check-fill" />
            Explore Farm Barn
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/breeds" className="btn-ghost">
            <i className="bi bi-heart-pulse-fill" />
            View Pedigree Breeds
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="anim-chevron"
          style={{ marginTop: "3.5rem", color: "rgba(196,136,42,0.5)" }}
          aria-hidden="true"
        >
          <i className="bi bi-chevron-down" style={{ fontSize: "1.4rem" }} />
        </motion.div>
      </div>

      {/* ── FLOATING STAT CARDS ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          paddingBottom: "0",
          marginTop: "3rem",
        }}
      >
        <div className="os-container">
          <div
            className="glass"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1px",
              borderRadius: "20px",
              overflow: "hidden",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            {floatingStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + i * 0.1, duration: 0.5 }}
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem",
                  background: "rgba(255,255,255,0.03)",
                  borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <i className={`bi ${stat.icon}`} style={{ fontSize: "1.4rem", color: stat.color, marginBottom: "0.25rem" }} />
                <div
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 300,
                    color: "#F5EFE4",
                    lineHeight: 1,
                  }}
                >
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), monospace",
                    fontSize: "0.58rem",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(245,239,228,0.45)",
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Terrain wave */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5 }}>
        <TerrainWave fillColor="#FBF7F0" />
      </div>
    </section>
  )
}
