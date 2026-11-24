"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { shared } from "@/content/shared";
import { submitLead } from "@/lib/actions/lead";
import type { LeadField, LeadState } from "@/lib/validations/lead";
import { cn } from "@/components/ui/primitives";

const f = shared.form;
const initial: LeadState = { status: "idle" };

const inputClass =
  "mt-1 block min-h-tap w-full rounded-sm border border-field bg-surface px-4 py-3 text-base text-ink placeholder:text-muted hover:border-ink-soft aria-[invalid=true]:border-error";

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-display text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 flex items-center gap-1 text-sm font-semibold text-error">
          <CircleAlert aria-hidden className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * The booking form: name, email, phone and the problem.
 * `idPrefix` keeps field ids unique when a page shows it twice (inline and
 * in the booking sheet). Works without JavaScript as a plain form post.
 */
export function LeadForm({
  idPrefix,
  showTitle = true,
  inSheet = false,
  compact = false,
}: {
  idPrefix: string;
  showTitle?: boolean;
  /** Inside the booking sheet: leave room for its close button. */
  inSheet?: boolean;
  /**
   * Under a section heading that already says it (the closing band): on
   * phones the form's own title hides and the fields sit closer.
   */
  compact?: boolean;
}) {
  const [state, action, pending] = useActionState(submitLead, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const id = (name: string) => `${idPrefix}-${name}`;

  // After a submit, move to the result: the first field with an error, or
  // the confirmation.
  useEffect(() => {
    if (state.status === "error") {
      const target =
        formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']") ??
        formRef.current?.querySelector<HTMLElement>("[role='alert']");
      target?.scrollIntoView({ block: "center" });
      target?.focus({ preventScroll: true });
    } else if (state.status === "success") {
      successRef.current?.scrollIntoView({ block: "center" });
      successRef.current?.focus({ preventScroll: true });
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className={cn("enter rounded-lg bg-success-tint p-5 outline-none", inSheet && "mt-7")}
      >
        <CircleCheck aria-hidden className="size-7 text-success" />
        <p className="mt-3 font-display text-xl font-semibold text-ink">{f.successHeading}</p>
        <p className="mt-2 text-ink">{f.successBody}</p>
      </div>
    );
  }

  const err = state.status === "error" ? state.fieldErrors : {};
  const val = state.status === "error" ? state.values : {};
  const describedBy = (name: LeadField, hint?: boolean) =>
    [hint && !err[name] ? `${id(name)}-hint` : "", err[name] ? `${id(name)}-error` : ""]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <form
      ref={formRef}
      action={action}
      noValidate
      data-track="form-submit"
      className={cn("grid", compact ? "gap-3 sm:gap-4" : "gap-4")}
    >
      {showTitle && (
        <div className={cn(inSheet && "pe-7", compact && "hidden sm:block")}>
          <p id={id("title")} className="font-display text-xl font-bold tracking-heading text-ink">
            {f.title}
          </p>
          <p className="mt-1 text-sm text-ink-soft">{f.subtitle}</p>
        </div>
      )}

      {state.status === "error" && state.formError && (
        <p
          role="alert"
          tabIndex={-1}
          className="rounded-sm bg-error-tint p-3 text-sm font-semibold text-error outline-none"
        >
          {state.formError}
        </p>
      )}

      <Field id={id("name")} label={f.name} error={err.name}>
        <input
          id={id("name")}
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={val.name}
          aria-invalid={Boolean(err.name)}
          aria-describedby={describedBy("name")}
          className={inputClass}
        />
      </Field>

      {/* Compact (the closing band on phones): email and phone share a row to save height. */}
      <div className={cn("grid sm:grid-cols-2", compact ? "grid-cols-2 gap-3 sm:gap-4" : "gap-4")}>
        <Field id={id("email")} label={f.email} error={err.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            defaultValue={val.email}
            aria-invalid={Boolean(err.email)}
            aria-describedby={describedBy("email")}
            className={inputClass}
          />
        </Field>
        <Field id={id("phone")} label={f.phone} error={err.phone}>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            defaultValue={val.phone}
            aria-invalid={Boolean(err.phone)}
            aria-describedby={describedBy("phone")}
            className={inputClass}
          />
        </Field>
      </div>

      <Field id={id("issue")} label={f.issue} hint={f.issueHint} error={err.issue}>
        <textarea
          id={id("issue")}
          name="issue"
          rows={2}
          required
          defaultValue={val.issue}
          aria-invalid={Boolean(err.issue)}
          aria-describedby={describedBy("issue", true)}
          className={inputClass}
        />
      </Field>

      {/* Honeypot, hidden from people and assistive tech. */}
      <div aria-hidden className="hidden">
        <label htmlFor={id("company")}>Company</label>
        <input id={id("company")} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* SMS consent: optional and unticked by default. */}
      <div className="flex gap-3">
        <input
          id={id("smsConsent")}
          name="smsConsent"
          type="checkbox"
          value="yes"
          data-sms-consent
          className="mt-1 size-5 shrink-0 accent-blue"
        />
        <label htmlFor={id("smsConsent")} className="text-xs leading-snug text-muted">
          {f.smsConsent}
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="press inline-flex min-h-tap-lg items-center justify-center gap-2 rounded-full bg-red px-5 font-display text-base font-semibold text-on-color shadow-cta hover:bg-red-dark active:bg-red-dark disabled:opacity-60 sm:px-6 sm:text-lg"
      >
        {pending && <LoaderCircle aria-hidden className="size-5 animate-spin" />}
        {pending ? f.submitting : f.submit}
      </button>
      <p className="text-center text-xs text-ink-soft">{f.reassurance}</p>
    </form>
  );
}
