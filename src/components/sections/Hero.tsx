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
      style={{ background: "linear-gradient(155deg, #0a0608 0%, #160c13 40%, #260d1e 100%)" }}
      aria-label="Accueil"
    >
      {/* 3D canvas */}
      <HeroCanvas scrollProgress={scrollProgress} />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 90% 75% at 50% 55%, transparent 10%, rgba(10,6,8,0.72) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        {/* Pill label */}
        <div
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10"
          style={{
            border: "1px solid rgba(254,146,191,0.2)",
            background: "rgba(254,146,191,0.06)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "var(--rose-accent)" }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6875rem",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--rose-accent)",
            }}
          >
            Prothésiste ongulaire · Paris
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.25rem, 10vw, 7rem)",
            fontWeight: 600,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "white",
          }}
        >
          L&apos;art des ongles,
          <br />
          <em
            className="not-italic"
            style={{ color: "var(--rose-accent)", fontStyle: "italic" }}
          >
            sublimé.
          </em>
        </h1>

        {/* Divider */}
        <div
          className="mx-auto mt-9 mb-9"
          style={{
            width: "4rem",
            height: "1.5px",
            background: "linear-gradient(90deg, transparent, var(--rose-principal), var(--rose-accent), transparent)",
            borderRadius: "1px",
          }}
          aria-hidden="true"
        />

        {/* Subtitle */}
        <p
          className="mb-14 leading-relaxed mx-auto"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            maxWidth: "30rem",
            fontFamily: "var(--font-body)",
          }}
        >
          Pose gel &amp; nail art personnalisé — chaque set est une œuvre.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/#booking" className="btn-primary">
            Prendre rendez-vous
          </Link>
          <Link href="/#services" className="btn-ghost">
            Voir les prestations
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        aria-hidden="true"
      >
        <div
          className="w-px h-14"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)" }}
        />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ color: "rgba(255,255,255,0.25)" }}>
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
