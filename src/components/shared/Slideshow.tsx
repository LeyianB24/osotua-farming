"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface Slide {
  src: string
  label: string
}

interface SlideshowProps {
  slides: Slide[]
  /** ms per slide */
  interval?: number
  /** height class, defaults to h-64 */
  heightClass?: string
  /** dark caption overlay */
  caption?: boolean
  className?: string
}

export default function Slideshow({
  slides,
  interval = 3500,
  heightClass = "h-64",
  caption = true,
  className = "",
}: SlideshowProps) {
  const [i, setI] = useState(0)
  const n = slides.length

  useEffect(() => {
    if (n <= 1) return
    const id = setInterval(() => setI((p) => (p + 1) % n), interval)
    return () => clearInterval(id)
  }, [n, interval])

  if (n === 0) return null

  return (
    <div className={`relative overflow-hidden rounded ${heightClass} ${className}`}>
      {slides.map((s, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: idx === i ? 1 : 0 }}
          aria-hidden={idx !== i}
        >
          <Image
            src={s.src}
            alt={s.label}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority={idx === 0}
          />
          {caption && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-mono text-[10px] text-[#C4882A] tracking-[0.22em] uppercase bg-[#1C1208]/60 px-2.5 py-1 rounded-sm">
                  {s.label}
                </span>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Dots */}
      {n > 1 && (
        <div className="absolute top-4 right-4 flex gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Show slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-6 bg-[#C4882A]" : "w-1.5 bg-[#F5EFE4]/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
