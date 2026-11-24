/**
 * INTEGRATION SLOTS. Each renders nothing until a provider is chosen.
 * Search the codebase for "INTEGRATION SLOT" to find every one.
 */

/**
 * INTEGRATION SLOT: analytics and call tracking. Rendered once in
 * app/layout.tsx. Tracked elements carry data-track=
 * "booking-click" | "phone-click" | "form-submit" and data-track-location.
 */
export function Analytics() {
  return null;
}

/** INTEGRATION SLOT: chat widget. Rendered once in app/layout.tsx. */
export function ChatSlot() {
  return null;
}
