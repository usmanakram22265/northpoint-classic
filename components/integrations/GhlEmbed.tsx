import Script from "next/script";
import { shared } from "@/content/shared";
import { cn } from "@/components/ui/primitives";

export type EmbedKey = keyof typeof shared.ghl.embeds;

/**
 * A GoHighLevel form or survey, inline. The iframe carries the whole form:
 * its title, fields, consent and submit button all come from GHL.
 */
export function GhlEmbed({ embed, className }: { embed: EmbedKey; className?: string }) {
  const e = shared.ghl.embeds[embed];
  const base = e.kind === "survey" ? shared.ghl.surveyUrl : shared.ghl.formUrl;
  return (
    <iframe
      src={`${base}${e.id}`}
      id={`inline-${e.id}`}
      data-layout="{'id':'INLINE'}"
      data-trigger-type="alwaysShow"
      data-activation-type="alwaysActivated"
      data-deactivation-type="neverDeactivate"
      data-form-id={e.id}
      data-layout-iframe-id={`inline-${e.id}`}
      data-height={e.height}
      title={e.name}
      className={cn("block", className)}
      style={{ inlineSize: "100%", blockSize: `${e.height}px`, border: 0 }}
    />
  );
}

/** GHL's embed script (sizes the iframes). Render it once per page that has an embed. */
export function GhlScript() {
  return <Script id="ghl-form-embed" src={shared.ghl.script} strategy="afterInteractive" />;
}
