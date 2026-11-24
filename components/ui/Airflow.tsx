import type { CSSProperties } from "react";
import { cn } from "@/components/ui/primitives";

const lines = [
  { d: "M-90 70 C 140 10, 320 130, 540 70 S 900 10, 1290 80", width: 2, slow: false },
  { d: "M-90 140 C 180 80, 360 200, 580 140 S 920 70, 1290 150", width: 1.5, slow: true },
  { d: "M-90 210 C 140 160, 340 270, 620 205 S 960 150, 1290 220", width: 1, slow: false },
  { d: "M-90 270 C 200 230, 420 310, 660 265 S 1000 230, 1290 280", width: 1, slow: true },
];

/**
 * The signature motif: thin airflow lines, like a breeze crossing the page.
 * Decorative only. Each line sways slowly at its own pace; under reduced
 * motion they sit still. The parent must be `relative isolate overflow-hidden`.
 */
export function Airflow({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 320"
      preserveAspectRatio="none"
      fill="none"
      className={cn(
        "pointer-events-none absolute start-0 end-0 -z-1 h-9 w-full",
        onDark ? "text-blue-tint opacity-20" : "text-blue opacity-20",
        className,
      )}
    >
      {lines.map((line, i) => (
        <path
          key={line.d}
          d={line.d}
          stroke="currentColor"
          strokeWidth={line.width}
          vectorEffect="non-scaling-stroke"
          className={cn("drift", line.slow && "drift-slow")}
          style={{ "--i": i } as CSSProperties}
        />
      ))}
    </svg>
  );
}
