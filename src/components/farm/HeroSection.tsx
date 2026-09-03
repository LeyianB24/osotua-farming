"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import TerrainWave from "@/components/shared/TerrainWave"
import CountUp from "@/components/shared/CountUp"
import { HERD_FIELD } from "@/lib/images"

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
  { icon: "bi-people-fill",      value: 4800,  suffix: "+",    label: "Head of Livestock",  color: "#2E7D32" },
  { icon: "bi-graph-up",         value: 180,   suffix: "+",    label: "Partner Families",   color: "#C4882A" },
  { icon: "bi-patch-check-fill", value: 450,   suffix: "t+",   label: "Organic Yield / yr", color: "#2E7D32" },
]

// Gold & Emerald floating particles
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
      style={{ background: "#FBF7F0" }}
    >
      {/* ── 1. AUTHENTIC RANCH FARM BACKGROUND LAYER ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src={HERD_FIELD}
          alt="Osotua Pastoral Farm & Cattle Herds at Pasture"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-100"
          style={{ opacity: 0.78 }}
        />
        {/* Cinematic warm pastoral rangeland overlays */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 30%, rgba(196,136,42,0.2) 0%, transparent 65%),
              linear-gradient(180deg, rgba(28,18,8,0.65) 0%, rgba(28,18,8,0.4) 40%, rgba(28,18,8,0.75) 85%, #FBF7F0 100%)
            `,
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.45,
          pointerEvents: "none",
          zIndex: 1,
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
          zIndex: 1,
        }}
      />

      {/* Gold particles */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
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
            background: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(196, 136, 42, 0.4)",
            color: "#E59A24",
            fontSize: "0.6rem",
            fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), monospace",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: "2rem",
            WebkitBackdropFilter: "blur(16px)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}
        >
          <i className="bi bi-stars" style={{ fontSize: "0.85rem" }} />
          Sustainable Pastoral Excellence — Kajiado, Kenya
          <i className="bi bi-stars" style={{ fontSize: "0.85rem" }} />
        </motion.div>

        {/* Hero headline */}
        <h1
          className="text-hero"
          style={{ color: "#FFFEFA", maxWidth: "900px", marginBottom: "0.5rem", textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
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
            style={{ color: "#D99A30", fontStyle: "normal" }}
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
            color: "rgba(255, 253, 248, 0.85)",
            marginTop: "1.5rem",
            marginBottom: "2.5rem",
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
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
            <i className="bi bi-arrow-right" />
          </Link>
          <Link href="/breeds" className="btn-ghost" style={{ background: "rgba(255, 255, 255, 0.1)", borderColor: "rgba(255, 255, 255, 0.3)", color: "#FFFEFA" }}>
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
          style={{ marginTop: "3.5rem", color: "rgba(196,136,42,0.8)" }}
          aria-hidden="true"
        >
          <i className="bi bi-chevron-down" style={{ fontSize: "1.4rem" }} />
        </motion.div>
      </div>

      {/* ── FLOATING STAT CARDS (Refreshed in radiant cream glass) ── */}
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
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1px",
              borderRadius: "24px",
              overflow: "hidden",
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(251, 247, 240, 0.98) 100%)",
              border: "1px solid rgba(196,136,42,0.3)",
              boxShadow: "0 24px 60px rgba(196,136,42,0.12), inset 0 1px 0 rgba(255,255,255,1)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {floatingStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + i * 0.1, duration: 0.5 }}
                style={{
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem",
                  background: "rgba(255, 255, 255, 0.6)",
                  borderBottom: i < 2 ? "1px solid rgba(196,136,42,0.15)" : "none",
                  borderRight: i % 2 === 0 ? "1px solid rgba(196,136,42,0.15)" : "none",
                }}
              >
                <i className={`bi ${stat.icon}`} style={{ fontSize: "1.4rem", color: stat.color, marginBottom: "0.25rem" }} />
                <div
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "2.2rem",
                    fontWeight: 400,
                    color: "#1C1208",
                    lineHeight: 1,
                  }}
                >
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), monospace",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#786550",
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
