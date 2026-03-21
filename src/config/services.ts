export type ServiceCategory =
  | "pose"
  | "entretien"
  | "nail-art"
  | "soin"
  | "retrait";

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number; // euros
  category: ServiceCategory;
  popular?: boolean;
  calcomEventType?: string;
}

export const services: Service[] = [
  {
    id: "pose-gel",
    name: "Pose Gel Complète",
    description: "Pose de capsules gel avec finition french ou couleur unie.",
    duration: 90,
    price: 75,
    category: "pose",
    popular: true,
    calcomEventType: "pose-gel",
  },
  {
    id: "pose-acrylique",
    name: "Pose Acrylique",
    description: "Pose acrylique longue durée, résistante et naturelle.",
    duration: 90,
    price: 80,
    category: "pose",
    calcomEventType: "pose-acrylique",
  },
  {
    id: "remplissage",
    name: "Remplissage Gel / Acrylique",
    description: "Remplissage et remise en forme de votre pose existante.",
    duration: 60,
    price: 50,
    category: "entretien",
    popular: true,
    calcomEventType: "remplissage",
  },
  {
    id: "nail-art-simple",
    name: "Nail Art Simple",
    description: "Dégradé, paillettes, stamping — motif unique par set.",
    duration: 30,
    price: 20,
    category: "nail-art",
    calcomEventType: "nail-art",
  },
  {
    id: "nail-art-custom",
    name: "Nail Art Personnalisé",
    description: "Illustration, 3D, chromés — création sur-mesure.",
    duration: 60,
    price: 40,
    category: "nail-art",
    calcomEventType: "nail-art-custom",
  },
  {
    id: "soin-mains",
    name: "Soin des Mains",
    description: "Gommage, masque, massage et hydratation intense.",
    duration: 30,
    price: 25,
    category: "soin",
  },
  {
    id: "retrait-gel",
    name: "Retrait Gel / Acrylique",
    description: "Retrait soigneux sans abîmer vos ongles naturels.",
    duration: 30,
    price: 20,
    category: "retrait",
  },
];

export const serviceCategories: Record<ServiceCategory, string> = {
  pose: "Poses",
  entretien: "Entretien",
  "nail-art": "Nail Art",
  soin: "Soins",
  retrait: "Retrait",
};
