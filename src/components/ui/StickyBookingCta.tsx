"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function StickyBookingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 md:hidden ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <Link
        href="/#booking"
        className="btn-primary px-7 py-3 text-sm"
        tabIndex={visible ? 0 : -1}
        style={{ boxShadow: "0 4px 20px rgba(189,17,72,0.35), 0 2px 8px rgba(0,0,0,0.15)" }}
      >
        Prendre rendez-vous
      </Link>
    </div>
  );
}
