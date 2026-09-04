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

export default function BreedCard({ breed }: Props) {
  const src = breed.image ?? imageForBreed(breed.name, breed.species.name)
  const isAvailable = breed.inStock > 0

  return (
    <Link
      href={`/breeds/${breed.id}`}
      className="group block no-underline h-full"
    >
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "14px",
          border: "1px solid #EDE6D6",
        }}
        className="overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full"
      >
        {/* ── IMAGE WITH BADGES ── */}
        <div>
          <div className="relative h-44 w-full bg-stone-200 overflow-hidden">
            {src ? (
              <Image
                src={src}
                alt={breed.name}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-400">
                <i className="bi bi-bullseye text-4xl" />
              </div>
            )}

            {/* Top-left: Category pill */}
            <div className="absolute top-2 left-2 bg-[#14100A]/70 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
              {breed.species.name}
            </div>

            {/* Top-right: Status pill */}
            <div
              className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider text-white ${
                isAvailable ? "bg-[#3F6B3F]" : "bg-red-800"
              }`}
            >
              {isAvailable ? `${breed.inStock} HEAD` : "WAITLIST"}
            </div>

            {/* Bottom-left: Origin pill */}
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white font-medium uppercase tracking-wider flex items-center gap-1 drop-shadow-md bg-[#14100A]/60 backdrop-blur-xs px-2 py-0.5 rounded max-w-[85%] truncate">
              <i className="bi bi-geo-alt-fill text-[#C4922E]" />
              <span className="truncate">{breed.origin}</span>
            </div>
          </div>

          {/* ── CONTENT AREA ── */}
          <div className="p-3.5 pb-1">
            <div
              style={{
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "9px",
                color: "#C4922E",
                fontWeight: 700,
              }}
            >
              {breed.purpose || breed.species.name}
            </div>
            <div
              style={{
                fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                fontSize: "17px",
                margin: "2px 0 6px",
                color: "#211C15",
                lineHeight: 1.2,
              }}
              className="truncate group-hover:text-[#C4922E] transition-colors"
            >
              {breed.name}
            </div>
          </div>
        </div>

        {/* ── FOOTER ROW ── */}
        <div className="p-3.5 pt-0 flex justify-between items-center border-t border-stone-100 mt-3">
          <div>
            <div
              style={{
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontSize: "8px",
                color: "#6B6558",
                fontWeight: 600,
              }}
            >
              PRICE PER HEAD
            </div>
            <div
              style={{
                fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
                fontSize: "16px",
                color: "#211C15",
                fontWeight: 600,
              }}
            >
              KES {breed.pricePerHead.toLocaleString()}
            </div>
          </div>

          <span
            style={{
              background: "#211C15",
              color: "#FFFFFF",
              fontSize: "9px",
              padding: "6px 12px",
              borderRadius: "6px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
            className="group-hover:bg-[#C4922E] transition-colors shrink-0"
          >
            VIEW →
          </span>
        </div>

      </div>
    </Link>
  )
}
