import Link from "next/link";

/**
 * Wordmark stand-in. The official VPD logo file was not accessible during the build —
 * drop it into /public/images/brand/ and swap this component's contents; do not redraw it.
 */
export default function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Link href="/" aria-label="VPD Technologies — home" className="flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center border border-gold text-sm font-bold tracking-wider text-gold">VPD</span>
      <span className={`hidden text-sm font-semibold tracking-[0.18em] uppercase sm:block ${tone === "light" ? "text-white" : "text-ink"}`}>
        Technologies
      </span>
    </Link>
  );
}
