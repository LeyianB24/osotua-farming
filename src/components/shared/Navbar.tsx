"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartContext";
import { LOGO } from "@/lib/images";

const navLinks = [
  { label: "Breeds", href: "/breeds" },
  { label: "Barn Store", href: "/barn" },
  { label: "About", href: "/about" },
  { label: "Partners", href: "/partners" },
  { label: "Visit", href: "/visit" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ cartCount: initialCartCount }: { cartCount?: number }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { cartCount: ctxCartCount } = useCart();
  const cartCount = ctxCartCount ?? initialCartCount ?? 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 border-b border-[#C4882A]/20 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            : "py-5 bg-transparent border-b border-transparent"
        }`}
        style={{
          backgroundColor: scrolled ? "var(--g-nav)" : "transparent",
          backdropFilter: scrolled ? "blur(40px) saturate(200%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(40px) saturate(200%)" : "none",
        }}
      >
        <div className="os-container">
          <div className="flex items-center justify-between">

            {/* Brand Logo & Wordmark */}
            <Link href="/" className="flex items-center gap-3.5 no-underline group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-[#C4882A]/50 group-hover:ring-[#C4882A] transition-all bg-[#1C1208] shrink-0 shadow-lg group-hover:scale-105">
                <Image
                  src={LOGO}
                  alt="Osotua Farming Logo Emblem"
                  fill
                  sizes="40px"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-light text-xl tracking-tight text-[#FBF7F0] leading-none group-hover:text-[#C4882A] transition-colors"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  Osotua Farming
                </span>
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-[#C4882A] mt-1">
                  Kajiado &bull; Kenya
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[13px] tracking-wide transition-colors duration-200 py-1 no-underline uppercase font-medium ${
                      active ? "text-[#C4882A]" : "text-[#FBF7F0]/75 hover:text-[#FBF7F0]"
                    }`}
                    style={{ fontFamily: "var(--font-space-grotesk), monospace" }}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-pill-active"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C4882A] rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-3.5">
              {/* WhatsApp Icon Button */}
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Osotua on WhatsApp"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/15 hover:border-[#25D366]/40 transition-all hover:scale-105"
              >
                <i className="bi bi-whatsapp text-sm" aria-hidden="true" />
              </a>

              {/* Cart Button */}
              <Link
                href="/cart"
                className="relative w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FBF7F0] hover:text-[#C4882A] hover:border-[#C4882A]/40 transition-all no-underline hover:scale-105"
                aria-label={`Cart with ${cartCount} items`}
              >
                <i className="bi bi-bag text-sm" aria-hidden="true" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C4882A] text-[#1C1208] text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Portal link */}
              <Link
                href="/login"
                className="text-[11px] font-medium uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-[#FBF7F0]/80 hover:text-[#FBF7F0] hover:border-white/25 transition-all no-underline"
                style={{ fontFamily: "var(--font-space-grotesk), monospace" }}
              >
                Portal
              </Link>

              {/* Gold Pill Button: Visit Us */}
              <Link
                href="/visit"
                className="btn-primary text-[11px] py-2 px-5 shadow-[0_8px_24px_rgba(196,136,42,0.25)]"
                style={{ fontFamily: "var(--font-space-grotesk), monospace" }}
              >
                <span>Visit Us</span>
                <i className="bi bi-arrow-right text-xs" aria-hidden="true" />
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2.5 lg:hidden">
              <Link
                href="/cart"
                className="relative w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FBF7F0]"
                aria-label={`Shopping Cart (${cartCount} items)`}
              >
                <i className="bi bi-bag text-base" aria-hidden="true" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C4882A] text-[#1C1208] text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setOpen(!open)}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-[#FBF7F0] hover:text-[#C4882A] transition-colors flex items-center justify-center focus-visible:outline-none"
                aria-expanded={open}
                aria-label="Toggle navigation menu"
              >
                <i className={`bi text-lg ${open ? "bi-x-lg" : "bi-list"}`} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Glass Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="lg:hidden fixed inset-0 z-40 flex flex-col justify-between pt-24 pb-10 px-6 overflow-y-auto"
            style={{
              backgroundColor: "rgba(22, 13, 5, 0.96)",
              backdropFilter: "blur(40px) saturate(200%)",
              WebkitBackdropFilter: "blur(40px) saturate(200%)",
            }}
          >
            <nav className="flex flex-col gap-2 mt-4" aria-label="Mobile navigation menu">
              {navLinks.map((link, i) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-4 border-b border-white/10 no-underline"
                    >
                      <span
                        className={`text-3xl font-light tracking-tight transition-colors ${
                          active ? "text-[#C4882A]" : "text-[#FBF7F0] group-hover:text-[#C4882A]"
                        }`}
                        style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                      >
                        {link.label}
                      </span>
                      <i
                        className="bi bi-arrow-right text-lg text-[#C4882A] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
              >
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between py-4 border-b border-white/10 no-underline"
                >
                  <span
                    className="text-3xl font-light tracking-tight text-[#FBF7F0] group-hover:text-[#C4882A] transition-colors"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    Customer Portal
                  </span>
                  <i
                    className="bi bi-arrow-right text-lg text-[#C4882A] opacity-60 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            </nav>

            {/* Mobile Footer CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="flex flex-col gap-3 mt-8"
            >
              <Link
                href="/visit"
                onClick={() => setOpen(false)}
                className="btn-primary text-center justify-center py-3.5"
                style={{ fontFamily: "var(--font-space-grotesk), monospace" }}
              >
                <span>Book Farm Visit</span>
                <i className="bi bi-calendar-check" aria-hidden="true" />
              </Link>

              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-center justify-center py-3.5"
                style={{ fontFamily: "var(--font-space-grotesk), monospace" }}
              >
                <i className="bi bi-whatsapp text-[#25D366]" aria-hidden="true" />
                <span>WhatsApp Concierge</span>
              </a>

              <p className="text-center text-[10px] uppercase font-mono tracking-[0.2em] text-[#C4882A]/70 mt-3">
                Osotua &bull; Kajiado County, Kenya &bull; Est. 2026
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
