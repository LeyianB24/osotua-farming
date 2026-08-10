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
      className="group bg-white border border-[#1C1208]/08 hover:border-[#C4882A]/50 rounded-md overflow-hidden block store-card-shadow hover:-translate-y-1.5 transition-all duration-300"
    >
      <div className="h-52 bg-gradient-to-br from-[#1C1208] via-[#3B2506] to-[#6b4010] flex items-center justify-center relative overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={breed.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-108"
          />
        ) : (
          <span className="text-6xl">
            {breed.species.name === "Cattle" ? "🐄" : breed.species.name === "Goats" ? "🐐" : "🐑"}
          </span>
        )}

        {/* Gradient shadow overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208]/85 via-transparent to-[#1C1208]/40" />

        {/* Species badge */}
        <span className="absolute top-3 right-3 font-mono text-[9px] font-bold text-[#F5EFE4] bg-[#1C1208]/75 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-white/10 tracking-widest uppercase">
          {breed.species.name}
        </span>

        {/* Status badge */}
        {!isAvailable ? (
          <span className="absolute top-3 left-3 font-mono text-[9px] font-bold text-white bg-[#A0431E] px-2.5 py-1 rounded-xs tracking-widest uppercase shadow-md">
            Sold Out
          </span>
        ) : (
          <span className="absolute top-3 left-3 font-mono text-[9px] font-semibold text-[#F5EFE4] bg-[#3D6B3E]/85 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-emerald-400/30 tracking-widest uppercase">
            Purebred Stock
          </span>
        )}

        {/* Bottom title on image overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-serif text-2xl font-light text-[#F5EFE4] group-hover:text-[#C4882A] transition-colors leading-tight">
            {breed.name}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between text-xs text-[#1C1208]/60 mb-4 pb-3 border-b border-[#1C1208]/06">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#C4882A] font-semibold">
            {breed.purpose}
          </span>
          <span className="text-[11px]">
            Origin: <strong className="text-[#1C1208]/80 font-medium">{breed.origin}</strong>
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#1C1208]/40 block -mb-0.5">Price</span>
            <span className="font-bold text-[#C4882A] text-base">
              KES {breed.pricePerHead.toLocaleString()}
              <span className="text-[#1C1208]/40 font-normal text-xs"> /head</span>
            </span>
          </div>

          <span
            className={`font-mono text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-xs border ${
              isAvailable
                ? "text-[#3D6B3E] bg-[#3D6B3E]/08 border-[#3D6B3E]/20"
                : "text-[#A0431E] bg-[#A0431E]/08 border-[#A0431E]/20"
            }`}
          >
            {isAvailable ? `${breed.inStock} Available` : "Waitlist Only"}
          </span>
        </div>
      </div>
    </Link>
  )
}
