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

      {/* ── FLOATING STAT CARDS (4 Spacious, Airy Floating White Cards) ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          paddingBottom: "1.5rem",
          marginTop: "3.5rem",
        }}
      >
        <div className="os-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {floatingStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-[24px] p-7 sm:p-8 border border-[#EDE6D6] shadow-[0_12px_32px_rgba(33,28,21,0.05)] hover:shadow-[0_16px_40px_rgba(33,28,21,0.08)] transition-all flex flex-col justify-between"
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
                    className="text-[10.5px] font-bold tracking-[0.12em] uppercase mt-3"
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
        </div>
      </motion.div>

      {/* Terrain wave */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5 }}>
        <TerrainWave fillColor="#FBF7F0" />
      </div>
    </section>
  )
}
