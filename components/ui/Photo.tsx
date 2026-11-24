import { existsSync } from "node:fs";
import path from "node:path";
import Image, { getImageProps } from "next/image";
import { preload } from "react-dom";
import type { ImageKey } from "@/lib/data/business";
import { getImage } from "@/lib/format";
import { cn } from "@/components/ui/primitives";

/** Every photo is served at this quality (must be in `images.qualities` in next.config.ts). */
export const PHOTO_QUALITY = 85;

/** Size of the 3:4 phone crops that scripts/process-images.mjs writes to public/images/phone/. */
const PHONE = { width: 1152, height: 1536 } as const;
/** Portrait screens: a cover photo is about as wide as 75% of the screen height. */
const PHONE_SIZES = "75vh";

function fileExists(src: string): boolean {
  return existsSync(path.join(process.cwd(), "public", src));
}

/**
 * A photo that covers its box (heroes, photo bands). On portrait screens it
 * serves the 3:4 phone crop, because a phone only shows a narrow slice of a
 * wide photo and the full file would either be blurry or very heavy. On
 * landscape screens it serves the full photo. `sizes` must describe the
 * drawn width on landscape screens. The parent sets the size.
 */
export function CoverPhoto({
  image,
  alt = "",
  sizes,
  eager = false,
  className,
}: {
  image: ImageKey;
  alt?: string;
  sizes: string;
  eager?: boolean;
  className?: string;
}) {
  const img = getImage(image);
  if (!fileExists(img.src)) return null;
  const common = { alt, quality: PHOTO_QUALITY };
  const wide = getImageProps({ ...common, src: img.src, width: img.width, height: img.height, sizes }).props;
  const cropSrc = img.src.replace("/images/", "/images/phone/");
  const tall = fileExists(cropSrc)
    ? getImageProps({ ...common, src: cropSrc, width: PHONE.width, height: PHONE.height, sizes: PHONE_SIZES }).props
    : null;

  if (eager) {
    // Above the fold: fetch the right file for this screen before the page paints.
    preload(wide.src, {
      as: "image",
      imageSrcSet: wide.srcSet,
      imageSizes: wide.sizes,
      fetchPriority: "high",
      ...(tall ? { media: "(orientation: landscape)" } : {}),
    });
    if (tall) {
      preload(tall.src, {
        as: "image",
        imageSrcSet: tall.srcSet,
        imageSizes: tall.sizes,
        fetchPriority: "high",
        media: "(orientation: portrait)",
      });
    }
  }

  return (
    <picture className="contents">
      {tall && <source media="(orientation: portrait)" srcSet={tall.srcSet} sizes={tall.sizes} />}
      {/* Art-directed <picture> built with getImageProps (next/image has no <picture> support). */}
      <img
        {...wide}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className={className}
      />
    </picture>
  );
}

const ratios = {
  hero: "aspect-[16/9]",
  wide: "aspect-[3/2]",
  inline: "aspect-[4/3]",
  square: "aspect-square",
  tall: "aspect-[4/5]",
  /** Fills its parent, which sets the size. */
  fill: "h-full w-full",
} as const;

type Props = {
  image: ImageKey;
  ratio: keyof typeof ratios;
  sizes: string;
  /** Above-the-fold hero only: preloaded. */
  eager?: boolean;
  /**
   * How the photo moves: "settle" eases into place as its block reveals and
   * leans in on hover; "parallax" drifts slower than the page while it
   * crosses the screen.
   */
  motion?: "settle" | "parallax";
  /** Bottom gradient strength. "full" when text sits on the photo. */
  scrim?: "soft" | "full";
  className?: string;
};

/**
 * Framed photo. Every photo gets the same treatment: a blue multiply tint and
 * a bottom gradient. A missing file leaves the tinted frame empty.
 */
export function Photo({ image, ratio, sizes, eager = false, motion, scrim = "soft", className }: Props) {
  const img = getImage(image);
  return (
    // `clip`, not `overflow-hidden`: a hidden box would capture the parallax scroll timeline.
    <div className={cn("clip relative rounded-lg bg-subtle", ratios[ratio], className)}>
      {fileExists(img.src) && (
        <>
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            sizes={sizes}
            quality={PHOTO_QUALITY}
            {...(eager ? { preload: true } : { loading: "lazy" as const })}
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              motion === "settle" && "zoomable",
              motion === "parallax" && "parallax",
            )}
          />
          <span aria-hidden className="pointer-events-none absolute inset-0 bg-photo-tint mix-blend-multiply" />
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 bg-photo-scrim",
              scrim === "soft" && "opacity-40",
            )}
          />
        </>
      )}
    </div>
  );
}

const washes = {
  /** Phones: even; desktop: dark on the start side where the text sits. */
  side: "bg-even-wash lg:bg-hero-scrim",
  /** Dark all over. */
  even: "bg-even-wash",
  /** Phones: even; desktop: dark under a wide text column, clear over the subject. */
  band: "band-scrim",
} as const;

/**
 * Photo used as a section background, under a dark wash so text stays
 * readable. The parent must be `relative isolate clip` (not
 * overflow-hidden, which would freeze the parallax).
 */
export function PhotoBackdrop({
  image,
  eager = false,
  wash = "side",
  deep = false,
  className,
}: {
  image: ImageKey;
  eager?: boolean;
  /** E.g. `hidden sm:block` to drop the photo on phones (a lazy image under display:none never loads). */
  className?: string;
  /**
   * Deep parallax: the photo sits on a layer taller than the band and
   * clearly moves slower than the page.
   */
  deep?: boolean;
  wash?: keyof typeof washes;
}) {
  const photo = (
    <CoverPhoto
      image={image}
      sizes="100vw"
      eager={eager}
      className={cn("h-full w-full object-cover", !deep && "parallax")}
    />
  );
  return (
    <div aria-hidden className={cn("clip absolute inset-0 -z-1 bg-band", className)}>
      {deep ? <div className="parallax parallax-deep">{photo}</div> : photo}
      <span className="absolute inset-0 bg-photo-tint mix-blend-multiply" />
      <span className={cn("absolute inset-0", washes[wash])} />
    </div>
  );
}
