"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";
import Photo from "@/components/shared/Photo";
import Reveal, { ImageReveal } from "@/components/shared/Reveal";
import { wrap } from "@/components/shared/ui";
import { img, type ImageName } from "@/lib/images";

interface Props {
  service: Service;
  index: number;
  variant: "overlay" | "split-light" | "split-dark" | "overlay-right";
  flip?: boolean;
}

export default function ServiceShowcase({ service: s, index, variant, flip }: Props) {
  const num = String(index + 1).padStart(2, "0");
  const href = `/services/${s.slug}`;

  if (variant === "overlay" || variant === "overlay-right") {
    const right = variant === "overlay-right";
    return (
      <section className="bg-ink">
        <Link href={href} className="group relative block min-h-[78svh] overflow-hidden" aria-label={`${s.title} — view details`}>
          <Photo
            src={img(s.image as ImageName, 2200, 78)}
            alt={`${s.title} — illustrative photo`}
            sizes="100vw"
            className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20 ${right ? "bg-gradient-to-l" : ""}`} />
          <div className={`${wrap} relative flex min-h-[78svh] flex-col justify-end pb-14 pt-32 ${right ? "items-end text-right" : ""}`}>
            <span className="label text-gold">{num} · {s.kicker}</span>
            <h2 className="display mt-4 max-w-4xl text-4xl text-white sm:text-6xl lg:text-8xl">{s.title}</h2>
            <p className="mt-5 max-w-lg text-lg text-white/80">{s.summary}</p>

            {/* Capabilities: always visible on touch / small screens, revealed on hover for large screens */}
            <ul className={`mt-6 flex flex-wrap gap-2 transition-all duration-500 lg:max-h-0 lg:translate-y-4 lg:opacity-0 lg:group-hover:max-h-40 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-40 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100 ${right ? "justify-end" : ""}`}>
              {s.capabilities.map((c) => (
                <li key={c} className="glass-surface px-3 py-1.5 text-xs text-white">{c}</li>
              ))}
            </ul>

            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold">
              View details
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5" aria-hidden />
            </span>
          </div>
        </Link>
      </section>
    );
  }

  const dark = variant === "split-dark";
  return (
    <section className={dark ? "bg-charcoal text-white" : "bg-white text-ink"}>
      <div className={`${wrap} grid items-center gap-10 py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:py-28`}>
        <Link href={href} className={`group block ${flip ? "lg:order-2" : ""}`} aria-label={`${s.title} — view details`}>
          <ImageReveal className="relative aspect-[5/4] overflow-hidden">
            <Photo
              src={img(s.image as ImageName, 1600, 78)}
              alt={`${s.title} — illustrative photo`}
              sizes="(min-width:1024px) 55vw, 100vw"
              className="transition-transform duration-[1200ms] group-hover:scale-105"
            />
            <span className="glass-surface-deep label absolute left-5 top-5 px-3 py-1.5 text-gold">{num}</span>
          </ImageReveal>
        </Link>
        <Reveal className={flip ? "lg:order-1" : ""}>
          <p className={`label ${dark ? "text-gold" : "text-gold-deep"}`}>{s.kicker}</p>
          <h2 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">{s.title}</h2>
          <p className={`mt-5 max-w-md text-lg ${dark ? "text-white/75" : "text-ink/70"}`}>{s.summary}</p>
          <ul className={`mt-8 border-t ${dark ? "border-white/15" : "border-ink/15"}`}>
            {s.capabilities.map((c) => (
              <li key={c} className={`flex items-center gap-3 border-b py-3 text-sm ${dark ? "border-white/15" : "border-ink/15"}`}>
                <span className="h-1.5 w-1.5 bg-gold" aria-hidden /> {c}
              </li>
            ))}
          </ul>
          <Link href={href} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold hover:text-gold">
            <span className="border-b border-current pb-0.5">View details</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
