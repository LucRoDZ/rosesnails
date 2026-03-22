export type ServiceCategory =
  | "gel-extension"
  | "ongles-naturels"
  | "press-on";

export interface Service {
  id: string;
  name: string;
  description?: string;
  duration: number; // minutes (estimated)
  price: number; // euros
  category: ServiceCategory;
  popular?: boolean;
}

export const services: Service[] = [
  // ── Pose en gel extension ───────────────────────────────────────────────────
  {
    id: "gel-pose-deco",
    name: "Pose avec décorations",
    duration: 90,
    price: 40,
    category: "gel-extension",
    popular: true,
  },
  {
    id: "gel-pose-sans",
    name: "Pose sans décorations",
    duration: 75,
    price: 35,
    category: "gel-extension",
  },
  {
    id: "gel-remplissage-deco",
    name: "Remplissage avec décorations",
    duration: 75,
    price: 35,
    category: "gel-extension",
  },
  {
    id: "gel-remplissage-sans",
    name: "Remplissage sans décorations",
    duration: 60,
    price: 30,
    category: "gel-extension",
  },

  // ── Ongles naturels ─────────────────────────────────────────────────────────
  {
    id: "nat-semi-deco",
    name: "Semi permanent avec décorations",
    duration: 60,
    price: 20,
    category: "ongles-naturels",
  },
  {
    id: "nat-semi",
    name: "Semi permanent",
    duration: 45,
    price: 15,
    category: "ongles-naturels",
  },
  {
    id: "nat-gainage-deco",
    name: "Gainage avec décorations",
    duration: 75,
    price: 30,
    category: "ongles-naturels",
  },
  {
    id: "nat-gainage",
    name: "Gainage",
    duration: 60,
    price: 25,
    category: "ongles-naturels",
  },

  // ── Press-on ────────────────────────────────────────────────────────────────
  {
    id: "press-couleur",
    name: "Couleur unie",
    duration: 30,
    price: 10,
    category: "press-on",
  },
  {
    id: "press-french",
    name: "Couleur unie + french",
    duration: 30,
    price: 12,
    category: "press-on",
  },
  {
    id: "press-art1",
    name: "Nail art niveau 1",
    duration: 45,
    price: 20,
    category: "press-on",
    popular: true,
  },
  {
    id: "press-art2",
    name: "Nail art niveau 2",
    duration: 60,
    price: 22,
    category: "press-on",
  },
  {
    id: "press-art3",
    name: "Nail art niveau 3",
    duration: 75,
    price: 25,
    category: "press-on",
  },
];

export const serviceCategories: Record<ServiceCategory, string> = {
  "gel-extension": "Pose en gel extension",
  "ongles-naturels": "Ongles naturels",
  "press-on": "Press-on",
};

/** Suppléments affichés comme note en bas du tableau des tarifs */
export const supplements = [
  { label: "Longueur (L ou XL)", price: "+5€" },
  { label: "Retard de plus de 10 min", price: "+5€", note: "Au-delà de 20 min : non accepté" },
];
