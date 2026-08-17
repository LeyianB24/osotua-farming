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
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "rgba(160,67,30,0.12)",
                  border: "1px solid rgba(160,67,30,0.3)",
                  borderRadius: "100px",
                  padding: "0.5rem 1.1rem",
                  color: "#c55f3a",
                  fontFamily: "var(--font-space-grotesk), monospace",
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
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
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(196,136,42,0.15)",
                  border: "1px solid rgba(196,136,42,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  color: "#C4882A",
                }}
              >
                <i className="bi bi-bag-x-fill" style={{ fontSize: "2rem" }} />
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "2.5rem",
                  fontWeight: 300,
                  color: "#F5EFE4",
                  marginBottom: "0.75rem",
                }}
              >
                Your Basket is Currently Empty
              </h2>
              <p
                style={{
                  color: "rgba(245,239,228,0.55)",
                  fontSize: "0.95rem",
                  maxWidth: "380px",
                  margin: "0 auto 2.5rem",
                  lineHeight: 1.6,
                }}
              >
                Explore our selection of pasture-raised beef, organic dairy, pure rangeland honey, or reserve pedigree livestock.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/barn" className="btn-primary">
                  <i className="bi bi-shop" />
                  Visit Barn Store
                </Link>
                <Link href="/breeds" className="btn-ghost">
                  <i className="bi bi-heart-pulse" />
                  View Livestock Breeds
                </Link>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "3rem",
                alignItems: "start",
              }}
              className="lg:grid-cols-[1fr_380px]"
            >
              {/* Items List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {cart.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="glass-dark"
                      style={{
                        padding: "1.5rem 2rem",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "1.5rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {/* Image */}
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "14px",
                          overflow: "hidden",
                          position: "relative",
                          flexShrink: 0,
                          background: "#1C1208",
                          border: "1px solid rgba(196,136,42,0.2)",
                        }}
                      >
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#C4882A",
                            }}
                          >
                            <i className="bi bi-box-seam" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div style={{ flex: "1 1 200px" }}>
                        <div
                          style={{
                            fontFamily: "var(--font-space-grotesk), monospace",
                            fontSize: "0.58rem",
                            fontWeight: 600,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "#C4882A",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {item.type === "breed" ? "Pedigree Livestock" : item.categoryName || "Artisanal Product"}
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                            fontSize: "1.4rem",
                            fontWeight: 400,
                            color: "#F5EFE4",
                            lineHeight: 1.2,
                          }}
                        >
                          {item.name}
                        </h3>
                        <div
                          style={{
                            fontFamily: "var(--font-space-grotesk), monospace",
                            fontSize: "0.85rem",
                            color: "rgba(245,239,228,0.5)",
                            marginTop: "0.35rem",
                          }}
                        >
                          KES {item.price.toLocaleString()} / {item.unit || "unit"}
                        </div>
                      </div>

                      {/* Quantity Controller */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "100px",
                          padding: "0.25rem 0.5rem",
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: "transparent",
                            border: "none",
                            color: "#F5EFE4",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          aria-label="Decrease quantity"
                        >
                          <i className="bi bi-dash" />
                        </button>
                        <span
                          style={{
                            fontFamily: "var(--font-space-grotesk), monospace",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            minWidth: "24px",
                            textAlign: "center",
                            color: "#F5EFE4",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: "transparent",
                            border: "none",
                            color: "#F5EFE4",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          aria-label="Increase quantity"
                        >
                          <i className="bi bi-plus" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <div
                        style={{
                          fontFamily: "var(--font-space-grotesk), monospace",
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "#C4882A",
                          minWidth: "110px",
                          textAlign: "right",
                        }}
                      >
                        KES {(item.price * item.quantity).toLocaleString()}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "rgba(245,239,228,0.3)",
                          cursor: "pointer",
                          padding: "0.5rem",
                          transition: "color 0.2s ease",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A0431E")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(245,239,228,0.3)")}
                        aria-label="Remove item"
                      >
                        <i className="bi bi-x-lg text-sm" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary Sidebar */}
              <div
                className="glass-dark"
                style={{
                  padding: "2.5rem 2rem",
                  borderRadius: "24px",
                  border: "1px solid rgba(196,136,42,0.25)",
                  position: "sticky",
                  top: "100px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "1.8rem",
                    fontWeight: 300,
                    color: "#F5EFE4",
                    marginBottom: "1.5rem",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    paddingBottom: "1rem",
                  }}
                >
                  Order Summary
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "rgba(245,239,228,0.7)" }}>
                    <span>Subtotal</span>
                    <span style={{ fontFamily: "var(--font-space-grotesk), monospace", color: "#F5EFE4" }}>
                      KES {cartTotal.toLocaleString()}
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "rgba(245,239,228,0.7)" }}>
                    <span>Cold-Chain Delivery</span>
                    <span style={{ fontFamily: "var(--font-space-grotesk), monospace", color: "#F5EFE4" }}>
                      KES {deliveryFee.toLocaleString()}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#5a9e5c" }}>
                      <span>Discount (Promo)</span>
                      <span style={{ fontFamily: "var(--font-space-grotesk), monospace" }}>
                        - KES {discount.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div
                    style={{
                      borderTop: "1px solid rgba(196,136,42,0.2)",
                      paddingTop: "1rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-space-grotesk), monospace",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "rgba(245,239,228,0.6)",
                      }}
                    >
                      Total Amount
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                        fontSize: "2.2rem",
                        fontWeight: 600,
                        color: "#C4882A",
                      }}
                    >
                      KES {finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Promo Input */}
                <form onSubmit={handleApplyPromo} style={{ marginBottom: "2rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input
                      type="text"
                      placeholder="Promo Code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "8px",
                        padding: "0.6rem 0.9rem",
                        color: "#F5EFE4",
                        fontSize: "0.8rem",
                        flex: 1,
                        outline: "none",
                        fontFamily: "var(--font-space-grotesk), monospace",
                      }}
                    />
                    <button
                      type="submit"
                      disabled={promoApplied || !promoCode}
                      style={{
                        background: promoApplied ? "#3D6B3E" : "rgba(196,136,42,0.2)",
                        border: "1px solid rgba(196,136,42,0.4)",
                        borderRadius: "8px",
                        padding: "0.6rem 1rem",
                        color: "#F5EFE4",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        fontFamily: "var(--font-space-grotesk), monospace",
                      }}
                    >
                      {promoApplied ? "Applied" : "Apply"}
                    </button>
                  </div>
                  {promoError && (
                    <p style={{ color: "#A0431E", fontSize: "0.75rem", marginTop: "0.5rem" }}>{promoError}</p>
                  )}
                  {promoApplied && (
                    <p style={{ color: "#5a9e5c", fontSize: "0.75rem", marginTop: "0.5rem" }}>
                      Coupon code successfully activated!
                    </p>
                  )}
                </form>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "1rem" }}
                >
                  Proceed to Checkout
                  <i className="bi bi-arrow-right" />
                </Link>

                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(245,239,228,0.4)",
                    textAlign: "center",
                    marginTop: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                  }}
                >
                  <i className="bi bi-shield-lock" />
                  M-Pesa STK Push &amp; Card Protected
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
