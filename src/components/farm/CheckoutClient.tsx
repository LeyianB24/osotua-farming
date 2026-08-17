"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/shared/CartContext";

export default function CheckoutClient() {
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
  const [orderId, setOrderId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const deliveryFee = cartTotal > 0 ? 500 : 0;
  const grandTotal = cartTotal + deliveryFee;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) {
      setErrorMsg("Please fill in all required delivery details.");
      return;
    }
    setErrorMsg("");
    setStep("payment");
  };

  const handleCompleteOrder = async () => {
    setIsProcessing(true);
    setErrorMsg("");
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
          productId: item.type === "product" ? item.id : undefined,
          breedId: item.type === "breed" ? item.id : undefined,
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
        throw new Error("Failed to create order record");
      }

      const orderData = await res.json();
      const savedOrderId = orderData.id || generatedRef;
      setOrderId(savedOrderId);
      setOrderRef(generatedRef);

      // If M-Pesa is selected, trigger STK Push
      if (paymentMethod === "mpesa") {
        try {
          await fetch("/api/payments/mpesa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone: mpesaPhone || phone,
              orderId: savedOrderId,
            }),
          });
        } catch (mpesaErr) {
          console.warn("STK Push triggered in sandbox mode:", mpesaErr);
        }
      }

      setStep("confirmed");
      clearCart();
    } catch (err) {
      console.error(err);
      setErrorMsg("Unable to process your order. Please check your details and try again.");
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
            style={{
              textAlign: "center",
              padding: "5rem 2rem",
              borderRadius: "24px",
              maxWidth: "520px",
              margin: "0 auto",
              border: "1px solid rgba(196,136,42,0.25)",
            }}
          >
            <i
              className="bi bi-basket3-fill"
              style={{
                fontSize: "3rem",
                color: "rgba(196,136,42,0.3)",
                display: "block",
                marginBottom: "1.25rem",
              }}
            />
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "2.4rem",
                fontWeight: 300,
                color: "#F5EFE4",
                marginBottom: "0.75rem",
              }}
            >
              Your Basket is Empty
            </h2>
            <p
              style={{
                color: "rgba(245,239,228,0.55)",
                fontSize: "0.9rem",
                marginBottom: "2.5rem",
              }}
            >
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
        style={{
          paddingTop: "10rem",
          paddingBottom: "4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1rem" }}>
            Secure Checkout
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 300,
              color: "#F5EFE4",
              marginBottom: "1rem",
              lineHeight: 1.1,
            }}
          >
            Complete Your <em style={{ color: "#C4882A" }}>Osotua Order</em>
          </h1>
          <p
            style={{
              color: "rgba(245,239,228,0.65)",
              fontSize: "1rem",
              maxWidth: "520px",
              lineHeight: 1.7,
            }}
          >
            Direct cold-chain delivery and pedigree livestock transport from Kajiado County.
          </p>

          {/* Stepper */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              marginTop: "2.5rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { id: "details", label: "1. Delivery Details" },
              { id: "payment", label: "2. Payment Selection" },
              { id: "confirmed", label: "3. Confirmation" },
            ].map((s, idx) => {
              const active = step === s.id;
              const passed =
                (s.id === "details" && (step === "payment" || step === "confirmed")) ||
                (s.id === "payment" && step === "confirmed");

              return (
                <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-space-grotesk), monospace",
                      fontWeight: 600,
                      background: active
                        ? "#C4882A"
                        : passed
                        ? "#3D6B3E"
                        : "rgba(255,255,255,0.08)",
                      color: active || passed ? "#1C1208" : "rgba(245,239,228,0.4)",
                      border: active
                        ? "1px solid #C4882A"
                        : passed
                        ? "1px solid #3D6B3E"
                        : "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    {passed ? <i className="bi bi-check-lg" /> : idx + 1}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-space-grotesk), monospace",
                      fontSize: "0.68rem",
                      fontWeight: active ? 600 : 400,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: active ? "#F5EFE4" : passed ? "#5a9e5c" : "rgba(245,239,228,0.4)",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── FORM CONTENT ── */}
      <section style={{ padding: "4rem 0 6rem" }}>
        <div className="os-container">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-[#A0431E]/20 border border-[#A0431E]/40 text-[#F5EFE4] text-sm flex items-center gap-3 max-w-4xl mx-auto">
              <i className="bi bi-exclamation-triangle-fill text-[#A0431E] text-lg" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: DETAILS */}
          {step === "details" && (
            <form onSubmit={handleNextToPayment} style={{ maxWidth: "800px", margin: "0 auto" }}>
              <div
                className="glass-dark"
                style={{
                  padding: "3rem",
                  borderRadius: "24px",
                  border: "1px solid rgba(196,136,42,0.25)",
                }}
              >
                <div
                  className="eyebrow"
                  style={{ color: "#C4882A", marginBottom: "0.75rem" }}
                >
                  Step 1
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 300,
                    color: "#F5EFE4",
                    marginBottom: "2rem",
                  }}
                >
                  Recipient &amp; Delivery Destination
                </h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-space-grotesk), monospace",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "rgba(245,239,228,0.6)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kiprono Koech"
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "10px",
                        padding: "0.875rem 1.125rem",
                        color: "#F5EFE4",
                        outline: "none",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-space-grotesk), monospace",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "rgba(245,239,228,0.6)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.co.ke"
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "10px",
                        padding: "0.875rem 1.125rem",
                        color: "#F5EFE4",
                        outline: "none",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-space-grotesk), monospace",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "rgba(245,239,228,0.6)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+254 700 000 000"
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "10px",
                        padding: "0.875rem 1.125rem",
                        color: "#F5EFE4",
                        outline: "none",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-space-grotesk), monospace",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "rgba(245,239,228,0.6)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Physical Delivery Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Karen Plains, House 4B, Nairobi"
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "10px",
                        padding: "0.875rem 1.125rem",
                        color: "#F5EFE4",
                        outline: "none",
                        fontSize: "0.9rem",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "3rem",
                    paddingTop: "2rem",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Link href="/cart" className="btn-ghost">
                    <i className="bi bi-arrow-left" />
                    Review Cart
                  </Link>
                  <button type="submit" className="btn-primary">
                    Proceed to Payment
                    <i className="bi bi-arrow-right" />
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT */}
          {step === "payment" && (
            <div
              className="glass-dark"
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: "3rem",
                borderRadius: "24px",
                border: "1px solid rgba(196,136,42,0.25)",
              }}
            >
              <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "0.75rem" }}>
                Step 2
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "2rem",
                  fontWeight: 300,
                  color: "#F5EFE4",
                  marginBottom: "2rem",
                }}
              >
                Choose Payment Instrument
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                  marginBottom: "2.5rem",
                }}
              >
                {[
                  { id: "mpesa", title: "M-Pesa STK Push", sub: "Instant Daraja prompt", icon: "bi-phone" },
                  { id: "card", title: "Credit / Debit Card", sub: "Visa, Mastercard, Amex", icon: "bi-credit-card" },
                  { id: "bank", title: "Direct Bank Transfer", sub: "RTGS / Wire", icon: "bi-bank" },
                ].map((m) => {
                  const active = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as "mpesa" | "card" | "bank")}
                      style={{
                        padding: "1.5rem",
                        borderRadius: "16px",
                        textAlign: "left",
                        background: active ? "rgba(196,136,42,0.18)" : "rgba(255,255,255,0.04)",
                        border: active ? "1px solid #C4882A" : "1px solid rgba(255,255,255,0.08)",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                      }}
                    >
                      <i
                        className={`bi ${m.icon}`}
                        style={{
                          fontSize: "1.5rem",
                          color: active ? "#C4882A" : "rgba(245,239,228,0.5)",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      />
                      <div
                        style={{
                          fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                          fontSize: "1.2rem",
                          fontWeight: 400,
                          color: "#F5EFE4",
                        }}
                      >
                        {m.title}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "rgba(245,239,228,0.4)", marginTop: "0.2rem" }}>
                        {m.sub}
                      </div>
                    </button>
                  );
                })}
              </div>

              {paymentMethod === "mpesa" && (
                <div
                  style={{
                    background: "rgba(61,107,62,0.15)",
                    border: "1px solid rgba(61,107,62,0.35)",
                    borderRadius: "14px",
                    padding: "1.5rem",
                    marginBottom: "2rem",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-space-grotesk), monospace",
                      fontSize: "0.58rem",
                      fontWeight: 600,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#5a9e5c",
                      marginBottom: "0.5rem",
                    }}
                  >
                    M-Pesa Phone Number for STK Push
                  </label>
                  <input
                    type="tel"
                    value={mpesaPhone || phone}
                    onChange={(e) => setMpesaPhone(e.target.value)}
                    placeholder="0712345678"
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(61,107,62,0.4)",
                      borderRadius: "10px",
                      padding: "0.875rem 1.125rem",
                      color: "#F5EFE4",
                      outline: "none",
                      fontSize: "0.9rem",
                    }}
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
                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  disabled={isProcessing}
                  className="btn-primary"
                >
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
              style={{
                textAlign: "center",
                padding: "5rem 2.5rem",
                borderRadius: "24px",
                maxWidth: "600px",
                margin: "0 auto",
                border: "1px solid rgba(61,107,62,0.4)",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(61,107,62,0.2)",
                  border: "1px solid rgba(61,107,62,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  color: "#5a9e5c",
                }}
              >
                <i className="bi bi-check-circle-fill" style={{ fontSize: "2rem" }} />
              </div>
              <div className="eyebrow justify-center" style={{ color: "#5a9e5c", marginBottom: "0.75rem" }}>
                Order Confirmed
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "2.8rem",
                  fontWeight: 300,
                  color: "#F5EFE4",
                  marginBottom: "0.5rem",
                }}
              >
                Thank You for Your Order!
              </h2>
              <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.9rem", marginBottom: "2rem" }}>
                Order Reference:{" "}
                <strong
                  style={{ color: "#C4882A", fontFamily: "var(--font-space-grotesk), monospace" }}
                >
                  {orderRef}
                </strong>
              </p>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href={orderId ? `/orders/${orderId}` : "/dashboard"} className="btn-primary">
                  <i className="bi bi-speedometer2" />
                  Track Order Status
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
