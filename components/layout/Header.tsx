import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { shared } from "@/content/shared";
import { business } from "@/lib/data/business";
import { homeLink, telHref } from "@/lib/format";
import { Stars, Wordmark } from "@/components/ui/brand";
import { BookButton, CallButton, cn } from "@/components/ui/primitives";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileNav } from "@/components/layout/MobileNav";

/**
 * Rating line in the phone menu: a link that jumps to the reviews.
 */
function Rating({ className, asLink = true }: { className?: string; asLink?: boolean }) {
  const { value, count, source } = business.rating;
  const content: ReactNode = (
    <>
      <Stars className="text-blue [&>svg]:size-[0.875rem]" />
      <span className={asLink ? "link-text" : undefined}>
        <span className="font-semibold text-ink">{value}</span> on {source} ({count} reviews)
      </span>
    </>
  );
  const base = "inline-flex items-center gap-2 whitespace-nowrap";
  return asLink ? (
    <a href={homeLink("#reviews")} className={cn("link", base, className)}>
      {content}
    </a>
  ) : (
    <p className={cn(base, className)}>{content}</p>
  );
}

/**
 * Phone in the header, sized to the room there is:
 *   below 360px   icon only (the number stays for screen readers)
 *   360 to 413px  the number alone, in link blue
 *   414 to 639px  a small icon and the number
 *   640px and up  a round blue-tint icon and the number, with a label on desktop
 */
function HeaderPhone() {
  return (
    <a
      href={telHref}
      data-track="phone-click"
      data-track-location="header"
      className="group flex min-h-tap min-w-tap items-center justify-center gap-2 rounded-sm transition-opacity duration-fast ease-out active:opacity-60 sm:gap-3"
    >
      <span
        aria-hidden
        className="ring-icon hidden size-mark shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue-dark sm:flex"
      >
        <Phone className="size-5" strokeWidth={2.25} />
      </span>
      <Phone
        aria-hidden
        className="size-5 shrink-0 text-blue min-[360px]:hidden min-[414px]:block sm:hidden"
        strokeWidth={2.25}
      />
      <span className="flex flex-col leading-tight">
        <span className="hidden text-xs font-medium text-muted lg:block">
          {shared.nav.phoneLabel}
        </span>
        <span className="sr-only whitespace-nowrap font-display text-sm font-semibold text-blue lining-nums tabular-nums group-hover:text-blue-dark min-[360px]:not-sr-only min-[360px]:whitespace-nowrap sm:text-base sm:text-ink sm:group-hover:text-blue">
          {business.phone.display}
        </span>
      </span>
    </a>
  );
}

export function Header() {
  return (
    <>
      {/* Light header: frosted white, a soft shadow grows in as the page scrolls under it.
          The logo tile and the menu button sit exactly on the page gutter. */}
      <header className="site-header sticky top-0 z-header">
        <div className="shell-wide flex h-header items-center justify-between gap-3 xl:grid xl:grid-cols-[auto_1fr_auto] xl:gap-5">
          <a
            href={homeLink("#top")}
            aria-label={`${business.name}, back to top`}
            className="flex min-h-tap shrink-0 items-center rounded-sm transition-opacity duration-fast ease-out hover:opacity-80 active:opacity-60"
          >
            <Wordmark compact />
          </a>

          <div className="hidden justify-center xl:flex">
            <DesktopNav />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <HeaderPhone />
            <BookButton location="header" className="hidden sm:inline-flex" />
            <MobileNav
              actions={
                <div className="mt-4 border-t border-line pt-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <BookButton location="menu" size="lg" />
                    <CallButton location="menu" size="lg" />
                  </div>
                  <Rating className="mt-4 min-h-tap text-sm text-ink-soft" />
                </div>
              }
            />
          </div>
        </div>
      </header>
    </>
  );
}
