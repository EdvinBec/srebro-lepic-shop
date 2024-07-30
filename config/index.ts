export const PRODUCT_CATEGORIES = [
  {
    label: "Prstenje",
    value: "prstenje" as const,
    featured: [
      {
        name: "Prstenje",
        href: "/kategorija/prstenje",
        imageSrc: "/assets/nav/rings/proposal.jpg",
      },
    ],
  },
  {
    label: "Ogrlice",
    value: "ogrlice" as const,
    featured: [
      {
        name: "Ogrlice",
        href: "/kategorija/ogrlice",
        imageSrc: "/assets/nav/necklace/ogrlica-kamen.jpg",
      },
      {
        name: "Sa porukom",
        href: "/kategorija/sa-porukom",
        imageSrc: "/assets/nav/necklace/ogrlica1.jpg",
      },
    ],
  },
  {
    label: "Narukvice",
    value: "narukvice" as const,
    featured: [
      {
        name: "Narukvice",
        href: "/kategorija/narukvice",
        imageSrc: "/assets/nav/narukvica.jpg",
      },
      {
        name: "Sa porukom",
        href: "/kategorija/sa-porukom",
        imageSrc: "/assets/nav/necklace/ogrlica-znak.jpg",
      },
    ],
  },
  {
    label: "Naušnice",
    value: "nausnice" as const,
    featured: [
      {
        name: "Naušnice",
        href: "/kategorija/nausnice",
        imageSrc: "/assets/nav/earings1.jpg",
      },
    ],
  },
  {
    label: "Satovi",
    value: "satovi" as const,
    featured: [
      {
        name: "Satovi",
        href: "/kategorija/satovi",
        imageSrc: "/assets/nav/watch.jpg",
      },
    ],
  },
];

export const deliveryFee = 7;
