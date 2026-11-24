import { ArrowRight, Snowflake, Sun } from "lucide-react";
import type { HeroBlock } from "@/content/types";
import { shared } from "@/content/shared";
import { LeadForm } from "@/components/forms/LeadForm";
import { Airflow } from "@/components/ui/Airflow";
import { Stars } from "@/components/ui/brand";
import { CoverPhoto } from "@/components/ui/Photo";
import { BookButton, CallButton, PhoneLink, cn } from "@/components/ui/primitives";
import { stagger } from "@/components/sections/Section";

/** Five stars and the rating line, white on the photo. */
function RatingLine() {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
      <Stars className="text-on-band" />
      <span className="font-semibold text-on-band">{shared.reviews.ratingLine}</span>
    </p>
  );
}

/**
 * The signature: a thermostat reading on a small white display. Outside is a
 * Houston summer afternoon in red; inside counts down to a comfortable 72 in
 * blue when the page loads (`.thermo-value` in globals.css). Decorative, so
 * hidden from assistive tech.
 */
function Thermostat({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("enter inline-flex items-center gap-4 rounded-md bg-surface px-4 py-3 shadow-lift sm:gap-5 sm:px-5", className)}
      style={stagger(5)}
    >
      <span className="flex items-center gap-3">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-red-tint">
          <Sun className="size-4 text-red-dark" strokeWidth={2.5} />
        </span>
        <span className="flex flex-col">
          <span className="label text-muted">Outside</span>
          <span className="font-display text-xl font-bold leading-none text-red-dark lining-nums">96°</span>
        </span>
      </span>
      <ArrowRight className="size-4 shrink-0 text-muted" />
      <span className="flex items-center gap-3">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-tint">
          <Snowflake className="size-4 text-blue-dark" strokeWidth={2.5} />
        </span>
        <span className="flex flex-col">
          <span className="label text-muted">Inside</span>
          <span className="thermo-value font-display text-xl font-bold leading-none text-blue tabular-nums" />
        </span>
      </span>
    </div>
  );
}

/**
 * Home hero: the photo fills the first screen. A technician walks up to a
 * Houston home; the headline sits on the dark side of the photo and the
 * booking form floats on the end side (desktop). On phones the photo fills
 * the screen, the thermostat sits at the top and the headline, copy and the
 * two actions sit at the bottom; the form opens in the booking sheet.
 */
export function Hero({ block }: { block: HeroBlock }) {
  return (
    <section
      id={block.id}
      aria-labelledby="hero-heading"
      className="hero-screen on-dark relative isolate overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-1 overflow-hidden bg-band">
        <CoverPhoto
          image={block.image}
          sizes="100vw"
          eager
          className="hero-photo h-full w-full object-cover object-[56%_50%]"
        />
        <span className="hero-scrim absolute inset-0" />
      </div>
      <Airflow onDark className="bottom-0" />

      <div className="shell-wide flex flex-1 flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_var(--width-form)] lg:items-center lg:gap-9">
        <div className="flex flex-1 flex-col justify-between gap-6 lg:block">
          <Thermostat className="self-start lg:hidden" />

          <div>
            <h1 id="hero-heading" className="max-w-[13ch] text-4xl text-on-band">
              <span className="enter-move block">{block.h1}</span>
              <span className="enter-move block" style={stagger(1)}>
                <span className="hero-accent">{block.accent}</span>
              </span>
            </h1>
            <p className="enter mt-4 max-w-[34rem] text-lg text-on-band lg:mt-5" style={stagger(2)}>
              {block.lead}
            </p>

            {/* Phones and tablets: the two actions. Desktop has the form. */}
            <div className="enter mt-5 grid gap-3 sm:flex lg:hidden" style={stagger(3)}>
              <BookButton location="hero" size="lg" />
              <CallButton location="hero" size="lg" onDark />
            </div>

            <div className="enter mt-6 hidden flex-wrap items-center gap-x-7 gap-y-3 lg:flex" style={stagger(3)}>
              <RatingLine />
              <PhoneLink location="hero" onDark className="text-lg" />
            </div>

            <Thermostat className="mt-7 hidden lg:inline-flex" />
          </div>
        </div>

        <div
          data-inline-form
          className="enter on-light hidden rounded-lg bg-surface p-6 shadow-form lg:block"
          style={stagger(2)}
        >
          <LeadForm idPrefix="hero" />
        </div>
      </div>
    </section>
  );
}
