/**
 * THE ONE FACTS FILE.
 *
 * Every business fact on the site comes from here: name, phone, address,
 * license, hours, services, service area, reviews and photos. Components and
 * copy read these values; nothing is typed twice.
 *
 * NORTHPOINT HEATING & AIR. Details come from the client's business profile.
 * The license number is blank on purpose: every place that shows it hides
 * while it is empty (see `hasLicense` in lib/format.ts). The rating and the
 * reviews are SAMPLES for the demo and are labelled as such on the page.
 */

export type ServiceSlug =
  | "ac-repair"
  | "ac-installation"
  | "ac-maintenance"
  | "heat-pumps"
  | "ductless-mini-splits"
  | "ductwork"
  | "indoor-air-quality"
  | "heating-repair";

export type SiteImage = {
  /** Path under /public. */
  src: string;
  alt: string;
  width: number;
  height: number;
};

const HERO = { width: 2730, height: 1536 } as const;
const CARD = { width: 1024, height: 1024 } as const;
const INLINE = { width: 2000, height: 1500 } as const;

/**
 * Photos used on the home page. Every one is a demo photo: swap the file in
 * /public/images (same name) and update the alt text when real ones arrive.
 */
export const images = {
  heroHome: {
    src: "/images/home-hero-technician-greeting-homeowner.jpg",
    alt: "Technician in a blue uniform walking up to the front door of a Houston home",
    ...HERO,
  },
  bandOutdoorUnit: {
    src: "/images/band-houston-outdoor-unit-summer.jpg",
    alt: "Outdoor AC unit beside a red brick house on a sunny Houston afternoon",
    ...HERO,
  },
  cardAcRepair: {
    src: "/images/card-ac-repair.jpg",
    alt: "Gloved hand working on an outdoor AC unit panel",
    ...CARD,
  },
  cardAcInstallation: {
    src: "/images/card-ac-installation.jpg",
    alt: "New outdoor AC unit on a concrete pad",
    ...CARD,
  },
  cardAcMaintenance: {
    src: "/images/card-ac-maintenance.jpg",
    alt: "Water rinsing the coil fins of an outdoor AC unit",
    ...CARD,
  },
  cardHeatPumps: {
    src: "/images/card-heat-pumps.jpg",
    alt: "Top fan grille of a heat pump outdoor unit",
    ...CARD,
  },
  cardDuctless: {
    src: "/images/card-ductless-mini-splits.jpg",
    alt: "White ductless mini-split unit high on a wall",
    ...CARD,
  },
  cardDuctwork: {
    src: "/images/card-ductwork.jpg",
    alt: "Insulated attic duct sealed to a metal collar",
    ...CARD,
  },
  cardIndoorAirQuality: {
    src: "/images/card-indoor-air-quality.jpg",
    alt: "Hands holding a clean pleated air filter",
    ...CARD,
  },
  cardHeatingRepair: {
    src: "/images/card-heating-repair.jpg",
    alt: "Blue burner flames inside a gas furnace",
    ...CARD,
  },
  owner: {
    src: "/images/about-owner-with-van.jpg",
    alt: "The owner beside a white service van in a Houston driveway",
    ...INLINE,
  },
  stepHotUnit: {
    src: "/images/step-hot-unit-houston-sun.jpg",
    alt: "Outdoor AC unit beside a brick house in the hot afternoon sun",
    ...INLINE,
  },
  stepTools: {
    src: "/images/step-technician-packing-tools.jpg",
    alt: "Technician packing refrigerant gauges and hoses into his tool bag before a visit",
    ...INLINE,
  },
  stepEstimate: {
    src: "/images/step-estimate-technician-homeowner.jpg",
    alt: "Technician talking a homeowner through the problem beside the outdoor unit",
    ...INLINE,
  },
  stepWork: {
    src: "/images/step-work-air-handler.jpg",
    alt: "Technician connecting the duct to a new indoor air handler in a utility closet",
    ...INLINE,
  },
  ctaTechnician: {
    src: "/images/cta-technician-closing-unit.jpg",
    alt: "Technician closing the service panel of an outdoor AC unit beside a brick house",
    ...INLINE,
  },
} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

export const business = {
  /** true while the rating and reviews are samples: the page says so. */
  demo: true,

  // Identity
  name: "Northpoint Heating & Air",
  shortName: "Northpoint",
  wordmarkTagline: "Heating & Air",
  legalName: "Northpoint Heating & Air LLC",
  founded: "2014",
  tagline: "Family-owned, 10+ years in Houston",
  timezone: "America/Chicago",
  timezoneLabel: "Central Time",

  // Contact
  phone: { display: "(505) 528-6289", e164: "+15055286289" },
  email: "contact@scaalus.com",
  address: {
    street: "100 Main St",
    city: "Houston",
    state: "TX",
    zip: "77002",
  },
  city: "Houston",
  state: "Texas",
  stateAbbr: "TX",

  /**
   * Where the team works: Houston and the suburbs around it. All real
   * Houston-area places; confirm the list with the client.
   */
  serviceArea: {
    towns: ["Katy", "Sugar Land", "Cypress", "Pearland", "The Woodlands"],
    neighborhoods: ["The Heights", "Garden Oaks", "Oak Forest", "Spring Branch", "Memorial"],
    /**
     * Rough direction (degrees clockwise from north) and road-free distance in
     * miles from downtown Houston, for the service map. Approximate on purpose.
     */
    positions: {
      Katy: { bearing: 272, miles: 29 },
      "Sugar Land": { bearing: 232, miles: 20 },
      Cypress: { bearing: 312, miles: 25 },
      Pearland: { bearing: 165, miles: 17 },
      "The Woodlands": { bearing: 356, miles: 28 },
    } as Record<string, { bearing: number; miles: number }>,
  },

  // License and insurance
  license: {
    /** Blank until the client supplies it. Every license line hides while it is empty. */
    number: "",
    label: "License",
  },
  insurance: "general liability and workers' compensation insurance",

  // People
  owner: {
    name: "John Smith",
    firstName: "John",
    role: "Owner",
  },

  // Hours (Central Time)
  hours: [
    { days: "Monday to Friday", short: "Mon to Fri", label: "7am to 7pm", open: true },
    { days: "Saturday", short: "Sat", label: "8am to 4pm", open: true },
    { days: "Sunday", short: "Sun", label: "Closed", open: false },
  ],
  emergency: {
    available: true,
    label: "24/7 emergency line",
    answeredBy: "a live answering service that pages the on-call technician",
  },
  sameDay: { cutoff: "2pm", when: "weekday" },

  // Booking only: no prices and no online estimate. The technician gives a
  // written estimate on the visit.
  estimate: {
    promise: "Written estimate before any work starts",
    callbackPromise: "We call back the same business day to confirm a time",
  },

  financing: {
    offered: true,
    /** Real lender name goes here once the client supplies it. */
    lenderLabel: "our lending partner",
  },

  warranty: {
    repairYears: 1,
  },

  // Proof. SAMPLE rating for the demo.
  rating: {
    value: "4.9",
    count: 187,
    source: "Google",
  },
  certifications: ["NATE-certified technicians", "EPA Section 608 certified"],

  services: [
    {
      slug: "ac-repair",
      name: "AC repair",
      cardLine: "Not cooling, leaking or making noise. Diagnosed and fixed, often the same day.",
      card: "cardAcRepair",
    },
    {
      slug: "ac-installation",
      name: "AC installation and replacement",
      cardLine: "A new system sized to your house, with a written price before we start.",
      card: "cardAcInstallation",
    },
    {
      slug: "ac-maintenance",
      name: "AC maintenance",
      cardLine: "A tune-up that catches the small problems before the first 95-degree day.",
      card: "cardAcMaintenance",
    },
    {
      slug: "heat-pumps",
      name: "Heat pumps",
      cardLine: "One system that cools in summer and heats in winter. Repaired and installed.",
      card: "cardHeatPumps",
    },
    {
      slug: "ductless-mini-splits",
      name: "Ductless mini-splits",
      cardLine: "Cooling for the garage, addition or room your ducts never reached.",
      card: "cardDuctless",
    },
    {
      slug: "ductwork",
      name: "Ductwork",
      cardLine: "Leaky, crushed or undersized attic ducts repaired or replaced.",
      card: "cardDuctwork",
    },
    {
      slug: "indoor-air-quality",
      name: "Indoor air quality and humidity",
      cardLine: "Less dust, less stickiness. Filtration and whole-home dehumidifiers.",
      card: "cardIndoorAirQuality",
    },
    {
      slug: "heating-repair",
      name: "Heating repair",
      cardLine: "Furnace or heat pump not heating on a cold morning. We fix those too.",
      card: "cardHeatingRepair",
    },
  ],

  /** SAMPLE reviews, invented for the demo. Never publish these for a real business. */
  reviews: [
    {
      id: 1,
      firstName: "Denise",
      town: "Houston",
      service: "ac-repair",
      text: "Our upstairs unit quit on a Saturday in July. The technician was here by two o'clock, showed me the swollen capacitor, and had it running in under an hour. The bill matched the quote he gave before he started.",
    },
    {
      id: 2,
      firstName: "Mark",
      town: "Houston",
      service: "ac-repair",
      text: "We called for a second opinion after another company said we needed a whole new system. Northpoint found a failed fan motor, replaced it the same day, and the AC has run fine since.",
    },
    {
      id: 3,
      firstName: "Priya",
      town: "Houston",
      service: "ac-installation",
      text: "They measured the house instead of just matching the old unit, and gave us three options in writing. The crew finished in one day and hauled everything away.",
    },
    {
      id: 5,
      firstName: "Angela",
      town: "Houston",
      service: "ac-maintenance",
      text: "The spring tune-up took about an hour. The tech cleared a drain line that was close to backing up and showed me a photo of it. No sales pitch.",
    },
    {
      id: 6,
      firstName: "Robert",
      town: "Houston",
      service: "ductwork",
      text: "Two bedrooms never cooled. They found crushed duct in the attic and one run that had come loose. Now those rooms stay within a degree or two of the rest of the house.",
    },
    {
      id: 8,
      firstName: "Carol",
      town: "Houston",
      service: "indoor-air-quality",
      text: "The house always felt sticky even with the AC running. They added a dehumidifier to the system and it now sits around 50 percent.",
    },
  ],
} as const satisfies BusinessShape;

type BusinessShape = {
  services: readonly {
    slug: ServiceSlug;
    name: string;
    cardLine: string;
    card: ImageKey;
  }[];
  reviews: readonly {
    id: number;
    firstName: string;
    town: string;
    service: ServiceSlug;
    text: string;
  }[];
  [key: string]: unknown;
};

export type Service = (typeof business.services)[number];
export type Review = (typeof business.reviews)[number];
