"use client";

import Image from "next/image";
import Link from "next/link";
import { LOGO } from "@/lib/images";

export interface BreedModalData {
  id: string;
  name: string;
  purpose: string;
  origin: string;
  image: string | null;
  pricePerHead: number;
  inStock: number;
  species: { name: string };
}

interface Props {
  breed: BreedModalData | null;
  onClose: () => void;
}

export default function BreedGeneticsModal({ breed, onClose }: Props) {
  if (!breed) return null;

  const isDairy =
    breed.purpose.toLowerCase().includes("dairy") ||
    breed.name.toLowerCase().includes("sahiwal") ||
    breed.name.toLowerCase().includes("friesian");

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="cell-dark p-8 sm:p-12 max-w-3xl w-full bg-[#1C1208] text-[#FBF7F0] shadow-2xl relative my-8 border border-[#C4882A]/40 rounded-3xl">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <i className="bi bi-x-lg text-lg" aria-hidden="true" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-6 border-b border-white/10">
          <div className="relative w-28 h-28 rounded-3xl overflow-hidden shadow-lg border border-[#C4882A]/30 shrink-0 bg-black/40">
            {breed.image ? (
              <Image src={breed.image} alt={breed.name} fill sizes="112px" className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#C4882A] text-3xl">
                <i className="bi bi-award" aria-hidden="true" />
              </div>
            )}
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#C4882A]/15 text-[#C4882A] border border-[#C4882A]/30">
                {breed.species.name}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                {breed.inStock} Head In Stud Paddock
              </span>
            </div>

            <h3
              className="text-3xl sm:text-4xl font-light text-[#FBF7F0] m-0"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              {breed.name}
            </h3>

            <div className="flex items-center gap-4 text-xs font-mono text-[#FBF7F0]/60 flex-wrap">
              <span>Origin: <strong className="text-[#C4882A]">{breed.origin}</strong></span>
              <span>&bull;</span>
              <span>Purpose: <strong className="text-[#FBF7F0]">{breed.purpose}</strong></span>
            </div>
          </div>
        </div>

        {/* Genetics Metrics Radar Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4
              className="text-xl font-light text-[#FBF7F0] m-0"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Pedigree Genetics &amp; Performance Indexes
            </h4>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#C4882A]">
              <div className="relative w-4 h-4 rounded-full overflow-hidden ring-1 ring-[#C4882A] shrink-0">
                <Image src={LOGO} alt="Osotua Stud Book Verified Seal" fill sizes="16px" className="object-cover" />
              </div>
              <span>Kenya Stud Book Registered</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Metric 1 */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[#FBF7F0]/50 font-mono text-[10px] uppercase font-bold">Drought Tolerance</span>
              <div className="font-serif text-2xl font-light text-[#C4882A]">9.8 / 10</div>
              <p className="text-[11px] text-[#FBF7F0]/60 m-0">Adapted to arid savanna rangeland with minimal forage decline.</p>
            </div>

            {/* Metric 2 */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[#FBF7F0]/50 font-mono text-[10px] uppercase font-bold">
                {isDairy ? "Peak Daily Yield" : "Average Daily Gain"}
              </span>
              <div className="font-serif text-2xl font-light text-emerald-400">
                {isDairy ? "18 - 24 Liters / Day" : "1.2 - 1.6 kg / Day"}
              </div>
              <p className="text-[11px] text-[#FBF7F0]/60 m-0">
                {isDairy ? "High butterfat A2 milk on natural forage." : "Fast finishing weight on natural rangeland forage."}
              </p>
            </div>

            {/* Metric 3 */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[#FBF7F0]/50 font-mono text-[10px] uppercase font-bold">Tick &amp; Parasite Resistance</span>
              <div className="font-serif text-2xl font-light text-[#C4882A]">9.4 / 10</div>
              <p className="text-[11px] text-[#FBF7F0]/60 m-0">High natural immunity reducing dipping frequency and vet interventions.</p>
            </div>
          </div>

          {/* Pricing & Reservation Box */}
          <div className="p-6 rounded-2xl bg-[#2E1C08] border border-[#C4882A]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold uppercase text-[#C4882A]">
                Pedigree Farm-Gate Valuation
              </div>
              <div className="font-serif text-3xl font-light text-[#FBF7F0] mt-0.5">
                KES {breed.pricePerHead.toLocaleString()} <span className="text-xs font-mono text-[#FBF7F0]/60">/ head</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/254755758208?text=Hello%20Osotua%20Farming,%20I%20am%20interested%20in%20reserving%20${encodeURIComponent(breed.name)}%20livestock%20genetics.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md no-underline"
              >
                <i className="bi bi-whatsapp text-base" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>

              <Link
                href="/visit"
                className="flex-1 sm:flex-initial btn-primary py-3 px-6 text-xs tracking-wider justify-center"
              >
                <span>Book Inspection</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
