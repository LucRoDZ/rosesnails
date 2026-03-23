"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { brand } from "@/config/brand";

const navLinks = [
  { href: "/#services", label: "Prestations" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#booking", label: "Réservation" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => setMenuOpen(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        role="banner"
      >
        <div className="shell pt-3 md:pt-4">
          <div
            className="flex items-center justify-between h-[64px] md:h-[72px] rounded-2xl px-4 md:px-6 transition-all duration-300"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(189, 17, 72, 0.12)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              boxShadow: "0 10px 30px rgba(26,15,22,0.12)",
            }}
          >
            <Link href="/" aria-label={`${brand.name} — Accueil`} className="relative z-10">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.2rem, 2vw, 1.65rem)",
                  fontWeight: 600,
                  color: "var(--rose-principal)",
                  letterSpacing: "-0.01em",
                }}
              >
                {brand.name}
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-7" aria-label="Navigation principale">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium rounded-full px-3 py-1.5 transition-all duration-300"
                  style={{ color: "var(--neutral-800)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Show when="signed-in">
                <Link
                  href="/mes-rendez-vous"
                  className="text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: "var(--neutral-800)" }}
                >
                  Mes rendez-vous
                </Link>
                <UserButton />
              </Show>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button
                    className="text-sm font-medium transition-opacity hover:opacity-70"
                    style={{ color: "var(--neutral-800)" }}
                  >
                    Connexion
                  </button>
                </SignInButton>
              </Show>
            </div>

            <button
              className="md:hidden relative z-20 flex items-center justify-center w-10 h-10 rounded-xl transition-colors"
              style={{
                background: menuOpen
                  ? "var(--rose-principal)"
                  : scrolled
                  ? "var(--rose-50)"
                  : "var(--rose-50)",
                boxShadow: menuOpen ? "0 10px 24px rgba(189,17,72,0.35)" : "none",
              }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <span className="flex flex-col gap-[5px]" aria-hidden="true">
                <span
                  style={{
                    display: "block",
                    width: "18px",
                    height: "1.5px",
                    borderRadius: "999px",
                    backgroundColor: menuOpen ? "white" : "var(--neutral-800)",
                    transition: "transform 280ms cubic-bezier(0.4,0,0.2,1), opacity 200ms ease",
                    transform: menuOpen ? "rotate(45deg) translate(4px, 4.5px)" : "rotate(0)",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    width: "18px",
                    height: "1.5px",
                    borderRadius: "999px",
                    backgroundColor: menuOpen ? "white" : "var(--neutral-800)",
                    transition: "opacity 200ms ease, transform 280ms cubic-bezier(0.4,0,0.2,1)",
                    opacity: menuOpen ? 0 : 1,
                    transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
                  }}
                />
                <span
                  style={{
                    display: "block",
                    width: "18px",
                    height: "1.5px",
                    borderRadius: "999px",
                    backgroundColor: menuOpen ? "white" : "var(--neutral-800)",
                    transition: "transform 280ms cubic-bezier(0.4,0,0.2,1), opacity 200ms ease",
                    transform: menuOpen ? "rotate(-45deg) translate(4px, -4.5px)" : "rotate(0)",
                  }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            id="mobile-menu"
            className="md:hidden fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            style={{
              background: "linear-gradient(165deg, #0d0609 0%, #260d1e 45%, #3b1128 100%)",
            }}
            aria-hidden={!menuOpen}
          >
            <div
              className="h-full shell pb-12 flex flex-col overflow-y-auto"
              style={{
                paddingTop: "max(7.25rem, calc(env(safe-area-inset-top) + 6.25rem))",
              }}
            >
              <nav className="space-y-1.5" aria-label="Navigation mobile">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => {
                        setMenuOpen(false);
                        document.body.style.overflow = "";
                      }}
                      className="block py-3.5"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "white",
                        fontSize: "clamp(1.6rem, 7vw, 2.2rem)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 md:mt-auto space-y-4 rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.06)" }}>
                <Show when="signed-in">
                  <Link
                    href="/mes-rendez-vous"
                    className="block text-base font-medium"
                    style={{ color: "var(--rose-accent)" }}
                    onClick={() => {
                      setMenuOpen(false);
                      document.body.style.overflow = "";
                    }}
                  >
                    Accéder à mes rendez-vous
                  </Link>
                </Show>

                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button className="block text-base font-medium text-left" style={{ color: "var(--rose-accent)" }}>
                      Connexion / Inscription
                    </button>
                  </SignInButton>
                </Show>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
