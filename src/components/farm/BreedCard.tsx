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
      className="group block bg-white border border-black/8 rounded overflow-hidden no-underline transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(28,18,8,0.12)] hover:border-[#C4882A]/40"
    >
      {/* Image hero */}
      <div className="relative overflow-hidden h-[220px]" style={{ background: bgColor }}>
        {src ? (
          <Image
            src={src}
            alt={breed.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
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
            className="font-serif text-2xl font-light text-[#F5EFE4] leading-tight"
          >
            {breed.name}
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
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
            <i className="bi bi-bullseye text-[0.7rem]" />
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
            <i className="bi bi-geo-alt text-[0.7rem]" />
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
          className="flex items-center justify-between pt-4 border-t border-black/6"
        >
          <div>
            <div className="eyebrow-plain mb-0.5 text-[#1C1208]/40" style={{ fontSize: "0.54rem" }}>
              Price / Head
            </div>
            <div className="font-serif text-2xl font-medium text-[#C4882A] leading-none">
              KES {breed.pricePerHead.toLocaleString()}
            </div>
          </div>

          <div
            className="bg-[#1C1208] text-[#C4882A] text-[0.65rem] font-bold uppercase tracking-wider px-3.5 py-2 rounded flex items-center gap-1.5 transition-colors group-hover:bg-[#C4882A] group-hover:text-[#1C1208]"
          >
            View Breed
            <i className="bi bi-arrow-right text-[0.8rem]" />
          </div>
        </div>
      </div>
    </Link>
  )
}
