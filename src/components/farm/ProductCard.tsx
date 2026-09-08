"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { imageForCategory } from "@/lib/images";
import { useCart } from "@/components/shared/CartContext";

interface Props {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    unit: string;
    image: string | null;
    inStock: boolean;
    category: { name: string };
  };
  dark?: boolean;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const src = product.image ?? imageForCategory(product.category.name);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: src,
      categoryName: product.category.name,
      type: "product",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const catUpper = product.category.name.toUpperCase();
  const badgeLabel = catUpper.includes("BEEF")
    ? "BEEF CUTS"
    : catUpper.includes("DAIRY") || catUpper.includes("MILK")
    ? "DAIRY PRODUCTS"
    : catUpper.includes("GOAT")
    ? "GOAT MEAT"
    : catUpper.includes("VEGETABLE")
    ? "VEGETABLES"
    : catUpper.includes("FRUIT")
    ? "FRUITS"
    : catUpper.includes("BOX")
    ? "RANCH BOX"
    : catUpper;

  return (
    <div
      className="flex flex-col justify-between h-full bg-[#FAF7F2] border border-[#D4C9B0] transition-all duration-300 hover:shadow-md group rounded-[0px]"
    >
      {/* ── IMAGE CONTAINER ── */}
      <div>
        <Link
          href={`/barn/${product.slug}`}
          className="relative block aspect-[16/10] w-full overflow-hidden bg-[#1C1208]"
        >
          {src ? (
            <Image
              src={src}
              alt={product.name}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#C4602A]/40">
              <i className="bi bi-basket text-4xl" aria-hidden="true" />
            </div>
          )}

          {/* Top-left: Category Badge (Exact Figma Dark Pill) */}
          <div className="absolute top-3 left-3 bg-[#1C1208]/90 text-[#F5F0E8] px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] rounded-[0px]">
            {badgeLabel}
          </div>

          {/* Top-right: Status Badge (Exact Figma Mustard Pill) */}
          <div
            className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] rounded-[0px] ${
              product.inStock ? "bg-[#C99A2E] text-[#1C1208]" : "bg-[#D4C9B0] text-[#1C1208]/60"
            }`}
          >
            {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
          </div>
        </Link>

        {/* ── CARD CONTENT (Exact Figma spacing from Screenshots) ── */}
        <div className="px-6 pt-5 pb-2 space-y-1.5">
          <div
            className="text-[11px] font-mono uppercase tracking-[0.2em]"
            style={{ color: "#C4602A" }}
          >
            KAJIADO CO-OP
          </div>

          <Link
            href={`/barn/${product.slug}`}
            className="font-serif text-[21px] sm:text-[22px] text-[#1C1208] leading-snug block no-underline transition-colors hover:text-[#C4602A] font-semibold"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            {product.name}
          </Link>

          {/* Price with Terracotta accent (Playfair 700) */}
          <div className="pt-2 flex items-baseline gap-1.5">
            <span
              className="text-[21px] sm:text-[22px] font-bold"
              style={{
                color: "#C4602A",
                fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
              }}
            >
              KES {product.price.toLocaleString()}
            </span>
            <span
              className="text-[13px] font-normal text-[#1C1208]/60"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              /{product.unit}
            </span>
          </div>
        </div>
      </div>

      {/* ── FOOTER BUTTON (Exact Figma Full-Width Dark CTA) ── */}
      <div className="px-6 pb-6 pt-4 mt-auto">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!product.inStock}
          className="w-full py-3.5 px-4 font-bold text-[11px] tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 rounded-[0px] bg-[#1C1208] hover:bg-[#C99A2E] text-[#FAF7F2] hover:text-[#1C1208] disabled:opacity-50"
          style={{
            fontFamily: "var(--font-source-sans), sans-serif",
            backgroundColor: added ? "#6B7A3F" : undefined,
          }}
        >
          {added ? (
            <>
              <i className="bi bi-check2 text-sm" />
              <span>ADDED TO CART</span>
            </>
          ) : (
            <span>ADD TO CART</span>
          )}
        </button>
      </div>
    </div>
  );
}
