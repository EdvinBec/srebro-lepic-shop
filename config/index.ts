export const PRODUCT_CATEGORIES = [
  {
    label: "Prstenje",
    value: "prstenje" as const,
    featured: [
      {
        name: "Zaručničko",
        href: "/kategorija/zarucnicko",
        imageSrc: "/assets/nav/rings/proposal.jpg",
      },
      {
        name: "Burme",
        href: "#",
        imageSrc: "/assets/nav/rings/mariage.jpg",
      },
      {
        name: "Swarovski",
        href: "#",
        imageSrc: "/assets/nav/rings/diamond.jpg",
      },
    ],
  },
  {
    label: "Ogrlice",
    value: "ogrlice" as const,
    featured: [
      {
        name: "Sa kamenom",
        href: "#",
        imageSrc: "/assets/nav/necklace/ogrlica-kamen.jpg",
      },
      {
        name: "Sa znakom",
        href: "#",
        imageSrc: "/assets/nav/necklace/ogrlica-znak.jpg",
      },
      {
        name: "Sa porukom",
        href: "#",
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
