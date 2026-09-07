import { useEffect, useRef, useState } from "react"

export function useCountUp(target: number, duration = 1800, initialValue?: number) {
  // Initialize with target (or provided initialValue) so there is never an unstyled flash of "0+"
  const [count, setCount] = useState<number>(initialValue ?? target)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        obs.disconnect()

        setCount(0)
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 4) // ease-out-quart
          setCount(Math.round(ease * target))
          if (progress < 1) {
            requestAnimationFrame(tick)
          }
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.15 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return { count, ref }
}
