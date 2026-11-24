import type { Metadata } from "next";
import { shared } from "@/content/shared";
import { business } from "@/lib/data/business";
import { EmbedPage } from "@/components/sections/FormPage";

export const metadata: Metadata = {
  title: `${shared.pages.marketing.title} | ${business.name}`,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <EmbedPage page="marketing" />;
}
