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
    directions: ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"],
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

  form: {
    title: "Book an appointment",
    subtitle: "Takes about a minute. We call to confirm the time.",
    name: "Your name",
    email: "Email",
    phone: "Phone number",
    issue: "What's the problem?",
    issueHint: "For example: AC runs but the air is warm upstairs.",
    submit: "Request my appointment",
    submitting: "Sending...",
    close: "Close",
    reassurance: `${b.estimate.callbackPromise}.`,
    errorSummary: "Please fix the highlighted fields and send again.",
    errors: {
      name: "Enter your name.",
      email: "Enter a valid email address.",
      phone: "Enter a 10-digit phone number.",
      issue: "Tell us briefly what the system is doing.",
      tooLong: "That's longer than we can accept. Please shorten it.",
    },
    serverError: `Something went wrong on our side and your request was not sent. Please call ${b.phone.display}.`,
    successHeading: "Request sent",
    successBody: `Thanks. ${b.estimate.callbackPromise}. For a breakdown that can't wait, call ${b.phone.display} now.`,
    /** SMS consent: optional, unticked. Names the business, purpose, rates and STOP. */
    smsConsent: `Text me about this request. I agree to receive text messages from ${b.name} about my service request and appointment at the number above. Message frequency varies. Message and data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.`,
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
