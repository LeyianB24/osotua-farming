import Image from "next/image"
import { LOGO } from "@/lib/images"

interface BadgeProps {
  size?: number
  className?: string
  showText?: boolean
  subtext?: string
}

export function OsotuaLogoBadge({ size = 44, className = "", showText = false, subtext = "Pastoral Smart Farm &bull; Kenya" }: BadgeProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div
        className="relative rounded-full overflow-hidden ring-2 ring-[#C4882A]/50 shadow-md bg-white shrink-0"
        style={{ width: size, height: size }}
      >
        <Image
          src={LOGO}
          alt="Osotua Farming Official Logo"
          fill
          sizes={`${size}px`}
          className="object-cover"
          priority
        />
      </div>
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className="font-bold text-base sm:text-lg tracking-tight text-[#1C1208] leading-tight"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            Osotua Farming
          </span>
          <span
            className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#8E5E16]"
            dangerouslySetInnerHTML={{ __html: subtext }}
          />
        </div>
      )}
    </div>
  )
}

export function OsotuaQualitySeal({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border border-amber-500/30 bg-white/90 backdrop-blur-md shadow-lg shadow-amber-900/10 ${className}`}
    >
      <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#C4882A] shrink-0">
        <Image
          src={LOGO}
          alt="Osotua Certified Seal"
          fill
          sizes="32px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col text-left">
        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#8E5E16]">
          Osotua Certified
        </span>
        <span className="font-sans text-[11px] font-semibold text-[#1C1208]">
          100% Pasture-Raised &bull; Kajiado
        </span>
      </div>
    </div>
  )
}

export function OsotuaWatermark({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none absolute opacity-[0.04] dark:opacity-[0.03] ${className}`}>
      <div className="relative w-80 h-80 sm:w-96 sm:h-96">
        <Image
          src={LOGO}
          alt=""
          fill
          sizes="384px"
          className="object-contain"
        />
      </div>
    </div>
  )
}
