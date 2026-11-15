"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/shared/CartContext";

export interface ProductDetailData {
  id: string;
  name: string;
  slug: string;
  price: number;
  unit: string;
  image: string | null;
  description: string;
  inStock: boolean;
  category: {
    name: string;
  };
}

interface Props {
  product: ProductDetailData;
  imageSrc: string | null;
  iconClass: string;
}

export default function ProductDetailClient({ product, imageSrc, iconClass }: Props) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: imageSrc,
        categoryName: product.category.name,
        type: "product",
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: imageSrc,
        categoryName: product.category.name,
        type: "product",
      },
      quantity
    );
    router.push("/checkout");
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="w-full min-h-screen bg-[#F5F0E8] text-[#1C1208] pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="font-mono text-xs text-[#8E7E70] tracking-wider uppercase mb-8 flex items-center gap-2">
          <Link href="/barn" className="hover:text-[#C99A2E] transition-colors font-bold">
            Barn Store
          </Link>
          <span>/</span>
          <span className="text-[#8E7E70]">{product.category.name}</span>
          <span>/</span>
          <span className="text-[#1C1208] font-bold">{product.name}</span>
        </div>

        <div className="bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 shadow-sm">
          {/* Media */}
          {imageSrc ? (
            <div className="relative h-80 lg:h-[28rem] bg-[#1C1208] border border-[#D4C9B0] rounded-[2px] overflow-hidden">
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="text-xs font-mono font-bold tracking-[0.14em] uppercase px-3 py-1 bg-[#6B7A3F] text-white rounded-[2px] shadow-sm">
                  {product.category.name}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span
                  className={`text-xs font-mono font-bold tracking-[0.14em] uppercase px-3 py-1 rounded-[2px] shadow-sm ${
                    product.inStock ? "bg-[#C99A2E] text-[#1C1208]" : "bg-[#D4C9B0] text-[#1C1208]/60"
                  }`}
                >
                  {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
                </span>
              </div>
            </div>
          ) : (
            <div className="h-80 lg:h-[28rem] bg-[#1C1208] border border-[#D4C9B0] rounded-[2px] flex items-center justify-center text-[#C99A2E]">
              <i className={`bi ${iconClass} text-7xl`} />
            </div>
          )}

          {/* Details & Interactive Actions */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#C99A2E] bg-[#C99A2E]/10 border border-[#C99A2E]/30 rounded-[2px] mb-3">
                <i className="bi bi-patch-check-fill" />
                <span>FRESH RANCH HARVEST</span>
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1208] mb-4"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                {product.name}
              </h1>

              <p className="text-[#5C4A2A] leading-relaxed mb-6 text-base font-normal">
                {product.description}
              </p>

              {/* Price & Unit Box */}
              <div className="border-t border-b border-[#D4C9B0] py-5 mb-6 flex items-baseline justify-between">
                <div>
                  <div className="font-mono text-xs text-[#8E7E70] font-bold tracking-widest uppercase mb-1">
                    Farm-Gate Price
                  </div>
                  <div
                    className="text-3xl sm:text-4xl text-[#C4602A] font-bold"
                    style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                  >
                    KES {product.price.toLocaleString()}
                    <span className="text-[#8E7E70] font-normal text-sm ml-1 font-mono">
                      /{product.unit}
                    </span>
                  </div>
                </div>

                {quantity > 1 && (
                  <div className="text-right">
                    <div className="font-mono text-xs text-[#8E7E70] font-bold tracking-widest uppercase mb-1">
                      Total ({quantity} {product.unit})
                    </div>
                    <div
                      className="text-2xl text-[#1C1208] font-bold"
                      style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                    >
                      KES {totalPrice.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              {product.inStock && (
                <div className="mb-6 space-y-2">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#7A6C5B]">
                    Quantity ({product.unit}):
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center border border-[#D4C9B0] bg-white rounded-[2px]">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="px-4 py-2.5 text-[#1C1208] hover:bg-[#FAF7F2] disabled:opacity-30 cursor-pointer font-bold transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <i className="bi bi-dash-lg" />
                      </button>
                      <span className="px-5 py-2.5 font-mono text-sm font-bold text-[#1C1208] min-w-[3rem] text-center border-x border-[#D4C9B0]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-4 py-2.5 text-[#1C1208] hover:bg-[#FAF7F2] cursor-pointer font-bold transition-colors"
                        aria-label="Increase quantity"
                      >
                        <i className="bi bi-plus-lg" />
                      </button>
                    </div>

                    <span className="text-xs font-mono text-[#8E7E70]">
                      {quantity} {product.unit} selected
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-4">
              {product.inStock ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-[2px] shadow-sm ${
                      added
                        ? "bg-[#6B7A3F] text-white"
                        : "bg-[#1C1208] text-[#F5F0E8] hover:bg-[#C99A2E] hover:text-[#1C1208]"
                    }`}
                  >
                    <i className={`bi ${added ? "bi-check2-circle" : "bi-basket3"}`} />
                    <span>{added ? "Added to Basket" : "Add to Basket"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="flex-1 btn-gold justify-center cursor-pointer text-xs"
                    style={{ borderRadius: "2px" }}
                  >
                    <span>Instant Checkout</span>
                    <i className="bi bi-arrow-right" />
                  </button>
                </div>
              ) : (
                <div className="bg-[#FAF7F2] border border-[#D4C9B0] text-[#8E7E70] px-6 py-4 text-center rounded-[2px] font-mono text-xs font-bold uppercase tracking-wider">
                  Currently Out of Stock &bull; Fresh Batch In Progress
                </div>
              )}

              {/* WhatsApp Concierge & Reassurance */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#D4C9B0]/60">
                <a
                  href={`https://wa.me/254755758208?text=${encodeURIComponent(
                    `Hello Osotua Barn Concierge, I have a question regarding ${product.name} (KES ${product.price}/${product.unit}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-[#128C7E] hover:underline flex items-center gap-1.5"
                >
                  <i className="bi bi-whatsapp" />
                  <span>Ask Ranch Concierge via WhatsApp</span>
                </a>

                <Link
                  href="/barn"
                  className="text-xs font-mono text-[#8E7E70] hover:text-[#C99A2E] transition-colors flex items-center gap-1"
                >
                  <span>Continue Browsing Barn</span>
                  <i className="bi bi-arrow-right text-[10px]" />
                </Link>
              </div>

              {/* Cold chain assurances */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono text-[#7A6C5B]">
                <div className="flex items-center gap-1.5">
                  <i className="bi bi-truck text-[#C4602A]" />
                  <span>Cold-Chain Nairobi Transit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <i className="bi bi-shield-check text-[#6B7A3F]" />
                  <span>Zero Preservatives</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <i className="bi bi-geo-alt text-[#C99A2E]" />
                  <span>100% Kajiado Traceable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
