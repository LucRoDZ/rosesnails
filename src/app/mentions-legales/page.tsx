import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "var(--font-display)", color: "var(--neutral-800)" }}
          >
            Mentions légales
          </h1>
          <div className="card space-y-6">
            <section>
              <h2 className="font-semibold mb-2" style={{ color: "var(--neutral-800)" }}>
                Éditeur du site
              </h2>
              <p className="text-sm" style={{ color: "var(--neutral-700)" }}>
                {brand.name}<br />
                {brand.address}<br />
                {brand.email}<br />
                {brand.phone}
              </p>
            </section>
            <section>
              <h2 className="font-semibold mb-2" style={{ color: "var(--neutral-800)" }}>
                Hébergement
              </h2>
              <p className="text-sm" style={{ color: "var(--neutral-700)" }}>
                Ce site est hébergé par Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, USA.
              </p>
            </section>
            <section>
              <h2 className="font-semibold mb-2" style={{ color: "var(--neutral-800)" }}>
                Propriété intellectuelle
              </h2>
              <p className="text-sm" style={{ color: "var(--neutral-700)" }}>
                L&apos;ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive de {brand.name}.
                Toute reproduction est interdite sans autorisation préalable.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
