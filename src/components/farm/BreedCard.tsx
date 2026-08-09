import Link from "next/link"
import Image from "next/image"

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
  return (
    <Link
      href={`/breeds/${breed.id}`}
      className="bg-white border border-[#1C1208]/08 rounded group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-hidden block"
    >
      <div className="h-44 bg-gradient-to-br from-[#3B2506] to-[#6b4010] flex items-center justify-center relative">
        {breed.image ? (
          <Image src={breed.image} alt={breed.name} fill className="object-cover" />
        ) : (
          <span className="text-5xl">
            {breed.species.name === "Cattle" ? "🐄" : breed.species.name === "Goats" ? "🐐" : "🐑"}
          </span>
        )}
        <span className="absolute top-3 right-3 font-mono text-[9px] text-white/70 bg-black/30 px-2 py-1 rounded-sm tracking-wide uppercase">
          {breed.species.name}
        </span>
        {breed.inStock === 0 && (
          <span className="absolute top-3 left-3 font-mono text-[9px] text-white bg-[#A0431E] px-2 py-1 rounded-sm tracking-wide uppercase">
            Sold Out
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="font-serif text-lg font-semibold text-[#1C1208] mb-1">{breed.name}</div>
        <div className="text-[#1C1208]/50 text-xs mb-3">{breed.purpose} · {breed.origin}</div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[#C4882A] text-sm">
            KES {breed.pricePerHead.toLocaleString()}
            <span className="text-[#1C1208]/40 font-normal text-xs"> /head</span>
          </span>
          <span className="font-mono text-[9px] text-[#3D6B3E] bg-[#3D6B3E]/08 border border-[#3D6B3E]/20 px-2 py-1 rounded-sm">
            {breed.inStock} available
          </span>
        </div>
      </div>
    </Link>
  )
}
