import type { ImageKey } from "@/lib/data/business";

/**
 * The home page is an ordered list of blocks; the order is the order on the
 * page. Each block has an `id`, used as its in-page anchor (the nav links
 * point at these), and can pick a background tone.
 */

export type Tone = "page" | "surface" | "subtle" | "band" | "blue";
export type Faq = { q: string; a: string };
export type Step = {
  title: string;
  body: string;
  image?: ImageKey;
  /** When this step happens, in a few words ("About a minute"). */
  when?: string;
};

type Base = { id: string; tone?: Tone };

export type HeroBlock = Base & {
  type: "hero";
  h1: string;
  /** The end of the headline that carries the promise; it gets the blue accent. */
  accent: string;
  lead: string;
  image: ImageKey;
};

/** A slow strip of the places served, straight under the hero. */
export type MarqueeBlock = Base & { type: "marquee"; label: string };

export type ServicesBlock = Base & {
  type: "services";
  heading: string;
  intro?: string;
  /** One short line under the tiles, beside a booking button. */
  bookingLine?: string;
  /** Its second sentence; shown from sm up (phones keep the line short). */
  bookingDetail?: string;
};

export type StepsBlock = Base & {
  type: "steps";
  heading: string;
  intro?: string;
  steps: Step[];
};

export type ReviewsBlock = Base & {
  type: "reviews";
  heading: string;
  intro?: string;
  reviewIds: number[];
};

export type SplitBlock = Base & {
  type: "split";
  eyebrow?: string;
  heading: string;
  quote: string;
  list: string[];
  signoff: string;
  image: ImageKey;
};

/** A short photo band: a heading, one line and the Book and Call actions. */
export type BandBlock = Base & {
  type: "band";
  heading: string;
  body: string;
  image: ImageKey;
};

export type AreasBlock = Base & {
  type: "areas";
  heading: string;
  intro?: string;
  note?: string;
};

/** A direct answer and the actions, with the "at a glance" facts card beside it. */
export type AnswerBlock = Base & {
  type: "answer";
  eyebrow?: string;
  question: string;
  /** The end of the question, set in blue. */
  accent?: string;
  answer: string;
  points?: { icon: "clock" | "phone" | "shield"; text: string }[];
  factsHeading: string;
};

export type FaqBlock = Base & {
  type: "faq";
  heading: string;
  intro?: string;
  items: Faq[];
};

/** The closing band: the booking form (the `#book` target at every screen size). */
export type BookBlock = Base & {
  type: "book";
  heading: string;
  line: string;
};

export type Block =
  | HeroBlock
  | MarqueeBlock
  | ServicesBlock
  | StepsBlock
  | ReviewsBlock
  | SplitBlock
  | BandBlock
  | AreasBlock
  | AnswerBlock
  | FaqBlock
  | BookBlock;
