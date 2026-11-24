"use client";

import { shared } from "@/content/shared";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { homeLink } from "@/lib/format";

const hrefs = shared.nav.links.map((l) => l.href);

/**
 * Desktop links (xl and up), each an anchor to a section of the page. The
 * section on screen is marked aria-current="location" and keeps the blue
 * underline that hover draws.
 */
export function DesktopNav() {
  const active = useActiveSection(hrefs);
  return (
    <nav aria-label={shared.nav.label} className="hidden xl:block">
      <ul className="flex items-center">
        {shared.nav.links.map((link) => (
          <li key={link.href}>
            <a
              href={homeLink(link.href)}
              aria-current={active === link.href ? "location" : undefined}
              className="nav-link flex min-h-tap items-center whitespace-nowrap rounded-sm px-3 font-display text-sm font-medium text-ink-soft hover:text-ink active:opacity-60 aria-[current]:font-semibold aria-[current]:text-ink"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
