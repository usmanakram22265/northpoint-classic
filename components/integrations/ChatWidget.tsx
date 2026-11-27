"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { shared } from "@/content/shared";

/**
 * The GHL chat bubble. The loader is injected once the page is idle after
 * load (lazyOnload), so it never blocks first paint or the LCP image; Next
 * keeps it to one script tag (by its src) across client-side route changes.
 * No id: GHL copies the script's id onto its own <chat-widget> element.
 * Not on the excluded paths (the review survey).
 */
export function ChatWidget() {
  const pathname = usePathname();
  const chat = shared.ghl.chat;
  if ((chat.excludePaths as readonly string[]).includes(pathname)) return null;
  return (
    <Script
      src={chat.script}
      strategy="lazyOnload"
      data-resources-url={chat.resourcesUrl}
      data-widget-id={chat.widgetId}
    />
  );
}
