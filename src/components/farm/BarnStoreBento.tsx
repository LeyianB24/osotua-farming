"use client";

import Link from "next/link";
import { ArrowUpRight, Clock3, MapPinned, ShieldCheck } from "lucide-react";
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
    image: "/images/Milk 1.jpg",
    inStock: true,
    category: { name: "Dairy Products" },
  },
  {
    id: "free-range-chicken",
    slug: "free-range-chicken",
    name: "Free-Range Farm Chicken",
    price: 950,
    unit: "whole bird",
    image: "/images/chicken 1.jpg",
    inStock: true,
    category: { name: "Poultry" },
  },
  {
    id: "farm-fresh-eggs",
    slug: "farm-fresh-eggs",
    name: "Farm Fresh Eggs",
    price: 480,
    unit: "30-egg tray",
    image: "/images/eggs.jpg",
    inStock: true,
    category: { name: "Poultry" },
  },
  {
    id: "raw-farm-honey",
    slug: "raw-farm-honey",
    name: "Raw Ranch Honey",
    price: 750,
    unit: "500ml jar",
    image: "/images/Honey 4.jpg",
    inStock: true,
    category: { name: "Apiary" },
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(28,18,8,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(28,18,8,0.035)_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />

      <div className="os-container">
        <div className="relative mb-12 grid gap-7 sm:mb-14 lg:mb-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
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
              className="m-0 font-serif text-4xl font-bold leading-[1.08] text-[#1C1208] sm:text-5xl lg:text-6xl"
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

          <div className="border border-[#D4C9B0] bg-white/70 p-4 shadow-[0_14px_42px_rgba(28,18,8,0.07)] backdrop-blur">
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                {
                  label: "Packed near harvest",
                  detail: "Fresh dairy, cuts, and produce prepared in small batches.",
                  icon: Clock3,
                },
                {
                  label: "Kajiado provenance",
                  detail: "Every featured item ties back to farm or partner supply.",
                  icon: MapPinned,
                },
                {
                  label: "Verified handling",
                  detail: "Cold-chain and farm-gate checks protect quality.",
                  icon: ShieldCheck,
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="grid grid-cols-[36px_1fr] gap-3 border border-[#E8E0D2] bg-[#FAF7F2] p-3">
                    <div className="flex h-9 w-9 items-center justify-center bg-[#C99A2E]/14 text-[#8C6A20]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="m-0 text-xs font-bold text-[#1C1208]">
                        {item.label}
                      </p>
                      <p className="m-0 mt-1 text-[11px] leading-5 text-[#756B5B]">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {pantryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="relative mt-12 flex flex-col gap-4 border border-[#D4C9B0] bg-[#1C1208] p-5 text-[#F5F0E8] sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 text-sm leading-6 text-[#D4C9B0]">
            <span className="font-bold text-white">Good food starts with good farming.</span>{" "}
            <span>
              Browse the full barn for weekly boxes, fresh cuts, and seasonal harvests.
            </span>
          </p>

          <Link
            href="/barn"
            className="inline-flex w-fit shrink-0 items-center gap-2 bg-[#C99A2E] px-5 py-3 text-xs font-bold uppercase tracking-[0.13em] text-[#1C1208] no-underline transition-colors hover:bg-[#D9AA3E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C99A2E]"
          >
            Browse the full collection
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
