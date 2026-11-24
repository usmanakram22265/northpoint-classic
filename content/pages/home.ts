import type { Block } from "@/content/types";
import { business as b } from "@/lib/data/business";

const c = b.city;

export const homeMeta = {
  title: `${b.name} | Heating and AC repair in ${c}`,
  description: `${b.tagline}. AC repair, heating repair, installs and maintenance across ${c}. Book an appointment online in about a minute; we call back the same business day.`,
};

/**
 * Home. The one action is booking an appointment; calling is the second.
 * Copy is short enough to read on a phone screen.
 */
export const homeBlocks: Block[] = [
  {
    type: "hero",
    id: "top",
    h1: `${c} AC repair, booked`,
    accent: "in a minute.",
    lead: "Tell us what your AC is doing. We call back the same business day to set a time.",
    image: "heroHome",
  },
  { type: "marquee", id: "places", label: "Neighborhoods and towns we serve" },
  {
    type: "services",
    id: "services",
    tone: "band",
    heading: "What can we fix or install?",
    intro: "Eight services, all for homes.",
    bookingLine: "Not sure which one you need?",
    bookingDetail: "Tell us what the system is doing and we will work it out.",
  },
  {
    type: "steps",
    id: "how-it-works",
    tone: "page",
    heading: "How does booking work?",
    intro: "Four steps from the form to a comfortable house. You see the estimate before the last one.",
    steps: [
      {
        title: "Send the form",
        body: "Your name, email, phone and a line about what the system is doing.",
        image: "stepHotUnit",
        when: "About a minute",
      },
      {
        title: "We call you back",
        body: "Someone from our office calls to agree a visit time that suits you.",
        image: "stepTools",
        when: "Same business day",
      },
      {
        title: "You get it in writing",
        body: "A technician finds the cause and writes down what it takes to fix it.",
        image: "stepEstimate",
        when: "On the visit",
      },
      {
        title: "We do the work",
        body: "We fix it, then test the system with you before we leave.",
        image: "stepWork",
        when: "Once you approve",
      },
    ],
  },
  {
    type: "reviews",
    id: "reviews",
    tone: "subtle",
    heading: "What do customers say?",
    intro: `Homeowners across ${c} on repairs, new systems and tune-ups.`,
    reviewIds: [1, 3, 6, 2, 8, 5],
  },
  {
    type: "split",
    id: "about",
    tone: "page",
    eyebrow: "From the owner",
    heading: `Why do ${c} homeowners choose ${b.shortName}?`,
    quote: `We have looked after ${c} homes since ${b.founded}, and we are still a family business. You get the estimate in writing before a single part is replaced.`,
    list: [`Family-owned since ${b.founded}`, ...b.certifications],
    signoff: `${b.owner.name}, ${b.owner.role.toLowerCase()}`,
    image: "owner",
  },
  {
    type: "band",
    id: "season",
    heading: "Same-day AC repair when the heat won't wait.",
    body: `Book before ${b.sameDay.cutoff} on a ${b.sameDay.when} and a technician comes out the same day. After hours, call the ${b.emergency.label}.`,
    image: "bandOutdoorUnit",
  },
  {
    type: "areas",
    id: "areas",
    tone: "subtle",
    heading: `Which parts of ${c} do we cover?`,
    intro: `All of ${c} and the towns around it. Same technicians and the same booking, wherever you are.`,
  },
  {
    type: "answer",
    id: "quick-answer",
    tone: "page",
    eyebrow: "Quick answer",
    question: `Who should you call for AC repair in ${c}?`,
    accent: `${c}?`,
    answer: `A family-owned ${c} company since ${b.founded}. We repair, replace and maintain home air conditioners, heat pumps and furnaces, and every job starts with a written estimate.`,
    factsHeading: "The facts at a glance",
  },
  {
    type: "faq",
    id: "faq",
    tone: "subtle",
    heading: "What do homeowners ask before they book?",
    items: [
      {
        q: "What happens after I book?",
        a: "Someone from our office calls you the same business day to agree a time that suits you. Nothing is fixed until you have spoken to us.",
      },
      {
        q: "How quickly can a technician come?",
        a: `Book or call before ${b.sameDay.cutoff} on a ${b.sameDay.when} and we come out the same day. Outside office hours, the ${b.emergency.label} is answered by ${b.emergency.answeredBy}.`,
      },
      {
        q: "Will I know the cost before work starts?",
        a: "Yes. The technician explains what is wrong and gives you a written estimate before any work starts. You decide after that.",
      },
      {
        q: "Are you insured?",
        a: `Yes. We carry ${b.insurance}, and our technicians are NATE-certified and EPA Section 608 certified.`,
      },
      {
        q: "Do you repair heating too?",
        a: "Yes. We repair furnaces and heat pumps as well as central air conditioners, and we install heat pumps and ductless mini-splits.",
      },
      {
        q: "Can I pay for a new system over time?",
        a: `Yes. Financing for replacement systems is available through ${b.financing.lenderLabel}, subject to credit approval. Ask on the call.`,
      },
    ],
  },
  {
    type: "book",
    id: "book",
    heading: "Ready to book your visit?",
    line: `${b.estimate.callbackPromise}. ${b.estimate.promise}.`,
  },
];
