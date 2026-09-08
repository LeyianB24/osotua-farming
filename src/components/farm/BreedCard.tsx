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
      className="os-card flex flex-col justify-between h-full bg-[#FAF7F2] border border-[#D4C9B0] transition-all duration-300 hover:shadow-xl group"
      style={{ borderRadius: "2px" }}
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

          {/* Top-left: Category Badge (Olive Green fill) */}
          <div
            className="absolute top-3 left-3 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
            style={{ backgroundColor: "#6B7A3F", borderRadius: "2px" }}
          >
            {categoryLabel}
          </div>
        </Link>

        {/* ── DETAILS AREA ── */}
        <div className="os-card-body">
          <Link
            href={`/breeds/${breed.id}`}
            className="font-serif text-2xl md:text-3xl text-[#1C1208] leading-tight block no-underline transition-colors hover:text-[#C4602A]"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: 600,
            }}
          >
            {breed.name}
          </Link>

          {/* Metadata Specs Table */}
          <div className="mt-5 space-y-2.5 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-[#E8E0D2]">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{
                  color: "#8E7E70",
                  fontFamily: "var(--font-source-sans), sans-serif",
                }}
              >
                HEAD COUNT
              </span>
              <span
                className="font-semibold text-[#1C1208]"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                {breed.inStock > 0 ? `${breed.inStock} head` : "Waitlist"}
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-[#E8E0D2]">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{
                  color: "#8E7E70",
                  fontFamily: "var(--font-source-sans), sans-serif",
                }}
              >
                ORIGIN
              </span>
              <span
                className="font-semibold text-[#1C1208]"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                {breed.origin || "Kenya"}
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-[#E8E0D2]">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                style={{
                  color: "#8E7E70",
                  fontFamily: "var(--font-source-sans), sans-serif",
                }}
              >
                PURPOSE
              </span>
              <span
                className="font-semibold text-[#1C1208]"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                {breed.purpose || "Breeding & Beef"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ROW ── */}
      <div className="os-card-footer mt-auto">
        <div className="flex items-baseline gap-1">
          <span
            className="text-xl md:text-2xl font-bold"
            style={{
              color: "#C4602A",
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}
          >
            KES {breed.pricePerHead.toLocaleString()}
          </span>
          <span
            className="text-xs font-normal"
            style={{
              color: "#8E7E70",
              fontFamily: "var(--font-source-sans), sans-serif",
            }}
          >
            /head
          </span>
        </div>

        <Link
          href={`/breeds/${breed.id}`}
          className="btn-outline"
          style={{
            borderRadius: "2px",
            padding: "0.55rem 1.4rem",
            fontSize: "0.75rem",
            letterSpacing: "0.14em",
            fontWeight: 700,
            textTransform: "uppercase",
            border: "1px solid #1C1208",
            color: "#1C1208",
            textDecoration: "none",
            transition: "all 0.2s ease",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ENQUIRE
        </Link>
      </div>
    </div>
  );
}
