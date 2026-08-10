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

const speciesBgColors: Record<string, string> = {
  Cattle: "#2D1508",
  Goats:  "#0F2810",
  Sheep:  "#1A1510",
}

export default function BreedCard({ breed }: Props) {
  const src = breed.image ?? imageForBreed(breed.name, breed.species.name)
  const isAvailable = breed.inStock > 0
  const bgColor = speciesBgColors[breed.species.name] || "#1C1208"
  const icon = speciesIcons[breed.species.name] || "bi-geo-alt"

  return (
    <Link
      href={`/breeds/${breed.id}`}
      className="group block"
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(28,18,8,0.08)",
        borderRadius: "4px",
        overflow: "hidden",
        textDecoration: "none",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = "translateY(-6px)"
        el.style.boxShadow = "0 24px 64px rgba(28,18,8,0.12)"
        el.style.borderColor = "rgba(196,136,42,0.3)"
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = ""
        el.style.boxShadow = ""
        el.style.borderColor = "rgba(28,18,8,0.08)"
      }}
    >
      {/* Image hero */}
      <div className="relative overflow-hidden" style={{ height: "220px", background: bgColor }}>
        {src ? (
          <Image
            src={src}
            alt={breed.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            style={{ opacity: 0.85, transition: "transform 0.6s ease, opacity 0.3s ease" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <i className={`bi ${icon}`} style={{ fontSize: "4rem", color: "rgba(196,136,42,0.4)" }} />
          </div>
        )}

        {/* Gradient for legibility */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(28,18,8,0.85) 0%, rgba(28,18,8,0.1) 60%, transparent 100%)" }} />

        {/* Species tag — top left */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5"
          style={{
            background: "rgba(28,18,8,0.7)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#F5EFE4",
            fontSize: "0.58rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "0.3rem 0.7rem",
            borderRadius: "2px",
          }}
        >
          <i className={`bi ${icon}`} />
          {breed.species.name}
        </div>

        {/* Stock tag — top right */}
        <div
          className="absolute top-3 right-3"
          style={{
            background: isAvailable ? "rgba(61,107,62,0.85)" : "rgba(160,67,30,0.85)",
            backdropFilter: "blur(8px)",
            color: "#F5EFE4",
            fontSize: "0.56rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "0.3rem 0.65rem",
            borderRadius: "2px",
          }}
        >
          {isAvailable ? "Available" : "Waitlist"}
        </div>

        {/* Breed name overlaid on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div
            className="font-serif"
            style={{ fontSize: "1.5rem", fontWeight: 400, color: "#F5EFE4", lineHeight: 1.15 }}
          >
            {breed.name}
          </div>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "1.25rem" }}>
        {/* Tags row */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              background: "rgba(196,136,42,0.08)",
              border: "1px solid rgba(196,136,42,0.2)",
              color: "#C4882A",
              fontSize: "0.6rem", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.25rem 0.65rem", borderRadius: "2px",
            }}
          >
            <i className="bi bi-bullseye" style={{ fontSize: "0.7rem" }} />
            {breed.purpose}
          </span>
          <span
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              color: "rgba(28,18,8,0.45)",
              fontSize: "0.6rem", fontWeight: 500,
              letterSpacing: "0.08em",
            }}
          >
            <i className="bi bi-geo-alt" style={{ fontSize: "0.7rem" }} />
            {breed.origin}
          </span>
        </div>

        {/* Availability bar */}
        <div className="flex items-center gap-3 mb-4">
          <div style={{ flex: 1, height: "3px", background: "rgba(28,18,8,0.06)", borderRadius: "2px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                borderRadius: "2px",
                background: isAvailable ? "#3D6B3E" : "#A0431E",
                width: isAvailable ? `${Math.min((breed.inStock / 20) * 100, 100)}%` : "15%",
                transition: "width 0.6s ease",
              }}
            />
          </div>
          <span style={{ fontSize: "0.68rem", fontWeight: 600, color: isAvailable ? "#3D6B3E" : "#A0431E", whiteSpace: "nowrap" }}>
            {isAvailable ? `${breed.inStock} head` : "Waitlist"}
          </span>
        </div>

        {/* Price + CTA */}
        <div
          className="flex items-center justify-between"
          style={{ paddingTop: "1rem", borderTop: "1px solid rgba(28,18,8,0.06)" }}
        >
          <div>
            <div className="eyebrow-plain mb-0.5" style={{ color: "rgba(28,18,8,0.38)", fontSize: "0.54rem" }}>
              Price / Head
            </div>
            <div className="font-serif" style={{ fontSize: "1.4rem", fontWeight: 500, color: "#C4882A", lineHeight: 1 }}>
              KES {breed.pricePerHead.toLocaleString()}
            </div>
          </div>

          <div
            style={{
              background: "#1C1208",
              color: "#C4882A",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.55rem 1.1rem",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
          >
            View Breed
            <i className="bi bi-arrow-right" style={{ fontSize: "0.8rem" }} />
          </div>
        </div>
      </div>
    </Link>
  )
}
