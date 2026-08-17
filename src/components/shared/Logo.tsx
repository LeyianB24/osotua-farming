import Image from "next/image"
import Link from "next/link"
import { LOGO } from "@/lib/images"

type Size = "sm" | "md" | "lg" | "xl"

const sizes: Record<Size, { box: number; title: string; sub: boolean }> = {
  sm: { box: 32, title: "text-sm", sub: true },
  md: { box: 40, title: "text-base", sub: true },
  lg: { box: 56, title: "text-lg", sub: true },
  xl: { box: 80, title: "text-2xl", sub: false },
}

interface LogoProps {
  size?: Size
  asLink?: boolean
  /** Show "Osotua Farming" wordmark next to the mark */
  wordmark?: boolean
  /** Use a stacking layout (logo above text). ideal for auth screens */
  stacked?: boolean
  /** Text color variant: 'light' (default, #F5EFE4) or 'dark' (#1C1208) */
  textColor?: "light" | "dark"
}

export default function Logo({
  size = "md",
  asLink = true,
  wordmark = true,
  stacked = false,
  className = "",
  textColor = "light",
}: LogoProps) {
  const { box, title } = sizes[size]

  const mark = (
    <Image
      src={LOGO}
      alt="Osotua Farming logo"
      width={box}
      height={box}
      priority
      className="rounded-full object-cover ring-1 ring-[#C4882A]/30"
      sizes={`${box}px`}
    />
  )

  const isDark = textColor === "dark"

  const text = wordmark && (
    <div className={`flex ${stacked ? "flex-col items-center text-center" : "flex-col leading-tight"}`}>
      <span className={`font-serif ${title} font-semibold tracking-tight ${isDark ? "text-[#1C1208]" : "text-[#F5EFE4]"}`}>
        Osotua Farming
      </span>
      {sizes[size].sub && (
        <span className={`font-mono ${isDark ? "text-[#8E5E16]" : "text-[#C4882A]"} text-[10px] tracking-[0.22em] uppercase flex items-center gap-1.5 mt-0.5`}>
          <span>Kajiado</span>
          <span className={isDark ? "text-[#8E5E16]/60" : "text-[#C4882A]/60"}>&bull;</span>
          <span>Kenya</span>
        </span>
      )}
    </div>
  )

  const content = (
    <span className={`inline-flex items-center ${stacked ? "flex-col gap-3" : "gap-3"} group`}>
      {mark}
      {text}
    </span>
  )

  if (!asLink) {
    return <span className={className}>{content}</span>
  }

  return (
    <Link
      href="/"
      aria-label="Osotua Farming home"
      className={`inline-flex transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4882A] rounded-sm p-1 ${className}`}
    >
      {content}
    </Link>
  )
}
