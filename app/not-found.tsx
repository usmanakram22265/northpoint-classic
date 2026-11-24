import type { Metadata } from "next";
import { shared } from "@/content/shared";
import { ArrowLink, CallButton } from "@/components/ui/primitives";

export const metadata: Metadata = { title: shared.notFound.title };

export default function NotFound() {
  const n = shared.notFound;
  return (
    <section className="section bg-page bg-page-glow">
      <div className="shell">
        <div className="max-w-narrow rounded-xl border border-line bg-surface p-6 shadow-card sm:p-7">
          <h1 className="text-3xl">{n.heading}</h1>
          <p className="mt-4 text-lg text-ink-soft">{n.body}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <ArrowLink href="/">{n.home}</ArrowLink>
            <CallButton location="not-found" />
          </div>
        </div>
      </div>
    </section>
  );
}
