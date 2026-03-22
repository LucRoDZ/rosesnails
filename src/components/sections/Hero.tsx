"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { HeroCanvas } from "@/components/3d/HeroCanvas";

export function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setScrollProgress(Math.max(0, Math.min(1, -rect.top / (rect.height * 0.8))));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(155deg, #0f0a0d 0%, #1a1018 50%, #2d1024 100%)" }}
      aria-label="Accueil"
    >
      {/* 3D canvas */}
      <HeroCanvas scrollProgress={scrollProgress} />

      {/* Radial vignette for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(15,10,13,0.65) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-2xl mx-auto">
        {/* Label */}
        <p className="section-label-dark mb-4">Prothésiste ongulaire</p>

        {/* Headline */}
        <h1
          className="font-bold text-white leading-[1.1] mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.75rem, 8vw, 5.5rem)",
          }}
        >
          L&apos;art des ongles,{" "}
          <em className="not-italic" style={{ color: "var(--rose-accent)" }}>sublimé.</em>
        </h1>

        {/* Divider accent */}
        <div
          className="mx-auto mb-6"
          style={{
            width: "2.5rem",
            height: "1.5px",
            background: "linear-gradient(90deg, var(--rose-principal), var(--rose-accent))",
            borderRadius: "1px",
          }}
          aria-hidden="true"
        />

        {/* Subtitle */}
        <p
          className="text-base md:text-lg mb-10 max-w-sm mx-auto leading-relaxed"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          Pose gel &amp; nail art personnalisé — chaque set est une œuvre.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link href="/#booking" className="btn-primary px-8 py-3.5">
            Prendre rendez-vous
          </Link>
          <Link href="/#services" className="btn-ghost px-8 py-3.5">
            Nos prestations
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.35)" }}>
          Découvrir
        </p>
        <div
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)" }}
        />
      </div>
    </section>
  );
}
