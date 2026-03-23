import Link from "next/link";
import { services, serviceCategories, supplements, type ServiceCategory } from "@/config/services";

const categoryOrder: ServiceCategory[] = ["gel-extension", "ongles-naturels", "press-on"];

const categoryNumbers: Record<ServiceCategory, string> = {
  "gel-extension": "01",
  "ongles-naturels": "02",
  "press-on": "03",
};

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <div className="service-card group">
      {/* Service name */}
      <p
        className="text-sm font-medium leading-snug mb-auto"
        style={{ color: "var(--neutral-800)" }}
      >
        {service.name}
      </p>

      {service.description && (
        <p className="text-xs mt-1.5 mb-2" style={{ color: "var(--neutral-700)", opacity: 0.6 }}>
          {service.description}
        </p>
      )}

      {/* Bottom row: price + badge */}
      <div className="flex items-end justify-between gap-2 mt-5 pt-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 3vw, 2.125rem)",
            fontWeight: 600,
            lineHeight: 1,
            color: "var(--rose-principal)",
            letterSpacing: "-0.01em",
          }}
        >
          {service.price}€
        </span>
        {service.popular && (
          <span
            className="text-[10px] font-medium px-2.5 py-1 rounded-full flex-shrink-0"
            style={{ background: "var(--rose-50)", color: "var(--rose-principal)", border: "1px solid var(--border-rose)" }}
          >
            Populaire
          </span>
        )}
      </div>
    </div>
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
      className="relative py-28 md:py-40 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FDFBF9 0%, #FFF7F9 60%, #FFF0F5 100%)",
      }}
    >
      {/* Decorative background number */}
      <div
        className="absolute -top-8 right-0 select-none pointer-events-none hidden lg:block"
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "22rem",
          fontWeight: 700,
          lineHeight: 1,
          color: "rgba(189,17,72,0.028)",
          letterSpacing: "-0.05em",
        }}
      >
        Tarifs
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Section header */}
        <div className="mb-20 md:mb-28">
          <span className="section-label">Tarifs</span>
          <div className="divider-rose mt-4 mb-0" />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mt-6">
            <h2 className="section-title max-w-lg">
              Nos{" "}
              <em style={{ fontStyle: "italic", color: "var(--rose-principal)" }}>prestations</em>
            </h2>
            <p
              className="text-base max-w-sm leading-relaxed"
              style={{ color: "var(--neutral-700)" }}
            >
              Des poses soignées aux nail art les plus audacieux — chaque set est une œuvre unique.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-20 md:space-y-28">
          {categoryOrder.map((cat) => {
            const list = grouped[cat];
            if (!list || list.length === 0) return null;
            return (
              <div key={cat}>
                {/* Category header */}
                <div className="flex items-baseline gap-5 mb-10">
                  <span
                    className="font-bold select-none flex-shrink-0 leading-none"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(3rem, 6vw, 5rem)",
                      color: "rgba(189,17,72,0.08)",
                      lineHeight: 1,
                    }}
                    aria-hidden="true"
                  >
                    {categoryNumbers[cat]}
                  </span>
                  <div>
                    <span className="section-label mb-1 block">Catégorie</span>
                    <h3
                      className="font-semibold"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                        color: "var(--neutral-800)",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.1,
                      }}
                    >
                      {serviceCategories[cat]}
                    </h3>
                  </div>
                </div>

                {/* Card grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                  {list.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Supplements — pill-style chips */}
        <div className="mt-16 md:mt-20">
          <p
            className="text-xs font-medium uppercase tracking-[0.28em] mb-6"
            style={{ color: "var(--rose-principal)" }}
          >
            Suppléments
          </p>
          <div className="flex flex-wrap gap-4">
            {supplements.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl px-6 py-5 flex flex-col gap-1.5"
                style={{
                  background: "white",
                  border: "1px solid var(--border-rose)",
                  boxShadow: "var(--shadow-card)",
                  minWidth: "200px",
                }}
              >
                <div className="flex items-center justify-between gap-8">
                  <span className="font-medium text-sm" style={{ color: "var(--neutral-800)" }}>
                    {s.label}
                  </span>
                  <span
                    className="font-semibold flex-shrink-0"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.375rem",
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
        <div className="text-center mt-16 md:mt-20">
          <Link href="/#booking" className="btn-primary">
            Réserver maintenant
          </Link>
        </div>
      </div>
    </section>
  );
}
