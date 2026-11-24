import { CalendarCheck, Phone } from "lucide-react";
import { shared } from "@/content/shared";
import { homeLink, telHref } from "@/lib/format";

/**
 * Fixed bar on phones and small tablets: book first (red fill), call second
 * (white outline, as blue fails on the dark band). Plain links, so it works without JavaScript. Where the browser
 * supports it, the bar slides in as the hero's own buttons scroll away
 * (`.mobile-bar` in globals.css); elsewhere it is simply always there.
 */
export function MobileBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="mobile-bar on-dark fixed bottom-0 end-0 start-0 z-bar bg-band pb-[env(safe-area-inset-bottom)] shadow-bar lg:hidden"
    >
      <div className="flex h-bar items-center gap-2 px-3">
        <a
          href={homeLink("#book")}
          data-booking
          data-track="booking-click"
          data-track-location="mobile-bar"
          className="press flex min-h-tap grow-[2] items-center justify-center gap-2 rounded-full bg-red px-4 font-display text-base font-semibold text-on-color shadow-cta hover:bg-red-dark active:bg-red-dark"
        >
          <CalendarCheck aria-hidden className="size-5 shrink-0" strokeWidth={2.25} />
          <span>{shared.cta.book}</span>
        </a>
        <a
          href={telHref}
          data-track="phone-click"
          data-track-location="mobile-bar"
          className="press flex min-h-tap grow items-center justify-center gap-2 rounded-full border border-on-band-soft px-4 font-display text-base font-semibold text-on-band hover:bg-band-raised active:bg-band-raised"
        >
          <Phone aria-hidden className="size-5 shrink-0" strokeWidth={2.25} />
          <span>{shared.cta.callShort}</span>
        </a>
      </div>
    </nav>
  );
}
