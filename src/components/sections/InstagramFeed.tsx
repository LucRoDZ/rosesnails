"use client";

import { useInView } from "react-intersection-observer";
import { brand } from "@/config/brand";

export function InstagramFeed() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      id="instagram"
      className="py-24"
      style={{ backgroundColor: "var(--neutral-50)" }}
      aria-label="Instagram"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--rose-accent)" }}
          >
            Instagram
          </p>
          <h2 className="section-title">@rosesnails.fr</h2>
          <p className="mt-4" style={{ color: "var(--neutral-700)" }}>
            Suivez nos dernières créations sur Instagram
          </p>
        </div>

        {inView ? (
          <div className="space-y-6">
            {/*
              TODO: Replace this section with a proper Instagram widget.
              Options:
              1. Curator.io: Add <div class="curator-feed" data-feed-id="YOUR_ID"></div> + their script
              2. Behold.so: Use their embed code
              3. EmbedSocial: Use their widget
              All these tools are free-tier compatible and don't require Meta API access.

              Example with Curator.io:
              <script
                type="text/javascript"
                async
                src="https://cdn.curator.io/published/YOUR_FEED_ID.js"
              />
            */}
            <div
              className="rounded-2xl p-8 text-center"
              style={{ background: "linear-gradient(135deg, var(--rose-50), var(--rose-100))" }}
            >
              <p className="font-semibold mb-2" style={{ color: "var(--neutral-700)" }}>Widget Instagram</p>
              <p className="text-sm mb-4" style={{ color: "var(--neutral-700)", opacity: 0.7 }}>
                Configurez votre widget Instagram ici
              </p>
              <a
                href={brand.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
                aria-label="Voir notre Instagram"
              >
                Voir sur Instagram
              </a>
            </div>
          </div>
        ) : (
          <div
            className="h-64 rounded-2xl animate-pulse"
            style={{ backgroundColor: "var(--neutral-100)" }}
            aria-hidden="true"
          />
        )}
      </div>
    </section>
  );
}
