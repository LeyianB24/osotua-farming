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
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`os-navbar transition-all duration-500 ${
          scrolled ? "glass-nav-scrolled" : "glass-nav"
        }`}
        style={{ top: 0, left: 0, right: 0, position: "fixed", zIndex: 100 }}
      >
        <div className="os-container">
          <div className="flex items-center justify-between" style={{ height: "72px" }}>

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
                    className={`relative font-mono text-[0.68rem] tracking-[0.2em] uppercase transition-colors duration-200 pb-0.5 ${
                      active ? "text-[#C4882A]" : "text-[#F5EFE4]/65 hover:text-[#C4882A]"
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
            <div className="hidden lg:flex items-center gap-3">
              {/* WhatsApp */}
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-[#F5EFE4]/55 hover:text-[#25D366] transition-colors p-1.5"
              >
                <i className="bi bi-whatsapp text-xl leading-none" />
              </a>

              {/* Portal */}
              <Link
                href="/dashboard"
                className="text-[#F5EFE4]/55 hover:text-[#C4882A] transition-colors font-mono text-[0.65rem] tracking-wider uppercase flex items-center gap-1.5"
              >
                <i className="bi bi-person-circle text-base leading-none" />
                Portal
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative text-[#F5EFE4]/65 hover:text-[#C4882A] transition-colors p-1.5"
                aria-label={`Cart (${cartCount} items)`}
              >
                <i className="bi bi-bag text-xl leading-none" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[#1C1208] text-[9px] font-bold flex items-center justify-center leading-none"
                    style={{ background: "linear-gradient(135deg, #C4882A, #D99A30)" }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* CTA */}
              <Link href="/visit" className="btn-primary text-[0.7rem] py-2.5 px-5">
                Visit Us
                <i className="bi bi-arrow-right" />
              </Link>
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-3 lg:hidden">
              <Link href="/cart" className="relative text-[#F5EFE4]/65 p-1.5">
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

        {/* Mobile full-screen glass overlay menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden fixed inset-0 top-[72px]"
              style={{
                background: "rgba(28, 18, 8, 0.96)",
                WebkitBackdropFilter: "blur(40px) saturate(200%)",
                backdropFilter: "blur(40px) saturate(200%)",
                zIndex: 99,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "2rem 2rem 4rem",
              }}
            >
              {/* Decorative glow */}
              <div style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(196,136,42,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />

              <nav className="relative flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "1rem 0",
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                          fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                          fontSize: "clamp(1.8rem, 7vw, 2.5rem)",
                          fontWeight: 300,
                          color: active ? "#C4882A" : "#F5EFE4",
                          textDecoration: "none",
                          transition: "color 0.2s ease",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {link.label}
                        <i className="bi bi-arrow-right" style={{ fontSize: "1rem", color: "#C4882A", opacity: active ? 1 : 0.4 }} />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.35 }}
                className="relative mt-8 flex flex-col gap-3"
              >
                <Link
                  href="/visit"
                  onClick={() => setOpen(false)}
                  className="btn-primary justify-center text-center"
                >
                  <i className="bi bi-geo-alt-fill" />
                  Visit the Ranch
                </Link>
                <a
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost justify-center text-center"
                >
                  <i className="bi bi-whatsapp" />
                  WhatsApp Us
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
