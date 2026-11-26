import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function Eyebrow({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "dark" | "mute" }) {
  const color = tone === "gold" ? "text-gold" : tone === "dark" ? "text-gold-deep" : "text-mute";
  return (
    <p className={`label ${color} flex items-center gap-3`}>
      <span className="inline-block h-px w-8 bg-current" aria-hidden />
      {children}
    </p>
  );
}

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "gold" | "ghost" | "dark" | "ghost-dark";
  external?: boolean;
  className?: string;
}

const styles = {
  gold: "bg-gold text-ink hover:bg-white",
  ghost: "border border-white/30 text-white hover:border-gold hover:text-gold",
  dark: "bg-ink text-white hover:bg-gold hover:text-ink",
  "ghost-dark": "border border-ink/25 text-ink hover:border-gold-deep hover:text-gold-deep",
};

export function ButtonLink({ href, children, variant = "gold", external, className = "" }: ButtonProps) {
  const cls = `group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-colors duration-300 ${styles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function TextLink({ href, children, light }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-semibold ${light ? "text-white" : "text-ink"} hover:text-gold transition-colors`}
    >
      <span className="border-b border-current pb-0.5">{children}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
    </Link>
  );
}

export const wrap = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14";
