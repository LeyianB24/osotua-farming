"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

export default function CheckoutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "stripe">("mpesa")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))

    const orderRes = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
        deliveryAddress: data.address,
        type: "PRODUCT",
        totalAmount: 0,
        items: [],
      }),
      headers: { "Content-Type": "application/json" },
    })

    const order = await orderRes.json()

    if (paymentMethod === "mpesa") {
      await fetch("/api/payments/mpesa", {
        method: "POST",
        body: JSON.stringify({ phone: data.phone, orderId: order.id }),
        headers: { "Content-Type": "application/json" },
      })
      router.push(`/checkout/success?order=${order.id}`)
    }

    setLoading(false)
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#FBF7F0] pt-24 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-serif text-3xl text-[#1C1208] mb-8">Checkout</h1>

          <form onSubmit={handleSubmit} className="bg-white border border-[#1C1208]/08 rounded p-8 flex flex-col gap-5">
            <h2 className="font-serif text-xl text-[#1C1208]">Your Details</h2>

            {[
              { name: "name", label: "Full Name", type: "text" },
              { name: "email", label: "Email Address", type: "email" },
              { name: "phone", label: "Phone Number (for M-Pesa)", type: "tel" },
              { name: "address", label: "Delivery Address", type: "text" },
            ].map((field) => (
              <div key={field.name}>
                <label className="font-mono text-[9px] text-[#1C1208]/50 tracking-widest uppercase block mb-2">{field.label}</label>
                <input
                  name={field.name}
                  type={field.type}
                  required
                  className="w-full border border-[#1C1208]/15 rounded-sm px-4 py-3 text-sm text-[#1C1208] outline-none focus:border-[#C4882A] transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="font-mono text-[9px] text-[#1C1208]/50 tracking-widest uppercase block mb-3">Payment Method</label>
              <div className="flex gap-3">
                {(["mpesa", "stripe"] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`flex-1 py-3 text-sm border rounded-sm font-medium transition-colors ${paymentMethod === method ? "border-[#C4882A] bg-[#C4882A]/08 text-[#C4882A]" : "border-[#1C1208]/15 text-[#1C1208]/60"}`}
                  >
                    {method === "mpesa" ? "📱 M-Pesa" : "💳 Card (Stripe)"}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#C4882A] text-[#1C1208] px-6 py-3 text-sm font-medium rounded-sm hover:bg-[#d99a30] transition-colors disabled:opacity-60"
            >
              {loading ? "Processing..." : "Complete Order"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}
