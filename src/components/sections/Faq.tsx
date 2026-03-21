"use client";

import { useState } from "react";
import { brand } from "@/config/brand";

const faqs = [
  {
    id: 1,
    question: "Combien de temps dure une pose gel ?",
    answer:
      "Une pose gel complète dure environ 1h30. La durée peut varier selon la complexité du nail art choisi.",
  },
  {
    id: 2,
    question: "Quelle est votre politique d'annulation ?",
    answer: brand.cancellationPolicy,
  },
  {
    id: 3,
    question: "Faut-il préparer ses ongles avant le rendez-vous ?",
    answer:
      "Venez avec vos ongles naturels, sans vernis. Si vous avez une ancienne pose, nous pouvons effectuer le retrait lors de votre rendez-vous (supplément possible).",
  },
  {
    id: 4,
    question: "Comment prendre rendez-vous ?",
    answer:
      "Réservez directement en ligne via notre système de réservation. Vous recevrez une confirmation par email avec tous les détails.",
  },
  {
    id: 5,
    question: "Proposez-vous des tarifs groupes ou enterrements de vie de jeune fille ?",
    answer:
      "Oui ! Contactez-nous directement par email ou téléphone pour organiser votre événement et obtenir un devis personnalisé.",
  },
  {
    id: 6,
    question: "Puis-je apporter mes propres références (photos) ?",
    answer:
      "Absolument, nous vous encourageons à apporter vos inspirations. Cela nous aide à créer exactement ce dont vous rêvez.",
  },
];

function FaqItem({ faq }: { faq: typeof faqs[0] }) {
  const [open, setOpen] = useState(false);
  const id = `faq-${faq.id}`;

  return (
    <div className="border-b last:border-b-0" style={{ borderColor: "var(--rose-100)" }}>
      <button
        className="w-full py-5 flex items-center justify-between text-left gap-4"
        style={{ outline: "none" }}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="font-semibold" style={{ color: "var(--neutral-800)" }}>{faq.question}</span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: "var(--rose-50)", color: "var(--rose-principal)" }}
          aria-hidden="true"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      {open && (
        <div
          id={id}
          className="pb-5 leading-relaxed text-sm"
          style={{ color: "var(--neutral-700)" }}
        >
          {faq.answer}
        </div>
      )}
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--rose-accent)" }}
          >
            Questions fréquentes
          </p>
          <h2 className="section-title">Vos questions</h2>
        </div>
        <div className="card" style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: 0, paddingBottom: 0 }}>
          {faqs.map((faq) => (
            <FaqItem key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
