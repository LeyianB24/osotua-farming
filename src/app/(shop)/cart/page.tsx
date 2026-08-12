"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/shared/CartContext";
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
    <div style={{ background: "#FBF7F0" }}>

      {/* ── HERO BANNER ── */}
      <div
        className="bg-mesh-earth noise"
        style={{ paddingTop: "10rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1rem" }}>
                Shopping Basket
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "clamp(3rem, 6vw, 5.5rem)",
                  fontWeight: 300,
                  color: "#F5EFE4",
                  lineHeight: 1,
                }}
              >
                Your Farm <em style={{ color: "#C4882A", fontStyle: "italic" }}>Order</em>
              </h1>
            </div>

            {cart.length > 0 && (
              <button
                onClick={clearCart}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "rgba(160,67,30,0.12)", border: "1px solid rgba(160,67,30,0.3)",
                  borderRadius: "100px", padding: "0.5rem 1.1rem", color: "#c55f3a",
                  fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.62rem",
                  fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer",
                }}
              >
                <i className="bi bi-trash3-fill" />
                Clear Basket
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <section
        className="bg-mesh-green noise"
        style={{ padding: "5rem 0 8rem" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          {cart.length === 0 ? (
            <div
              className="glass-dark"
              style={{ textAlign: "center", padding: "5rem 2rem", borderRadius: "24px", maxWidth: "560px", margin: "0 auto" }}
            >
              <div
                style={{
                  width: "64px", height: "64px", borderRadius: "50%",
                  background: "rgba(196,136,42,0.15)", border: "1px solid rgba(196,136,42,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem",
                  color: "#C4882A",
                }}
              >
                <i className="bi bi-bag-x-fill" style={{ fontSize: "2rem" }} />
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "2.5rem", fontWeight: 300, color: "#F5EFE4", marginBottom: "0.75rem",
                }}
              >
                Your basket is empty
              </h2>
              <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
                Explore our purebred livestock catalogue or fresh Barn Store produce to add items to your order.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/barn" className="btn-primary">
                  <i className="bi bi-shop" />
                  Shop Barn Store
                </Link>
                <Link href="/breeds" className="btn-ghost">
                  <i className="bi bi-bullseye" />
                  Browse Breeds
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

              {/* Items List */}
              <div className="lg:col-span-7 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="glass-dark"
                    style={{
                      padding: "1.5rem",
                      borderRadius: "16px",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1.25rem",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                      {item.image ? (
                        <div style={{ position: "relative", width: "64px", height: "64px", borderRadius: "12px", overflow: "hidden", background: "rgba(0,0,0,0.3)", flexShrink: 0 }}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div style={{ width: "64px", height: "64px", borderRadius: "12px", background: "rgba(196,136,42,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <i className="bi bi-box-seam" style={{ fontSize: "1.5rem", color: "#C4882A" }} />
                        </div>
                      )}

                      <div>
                        <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C4882A", marginBottom: "0.25rem" }}>
                          {item.categoryName || item.type.toUpperCase()}
                        </div>
                        <h3 style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif", fontSize: "1.4rem", fontWeight: 400, color: "#F5EFE4", lineHeight: 1.1 }}>
                          {item.name}
                        </h3>
                        <div style={{ fontSize: "0.8rem", color: "#5a9e5c", fontFamily: "var(--font-space-grotesk), monospace", fontWeight: 600, marginTop: "0.25rem" }}>
                          KES {item.price.toLocaleString()}{" "}
                          <span style={{ opacity: 0.5, fontWeight: 400, color: "#F5EFE4" }}>/ {item.unit}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                      {/* Quantity Controls */}
                      <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "100px" }}>
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          style={{ padding: "0.4rem 0.8rem", background: "none", border: "none", color: "#F5EFE4", cursor: "pointer" }}
                          aria-label="Decrease quantity"
                        >
                          <i className="bi bi-dash" />
                        </button>
                        <span style={{ padding: "0 0.5rem", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.85rem", fontWeight: 700, color: "#C4882A" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          style={{ padding: "0.4rem 0.8rem", background: "none", border: "none", color: "#F5EFE4", cursor: "pointer" }}
                          aria-label="Increase quantity"
                        >
                          <i className="bi bi-plus" />
                        </button>
                      </div>

                      {/* Total */}
                      <div style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif", fontSize: "1.5rem", fontWeight: 500, color: "#C4882A" }}>
                        KES {(item.price * item.quantity).toLocaleString()}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ background: "none", border: "none", color: "rgba(245,239,228,0.35)", cursor: "pointer", padding: "0.5rem" }}
                        title="Remove item"
                      >
                        <i className="bi bi-x-lg" style={{ fontSize: "1rem" }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary (Sidebar) */}
              <div className="lg:col-span-5">
                <div
                  className="glass-dark"
                  style={{ padding: "2.25rem", borderRadius: "20px", border: "1px solid rgba(196,136,42,0.25)", position: "relative", overflow: "hidden" }}
                >
                  <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1.25rem" }}>
                    Order Summary
                  </div>

                  {/* Promo code */}
                  <form onSubmit={handleApplyPromo} style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code (e.g. OSOTUA10)"
                      style={{
                        flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "10px", padding: "0.65rem 1rem", color: "#F5EFE4", outline: "none", fontSize: "0.82rem",
                        fontFamily: "var(--font-space-grotesk), monospace",
                      }}
                    />
                    <button type="submit" className="btn-ghost" style={{ padding: "0.65rem 1.25rem", fontSize: "0.72rem" }}>
                      Apply
                    </button>
                  </form>

                  {/* Calculations */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(245,239,228,0.6)", fontSize: "0.88rem" }}>
                      <span>Subtotal</span>
                      <span style={{ fontFamily: "var(--font-space-grotesk), monospace", color: "#F5EFE4" }}>KES {cartTotal.toLocaleString()}</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(245,239,228,0.6)", fontSize: "0.88rem" }}>
                      <span>Express Ranch Delivery</span>
                      <span style={{ fontFamily: "var(--font-space-grotesk), monospace", color: "#F5EFE4" }}>
                        {deliveryFee > 0 ? `KES ${deliveryFee.toLocaleString()}` : "Free"}
                      </span>
                    </div>

                    {promoApplied && (
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#5a9e5c", fontSize: "0.88rem" }}>
                        <span>Promo Discount</span>
                        <span style={{ fontFamily: "var(--font-space-grotesk), monospace" }}>- KES {discount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Final Total */}
                  <div style={{ paddingTop: "1.5rem", marginBottom: "2rem" }}>
                    <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,239,228,0.4)", marginBottom: "0.5rem" }}>
                      Total Amount
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                        fontSize: "3rem", fontWeight: 300, color: "#C4882A", lineHeight: 1,
                      }}
                    >
                      KES {finalTotal.toLocaleString()}
                    </div>
                  </div>

                  <Link href="/checkout" className="btn-primary w-full justify-center py-4">
                    <i className="bi bi-shield-lock-fill" />
                    Proceed to Checkout
                    <i className="bi bi-arrow-right" />
                  </Link>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>

    </div>
  );
}
