import Link from "next/link";
import { services, serviceCategories, type ServiceCategory } from "@/config/services";

const categoryOrder: ServiceCategory[] = ["pose", "entretien", "nail-art", "soin", "retrait"];

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <div className="card group flex flex-col" style={{ transition: "box-shadow 300ms ease" }}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold" style={{ color: "var(--neutral-800)" }}>
            {service.name}
            {service.popular && (
              <span
                className="ml-2 text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: "var(--rose-50)", color: "var(--rose-principal)" }}
              >
                Populaire
              </span>
            )}
          </h3>
          <p className="text-sm mt-1" style={{ color: "var(--neutral-700)" }}>{service.description}</p>
        </div>
      </div>
      <div className="mt-auto pt-4 flex items-center justify-between text-sm">
        <span style={{ color: "var(--neutral-700)" }}>{service.duration} min</span>
        <span className="font-bold text-lg" style={{ color: "var(--rose-principal)" }}>
          {service.price}€
        </span>
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
    <section id="services" className="py-24" style={{ backgroundColor: "var(--neutral-50)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--rose-accent)" }}
          >
            Nos prestations
          </p>
          <h2 className="section-title">Ce que nous faisons</h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "var(--neutral-700)" }}>
            Des poses soignées aux créations nail art les plus audacieuses, chaque prestation est réalisée avec passion et précision.
          </p>
        </div>

        <div className="space-y-12">
          {categoryOrder.map((cat) => {
            const list = grouped[cat];
            if (!list || list.length === 0) return null;
            return (
              <div key={cat}>
                <h3
                  className="text-xs font-bold uppercase tracking-[0.2em] mb-6 pb-2 border-b"
                  style={{ color: "var(--rose-principal)", borderColor: "var(--rose-clair)" }}
                >
                  {serviceCategories[cat]}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {list.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/#booking" className="btn-primary text-base">
            Réserver maintenant
          </Link>
        </div>
      </div>
    </section>
  );
}
