"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartContext";
import { LOGO } from "@/lib/images";

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
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: scrolled ? "rgba(28, 18, 8, 0.98)" : "#1C1208",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(201, 154, 46, 0.15)",
          height: "76px",
          display: "flex",
          alignItems: "center",
          transition: "box-shadow 0.3s ease, background-color 0.3s ease",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <div className="os-container w-full">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

            {/* Brand Logo & Wordmark (Figma Exact) */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <span
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                  fontSize: "1.7rem",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "#C99A2E",
                  lineHeight: 1,
                  display: "inline-block",
                }}
              >
                Osotua
              </span>
              <span
                style={{
                  fontFamily: "var(--font-source-sans), var(--font-jakarta), system-ui, sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#D4C9B0",
                  marginTop: "3px",
                }}
              >
                FARMING
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-8"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-source-sans), var(--font-jakarta), system-ui, sans-serif",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: active ? "#C99A2E" : "rgba(245, 240, 232, 0.85)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                      position: "relative",
                      paddingBottom: "2px",
                    }}
                    className="hover:text-[#C99A2E]"
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active-underline"
                        style={{
                          position: "absolute",
                          bottom: "-2px",
                          left: 0,
                          right: 0,
                          height: "1.5px",
                          background: "#C99A2E",
                          borderRadius: "2px",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Visit Us link */}
              <Link
                href="/visit"
                style={{
                  fontFamily: "var(--font-source-sans), var(--font-jakarta), system-ui, sans-serif",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "rgba(245, 240, 232, 0.85)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                className="hover:text-[#C99A2E]"
              >
                Visit Us
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                style={{
                  position: "relative",
                  width: "36px",
                  height: "36px",
                  borderRadius: "2px",
                  background: "rgba(245,240,232,0.06)",
                  border: "1px solid rgba(245,240,232,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#F5F0E8",
                  textDecoration: "none",
                  transition: "border-color 0.2s ease",
                }}
                aria-label={`Cart with ${cartCount} items`}
              >
                <i className="bi bi-bag text-sm" aria-hidden="true" />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: "#C99A2E",
                      color: "#1C1208",
                      fontSize: "9px",
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* SHOP THE BARN CTA (Figma Gold Fill, rectangular) */}
              <Link
                href="/barn"
                className="btn-gold"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.65rem 1.4rem",
                  fontSize: "0.78rem",
                  letterSpacing: "0.14em",
                  fontWeight: 700,
                  borderRadius: "2px",
                  backgroundColor: "#C99A2E",
                  color: "#1C1208",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                SHOP THE BARN
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/cart"
                style={{
                  position: "relative",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  textDecoration: "none",
                }}
                aria-label={`Shopping Cart (${cartCount} items)`}
              >
                <i className="bi bi-bag text-base" aria-hidden="true" />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: "#C4882A",
                      color: "#1C1208",
                      fontSize: "9px",
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setOpen(!open)}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                aria-expanded={open}
                aria-label="Toggle navigation menu"
              >
                <i className={`bi text-lg ${open ? "bi-x-lg" : "bi-list"}`} aria-hidden="true" />
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
              {[...navLinks, { label: "Customer Portal", href: "/dashboard" }].map((link, i) => {
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
