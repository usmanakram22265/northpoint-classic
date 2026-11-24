import { ChevronDown } from "lucide-react";
import { shared } from "@/content/shared";
import { business } from "@/lib/data/business";
import { fullAddress, homeLink, licenseLine, mailHref } from "@/lib/format";
import { Wordmark } from "@/components/ui/brand";
import { BookButton, PhoneLink } from "@/components/ui/primitives";
import { FooterCollapse } from "@/components/layout/FooterCollapse";

const linkClass =
  "link inline-flex min-h-tap min-w-tap items-center py-1 text-sm text-on-band-soft hover:text-on-band lg:min-h-0 lg:py-2";

type Item = { label: string; href?: string };

/**
 * One group. Phones: a heading row that opens the list (closed after load
 * by FooterCollapse). Desktop: always open, a plain column. Items with an
 * href are in-page links; the rest are plain text.
 */
function Column({ heading, items }: { heading: string; items: Item[] }) {
  return (
    <details data-footer-group open className="group border-b border-on-band-line lg:border-0">
      <summary className="flex min-h-tap list-none items-center justify-between lg:pointer-events-none lg:min-h-0">
        <h2 className="label text-on-band">{heading}</h2>
        <ChevronDown
          aria-hidden
          className="size-5 shrink-0 text-on-band-soft transition-transform duration-base ease-spring group-open:rotate-180 lg:hidden"
        />
      </summary>
      <ul className="grid grid-cols-2 gap-x-4 pb-3 lg:mt-3 lg:block lg:pb-0">
        {items.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <a href={homeLink(item.href)} className={linkClass}>
                <span className="link-text">{item.label}</span>
              </a>
            ) : (
              <span className="block py-2 text-sm text-on-band-soft">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </details>
  );
}

export function Footer() {
  const f = shared.footer;
  const year = 2026;
  return (
    <footer className="on-dark border-t border-on-band-line bg-band pb-bar lg:border-0 lg:pb-0">
      <FooterCollapse />
      <div className="shell grid gap-6 py-7 lg:grid-cols-[1.5fr_1fr_1.3fr_1fr] lg:gap-7 lg:py-8">
        {/* Name, address and phone exactly as on the business profile. */}
        <div className="text-sm">
          <a
            href={homeLink("#top")}
            aria-label={`${business.name}, back to top`}
            className="inline-flex min-h-tap items-center rounded-sm transition-opacity duration-fast ease-out hover:opacity-80 active:opacity-60"
          >
            <Wordmark onDark />
          </a>
          <p className="mt-4 text-on-band-soft">{business.tagline}.</p>
          <address className="mt-3 not-italic leading-body">
            <span className="block font-semibold text-on-band">{business.name}</span>
            <span className="block">{fullAddress}</span>
          </address>
          <div className="mt-1 flex flex-wrap items-center gap-x-5 lg:block">
            <PhoneLink location="footer" onDark className="text-lg" />
            <a href={mailHref} className={`${linkClass} lg:flex`}>
              <span className="link-text">{business.email}</span>
            </a>
          </div>
          <BookButton location="footer" className="mt-4 hidden lg:inline-flex" />
        </div>

        <div className="border-t border-on-band-line lg:contents">
          <Column
            heading={f.pageHeading}
            items={[...shared.nav.links, { label: shared.cta.book, href: "#book" }]}
          />
          <Column
            heading={f.servicesHeading}
            items={business.services.map((s) => ({ label: s.name }))}
          />
          <div className="py-4 text-sm lg:py-0">
            <h2 className="label text-on-band">{f.hoursHeading}</h2>
            <ul className="mt-2 leading-body lg:mt-3">
              {business.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4 whitespace-nowrap py-1">
                  <span>{h.short}</span>
                  <span className="text-on-band">{h.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-1 text-xs">{business.timezoneLabel}</p>
            <p className="mt-3 font-semibold text-on-band">{business.emergency.label}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-on-band-line">
        <div className="shell flex flex-col gap-1 py-4 text-xs lg:flex-row lg:items-center lg:justify-between lg:gap-3 lg:py-5">
          {licenseLine && <p className="font-semibold text-on-band">{licenseLine}</p>}
          <p>
            &copy; {year} {f.copyright}
          </p>
          {business.demo && <p data-demo-notice>{f.demoNotice}</p>}
        </div>
      </div>
    </footer>
  );
}
