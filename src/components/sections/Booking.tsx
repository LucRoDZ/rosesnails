"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { brand } from "@/config/brand";

export function Booking() {
  const { user, isLoaded } = useUser();

  // Build Cal.com URL — pré-rempli avec les infos Clerk si connecté
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
      // Passé au webhook pour lier la réservation au compte Clerk
      params.set("metadata[clerkUserId]", user.id);
    }

    return `${base}?${params.toString()}`;
  })();

  return (
    <section id="booking" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--rose-accent)" }}
          >
            Réservation
          </p>
          <h2 className="section-title">Prendre rendez-vous</h2>
          <p className="mt-4 max-w-lg mx-auto" style={{ color: "var(--neutral-700)" }}>
            Choisissez votre prestation et votre créneau directement en ligne.
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "var(--rose-100)", minHeight: "660px" }}
        >
          {!isLoaded ? (
            // Skeleton pendant le chargement de Clerk
            <div
              className="w-full animate-pulse"
              style={{ height: "660px", background: "var(--rose-50)" }}
              role="status"
              aria-label="Chargement…"
            />
          ) : !user ? (
            // Bloqué si non connecté
            <div
              className="flex flex-col items-center justify-center gap-6 text-center px-6"
              style={{ height: "660px", background: "var(--rose-50)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "var(--rose-100)" }}
                aria-hidden="true"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: "var(--rose-principal)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-lg mb-1" style={{ color: "var(--neutral-800)" }}>
                  Connexion requise
                </p>
                <p className="text-sm max-w-xs mx-auto" style={{ color: "var(--neutral-700)" }}>
                  Créez un compte ou connectez-vous pour réserver et retrouver vos rendez-vous.
                </p>
              </div>
              <SignInButton mode="modal">
                <button className="btn-primary px-8 py-3">
                  Se connecter pour réserver
                </button>
              </SignInButton>
            </div>
          ) : (
            // Calendrier Cal.com pré-rempli
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
          <p className="text-center mt-4 text-sm" style={{ color: "var(--neutral-700)" }}>
            Problème avec le calendrier ?{" "}
            <a
              href={`${brand.calcom.baseUrl}/${brand.calcom.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
              style={{ color: "var(--rose-principal)" }}
            >
              Réservez directement sur Cal.com ou par Instagram.
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
