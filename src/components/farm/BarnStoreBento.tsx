"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";

type PantryProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  inStock: boolean;
  category: {
    name: string;
  };
};

const pantryProducts: PantryProduct[] = [
  {
    id: "boran-sirloin-steak",
    slug: "boran-sirloin-steak",
    name: "Boran Sirloin Steak",
    price: 1250,
    unit: "500g pack",
    image: "/images/beef cuts.jpg",
    inStock: true,
    category: { name: "Beef Cuts" },
  },
  {
    id: "farm-fresh-raw-milk",
    slug: "farm-fresh-raw-milk",
    name: "Farm Fresh Raw Milk",
    price: 120,
    unit: "litre",
    image: "/images/sahiwal cow.jpg",
    inStock: true,
    category: { name: "Dairy Products" },
  },
  {
    id: "whole-boer-goat",
    slug: "whole-boer-goat",
    name: "Whole Boer Goat (Dressed)",
    price: 8500,
    unit: "whole",
    image: "/images/boer-goats.jpg",
    inStock: true,
    category: { name: "Goat Meat" },
  },
  {
    id: "ranch-garden-spinach",
    slug: "ranch-garden-spinach",
    name: "Ranch Garden Spinach",
    price: 80,
    unit: "500g bunch",
    image: "/images/vegetables.jpg",
    inStock: true,
    category: { name: "Vegetables" },
  },
  {
    id: "seasonal-fruit-box",
    slug: "seasonal-fruit-box",
    name: "Seasonal Fruit Box",
    price: 1500,
    unit: "5kg box",
    image: "/images/pineapples.jpg",
    inStock: true,
    category: { name: "Fruits" },
  },
  {
    id: "the-osotua-ranch-box",
    slug: "the-osotua-ranch-box",
    name: "The Osotua Ranch Box",
    price: 4200,
    unit: "weekly box",
    image: "/images/WhatsApp Image 2026-08-10 at 11.55.25 (1).jpeg",
    inStock: true,
    category: { name: "Ranch Box" },
  },
];

export default function BarnStoreBento() {
  return (
    <section
      aria-labelledby="barn-store-heading"
      className="relative overflow-hidden border-b border-[#D4C9B0]/60 bg-[#F5F0E8] py-20 sm:py-24 lg:py-28"
    >
      <div className="os-container">
        {/* Section heading */}
        <div className="mb-12 flex flex-col justify-between gap-7 sm:mb-14 sm:flex-row sm:items-end lg:mb-16">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8C6A20] sm:text-[11px]">
                KAJIADO CO-OP
              </span>

              <span
                aria-hidden="true"
                className="h-px w-10 bg-[#C99A2E]/70 sm:w-14"
              />

              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#756B5B] sm:text-[11px]">
                DIRECT FROM THE FARM
              </span>
            </div>

            <h2
              id="barn-store-heading"
              className="m-0 font-serif text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-[#1C1208] sm:text-5xl lg:text-6xl"
            >
              The Farm Barn
              <br />
              <span className="text-[#A67C22]">
                &amp; Harvest Pantry
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#6D6253] sm:text-lg">
              Discover quality farm produce, ranch-raised favourites, and
              seasonal harvests, thoughtfully brought together for your table.
            </p>
          </div>

          <Link
            href="/barn"
            className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-4 self-start border border-[#1C1208] px-6 py-3 text-xs font-bold uppercase tracking-[0.13em] text-[#1C1208] transition-colors duration-300 hover:border-[#1C1208] hover:bg-[#1C1208] hover:text-[#F5F0E8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C99A2E] sm:self-end sm:px-7"
          >
            Explore the Barn

            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {pantryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom section note */}
        <div className="mt-12 flex flex-col gap-3 border-t border-[#D4C9B0] pt-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 text-sm leading-6 text-[#756B5B]">
            Good food starts with good farming.
          </p>

          <Link
            href="/barn"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#725719] underline decoration-[#C99A2E]/50 underline-offset-4 transition-colors hover:text-[#1C1208] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C99A2E]"
          >
            Browse the full collection
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}