"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartContext";
import { LOGO } from "@/lib/images";
import RangelandsTelemetry from "./RangelandsTelemetry";

const navLinks = [
  { label: "Our Breeds", href: "/breeds" },
  { label: "The Barn", href: "/barn" },
  { label: "Invest", href: "/invest" },
  { label: "Partners", href: "/partners" },
  { label: "About", href: "/about" },
];

export default function Navbar({ cartCount: initialCartCount }: { cartCount?: number }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { cartCount: ctxCartCount } = useCart();
  const cartCount = ctxCartCount ?? initialCartCount ?? 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-[#C99A2E]/20 bg-[#1C1208]/98 backdrop-blur-md shadow-2xl py-2.5"
            : "border-white/10 bg-[#1C1208] py-3.5"
        }`}
      >
        <div className="os-container w-full">
          <div className="flex items-center justify-between">

            {/* Brand Logo & Wordmark (Exact Figma style) */}
            <Link href="/" className="flex items-center gap-2.5 no-underline group">
              {/* Circular logo mark */}
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#C99A2E]/50 bg-[#FAF7F2] shrink-0 shadow-sm">
                <Image
                  src={LOGO}
                  alt="Osotua Farming logo"
                  fill
                  sizes="36px"
                  priority
                  className="object-cover"
                />
              </div>
              <span
                className="text-2xl sm:text-[26px] font-bold italic text-[#C99A2E] leading-none tracking-tight group-hover:text-[#D9AA3E] transition-colors"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                Osotua
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4C9B0] mt-0.5">
                FARMING
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-7"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[13px] font-medium transition-all no-underline pb-0.5 ${
                      active
                        ? "text-[#C99A2E]"
                        : "text-[#F5F0E8]/85 hover:text-[#C99A2E]"
                    }`}
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C99A2E]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Actions (Exact Figma style) */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href="/visit"
                className="text-[13px] font-medium text-[#F5F0E8]/85 hover:text-[#C99A2E] transition-colors no-underline"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                Visit Us
              </Link>

              {/* Cart Button */}
              <Link
                href="/cart"
                className="relative w-8 h-8 flex items-center justify-center text-[#F5F0E8] hover:text-[#C99A2E] transition-colors no-underline"
                aria-label={`Cart with ${cartCount} items`}
              >
                <i className="bi bi-bag text-base" aria-hidden="true" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C99A2E] text-[#1C1208] text-[9px] font-extrabold flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* SHOP THE BARN CTA (Figma Exact) */}
              <Link
                href="/barn"
                className="bg-[#C99A2E] hover:bg-[#D9AA3E] text-[#1C1208] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.14em] no-underline transition-colors shadow-sm"
                style={{ borderRadius: "0px", fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                SHOP THE BARN
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2.5">
              <Link
                href="/cart"
                className="relative w-9 h-9 rounded-[2px] bg-white/[0.06] border border-white/15 flex items-center justify-center text-white no-underline"
                aria-label={`Shopping Cart (${cartCount} items)`}
              >
                <i className="bi bi-bag text-sm" aria-hidden="true" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#C99A2E] text-[#1C1208] text-[9px] font-extrabold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setOpen(!open)}
                className="w-9 h-9 rounded-[2px] bg-white/[0.06] border border-white/15 text-white flex items-center justify-center cursor-pointer hover:border-[#C99A2E] transition-colors"
                aria-expanded={open}
                aria-label="Toggle navigation menu"
              >
                <i className={`bi text-base ${open ? "bi-x-lg" : "bi-list"}`} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingTop: "88px",
              paddingBottom: "2.5rem",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
              backgroundColor: "rgba(22, 13, 5, 0.98)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              overflowY: "auto",
            }}
            className="lg:hidden"
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }} aria-label="Mobile navigation">
              {[...navLinks, { label: "Member Portal", href: "/dashboard" }].map((link, i) => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "1rem 0",
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                        textDecoration: "none",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontSize: "2rem",
                          fontWeight: 300,
                          letterSpacing: "-0.01em",
                          color: active ? "#C4882A" : "#FFFFFF",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {link.label}
                      </span>
                      <i className="bi bi-arrow-right" style={{ color: "#C4882A", opacity: 0.7, fontSize: "1rem" }} />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Mobile Footer CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.25 }}
              style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "2rem" }}
            >
              <Link
                href="/visit"
                onClick={() => setOpen(false)}
                className="btn-primary justify-center"
                style={{
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  padding: "0.875rem",
                }}
              >
                <span>Book Farm Visit</span>
                <i className="bi bi-calendar-check" />
              </Link>
              <a
                href="https://wa.me/254755758208"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost justify-center"
                style={{
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  padding: "0.875rem",
                }}
              >
                <i className="bi bi-whatsapp" style={{ color: "#25D366" }} />
                <span>WhatsApp Concierge</span>
              </a>

              {/* Official Social Links */}
              <div style={{ display: "flex", gap: "8px", justifyContent: "center", paddingTop: "0.5rem" }}>
                <a
                  href="https://www.instagram.com/osotua_ranches_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    borderRadius: "9999px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(196,136,42,0.3)",
                    color: "#FBF7F0",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    textDecoration: "none",
                  }}
                >
                  <i className="bi bi-instagram" style={{ color: "#C4882A" }} />
                  <span>@osotua_ranches_</span>
                </a>
                <a
                  href="https://www.tiktok.com/@osotua.ranches"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    borderRadius: "9999px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(196,136,42,0.3)",
                    color: "#FBF7F0",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    textDecoration: "none",
                  }}
                >
                  <i className="bi bi-tiktok" style={{ color: "#C4882A" }} />
                  <span>@osotua.ranches</span>
                </a>
              </div>
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "rgba(196,136,42,0.6)",
                  marginTop: "0.75rem",
                }}
              >
                Osotua &bull; Kajiado County, Kenya &bull; Est. 2026
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
