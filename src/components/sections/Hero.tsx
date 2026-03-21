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
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / (rect.height * 0.8))
      );
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0f0a0d 0%, #1a1018 40%, #2d1024 100%)" }}
      aria-label="Accueil"
    >
      {/* 3D Background */}
      <HeroCanvas scrollProgress={scrollProgress} />

      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(15,10,13,0.7) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <p
          className="text-sm font-semibold uppercase tracking-[0.25em] mb-4"
          style={{ color: "var(--rose-accent)" }}
        >
          Prothésiste ongulaire · Paris
        </p>
        <h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          L&apos;art des ongles,{" "}
          <span style={{ color: "var(--rose-accent)" }}>sublimé.</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
          Pose gel, acrylique, nail art personnalisé. Vivez une expérience unique dans un cadre élégant.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/#booking" className="btn-primary text-base px-8 py-4">
            Prendre rendez-vous
          </Link>
          <Link
            href="/#services"
            className="btn-outline text-base px-8 py-4"
            style={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}
          >
            Voir les prestations
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <p className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
          Découvrir
        </p>
        <div
          className="w-px h-12"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }}
        />
      </div>
    </section>
  );
}
