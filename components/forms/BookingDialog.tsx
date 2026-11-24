"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { shared } from "@/content/shared";
import { LeadForm } from "@/components/forms/LeadForm";

/** True when at least half of the element is inside the viewport. */
function mostlyOnScreen(el: Element): boolean {
  const r = el.getBoundingClientRect();
  if (r.height === 0) return false;
  const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
  return visible / Math.min(r.height, window.innerHeight) >= 0.5;
}

/**
 * The booking sheet. Rendered once in the layout and opened by any element
 * with a `data-booking` attribute.
 *
 * Those elements are real links to #book (the form in the closing band), so
 * with JavaScript off they simply jump to it. A native <dialog> gives focus
 * trapping, Escape to close and focus return without extra code.
 *
 * Exception: when a booking form is already on screen (the hero form on
 * desktop, or the closing band's form), no sheet opens; the first field of
 * that form gets focus instead.
 */
export function BookingDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  // A fresh form each time the sheet opens.
  const [session, setSession] = useState(0);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const trigger = (e.target as Element | null)?.closest<HTMLElement>("[data-booking]");
      if (!trigger) return;

      const inline = Array.from(document.querySelectorAll<HTMLElement>("[data-inline-form]")).find(
        (el) => el.offsetParent !== null && mostlyOnScreen(el),
      );
      if (inline) {
        e.preventDefault();
        inline.querySelector<HTMLInputElement>("input:not([type=hidden]):not([tabindex='-1'])")?.focus();
        return;
      }

      const dialog = ref.current;
      if (!dialog || typeof dialog.showModal !== "function") return;
      e.preventDefault();
      setSession((n) => n + 1);
      if (!dialog.open) dialog.showModal();
    };
    // Capture phase, so this runs before the link's own jump.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <dialog
      ref={ref}
      id="booking-dialog"
      className="sheet"
      aria-labelledby="dlg-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <div className="sheet-panel relative rounded-ss-xl rounded-se-xl bg-surface p-5 shadow-form sm:rounded-xl sm:p-6">
        <span aria-hidden className="mx-auto mb-3 block h-1 w-7 rounded-full bg-line sm:hidden" />
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="press absolute end-3 top-3 flex size-tap items-center justify-center rounded-full text-ink hover:bg-subtle active:bg-subtle"
        >
          <X aria-hidden className="size-6" />
          <span className="sr-only">{shared.form.close}</span>
        </button>
        <LeadForm key={session} idPrefix="dlg" inSheet />
      </div>
    </dialog>
  );
}
