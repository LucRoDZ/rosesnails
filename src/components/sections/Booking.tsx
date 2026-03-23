"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { brand } from "@/config/brand";

export function Booking() {
  const { user, isLoaded } = useUser();

  const calUrl = (() => {
    const base = `${brand.calcom.baseUrl}/${brand.calcom.username}`;
    const params = new URLSearchParams({
      embed: "true",
      theme: "light",
      layout: "month_view",
      brandColor: "#BD1148",
    });
    if (user) {
      const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
      if (fullName) params.set("name", fullName);
      const email = user.primaryEmailAddress?.emailAddress;
      if (email) params.set("email", email);
      params.set("metadata[clerkUserId]", user.id);
    }
    return `${base}?${params.toString()}`;
  })();

  return (
    <section
      id="booking"
      className="relative section-block overflow-hidden"
      style={{
        background: "linear-gradient(160deg, white 0%, #FFF5F8 40%, #FFF0F5 100%)",
      }}
    >
      {/* Soft glow */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[400px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at top left, rgba(189,17,72,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative shell max-w-5xl">

        {/* Header */}
        <div className="mb-14 md:mb-20 section-head lg:items-start lg:text-left">
          <span className="section-label">Réservation</span>
          <div className="divider-rose mt-1 mb-1 lg:mx-0" />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mt-2 w-full">
            <h2 className="section-title">
              Prendre{" "}
              <em style={{ fontStyle: "italic", color: "var(--rose-principal)" }}>rendez-vous</em>
            </h2>
            <p
              className="text-base leading-relaxed section-copy lg:max-w-xs lg:mx-0"
              style={{ color: "var(--neutral-700)" }}
            >
              Choisissez votre prestation et votre créneau directement en ligne.
            </p>
          </div>
        </div>

        {/* Calendar container */}
        <div
          className="rounded-2xl overflow-hidden border"
          style={{
            borderColor: "var(--border-rose)",
            minHeight: "660px",
            boxShadow: "var(--shadow-card)",
            background: "white",
          }}
        >
          {!isLoaded ? (
            <div
              className="w-full animate-pulse"
              style={{ height: "660px", background: "var(--neutral-100)" }}
              role="status"
              aria-label="Chargement…"
            />
          ) : !user ? (
            <div
              className="flex flex-col items-center justify-center gap-9 text-center px-8 py-24"
              style={{ minHeight: "660px" }}
            >
              {/* Lock icon */}
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center"
                style={{ background: "var(--rose-50)" }}
                aria-hidden="true"
              >
                <svg
                  className="w-9 h-9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{ color: "var(--rose-principal)" }}
                >
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" />
                </svg>
              </div>

              <div className="max-w-sm">
                <p
                  className="font-semibold mb-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                    color: "var(--neutral-800)",
                    lineHeight: 1.1,
                  }}
                >
                  Connexion requise
                </p>
                <p className="text-base leading-relaxed" style={{ color: "var(--neutral-700)" }}>
                  Créez un compte gratuit pour réserver et retrouver vos rendez-vous facilement.
                </p>
              </div>

              <SignInButton mode="modal">
                <button className="btn-primary">
                  Se connecter pour réserver
                </button>
              </SignInButton>
            </div>
          ) : (
            <iframe
              src={calUrl}
              width="100%"
              height="660"
              title="Calendrier de réservation RosesNails"
              loading="lazy"
              style={{ display: "block", border: "none" }}
            />
          )}
        </div>

        {user && (
          <p className="text-center mt-5 text-sm" style={{ color: "var(--neutral-700)", opacity: 0.55 }}>
            Problème avec le calendrier ?{" "}
            <a
              href={`${brand.calcom.baseUrl}/${brand.calcom.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
              style={{ color: "var(--rose-principal)" }}
            >
              Ouvrir la réservation
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
