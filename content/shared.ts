import { business as b } from "@/lib/data/business";
import { licenseLine } from "@/lib/format";

/** Copy that appears in the frame of the page: navigation, buttons, footer, the form. */
export const shared = {
  skipLink: "Skip to main content",

  cta: {
    book: "Book appointment",
    call: `Call ${b.phone.display}`,
    callShort: "Call",
  },

  strip: {
    /** The license shows here once the number is filled in; until then, the tagline. */
    trust: licenseLine ?? b.tagline,
    trustShort: licenseLine ?? `Family-owned since ${b.founded}`,
    emergency: b.emergency.label,
  },

  /** In-page sections. Every nav link is an anchor to a section on the home page. */
  nav: {
    label: "Main",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    phoneLabel: "Prefer to call?",
    links: [
      { label: "Services", href: "#services" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Reviews", href: "#reviews" },
      { label: "About", href: "#about" },
      { label: "Service areas", href: "#areas" },
      { label: "FAQ", href: "#faq" },
    ],
  },

  faqHelp: {
    heading: "Still not sure?",
    line: `Talk it through with ${b.owner.firstName}, the owner, or book and we call you back the same business day.`,
  },

  areas: {
    label: `${b.city} and the towns we serve`,
    base: "Home base",
    city: `Every part of the city, from ${b.serviceArea.neighborhoods[0]} to ${b.serviceArea.neighborhoods[b.serviceArea.neighborhoods.length - 1]}.`,
    /** 8-point compass, clockwise from north. */
    directions: [
      "north",
      "northeast",
      "east",
      "southeast",
      "south",
      "southwest",
      "west",
      "northwest",
    ],
    miles: (n: number, dir: string) => `${n} mi ${dir}`,
    askTitle: "Not on the list?",
    askLine: "Book anyway",
  },

  keyFacts: {
    phone: "Phone",
    sameDay: "Same day",
    sameDayValue: `Book before ${b.sameDay.cutoff} on ${b.sameDay.when}s`,
    license: "License",
    since: `Since ${b.founded}`,
    based: "Based in",
    serves: "Serves",
    servesValue: `${b.city} and ${b.serviceArea.towns.length} nearby towns`,
    hours: `Hours, ${b.timezoneLabel}`,
    afterHours: "After hours",
    estimates: "Estimates",
    estimatesValue: "Written, before any work starts",
    warranty: "Warranty",
    warrantyValue: `${b.warranty.repairYears} year${b.warranty.repairYears === 1 ? "" : "s"} on repairs`,
  },

  footer: {
    pageHeading: "On this page",
    servicesHeading: "Services",
    hoursHeading: "Hours",
    copyright: `${b.legalName}. All rights reserved.`,
    demoNotice: "The rating and reviews on this page are demo samples.",
  },

  reviews: {
    ratingLine: `Rated ${b.rating.value} on ${b.rating.source} from ${b.rating.count} reviews`,
    sampleNote: "Sample reviews for this demo.",
  },

  /** The booking sheet on the home page (the Website Form embed inside). */
  dialog: {
    label: "Book appointment",
    close: "Close",
  },

  /**
   * GoHighLevel embeds. Every form's text, fields, colours, consent and
   * on-submit behaviour are set in GHL, not here.
   */
  ghl: {
    script: "https://link.scaalus.com/js/form_embed.js",
    formUrl: "https://link.scaalus.com/widget/form/",
    surveyUrl: "https://link.scaalus.com/widget/survey/",
    embeds: {
      website: { kind: "form", id: "CcEZQaj5hwiYAz6ZLRnI", height: 876, name: "Website Form" },
      discount: { kind: "form", id: "wDueIfvyuZScUHlgefCQ", height: 658, name: "Discount Form" },
      clientReview: {
        kind: "form",
        id: "PohxYBjegTnAe81XecT6",
        height: 900,
        name: "Client Review + 1 Year Followup Sequence Form",
      },
      reviewSurvey: {
        kind: "survey",
        id: "RCJtOC9wf9hEkbeThLLy",
        height: 600,
        name: "Review Survey",
      },
    },
    /** The chat bubble: loads lazily on every page except these paths. Its look is set in GHL. */
    chat: {
      script: "https://widgets.leadconnectorhq.com/loader.js",
      resourcesUrl: "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
      widgetId: "6b070b40109c42556ce94c7d",
      excludePaths: ["/review"],
    },
  },

  /** The standalone form pages. `{phone}` becomes the phone number as a tel: link. */
  pages: {
    contact: {
      title: "Tell us about the problem",
      line: "We get back to you the same business day.",
      embed: "website",
    },
    discount: {
      title: "Your past-customer discount",
      line: "Fill this out and we'll call to set up your visit.",
      embed: "discount",
    },
    review: {
      title: "How did we do?",
      line: "Takes 10 seconds.",
      embed: "reviewSurvey",
    },
    marketing: {
      title: "Add a finished job",
      line: "Starts the review texts and the 12 months of offers.",
      embed: "clientReview",
    },
    thankYou: {
      title: "Thanks, we got it.",
      body: "We'll get back to you the same business day. Need help now? Call {phone}.",
    },
  },

  notFound: {
    title: "Page not found",
    heading: "That page isn't here",
    body: "The link may be old or mistyped. The home page has everything, including the booking form.",
    home: "Go to the home page",
  },

  error: {
    heading: "This page didn't load",
    body: `Try again. If it keeps happening, call ${b.phone.display} and we'll help you by phone.`,
    retry: "Try again",
  },
} as const;
