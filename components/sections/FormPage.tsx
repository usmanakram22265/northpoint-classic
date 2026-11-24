import type { ReactNode } from "react";
import { shared } from "@/content/shared";
import { business } from "@/lib/data/business";
import { telHref } from "@/lib/format";
import { GhlEmbed, GhlScript, type EmbedKey } from "@/components/integrations/GhlEmbed";

/**
 * The standalone form pages: one centred column with the H1 and its line
 * above one white card. The card holds the GHL embed (or, on the thank-you
 * page, the message).
 */
function FormPageShell({
  title,
  line,
  children,
}: {
  title: string;
  line?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby="page-heading" className="section bg-page">
      <div className="shell">
        <div className="mx-auto max-w-embed">
          <h1 id="page-heading" className="text-center text-3xl">
            {title}
          </h1>
          {line && <p className="mt-3 text-center text-lg text-ink-soft">{line}</p>}
          <div className="mt-6 rounded-lg bg-surface p-6 shadow-card">{children}</div>
        </div>
      </div>
    </section>
  );
}

type EmbedPageKey = "contact" | "discount" | "review" | "marketing";

/** A form page: the embed in the card, and GHL's script once. */
export function EmbedPage({ page }: { page: EmbedPageKey }) {
  const p = shared.pages[page];
  return (
    <FormPageShell title={p.title} line={p.line}>
      <GhlEmbed embed={p.embed as EmbedKey} />
      <GhlScript />
    </FormPageShell>
  );
}

/** The thank-you page: no embed; `{phone}` in the copy becomes a tel: link. */
export function ThankYouPage() {
  const p = shared.pages.thankYou;
  const [before, after] = p.body.split("{phone}");
  return (
    <FormPageShell title={p.title}>
      <p className="text-center text-lg text-ink-soft">
        {before}
        <a
          href={telHref}
          data-track="phone-click"
          data-track-location="thank-you"
          className="link font-semibold text-blue lining-nums"
        >
          <span className="link-text">{business.phone.display}</span>
        </a>
        {after}
      </p>
    </FormPageShell>
  );
}
