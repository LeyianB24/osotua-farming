"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/shared/CartContext";
import { useState } from "react";

export default function CartClient() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const deliveryFee = cartTotal > 0 ? 500 : 0;
  const finalTotal = Math.max(0, cartTotal + deliveryFee - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    if (promoCode.trim().toUpperCase() === "OSOTUA10") {
      setDiscount(cartTotal * 0.1);
      setPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === "KAJIADO20") {
      setDiscount(cartTotal * 0.2);
      setPromoApplied(true);
    } else {
      setPromoError("Invalid promo code. Try 'OSOTUA10' or 'KAJIADO20'");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F5F0E8] text-[#1C1208]">
      {/* ── HERO BANNER ── */}
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden bg-[#1C1208]">
        <div className="os-container relative z-10">
          <div className="flex items-baseline justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] text-[11px] font-mono font-bold uppercase tracking-[0.16em] bg-[#6B7A3F] text-white mb-6">
                <i className="bi bi-bag-check-fill text-xs" />
                <span>SHOPPING BASKET</span>
              </div>
              <h1
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F5F0E8] leading-[1.02] tracking-tight max-w-5xl mb-4"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                Your Farm <em className="font-normal italic text-[#C99A2E]">Order</em>
              </h1>
            </div>

            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="btn-outline text-white border-white/30 hover:bg-white/10 hover:text-white"
              >
                <i className="bi bi-trash3" />
                <span>Clear Basket</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-20 sm:py-28 bg-[#F5F0E8]">
        <div className="os-container">
          {cart.length === 0 ? (
            <div className="text-center py-20 px-8 bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] max-w-xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-[2px] bg-[#C99A2E]/10 border border-[#C99A2E]/30 flex items-center justify-center mx-auto mb-6 text-3xl text-[#C99A2E]">
                <i className="bi bi-bag-x" />
              </div>
              <h2
                className="text-3xl font-bold text-[#1C1208] mb-3"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                Your Basket is Empty
              </h2>
              <p className="text-sm text-[#5C4A2A] max-w-md mx-auto mb-8 leading-relaxed font-normal">
                Explore our selection of pasture-raised beef, organic dairy, pure rangeland honey, or reserve pedigree livestock.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/barn" className="btn-gold">
                  <i className="bi bi-shop" />
                  <span>Visit Farm Barn</span>
                </Link>
                <Link href="/breeds" className="btn-outline">
                  <i className="bi bi-award" />
                  <span>View Livestock Breeds</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Items List */}
              <div className="lg:col-span-8 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] flex items-center gap-6 flex-wrap justify-between shadow-sm"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 rounded-[2px] overflow-hidden relative flex-shrink-0 bg-[#1C1208] border border-[#D4C9B0]">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#C99A2E]">
                          <i className="bi bi-box-seam text-2xl" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-[200px]">
                      <div className="font-mono text-[10px] font-bold tracking-wider uppercase text-[#6B7A3F] mb-1">
                        {item.type === "breed" ? "Pedigree Livestock" : item.categoryName || "Artisanal Product"}
                      </div>
                      <h3
                        className="text-xl font-bold text-[#1C1208] leading-tight"
                        style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                      >
                        {item.name}
                      </h3>
                      <div className="text-xs font-mono text-[#8E7E70] mt-1">
                        KES {item.price.toLocaleString()} / {item.unit || "unit"}
                      </div>
                    </div>

                    {/* Quantity Controller */}
                    <div className="flex items-center border border-[#D4C9B0] rounded-[2px] bg-white overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#1C1208] font-bold hover:bg-[#EDE6DA] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <i className="bi bi-dash font-bold" />
                      </button>
                      <span className="w-10 text-center text-xs font-mono font-bold text-[#1C1208]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#1C1208] font-bold hover:bg-[#EDE6DA] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <i className="bi bi-plus font-bold" />
                      </button>
                    </div>

                    {/* Line Total */}
                    <div
                      className="text-xl font-bold text-[#C4602A] min-w-[110px] text-right"
                      style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                    >
                      KES {(item.price * item.quantity).toLocaleString()}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-[#8E7E70] hover:text-red-700 cursor-pointer transition-colors"
                      aria-label="Remove item"
                    >
                      <i className="bi bi-x-lg text-sm" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-4 bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] p-8 shadow-sm sticky top-28">
                <h3
                  className="text-2xl font-bold text-[#1C1208] pb-4 mb-6 border-b border-[#D4C9B0]"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                >
                  Order Summary
                </h3>

                <div className="space-y-3.5 mb-6 text-sm">
                  <div className="flex justify-between text-[#5C4A2A]">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold text-[#1C1208]">
                      KES {cartTotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#5C4A2A]">
                    <span>Cold-Chain Delivery</span>
                    <span className="font-mono font-bold text-[#1C1208]">
                      KES {deliveryFee.toLocaleString()}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-[#6B7A3F] font-semibold">
                      <span>Discount (Promo)</span>
                      <span className="font-mono">
                        - KES {discount.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-[#D4C9B0] flex justify-between items-baseline">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#5C4A2A] font-bold">
                      Total Amount
                    </span>
                    <span
                      className="text-3xl font-bold text-[#C4602A]"
                      style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                    >
                      KES {finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Promo Input */}
                <form onSubmit={handleApplyPromo} className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (OSOTUA10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      className="os-input font-mono text-xs"
                    />
                    <button
                      type="submit"
                      disabled={promoApplied || !promoCode}
                      className="btn-outline px-4 text-xs font-mono uppercase"
                    >
                      {promoApplied ? "Applied" : "Apply"}
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-red-600 text-xs mt-2 font-mono">{promoError}</p>
                  )}
                  {promoApplied && (
                    <p className="text-[#6B7A3F] text-xs mt-2 font-mono font-bold">
                      Coupon successfully activated!
                    </p>
                  )}
                </form>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full btn-gold justify-center py-3.5 text-xs font-mono uppercase tracking-wider"
                >
                  <span>Proceed to Checkout</span>
                  <i className="bi bi-arrow-right" />
                </Link>

                <div className="text-[11px] font-mono text-[#8E7E70] text-center mt-4 flex items-center justify-center gap-2 uppercase tracking-wider">
                  <i className="bi bi-shield-lock text-[#6B7A3F]" />
                  <span>M-Pesa STK Push &bull; Cold-Chain Guarantee</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
