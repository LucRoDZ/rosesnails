"use client";

import { useUser } from "@clerk/nextjs";
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
              aria-label="Chargement du calendrier…"
            />
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

        <p className="text-center mt-4 text-sm" style={{ color: "var(--neutral-700)" }}>
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
      </div>
    </section>
  );
}
