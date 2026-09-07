"use client"

import Image from "next/image"
import Link from "next/link"
import { LOGO } from "@/lib/images"

export interface BreedModalData {
  id: string
  name: string
  purpose: string
  origin: string
  image: string | null
  pricePerHead: number
  inStock: number
  species: { name: string }
}

interface Props {
  breed: BreedModalData | null
  onClose: () => void
}

export default function BreedGeneticsModal({ breed, onClose }: Props) {
  if (!breed) return null

  // Simulated precision genetic metrics
  const isCattle = breed.species.name.toLowerCase().includes("cattle")
  const isDairy = breed.purpose.toLowerCase().includes("dairy") || breed.name.toLowerCase().includes("sahiwal") || breed.name.toLowerCase().includes("friesian")

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="card-luxury p-8 sm:p-12 max-w-3xl w-full bg-white shadow-2xl relative my-8 border-amber-500/40">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close modal"
        >
          <i className="ti ti-x text-xl" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-6 border-b border-stone-200">
          <div className="relative w-28 h-28 rounded-3xl overflow-hidden shadow-lg border border-amber-900/15 shrink-0 bg-[#FAF6EE]">
            {breed.image ? (
              <Image src={breed.image} alt={breed.name} fill sizes="112px" className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-amber-600 text-3xl">
                <i className="ti ti-dna-2" />
              </div>
            )}
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-[#8E5E16] border border-amber-500/25">
                {breed.species.name}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-[#2E6B34] border border-emerald-500/25">
                {breed.inStock} Head In Stud Paddock
              </span>
            </div>

            <h3
              className="text-3xl sm:text-4xl font-light text-[#1C1208] m-0"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              {breed.name}
            </h3>

            <div className="flex items-center gap-4 text-xs font-mono text-[#786550] flex-wrap">
              <span>Origin: <strong className="text-[#1C1208]">{breed.origin}</strong></span>
              <span>&bull;</span>
              <span>Primary Purpose: <strong className="text-[#1C1208]">{breed.purpose}</strong></span>
            </div>
          </div>
        </div>

        {/* Genetics Metrics Radar Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4
              className="text-xl font-bold text-[#1C1208] m-0"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              Pedigree Genetics &amp; Performance Indexes
            </h4>
            <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#C4882A]">
              <div className="relative w-4 h-4 rounded-full overflow-hidden ring-1 ring-amber-400 shrink-0">
                <Image src={LOGO} alt="" fill sizes="16px" className="object-cover" />
              </div>
              <span>Kenya Stud Book Registered</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Metric 1 */}
            <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-amber-900/10 space-y-1">
              <span className="text-stone-400 font-mono text-[10px] uppercase font-bold">Drought &amp; Heat Tolerance</span>
              <div className="font-serif text-2xl font-bold text-[#C4882A]">9.8 / 10</div>
              <p className="text-[11px] text-stone-500">Adapted to harsh arid savanna climates with minimal forage decline.</p>
            </div>

            {/* Metric 2 */}
            <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-amber-900/10 space-y-1">
              <span className="text-stone-400 font-mono text-[10px] uppercase font-bold">
                {isDairy ? "Peak Daily Milk Yield" : "Average Daily Gain (ADG)"}
              </span>
              <div className="font-serif text-2xl font-bold text-[#2E6B34]">
                {isDairy ? "18 - 24 Liters / Day" : "1.2 - 1.6 kg / Day"}
              </div>
              <p className="text-[11px] text-stone-500">
                {isDairy ? "High butterfat content (4.5% - 5.2%) on pasture." : "Fast finishing weight on natural rangeland forage."}
              </p>
            </div>

            {/* Metric 3 */}
            <div className="p-5 rounded-2xl bg-[#FAF6EE] border border-amber-900/10 space-y-1">
              <span className="text-stone-400 font-mono text-[10px] uppercase font-bold">Tick &amp; Parasite Resistance</span>
              <div className="font-serif text-2xl font-bold text-[#0D6E67]">9.4 / 10</div>
              <p className="text-[11px] text-stone-500">High natural immunity reducing dipping frequency and veterinary costs.</p>
            </div>
          </div>

          {/* Pricing & Veterinary Certificate Box */}
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold uppercase text-[#8E5E16]">
                Pedigree Farm-Gate Valuation
              </div>
              <div className="font-serif text-3xl font-bold text-[#C4882A] mt-0.5">
                KES {breed.pricePerHead.toLocaleString()} <span className="text-xs font-mono text-[#5C4835]">/ head</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/254700000000?text=Hello%20Osotua%20Farming,%20I%20am%20interested%20in%20reserving%20${encodeURIComponent(breed.name)}%20livestock%20genetics.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                <i className="ti ti-brand-whatsapp text-base" />
                <span>Inquire via WhatsApp</span>
              </a>

              <Link
                href="/visit"
                className="flex-1 sm:flex-initial btn-primary py-3 px-6 text-xs tracking-wider justify-center"
              >
                <span>Book Stud Inspection</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
