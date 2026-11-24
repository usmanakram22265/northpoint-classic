import type { Config } from "tailwindcss";

/**
 * No design values here: every entry maps a Tailwind name to a CSS variable
 * from styles/tokens.css. Colours, spacing and the other scales REPLACE
 * Tailwind's defaults, so only the names below exist.
 *
 * Colour keys are role names:
 *   page / surface / subtle     page background, cards and forms, alternate sections
 *   line / field                hairlines, form field borders
 *   ink / ink-soft / muted      text primary, secondary, captions
 *   blue / blue-dark / blue-tint, red / red-dark / red-tint
 *   band / on-band / on-band-soft / on-band-line   the dark band and its text
 *   on-color                    text on a blue or red fill
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  // `hover:` styles only on devices with a real hover (mouse or trackpad), so a
  // tap on a phone never leaves a control stuck in its hover state.
  future: { hoverOnlyWhenSupported: true },
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      page: "var(--color-bg)",
      surface: "var(--color-surface)",
      subtle: "var(--color-surface-subtle)",
      line: "var(--color-border)",
      field: "var(--color-field)",
      ink: "var(--color-text)",
      "ink-soft": "var(--color-text-secondary)",
      muted: "var(--color-text-muted)",
      blue: "var(--color-blue)",
      "blue-dark": "var(--color-blue-dark)",
      "blue-tint": "var(--color-blue-tint)",
      red: "var(--color-red)",
      "red-dark": "var(--color-red-dark)",
      "red-tint": "var(--color-red-tint)",
      band: "var(--color-band)",
      "band-raised": "var(--color-band-raised)",
      "on-band": "var(--color-on-band)",
      "on-band-soft": "var(--color-on-band-secondary)",
      "on-band-line": "var(--color-on-band-line)",
      "on-color": "var(--color-on-band)",
      success: "var(--color-success)",
      "success-tint": "var(--color-success-tint)",
      error: "var(--color-error)",
      "error-tint": "var(--color-error-tint)",
      "photo-tint": "var(--color-photo-tint)",
      backdrop: "var(--color-backdrop)",
    },
    spacing: {
      0: "0",
      px: "1px",
      1: "var(--space-1)",
      2: "var(--space-2)",
      3: "var(--space-3)",
      4: "var(--space-4)",
      5: "var(--space-5)",
      6: "var(--space-6)",
      7: "var(--space-7)",
      8: "var(--space-8)",
      9: "var(--space-9)",
      gutter: "var(--space-gutter)",
      section: "var(--space-section)",
      "section-tight": "var(--space-section-tight)",
      tap: "var(--size-tap)",
      "tap-lg": "var(--size-tap-lg)",
      bar: "var(--size-bar)",
      header: "var(--size-header)",
      mark: "var(--size-mark)",
      "mark-sm": "var(--size-mark-sm)",
    },
    fontFamily: {
      display: "var(--font-ui)",
      sans: "var(--font-body)",
    },
    fontSize: {
      xs: ["var(--text-xs)", { lineHeight: "var(--leading-snug)" }],
      sm: ["var(--text-sm)", { lineHeight: "var(--leading-snug)" }],
      base: ["var(--text-base)", { lineHeight: "var(--leading-body)" }],
      lg: ["var(--text-lg)", { lineHeight: "var(--leading-snug)" }],
      xl: ["var(--text-xl)", { lineHeight: "var(--leading-heading)" }],
      "2xl": ["var(--text-2xl)", { lineHeight: "var(--leading-heading)" }],
      "3xl": ["var(--text-3xl)", { lineHeight: "var(--leading-display)" }],
      "4xl": ["var(--text-4xl)", { lineHeight: "var(--leading-display)" }],
      stat: ["var(--text-stat)", { lineHeight: "1" }],
      phone: ["var(--text-phone)", { lineHeight: "1" }],
    },
    fontWeight: {
      normal: "var(--weight-regular)",
      medium: "var(--weight-medium)",
      semibold: "var(--weight-semibold)",
      bold: "var(--weight-bold)",
      black: "var(--weight-black)",
    },
    letterSpacing: {
      normal: "0",
      display: "var(--tracking-display)",
      heading: "var(--tracking-heading)",
      label: "var(--tracking-label)",
    },
    lineHeight: {
      none: "1",
      display: "var(--leading-display)",
      heading: "var(--leading-heading)",
      snug: "var(--leading-snug)",
      body: "var(--leading-body)",
    },
    borderRadius: {
      none: "0",
      sm: "var(--radius-sm)",
      md: "var(--radius-md)",
      lg: "var(--radius-lg)",
      xl: "var(--radius-xl)",
      full: "9999px",
    },
    boxShadow: {
      none: "none",
      card: "var(--shadow-card)",
      lift: "var(--shadow-lift)",
      form: "var(--shadow-form)",
      bar: "var(--shadow-bar)",
      header: "var(--shadow-header)",
      mark: "var(--shadow-mark)",
      cta: "var(--shadow-cta)",
      node: "var(--shadow-node)",
      float: "var(--shadow-float)",
    },
    maxWidth: {
      none: "none",
      full: "100%",
      page: "var(--width-page)",
      narrow: "var(--width-narrow)",
      measure: "var(--width-measure)",
      form: "var(--width-form)",
      embed: "var(--width-embed)",
    },
    zIndex: {
      0: "0",
      1: "1",
      2: "2",
      header: "var(--z-header)",
      bar: "var(--z-bar)",
      skip: "var(--z-skip)",
    },
    transitionTimingFunction: {
      spring: "var(--ease-spring)",
      out: "var(--ease-out)",
      in: "var(--ease-in)",
    },
    transitionDuration: {
      fast: "var(--dur-fast)",
      base: "var(--dur-base)",
      enter: "var(--dur-enter)",
    },
    extend: {
      backgroundImage: {
        "page-glow": "var(--gradient-glow)",
        "band-glow": "var(--gradient-band)",
        "blue-glow": "var(--gradient-blue)",
        "photo-scrim": "var(--gradient-photo)",
        "hero-scrim": "var(--gradient-hero-scrim)",
        "even-wash": "var(--gradient-even-wash)",
        "reviews-glow": "var(--gradient-reviews)",
        "cool-field": "var(--gradient-cool)",
        "card-band": "var(--gradient-card-band)",
        "faq-glow": "var(--gradient-faq)",
      },
    },
  },
  plugins: [],
};

export default config;
