import { Mona_Sans, Public_Sans } from "next/font/google";

/**
 * The only design value outside styles/tokens.css: next/font must load font
 * files from JavaScript. Self-hosted at build time.
 *
 * Display: Mona Sans, set wide and heavy for headlines, buttons and labels
 * (its width axis keeps the broad, van-lettering look of the original
 * design). Reading: Public Sans, a plain, sturdy sans with open shapes that
 * stays clear at small sizes on a phone.
 */
export const mona = Mona_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-mona",
  display: "swap",
});

export const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public",
  display: "swap",
});
