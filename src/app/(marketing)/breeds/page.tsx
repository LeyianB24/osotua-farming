import { prisma } from "@/lib/prisma"
import Image from "next/image"
import BreedCard from "@/components/farm/BreedCard"
import Slideshow from "@/components/shared/Slideshow"
import { HERD_FIELD, LIVESTOCK_SLIDESHOW } from "@/lib/images"

export const metadata = { title: "Our Breeds — Osotua Farming" }

async function getBreeds() {
  return prisma.breed.findMany({
    include: { species: true },
    orderBy: { species: { name: "asc" } },
  })
}

async function getSpecies() {
  return prisma.species.findMany({ orderBy: { name: "asc" } })
}

export default async function BreedsPage() {
  const [breeds, species] = await Promise.all([getBreeds(), getSpecies()])

  const grouped = species.map((s) => ({
    ...s,
    breeds: breeds.filter((b) => b.speciesId === s.id),
  }))

  return (
    <div className="bg-[#FBF7F0] pt-24">
      {/* Header */}
      <div className="relative bg-[#1C1208] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={HERD_FIELD}
            alt="Our herd at pasture"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1208]/85 via-[#1C1208]/70 to-[#1C1208]/95" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#C4882A]" />
            Our Livestock
          </div>
          <h1 className="font-serif text-5xl font-light text-[#F5EFE4] mb-4">
            Premium breeds,{" "}
            <em className="text-[#C4882A]">bred for Africa</em>
          </h1>
          <p className="text-[#F5EFE4]/70 max-w-xl leading-relaxed">
            Every animal is selected for genetic superiority, climate resilience, and commercial value. Browse our catalogue and place an order or reservation.
          </p>
        </div>
      </div>

      {/* Livestock showcase slideshow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-12 relative z-10">
        <Slideshow slides={LIVESTOCK_SLIDESHOW} heightClass="h-64 sm:h-72" interval={3000} />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {grouped.map((group) => (
          group.breeds.length > 0 && (
            <div key={group.id} className="mb-16">
              <h2 className="font-serif text-2xl text-[#1C1208] mb-2">{group.name}</h2>
              <p className="text-[#1C1208]/50 text-sm mb-8">{group.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {group.breeds.map((breed) => (
                  <BreedCard key={breed.id} breed={breed} />
                ))}
              </div>
            </div>
          )
        ))}

        {breeds.length === 0 && (
          <div className="text-center py-24 text-[#1C1208]/40">
            <div className="text-5xl mb-4">🐄</div>
            <p className="font-serif text-xl">Breeds coming soon.</p>
            <p className="text-sm mt-2">Check back shortly or contact us for current availability.</p>
          </div>
        )}
      </div>
    </div>
  )
}
