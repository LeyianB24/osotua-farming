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
  Goats: "bi-scissors",
  Sheep: "bi-flower1",
}

export default function BreedCard({ breed }: Props) {
  const src = breed.image ?? imageForBreed(breed.name, breed.species.name)
  const isAvailable = breed.inStock > 0
  const icon = speciesIcons[breed.species.name] || "bi-geo-alt"

  return (
    <Link
      href={`/breeds/${breed.id}`}
      className="group block no-underline h-full"
    >
      <div className="bg-[#FFFFFF] border border-[#C4882A]/25 hover:border-[#C4882A] rounded-3xl p-5 shadow-lg shadow-[#1C1208]/04 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full">
        
        {/* ── IMAGE CONTAINER ── */}
        <div>
          <div className="relative w-full h-56 rounded-2xl bg-[#FAF5EB] border border-[#C4882A]/15 overflow-hidden mb-4">
            {src ? (
              <Image
                src={src}
                alt={breed.name}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover group-hover:scale-108 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#C4882A]/40">
                <i className={`bi ${icon} text-5xl`} />
              </div>
            )}

            {/* Gradient shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Species tag — Top Left */}
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#1C1208]/80 text-[#FFFFFF] backdrop-blur-md border border-white/20 shadow-xs">
              <i className={`bi ${icon} text-[#D99A30]`} />
              <span>{breed.species.name}</span>
            </div>

            {/* Stock pill — Top Right */}
            <div
              className={`absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border shadow-xs ${
                isAvailable
                  ? "bg-[#2E7D32]/90 text-white border-green-400/40"
                  : "bg-red-800/90 text-white border-red-400/40"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isAvailable ? "bg-[#86efac]" : "bg-red-300"}`} />
              <span>{isAvailable ? `${breed.inStock} Head` : "Waitlist"}</span>
            </div>

            {/* Origin label at bottom */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono drop-shadow-sm">
              <span className="flex items-center gap-1 truncate font-medium">
                <i className="bi bi-geo-alt-fill text-[#D99A30]" />
                {breed.origin}
              </span>
            </div>
          </div>

          {/* Title & Purpose */}
          <div className="space-y-1.5 mb-4">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest bg-[#C4882A]/12 text-[#8E5E16] border border-[#C4882A]/30">
              {breed.purpose}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "1.45rem",
                fontWeight: 500,
                lineHeight: 1.2,
                color: "#1C1208",
              }}
              className="group-hover:text-[#C4882A] transition-colors truncate"
            >
              {breed.name}
            </h3>
          </div>
        </div>

        {/* ── CARD FOOTER: PRICE & CTA ── */}
        <div className="pt-4 border-t border-[#C4882A]/15 mt-2 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono text-[#786550] uppercase block">Price per Head</span>
            <span className="font-mono text-base sm:text-lg font-bold text-[#1C1208]">
              KES {breed.pricePerHead.toLocaleString()}
            </span>
          </div>

          <span className="btn-primary py-2 px-3.5 text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1 group-hover:bg-[#8E5E16] transition-colors shrink-0">
            <span>View</span>
            <i className="bi bi-arrow-right" />
          </span>
        </div>

      </div>
    </Link>
  )
}
