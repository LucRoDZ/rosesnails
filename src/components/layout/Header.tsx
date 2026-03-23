"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { brand } from "@/config/brand";

const navLinks = [
  { href: "/#services",  label: "Prestations" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#contact",   label: "Contact" },
];

export function Header() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/96 backdrop-blur-md" : "bg-transparent"
      }`}
      style={scrolled ? { borderBottom: "1px solid var(--border-rose)" } : {}}
      role="banner"
    >
      {/* ── Bar ──────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-[66px] md:h-[76px]">

          {/* Logo */}
          <Link href="/" aria-label={`${brand.name} — Accueil`} className="flex-shrink-0">
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)",
                fontWeight: 600,
                color: scrolled ? "var(--rose-principal)" : "white",
                transition: "color 300ms ease",
                letterSpacing: "-0.01em",
              }}
            >
              {brand.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium relative group transition-opacity hover:opacity-70"
                style={{
                  color: scrolled ? "var(--neutral-700)" : "rgba(255,255,255,0.78)",
                  letterSpacing: "0.01em",
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px transition-all duration-300"
                  style={{ background: scrolled ? "var(--rose-principal)" : "rgba(255,255,255,0.5)" }}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop auth + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Show when="signed-in">
              <Link
                href="/mes-rendez-vous"
                className="text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: scrolled ? "var(--rose-principal)" : "rgba(255,255,255,0.75)" }}
              >
                Mes RDV
              </Link>
              <UserButton />
            </Show>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  className="text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: scrolled ? "var(--neutral-700)" : "rgba(255,255,255,0.75)" }}
                >
                  Connexion
                </button>
              </SignInButton>
            </Show>
            <Link href="/#booking" className="btn-primary" style={{ padding: "0.625rem 1.5rem", fontSize: "0.875rem" }}>
              Prendre RDV
            </Link>
          </div>

          {/* Mobile — hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-colors"
            style={{
              background: menuOpen
                ? "var(--rose-50)"
                : scrolled
                ? "var(--rose-50)"
                : "rgba(255,255,255,0.1)",
            }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen ? (
              /* Close × */
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 2l12 12M14 2L2 14" stroke="var(--rose-principal)" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            ) : (
              /* Hamburger ≡ */
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                <path
                  d="M0 1h18M0 7h18M0 13h18"
                  stroke={scrolled ? "var(--neutral-800)" : "white"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile menu panel ────────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
        style={{
          background: "white",
          borderTop: menuOpen ? "1px solid var(--border-rose)" : "none",
          boxShadow: menuOpen ? "0 12px 40px rgba(26,15,22,0.12)" : "none",
        }}
      >
        {/* Consistent inset matching the header bar */}
        <div className="px-6 sm:px-10 pt-6 pb-8">

          {/* Nav links */}
          <nav className="space-y-1 mb-6" aria-label="Navigation mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between px-4 py-4 rounded-2xl text-base font-medium transition-colors group"
                style={{ color: "var(--neutral-800)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--rose-50)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                onClick={() => setMenuOpen(false)}
              >
                <span>{link.label}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="opacity-30 group-hover:opacity-70 transition-opacity"
                  aria-hidden="true"
                >
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="var(--rose-principal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Separator */}
          <div className="mb-6" style={{ height: "1px", background: "var(--border-rose)" }} />

          {/* Auth + CTA */}
          <div className="space-y-3">
            <Show when="signed-in">
              <Link
                href="/mes-rendez-vous"
                className="flex items-center px-4 py-3 rounded-2xl text-sm font-medium transition-colors"
                style={{ color: "var(--rose-principal)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--rose-50)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                onClick={() => setMenuOpen(false)}
              >
                Mes rendez-vous
              </Link>
              <div className="flex items-center gap-3 px-4 pb-2">
                <UserButton />
                <span className="text-sm" style={{ color: "var(--neutral-700)" }}>Mon compte</span>
              </div>
            </Show>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  className="flex items-center w-full px-4 py-3 rounded-2xl text-sm font-medium transition-colors text-left"
                  style={{ color: "var(--rose-principal)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--rose-50)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  Connexion / Inscription
                </button>
              </SignInButton>
            </Show>

            {/* CTA — inset on both sides, not touching edges */}
            <div className="pt-2">
              <Link
                href="/#booking"
                className="btn-primary w-full justify-center"
                style={{ borderRadius: "1rem" }}
                onClick={() => setMenuOpen(false)}
              >
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
