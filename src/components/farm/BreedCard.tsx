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
  onInspectGenetics?: (breed: any) => void
}

export default function BreedCard({ breed, onInspectGenetics }: Props) {
  const src = breed.image ?? imageForBreed(breed.name, breed.species.name)
  const isAvailable = breed.inStock > 0


  return (
    <Link
      href={`/breeds/${breed.id}`}
      className="group block no-underline h-full"
    >
      <div
        className="bg-white rounded-3xl border border-[#EDE6D6] overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-500/35 transition-all duration-500 flex flex-col justify-between h-full"
      >
        {/* ── IMAGE WITH MINIMALIST LUXURY BADGES ── */}
        <div>
          <div className="relative h-60 sm:h-68 w-full bg-stone-100 overflow-hidden">
            {src ? (
              <Image
                src={src}
                alt={breed.name}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-400">
                <i className="bi bi-bullseye text-4xl" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Top-left: Category */}
            <div className="absolute top-4 left-4 bg-[#14100A]/80 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/15 shadow-sm">
              {breed.species.name}
            </div>

            {/* Top-right: Stock Pill */}
            <div
              className={`absolute top-4 right-4 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${
                isAvailable ? "bg-[#2E6B34]/95 backdrop-blur-md" : "bg-red-800/90 backdrop-blur-md"
              }`}
            >
              {isAvailable ? `${breed.inStock} Head Available` : "Waitlist"}
            </div>
          </div>

          {/* ── CONTENT AREA WITH GENEROUS AIR ── */}
          <div className="p-7 pb-3 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider text-[#8E5E16]">
              <span>{breed.purpose || breed.species.name}</span>
              <span className="text-stone-400 font-normal">&bull;</span>
              <span className="text-[#6B6558] flex items-center gap-1">
                <i className="bi bi-geo-alt-fill text-amber-500 text-xs" />
                {breed.origin}
              </span>
            </div>

            <h3
              className="text-2xl font-normal text-[#1C1208] leading-tight group-hover:text-[#C4882A] transition-colors m-0"
              style={{
                fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
              }}
            >
              {breed.name}
            </h3>
          </div>
        </div>

        {/* ── FOOTER ROW ── */}
        <div className="p-7 pt-4 flex justify-between items-center border-t border-stone-100 mt-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C8475]">
              PRICE PER HEAD
            </div>
            <div
              className="text-xl font-bold text-[#1C1208] mt-0.5"
              style={{
                fontFamily: "var(--font-fraunces, 'Fraunces'), serif",
              }}
            >
              KES {breed.pricePerHead.toLocaleString()}
            </div>
          </div>

          <span
            className="text-[11px] font-bold py-2.5 px-5 rounded-xl tracking-wider uppercase transition-all duration-300 bg-[#1C1208] group-hover:bg-[#C4882A] text-white group-hover:text-[#1C1208] shadow-xs shrink-0"
          >
            VIEW BREED →
          </span>
        </div>

      </div>
    </Link>
  )
}
