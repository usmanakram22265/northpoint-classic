import Image from "next/image";
import { Phone, Plus } from "lucide-react";
import type { FaqBlock } from "@/content/types";
import { shared } from "@/content/shared";
import { business } from "@/lib/data/business";
import { getImage, hoursSummary, telHref } from "@/lib/format";
import { BookButton, CallButton, cn } from "@/components/ui/primitives";
import { SectionHeading, stagger } from "@/components/sections/Section";

/**
 * "Still not sure?": a person, not a form. It sits straight on the section
 * (no card), so the raised question panel is the one object with depth.
 * `compact` is the phone version: one row with a round call button.
 */
function AskOwner({ compact = false, className }: { compact?: boolean; className?: string }) {
  const photo = getImage("owner");
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <Image
          src={photo.src}
          alt=""
          width={photo.width}
          height={photo.height}
          sizes="64px"
          quality={85}
          className={cn(
            "shrink-0 rounded-full object-cover object-[50%_25%] shadow-card ring-2 ring-surface",
            compact ? "size-[3.25rem]" : "size-[4rem]",
          )}
        />
        <div className="min-w-0 grow">
          <p className="font-display text-lg font-bold leading-tight text-ink">
            {shared.faqHelp.heading}
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            {business.owner.name}, {business.owner.role.toLowerCase()}
          </p>
        </div>
        {compact && (
          <a
            href={telHref}
            data-track="phone-click"
            data-track-location="faq"
            aria-label={shared.cta.call}
            className="press flex size-tap shrink-0 items-center justify-center rounded-full border border-blue bg-surface text-blue active:bg-blue-tint"
          >
            <Phone aria-hidden className="size-5" strokeWidth={2.25} />
          </a>
        )}
      </div>
      {!compact && <p className="mt-4 max-w-measure text-ink-soft">{shared.faqHelp.line}</p>}
      <div className={cn("grid gap-3", compact ? "mt-4" : "mt-5 sm:grid-cols-2")}>
        <BookButton location="faq" />
        {!compact && <CallButton location="faq" short />}
      </div>
      {!compact && (
        <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
          <span className="rounded-sm bg-red-tint px-2 py-1 font-semibold text-red-dark">
            {business.emergency.label}
          </span>
          {hoursSummary}
        </p>
      )}
    </div>
  );
}

/**
 * FAQ on the tinted section. The questions are one raised white panel split
 * by hairlines (not six loose cards); the open one washes blue, its plus
 * turns into a cross and the tile fills blue. Desktop: heading and the owner
 * stay in view on the start. Phones: heading, panel, then the owner row.
 */
export function Faq({ block }: { block: FaqBlock }) {
  return (
    <section
      id={block.id}
      aria-labelledby={`${block.id}-heading`}
      className="section clip bg-subtle bg-faq-glow max-lg:py-6"
    >
      <div className="shell grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-9">
        <div className="lg:sticky lg:top-[var(--sticky-top)]">
          <SectionHeading id={block.id} heading={block.heading} intro={block.intro} />
          <div className="hidden lg:block" data-reveal style={stagger(1)}>
            <AskOwner className="mt-8 border-t border-line pt-8" />
          </div>
        </div>

        <div
          className="overflow-hidden rounded-lg bg-surface shadow-lift"
          data-reveal
          style={stagger(1)}
        >
          {block.items.map((item, i) => (
            <details
              key={item.q}
              className={cn("faq-row group open:bg-page", i > 0 && "border-t border-line")}
            >
              <summary className="flex min-h-tap-lg list-none items-center gap-4 px-4 py-3 sm:px-6 sm:py-4">
                <h3 className="grow font-display text-base font-semibold leading-snug text-ink group-open:text-blue-dark sm:text-lg">
                  {item.q}
                </h3>
                <span
                  aria-hidden
                  className="flex size-[2.25rem] shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue-dark group-open:bg-blue group-open:text-on-color"
                >
                  <Plus className="faq-plus size-5" strokeWidth={2.25} />
                </span>
              </summary>
              <div className="faq-body px-4 pb-5 sm:px-6">
                <p className="max-w-measure text-ink-soft">{item.a}</p>
              </div>
            </details>
          ))}
        </div>

        <AskOwner compact className="lg:hidden" />
      </div>
    </section>
  );
}
