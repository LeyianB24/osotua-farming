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

  const speciesName = breed.species.name.toUpperCase();

  const categoryLabel = speciesName.includes("BEEF")
    ? "BEEF CATTLE"
    : speciesName.includes("DAIRY")
      ? "DAIRY CATTLE"
      : speciesName.includes("GOAT")
        ? "PEDIGREE GOAT"
        : speciesName.includes("SHEEP")
          ? "SAVANNA SHEEP"
          : speciesName.includes("POULTRY") || speciesName.includes("CHICKEN")
            ? "FREE-RANGE POULTRY"
            : speciesName;

  const isAvailable = breed.inStock > 0;

  const formattedPrice = new Intl.NumberFormat("en-KE", {
    maximumFractionDigits: 0,
  }).format(breed.pricePerHead);

  const details = [
    {
      label: "HEAD COUNT",
      value: isAvailable
        ? `${breed.inStock.toLocaleString()} registered`
        : "Waitlist available",
    },
    {
      label: "ORIGIN",
      value: breed.origin || "Kenya",
    },
    {
      label: "PURPOSE",
      value: breed.purpose || "Breeding & Beef",
    },
  ];

  const breedUrl = `/breeds/${breed.id}`;

  return (
    <article
      className="
        group relative flex h-full flex-col overflow-hidden
        border border-[#D8C9AA]
        bg-[#F7F3EA]
        shadow-[0_2px_12px_rgba(28,18,8,0.04)]
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-[#C99A2E]
        hover:shadow-[0_14px_36px_rgba(28,18,8,0.12)]
        motion-reduce:transform-none
        motion-reduce:transition-none
      "
    >
      {/* IMAGE */}
      <Link
        href={breedUrl}
        aria-label={`Explore ${breed.name} breed`}
        className="
          relative block aspect-[5/4] w-full shrink-0
          overflow-hidden bg-[#1C1208]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-inset
          focus-visible:ring-[#C99A2E]
        "
      >
        {src ? (
          <Image
            src={src}
            alt={`${breed.name} livestock breed`}
            fill
            sizes="
              (min-width: 1280px) 33vw,
              (min-width: 768px) 50vw,
              100vw
            "
            className="
              object-cover
              transition-transform duration-700 ease-out
              group-hover:scale-[1.045]
              motion-reduce:transform-none
              motion-reduce:transition-none
            "
          />
        ) : (
          <div
            className="
              flex h-full w-full items-center justify-center
              text-[#C99A2E]/60
            "
          >
            <i
              className="bi bi-award text-5xl"
              aria-hidden="true"
            />
          </div>
        )}

        {/* Cinematic image treatment */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-b
            from-[#1C1208]/35 via-transparent
            to-[#1C1208]/65
          "
        />

        {/* Category badge */}
        <div
          className="
            absolute left-4 top-4
            border border-[#F4EFE5]/25
            bg-[#1C1208]/80
            px-3 py-2
            text-[9px] font-semibold uppercase
            tracking-[0.19em] text-[#F4EFE5]
            backdrop-blur-sm
          "
        >
          {categoryLabel}
        </div>

        {/* Verification indicator */}
        <div
          className="
            absolute right-4 top-4
            flex items-center gap-1.5
            border border-[#D1A027]/60
            bg-[#D1A027]
            px-3 py-2
            text-[9px] font-bold uppercase
            tracking-[0.14em] text-[#1C1208]
          "
        >
          <i
            className="bi bi-patch-check-fill text-xs"
            aria-hidden="true"
          />
          Stud Verified
        </div>

        {/* Bottom image caption */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#E2BC62]">
            OSOTUA BREED COLLECTION
          </p>

          <div className="mt-2 h-px w-10 bg-[#D1A027] transition-all duration-300 group-hover:w-16" />
        </div>
      </Link>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-6 sm:px-6 sm:pb-6">
        {/* Breed title */}
        <div>
          <Link
            href={breedUrl}
            className="
              inline-block
              text-[25px] font-medium leading-tight
              tracking-[-0.035em]
              text-[#24170D]
              no-underline
              transition-colors duration-200
              hover:text-[#9C7219]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#C99A2E]
            "
            style={{
              fontFamily:
                "var(--font-playfair), 'Playfair Display', Georgia, serif",
            }}
          >
            {breed.name}
          </Link>

          <div className="mt-3 flex items-center gap-2">
            <span
              className={`
                h-1.5 w-1.5 rounded-full
                ${isAvailable ? "bg-[#638A57]" : "bg-[#C99A2E]"}
              `}
              aria-hidden="true"
            />

            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#766958]">
              {isAvailable ? "Available for enquiry" : "Join the waitlist"}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-[#DED3BE]" />

        {/* Breed specifications */}
        <dl className="space-y-0">
          {details.map((detail, index) => (
            <div
              key={detail.label}
              className={`
                flex items-start justify-between gap-4 py-3
                ${index !== details.length - 1 ? "border-b border-[#E7DECE]" : ""}
              `}
            >
              <dt className="shrink-0 pt-0.5 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#8C7D69]">
                {detail.label}
              </dt>

              <dd className="max-w-[60%] text-right text-[12px] font-medium leading-relaxed text-[#35271A]">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Push the price section to the bottom */}
        <div className="mt-auto">
          <div className="mb-5 mt-5 h-px bg-[#DED3BE]" />

          {/* Price and action */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8C7D69]">
                Investment per head
              </p>

              <div className="flex flex-wrap items-baseline gap-x-1.5">
                <span
                  className="
                    text-[25px] font-medium leading-none
                    tracking-[-0.035em] text-[#A67C1E]
                  "
                  style={{
                    fontFamily:
                      "var(--font-playfair), 'Playfair Display', Georgia, serif",
                  }}
                >
                  KES {formattedPrice}
                </span>

                <span className="text-[10px] text-[#8C7D69]">
                  / head
                </span>
              </div>
            </div>

            <Link
              href={breedUrl}
              className="
                inline-flex min-h-10 shrink-0
                items-center justify-center gap-2
                border border-[#B98B20]
                bg-transparent
                px-4 py-2.5
                text-[9px] font-bold uppercase
                tracking-[0.13em]
                text-[#6F5013]
                no-underline
                transition-all duration-200
                hover:bg-[#C99A2E]
                hover:text-[#1C1208]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#C99A2E]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#F7F3EA]
              "
            >
              Enquire
              <i
                className="
                  bi bi-arrow-up-right text-xs
                  transition-transform duration-200
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}