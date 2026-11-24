import {
  business,
  images,
  type ImageKey,
  type Review,
  type Service,
  type ServiceSlug,
} from "@/lib/data/business";

/** An in-page section of the home page, from any route: "#faq" becomes "/#faq". */
export const homeLink = (hash: string) => `/${hash}`;

export const telHref = `tel:${business.phone.e164}`;
export const mailHref = `mailto:${business.email}`;

/** Street, city, state and ZIP on one line. */
export const fullAddress = `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}`;

/** "Mon to Fri 7am to 7pm, Sat 8am to 4pm" (open days only) */
export const hoursSummary = business.hours
  .filter((h) => h.open)
  .map((h) => `${h.short} ${h.label}`)
  .join(", ");

/** "Monday to Friday 7am to 7pm and Saturday 8am to 4pm" */
export const hoursSentence = business.hours
  .filter((h) => h.open)
  .map((h) => `${h.days} ${h.label}`)
  .join(" and ");

export function getService(slug: ServiceSlug): Service {
  const found = business.services.find((s) => s.slug === slug);
  if (!found) throw new Error(`Unknown service: ${slug}`);
  return found;
}

export function getReview(id: number): Review {
  const found = business.reviews.find((r) => r.id === id);
  if (!found) throw new Error(`Unknown review: ${id}`);
  return found;
}

export function getImage(key: ImageKey) {
  return images[key];
}

/** "Katy, Sugar Land, Cypress, Pearland and The Woodlands" */
export function listWithAnd(items: readonly string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** Towns around the city, as one phrase. */
export const townNames = listWithAnd(business.serviceArea.towns);

/** The license number is blank until the client supplies it; every license line hides while it is. */
export const hasLicense = business.license.number.trim().length > 0;

/** "License 12345", or null while the number is blank. */
export const licenseLine = hasLicense
  ? `${business.license.label} ${business.license.number}`
  : null;
