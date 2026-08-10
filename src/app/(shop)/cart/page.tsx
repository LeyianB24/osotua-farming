"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/shared/CartContext";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const deliveryFee = cartTotal > 0 ? 500 : 0;
  const finalTotal = Math.max(0, cartTotal + deliveryFee - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "OSOTUA10") {
      setDiscount(cartTotal * 0.1);
      setPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === "KAJIADO20") {
      setDiscount(cartTotal * 0.2);
      setPromoApplied(true);
    } else {
      alert("Invalid promo code. Try 'OSOTUA10' or 'KAJIADO20'");
    }
  };

  return (
    <div className="bg-[#FBF7F0] pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[#1C1208]/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="eyebrow mb-2">Shopping Basket</div>
            <h1 className="font-serif text-4xl text-[#1C1208] font-light">
              Your Farm <em className="text-[#C4882A]">Orders</em>
            </h1>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-mono text-[#A0431E] hover:underline flex items-center gap-1"
            >
              <Trash2 size={13} />
              Clear entire basket
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="bg-white border border-[#1C1208]/08 rounded-md p-16 text-center max-w-xl mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-[#F5EFE4] text-[#C4882A] flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} />
            </div>
            <h2 className="font-serif text-2xl text-[#1C1208] mb-2">Your basket is empty</h2>
            <p className="text-xs text-[#1C1208]/50 leading-relaxed mb-8 max-w-md mx-auto">
              Explore our rangeland livestock catalogue or fresh Barn Store produce to add items to your cart.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/barn" className="btn btn-primary btn-sm">
                Shop Barn Store
              </Link>
              <Link href="/breeds" className="btn btn-outline btn-sm">
                Browse Breeds
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Cart Items List (2 Cols) */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#1C1208]/08 rounded-md p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:border-[#C4882A]/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    {item.image ? (
                      <div className="relative w-16 h-16 rounded bg-[#1C1208]/05 overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded bg-[#F5EFE4] flex items-center justify-center text-2xl shrink-0">
                        📦
                      </div>
                    )}

                    <div>
                      <span className="eyebrow-plain text-[#C4882A] text-[9px]">
                        {item.categoryName || item.type.toUpperCase()}
                      </span>
                      <h3 className="font-serif text-lg font-semibold text-[#1C1208] leading-snug">
                        {item.name}
                      </h3>
                      <div className="text-xs font-semibold text-[#3D6B3E] mt-0.5">
                        KES {item.price.toLocaleString()}{" "}
                        <span className="font-normal text-[#1C1208]/40">/ {item.unit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-[#1C1208]/05">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-[#1C1208]/15 rounded-xs bg-[#FBF7F0]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 text-[#1C1208]/60 hover:text-[#1C1208] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 font-mono text-xs font-semibold text-[#1C1208]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 text-[#1C1208]/60 hover:text-[#1C1208] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <div className="font-mono text-sm font-bold text-[#1C1208]">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#1C1208]/35 hover:text-[#A0431E] p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="p-4 bg-[#F5EFE4] rounded-md text-xs text-[#1C1208]/60 flex items-center gap-3 border border-[#EDE5D8]">
                <Truck className="text-[#C4882A] shrink-0" size={18} />
                <span>
                  Delivered fresh from our Kajiado Ranch to your doorstep within 24 hours.
                </span>
              </div>
            </div>

            {/* Order Summary Side Panel (1 Col) */}
            <div className="bg-white border border-[#1C1208]/10 rounded-md p-6 h-fit shadow-md space-y-6">
              <h2 className="font-serif text-xl text-[#1C1208] border-b border-[#1C1208]/10 pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-[#1C1208]/70">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-[#1C1208]">
                    KES {cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[#1C1208]/70">
                  <span>Estimated Logistics / Shipping</span>
                  <span className="font-mono font-semibold text-[#1C1208]">
                    KES {deliveryFee.toLocaleString()}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#3D6B3E] font-medium">
                    <span>Discount (Promo)</span>
                    <span className="font-mono font-bold">
                      - KES {discount.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#1C1208]/10 flex justify-between items-baseline">
                  <span className="font-serif text-lg font-semibold text-[#1C1208]">Total</span>
                  <span className="font-mono text-xl font-bold text-[#C4882A]">
                    KES {finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Promo Form */}
              <form onSubmit={handleApplyPromo} className="pt-2">
                <label className="label text-[10px]">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g. OSOTUA10"
                    disabled={promoApplied}
                    className="input text-xs uppercase font-mono"
                  />
                  <button
                    type="submit"
                    disabled={promoApplied}
                    className="btn btn-outline btn-sm font-mono text-[10px]"
                  >
                    {promoApplied ? "Applied" : "Apply"}
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[10px] text-[#3D6B3E] font-mono mt-1">
                    ✓ Promo applied successfully!
                  </p>
                )}
              </form>

              <Link
                href="/checkout"
                className="btn btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold tracking-wide uppercase"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#1C1208]/40">
                <ShieldCheck size={14} className="text-[#3D6B3E]" />
                <span>Encrypted & Safe Checkout via M-Pesa / Card</span>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
