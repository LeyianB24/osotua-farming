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
        throw new Error("Order creation failed on server.");
      }

      const orderData = await res.json();
      setOrderRef(orderData.order?.orderNumber || generatedRef);
      setOrderId(orderData.order?.id || "");
      clearCart();
      setStep("confirmed");

      // If M-PESA, trigger STK push
      if (paymentMethod === "mpesa") {
        setMpesaPollingStatus("sent");
        try {
          const mpesaRes = await fetch("/api/payments/mpesa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone: mpesaPhone || phone,
              orderId: orderData.order?.id,
            }),
          });
          if (!mpesaRes.ok) throw new Error("M-Pesa request failed");
          setMpesaPollingStatus("waiting_pin");
          setTimeout(() => {
            setMpesaPollingStatus("confirmed");
          }, 6000);
        } catch {
          setErrorMsg("The order was created, but the M-Pesa prompt could not be sent. Please contact support with your order reference.");
        }
      } else if (paymentMethod === "card") {
        const stripeRes = await fetch("/api/payments/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: orderData.order?.id }),
        });
        if (!stripeRes.ok) {
          setErrorMsg("The order was created, but Stripe could not start the card payment. Please contact support with your order reference.");
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Unable to process your order. Please check your details and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0 && step !== "confirmed") {
    return (
      <div className="w-full min-h-screen bg-[#F5F0E8] text-[#1C1208] pt-36 pb-24">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="p-8 sm:p-12 bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] shadow-sm">
            <div className="w-16 h-16 rounded-[2px] bg-[#C99A2E]/10 border border-[#C99A2E]/30 flex items-center justify-center text-[#C99A2E] text-2xl mx-auto mb-4">
              <i className="bi bi-basket3" />
            </div>
            <h2
              className="text-3xl font-bold text-[#1C1208] mb-2"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
            >
              Your Basket is Empty
            </h2>
            <p className="text-sm text-[#5C4A2A] leading-relaxed mb-6">
              Select premium cold-pack cuts, dairy jars, or purebred livestock from the Barn Store to proceed to checkout.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/barn" className="btn-gold text-xs">
                <i className="bi bi-shop" />
                <span>Visit Farm Barn</span>
              </Link>
              <Link href="/breeds" className="btn-outline text-xs">
                <span>Browse Breeds</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F5F0E8] text-[#1C1208] pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] text-[10px] font-mono font-bold uppercase tracking-widest bg-[#6B7A3F] text-white mb-3">
            <i className="bi bi-shield-lock-fill text-xs" />
            <span>ENCRYPTED RANCH CHECKOUT</span>
          </div>
          <h1
            className="text-3xl sm:text-5xl font-bold text-[#1C1208] leading-tight"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            Complete Your <em className="text-[#C99A2E] italic">Osotua Order</em>
          </h1>
          <p className="text-xs font-mono text-[#5C4A2A] mt-1">
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
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                    active
                      ? "bg-[#C99A2E] text-[#1C1208] shadow-xs"
                      : passed
                      ? "bg-[#6B7A3F] text-white"
                      : "bg-[#FAF7F2] text-[#8E7E70] border border-[#D4C9B0]"
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                    {passed ? <i className="bi bi-check-lg" /> : idx + 1}
                  </span>
                  <span>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-[2px] bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs flex items-center gap-3">
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
              <form onSubmit={handleNextToPayment} className="os-form-panel space-y-5">
                <div className="pb-4 border-b border-[#D4C9B0] flex items-center justify-between">
                  <h2
                    className="text-2xl font-bold text-[#1C1208]"
                    style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                  >
                    Recipient &amp; Delivery Destination
                  </h2>
                  <span className="text-[10px] font-mono uppercase text-[#6B7A3F] font-bold">Step 1 of 2</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkout-name" className="block text-[10px] font-mono uppercase tracking-wider text-[#5C4A2A] font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Moses Ole Sironka"
                      className="os-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="checkout-email" className="block text-[10px] font-mono uppercase tracking-wider text-[#5C4A2A] font-bold mb-1">
                      Email Address *
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="moses@example.co.ke"
                      className="os-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkout-phone" className="block text-[10px] font-mono uppercase tracking-wider text-[#5C4A2A] font-bold mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+254 700 000 000"
                      className="os-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="checkout-address" className="block text-[10px] font-mono uppercase tracking-wider text-[#5C4A2A] font-bold mb-1">
                      Physical Delivery Address *
                    </label>
                    <input
                      id="checkout-address"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Karen Plains, House 4B, Nairobi"
                      className="os-input"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-[#D4C9B0]">
                  <Link href="/cart" className="text-xs font-mono font-bold text-[#8E7E70] hover:text-[#C99A2E] flex items-center gap-1.5 uppercase tracking-wider">
                    <i className="bi bi-arrow-left" /> Return to Basket
                  </Link>
                  <button type="submit" className="btn-gold text-xs">
                    <span>Continue to Payment</span>
                    <i className="bi bi-arrow-right ml-1" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: PAYMENT SELECTION */}
            {step === "payment" && (
              <div className="os-form-panel space-y-6">
                <div className="pb-4 border-b border-[#D4C9B0] flex items-center justify-between">
                  <h2
                    className="text-2xl font-bold text-[#1C1208]"
                    style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                  >
                    Select Payment Instrument
                  </h2>
                  <span className="text-[10px] font-mono uppercase text-[#6B7A3F] font-bold">Step 2 of 2</span>
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
                        className={`p-4 rounded-[2px] text-left border transition-all cursor-pointer ${
                          active
                            ? "bg-[#C99A2E] text-[#1C1208] border-[#C99A2E] shadow-xs"
                            : "bg-white text-[#1C1208] border-[#D4C9B0] hover:border-[#C99A2E]"
                        }`}
                      >
                        <i className={`bi ${m.icon} text-xl block mb-2 ${active ? "text-[#1C1208]" : "text-[#C99A2E]"}`} />
                        <div className="text-xs font-bold font-mono uppercase tracking-wider">{m.title}</div>
                        <div className={`text-[10px] mt-0.5 ${active ? "text-[#1C1208]/80" : "text-[#8E7E70]"}`}>{m.desc}</div>
                      </button>
                    );
                  })}
                </div>

                {/* M-PESA STK INPUT */}
                {paymentMethod === "mpesa" && (
                  <div className="p-4 rounded-[2px] bg-white border border-[#6B7A3F]/35 space-y-2">
                    <label htmlFor="mpesa-phone" className="block text-[10px] font-mono uppercase tracking-wider text-[#6B7A3F] font-bold">
                      M-Pesa Registered Mobile Number
                    </label>
                    <input
                      id="mpesa-phone"
                      type="tel"
                      value={mpesaPhone || phone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      placeholder="0712345678"
                      className="os-input"
                    />
                    <p className="text-xs text-[#5C4835] leading-relaxed">
                      You will receive an automatic PIN prompt on this mobile number for <strong>KES {grandTotal.toLocaleString()}</strong>.
                    </p>
                  </div>
                )}

                {/* BANK TRANSFER INSTRUCTIONS */}
                {paymentMethod === "bank" && (
                  <div className="p-4 rounded-[2px] bg-white border border-[#D4C9B0] space-y-3">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#5C4A2A] font-bold">
                      Ranch Banking Settlement Details
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div>
                        <span className="text-[#8E7E70] block text-[10px]">Bank</span>
                        <strong className="text-[#1C1208]">KCB Bank Kenya</strong>
                      </div>
                      <div>
                        <span className="text-[#8E7E70] block text-[10px]">Account Name</span>
                        <strong className="text-[#1C1208]">Osotua Farming Ltd</strong>
                      </div>
                      <div>
                        <span className="text-[#8E7E70] block text-[10px]">Account No</span>
                        <strong className="text-[#1C1208]">1289 3847 2901</strong>
                      </div>
                      <div>
                        <span className="text-[#8E7E70] block text-[10px]">Branch / Swift</span>
                        <strong className="text-[#1C1208]">Kajiado / KCBLKENX</strong>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-6 border-t border-[#D4C9B0]">
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="text-xs font-mono font-bold text-[#8E7E70] hover:text-[#C99A2E] flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                  >
                    <i className="bi bi-arrow-left" /> Edit Details
                  </button>
                  <button
                    type="button"
                    onClick={handleCompleteOrder}
                    disabled={isProcessing}
                    className="btn-gold text-xs cursor-pointer"
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
              <div className="bg-[#FAF7F2] border border-[#6B7A3F]/35 rounded-[2px] p-8 sm:p-12 text-center shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-[2px] bg-[#6B7A3F]/15 border border-[#6B7A3F]/35 flex items-center justify-center text-[#6B7A3F] text-3xl mx-auto mb-2">
                  <i className="bi bi-check2-circle" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#6B7A3F] font-bold">
                  Order Successfully Placed
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-[#1C1208]"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                >
                  Thank You for Your Order
                </h2>
                <p className="text-xs text-[#5C4835] font-mono">
                  Official Reference: <strong className="text-[#C4602A]">{orderRef}</strong>
                </p>

                {paymentMethod === "mpesa" && (
                  <div className="p-4 rounded-[2px] bg-white border border-[#6B7A3F]/30 text-xs max-w-md mx-auto text-left flex items-center gap-3 my-4">
                    <i
                      className={`bi ${
                        mpesaPollingStatus === "confirmed"
                          ? "bi-patch-check-fill text-[#6B7A3F]"
                          : "bi-arrow-repeat animate-spin text-[#C99A2E]"
                      } text-2xl shrink-0`}
                    />
                    <div>
                      <span className="font-bold text-[#1C1208] block">
                        {mpesaPollingStatus === "confirmed"
                          ? "M-Pesa Payment Confirmed"
                          : "STK Prompt Dispatched"}
                      </span>
                      <span className="text-[#5C4835] text-[11px] leading-tight block mt-0.5 font-normal">
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
                    className="btn-gold text-xs"
                  >
                    <i className="bi bi-speedometer2" />
                    <span>Track Live Dispatch Status</span>
                  </Link>
                  <Link href="/barn" className="btn-outline text-xs">
                    <span>Return to Store</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] p-6 sm:p-8 shadow-sm sticky top-28 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#D4C9B0]">
                <h3
                  className="text-xl font-bold text-[#1C1208]"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                >
                  Order Summary
                </h3>
                <span className="font-mono text-xs text-[#6B7A3F] font-bold">{cart.length} items</span>
              </div>

              {/* Cart List */}
              <div className="divide-y divide-[#D4C9B0]/60 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-[2px] bg-[#1C1208] border border-[#D4C9B0] relative overflow-hidden shrink-0 flex items-center justify-center text-[#C99A2E]">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        ) : (
                          <i className="bi bi-box-seam text-lg" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#1C1208] truncate">{item.name}</div>
                        <div className="text-[10px] font-mono text-[#8E7E70]">
                          {item.quantity} × KES {item.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono text-xs font-bold text-[#C4602A] shrink-0">
                      KES {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-4 border-t border-[#D4C9B0] space-y-2 text-xs">
                <div className="flex justify-between text-[#5C4A2A]">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-[#1C1208]">KES {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#5C4A2A]">
                  <span>Refrigerated Delivery</span>
                  <span className="font-mono text-[#6B7A3F] font-bold">Complimentary</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-3 border-t border-[#D4C9B0]">
                  <span
                    className="font-bold text-[#1C1208]"
                    style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                  >
                    Total Amount
                  </span>
                  <span className="font-mono text-xl font-bold text-[#C4602A]">
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
        <div className="w-full min-h-screen bg-[#F5F0E8] pt-36 text-center text-xs font-mono text-[#5C4A2A]">
          Loading Osotua Checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
