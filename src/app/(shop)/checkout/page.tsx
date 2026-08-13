"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/shared/CartContext";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<"details" | "payment" | "confirmed">("details");

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card" | "bank">("mpesa");
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  const deliveryFee = cartTotal > 0 ? 500 : 0;
  const grandTotal = cartTotal + deliveryFee;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) {
      alert("Please fill in all delivery details.");
      return;
    }
    setStep("payment");
  };

  const handleCompleteOrder = async () => {
    setIsProcessing(true);
    try {
      const generatedRef = "OST-" + Math.floor(100000 + Math.random() * 900000);
      
      const payload = {
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        type: "PRODUCT",
        totalAmount: grandTotal,
        paymentMethod: paymentMethod.toUpperCase(),
        paymentRef: generatedRef,
        deliveryAddress: address,
        items: cart.map((item) => ({
          productId: item.type === 'product' ? item.id : undefined,
          breedId: item.type === 'breed' ? item.id : undefined,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity,
        })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to complete order");
      }

      setOrderRef(generatedRef);
      setStep("confirmed");
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Something went wrong processing your order.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0 && step !== "confirmed") {
    return (
      <div style={{ background: "#FBF7F0" }} className="pt-32 pb-20 min-h-screen">
        <div className="os-container">
          <div
            className="glass-dark"
            style={{ textAlign: "center", padding: "5rem 2rem", borderRadius: "24px", maxWidth: "520px", margin: "0 auto", border: "1px solid rgba(196,136,42,0.25)" }}
          >
            <i className="bi bi-basket3-fill" style={{ fontSize: "3rem", color: "rgba(196,136,42,0.3)", display: "block", marginBottom: "1.25rem" }} />
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "2.4rem", fontWeight: 300, color: "#F5EFE4", marginBottom: "0.75rem",
              }}
            >
              Your Basket is Empty
            </h2>
            <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.9rem", marginBottom: "2.5rem" }}>
              Please add items to your cart before proceeding to checkout.
            </p>
            <Link href="/barn" className="btn-primary">
              <i className="bi bi-shop" />
              Go to Barn Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FBF7F0" }}>

      {/* ── HERO ── */}
      <div
        className="bg-mesh-earth noise"
        style={{ paddingTop: "10rem", paddingBottom: "4rem", position: "relative", overflow: "hidden" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1rem" }}>
            Secure Checkout
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              fontWeight: 300,
              color: "#F5EFE4",
              lineHeight: 1,
            }}
          >
            Complete Your <em style={{ color: "#C4882A", fontStyle: "italic" }}>Order</em>
          </h1>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <section
        className="bg-mesh-green noise"
        style={{ padding: "4rem 0 8rem" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1, maxWidth: "1000px" }}>

          {/* Step Indicator */}
          <div
            className="glass-dark"
            style={{
              padding: "1.25rem 2rem", borderRadius: "100px", marginBottom: "3rem",
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
              border: "1px solid rgba(196,136,42,0.2)",
            }}
          >
            {[
              { num: 1, label: "Delivery Details", active: step === "details" },
              { num: 2, label: "Payment", active: step === "payment" },
              { num: 3, label: "Confirmation", active: step === "confirmed" },
            ].map((s, idx) => (
              <div key={s.num} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: s.active ? "#C4882A" : "rgba(255,255,255,0.08)",
                    color: s.active ? "#1C1208" : "rgba(245,239,228,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.75rem", fontWeight: 700,
                  }}
                >
                  {s.num}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.65rem", fontWeight: 600,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: s.active ? "#C4882A" : "rgba(245,239,228,0.4)",
                  }}
                >
                  {s.label}
                </span>
                {idx < 2 && <span style={{ color: "rgba(255,255,255,0.15)", marginLeft: "1rem" }}>—</span>}
              </div>
            ))}
          </div>

          {/* STEP 1: DETAILS */}
          {step === "details" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <form
                onSubmit={handleNextToPayment}
                className="lg:col-span-7 glass-dark"
                style={{ padding: "2.5rem", borderRadius: "24px", border: "1px solid rgba(196,136,42,0.25)", display: "flex", flexDirection: "column", gap: "1.25rem" }}
              >
                <h2 style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif", fontSize: "2rem", fontWeight: 300, color: "#F5EFE4", marginBottom: "0.5rem" }}>
                  Delivery Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.5rem" }}>
                      Full Name *
                    </label>
                    <input
                      type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Kiptoo"
                      style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.5rem" }}>
                      Email Address *
                    </label>
                    <input
                      type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com"
                      style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.5rem" }}>
                      Phone (M-Pesa) *
                    </label>
                    <input
                      type="tel" required value={phone} onChange={(e) => { setPhone(e.target.value); if (!mpesaPhone) setMpesaPhone(e.target.value); }} placeholder="0712345678"
                      style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.5rem" }}>
                      Delivery Location *
                    </label>
                    <input
                      type="text" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. Karen / Nairobi / Kajiado"
                      style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <Link href="/cart" className="btn-ghost" style={{ padding: "0.75rem 1.25rem", fontSize: "0.72rem" }}>
                    <i className="bi bi-arrow-left" />
                    Cart
                  </Link>
                  <button type="submit" className="btn-primary">
                    Continue to Payment
                    <i className="bi bi-arrow-right" />
                  </button>
                </div>
              </form>

              {/* Sidebar */}
              <div className="lg:col-span-5">
                <div className="glass-dark" style={{ padding: "2rem", borderRadius: "24px", border: "1px solid rgba(196,136,42,0.25)" }}>
                  <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1rem" }}>
                    Basket Summary ({cart.length})
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "240px", overflowY: "auto", marginBottom: "1.5rem", paddingRight: "0.5rem" }}>
                    {cart.map((item) => (
                      <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "rgba(245,239,228,0.7)" }}>
                        <span>{item.quantity}× {item.name}</span>
                        <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontWeight: 600, color: "#F5EFE4" }}>
                          KES {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.4)" }}>
                      Total Due
                    </span>
                    <span style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif", fontSize: "2rem", fontWeight: 300, color: "#C4882A" }}>
                      KES {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === "payment" && (
            <div className="glass-dark" style={{ padding: "3rem", borderRadius: "24px", border: "1px solid rgba(196,136,42,0.25)", maxWidth: "680px", margin: "0 auto" }}>
              <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "0.75rem" }}>
                Step 2 of 3
              </div>
              <h2 style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif", fontSize: "2.4rem", fontWeight: 300, color: "#F5EFE4", marginBottom: "2rem" }}>
                Select Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {[
                  { key: "mpesa" as const, title: "M-Pesa Express", icon: "bi-phone-fill", sub: "Instant STK Push" },
                  { key: "card" as const, title: "Credit / Debit", icon: "bi-credit-card-fill", sub: "Visa / Mastercard" },
                  { key: "bank" as const, title: "Bank Transfer", icon: "bi-bank2", sub: "EFT / RTGS" },
                ].map((m) => {
                  const active = paymentMethod === m.key
                  return (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setPaymentMethod(m.key)}
                      style={{
                        padding: "1.25rem", borderRadius: "14px", textAlign: "center",
                        background: active ? "rgba(196,136,42,0.18)" : "rgba(255,255,255,0.04)",
                        border: active ? "1px solid #C4882A" : "1px solid rgba(255,255,255,0.08)",
                        cursor: "pointer", transition: "all 0.25s ease",
                      }}
                    >
                      <i className={`bi ${m.icon}`} style={{ fontSize: "1.5rem", color: active ? "#C4882A" : "rgba(245,239,228,0.5)", display: "block", marginBottom: "0.5rem" }} />
                      <div style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif", fontSize: "1.2rem", fontWeight: 400, color: "#F5EFE4" }}>{m.title}</div>
                      <div style={{ fontSize: "0.7rem", color: "rgba(245,239,228,0.4)", marginTop: "0.2rem" }}>{m.sub}</div>
                    </button>
                  )
                })}
              </div>

              {paymentMethod === "mpesa" && (
                <div style={{ background: "rgba(61,107,62,0.15)", border: "1px solid rgba(61,107,62,0.35)", borderRadius: "14px", padding: "1.5rem", marginBottom: "2rem" }}>
                  <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5a9e5c", marginBottom: "0.5rem" }}>
                    M-Pesa Phone Number for STK Push
                  </label>
                  <input
                    type="tel" value={mpesaPhone} onChange={(e) => setMpesaPhone(e.target.value)} placeholder="0712345678"
                    style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(61,107,62,0.4)", borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem" }}
                  />
                  <p style={{ color: "rgba(245,239,228,0.5)", fontSize: "0.78rem", marginTop: "0.75rem" }}>
                    You will receive a prompt on your phone to authorize payment of KES {grandTotal.toLocaleString()}.
                  </p>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button type="button" onClick={() => setStep("details")} className="btn-ghost">
                  <i className="bi bi-arrow-left" />
                  Back
                </button>
                <button type="button" onClick={handleCompleteOrder} disabled={isProcessing} className="btn-primary">
                  {isProcessing ? "Processing..." : `Pay KES ${grandTotal.toLocaleString()}`}
                  <i className="bi bi-check-lg" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CONFIRMED */}
          {step === "confirmed" && (
            <div
              className="glass-dark"
              style={{ textAlign: "center", padding: "5rem 2.5rem", borderRadius: "24px", maxWidth: "600px", margin: "0 auto", border: "1px solid rgba(61,107,62,0.4)" }}
            >
              <div
                style={{
                  width: "64px", height: "64px", borderRadius: "50%",
                  background: "rgba(61,107,62,0.2)", border: "1px solid rgba(61,107,62,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.5rem", color: "#5a9e5c",
                }}
              >
                <i className="bi bi-check-circle-fill" style={{ fontSize: "2rem" }} />
              </div>
              <div className="eyebrow justify-center" style={{ color: "#5a9e5c", marginBottom: "0.75rem" }}>
                Order Confirmed
              </div>
              <h2 style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif", fontSize: "2.8rem", fontWeight: 300, color: "#F5EFE4", marginBottom: "0.5rem" }}>
                Thank You for Your Order!
              </h2>
              <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.9rem", marginBottom: "2rem" }}>
                Order Reference: <strong style={{ color: "#C4882A", fontFamily: "var(--font-space-grotesk), monospace" }}>{orderRef}</strong>
              </p>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/dashboard" className="btn-primary">
                  <i className="bi bi-speedometer2" />
                  View Dashboard Order History
                </Link>
                <Link href="/barn" className="btn-ghost">
                  Return to Barn
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
