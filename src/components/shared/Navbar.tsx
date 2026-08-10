// src/components/shared/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { useCart } from "./CartContext";

const navLinks = [
  { label: "Our Breeds", href: "/breeds" },
  { label: "The Barn", href: "/barn" },
  { label: "Invest", href: "/invest" },
  { label: "Partners", href: "/partners" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Navbar({ cartCount: initialCartCount }: { cartCount?: number }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { cartCount: ctxCartCount } = useCart();
  const cartCount = ctxCartCount ?? initialCartCount ?? 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1C1208]/97 backdrop-blur-xl shadow-[0_4px_32px_rgba(0,0,0,0.4)] border-b border-[#C4882A]/10"
          : "bg-[#1C1208] border-b border-[#C4882A]/15"
      }`}
    >
      <div className="os-container">
        <div className="flex items-center justify-between h-[70px]">

          {/* Logo */}
          <Logo size="md" />

          {/* Desktop nav — center */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-mono text-[0.7rem] tracking-[0.18em] uppercase transition-colors duration-200 pb-0.5 ${
                    active
                      ? "text-[#C4882A]"
                      : "text-[#F5EFE4]/70 hover:text-[#C4882A]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#C4882A]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-[#F5EFE4]/60 hover:text-[#C4882A] transition-colors font-mono text-[0.68rem] tracking-wider uppercase flex items-center gap-1.5"
            >
              <i className="bi bi-person text-base leading-none" />
              Portal
            </Link>

            <Link
              href="/cart"
              className="relative text-[#F5EFE4]/70 hover:text-[#C4882A] transition-colors p-1.5"
              aria-label={`Cart (${cartCount} items)`}
            >
              <i className="bi bi-bag text-xl leading-none" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C4882A] text-[#1C1208] text-[9px] font-bold flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link href="/visit" className="btn-primary text-[0.72rem] py-2.5 px-5">
              Visit Us
              <i className="bi bi-arrow-right" />
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link href="/cart" className="relative text-[#F5EFE4]/70 p-1.5">
              <i className="bi bi-bag text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C4882A] text-[#1C1208] text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="text-[#F5EFE4] hover:text-[#C4882A] transition-colors p-1.5 focus-visible:outline-none"
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              <i className={`bi text-2xl ${open ? "bi-x-lg" : "bi-list"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden overflow-hidden bg-[#1C1208] border-t border-[#C4882A]/15"
          >
            <div className="os-container py-6 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 border-b border-white/5 font-mono text-[0.72rem] tracking-[0.18em] uppercase transition-colors ${
                      active ? "text-[#C4882A]" : "text-[#F5EFE4]/70 hover:text-[#C4882A]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/visit"
                onClick={() => setOpen(false)}
                className="btn-primary mt-4 justify-center text-center"
              >
                <i className="bi bi-geo-alt" />
                Visit the Ranch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
