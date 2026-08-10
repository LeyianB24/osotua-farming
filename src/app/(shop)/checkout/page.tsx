"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/shared/CartContext";
import {
  CheckCircle2,
  Phone,
  CreditCard,
  Building2,
  ShieldCheck,
  ArrowLeft,
  Truck,
  Loader2,
} from "lucide-react";

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

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedRef = "OST-" + Math.floor(100000 + Math.random() * 900000);
      setOrderRef(generatedRef);
      setStep("confirmed");
      clearCart();
    }, 2500);
  };

  if (cart.length === 0 && step !== "confirmed") {
    return (
      <div className="bg-[#FBF7F0] pt-28 pb-20 min-h-screen text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-md border border-[#1C1208]/10 shadow-md">
          <h2 className="font-serif text-2xl text-[#1C1208] mb-4">Your Basket is Empty</h2>
          <p className="text-xs text-[#1C1208]/60 mb-6">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link href="/barn" className="btn btn-primary btn-sm">
            Go to Barn Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF7F0] pt-28 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-10 max-w-xl mx-auto border-b border-[#1C1208]/10 pb-6">
          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                step === "details"
                  ? "bg-[#C4882A] text-[#1C1208]"
                  : "bg-[#3D6B3E] text-white"
              }`}
            >
              1
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#1C1208]">
              Delivery Details
            </span>
          </div>

          <div className="h-px bg-[#1C1208]/20 w-12" />

          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                step === "payment"
                  ? "bg-[#C4882A] text-[#1C1208]"
                  : step === "confirmed"
                  ? "bg-[#3D6B3E] text-white"
                  : "bg-[#1C1208]/10 text-[#1C1208]/40"
              }`}
            >
              2
            </span>
            <span
              className={`font-mono text-xs uppercase tracking-wider ${
                step === "payment" || step === "confirmed"
                  ? "text-[#1C1208]"
                  : "text-[#1C1208]/40"
              }`}
            >
              Payment
            </span>
          </div>

          <div className="h-px bg-[#1C1208]/20 w-12" />

          <div className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                step === "confirmed"
                  ? "bg-[#3D6B3E] text-white"
                  : "bg-[#1C1208]/10 text-[#1C1208]/40"
              }`}
            >
              3
            </span>
            <span
              className={`font-mono text-xs uppercase tracking-wider ${
                step === "confirmed" ? "text-[#1C1208]" : "text-[#1C1208]/40"
              }`}
            >
              Confirmation
            </span>
          </div>
        </div>

        {/* STEP 1: DELIVERY DETAILS */}
        {step === "details" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <form onSubmit={handleNextToPayment} className="lg:col-span-2 bg-white border border-[#1C1208]/10 rounded-md p-6 sm:p-8 shadow-md space-y-6">
              <h2 className="font-serif text-2xl text-[#1C1208] border-b border-[#1C1208]/08 pb-3">
                Customer & Shipping Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Kiptoo"
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Phone Number (M-Pesa) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (!mpesaPhone) setMpesaPhone(e.target.value);
                    }}
                    placeholder="0712345678"
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Delivery County / Town *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Nairobi / Karen / Kajiado"
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="label">Delivery Instructions (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Gate code, specific landmarks, preferred delivery time..."
                  className="input"
                />
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#1C1208]/08">
                <Link href="/cart" className="text-xs font-mono text-[#1C1208]/60 hover:text-[#C4882A] flex items-center gap-1">
                  <ArrowLeft size={14} />
                  Return to Cart
                </Link>
                <button type="submit" className="btn btn-primary btn-lg">
                  Proceed to Payment →
                </button>
              </div>
            </form>

            {/* Sidebar Summary */}
            <div className="bg-white border border-[#1C1208]/10 rounded-md p-6 h-fit shadow-md space-y-4">
              <h3 className="font-serif text-lg font-semibold text-[#1C1208] border-b border-[#1C1208]/10 pb-3">
                Items ({cart.length})
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs text-[#1C1208]/80">
                    <span className="truncate pr-2">{item.quantity}× {item.name}</span>
                    <span className="font-mono font-semibold shrink-0">
                      KES {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-[#1C1208]/10 flex justify-between font-mono text-sm">
                <span>Total Due:</span>
                <span className="font-bold text-[#C4882A]">KES {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PAYMENT METHOD */}
        {step === "payment" && (
          <div className="bg-white border border-[#1C1208]/10 rounded-md p-6 sm:p-8 shadow-md max-w-2xl mx-auto space-y-6">
            <h2 className="font-serif text-2xl text-[#1C1208] border-b border-[#1C1208]/08 pb-3">
              Select Payment Method
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("mpesa")}
                className={`p-4 border rounded-md flex flex-col items-center gap-2 text-center transition-all ${
                  paymentMethod === "mpesa"
                    ? "border-[#C4882A] bg-[#C4882A]/08 ring-2 ring-[#C4882A]"
                    : "border-[#1C1208]/15 hover:border-[#C4882A]/50"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#3D6B3E]/10 text-[#3D6B3E] flex items-center justify-center font-bold">
                  <Phone size={20} />
                </div>
                <span className="font-serif text-sm font-semibold text-[#1C1208]">M-Pesa Express</span>
                <span className="text-[10px] text-[#1C1208]/50">Instant STK Push</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-4 border rounded-md flex flex-col items-center gap-2 text-center transition-all ${
                  paymentMethod === "card"
                    ? "border-[#C4882A] bg-[#C4882A]/08 ring-2 ring-[#C4882A]"
                    : "border-[#1C1208]/15 hover:border-[#C4882A]/50"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#C4882A]/10 text-[#C4882A] flex items-center justify-center font-bold">
                  <CreditCard size={20} />
                </div>
                <span className="font-serif text-sm font-semibold text-[#1C1208]">Credit / Debit Card</span>
                <span className="text-[10px] text-[#1C1208]/50">Visa, Mastercard</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("bank")}
                className={`p-4 border rounded-md flex flex-col items-center gap-2 text-center transition-all ${
                  paymentMethod === "bank"
                    ? "border-[#C4882A] bg-[#C4882A]/08 ring-2 ring-[#C4882A]"
                    : "border-[#1C1208]/15 hover:border-[#C4882A]/50"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                  <Building2 size={20} />
                </div>
                <span className="font-serif text-sm font-semibold text-[#1C1208]">Bank Wire</span>
                <span className="text-[10px] text-[#1C1208]/50">KCB / NCBA Bank</span>
              </button>
            </div>

            {/* M-Pesa Panel */}
            {paymentMethod === "mpesa" && (
              <div className="p-5 bg-[#F5EFE4] rounded-md border border-[#EDE5D8] space-y-3">
                <div className="eyebrow text-[#3D6B3E]">M-Pesa Instant Payment</div>
                <p className="text-xs text-[#1C1208]/70 leading-relaxed">
                  Enter your Safaricom M-Pesa registered mobile number below. You will receive an instant PIN prompt (STK Push) on your phone.
                </p>
                <div>
                  <label className="label">M-Pesa Mobile Number</label>
                  <input
                    type="tel"
                    value={mpesaPhone || phone}
                    onChange={(e) => setMpesaPhone(e.target.value)}
                    placeholder="0712345678"
                    className="input font-mono"
                  />
                </div>
              </div>
            )}

            {/* Total Display */}
            <div className="p-4 bg-[#1C1208] text-[#F5EFE4] rounded-md flex justify-between items-center">
              <div>
                <span className="text-xs text-[#F5EFE4]/60">Total Payable Now:</span>
                <div className="font-mono text-xl font-bold text-[#C4882A]">
                  KES {grandTotal.toLocaleString()}
                </div>
              </div>
              <div className="text-right text-[10px] font-mono text-[#F5EFE4]/40">
                Delivery to: {address || "Kajiado / Nairobi"}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-[#1C1208]/08">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="text-xs font-mono text-[#1C1208]/60 hover:text-[#C4882A]"
              >
                ← Back to Details
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleCompleteOrder}
                className="btn btn-primary btn-lg min-w-48"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={16} />
                    <span>Processing Payment...</span>
                  </span>
                ) : (
                  <span>Pay KES {grandTotal.toLocaleString()}</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRMED */}
        {step === "confirmed" && (
          <div className="bg-white border border-[#1C1208]/10 rounded-md p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xl space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#3D6B3E]/10 text-[#3D6B3E] flex items-center justify-center mx-auto">
              <CheckCircle2 size={48} />
            </div>

            <div>
              <span className="eyebrow justify-center text-[#3D6B3E] mb-2">Order Confirmed</span>
              <h2 className="font-serif text-4xl text-[#1C1208] font-light">
                Thank You for your Order!
              </h2>
              <p className="text-sm text-[#1C1208]/60 mt-2 max-w-md mx-auto">
                We have received your payment and our Kajiado ranch logistics team is preparing your dispatch.
              </p>
            </div>

            <div className="p-5 bg-[#F5EFE4] rounded-md border border-[#EDE5D8] text-left max-w-md mx-auto space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[#1C1208]/50">Order Reference:</span>
                <span className="font-bold text-[#C4882A]">{orderRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1C1208]/50">Customer Name:</span>
                <span className="font-semibold">{name || "Valued Client"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1C1208]/50">Delivery Location:</span>
                <span>{address}</span>
              </div>
              <div className="flex justify-between border-t border-[#1C1208]/10 pt-2 font-bold text-sm">
                <span>Paid Total:</span>
                <span className="text-[#3D6B3E]">KES {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/dashboard" className="btn btn-primary btn-lg">
                Go to My Orders Dashboard
              </Link>
              <Link href="/barn" className="btn btn-outline btn-lg">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
