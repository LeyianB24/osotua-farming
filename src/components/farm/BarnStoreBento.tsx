"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";

const pantryProducts = [
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
    image: "/images/WhatsApp Image 2026-08-10 at 11.55.22.jpeg",
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
    image: "/images/apples.jpg",
    inStock: true,
    category: { name: "Fruits" },
  },
  {
    id: "the-osotua-ranch-box",
    slug: "the-osotua-ranch-box",
    name: "The Osotua Ranch Box",
    price: 4200,
    unit: "weekly box",
    image: "/images/WhatsApp Image 2026-08-10 at 11.55.25.jpeg",
    inStock: true,
    category: { name: "Ranch Box" },
  },
];

export default function BarnStoreBento() {
  return (
    <section className="pb-28 pt-20 lg:pb-36 lg:pt-24" style={{ backgroundColor: "#F5F0E8" }}>
      <div className="os-container">
        {/* Section Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 lg:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-[11px] font-mono font-bold uppercase tracking-[0.2em]"
                style={{ color: "#C99A2E" }}
              >
                KAJIADO CO-OP · DIRECT FARM
              </span>
              <div className="h-[1px] w-12 bg-[#C99A2E]/50" />
            </div>

            <h2
              className="text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08] text-[#1C1208] m-0"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                fontWeight: 700,
              }}
            >
              The Farm Barn <br />
              <span className="text-[#C99A2E]">&amp; Harvest Pantry</span>
            </h2>
          </div>

          <Link
            href="/barn"
            className="btn-outline shrink-0 self-start sm:self-end rounded-[0px]"
            style={{
              padding: "0.85rem 2rem",
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              fontWeight: 700,
              textTransform: "uppercase",
              border: "1px solid #1C1208",
              color: "#1C1208",
            }}
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>

        {/* 6 Products Grid (3 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pantryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
