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
    <div style={{ background: "#FBF7F0", minHeight: "100vh" }}>
      {/* ── HERO BANNER ── */}
      <div
        className="bg-mesh-earth noise"
        style={{ paddingTop: "10rem", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div className="eyebrow" style={{ color: "#8E5E16", marginBottom: "1rem", fontWeight: 700 }}>
                Shopping Basket
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "clamp(3rem, 6vw, 5.5rem)",
                  fontWeight: 400,
                  color: "#1C1208",
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
                  background: "rgba(194,65,12,0.1)",
                  border: "1px solid rgba(194,65,12,0.3)",
                  borderRadius: "100px",
                  padding: "0.5rem 1.1rem",
                  color: "#C2410C",
                  fontFamily: "var(--font-space-grotesk), monospace",
                  fontSize: "0.65rem",
                  fontWeight: 700,
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
        style={{ padding: "4rem 0 8rem" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          {cart.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "5rem 2rem",
                borderRadius: "28px",
                maxWidth: "560px",
                margin: "0 auto",
                background: "#FFFFFF",
                border: "1px solid rgba(196, 136, 42, 0.22)",
                boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(196,136,42,0.12)",
                  border: "1px solid rgba(196,136,42,0.25)",
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
                  fontWeight: 400,
                  color: "#1C1208",
                  marginBottom: "0.75rem",
                }}
              >
                Your Basket is Currently Empty
              </h2>
              <p
                style={{
                  color: "#5C4835",
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
                      style={{
                        padding: "1.5rem 2rem",
                        borderRadius: "24px",
                        display: "flex",
                        alignItems: "center",
                        gap: "1.5rem",
                        flexWrap: "wrap",
                        background: "#FFFFFF",
                        border: "1px solid rgba(196, 136, 42, 0.22)",
                        boxShadow: "0 8px 24px rgba(196, 136, 42, 0.06)",
                      }}
                    >
                      {/* Image */}
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "16px",
                          overflow: "hidden",
                          position: "relative",
                          flexShrink: 0,
                          background: "#FAF6EE",
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
                            <i className="bi bi-box-seam text-2xl" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div style={{ flex: "1 1 200px" }}>
                        <div
                          style={{
                            fontFamily: "var(--font-space-grotesk), monospace",
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "#8E5E16",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {item.type === "breed" ? "Pedigree Livestock" : item.categoryName || "Artisanal Product"}
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                            fontSize: "1.4rem",
                            fontWeight: 500,
                            color: "#1C1208",
                            lineHeight: 1.2,
                          }}
                        >
                          {item.name}
                        </h3>
                        <div
                          style={{
                            fontFamily: "var(--font-space-grotesk), monospace",
                            fontSize: "0.85rem",
                            color: "#786550",
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
                          background: "#FAF6EE",
                          border: "1px solid rgba(196, 136, 42, 0.25)",
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
                            color: "#1C1208",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          aria-label="Decrease quantity"
                        >
                          <i className="bi bi-dash font-bold" />
                        </button>
                        <span
                          style={{
                            fontFamily: "var(--font-space-grotesk), monospace",
                            fontSize: "0.85rem",
                            fontWeight: 700,
                            minWidth: "24px",
                            textAlign: "center",
                            color: "#1C1208",
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
                            color: "#1C1208",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          aria-label="Increase quantity"
                        >
                          <i className="bi bi-plus font-bold" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <div
                        style={{
                          fontFamily: "var(--font-space-grotesk), monospace",
                          fontSize: "1.15rem",
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
                          color: "#786550",
                          cursor: "pointer",
                          padding: "0.5rem",
                          transition: "color 0.2s ease",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#C2410C")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#786550")}
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
                style={{
                  padding: "2.5rem 2rem",
                  borderRadius: "28px",
                  background: "#FFFFFF",
                  border: "1px solid rgba(196, 136, 42, 0.25)",
                  boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
                  position: "sticky",
                  top: "100px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "1.8rem",
                    fontWeight: 400,
                    color: "#1C1208",
                    marginBottom: "1.5rem",
                    borderBottom: "1px solid rgba(196, 136, 42, 0.15)",
                    paddingBottom: "1rem",
                  }}
                >
                  Order Summary
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#5C4835" }}>
                    <span>Subtotal</span>
                    <span style={{ fontFamily: "var(--font-space-grotesk), monospace", color: "#1C1208", fontWeight: 600 }}>
                      KES {cartTotal.toLocaleString()}
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#5C4835" }}>
                    <span>Cold-Chain Delivery</span>
                    <span style={{ fontFamily: "var(--font-space-grotesk), monospace", color: "#1C1208", fontWeight: 600 }}>
                      KES {deliveryFee.toLocaleString()}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#2E7D32", fontWeight: 600 }}>
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
                        color: "#8E5E16",
                        fontWeight: 700,
                      }}
                    >
                      Total Amount
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                        fontSize: "2.4rem",
                        fontWeight: 700,
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
                        background: "#FAF6EE",
                        border: "1px solid rgba(196, 136, 42, 0.25)",
                        borderRadius: "12px",
                        padding: "0.6rem 0.9rem",
                        color: "#1C1208",
                        fontSize: "0.85rem",
                        flex: 1,
                        outline: "none",
                        fontFamily: "var(--font-space-grotesk), monospace",
                      }}
                    />
                    <button
                      type="submit"
                      disabled={promoApplied || !promoCode}
                      style={{
                        background: promoApplied ? "#2E7D32" : "#C4882A",
                        border: "none",
                        borderRadius: "12px",
                        padding: "0.6rem 1.1rem",
                        color: "#FFFFFF",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "var(--font-space-grotesk), monospace",
                      }}
                    >
                      {promoApplied ? "Applied" : "Apply"}
                    </button>
                  </div>
                  {promoError && (
                    <p style={{ color: "#C2410C", fontSize: "0.75rem", marginTop: "0.5rem" }}>{promoError}</p>
                  )}
                  {promoApplied && (
                    <p style={{ color: "#2E7D32", fontSize: "0.75rem", marginTop: "0.5rem", fontWeight: 600 }}>
                      Coupon code successfully activated!
                    </p>
                  )}
                </form>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="btn-primary w-full justify-center py-3.5 shadow-sm text-sm"
                >
                  Proceed to Checkout
                  <i className="bi bi-arrow-right" />
                </Link>

                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#786550",
                    textAlign: "center",
                    marginTop: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                  }}
                >
                  <i className="bi bi-shield-lock text-[#2E7D32]" />
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
