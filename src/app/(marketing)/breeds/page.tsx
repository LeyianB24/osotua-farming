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
      {/* Header Banner with Rich Overlay */}
      <div className="relative bg-[#1C1208] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-2xl">
        <div className="absolute inset-0">
          <Image
            src={HERD_FIELD}
            alt="Our herd at pasture"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1208] via-[#1C1208]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208] via-transparent to-[#1C1208]/70" />
        </div>

        <div className="relative max-w-7xl mx-auto z-10">
          <div className="eyebrow text-[#C4882A] mb-4">
            Certified Purebred Livestock & Superior Genetics
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-light text-[#F5EFE4] mb-4 tracking-tight leading-tight">
            Premium breeds,<br />
            <em className="text-[#C4882A] not-italic font-normal">bred for Africa</em>
          </h1>
          <p className="text-[#F5EFE4]/80 max-w-xl leading-relaxed text-base">
            Every bull, cow, ram, and buck in our herd is rigorously selected for genetic superiority, tick & drought tolerance, rapid weight gain, and long-term commercial yield.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-mono text-[#F5EFE4]/70 border-t border-[#C4882A]/20 pt-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Veterinary Certified & Vaccinated
            </span>
            <span className="w-1 h-1 rounded-full bg-[#C4882A]" />
            <span>Movement Permits Coordinated</span>
            <span className="w-1 h-1 rounded-full bg-[#C4882A]" />
            <span>Kajiado Rangeland Adapted</span>
          </div>
        </div>
      </div>

      {/* Livestock showcase slideshow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-8 relative z-20 shadow-2xl rounded-md overflow-hidden">
        <Slideshow slides={LIVESTOCK_SLIDESHOW} heightClass="h-64 sm:h-80" interval={3500} />
      </div>

      {/* Interactive Breeds Client */}
      <BreedsClient initialBreeds={breeds} speciesList={species} />
    </div>
  )
}

