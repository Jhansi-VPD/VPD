"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/data/industries";
import { wrap } from "@/components/shared/ui";
import { img, type ImageName } from "@/lib/images";

export default function HomeIndustriesSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section className="bg-charcoal text-white">
      <div className={`${wrap} py-24 lg:py-36`}>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="label flex items-center gap-3 text-gold">
              <span className="inline-block h-px w-8 bg-gold" aria-hidden />
              Industries we serve
            </p>
            <h2 className="home-display mt-5 text-[clamp(2.3rem,4.8vw,4.6rem)] text-white">
              Software built for the sectors that keep operations moving.
            </h2>
          </div>
          <Link
            href="/industries"
            className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-gold hover:text-white"
          >
            <span>All {industries.length} industries</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
        </div>

        {/* Desktop interactive expanding visual panels */}
        <div className="mt-14 hidden h-[560px] gap-2 lg:flex">
          {industries.map((ind, idx) => {
            const on = active === idx;
            return (
              <motion.div
                key={ind.slug}
                layout={!reduce}
                onMouseEnter={() => setActive(idx)}
                onFocus={() => setActive(idx)}
                className="relative overflow-hidden bg-ink"
                style={{ flex: on ? 5 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/industries/${ind.slug}`} className="absolute inset-0 block" aria-label={ind.name}>
                  <Image
                    src={img(ind.image as ImageName, 1400, 78)}
                    alt={`${ind.name} — sector photography`}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 transition-colors duration-500 ${on ? "bg-ink/40" : "bg-ink/70"}`} />
                  <span className={`label absolute left-4 top-5 text-gold ${on ? "opacity-100" : "opacity-75"}`}>
                    0{idx + 1}
                  </span>

                  {!on && (
                    <span
                      className="absolute bottom-6 left-4 origin-bottom-left -rotate-90 whitespace-nowrap text-sm font-semibold text-white/90"
                      style={{ transformOrigin: "left bottom" }}
                    >
                      {ind.short}
                    </span>
                  )}

                  {on && (
                    <div className="glass-surface-deep absolute inset-x-5 bottom-5 p-6 text-white">
                      <h3 className="home-display text-2xl sm:text-3xl">{ind.name}</h3>
                      <p className="mt-2.5 max-w-md text-sm leading-relaxed text-white/80">{ind.blurb}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-gold">
                        Explore sector <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </span>
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile / tablet responsive grid */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
          {industries.map((ind) => (
            <li key={ind.slug}>
              <Link href={`/industries/${ind.slug}`} className="group relative block aspect-[4/3] overflow-hidden bg-ink">
                <Image
                  src={img(ind.image as ImageName, 900, 75)}
                  alt={`${ind.name} — sector photography`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="glass-surface-deep absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="home-display text-xl">{ind.short}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/75">{ind.blurb}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
