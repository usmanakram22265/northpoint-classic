import type { ReactNode } from "react";
import {
  BadgeCheck,
  CalendarClock,
  Clock3,
  FileText,
  Map as MapIcon,
  MapPin,
  Phone,
  ShieldCheck,
  Siren,
  type LucideIcon,
} from "lucide-react";
import type { AnswerBlock } from "@/content/types";
import { shared } from "@/content/shared";
import { business } from "@/lib/data/business";
import { fullAddress, hasLicense, hoursSummary, telHref } from "@/lib/format";
import { Needle } from "@/components/ui/brand";
import { BookButton, CallButton, Eyebrow, cn } from "@/components/ui/primitives";
import { Section, stagger } from "@/components/sections/Section";

type Fact = {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  /** Phones show only the essential facts, so the section fits one screen. */
  phone?: boolean;
};

/**
 * Splits the question at its accent (its last words), which is set in blue.
 * "Who should you call for AC repair in Houston?" -> [..., "Houston?"]
 */
function splitAccent(text: string, accent?: string): [string, string | null] {
  if (!accent || !text.endsWith(accent)) return [text, null];
  return [text.slice(0, text.length - accent.length), accent];
}

/**
 * Quick answer: the question, the answer led by the company name, and the
 * facts on a navy card that floats over the light section, like the
 * service label a technician sticks on the unit.
 *
 * Desktop: answer and actions on the start, the label on the end.
 * Phones: answer, a six-fact label in two columns, then the two actions;
 * the whole section fits one 375 x 812 screen.
 */
export function QuickAnswer({ block }: { block: AnswerBlock }) {
  const k = shared.keyFacts;
  const [question, accent] = splitAccent(block.question, block.accent);

  const facts: Fact[] = [
    { icon: MapPin, label: k.based, value: fullAddress, phone: true },
    { icon: MapIcon, label: k.serves, value: k.servesValue, phone: true },
    { icon: Clock3, label: k.hours, value: hoursSummary, phone: true },
    {
      icon: Siren,
      label: k.afterHours,
      value: (
        <span className="inline-flex rounded-sm bg-red px-2 py-1 text-on-color">
          {business.emergency.label}
        </span>
      ),
      phone: true,
    },
    { icon: FileText, label: k.estimates, value: k.estimatesValue },
    { icon: ShieldCheck, label: k.warranty, value: k.warrantyValue },
    // Desktop only (phones have the Call button and fewer rows): kept last so
    // the two-column dividers line up on every screen size.
    {
      icon: Phone,
      label: k.phone,
      value: (
        <a
          href={telHref}
          data-track="phone-click"
          data-track-location="quick-answer"
          className="link inline-flex min-h-tap items-center text-on-color lining-nums tabular-nums sm:min-h-0"
        >
          <span className="link-text">{business.phone.display}</span>
        </a>
      ),
    },
    { icon: CalendarClock, label: k.sameDay, value: k.sameDayValue },
    ...(hasLicense ? [{ icon: BadgeCheck, label: k.license, value: business.license.number }] : []),
  ];

  return (
    <Section id={block.id} tone={block.tone} glow className="max-lg:py-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-9">
        {/* The question and its answer. */}
        <div data-reveal>
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          <h2 id={`${block.id}-heading`} className={cn("text-3xl", block.eyebrow && "mt-3")}>
            {question}
            {accent && <span className="text-blue">{accent}</span>}
          </h2>
          <p className="mt-4 font-display text-xl font-bold text-ink lg:mt-6 lg:text-2xl">
            {business.name}.
          </p>
          <p className="mt-2 max-w-measure text-ink-soft lg:text-lg">{block.answer}</p>
          <div className="mt-7 hidden flex-wrap gap-3 lg:flex">
            <BookButton location="quick-answer" size="lg" />
            <CallButton location="quick-answer" size="lg" />
          </div>
        </div>

        {/* The service label. */}
        <aside
          aria-labelledby={`${block.id}-facts`}
          className="on-dark overflow-hidden rounded-lg bg-band bg-card-band shadow-float"
          data-reveal
          style={stagger(1)}
        >
          <div className="flex items-center gap-3 border-b border-on-band-line px-4 py-4 text-on-color sm:px-6 sm:py-5">
            <span
              aria-hidden
              className="flex size-[2.25rem] shrink-0 items-center justify-center rounded-sm bg-surface"
            >
              <Needle className="size-6" />
            </span>
            <div className="min-w-0">
              <h3
                id={`${block.id}-facts`}
                className="font-display text-base font-bold leading-tight text-on-color sm:text-lg"
              >
                {business.name}
              </h3>
              <p className="text-xs text-on-band-soft sm:text-sm">{block.factsHeading}</p>
            </div>
            <span className="ms-auto hidden shrink-0 rounded-sm bg-band-raised px-2 py-1 font-display text-xs font-bold text-on-color ring-1 ring-on-band-line sm:inline-flex">
              {k.since}
            </span>
          </div>

          <dl className="grid grid-cols-2">
            {facts.map(({ icon: Icon, label, value, phone }) => (
              <div
                key={label}
                className={cn(
                  "gap-3 border-t border-on-band-line p-4 first:border-t-0 sm:flex sm:p-5 [&:nth-child(2)]:border-t-0 [&:nth-child(even)]:border-s [&:nth-child(even)]:border-on-band-line",
                  phone ? "flex" : "hidden",
                )}
              >
                <span
                  aria-hidden
                  className="hidden size-[2.25rem] shrink-0 items-center justify-center rounded-sm bg-band-raised text-blue-tint ring-1 ring-on-band-line sm:flex"
                >
                  <Icon className="size-5" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <dt className="label text-on-band-soft">{label}</dt>
                  <dd className="mt-1 text-sm font-semibold leading-snug text-on-color sm:text-base">
                    {value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </aside>

        {/* Phones and tablets: the actions under the label. */}
        <div
          className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 lg:hidden"
          data-reveal
          style={stagger(2)}
        >
          <BookButton location="quick-answer" size="lg" />
          <CallButton location="quick-answer" size="lg" short />
        </div>
      </div>
    </Section>
  );
}
