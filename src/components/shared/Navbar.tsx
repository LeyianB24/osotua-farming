"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { useCart } from "./CartContext";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Our farmers", href: "/partners" },
  { label: "Breeds", href: "/breeds" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
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
        className={`os-navbar transition-all duration-300 ${
          scrolled ? "glass-nav-scrolled" : "glass-nav"
        }`}
        style={{ top: 0, left: 0, right: 0, position: "fixed", zIndex: 100 }}
      >
        <div className="os-container">
          <div className="flex items-center justify-between" style={{ height: "72px" }}>

            {/* Logo */}
            <Logo size="md" textColor="dark" />

            {/* Desktop nav — center */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-xs tracking-normal font-medium transition-colors duration-200 pb-0.5 ${
                      active ? "text-[#C4882A] font-semibold" : "text-[#1C1208]/80 hover:text-[#C4882A]"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#C4882A]"
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
                className="text-[#1C1208]/75 hover:text-[#25D366] transition-colors p-1.5"
              >
                <i className="bi bi-whatsapp text-lg leading-none" />
              </a>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative text-[#1C1208]/75 hover:text-[#C4882A] transition-colors p-1.5"
                aria-label={`Cart (${cartCount} items)`}
              >
                <i className="bi bi-bag text-lg leading-none" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[#FFFFFF] text-[9px] font-bold flex items-center justify-center leading-none"
                    style={{ background: "linear-gradient(135deg, #C4882A, #D99A30)" }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Sign In / Portal */}
              <Link
                href="/dashboard"
                className="btn-primary text-xs py-2 px-4 shadow-sm"
              >
                <i className="bi bi-person-circle" />
                <span>Portal</span>
              </Link>
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/cart"
                className="relative text-[#1C1208]/80 p-2"
                aria-label={`Cart (${cartCount} items)`}
              >
                <i className="bi bi-bag text-xl" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#C4882A] text-[#FFFFFF] text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setOpen(!open)}
                className="text-[#1C1208] hover:text-[#C4882A] transition-colors p-2 focus-visible:outline-none flex items-center justify-center"
                aria-expanded={open}
                aria-label="Toggle menu"
              >
                <i className={`bi text-2xl ${open ? "bi-x-lg" : "bi-list"}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen drawer menu — rendered outside header to prevent stacking/clipping issues */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed left-0 right-0 bottom-0"
            style={{
              top: "72px",
              height: "calc(100dvh - 72px)",
              background: "#FBF7F0",
              zIndex: 99,
              overflowY: "auto",
              overflowX: "hidden",
              WebkitOverflowScrolling: "touch",
              borderTop: "1px solid rgba(196,136,42,0.15)",
              boxShadow: "0 20px 40px rgba(28, 18, 8, 0.08)",
            }}
          >
            <div
              className="os-container"
              style={{
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingTop: "1.5rem",
                paddingBottom: "2.5rem",
              }}
            >
              {/* Navigation links */}
              <nav className="flex flex-col gap-1 w-full" aria-label="Mobile navigation">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
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
                        className="group flex items-center justify-between py-3.5 transition-colors"
                        style={{
                          borderBottom: "1px solid rgba(196,136,42,0.12)",
                          textDecoration: "none",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                            fontSize: "1.75rem",
                            fontWeight: active ? 600 : 400,
                            color: active ? "#C4882A" : "#1C1208",
                            letterSpacing: "-0.01em",
                            lineHeight: 1.2,
                          }}
                        >
                          {link.label}
                        </span>
                        <i
                          className="bi bi-arrow-right text-base transition-transform group-hover:translate-x-1"
                          style={{ color: "#C4882A", opacity: active ? 1 : 0.4 }}
                        />
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Dashboard Portal Link */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.04, duration: 0.25 }}
                >
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between py-3.5 transition-colors"
                    style={{
                      borderBottom: "1px solid rgba(196,136,42,0.12)",
                      textDecoration: "none",
                    }}
                  >
                    <span
                      className="flex items-center gap-2.5"
                      style={{
                        fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                        fontSize: "1.75rem",
                        fontWeight: pathname.startsWith("/dashboard") ? 600 : 400,
                        color: pathname.startsWith("/dashboard") ? "#C4882A" : "#1C1208",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.2,
                      }}
                    >
                      <i className="bi bi-person-circle text-xl text-[#C4882A]" />
                      Customer Portal
                    </span>
                    <i
                      className="bi bi-arrow-right text-base transition-transform group-hover:translate-x-1"
                      style={{ color: "#C4882A", opacity: pathname.startsWith("/dashboard") ? 1 : 0.4 }}
                    />
                  </Link>
                </motion.div>
              </nav>

              {/* Bottom Quick Action CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.04, duration: 0.25 }}
                className="mt-8 flex flex-col gap-3 w-full"
              >
                <Link
                  href="/visit"
                  onClick={() => setOpen(false)}
                  className="btn-primary justify-center text-center py-3.5 text-xs tracking-wider"
                  style={{ width: "100%" }}
                >
                  <i className="bi bi-geo-alt-fill" />
                  VISIT THE RANCH
                </Link>

                <a
                  href="https://wa.me/254700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost justify-center text-center py-3 text-xs tracking-wider font-bold"
                  style={{
                    width: "100%",
                    color: "#1C1208",
                    borderColor: "rgba(196,136,42,0.35)",
                    background: "rgba(255,255,255,0.7)",
                  }}
                >
                  <i className="bi bi-whatsapp text-[#25D366] text-base" />
                  WHATSAPP US
                </a>

                <div className="text-center mt-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8E5E16]/80">
                    Kajiado, Kenya &bull; Ethical Breeding &amp; Artisanal Produce
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
