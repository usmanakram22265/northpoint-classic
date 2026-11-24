import type { CSSProperties } from "react";
import { BadgeCheck, Clock3, PhoneCall, ShieldCheck } from "lucide-react";
import type {
  BandBlock,
  Block,
  BookBlock,
  MarqueeBlock,
  ReviewsBlock,
  ServicesBlock,
  SplitBlock,
  StepsBlock,
} from "@/content/types";
import { shared } from "@/content/shared";
import { business } from "@/lib/data/business";
import type { Review } from "@/lib/data/business";
import { getReview, hoursSummary } from "@/lib/format";
import { GhlEmbed } from "@/components/integrations/GhlEmbed";
import { Stars } from "@/components/ui/brand";
import { Marquee } from "@/components/ui/Marquee";
import { Photo, PhotoBackdrop } from "@/components/ui/Photo";
import { BookButton, CallButton, Eyebrow, PhoneLink, cn } from "@/components/ui/primitives";
import { Hero } from "@/components/sections/Hero";
import { Areas } from "@/components/sections/Areas";
import { Faq } from "@/components/sections/Faq";
import { QuickAnswer } from "@/components/sections/QuickAnswer";
import { Section, SectionHeading, isDark, stagger } from "@/components/sections/Section";
type Props<T> = { block: T };

/* ---------- Strip of place names under the hero ---------- */

function MarqueeStrip({ block }: Props<MarqueeBlock>) {
  const places = [
    business.city,
    ...business.serviceArea.towns,
    ...business.serviceArea.neighborhoods,
  ];
  return (
    <div
      id={block.id}
      className="flex items-center gap-4 border-b border-line bg-surface py-4 lg:gap-5 lg:py-5"
    >
      <p className="label shrink-0 ps-gutter text-blue">We serve</p>
      <div className="min-w-0 grow">
        <Marquee label={block.label} items={places} />
      </div>
    </div>
  );
}

/* ---------- Services: photo tiles ---------- */

/**
 * Eight photo tiles on the dark band. Desktop: one large tile, one wide tile
 * and six small ones in a 4-column grid. Phones: an even 2-column grid. The
 * tiles are not links (there are no service pages); the booking line under
 * them is the action.
 */
function Services({ block }: Props<ServicesBlock>) {
  return (
    <Section id={block.id} tone={block.tone}>
      <SectionHeading
        id={block.id}
        heading={block.heading}
        intro={block.intro}
        introClassName="hidden sm:block"
        onDark={isDark(block.tone)}
      />
      <ul className="mt-4 grid grid-cols-2 gap-2 [grid-auto-rows:6.5rem] sm:mt-5 sm:gap-3 sm:[grid-auto-rows:9.5rem] lg:mt-6 lg:grid-cols-4 lg:gap-4 lg:[grid-auto-rows:10.5rem]">
        {business.services.map((s, i) => {
          const large = i === 0;
          const wide = i === 1;
          return (
            <li
              key={s.slug}
              className={cn(large && "lg:col-span-2 lg:row-span-2", wide && "lg:col-span-2")}
              data-reveal
              style={stagger(i % 4)}
            >
              <article className="group relative grid h-full overflow-hidden rounded-lg bg-band shadow-card">
                <Photo
                  image={s.card}
                  ratio="fill"
                  sizes={
                    large || wide
                      ? "(min-width: 1024px) 560px, 50vw"
                      : "(min-width: 1024px) 280px, 50vw"
                  }
                  motion="settle"
                  scrim="full"
                  className="col-start-1 row-start-1 rounded-none"
                />
                <div className="relative col-start-1 row-start-1 flex flex-col justify-end bg-photo-scrim p-3 lg:p-5">
                  <div>
                    <h3
                      className={cn(
                        "font-display font-semibold leading-heading text-on-band",
                        large ? "text-base lg:text-3xl" : "text-base lg:text-lg",
                      )}
                    >
                      {s.name}
                    </h3>
                    {(large || wide) && (
                      <p className="mt-1 hidden max-w-measure text-sm text-on-band-soft lg:block">
                        {s.cardLine}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
      {block.bookingLine && (
        <div className="mt-5 grid gap-3 sm:mt-6 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:rounded-md sm:border sm:border-on-band-line sm:bg-band-raised sm:p-5 lg:mt-8 lg:px-7">
          <p className="max-w-measure text-on-band sm:text-lg">
            {block.bookingLine}
            {block.bookingDetail && (
              <span className="hidden sm:inline"> {block.bookingDetail}</span>
            )}
          </p>
          <BookButton location="services" className="shrink-0" />
        </div>
      )}
    </Section>
  );
}

/* ---------- Steps: four plain steps, each with its photo ---------- */

/**
 * One process: numbered blue nodes joined by a track (down the start side on
 * phones, across the top on desktop) that fills once on scroll. Each step is
 * a white card with its photo, a small "when" chip, the title and one line.
 * Book (red) and call (blue outline) sit side by side under the steps.
 */
function Steps({ block }: Props<StepsBlock>) {
  const count = block.steps.length;
  return (
    <Section id={block.id} tone={block.tone} glow>
      <SectionHeading id={block.id} heading={block.heading} intro={block.intro} />
      {/* Phones: compact numbered rows (title with its "when" chip, one line,
          no photo, no card). From sm: cards with photos, as before. */}
      <ol
        className="mt-5 grid gap-4 sm:mt-6 sm:gap-5 lg:mt-8 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))]"
        style={{ "--steps": count } as CSSProperties}
      >
        {block.steps.map((step, i) => (
          <li
            key={step.title}
            className="relative grid grid-cols-[var(--space-6)_minmax(0,1fr)] gap-3 lg:block"
            data-reveal
            style={stagger(i)}
          >
            {i < count - 1 && (
              <span aria-hidden className="step-track">
                <span className="step-fill" />
              </span>
            )}
            <span className="relative z-1 flex size-6 items-center justify-center rounded-full bg-blue font-display text-sm font-bold text-on-color shadow-node lining-nums">
              <span className="sr-only">Step </span>
              {i + 1}
            </span>
            <div
              className={cn(
                "pt-1 sm:grid sm:items-start sm:gap-4 sm:overflow-hidden sm:rounded-md sm:border sm:border-line sm:bg-surface sm:p-3 sm:shadow-card lg:mt-4 lg:block lg:p-0",
                step.image && "sm:grid-cols-[9rem_minmax(0,1fr)]",
              )}
            >
              {step.image && (
                <Photo
                  image={step.image}
                  ratio="inline"
                  sizes={`(min-width: 1024px) ${Math.round(1080 / count)}px, 144px`}
                  className="hidden rounded-sm sm:block lg:rounded-none"
                />
              )}
              <div className="lg:p-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:flex-col-reverse sm:items-start sm:gap-2 lg:gap-3">
                  <h3 className="text-lg leading-heading text-ink">{step.title}</h3>
                  {step.when && (
                    <p className="inline-flex items-center gap-1 rounded-full bg-blue-tint py-1 pe-3 ps-2 font-display text-xs font-semibold leading-none text-blue-dark">
                      <Clock3 aria-hidden className="size-4 shrink-0" strokeWidth={2.25} />
                      {step.when}
                    </p>
                  )}
                </div>
                <p className="mt-1 text-sm text-ink-soft lg:mt-2 lg:text-base">{step.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6 lg:mt-8" data-reveal>
        <BookButton location="steps" size="lg-sm" />
        <CallButton location="steps" size="lg-sm" short="phone" />
      </div>
    </Section>
  );
}

/* ---------- Reviews: rating first, then one moving row of review cards ---------- */

/**
 * One testimonial: compact and uniform. Stars, the quote clamped to four
 * lines (the full text stays in the markup, so screen readers get all of
 * it), then who said it on one line at the bottom.
 */
function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex w-full flex-col rounded-md border border-line bg-surface p-5 shadow-card">
      <Stars className="text-blue" />
      <span className="sr-only">5 out of 5 stars</span>
      <blockquote className="mb-4 mt-3 text-base text-ink">
        <p className="line-clamp-4">&ldquo;{review.text}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-auto flex items-baseline gap-2 border-t border-line pt-3 text-sm">
        <span className="font-display font-semibold text-ink">{review.firstName}</span>
        <span className="text-ink-soft">{review.town}</span>
      </figcaption>
    </figure>
  );
}

/**
 * The rating leads (large number, stars lighting in turn) beside the
 * heading. Under it, edge to edge, one row of compact review cards drifts
 * slowly and evenly sideways (`.review-track` in globals.css): two identical
 * tracks make a seamless loop, the copy is hidden and inert. Hover, keyboard
 * focus (the row is a focusable region) and a finger held on it stop it;
 * under reduced motion it is a still row you scroll sideways.
 */
function Reviews({ block }: Props<ReviewsBlock>) {
  const reviews = block.reviewIds.map(getReview);
  const { value, count, source } = business.rating;
  const cards = reviews.map((r) => (
    <li key={r.id}>
      <ReviewCard review={r} />
    </li>
  ));
  return (
    <Section
      id={block.id}
      tone={block.tone}
      className="bg-reviews-glow"
      after={
        <div className="mt-5 lg:mt-7" data-reveal style={stagger(2)}>
          <div className="review-frame">
            <div
              role="region"
              aria-label="Customer reviews"
              tabIndex={0}
              className="review-viewport fade-edges"
            >
              <ul className="review-track">{cards}</ul>
              <ul className="review-track" aria-hidden inert>
                {cards}
              </ul>
            </div>
          </div>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-8">
        <SectionHeading id={block.id} heading={block.heading} intro={block.intro} />
        <div className="flex" data-reveal style={stagger(1)}>
          <div className="flex min-w-0 grow items-center gap-4 rounded-lg border border-line bg-surface px-4 py-3 shadow-card lg:min-w-[22rem] lg:gap-5 lg:p-6">
            <p className="font-display text-3xl font-black tracking-display text-ink lining-nums tabular-nums lg:text-stat">
              {value}
            </p>
            <div className="min-w-0">
              <Stars animate className="text-blue lg:[&>svg]:size-5" />
              <p className="mt-1 font-display text-sm font-semibold leading-snug text-ink lg:mt-2 lg:text-base">
                <span className="lg:hidden">
                  {count} {source} reviews
                </span>
                <span className="hidden lg:inline">
                  {source} rating from {count} reviews
                </span>
              </p>
              <p className="text-xs text-muted lg:mt-1">{shared.reviews.sampleNote}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Split: the owner's photo beside a short note ---------- */

function Split({ block }: Props<SplitBlock>) {
  return (
    <Section id={block.id} tone={block.tone}>
      {/* Phones: a wide, short crop of the photo, the quote without the big
          quote mark, the three facts as a plain ticked list and both actions
          on one row, so the section fits one screen. */}
      <div className="grid items-center gap-5 sm:gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-9">
        <div data-reveal>
          <Photo
            image={block.image}
            ratio="inline"
            // Desktop: a 4:5 box shows the 4:3 photo about 720px wide, plus the parallax zoom.
            sizes="(min-width: 1024px) 780px, 100vw"
            motion="parallax"
            className="rounded-lg max-sm:aspect-[2/1] sm:max-lg:aspect-[4/3] lg:aspect-[4/5] lg:max-h-[34rem] [&_img]:object-[50%_30%]"
          />
        </div>
        <div data-reveal style={stagger(1)}>
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          <h2 id={`${block.id}-heading`} className={cn("text-2xl", block.eyebrow && "mt-3")}>
            {block.heading}
          </h2>
          <blockquote className="mt-4 sm:mt-5 lg:mt-6">
            <span
              aria-hidden
              className="hidden h-6 font-display text-3xl font-black leading-none text-blue sm:block"
            >
              &ldquo;
            </span>
            <p className="max-w-measure font-display text-base font-medium leading-snug text-ink sm:mt-1 sm:text-lg lg:text-xl lg:leading-snug">
              {block.quote}
            </p>
          </blockquote>
          <p className="mt-3 text-sm font-semibold text-ink-soft sm:mt-4">{block.signoff}</p>
          <ul className="mt-4 grid gap-2 sm:mt-6 sm:flex sm:flex-wrap">
            {block.list.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm font-semibold text-ink sm:rounded-full sm:border sm:border-line sm:bg-surface sm:py-2 sm:pe-4 sm:ps-2 sm:shadow-card"
              >
                <BadgeCheck aria-hidden className="size-5 shrink-0 text-blue" strokeWidth={2.25} />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6 sm:gap-x-5">
            <BookButton location="about" />
            <CallButton location="about" short className="sm:hidden" />
            <PhoneLink location="about" className="hidden sm:inline-flex" />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Photo band: one short message over a parallax photo ---------- */

/**
 * A short photo band: a heading, one line and the two actions, on the start
 * side, vertically centred. The photo rides on a layer taller than the band
 * and glides slower than the page (deep parallax, transform only, off under
 * reduced motion). Phones get an even dark wash; on desktop the wash is dark
 * under the text and clear over the outdoor unit.
 */
function Band({ block }: Props<BandBlock>) {
  return (
    <section
      id={block.id}
      aria-labelledby={`${block.id}-heading`}
      className="section-tight on-dark clip relative isolate flex items-center lg:min-h-[22rem]"
    >
      <PhotoBackdrop image={block.image} wash="band" deep />
      <div className="shell">
        <div data-reveal>
          <h2 id={`${block.id}-heading`} className="max-w-narrow text-2xl lg:text-3xl">
            {block.heading}
          </h2>
          <p className="mt-3 max-w-[34rem] text-lg text-on-band">{block.body}</p>
          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap sm:items-center lg:mt-6">
            <BookButton location="band" size="lg" />
            <CallButton location="band" size="lg" onDark />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Book: the closing band with the booking form ---------- */

/**
 * The last section and the `#book` target: a photo panel under a dark wash
 * with the heading, the phone number and a short trust list, and the booking
 * form floating beside it, like the hero. On phones the panel runs edge to
 * edge and the form sits under the heading, so the form is on the page at
 * every screen size.
 */
function Book({ block }: Props<BookBlock>) {
  const trust = [
    { icon: Clock3, text: `${hoursSummary}, ${business.timezoneLabel}` },
    { icon: PhoneCall, text: business.emergency.label },
    { icon: ShieldCheck, text: business.tagline },
  ];
  return (
    <section
      id={block.id}
      aria-labelledby={`${block.id}-heading`}
      className="bg-page lg:section-tight lg:bg-page-glow"
    >
      <div className="lg:shell">
        {/* Phones: a plain dark band (no photo), the heading and the form only;
            the phone bar already carries Call. */}
        <div
          className="band on-dark clip relative isolate bg-band sm:bg-none lg:rounded-lg lg:shadow-lift"
          data-reveal
        >
          <PhotoBackdrop image="ctaTechnician" wash="even" className="hidden sm:block" />
          <div className="shell grid gap-5 py-6 sm:gap-6 sm:py-7 lg:grid-cols-[minmax(0,1fr)_var(--width-form)] lg:items-center lg:gap-9 lg:p-8">
            <div>
              <h2 id={`${block.id}-heading`} className="text-3xl">
                {block.heading}
              </h2>
              <p className="mt-3 hidden max-w-measure text-lg text-on-band-soft sm:block">
                {block.line}
              </p>
              <PhoneLink
                location="book"
                onDark
                className="mt-4 hidden text-xl sm:inline-flex lg:mt-5"
              />
              <ul className="mt-4 hidden gap-2 text-sm text-on-band-soft sm:grid lg:mt-6">
                {trust.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2">
                    <Icon
                      aria-hidden
                      className="size-4 shrink-0 text-blue-tint"
                      strokeWidth={2.25}
                    />
                    <span className="lining-nums">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-inline-form className="on-light rounded-lg bg-surface p-4 shadow-form sm:p-6">
              <GhlEmbed embed="website" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Renderer ---------- */

/** Renders the page's blocks in order. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        const next = blocks[i + 1];
        switch (block.type) {
          case "hero":
            // The hero and the "We serve" strip share the first screen: the
            // hero grows so the strip ends exactly at the fold.
            return (
              <div key={block.id} className="first-screen">
                <Hero block={block} />
                {next?.type === "marquee" && <MarqueeStrip block={next} />}
              </div>
            );
          case "marquee":
            if (blocks[i - 1]?.type === "hero") return null;
            return <MarqueeStrip key={block.id} block={block} />;
          case "services":
            return <Services key={block.id} block={block} />;
          case "steps":
            return <Steps key={block.id} block={block} />;
          case "reviews":
            return <Reviews key={block.id} block={block} />;
          case "split":
            return <Split key={block.id} block={block} />;
          case "band":
            return <Band key={block.id} block={block} />;
          case "areas":
            return <Areas key={block.id} block={block} />;
          case "answer":
            return <QuickAnswer key={block.id} block={block} />;
          case "faq":
            return <Faq key={block.id} block={block} />;
          case "book":
            return <Book key={block.id} block={block} />;
        }
      })}
    </>
  );
}
