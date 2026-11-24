import type { ReactNode } from "react";
import { ArrowRight, CalendarCheck, Phone } from "lucide-react";
import { shared } from "@/content/shared";
import { business } from "@/lib/data/business";
import { homeLink, telHref } from "@/lib/format";

export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

const base =
  "press inline-flex min-h-tap items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 font-display text-base font-semibold leading-none";
const large = "min-h-tap-lg px-6 text-lg";

const variants = {
  /** Red fill: the main action (Book appointment). */
  primary: "bg-red text-on-color shadow-cta hover:bg-red-dark active:bg-red-dark",
  /** Blue outline: secondary actions (call) on light surfaces. */
  secondary:
    "border border-blue bg-transparent text-blue hover:bg-blue-tint hover:text-blue-dark active:bg-blue-tint active:text-blue-dark",
  /** White outline: secondary actions on the dark band and photos (blue fails there). */
  onBand:
    "border border-on-band-soft bg-transparent text-on-band hover:bg-band-raised active:bg-band-raised",
} as const;
type Variant = keyof typeof variants;

/** "lg-sm": regular on phones (so two buttons fit one row), large from sm up. */
const sizes = {
  md: "",
  lg: large,
  "lg-sm": "sm:min-h-tap-lg sm:px-6 sm:text-lg",
} as const;
type Size = keyof typeof sizes;
type CtaProps = { location: string; className?: string; size?: Size };

/**
 * The site's one main action, filled red. A real link to the booking form
 * (/#book, at the end of the home page), so it works with JavaScript off; with it
 * on, BookingDialog opens the form in a sheet.
 */
export function BookButton({ location, className, size = "md" }: CtaProps) {
  return (
    <a
      href={homeLink("#book")}
      data-booking
      data-track="booking-click"
      data-track-location={location}
      className={cn(base, variants.primary, sizes[size], className)}
    >
      <CalendarCheck aria-hidden className="size-5 shrink-0" strokeWidth={2.25} />
      <span>{shared.cta.book}</span>
    </a>
  );
}

/**
 * The call button, a secondary action: blue outline on light surfaces,
 * white outline on the dark band ("Call (505) 528-6289", or "Call" when
 * short; `short="phone"` says "Call" on phones only, so it fits beside Book).
 */
export function CallButton({
  location,
  className,
  size = "md",
  onDark = false,
  short = false,
}: CtaProps & { onDark?: boolean; short?: boolean | "phone" }) {
  const variant: Variant = onDark ? "onBand" : "secondary";
  return (
    <a
      href={telHref}
      data-track="phone-click"
      data-track-location={location}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      <Phone aria-hidden className="size-5 shrink-0" strokeWidth={2.25} />
      {short === "phone" ? (
        <>
          <span className="sm:hidden">{shared.cta.callShort}</span>
          <span className="hidden lining-nums tabular-nums sm:inline">{shared.cta.call}</span>
        </>
      ) : (
        <span className="lining-nums tabular-nums">
          {short ? shared.cta.callShort : shared.cta.call}
        </span>
      )}
    </a>
  );
}

/** Phone number as a text link: blue on light surfaces, white on the band. */
export function PhoneLink({
  location,
  className,
  onDark = false,
}: {
  location: string;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <a
      href={telHref}
      data-track="phone-click"
      data-track-location={location}
      className={cn(
        "link group inline-flex min-h-tap items-center gap-2 font-display font-semibold",
        onDark ? "text-on-band" : "text-blue",
        className,
      )}
    >
      <Phone aria-hidden className="size-5 shrink-0" strokeWidth={2.25} />
      <span className="link-text whitespace-nowrap lining-nums tabular-nums">
        {business.phone.display}
      </span>
    </a>
  );
}

/** A text link with an arrow. Blue; the text underlines on hover. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "link group inline-flex min-h-tap items-center gap-2 font-display font-semibold text-blue",
        className,
      )}
    >
      <span className="link-text">{children}</span>
      <ArrowRight
        aria-hidden
        className="size-5 shrink-0 transition-transform duration-base ease-spring group-hover:translate-x-1"
      />
    </a>
  );
}

/** Small uppercase label above headings. */
export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p className={cn("label flex items-center gap-2", onDark ? "text-blue-tint" : "text-blue")}>
      <span aria-hidden className={cn("h-px w-6", onDark ? "bg-blue-tint" : "bg-blue")} />
      {children}
    </p>
  );
}
