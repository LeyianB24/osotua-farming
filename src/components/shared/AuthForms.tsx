"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export function LoginClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
      setError("Invalid email or password. Please try again.")
      setLoading(false)
    } else {
      const callbackUrl = searchParams.get("callbackUrl")
      router.push(callbackUrl?.startsWith("/") ? callbackUrl : "/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAF7F2] text-[#1A1208]">
      {/* ── LEFT COLUMN: Savanna Rangeland & Philosophy ── */}
      <div className="relative w-full lg:w-1/2 xl:w-[50%] min-h-[460px] lg:min-h-screen flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/login-rangeland.jpg"
          alt="Osotua Pasture and Rangelands in Kajiado County"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center"
        />

        {/* Ambient Dark Gradient Overlay for optimal legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#140F0A]/55 via-[#140F0A]/25 to-[#140F0A]/80 z-0" />

        {/* Header Brand */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-baseline gap-2.5 group">
            <span
              className="text-[#D4A045] italic text-2xl sm:text-3xl font-normal tracking-wide transition-opacity group-hover:opacity-90"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
            >
              Osotua
            </span>
            <span className="text-[#D4A045]/90 text-[10px] tracking-[0.25em] font-sans font-semibold uppercase">
              FARMING
            </span>
          </Link>
        </div>

        {/* Hero Philosophy Quote */}
        <div className="relative z-10 my-auto py-10 max-w-lg">
          {/* Gold Accent Dash */}
          <div className="w-8 h-[2px] bg-[#D4A045] mb-6" />

          <blockquote
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] text-[#FAF7F2] font-normal leading-[1.3] drop-shadow-sm"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif", fontStyle: "italic" }}
          >
            &ldquo;Rooted in tradition, growing with nature &mdash; one pasture at a time.&rdquo;
          </blockquote>

          <p className="mt-8 text-[11px] font-mono tracking-[0.24em] text-[#C48D2A] uppercase font-bold">
            KAJIADO COUNTY, KENYA &bull; EST. 2023
          </p>
        </div>

        {/* Bottom Key Stats */}
        <div className="relative z-10 pt-6 border-t border-white/20 grid grid-cols-3 gap-4 sm:gap-8">
          <div>
            <div
              className="text-2xl sm:text-3xl font-bold text-[#D4A045]"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
            >
              4,200<span className="text-xl font-normal">+</span>
            </div>
            <div className="text-xs text-[#E8DFD1]/85 mt-1 font-medium">Acres</div>
          </div>
          <div>
            <div
              className="text-2xl sm:text-3xl font-bold text-[#D4A045]"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
            >
              850<span className="text-xl font-normal">+</span>
            </div>
            <div className="text-xs text-[#E8DFD1]/85 mt-1 font-medium">Livestock Head</div>
          </div>
          <div>
            <div
              className="text-2xl sm:text-3xl font-bold text-[#D4A045]"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
            >
              127<span className="text-xl font-normal">+</span>
            </div>
            <div className="text-xs text-[#E8DFD1]/85 mt-1 font-medium">Partner Families</div>
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN: Sign In to the Estate Form ── */}
      <div className="w-full lg:w-1/2 xl:w-[50%] flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 py-12 lg:py-16 min-h-screen bg-[#FAF7F2]">
        <div className="w-full max-w-[460px]">
          {/* Eyebrow */}
          <div className="mb-4">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#5C6D37] uppercase font-bold border-b border-[#5C6D37]/60 pb-0.5 inline-block">
              MEMBER PORTAL
            </span>
          </div>

          {/* Heading with preserved 2-line structure */}
          <h1
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#1A1208] leading-[1.12]"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            <span className="whitespace-nowrap">Sign In to</span>
            <br />
            <span className="text-[#B85D30] whitespace-nowrap">the Estate</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#6E6152] text-xs sm:text-sm mt-3 mb-8 leading-relaxed font-normal">
            Access your livestock dashboard, order history, and ranch investment portfolio.
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-start gap-3 bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs p-3.5 rounded-[2px]">
              <i className="bi bi-exclamation-triangle-fill text-[#DC2626] text-sm flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="login-email"
                className="font-mono text-[10px] text-[#5C4A2A] tracking-[0.16em] uppercase block mb-2 font-bold"
              >
                EMAIL ADDRESS
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full bg-[#EFE9DF] border border-[#DDD4C4] text-[#1A1208] px-4 py-3.5 rounded-[2px] placeholder:text-[#9F9384] text-sm focus:outline-none focus:border-[#C48D2A] focus:ring-1 focus:ring-[#C48D2A] transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="login-password"
                  className="font-mono text-[10px] text-[#5C4A2A] tracking-[0.16em] uppercase font-bold"
                >
                  PASSWORD
                </label>
                <Link
                  href="/contact?topic=password-reset"
                  className="text-[11px] text-[#8E7E70] hover:text-[#B85D30] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#EFE9DF] border border-[#DDD4C4] text-[#1A1208] px-4 py-3.5 rounded-[2px] placeholder:text-[#9F9384] text-sm pr-11 focus:outline-none focus:border-[#C48D2A] focus:ring-1 focus:ring-[#C48D2A] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E7E70] hover:text-[#1A1208] transition-colors p-1 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} text-base`} />
                </button>
              </div>
            </div>

            {/* Keep me signed in Checkbox */}
            <div className="flex items-center gap-2.5 pt-0.5">
              <input
                id="keep-signed-in"
                name="keepSignedIn"
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded-[2px] border-[#DDD4C4] bg-[#EFE9DF] text-[#C58F28] focus:ring-[#C58F28] accent-[#C58F28] cursor-pointer"
              />
              <label
                htmlFor="keep-signed-in"
                className="text-xs text-[#6E6152] select-none cursor-pointer"
              >
                Keep me signed in
              </label>
            </div>

            {/* Submit Button */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-[#C58F28] hover:bg-[#B37E1C] active:scale-[0.99] text-[#1A1208] font-mono text-xs font-bold tracking-[0.14em] uppercase py-3.5 px-6 rounded-[2px] shadow-sm transition-all duration-200 mt-2 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <i className="bi bi-arrow-repeat animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <span>SIGN IN TO DASHBOARD</span>
              )}
            </button>
          </form>

          {/* OR Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#DDD4C4]" />
            </div>
            <span className="relative bg-[#FAF7F2] px-3 font-mono text-[10px] tracking-[0.2em] text-[#9F9384] uppercase">
              OR
            </span>
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full bg-[#EFE9DF] hover:bg-[#E7E0D3] border border-[#DDD4C4] text-[#2C2115] text-xs font-medium py-3 px-4 rounded-[2px] flex items-center justify-center gap-3 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* New to Osotua Link */}
          <div className="mt-8 text-center">
            <p className="text-xs text-[#6E6152]">
              New to Osotua?{" "}
              <Link
                href="/register"
                className="text-[#B85D30] font-medium hover:underline inline-flex items-center gap-1"
              >
                Request member access &rarr;
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const REGISTER_FIELDS = [
  { name: "name", label: "FULL NAME", type: "text", placeholder: "Kamau Achola", autoComplete: "name" },
  { name: "email", label: "EMAIL ADDRESS", type: "email", placeholder: "kamau@example.com", autoComplete: "email" },
  { name: "phone", label: "PHONE NUMBER", type: "tel", placeholder: "+254 700 000 000", autoComplete: "tel" },
]

export function RegisterClient() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
      const json = await res.json().catch(() => ({}))
      setError(json.error || "Registration failed. Please try again.")
      setLoading(false)
    }
  }

  const benefits = [
    "Track purebred livestock orders & movement permits",
    "Direct Farm Barn estate-to-table deliveries",
    "Priority booking for rangeland tours & consultations",
    "Exclusive quarterly updates on new breeding herd releases",
  ]

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAF7F2] text-[#1A1208]">
      {/* ── LEFT COLUMN: Savanna Visual & Estate Membership ── */}
      <div className="relative w-full lg:w-1/2 xl:w-[48%] min-h-[380px] lg:min-h-screen flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden">
        <Image
          src="/images/login-rangeland.jpg"
          alt="Osotua Pasture and Rangelands"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#140F0A]/60 via-[#140F0A]/35 to-[#140F0A]/85 z-0" />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-baseline gap-2.5 group">
            <span
              className="text-[#D4A045] italic text-2xl sm:text-3xl font-normal tracking-wide"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
            >
              Osotua
            </span>
            <span className="text-[#D4A045]/90 text-[10px] tracking-[0.25em] font-sans font-semibold uppercase">
              FARMING
            </span>
          </Link>
        </div>

        <div className="relative z-10 my-auto py-8 max-w-md">
          <div className="w-8 h-[2px] bg-[#D4A045] mb-6" />
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl text-[#FAF7F2] font-normal leading-[1.25] mb-4"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            Become a Patron of Kajiado&apos;s Heritage
          </h2>
          <p className="text-xs sm:text-sm text-[#E8DFD1]/90 leading-relaxed mb-6 font-normal">
            Join an exclusive network of pastoralists, premium buyers, and conservation partners connected to the Osotua Estate.
          </p>
          <div className="space-y-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#5C6D37]/30 border border-[#D4A045]/60 flex items-center justify-center text-[#D4A045] shrink-0 mt-0.5 text-xs">
                  <i className="bi bi-check-lg" />
                </div>
                <span className="text-xs text-[#FAF7F2]/90 leading-normal font-normal">
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 pt-6 border-t border-white/20">
          <p className="text-xs text-[#E8DFD1]/70 flex items-center gap-2">
            <i className="bi bi-shield-check text-[#D4A045]" />
            Encrypted Authentication &bull; Kenya Pastoral Registry Verified
          </p>
        </div>
      </div>

      {/* ── RIGHT COLUMN: Registration Form ── */}
      <div className="w-full lg:w-1/2 xl:w-[52%] flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 py-12 lg:py-16 min-h-screen bg-[#FAF7F2]">
        <div className="w-full max-w-[460px]">
          <div className="mb-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#5C6D37] uppercase font-bold border-b border-[#5C6D37]/60 pb-0.5 inline-block">
              MEMBER APPLICATION
            </span>
          </div>

          <h1
            className="text-3xl sm:text-[40px] font-bold tracking-tight text-[#1A1208] leading-[1.15]"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            Join the <span className="text-[#B85D30]">Osotua Estate</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#6E6152] mt-2 mb-6">
            Already registered?{" "}
            <Link href="/login" className="text-[#B85D30] hover:underline font-medium">
              Sign in to your account &rarr;
            </Link>
          </p>

          {error && (
            <div className="mb-6 flex items-start gap-3 bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs p-3.5 rounded-[2px]">
              <i className="bi bi-exclamation-triangle-fill text-[#DC2626] text-sm flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {REGISTER_FIELDS.map((f) => (
              <div key={f.name}>
                <label className="font-mono text-[10px] text-[#5C4A2A] tracking-[0.16em] uppercase block mb-1.5 font-bold">
                  {f.label}
                </label>
                <input
                  name={f.name}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  required
                  placeholder={f.placeholder}
                  className="w-full bg-[#EFE9DF] border border-[#DDD4C4] text-[#1A1208] px-4 py-3 rounded-[2px] placeholder:text-[#9F9384] text-sm focus:outline-none focus:border-[#C48D2A] focus:ring-1 focus:ring-[#C48D2A] transition-all"
                />
              </div>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-[#5C4A2A] tracking-[0.16em] uppercase block mb-1.5 font-bold">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full bg-[#EFE9DF] border border-[#DDD4C4] text-[#1A1208] px-4 py-3 rounded-[2px] placeholder:text-[#9F9384] text-sm pr-10 focus:outline-none focus:border-[#C48D2A] focus:ring-1 focus:ring-[#C48D2A] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E7E70] hover:text-[#1A1208] transition-colors p-1"
                    aria-label="Toggle password visibility"
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} text-sm`} />
                  </button>
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] text-[#5C4A2A] tracking-[0.16em] uppercase block mb-1.5 font-bold">
                  CONFIRM PASSWORD
                </label>
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#EFE9DF] border border-[#DDD4C4] text-[#1A1208] px-4 py-3 rounded-[2px] placeholder:text-[#9F9384] text-sm focus:outline-none focus:border-[#C48D2A] focus:ring-1 focus:ring-[#C48D2A] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C58F28] hover:bg-[#B37E1C] active:scale-[0.99] text-[#1A1208] font-mono text-xs font-bold tracking-[0.14em] uppercase py-3.5 px-6 rounded-[2px] shadow-sm transition-all duration-200 mt-2 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <i className="bi bi-arrow-repeat animate-spin" />
                  <span>CREATING ACCOUNT...</span>
                </>
              ) : (
                <span>COMPLETE REGISTRATION</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
