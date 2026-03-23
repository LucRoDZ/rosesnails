import Link from "next/link";
import { services, serviceCategories, supplements, type ServiceCategory } from "@/config/services";

const categoryOrder: ServiceCategory[] = ["gel-extension", "ongles-naturels", "press-on"];

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <article className="service-card group relative overflow-hidden">
      <div
        className="absolute -top-10 -right-10 w-24 h-24 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(254,146,191,0.18), transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex-1 min-w-0 pr-2">
          <p
            className="font-semibold leading-snug"
            style={{ fontSize: "1rem", color: "var(--neutral-800)" }}
          >
            {service.name}
          </p>
          {service.popular && (
            <span
              className="inline-block mt-2 text-[10px] font-medium px-2.5 py-0.5 rounded-full"
              style={{ background: "rgba(254,146,191,0.16)", color: "var(--rose-principal)", border: "1px solid var(--border-rose)" }}
            >
              Populaire
            </span>
          )}
          {service.description && (
            <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--neutral-700)", opacity: 0.7 }}>
              {service.description}
            </p>
          )}
        </div>
        <span
          className="flex-shrink-0"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 2.5vw, 1.75rem)",
            fontWeight: 600,
            lineHeight: 1,
            color: "var(--rose-principal)",
            letterSpacing: "-0.01em",
          }}
        >
          {service.price}€
        </span>
      </div>

      <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: "rgba(189,17,72,0.1)" }}>
        <span className="text-xs uppercase tracking-[0.22em]" style={{ color: "rgba(61,32,48,0.58)" }}>
          Durée estimée
        </span>
        <span className="text-sm font-medium" style={{ color: "var(--neutral-800)" }}>
          {service.duration} min
        </span>
      </div>
    </article>
  );
}

export function Services() {
  const grouped = categoryOrder.reduce<Record<ServiceCategory, typeof services>>(
    (acc, cat) => {
      acc[cat] = services.filter((s) => s.category === cat);
      return acc;
    },
    {} as Record<ServiceCategory, typeof services>
  );

  return (
    <section
      id="services"
      className="relative section-block overflow-hidden"
      style={{
        background: "linear-gradient(178deg, #fcf8f5 0%, #fff6fa 52%, #fff0f5 100%)",
      }}
    >
      <div className="shell">

        {/* Section header */}
        <div className="mb-16 md:mb-24 section-head lg:items-start lg:text-left">
          <span className="section-label">Tarifs</span>
          <div className="divider-rose mt-1 mb-1 lg:mx-0" />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 mt-2 w-full">
            <h2 className="section-title max-w-lg lg:max-w-xl">
              Nos{" "}
              <em style={{ fontStyle: "italic", color: "var(--rose-principal)" }}>prestations</em>
            </h2>
            <p
              className="text-base leading-relaxed section-copy lg:max-w-sm lg:mx-0"
              style={{ color: "var(--neutral-700)" }}
            >
              Des poses soignées aux nail art audacieux avec un rendu premium pensé pour durer.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-16 md:space-y-24">
          {categoryOrder.map((cat) => {
            const list = grouped[cat];
            if (!list || list.length === 0) return null;
            return (
              <div key={cat}>
                <div className="flex items-center gap-5 mb-9 md:mb-10">
                  <span className="category-pill">{serviceCategories[cat]}</span>
                  <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {list.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Supplements */}
        <div className="mt-16 md:mt-24">
          <p
            className="text-xs font-medium uppercase tracking-[0.28em] mb-6"
            style={{ color: "var(--rose-principal)" }}
          >
            Suppléments
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supplements.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl px-7 py-6 md:px-8 md:py-7 flex flex-col gap-2 min-h-[80px]"
                style={{
                  background: "white",
                  border: "1px solid rgba(189,17,72,0.12)",
                  boxShadow: "0 8px 24px rgba(26,15,22,0.06)",
                }}
              >
                <div className="flex items-center justify-between gap-8">
                  <span className="font-medium text-base" style={{ color: "var(--neutral-800)" }}>
                    {s.label}
                  </span>
                  <span
                    className="font-semibold flex-shrink-0"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.65rem",
                      color: "var(--rose-principal)",
                      lineHeight: 1,
                    }}
                  >
                    {s.price}
                  </span>
                </div>
                {s.note && (
                  <p className="text-xs" style={{ color: "var(--neutral-700)", opacity: 0.6 }}>
                    {s.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-zone mt-10 md:mt-14">
          <Link href="/#booking" className="btn-reservation">
            Réserver maintenant
          </Link>
        </div>
      </div>
    </section>
  );
}
