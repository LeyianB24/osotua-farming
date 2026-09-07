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
      className="flex flex-col justify-between h-full bg-[#FAF7F2] border border-[#D4C9B0] transition-all duration-300 hover:shadow-lg group"
      style={{ borderRadius: "2px" }}
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

          {/* Top-left: Category Badge (Dark Ranch Brown) */}
          <div
            className="absolute top-3.5 left-3.5 text-[#F5F0E8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{ backgroundColor: "#1C1208", borderRadius: "2px" }}
          >
            {badgeLabel}
          </div>

          {/* Top-right: Status Badge (Gold / Mustard) */}
          <div
            className="absolute top-3.5 right-3.5 text-[#1C1208] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{
              backgroundColor: product.inStock ? "#C99A2E" : "#D4C9B0",
              borderRadius: "2px",
            }}
          >
            {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
          </div>
        </Link>

        {/* ── CARD CONTENT (Generous editorial spacing matching Screenshot 1) ── */}
        <div className="px-7 pt-7 pb-2 space-y-2">
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{
              color: "#8E7E70",
              fontFamily: "var(--font-source-sans), sans-serif",
            }}
          >
            KAJIADO CO-OP
          </div>

          <Link
            href={`/barn/${product.slug}`}
            className="font-serif text-2xl lg:text-[1.65rem] text-[#1C1208] leading-tight block no-underline transition-colors hover:text-[#C4602A] pt-1"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: 600,
            }}
          >
            {product.name}
          </Link>

          {/* Price with terracotta accent */}
          <div className="pt-2 flex items-baseline gap-1.5">
            <span
              className="text-2xl lg:text-[1.65rem] font-bold"
              style={{
                color: "#C4602A",
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              KES {product.price.toLocaleString()}
            </span>
            <span
              className="text-xs font-normal"
              style={{
                color: "#8E7E70",
                fontFamily: "var(--font-source-sans), sans-serif",
              }}
            >
              /{product.unit}
            </span>
          </div>
        </div>
      </div>

      {/* ── FOOTER BUTTON (Padded inside card matching Screenshot 1) ── */}
      <div className="px-7 pb-7 pt-5 mt-auto">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!product.inStock}
          className="w-full py-3.5 px-4 font-bold text-[12px] tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          style={{
            backgroundColor: added ? "#6B7A3F" : "#1C1208",
            color: "#F5F0E8",
            borderRadius: "2px",
            border: "none",
            opacity: product.inStock ? 1 : 0.5,
            fontFamily: "var(--font-source-sans), sans-serif",
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
