"use client"

import { useEffect } from "react"

export default function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    )

    function observeElements() {
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
        observer.observe(el)
      })
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", observeElements)
    } else {
      observeElements()
    }

    const mutationObserver = new MutationObserver(() => {
      observeElements()
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
      document.removeEventListener("DOMContentLoaded", observeElements)
    }
  }, [])

  return null
}
