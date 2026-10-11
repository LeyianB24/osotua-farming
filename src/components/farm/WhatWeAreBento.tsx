"use client";

import Link from "next/link";
import Image from "next/image";

interface BreedItem {
  id: string;
  name: string;
  category: "BEEF CATTLE" | "DAIRY CATTLE";
  image: string;
  headCount: string;
  origin: string;
  purpose: string;
  price: number;
}

const featuredBreeds: BreedItem[] = [
  {
    id: "boran",
    name: "Boran",
    category: "BEEF CATTLE",
    image: "/images/boran-bull.jpg",
    headCount: "12 head",
    origin: "East Africa (Kenya)",
    purpose: "Beef",
    price: 45000,
  },
  {
    id: "bonsmara",
    name: "Bonsmara",
    category: "BEEF CATTLE",
    image: "/images/bonsamara bull.jpg",
    headCount: "8 head",
    origin: "South Africa",
    purpose: "Beef",
    price: 52000,
  },
  {
    id: "sahiwal",
    name: "Sahiwal",
    category: "DAIRY CATTLE",
    image: "/images/sahiwal cow.jpg",
    headCount: "10 head",
    origin: "Pakistan / India",
    purpose: "Dual-purpose",
    price: 60000,
  },
];

export default function WhatWeAreBento() {
  return (
    <section className="py-20 sm:py-24 md:py-32 border-b border-[#D4C9B0]/40 bg-[#FAF7F2]">
      <div className="os-container">
        {/* Section Header Row matching Compass Cartage FeaturedServicesMatrix */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#C99A2E]" aria-hidden="true" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#C99A2E]">
                CERTIFIED GENETICS · KAJIADO STUD BOOK
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1208] leading-tight m-0"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
            >
              Pedigree Livestock <br />
              <span className="text-[#C99A2E] italic">&amp; Foundation Genetics</span>
            </h2>
          </div>

          <Link
            href="/breeds"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#C99A2E] hover:text-[#B0821E] transition-colors group no-underline self-start md:self-end"
          >
            <span>VIEW ALL FOUNDATION BREEDS</span>
            <i className="bi bi-arrow-right group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Breed Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBreeds.map((breed) => (
            <div
              key={breed.id}
              className="flex flex-col justify-between h-full bg-[#FFFFFF] border border-[#D4C9B0] transition-all duration-300 hover:border-[#C99A2E] hover-lift rounded-[0px] shadow-sm hover:shadow-xl group"
            >
              {/* Image Section */}
              <div>
                <Link
                  href={`/breeds?id=${breed.id}`}
                  className="relative block aspect-[16/10] w-full overflow-hidden bg-[#1C1208]"
                >
                  <Image
                    src={breed.image}
                    alt={breed.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208]/60 via-transparent to-transparent" />
                  
                  {/* Top-left Category Badge */}
                  <div className="absolute top-3 left-3 text-white px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.14em] rounded-[0px] bg-[#6B7A3F]">
                    {breed.category}
                  </div>

                  {/* Top-right Stud Status */}
                  <div className="absolute top-3 right-3 text-[#1C1208] px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.14em] rounded-[0px] bg-[#C99A2E]">
                    STUD BOOK VERIFIED
                  </div>
                </Link>

                {/* Details Section */}
                <div className="p-7">
                  <Link
                    href={`/breeds?id=${breed.id}`}
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
                        {breed.headCount} Registered
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-[#E8E0D2]">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8E7E70]">
                        ORIGIN
                      </span>
                      <span className="font-semibold text-[#1C1208]">
                        {breed.origin}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-[#E8E0D2]">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8E7E70]">
                        PURPOSE
                      </span>
                      <span className="font-semibold text-[#1C1208]">
                        {breed.purpose}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Row */}
              <div className="px-7 pb-7 pt-5 flex justify-between items-center mt-auto border-t border-[#E8E0D2]/60">
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-2xl font-bold text-[#C4602A]"
                    style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                  >
                    KES {breed.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#8E7E70] font-normal">
                    /head
                  </span>
                </div>

                <Link
                  href={`/breeds?enquire=${breed.id}`}
                  className="py-2.5 px-5 text-[11px] font-bold uppercase tracking-[0.14em] rounded-[0px] no-underline border border-[#1C1208] text-[#1C1208] hover:bg-[#1C1208] hover:text-[#FAF7F2] transition-colors"
                >
                  ENQUIRE STUD
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
