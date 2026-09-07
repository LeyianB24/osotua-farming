import { useEffect, useRef, useState } from "react"

export function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()

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
      { threshold: 0.3 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return { count, ref }
}
