"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function StickyBookingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 md:hidden ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <Link
        href="/#booking"
        className="btn-primary shadow-rose px-8 py-3.5 text-sm font-semibold"
        tabIndex={visible ? 0 : -1}
      >
        Prendre rendez-vous
      </Link>
    </div>
  );
}
