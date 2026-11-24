"use client";

import { useEffect, useState } from "react";

/**
 * Which in-page section is on screen, for the nav's current-item styling.
 * Takes hrefs like "#services" and returns the one whose section crosses a
 * line a little below the sticky header, or null above the first section.
 */
export function useActiveSection(hrefs: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = hrefs
      .map((href) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= line) current = `#${el.id}`;
      }
      // Past the end of the last section (the booking band and footer): nothing is current.
      const last = sections[sections.length - 1];
      if (last.getBoundingClientRect().bottom < line) current = null;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [hrefs]);

  return active;
}
