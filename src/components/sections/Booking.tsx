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
    <section id="booking" className="py-16 md:py-24" style={{ backgroundColor: "white" }}>
      <div className="max-w-4xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">Réservation</span>
          <div className="divider-rose-center" />
          <h2 className="section-title">Prendre rendez-vous</h2>
          <p className="mt-4 max-w-md mx-auto text-sm md:text-base" style={{ color: "var(--neutral-700)" }}>
            Choisissez votre prestation et votre créneau directement en ligne.
          </p>
        </div>

        {/* Calendar container */}
        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "var(--border-rose)", minHeight: "660px" }}
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
              className="flex flex-col items-center justify-center gap-6 text-center px-6 py-16"
              style={{ minHeight: "660px", background: "var(--neutral-50)" }}
            >
              {/* Lock icon */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "var(--rose-100)" }}
                aria-hidden="true"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  style={{ color: "var(--rose-principal)" }}
                >
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" />
                </svg>
              </div>

              <div>
                <p className="font-semibold text-lg mb-2" style={{ color: "var(--neutral-800)", fontFamily: "var(--font-display)" }}>
                  Connexion requise
                </p>
                <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "var(--neutral-700)" }}>
                  Créez un compte gratuit pour réserver et retrouver vos rendez-vous facilement.
                </p>
              </div>

              <SignInButton mode="modal">
                <button className="btn-primary px-8">
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
          <p className="text-center mt-4 text-sm" style={{ color: "var(--neutral-700)", opacity: 0.7 }}>
            Problème avec le calendrier ?{" "}
            <a
              href={`${brand.calcom.baseUrl}/${brand.calcom.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
              style={{ color: "var(--rose-principal)" }}
            >
              Réservez directement sur Cal.com
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
