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

  // Standardize badge uppercase naming
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
      className="flex flex-col justify-between h-full bg-[#FAF7F2] border border-[#D4C9B0] transition-all duration-300 hover:shadow-xl group"
      style={{ borderRadius: "2px" }}
    >
      {/* ── IMAGE SECTION ── */}
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
            className="absolute top-3 left-3 text-[#F5F0E8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
            style={{ backgroundColor: "#1C1208", borderRadius: "2px" }}
          >
            {badgeLabel}
          </div>

          {/* Top-right: Status Badge (Gold / Mustard) */}
          <div
            className="absolute top-3 right-3 text-[#1C1208] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
            style={{
              backgroundColor: product.inStock ? "#C99A2E" : "#D4C9B0",
              borderRadius: "2px",
            }}
          >
            {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
          </div>
        </Link>

        {/* ── DETAILS AREA ── */}
        <div className="p-6">
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-1.5"
            style={{
              color: "#8E7E70",
              fontFamily: "var(--font-source-sans), sans-serif",
            }}
          >
            KAJIADO CO-OP
          </div>

          <Link
            href={`/barn/${product.slug}`}
            className="font-serif text-2xl md:text-3xl text-[#1C1208] leading-tight block no-underline transition-colors hover:text-[#C4602A]"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: 600,
            }}
          >
            {product.name}
          </Link>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-1">
            <span
              className="text-xl md:text-2xl font-bold"
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

      {/* ── FOOTER BUTTON ── */}
      <div className="p-6 pt-0 mt-auto">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!product.inStock}
          className="w-full py-3.5 px-4 font-bold text-[12px] tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          style={{
            backgroundColor: added ? "#6B7A3F" : "#1C1208",
            color: "#F5F0E8",
            borderRadius: "2px",
            border: "none",
            opacity: product.inStock ? 1 : 0.5,
          }}
        >
          {added ? (
            <>
              <i className="bi bi-check2" />
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
