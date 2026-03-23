"use client";

import { useState } from "react";
import { brand } from "@/config/brand";

const faqs = [
  {
    id: 1,
    question: "Combien de temps dure une pose gel ?",
    answer: "Une pose gel complète dure environ 1h30. La durée peut cependant varier selon la complexité du nail art choisi.",
  },
  {
    id: 2,
    question: "Quelle est votre politique d'annulation ?",
    answer: brand.cancellationPolicy,
  },
  {
    id: 3,
    question: "Faut-il préparer ses ongles avant le rendez-vous ?",
    answer: "Venez avec vos ongles naturels, sans vernis. Si vous avez une ancienne pose, je peux aussi effectuer le retrait.",
  },
  {
    id: 4,
    question: "Comment prendre rendez-vous ?",
    answer: "Réservez directement en ligne via le système de réservation. Vous recevrez une confirmation par email avec tous les détails.",
  },
  {
    id: 5,
    question: "Puis-je apporter mes propres références ?",
    answer: "Absolument, Je vous encourage à apporter vos inspirations. Cela m'aide à créer exactement ce dont vous rêvez.",
  },
];

function FaqItem({ faq }: { faq: typeof faqs[0] }) {
  const [open, setOpen] = useState(false);
  const id = `faq-answer-${faq.id}`;

  return (
    <div
      className="rounded-2xl transition-all duration-300"
      style={{
        border: open ? "1px solid rgba(189,17,72,0.24)" : "1px solid rgba(189,17,72,0.1)",
        background: open ? "rgba(255,240,245,0.7)" : "white",
        boxShadow: open ? "0 12px 30px rgba(189,17,72,0.1)" : "0 6px 20px rgba(26,15,22,0.05)",
      }}
    >
      <button
        className="w-full px-5 md:px-8 py-5 md:py-6 flex items-center justify-between text-left gap-5 group"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
      >
        <span
          className="font-medium leading-snug"
          style={{
            fontSize: "clamp(0.98rem, 1.5vw, 1.1rem)",
            color: open ? "var(--rose-principal)" : "var(--neutral-800)",
            transition: "color 200ms ease",
          }}
        >
          {faq.question}
        </span>

        <span
          className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(189,17,72,0.08)",
            color: "var(--rose-principal)",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 280ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            aria-hidden="true"
          >
            <path d="M4 7l6 6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <div
        id={id}
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 320ms ease",
        }}
        aria-hidden={!open}
      >
        <div style={{ overflow: "hidden" }}>
          <p
            className="px-5 md:px-8 pb-5 md:pb-6 text-sm md:text-base leading-relaxed"
            style={{ color: "var(--neutral-700)" }}
          >
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section
      id="faq"
      className="relative section-block overflow-hidden"
      style={{ background: "linear-gradient(182deg, #fff0f5 0%, #fff6fa 46%, #fff 100%)" }}
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

      <div className="relative shell">

        {/* Header */}
        <div className="mb-14 md:mb-20 section-head">
          <span className="section-label">Questions fréquentes</span>
          <div className="divider-rose mt-1 mb-1" />
          <h2 className="section-title mt-1 max-w-xl">
            Toutes vos{" "}
            <em style={{ fontStyle: "italic", color: "var(--rose-principal)" }}>questions</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-5">
          {faqs.map((faq) => (
            <FaqItem key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
