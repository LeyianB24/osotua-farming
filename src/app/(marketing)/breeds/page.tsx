import { prisma } from "@/lib/prisma"
import Image from "next/image"
import BreedsClient from "@/components/farm/BreedsClient"
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

  return (
    <div className="bg-[#FBF7F0] pt-20">
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
            Our Livestock Catalogue
          </div>
          <h1 className="font-serif text-5xl font-light text-[#F5EFE4] mb-4">
            Premium breeds,{" "}
            <em className="text-[#C4882A]">bred for Africa</em>
          </h1>
          <p className="text-[#F5EFE4]/70 max-w-xl leading-relaxed">
            Every animal is selected for genetic superiority, climate resilience, and commercial value. Filter by species, inspect traits, and place a direct reservation.
          </p>
        </div>
      </div>

      {/* Livestock showcase slideshow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-6 relative z-10">
        <Slideshow slides={LIVESTOCK_SLIDESHOW} heightClass="h-64 sm:h-72" interval={3000} />
      </div>

      {/* Interactive Breeds Client */}
      <BreedsClient initialBreeds={breeds} speciesList={species} />
    </div>
  )
}

