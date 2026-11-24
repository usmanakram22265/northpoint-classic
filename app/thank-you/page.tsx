import type { Metadata } from "next";
import { shared } from "@/content/shared";
import { business } from "@/lib/data/business";
import { ThankYouPage } from "@/components/sections/FormPage";

export const metadata: Metadata = {
  title: `${shared.pages.thankYou.title} | ${business.name}`,
  robots: { index: false },
};

export default function Page() {
  return <ThankYouPage />;
}
