/**
 * A slow strip of place names. The first track is real text for readers and
 * search engines; the second is an identical copy that only exists so the
 * loop has no gap, so it is hidden from assistive tech and inert. Hover or a
 * finger held on it stops it; reduced motion turns it into a still, wrapped
 * list.
 */
export function Marquee({ label, items }: { label: string; items: readonly string[] }) {
  const track = (hidden: boolean) => (
    <ul className="marquee-track" aria-hidden={hidden || undefined} inert={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="marquee-word">
          {item}
        </li>
      ))}
    </ul>
  );
  return (
    <div role="group" aria-label={label} className="marquee fade-edges">
      {track(false)}
      {track(true)}
    </div>
  );
}
