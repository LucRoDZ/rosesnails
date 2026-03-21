import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "var(--font-display)", color: "var(--neutral-800)" }}
          >
            Politique de confidentialité
          </h1>
          <div className="card space-y-6 text-sm" style={{ color: "var(--neutral-700)" }}>
            <section>
              <h2 className="font-semibold mb-2" style={{ color: "var(--neutral-800)" }}>
                Données collectées
              </h2>
              <p>
                Lors de la prise de rendez-vous en ligne, nous collectons votre nom, adresse email et
                toute information nécessaire à la prestation. Ces données sont traitées par{" "}
                <strong>Cal.com</strong> (réservation), <strong>Clerk</strong> (authentification) et{" "}
                <strong>Supabase</strong> (stockage).
              </p>
            </section>
            <section>
              <h2 className="font-semibold mb-2" style={{ color: "var(--neutral-800)" }}>
                Finalité
              </h2>
              <p>
                Vos données sont utilisées uniquement pour la gestion de vos rendez-vous et la communication
                nécessaire à votre prise en charge.
              </p>
            </section>
            <section>
              <h2 className="font-semibold mb-2" style={{ color: "var(--neutral-800)" }}>
                Vos droits
              </h2>
              <p>
                Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression
                de vos données. Contactez-nous à{" "}
                <a
                  href={`mailto:${brand.email}`}
                  className="underline"
                  style={{ color: "var(--rose-principal)" }}
                >
                  {brand.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
