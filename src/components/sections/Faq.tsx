"use client";

import { useState } from "react";
import { brand } from "@/config/brand";

const faqs = [
  {
    id: 1,
    question: "Combien de temps dure une pose gel ?",
    answer: "Une pose gel complète dure environ 1h30. La durée peut varier selon la complexité du nail art choisi.",
  },
  {
    id: 2,
    question: "Quelle est votre politique d'annulation ?",
    answer: brand.cancellationPolicy,
  },
  {
    id: 3,
    question: "Faut-il préparer ses ongles avant le rendez-vous ?",
    answer: "Venez avec vos ongles naturels, sans vernis. Si vous avez une ancienne pose, nous pouvons effectuer le retrait lors de votre rendez-vous (supplément possible).",
  },
  {
    id: 4,
    question: "Comment prendre rendez-vous ?",
    answer: "Réservez directement en ligne via notre système de réservation. Vous recevrez une confirmation par email avec tous les détails.",
  },
  {
    id: 5,
    question: "Proposez-vous des tarifs groupes ou EVJF ?",
    answer: "Oui ! Contactez-nous directement par email ou téléphone pour organiser votre événement et obtenir un devis personnalisé.",
  },
  {
    id: 6,
    question: "Puis-je apporter mes propres références ?",
    answer: "Absolument, nous vous encourageons à apporter vos inspirations. Cela nous aide à créer exactement ce dont vous rêvez.",
  },
];

function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-answer-${faq.id}`;

  return (
    <div
      className="border-b last:border-b-0 transition-colors duration-200"
      style={{
        borderColor: "rgba(189,17,72,0.08)",
        background: open ? "rgba(255,240,245,0.5)" : "transparent",
      }}
    >
      <button
        className="w-full px-8 py-8 flex items-center justify-between text-left gap-8 group"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
      >
        <div className="flex items-center gap-6 min-w-0">
          {/* Number accent */}
          <span
            className="flex-shrink-0 font-semibold select-none tabular-nums"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              lineHeight: 1,
              color: open ? "var(--rose-principal)" : "rgba(189,17,72,0.15)",
              transition: "color 200ms ease",
              minWidth: "2.25rem",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="font-medium leading-snug"
            style={{
              fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)",
              color: open ? "var(--rose-principal)" : "var(--neutral-800)",
              transition: "color 200ms ease",
            }}
          >
            {faq.question}
          </span>
        </div>

        {/* Chevron */}
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: open ? "var(--rose-principal)" : "rgba(189,17,72,0.07)",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            style={{ color: open ? "white" : "var(--rose-principal)" }}
            aria-hidden="true"
          >
            <path d="M2.5 5l4.5 4.5L11.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      <div
        id={id}
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "500px" : "0" }}
      >
        <p
          className="px-8 pb-8 text-base leading-relaxed"
          style={{ color: "var(--neutral-700)", paddingLeft: "calc(2rem + 2.25rem + 1.5rem)" }}
        >
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section
      id="faq"
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: "var(--rose-50)" }}
    >
      {/* Decorative orbs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle at top right, rgba(254,146,191,0.14) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle at bottom left, rgba(189,17,72,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="mb-16 md:mb-20">
          <span className="section-label">Questions fréquentes</span>
          <div className="divider-rose mt-4 mb-0" />
          <h2 className="section-title mt-6">
            Vos{" "}
            <em style={{ fontStyle: "italic", color: "var(--rose-principal)" }}>questions</em>
          </h2>
        </div>

        {/* Single full-width accordion card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "white",
            border: "1px solid rgba(189,17,72,0.1)",
            boxShadow: "0 8px 48px rgba(189,17,72,0.08), 0 2px 16px rgba(26,15,22,0.06)",
          }}
        >
          {faqs.map((faq, i) => (
            <FaqItem key={faq.id} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
