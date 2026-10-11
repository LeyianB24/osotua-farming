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
      className="os-card flex flex-col justify-between h-full bg-[#FFFFFF] border border-[#D4C9B0] transition-all duration-300 hover:border-[#C99A2E] hover-lift rounded-[0px] shadow-sm hover:shadow-xl group"
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

          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208]/60 via-transparent to-transparent" />

          {/* Top-left: Category Badge */}
          <div className="absolute top-3 left-3 bg-[#1C1208]/90 text-[#F5F0E8] px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] rounded-[0px]">
            {badgeLabel}
          </div>

          {/* Top-right: Status Badge */}
          <div
            className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] rounded-[0px] ${
              product.inStock ? "bg-[#C99A2E] text-[#1C1208]" : "bg-[#D4C9B0] text-[#1C1208]/60"
            }`}
          >
            {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
          </div>
        </Link>

        {/* ── CARD CONTENT ── */}
        <div className="p-6 space-y-2">
          <div
            className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#7A7848]"
          >
            KAJIADO CO-OP
          </div>

          <Link
            href={`/barn/${product.slug}`}
            className="text-xl sm:text-2xl text-[#1C1208] leading-snug block no-underline transition-colors hover:text-[#C4602A] font-bold"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            {product.name}
          </Link>

          {/* Price with Terracotta accent */}
          <div className="pt-2 flex items-baseline gap-1.5">
            <span
              className="text-2xl font-bold text-[#C4602A]"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
            >
              KES {product.price.toLocaleString()}
            </span>
            <span
              className="text-xs font-normal text-[#8E7E70]"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              /{product.unit}
            </span>
          </div>
        </div>
      </div>

      {/* ── FOOTER BUTTON ── */}
      <div className="px-6 pb-6 pt-3 mt-auto">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`w-full py-3.5 px-4 font-mono font-bold text-[11px] tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 rounded-[0px] ${
            added
              ? "bg-[#6B7A3F] text-white"
              : "bg-[#1C1208] hover:bg-[#C99A2E] text-white hover:text-[#1C1208]"
          } disabled:opacity-50`}
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
