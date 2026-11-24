import type { CSSProperties } from "react";
import { Star } from "lucide-react";
import { business } from "@/lib/data/business";
import { cn } from "@/components/ui/primitives";

/**
 * The Northpoint needle: a compass needle whose north half is blue (the
 * brand) and south half red (the accent). The logo mark.
 */
export function Needle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("shrink-0", className)}>
      <path d="M12 1.5 18.5 12h-13Z" className="fill-blue" />
      <path d="M5.5 12h13L12 22.5Z" className="fill-red" />
      <circle cx="12" cy="12" r="1.7" className="fill-surface" />
    </svg>
  );
}

/**
 * The brand mark: the needle in a light tile, then the name. `compact`
 * (the header) drops the "Heating & Air" line on the narrowest phones, so the
 * phone number fits beside it.
 */
export function Wordmark({
  onDark = false,
  compact = false,
}: {
  onDark?: boolean;
  compact?: boolean;
}) {
  return (
    <span className="flex items-center gap-2 sm:gap-3">
      <span
        aria-hidden
        className={cn(
          "flex size-mark-sm shrink-0 items-center justify-center rounded-sm shadow-mark sm:size-mark",
          onDark ? "bg-surface" : "bg-blue-tint",
        )}
      >
        <Needle className="size-6" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-base font-black leading-none tracking-display sm:text-xl sm:leading-none",
            onDark ? "text-on-band" : "text-ink",
          )}
        >
          {business.shortName}
        </span>
        <span
          className={cn(
            "label mt-1 whitespace-nowrap",
            onDark ? "text-on-band-soft" : "text-muted",
            compact && "hidden min-[375px]:block",
          )}
        >
          {business.wordmarkTagline}
        </span>
      </span>
    </span>
  );
}

/** Five stars, decorative: the rating is always said in words next to them. */
export function Stars({ className, animate = false }: { className?: string; animate?: boolean }) {
  return (
    <span aria-hidden className={cn("flex gap-1", className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={cn("size-4", animate && "rate-star")}
          fill="currentColor"
          strokeWidth={0}
          style={animate ? ({ "--i": i } as CSSProperties) : undefined}
        />
      ))}
    </span>
  );
}
