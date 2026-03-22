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

function FaqItem({ faq }: { faq: typeof faqs[0] }) {
  const [open, setOpen] = useState(false);
  const id = `faq-answer-${faq.id}`;

  return (
    <div
      className="border-b last:border-b-0 transition-colors duration-200"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <button
        className="w-full py-5 flex items-center justify-between text-left gap-4 group"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
      >
        <span
          className="font-medium text-sm md:text-base leading-snug transition-colors"
          style={{ color: open ? "var(--rose-principal)" : "var(--neutral-800)" }}
        >
          {faq.question}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: open ? "var(--rose-principal)" : "var(--rose-50)",
            color: open ? "white" : "var(--rose-principal)",
          }}
          aria-hidden="true"
        >
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
            viewBox="0 0 14 14"
            fill="currentColor"
          >
            <path d="M8 1H6v5H1v2h5v5h2V8h5V6H8V1z" />
          </svg>
        </span>
      </button>

      <div
        id={id}
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "300px" : "0" }}
      >
        <p
          className="pb-5 text-sm leading-relaxed"
          style={{ color: "var(--neutral-700)" }}
        >
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="py-16 md:py-24" style={{ backgroundColor: "var(--neutral-50)" }}>
      <div className="max-w-2xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">Questions fréquentes</span>
          <div className="divider-rose-center" />
          <h2 className="section-title">Vos questions</h2>
        </div>

        {/* Accordion */}
        <div
          className="rounded-2xl bg-white border divide-y-0 overflow-hidden"
          style={{ borderColor: "var(--border-rose)", boxShadow: "var(--shadow-card)" }}
        >
          <div className="px-6 md:px-8">
            {faqs.map((faq) => (
              <FaqItem key={faq.id} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
