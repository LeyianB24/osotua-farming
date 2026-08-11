"use client"

import Link from "next/link"
import Image from "next/image"
import { imageForBreed } from "@/lib/images"

interface Props {
  breed: {
    id: string
    name: string
    purpose: string
    origin: string
    image: string | null
    pricePerHead: number
    inStock: number
    species: { name: string }
  }
}

const speciesIcons: Record<string, string> = {
  Cattle: "bi-bullseye",
  Goats:  "bi-scissors",
  Sheep:  "bi-flower1",
}

const speciesBg: Record<string, string> = {
  Cattle: "radial-gradient(ellipse at 40% 30%, rgba(196,136,42,0.3) 0%, rgba(45,21,8,0.9) 60%, #1C1208 100%)",
  Goats:  "radial-gradient(ellipse at 40% 30%, rgba(61,107,62,0.3) 0%, rgba(15,40,16,0.9) 60%, #111f12 100%)",
  Sheep:  "radial-gradient(ellipse at 40% 30%, rgba(160,67,30,0.25) 0%, rgba(35,20,8,0.9) 60%, #1C1208 100%)",
}

export default function BreedCard({ breed }: Props) {
  const src = breed.image ?? imageForBreed(breed.name, breed.species.name)
  const isAvailable = breed.inStock > 0
  const bg = speciesBg[breed.species.name] || speciesBg.Cattle
  const icon = speciesIcons[breed.species.name] || "bi-geo-alt"

  return (
    <Link
      href={`/breeds/${breed.id}`}
      className="group block no-underline"
      style={{ borderRadius: "20px", overflow: "hidden", textDecoration: "none" }}
    >
      <div
        className="glass"
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.3s ease",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement
          el.style.transform = "translateY(-10px) scale(1.01)"
          el.style.boxShadow = "0 32px 80px rgba(28,18,8,0.35), 0 0 0 1px rgba(196,136,42,0.35), inset 0 1px 0 rgba(255,255,255,0.12)"
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement
          el.style.transform = ""
          el.style.boxShadow = ""
        }}
      >
        {/* ── IMAGE HERO ── */}
        <div
          className="relative overflow-hidden"
          style={{ height: "240px", background: bg, flexShrink: 0 }}
        >
          {src ? (
            <Image
              src={src}
              alt={breed.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              style={{ opacity: 0.75, mixBlendMode: "luminosity" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <i className={`bi ${icon}`} style={{ fontSize: "5rem", color: "rgba(196,136,42,0.3)" }} />
            </div>
          )}

          {/* Image gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(0deg, rgba(28,18,8,0.92) 0%, rgba(28,18,8,0.3) 50%, transparent 100%)",
            }}
          />

          {/* Species tag — top left */}
          <div
            className="glass absolute top-3 left-3"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.3rem 0.75rem",
              borderRadius: "100px",
              fontSize: "0.58rem",
              fontFamily: "var(--font-space-grotesk), monospace",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#F5EFE4",
            }}
          >
            <i className={`bi ${icon}`} />
            {breed.species.name}
          </div>

          {/* Availability — top right */}
          <div
            style={{
              position: "absolute",
              top: "0.75rem",
              right: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.3rem 0.7rem",
              borderRadius: "100px",
              background: isAvailable ? "rgba(61,107,62,0.8)" : "rgba(160,67,30,0.8)",
              border: `1px solid ${isAvailable ? "rgba(61,107,62,0.6)" : "rgba(160,67,30,0.5)"}`,
              WebkitBackdropFilter: "blur(8px)",
              backdropFilter: "blur(8px)",
              fontSize: "0.55rem",
              fontFamily: "var(--font-space-grotesk), monospace",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#F5EFE4",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: isAvailable ? "#86efac" : "#fca5a5",
                animation: isAvailable ? "whatsappRing 2s ease-out infinite" : "none",
                display: "inline-block",
              }}
            />
            {isAvailable ? "Available" : "Waitlist"}
          </div>

          {/* Breed name overlaid */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem 1.25rem 1rem" }}>
            <div
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "1.75rem",
                fontWeight: 300,
                color: "#F5EFE4",
                lineHeight: 1.1,
              }}
            >
              {breed.name}
            </div>
          </div>
        </div>

        {/* ── CARD BODY ── */}
        <div
          style={{
            padding: "1.25rem",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          {/* Tags */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                background: "rgba(196,136,42,0.12)",
                border: "1px solid rgba(196,136,42,0.25)",
                color: "#C4882A",
                fontSize: "0.6rem",
                fontFamily: "var(--font-space-grotesk), monospace",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.25rem 0.65rem",
                borderRadius: "100px",
              }}
            >
              <i className="bi bi-bullseye" style={{ fontSize: "0.7rem" }} />
              {breed.purpose}
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "rgba(245,239,228,0.45)",
                fontSize: "0.6rem",
                fontFamily: "var(--font-space-grotesk), monospace",
                fontWeight: 500,
                letterSpacing: "0.08em",
              }}
            >
              <i className="bi bi-geo-alt" style={{ fontSize: "0.7rem" }} />
              {breed.origin}
            </span>
          </div>

          {/* Availability bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ flex: 1, height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  borderRadius: "2px",
                  background: isAvailable
                    ? "linear-gradient(90deg, #3D6B3E, #5a9e5c)"
                    : "linear-gradient(90deg, #A0431E, #c55f3a)",
                  width: isAvailable ? `${Math.min((breed.inStock / 20) * 100, 100)}%` : "15%",
                  transition: "width 0.6s ease",
                }}
              />
            </div>
            <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-space-grotesk), monospace", fontWeight: 600, color: isAvailable ? "#5a9e5c" : "#c55f3a", whiteSpace: "nowrap" }}>
              {isAvailable ? `${breed.inStock} head` : "Waitlist"}
            </span>
          </div>

          {/* Price + CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "0.75rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              marginTop: "auto",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-space-grotesk), monospace",
                  fontSize: "0.52rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(245,239,228,0.3)",
                  marginBottom: "0.2rem",
                }}
              >
                Price / Head
              </div>
              <div
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "1.6rem",
                  fontWeight: 500,
                  color: "#C4882A",
                  lineHeight: 1,
                }}
              >
                KES {breed.pricePerHead.toLocaleString()}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.55rem 1.1rem",
                borderRadius: "100px",
                background: "rgba(196,136,42,0.12)",
                border: "1px solid rgba(196,136,42,0.25)",
                color: "#C4882A",
                fontSize: "0.65rem",
                fontFamily: "var(--font-space-grotesk), monospace",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "all 0.25s ease",
              }}
              className="group-hover:bg-[#C4882A] group-hover:text-[#1C1208]"
            >
              View
              <i className="bi bi-arrow-right" style={{ fontSize: "0.8rem", transition: "transform 0.2s ease" }} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
