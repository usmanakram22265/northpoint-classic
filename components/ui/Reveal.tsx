"use client";

import { useEffect } from "react";

/**
 * Drives every `data-reveal` element from one IntersectionObserver.
 * Content ships visible in the server HTML; the hiding class is added only
 * after mount, anything on screen is shown in the same frame, and the
 * failsafe reveals only on-screen items. Reduced motion skips it all.
 */
export function RevealProvider() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;

    const showIfVisible = (el: Element) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        el.classList.add("is-in");
        return true;
      }
      return false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const register = () => {
      for (const el of document.querySelectorAll("[data-reveal]:not(.is-in)")) {
        if (!showIfVisible(el)) observer.observe(el);
      }
    };

    register();
    root.classList.add("reveal-on");

    const mutation = new MutationObserver(register);
    mutation.observe(document.body, { childList: true, subtree: true });

    const failsafe = window.setTimeout(() => {
      for (const el of document.querySelectorAll("[data-reveal]:not(.is-in)")) showIfVisible(el);
    }, 2500);

    return () => {
      observer.disconnect();
      mutation.disconnect();
      window.clearTimeout(failsafe);
      root.classList.remove("reveal-on");
    };
  }, []);

  return null;
}
