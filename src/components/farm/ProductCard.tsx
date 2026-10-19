"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, CheckCircle2, PackageCheck, ShoppingBasket } from "lucide-react";
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
    : catUpper.includes("POULTRY") || catUpper.includes("CHICKEN") || catUpper.includes("EGG")
    ? "POULTRY & EGGS"
    : catUpper.includes("APIARY") || catUpper.includes("HONEY")
    ? "HONEY & APIARY"
    : catUpper.includes("BOX")
    ? "RANCH BOX"
    : catUpper;

  return (
    <div
      className="group flex h-full flex-col justify-between overflow-hidden border border-[#D4C9B0] bg-white shadow-[0_10px_32px_rgba(28,18,8,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C99A2E] hover:shadow-[0_22px_55px_rgba(28,18,8,0.12)]"
    >
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
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#C4602A]/40">
              <i className="bi bi-basket text-4xl" aria-hidden="true" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208]/78 via-[#1C1208]/5 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-[#C99A2E]/45" />

          <div className="absolute top-3 left-3 bg-[#1C1208]/90 text-[#F5F0E8] px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] rounded-[0px]">
            {badgeLabel}
          </div>

          <div
            className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] rounded-[0px] ${
              product.inStock ? "bg-[#C99A2E] text-[#1C1208]" : "bg-[#D4C9B0] text-[#1C1208]/60"
            }`}
          >
            {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 text-white">
            <div className="inline-flex items-center gap-2 bg-[#1C1208]/78 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur">
              <PackageCheck className="h-3.5 w-3.5 text-[#C99A2E]" />
              <span>Farm packed</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-[#C99A2E] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </Link>

        <div className="space-y-3 p-6">
          <div
            className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#7A7848]"
          >
            KAJIADO CO-OP DIRECT
          </div>

          <Link
            href={`/barn/${product.slug}`}
            className="text-xl sm:text-2xl text-[#1C1208] leading-snug block no-underline transition-colors hover:text-[#C4602A] font-bold"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            {product.name}
          </Link>

          <div className="flex items-baseline gap-1.5 pt-1">
            <span
              className="text-3xl font-bold text-[#C4602A]"
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

          <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-semibold text-[#6D6253]">
            <div className="border border-[#E8E0D2] bg-[#FAF7F2] px-3 py-2">
              Fresh batch
            </div>
            <div className="border border-[#E8E0D2] bg-[#FAF7F2] px-3 py-2">
              Ranch verified
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto border-t border-[#E8E0D2] px-6 pb-6 pt-5">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`flex w-full cursor-pointer items-center justify-center gap-2 px-4 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-200 ${
            added
              ? "bg-[#6B7A3F] text-white"
              : "bg-[#1C1208] text-[#F5F0E8] hover:bg-[#C99A2E] hover:text-[#1C1208]"
          } disabled:opacity-50`}
        >
          {added ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              <span>ADDED TO BASKET</span>
            </>
          ) : (
            <>
              <ShoppingBasket className="h-4 w-4" />
              <span>ADD TO BASKET</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
