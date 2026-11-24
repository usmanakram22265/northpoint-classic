import type { CSSProperties, ReactNode } from "react";
import { Check } from "lucide-react";
import type { Tone } from "@/content/types";
import { Airflow } from "@/components/ui/Airflow";
import { Eyebrow, cn } from "@/components/ui/primitives";

/** Surface of each section. The dark band and the blue band flip their text colours. */
const toneClass: Record<Tone, string> = {
  page: "bg-page",
  surface: "bg-surface",
  subtle: "bg-subtle",
  band: "band on-dark bg-band",
  blue: "band band-blue on-dark on-blue bg-blue",
};

export function isDark(tone: Tone | undefined): boolean {
  return tone === "band" || tone === "blue";
}

/** Stagger position for `.enter` and `[data-reveal]` items. */
export function stagger(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

/**
 * One section: full width, as tall as its content, straight onto the next
 * section so the page scrolls as one piece (see `.section` in globals.css).
 * `id` is the in-page anchor.
 */
export function Section({
  id,
  tone = "page",
  airflow = false,
  glow = false,
  className,
  children,
  after,
}: {
  id: string;
  tone?: Tone;
  airflow?: boolean;
  /** Soft blue light in the corner of a light section. */
  glow?: boolean;
  className?: string;
  children: ReactNode;
  /** Full-width content under the page column (edge to edge, like a moving strip). */
  after?: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      // `clip`, not overflow-hidden: parallax photos and sticky columns need the page as their scroller.
      className={cn("section clip", toneClass[tone], glow && "bg-page-glow", className)}
    >
      {airflow && <Airflow onDark={isDark(tone)} className="bottom-0" />}
      <div className="shell">{children}</div>
      {after}
    </section>
  );
}

/** Section heading. It slides up a little as it comes into view. */
export function SectionHeading({
  id,
  eyebrow,
  heading,
  intro,
  onDark = false,
  className,
  introClassName,
}: {
  id: string;
  eyebrow?: string;
  heading: string;
  intro?: string;
  onDark?: boolean;
  className?: string;
  /** E.g. `hidden sm:block` where a phone screen has no room for the intro. */
  introClassName?: string;
}) {
  return (
    <div className={cn("max-w-narrow", className)} data-reveal>
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <h2 id={`${id}-heading`} className={cn("text-3xl", eyebrow && "mt-3")}>
        {heading}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-2 max-w-measure text-base sm:mt-3 sm:text-lg",
            onDark ? "text-on-band-soft" : "text-ink-soft",
            introClassName,
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/** Ticked list. The tick sits in a small filled circle. */
export function CheckList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("grid gap-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-px flex size-5 shrink-0 items-center justify-center rounded-full bg-blue text-on-color">
            <Check className="size-4" strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
