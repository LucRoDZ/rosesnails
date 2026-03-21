import { brand } from "@/config/brand";

export function Booking() {

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

        {/* Cal.com iframe embed — aucune dépendance JS externe */}
        {/* TODO: Remplacer "rosesnails" par votre vrai username Cal.com */}
        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "var(--rose-100)" }}
        >
          <iframe
            src={`${brand.calcom.baseUrl}/${brand.calcom.username}?embed=true&theme=light&brandColor=%23BD1148&layout=month_view`}
            width="100%"
            height="660"
            frameBorder="0"
            title="Calendrier de réservation RosesNails"
            loading="lazy"
            style={{ display: "block" }}
          />
        </div>

        {/* Fallback link */}
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
