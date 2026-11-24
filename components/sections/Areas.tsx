import { ArrowRight } from "lucide-react";
import type { AreasBlock } from "@/content/types";
import { shared } from "@/content/shared";
import { business } from "@/lib/data/business";
import { Needle } from "@/components/ui/brand";
import { SectionHeading, stagger } from "@/components/sections/Section";

/** "29 mi west" from the town's rough bearing and distance. */
function distance(name: string): string | null {
  const pos = business.serviceArea.positions[name];
  if (!pos) return null;
  const dir = shared.areas.directions[Math.round(pos.bearing / 45) % 8];
  return shared.areas.miles(pos.miles, dir);
}

/**
 * Service areas on a cool blue field. Houston is the solid blue tile (home
 * base); each town is a white tile with its distance; the last tile is the
 * way out ("Not on the list? Book anyway"), so the grid is always full.
 * Phones: Houston full width, then the six tiles two by two.
 * Desktop: Houston takes a 2 x 2 block beside three columns of tiles.
 */
export function Areas({ block }: { block: AreasBlock }) {
  const a = shared.areas;
  const { towns, neighborhoods } = business.serviceArea;

  return (
    <section
      id={block.id}
      aria-labelledby={`${block.id}-heading`}
      className="section clip bg-blue-tint bg-cool-field max-lg:py-6"
    >
      <div className="shell">
        <SectionHeading
          id={block.id}
          heading={block.heading}
          intro={block.intro}
          introClassName="hidden sm:block"
        />

        <ul
          aria-label={a.label}
          className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 lg:mt-7 lg:grid-cols-5 lg:grid-rows-2 lg:gap-4"
        >
          {/* Houston: home base. */}
          <li
            className="col-span-2 flex flex-col rounded-lg bg-blue bg-blue-glow p-5 text-on-color shadow-lift lg:row-span-2 lg:p-7"
            data-reveal
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex size-[2.5rem] shrink-0 items-center justify-center rounded-sm bg-surface shadow-mark"
              >
                <Needle className="size-6" />
              </span>
              <p className="label text-blue-tint">{a.base}</p>
            </div>
            <p className="mt-4 font-display text-2xl font-bold leading-tight text-on-color lg:mt-auto lg:text-3xl">
              {business.city}
            </p>
            <p className="mt-1 text-sm text-blue-tint lg:hidden">{a.city}</p>
            <ul className="mt-4 hidden flex-wrap gap-2 lg:flex" aria-label={a.city}>
              {neighborhoods.map((n) => (
                <li
                  key={n}
                  className="rounded-sm bg-band-raised px-3 py-1 text-sm font-medium text-on-color ring-1 ring-on-band-line"
                >
                  {n}
                </li>
              ))}
            </ul>
          </li>

          {towns.map((town, i) => (
            <li
              key={town}
              className="tile flex flex-col justify-center rounded-md bg-surface px-4 py-3 shadow-card sm:px-5 sm:py-4"
              data-reveal
              style={stagger(i + 1)}
            >
              <p className="font-display text-base font-semibold leading-tight text-ink sm:text-lg">
                {town}
              </p>
              {distance(town) && <p className="mt-1 text-sm text-muted">{distance(town)}</p>}
            </li>
          ))}

          {/* The way out: book anyway and we confirm the area on the call. */}
          <li data-reveal style={stagger(towns.length + 1)}>
            <a
              href="#book"
              data-booking
              data-track="booking-click"
              data-track-location="areas"
              className="tile group flex h-full flex-col justify-center rounded-md border border-blue px-4 py-3 hover:bg-surface sm:px-5 sm:py-4"
            >
              <span className="font-display text-base font-semibold leading-tight text-ink sm:text-lg">
                {a.askTitle}
              </span>
              <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-blue-dark">
                {a.askLine}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-base ease-spring group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
