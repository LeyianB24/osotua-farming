"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ShoppingBag } from "lucide-react"

const navLinks = [
  { label: "Our Breeds", href: "/breeds" },
  { label: "The Barn", href: "/barn" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Get Involved", href: "/careers" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1C1208]/95 backdrop-blur border-b border-[#C4882A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C4882A] flex items-center justify-center font-serif text-[#1C1208] font-semibold text-sm">
              OF
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-[#F5EFE4] text-base font-semibold tracking-wide">
                Osotua Farming
              </span>
              <span className="font-mono text-[#C4882A] text-[10px] tracking-widest uppercase">
                Kajiado · Kenya
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#F5EFE4]/70 hover:text-[#C4882A] text-sm font-medium tracking-wide uppercase transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/barn"
              className="text-[#F5EFE4]/70 hover:text-[#C4882A] transition-colors"
            >
              <ShoppingBag size={20} />
            </Link>
            <Link
              href="/visit"
              className="bg-[#C4882A] text-[#1C1208] text-sm font-medium px-4 py-2 rounded-sm hover:bg-[#d99a30] transition-colors"
            >
              Visit Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#F5EFE4]"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#1C1208] border-t border-[#C4882A]/20 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[#F5EFE4]/70 hover:text-[#C4882A] text-sm font-medium tracking-wide uppercase"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/visit"
            onClick={() => setOpen(false)}
            className="bg-[#C4882A] text-[#1C1208] text-sm font-medium px-4 py-2 rounded-sm text-center"
          >
            Visit Us
          </Link>
        </div>
      )}
    </nav>
  )
}
