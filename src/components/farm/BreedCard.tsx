"use client";

import Link from "next/link";
import Image from "next/image";
import { imageForBreed } from "@/lib/images";
import type { BreedModalData } from "./BreedGeneticsModal";

interface Props {
  breed: BreedModalData;
  onInspectGenetics?: (breed: BreedModalData) => void;
}

export default function BreedCard({ breed, onInspectGenetics }: Props) {
  const src = breed.image ?? imageForBreed(breed.name, breed.species.name);
  const isAvailable = breed.inStock > 0;

  return (
    <div className="bento-cell cell-dark rounded-3xl overflow-hidden border border-[#C4882A]/20 flex flex-col justify-between h-full bg-[#2E1C08]/90 hover:border-[#C4882A] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300">
      
      {/* ── IMAGE SECTION ── */}
      <div>
        <Link
          href={`/breeds/${breed.id}`}
          className="relative block h-60 sm:h-68 w-full bg-[#1C1208] overflow-hidden group"
        >
          {src ? (
            <Image
              src={src}
              alt={breed.name}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#C4882A]/40">
              <i className="bi bi-award text-4xl" aria-hidden="true" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E1C08] via-transparent to-transparent opacity-80" />

          {/* Top-left: Category Badge */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#FBF7F0] px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border border-white/10">
            {breed.species.name}
          </div>

          {/* Top-right: Stock Status */}
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-white ${
              isAvailable
                ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-300"
                : "bg-red-950/80 border border-red-500/40 text-red-300"
            }`}
          >
            {isAvailable ? `${breed.inStock} Head Available` : "Waitlist"}
          </div>
        </Link>

        {/* ── DETAILS AREA ── */}
        <div className="p-6 sm:p-7 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#C4882A]">
            <span>{breed.purpose || breed.species.name}</span>
            <span className="text-white/30">&bull;</span>
            <span className="text-[#FBF7F0]/60 flex items-center gap-1">
              <i className="bi bi-geo-alt-fill text-[#C4882A] text-xs" aria-hidden="true" />
              {breed.origin}
            </span>
          </div>

          <Link
            href={`/breeds/${breed.id}`}
            className="font-serif text-2xl sm:text-3xl font-light text-[#FBF7F0] leading-snug group-hover:text-[#C4882A] transition-colors m-0 block no-underline"
          >
            {breed.name}
          </Link>
        </div>
      </div>

      {/* ── FOOTER ROW ── */}
      <div className="p-6 sm:p-7 pt-4 flex justify-between items-center border-t border-white/10 mt-auto">
        <div>
          <div className="t-label text-[9px] text-[#FBF7F0]/50">
            Price Per Head
          </div>
          <div className="font-serif text-xl sm:text-2xl text-[#FBF7F0] font-light mt-0.5">
            KES {breed.pricePerHead.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onInspectGenetics && (
            <button
              type="button"
              onClick={() => onInspectGenetics(breed)}
              className="text-xs font-mono font-semibold py-2 px-3 rounded-full tracking-wider uppercase transition-all duration-200 bg-white/10 text-[#FBF7F0] hover:bg-[#C4882A] hover:text-[#1C1208] border border-white/15"
              aria-label={`Inspect DNA genetics for ${breed.name}`}
            >
              <i className="bi bi-dna" aria-hidden="true" />
            </button>
          )}

          <Link
            href={`/breeds/${breed.id}`}
            className="text-xs font-mono font-semibold py-2 px-4 rounded-full tracking-wider uppercase transition-all duration-200 bg-[#C4882A] text-[#1C1208] hover:bg-[#D99A30] flex items-center gap-1.5 shadow-md no-underline"
          >
            <span>View</span>
            <i className="bi bi-arrow-right text-xs" aria-hidden="true" />
          </Link>
        </div>
      </div>

    </div>
  );
}
