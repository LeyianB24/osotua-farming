"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
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

  const deliveryFee = 0; // Complimentary rangeland cold transit
  const grandTotal = cartTotal + deliveryFee;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) {
      setErrorMsg("Please provide all required delivery details before proceeding.");
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
        throw new Error("Failed to record order in ledger");
      }

      const orderData = await res.json();
      const savedOrderId = orderData.id || generatedRef;
      setOrderId(savedOrderId);
      setOrderRef(generatedRef);

      // Trigger M-Pesa STK Push
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

          // Poll payment verification status
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
            } catch {}
          }, 3500);
        } catch (mpesaErr) {
          console.warn("STK Push triggered:", mpesaErr);
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
      <div style={{ background: "#FBF7F0", minHeight: "100vh" }} className="pt-36 pb-24 text-[#1C1208]">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFFFF] border border-[#C4882A]/25 shadow-xl shadow-[#1C1208]/04">
            <div className="w-16 h-16 rounded-2xl bg-[#C4882A]/12 border border-[#C4882A]/30 flex items-center justify-center text-[#C4882A] text-2xl mx-auto mb-4">
              <i className="bi bi-basket3" />
            </div>
            <h2 className="font-serif text-3xl font-normal text-[#1C1208] mb-2">
              Your Basket is Empty
            </h2>
            <p className="text-xs text-[#5C4835] leading-relaxed mb-6">
              Select premium cold-pack cuts, dairy jars, or purebred livestock from the Barn Store to proceed to checkout.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/barn" className="btn-primary text-xs py-2.5 px-5">
                <i className="bi bi-shop" />
                <span>Visit Barn Store</span>
              </Link>
              <Link href="/breeds" className="btn-ghost text-xs py-2.5 px-5" style={{ color: "#1C1208" }}>
                <span>Browse Breeds</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FBF7F0", minHeight: "100vh" }} className="pt-28 pb-24 text-[#1C1208]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#C4882A]/12 border border-[#C4882A]/30 text-[#8E5E16] mb-2">
            <i className="bi bi-shield-lock-fill text-[#C4882A]" />
            Encrypted Ranch Checkout
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1208] font-normal tracking-tight">
            Complete Your <em className="text-[#C4882A] italic">Osotua Order</em>
          </h1>
          <p className="text-xs text-[#5C4835] mt-1 font-mono">
            Direct cold-chain delivery and purebred livestock allocation from Kajiado County.
          </p>

          {/* Stepper Pill Bar */}
          <div className="flex items-center gap-3 mt-6 flex-wrap">
            {[
              { id: "details", label: "1. Destination" },
              { id: "payment", label: "2. Payment" },
              { id: "confirmed", label: "3. Confirmation" },
            ].map((s, idx) => {
              const active = step === s.id;
              const passed =
                (s.id === "details" && (step === "payment" || step === "confirmed")) ||
                (s.id === "payment" && step === "confirmed");

              return (
                <div
                  key={s.id}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                    active
                      ? "bg-[#C4882A] text-[#FFFFFF] shadow-sm shadow-[#C4882A]/30"
                      : passed
                      ? "bg-[#2E7D32]/15 text-[#2E7D32] border border-[#2E7D32]/30"
                      : "bg-[#FAF5EB] text-[#786550] border border-[#C4882A]/20"
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-[#FFFFFF]/25 flex items-center justify-center text-[10px]">
                    {passed ? <i className="bi bi-check-lg" /> : idx + 1}
                  </span>
                  <span>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs flex items-center gap-3">
            <i className="bi bi-exclamation-triangle-fill text-[#DC2626] text-lg shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ── TWO-COLUMN CHECKOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Area (7 cols) */}
          <div className="lg:col-span-7">
            {/* STEP 1: DESTINATION DETAILS */}
            {step === "details" && (
              <form onSubmit={handleNextToPayment} className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-6 sm:p-8 shadow-lg shadow-[#1C1208]/04 space-y-5">
                <div className="pb-4 border-b border-[#C4882A]/15 flex items-center justify-between">
                  <h2 className="font-serif text-2xl text-[#1C1208] font-normal">
                    Recipient &amp; Delivery Destination
                  </h2>
                  <span className="text-[10px] font-mono uppercase text-[#8E5E16] font-bold">Step 1 of 2</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
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
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
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
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
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

                <div className="flex items-center justify-between pt-6 border-t border-[#C4882A]/15">
                  <Link href="/cart" className="text-xs font-mono font-bold text-[#786550] hover:text-[#C4882A] flex items-center gap-1.5">
                    <i className="bi bi-arrow-left" /> Return to Cart
                  </Link>
                  <button type="submit" className="btn-primary py-2.5 px-6 text-xs shadow-sm">
                    <span>Continue to Payment</span>
                    <i className="bi bi-arrow-right ml-1" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: PAYMENT SELECTION */}
            {step === "payment" && (
              <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-6 sm:p-8 shadow-lg shadow-[#1C1208]/04 space-y-6">
                <div className="pb-4 border-b border-[#C4882A]/15 flex items-center justify-between">
                  <h2 className="font-serif text-2xl text-[#1C1208] font-normal">
                    Select Payment Instrument
                  </h2>
                  <span className="text-[10px] font-mono uppercase text-[#8E5E16] font-bold">Step 2 of 2</span>
                </div>

                {/* Instrument Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "mpesa", title: "M-Pesa STK", desc: "Instant phone prompt", icon: "bi-phone" },
                    { id: "card", title: "Credit Card", desc: "Visa, Mastercard", icon: "bi-credit-card" },
                    { id: "bank", title: "Bank Wire", desc: "KCB Bank RTGS", icon: "bi-bank" },
                  ].map((m) => {
                    const active = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as "mpesa" | "card" | "bank")}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                          active
                            ? "bg-[#C4882A] text-[#FFFFFF] border-[#C4882A] shadow-md shadow-[#C4882A]/30"
                            : "bg-[#FAF6EE] text-[#1C1208] border-[#C4882A]/20 hover:border-[#C4882A]/50"
                        }`}
                      >
                        <i className={`bi ${m.icon} text-xl block mb-2 ${active ? "text-[#FFFFFF]" : "text-[#C4882A]"}`} />
                        <div className="text-xs font-bold font-mono uppercase tracking-wider">{m.title}</div>
                        <div className={`text-[10px] mt-0.5 ${active ? "text-[#FFFFFF]/80" : "text-[#786550]"}`}>{m.desc}</div>
                      </button>
                    );
                  })}
                </div>

                {/* M-PESA STK INPUT */}
                {paymentMethod === "mpesa" && (
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#2E7D32]/35 space-y-2">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#2E7D32] font-bold">
                      M-Pesa Registered Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={mpesaPhone || phone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      placeholder="0712345678"
                      className="w-full bg-[#FFFFFF] border border-[#2E7D32]/40 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#2E7D32]"
                    />
                    <p className="text-[11px] text-[#5C4835] leading-relaxed">
                      You will receive an automatic PIN authorization on this mobile number for <strong>KES {grandTotal.toLocaleString()}</strong>.
                    </p>
                  </div>
                )}

                {/* BANK TRANSFER INSTRUCTIONS */}
                {paymentMethod === "bank" && (
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#C4882A]/35 space-y-3">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E5E16] font-bold">
                      Ranch Banking Settlement Details
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div>
                        <span className="text-[#786550] block text-[10px]">Bank</span>
                        <strong className="text-[#1C1208]">KCB Bank Kenya</strong>
                      </div>
                      <div>
                        <span className="text-[#786550] block text-[10px]">Account Name</span>
                        <strong className="text-[#1C1208]">Osotua Farming Ltd</strong>
                      </div>
                      <div>
                        <span className="text-[#786550] block text-[10px]">Account No</span>
                        <strong className="text-[#1C1208]">1289 3847 2901</strong>
                      </div>
                      <div>
                        <span className="text-[#786550] block text-[10px]">Branch / Swift</span>
                        <strong className="text-[#1C1208]">Kajiado / KCBLKENX</strong>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-6 border-t border-[#C4882A]/15">
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="text-xs font-mono font-bold text-[#786550] hover:text-[#C4882A] flex items-center gap-1.5 cursor-pointer"
                  >
                    <i className="bi bi-arrow-left" /> Edit Details
                  </button>
                  <button
                    type="button"
                    onClick={handleCompleteOrder}
                    disabled={isProcessing}
                    className="btn-primary py-2.5 px-8 text-xs shadow-sm cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <i className="bi bi-arrow-repeat animate-spin" />
                        <span>Processing Order...</span>
                      </>
                    ) : (
                      <>
                        <span>Authorize KES {grandTotal.toLocaleString()}</span>
                        <i className="bi bi-shield-check ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ORDER CONFIRMED */}
            {step === "confirmed" && (
              <div className="bg-[#FFFFFF] border border-[#2E7D32]/35 rounded-3xl p-8 sm:p-12 text-center shadow-xl shadow-[#2E7D32]/05 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#2E7D32]/15 border border-[#2E7D32]/35 flex items-center justify-center text-[#2E7D32] text-3xl mx-auto mb-2">
                  <i className="bi bi-check2-circle" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#2E7D32] font-bold">
                  Order Successfully Placed
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1208] font-normal">
                  Thank You for Your Order
                </h2>
                <p className="text-xs text-[#5C4835] font-mono">
                  Official Reference: <strong className="text-[#C4882A]">{orderRef}</strong>
                </p>

                {paymentMethod === "mpesa" && (
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#2E7D32]/30 text-xs max-w-md mx-auto text-left flex items-center gap-3 my-4">
                    <i
                      className={`bi ${
                        mpesaPollingStatus === "confirmed"
                          ? "bi-patch-check-fill text-[#2E7D32]"
                          : "bi-arrow-repeat animate-spin text-[#C4882A]"
                      } text-2xl shrink-0`}
                    />
                    <div>
                      <span className="font-bold text-[#1C1208] block">
                        {mpesaPollingStatus === "confirmed"
                          ? "M-Pesa Payment Confirmed"
                          : "STK Prompt Dispatched"}
                      </span>
                      <span className="text-[#5C4835] text-[11px] leading-tight block mt-0.5">
                        {mpesaPollingStatus === "confirmed"
                          ? "Your payment is verified and recorded in the cold-packing schedule."
                          : `Please check your phone (${mpesaPhone || phone}) to enter your PIN.`}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 justify-center pt-4 flex-wrap">
                  <Link
                    href={orderId ? `/orders/${orderId}` : "/dashboard/orders"}
                    className="btn-primary text-xs py-3 px-6 shadow-sm"
                  >
                    <i className="bi bi-speedometer2" />
                    <span>Track Live Dispatch Status</span>
                  </Link>
                  <Link href="/barn" className="btn-ghost text-xs py-3 px-6" style={{ color: "#1C1208" }}>
                    <span>Return to Store</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-6 sm:p-8 shadow-lg shadow-[#1C1208]/04 sticky top-28 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#C4882A]/15">
                <h3 className="font-serif text-xl text-[#1C1208] font-normal">
                  Order Summary
                </h3>
                <span className="font-mono text-xs text-[#8E5E16] font-bold">{cart.length} items</span>
              </div>

              {/* Cart List */}
              <div className="divide-y divide-[#C4882A]/10 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF5EB] border border-[#C4882A]/20 relative overflow-hidden shrink-0 flex items-center justify-center text-[#C4882A]">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        ) : (
                          <i className="bi bi-box-seam text-lg" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#1C1208] truncate">{item.name}</div>
                        <div className="text-[10px] font-mono text-[#786550]">
                          {item.quantity} × KES {item.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono text-xs font-bold text-[#1C1208] shrink-0">
                      KES {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-4 border-t border-[#C4882A]/15 space-y-2 text-xs">
                <div className="flex justify-between text-[#5C4835]">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-[#1C1208]">KES {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#5C4835]">
                  <span>Refrigerated Delivery</span>
                  <span className="font-mono text-[#2E7D32] font-bold">Complimentary</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-3 border-t border-[#C4882A]/15">
                  <span className="font-serif text-base font-bold text-[#1C1208]">Total Amount</span>
                  <span className="font-mono text-lg font-bold text-[#C4882A]">
                    KES {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutClient() {
  return (
    <Suspense
      fallback={
        <div style={{ background: "#FBF7F0", minHeight: "100vh" }} className="pt-36 text-center text-xs font-mono text-[#8E5E16]">
          Loading Osotua Checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
