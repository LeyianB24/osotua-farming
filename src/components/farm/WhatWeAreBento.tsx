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
    <section className="py-20 md:py-24" style={{ backgroundColor: "#F5F0E8" }}>
      <div className="os-container">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{
                color: "#C99A2E",
                fontFamily: "var(--font-source-sans), sans-serif",
              }}
            >
              CERTIFIED GENETICS · KAJIADO STUD BOOK
            </span>
            <div className="h-[1px] w-12 bg-[#C99A2E]/50" />
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.12] text-[#1C1208] m-0"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: 700,
            }}
          >
            Pedigree Livestock <br />
            &amp; Breeding Stock
          </h2>
        </div>

        {/* 3 Breed Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {featuredBreeds.map((breed) => (
            <div
              key={breed.id}
              className="flex flex-col justify-between h-full bg-[#FAF7F2] border border-[#D4C9B0] transition-all duration-300 hover:shadow-xl group"
              style={{ borderRadius: "2px" }}
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
                  {/* Top-left Category Badge */}
                  <div
                    className="absolute top-3 left-3 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                    style={{ backgroundColor: "#6B7A3F", borderRadius: "2px" }}
                  >
                    {breed.category}
                  </div>
                </Link>

                {/* Details Section */}
                <div className="p-6">
                  <Link
                    href={`/breeds?id=${breed.id}`}
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
                        {breed.headCount}
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
                        {breed.origin}
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
                        {breed.purpose}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Row */}
              <div className="p-6 pt-0 flex justify-between items-center mt-auto">
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-xl md:text-2xl font-bold"
                    style={{
                      color: "#C4602A",
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    KES {breed.price.toLocaleString()}
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
                  href={`/breeds?enquire=${breed.id}`}
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
          ))}
        </div>

        {/* Centered Button: VIEW FULL BREED CATALOGUE */}
        <div className="flex justify-center">
          <Link
            href="/breeds"
            className="btn-outline"
            style={{
              borderRadius: "2px",
              padding: "0.9rem 2.4rem",
              fontSize: "0.8rem",
              letterSpacing: "0.16em",
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
            VIEW FULL BREED CATALOGUE
          </Link>
        </div>
      </div>
    </section>
  );
}
