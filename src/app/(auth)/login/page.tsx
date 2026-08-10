"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Logo from "@/components/shared/Logo"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const data = Object.fromEntries(new FormData(e.currentTarget))

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid email or password.")
      setLoading(false)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-[#1C1208] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <Logo size="lg" stacked wordmark={false} asLink={false} />
          <span className="font-serif text-[#F5EFE4] text-lg mt-3">Osotua Farming</span>
          <span className="font-mono text-[#C4882A] text-[10px] tracking-widest uppercase mt-1">Sign In</span>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/05 border border-[#F5EFE4]/10 rounded p-8 flex flex-col gap-4">
          {error && (
            <div className="bg-[#A0431E]/20 border border-[#A0431E]/40 text-[#F5EFE4] text-sm px-4 py-3 rounded-sm">
              {error}
            </div>
          )}

          <div>
            <label className="font-mono text-[9px] text-[#F5EFE4]/40 tracking-widest uppercase block mb-2">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-white/08 border border-[#F5EFE4]/15 rounded-sm px-4 py-3 text-sm text-[#F5EFE4] outline-none focus:border-[#C4882A] transition-colors"
            />
          </div>

          <div>
            <label className="font-mono text-[9px] text-[#F5EFE4]/40 tracking-widest uppercase block mb-2">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full bg-white/08 border border-[#F5EFE4]/15 rounded-sm px-4 py-3 text-sm text-[#F5EFE4] outline-none focus:border-[#C4882A] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#C4882A] text-[#1C1208] px-6 py-3 text-sm font-medium rounded-sm hover:bg-[#d99a30] transition-colors disabled:opacity-60 mt-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-[#F5EFE4]/30 text-sm">Don&apos;t have an account? </span>
          <Link href="/register" className="text-[#C4882A] text-sm hover:underline">Register</Link>
        </div>

        <div className="text-center mt-4">
          <Link href="/" className="font-mono text-[10px] text-[#F5EFE4]/20 tracking-widest uppercase hover:text-[#F5EFE4]/40 transition-colors">
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  )
}
