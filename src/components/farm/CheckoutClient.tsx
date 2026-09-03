"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/shared/CartContext";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const { cart, cartTotal, clearCart, addToCart } = useCart();
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
  const [mpesaPollingStatus, setMpesaPollingStatus] = useState<"idle" | "sent" | "waiting_pin" | "confirmed">("idle");

  // Hydrate searchParams (e.g. /checkout?product=xyz or /checkout?breed=abc)
  useEffect(() => {
    const productId = searchParams.get("product");
    const breedId = searchParams.get("breed");

    if (productId && cart.every((i) => i.id !== productId)) {
      fetch(`/api/products/${productId}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) {
            addToCart({
              id: data.id,
              name: data.name,
              price: data.price,
              unit: data.unit,
              image: data.image,
              categoryName: data.category?.name,
              type: "product",
            });
          }
        })
        .catch(() => {});
    } else if (breedId && cart.every((i) => i.id !== breedId)) {
      fetch(`/api/breeds/${breedId}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) {
            addToCart({
              id: data.id,
              name: data.name,
              price: data.pricePerHead,
              unit: "head",
              image: data.image,
              categoryName: data.species?.name,
              type: "breed",
            });
          }
        })
        .catch(() => {});
    }
  }, [searchParams, cart, addToCart]);

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
        type: cart.some((i) => i.type === "breed") ? "MIXED" : "PRODUCT",
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

      // If M-Pesa is selected, trigger STK Push & Start Status Polling
      if (paymentMethod === "mpesa") {
        setMpesaPollingStatus("sent");
        try {
          await fetch("/api/payments/mpesa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone: mpesaPhone || phone,
              orderId: savedOrderId,
            }),
          });
          setMpesaPollingStatus("waiting_pin");

          // Start polling order status
          let attempts = 0;
          const interval = setInterval(async () => {
            attempts++;
            if (attempts > 12) {
              clearInterval(interval);
              return;
            }
            try {
              const checkRes = await fetch(`/api/payments/mpesa/status?orderId=${savedOrderId}`);
              if (checkRes.ok) {
                const checkData = await checkRes.json();
                if (checkData.isPaid) {
                  setMpesaPollingStatus("confirmed");
                  clearInterval(interval);
                }
              }
            } catch {
              // Ignore polling errors
            }
          }, 3500);
        } catch (mpesaErr) {
          console.warn("STK Push initiated:", mpesaErr);
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
            style={{
              textAlign: "center",
              padding: "5rem 2rem",
              borderRadius: "28px",
              maxWidth: "520px",
              margin: "0 auto",
              background: "#FFFFFF",
              border: "1px solid rgba(196, 136, 42, 0.25)",
              boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
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
                fontWeight: 400,
                color: "#1C1208",
                marginBottom: "0.75rem",
              }}
            >
              Your Basket is Empty
            </h2>
            <p
              style={{
                color: "#5C4835",
                fontSize: "0.9rem",
                marginBottom: "2.5rem",
              }}
            >
              Please add fresh produce or purebred livestock to your cart before proceeding.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/barn" className="btn-primary">
                <i className="bi bi-shop" />
                Go to Barn Store
              </Link>
              <Link href="/breeds" className="btn-ghost" style={{ borderColor: "rgba(196,136,42,0.3)", color: "#1C1208" }}>
                <i className="bi bi-shield-check" />
                Browse Breeds
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FBF7F0", minHeight: "100vh" }}>
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
          <div className="eyebrow" style={{ color: "#8E5E16", marginBottom: "1rem", fontWeight: 700 }}>
            Secure Checkout
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
              color: "#1C1208",
              marginBottom: "1rem",
              lineHeight: 1.1,
            }}
          >
            Complete Your <em style={{ color: "#C4882A" }}>Osotua Order</em>
          </h1>
          <p
            style={{
              color: "#5C4835",
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
                      fontWeight: 700,
                      background: active
                        ? "#C4882A"
                        : passed
                        ? "#2E7D32"
                        : "#FAF6EE",
                      color: active || passed ? "#FFFFFF" : "#786550",
                      border: active
                        ? "1px solid #C4882A"
                        : passed
                        ? "1px solid #2E7D32"
                        : "1px solid rgba(196, 136, 42, 0.25)",
                    }}
                  >
                    {passed ? <i className="bi bi-check-lg" /> : idx + 1}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-space-grotesk), monospace",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: active ? "#1C1208" : passed ? "#2E7D32" : "#786550",
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
            <div className="mb-6 p-4 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-sm flex items-center gap-3 max-w-4xl mx-auto">
              <i className="bi bi-exclamation-triangle-fill text-[#DC2626] text-lg" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: DETAILS */}
          {step === "details" && (
            <form onSubmit={handleNextToPayment} style={{ maxWidth: "800px", margin: "0 auto" }}>
              <div
                style={{
                  padding: "3rem",
                  borderRadius: "28px",
                  background: "#FFFFFF",
                  border: "1px solid rgba(196, 136, 42, 0.25)",
                  boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
                }}
              >
                <div className="eyebrow" style={{ color: "#8E5E16", marginBottom: "0.75rem", fontWeight: 700 }}>
                  Step 1
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "2.2rem",
                    fontWeight: 400,
                    color: "#1C1208",
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
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#8E5E16",
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
                      placeholder="e.g. Moses Ole Sironka"
                      className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-space-grotesk), monospace",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#8E5E16",
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
                      placeholder="moses@example.co.ke"
                      className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-space-grotesk), monospace",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#8E5E16",
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
                      className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-space-grotesk), monospace",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#8E5E16",
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
                      className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
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
                    borderTop: "1px solid rgba(196, 136, 42, 0.15)",
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
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: "3rem",
                borderRadius: "28px",
                background: "#FFFFFF",
                border: "1px solid rgba(196, 136, 42, 0.25)",
                boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
              }}
            >
              <div className="eyebrow" style={{ color: "#8E5E16", marginBottom: "0.75rem", fontWeight: 700 }}>
                Step 2
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "2.2rem",
                  fontWeight: 400,
                  color: "#1C1208",
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
                  { id: "mpesa", title: "M-Pesa STK Push", sub: "Instant Daraja prompt on your phone", icon: "bi-phone" },
                  { id: "card", title: "Credit / Debit Card", sub: "Visa, Mastercard, Amex", icon: "bi-credit-card" },
                  { id: "bank", title: "Direct Bank Transfer", sub: "KCB Bank RTGS / Wire", icon: "bi-bank" },
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
                        background: active ? "linear-gradient(135deg, #C4882A, #D99A30)" : "#FAF6EE",
                        border: active ? "1px solid #C4882A" : "1px solid rgba(196, 136, 42, 0.2)",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        boxShadow: active ? "0 4px 16px rgba(196,136,42,0.25)" : "none",
                      }}
                    >
                      <i
                        className={`bi ${m.icon}`}
                        style={{
                          fontSize: "1.5rem",
                          color: active ? "#FFFFFF" : "#C4882A",
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      />
                      <div
                        style={{
                          fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                          fontSize: "1.3rem",
                          fontWeight: 500,
                          color: active ? "#FFFFFF" : "#1C1208",
                        }}
                      >
                        {m.title}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: active ? "rgba(255,255,255,0.85)" : "#786550", marginTop: "0.2rem" }}>
                        {m.sub}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* M-PESA PROMPT BOX */}
              {paymentMethod === "mpesa" && (
                <div
                  style={{
                    background: "#FAF8F5",
                    border: "1px solid rgba(46, 125, 50, 0.35)",
                    borderRadius: "18px",
                    padding: "1.5rem",
                    marginBottom: "2rem",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-space-grotesk), monospace",
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#2E7D32",
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
                    className="w-full bg-[#FFFFFF] border border-[#2E7D32]/40 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#2E7D32]"
                  />
                  <p style={{ color: "#5C4835", fontSize: "0.8rem", marginTop: "0.75rem" }}>
                    An instant STK Push prompt will appear on this handset to authorize payment of KES {grandTotal.toLocaleString()}.
                  </p>
                </div>
              )}

              {/* BANK TRANSFER DETAILS BOX */}
              {paymentMethod === "bank" && (
                <div
                  style={{
                    background: "#FAF8F5",
                    border: "1px solid rgba(196, 136, 42, 0.3)",
                    borderRadius: "18px",
                    padding: "1.5rem",
                    marginBottom: "2rem",
                  }}
                >
                  <div className="eyebrow text-[#8E5E16] mb-2 font-bold">Ranch Banking Details</div>
                  <div className="grid grid-cols-2 gap-3 text-xs text-[#1C1208]">
                    <div>
                      <span className="text-[#786550] block text-[10px] font-mono uppercase">Bank Name</span>
                      <strong>KCB Bank Kenya</strong>
                    </div>
                    <div>
                      <span className="text-[#786550] block text-[10px] font-mono uppercase">Account Name</span>
                      <strong>Osotua Farming Limited</strong>
                    </div>
                    <div>
                      <span className="text-[#786550] block text-[10px] font-mono uppercase">Account Number</span>
                      <strong className="font-mono">1289 3847 2901</strong>
                    </div>
                    <div>
                      <span className="text-[#786550] block text-[10px] font-mono uppercase">Branch / Swift</span>
                      <strong>Kajiado / KCBLKENX</strong>
                    </div>
                  </div>
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
                  className="btn-primary shadow-sm"
                >
                  {isProcessing ? (
                    <>
                      <i className="bi bi-arrow-repeat animate-spin" />
                      <span>Initiating Order...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay KES {grandTotal.toLocaleString()}</span>
                      <i className="bi bi-check-lg" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CONFIRMED */}
          {step === "confirmed" && (
            <div
              style={{
                textAlign: "center",
                padding: "5rem 2.5rem",
                borderRadius: "28px",
                maxWidth: "640px",
                margin: "0 auto",
                background: "#FFFFFF",
                border: "1px solid rgba(46, 125, 50, 0.35)",
                boxShadow: "0 16px 48px rgba(46, 125, 50, 0.08)",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(46, 125, 50, 0.15)",
                  border: "1px solid rgba(46, 125, 50, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  color: "#2E7D32",
                }}
              >
                <i className="bi bi-check-circle-fill" style={{ fontSize: "2rem" }} />
              </div>
              <div className="eyebrow justify-center" style={{ color: "#2E7D32", marginBottom: "0.75rem", fontWeight: 700 }}>
                Order Confirmed
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "2.8rem",
                  fontWeight: 400,
                  color: "#1C1208",
                  marginBottom: "0.5rem",
                }}
              >
                Thank You for Your Order!
              </h2>
              <p style={{ color: "#5C4835", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                Order Reference:{" "}
                <strong
                  style={{ color: "#C4882A", fontFamily: "var(--font-space-grotesk), monospace" }}
                >
                  {orderRef}
                </strong>
              </p>

              {/* M-Pesa Live Feedback banner */}
              {paymentMethod === "mpesa" && (
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#2E7D32]/30 text-xs mb-6 max-w-md mx-auto text-left flex items-center gap-3">
                  <i
                    className={`bi ${
                      mpesaPollingStatus === "confirmed"
                        ? "bi-patch-check-fill text-[#2E7D32]"
                        : "bi-arrow-repeat animate-spin text-[#C4882A]"
                    } text-xl`}
                  />
                  <div>
                    <span className="font-bold text-[#1C1208] block">
                      {mpesaPollingStatus === "confirmed"
                        ? "M-Pesa Payment Received!"
                        : "STK Prompt Dispatched to Handset"}
                    </span>
                    <span className="text-[#5C4835] text-[11px]">
                      {mpesaPollingStatus === "confirmed"
                        ? "Your payment was verified. Cold-chain packing is now in progress."
                        : `Please enter your M-Pesa PIN on ${mpesaPhone || phone} to authorize KES ${grandTotal.toLocaleString()}.`}
                    </span>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href={orderId ? `/orders/${orderId}` : "/dashboard"} className="btn-primary shadow-sm">
                  <i className="bi bi-speedometer2" />
                  Track Live Dispatch Status
                </Link>
                <Link href="/barn" className="btn-ghost" style={{ borderColor: "rgba(196,136,42,0.3)", color: "#1C1208" }}>
                  Return to Barn Store
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function CheckoutClient() {
  return (
    <Suspense
      fallback={
        <div style={{ background: "#FBF7F0", minHeight: "100vh" }} className="pt-32 text-center text-sm font-mono text-[#8E5E16]">
          Loading Osotua Checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
