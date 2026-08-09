"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const data = Object.fromEntries(new FormData(e.currentTarget))

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.")
      setLoading(false)
      return
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })

    if (res.ok) {
      router.push("/login?registered=true")
    } else {
      const json = await res.json()
      setError(json.error || "Registration failed.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1C1208] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 rounded-full bg-[#C4882A] flex items-center justify-center font-serif text-[#1C1208] font-semibold text-base mb-3">
            OF
          </div>
          <span className="font-serif text-[#F5EFE4] text-lg">Osotua Farming</span>
          <span className="font-mono text-[#C4882A] text-[10px] tracking-widest uppercase mt-1">Create Account</span>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/05 border border-[#F5EFE4]/10 rounded p-8 flex flex-col gap-4">
          {error && (
            <div className="bg-[#A0431E]/20 border border-[#A0431E]/40 text-[#F5EFE4] text-sm px-4 py-3 rounded-sm">
              {error}
            </div>
          )}

          {[
            { name: "name", label: "Full Name", type: "text" },
            { name: "email", label: "Email Address", type: "email" },
            { name: "phone", label: "Phone Number", type: "tel" },
            { name: "password", label: "Password", type: "password" },
            { name: "confirmPassword", label: "Confirm Password", type: "password" },
          ].map((field) => (
            <div key={field.name}>
              <label className="font-mono text-[9px] text-[#F5EFE4]/40 tracking-widest uppercase block mb-2">{field.label}</label>
              <input
                name={field.name}
                type={field.type}
                required
                className="w-full bg-white/08 border border-[#F5EFE4]/15 rounded-sm px-4 py-3 text-sm text-[#F5EFE4] outline-none focus:border-[#C4882A] transition-colors"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#C4882A] text-[#1C1208] px-6 py-3 text-sm font-medium rounded-sm hover:bg-[#d99a30] transition-colors disabled:opacity-60 mt-2"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-[#F5EFE4]/30 text-sm">Already have an account? </span>
          <Link href="/login" className="text-[#C4882A] text-sm hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
