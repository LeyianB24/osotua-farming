"use client";

import Link from "next/link";
import Image from "next/image";
import { imageForBreed } from "@/lib/images";
import type { BreedModalData } from "./BreedGeneticsModal";

interface Props {
  breed: BreedModalData;
}

export default function BreedCard({ breed }: Props) {
  const src = breed.image ?? imageForBreed(breed.name, breed.species.name);
  const categoryLabel = breed.species.name.toUpperCase().includes("BEEF")
    ? "BEEF CATTLE"
    : breed.species.name.toUpperCase().includes("DAIRY")
    ? "DAIRY CATTLE"
    : breed.species.name.toUpperCase().includes("GOAT")
    ? "PEDIGREE GOAT"
    : breed.species.name.toUpperCase().includes("SHEEP")
    ? "SAVANNA SHEEP"
    : `${breed.species.name.toUpperCase()} CATTLE`;

  return (
    <div
      className="os-card flex flex-col justify-between h-full bg-[#FFFFFF] border border-[#D4C9B0] transition-all duration-300 hover:border-[#C99A2E] hover-lift rounded-[2px] shadow-sm hover:shadow-xl group"
    >
      {/* ── IMAGE SECTION ── */}
      <div>
        <Link
          href={`/breeds/${breed.id}`}
          className="relative block aspect-[16/10] w-full overflow-hidden bg-[#1C1208]"
        >
          {src ? (
            <Image
              src={src}
              alt={breed.name}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#C4602A]/40">
              <i className="bi bi-award text-4xl" aria-hidden="true" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208]/60 via-transparent to-transparent" />

          {/* Top-left: Category Badge */}
          <div
            className="absolute top-3 left-3 text-white px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.14em] rounded-[2px] bg-[#6B7A3F]"
          >
            {categoryLabel}
          </div>

          {/* Top-right: Verification Badge */}
          <div
            className="absolute top-3 right-3 text-[#1C1208] px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.14em] rounded-[2px] bg-[#C99A2E]"
          >
            STUD VERIFIED
          </div>
        </Link>

        {/* ── DETAILS AREA ── */}
        <div className="p-7">
          <Link
            href={`/breeds/${breed.id}`}
            className="text-2xl font-bold text-[#1C1208] leading-tight block no-underline transition-colors hover:text-[#C4602A]"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            {breed.name}
          </Link>

          {/* Metadata Specs Table */}
          <div className="mt-5 space-y-2.5 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-[#E8E0D2]">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8E7E70]">
                HEAD COUNT
              </span>
              <span className="font-semibold text-[#1C1208]">
                {breed.inStock > 0 ? `${breed.inStock} head registered` : "Waitlist Available"}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#E8E0D2]">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8E7E70]">
                ORIGIN
              </span>
              <span className="font-semibold text-[#1C1208]">
                {breed.origin || "Kenya"}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#E8E0D2]">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8E7E70]">
                PURPOSE
              </span>
              <span className="font-semibold text-[#1C1208]">
                {breed.purpose || "Breeding & Beef"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ROW ── */}
      <div className="p-7 pt-0 flex justify-between items-center mt-auto border-t border-[#E8E0D2]/60 pt-5">
        <div className="flex items-baseline gap-1">
          <span
            className="text-2xl font-bold text-[#C4602A]"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            KES {breed.pricePerHead.toLocaleString()}
          </span>
          <span className="text-xs text-[#8E7E70] font-normal">
            /head
          </span>
        </div>

        <Link
          href={`/breeds/${breed.id}`}
          className="btn-outline-gold py-2 px-4 text-[11px] font-mono font-bold uppercase tracking-wider rounded-[2px] no-underline hover:bg-[#C99A2E] hover:text-[#1C1208] transition-colors"
        >
          ENQUIRE STUD
        </Link>
      </div>
    </div>
  );
}
