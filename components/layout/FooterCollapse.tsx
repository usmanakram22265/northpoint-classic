"use client";

import { useEffect } from "react";

/**
 * Footer link groups ship open (so every link works with JavaScript off and
 * shows as columns on desktop). On phones and tablets they are closed after
 * load, so the footer is a short list of headings to tap open.
 */
export function FooterCollapse() {
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => {
      for (const el of document.querySelectorAll<HTMLDetailsElement>(
        "details[data-footer-group]",
      )) {
        el.open = mq.matches;
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return null;
}
