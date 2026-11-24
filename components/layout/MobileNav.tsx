"use client";

import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { shared } from "@/content/shared";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { homeLink } from "@/lib/format";

const hrefs = shared.nav.links.map((l) => l.href);

/**
 * Menu below the xl breakpoint. Every link is an anchor to a section of the
 * page, so choosing one (or the Book button) closes the menu. `actions` (the
 * Book and Call buttons and the rating line) is rendered on the server.
 */
export function MobileNav({ actions }: { actions: ReactNode }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(hrefs);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    // A tap or click anywhere outside the menu (and its button) closes it.
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // A link jumps within the page (or opens the booking sheet): close the menu behind it.
  const onPanelClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) setOpen(false);
  };

  return (
    <div className="xl:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="press flex size-tap items-center justify-center rounded-full border border-line bg-surface text-ink hover:bg-subtle aria-expanded:border-band aria-expanded:bg-band aria-expanded:text-on-band"
      >
        <span aria-hidden className="burger-lines">
          <span />
          <span />
        </span>
        <span className="sr-only">{open ? shared.nav.menuClose : shared.nav.menuOpen}</span>
      </button>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        onClick={onPanelClick}
        className="menu-panel on-light absolute end-0 start-0 top-full border-t border-line bg-surface shadow-lift"
      >
        <div className="shell py-4">
          <nav aria-label={shared.nav.label}>
            <ul className="grid gap-1 sm:grid-cols-2">
              {shared.nav.links.map((link) => {
                const current = active === link.href;
                return (
                  <li key={link.href}>
                    {/* Section on screen: a light fill, bolder text and a small blue dot. */}
                    <a
                      href={homeLink(link.href)}
                      aria-current={current ? "location" : undefined}
                      className="group flex min-h-tap items-center gap-3 rounded-md px-3 font-display text-lg font-semibold text-ink transition-opacity duration-fast ease-out hover:bg-subtle active:opacity-60 aria-[current]:bg-subtle aria-[current]:font-bold"
                    >
                      {current && (
                        <span aria-hidden className="size-2 shrink-0 rounded-full bg-blue" />
                      )}
                      <span className="flex-1">{link.label}</span>
                      <ChevronDown
                        aria-hidden
                        className="nudge size-5 shrink-0 text-muted"
                        strokeWidth={2.25}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          {actions}
        </div>
      </div>
    </div>
  );
}
