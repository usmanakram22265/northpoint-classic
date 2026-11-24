"use client";

import { useEffect } from "react";
import { shared } from "@/content/shared";
import { CallButton } from "@/components/ui/primitives";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const e = shared.error;
  return (
    <section className="section bg-page bg-page-glow">
      <div className="shell">
        <div className="max-w-narrow rounded-xl border border-line bg-surface p-6 shadow-card sm:p-7">
          <h1 className="text-3xl">{e.heading}</h1>
          <p className="mt-4 text-lg text-ink-soft">{e.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => retry()}
              className="press inline-flex min-h-tap items-center justify-center rounded-full bg-red px-5 font-display font-semibold text-on-color shadow-cta hover:bg-red-dark active:bg-red-dark"
            >
              {e.retry}
            </button>
            <CallButton location="error" />
          </div>
        </div>
      </div>
    </section>
  );
}
