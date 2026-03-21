export const brand = {
  name: "RosesNails",
  tagline: "L'art des ongles, sublimé.",
  address: "12 Rue des Roses, 75001 Paris",
  phone: "+33 6 12 34 56 78",
  email: "contact@rosesnails.fr",
  hours: {
    weekdays: "Mar–Sam : 9h–19h",
    sunday: "Dim : 10h–16h",
    closed: "Fermé le lundi",
  },
  social: {
    instagram: "https://www.instagram.com/rosesnails.fr",
    facebook: "https://www.facebook.com/rosesnails.fr",
  },
  calcom: {
    username: "rosesnails",
    baseUrl: "https://cal.com",
  },
  cancellationPolicy:
    "Toute annulation doit être effectuée au moins 24h avant le rendez-vous. En cas d'annulation tardive ou de no-show répété, un acompte pourra être demandé pour les prochaines réservations.",
  seo: {
    title: "RosesNails — Prothésiste Ongulaire Paris",
    description:
      "RosesNails, prothésiste ongulaire à Paris. Pose d'ongles, gel, acrylique, nail art personnalisé. Prenez rendez-vous en ligne.",
    url: "https://rosesnails.fr",
    locale: "fr_FR",
  },
} as const;
