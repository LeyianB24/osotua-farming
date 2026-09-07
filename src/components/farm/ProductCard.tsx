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

export default function ProductCard({ product, dark = true }: Props) {
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

  return (
    <div
      className={`bento-cell rounded-3xl overflow-hidden border flex flex-col justify-between h-full transition-all duration-300 ${
        dark
          ? "bg-[#2E1C08]/90 border-[#C4882A]/20 text-[#FBF7F0] hover:border-[#C4882A] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          : "bg-[#FBF7F0] border-[#DDD0BE] text-[#1C1208] hover:border-[#C4882A] hover:shadow-[0_12px_36px_rgba(28,18,8,0.08)]"
      }`}
    >
      {/* ── IMAGE SECTION ── */}
      <div>
        <Link
          href={`/barn/${product.slug}`}
          className="relative block h-56 sm:h-64 w-full bg-[#1C1208] overflow-hidden group"
        >
          {src ? (
            <Image
              src={src}
              alt={product.name}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#C4882A]/40">
              <i className="bi bi-basket text-4xl" aria-hidden="true" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Top-left: Category */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-[#FBF7F0] px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border border-white/10">
            {product.category.name}
          </div>

          {/* Top-right: Status */}
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-white ${
              product.inStock
                ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-300"
                : "bg-red-950/80 border border-red-500/40 text-red-300"
            }`}
          >
            {product.inStock ? "In Stock" : "Sold Out"}
          </div>
        </Link>

        {/* ── DETAILS AREA ── */}
        <div className="p-6 pb-2 space-y-1.5">
          <div className="t-label text-[10px] text-[#C4882A]">
            {product.category.name} &bull; 6 AM Harvest
          </div>

          <Link
            href={`/barn/${product.slug}`}
            className={`font-serif text-2xl font-light leading-snug block hover:text-[#C4882A] transition-colors no-underline m-0 ${
              dark ? "text-[#FBF7F0]" : "text-[#1C1208]"
            }`}
          >
            {product.name}
          </Link>
        </div>
      </div>

      {/* ── FOOTER ROW ── */}
      <div
        className={`p-6 pt-4 flex justify-between items-center border-t mt-auto ${
          dark ? "border-white/10" : "border-[#DDD0BE]"
        }`}
      >
        <div>
          <div className="t-label text-[9px] text-[#FBF7F0]/50">
            Farm Gate Price
          </div>
          <div
            className={`font-serif text-xl sm:text-2xl font-light mt-0.5 ${
              dark ? "text-[#FBF7F0]" : "text-[#1C1208]"
            }`}
          >
            KES {product.price.toLocaleString()}
            <span className="text-xs font-mono text-[#C4882A] ml-1">
              /{product.unit}
            </span>
          </div>
        </div>

        {product.inStock ? (
          <button
            type="button"
            onClick={handleAdd}
            className={`text-xs font-mono font-semibold py-2 px-4 rounded-full tracking-wider uppercase transition-all duration-200 cursor-pointer shrink-0 flex items-center gap-1.5 shadow-md ${
              added
                ? "bg-emerald-600 text-white border-transparent"
                : "bg-[#C4882A] text-[#1C1208] hover:bg-[#D99A30] hover:scale-105 active:scale-95"
            }`}
          >
            {added ? (
              <>
                <i className="bi bi-check-lg" aria-hidden="true" />
                <span>Added</span>
              </>
            ) : (
              <>
                <i className="bi bi-plus-lg" aria-hidden="true" />
                <span>Add</span>
              </>
            )}
          </button>
        ) : (
          <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/10">
            Sold Out
          </span>
        )}
      </div>
    </div>
  );
}
