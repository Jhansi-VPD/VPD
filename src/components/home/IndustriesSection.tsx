"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/data/industries";
import Photo from "@/components/shared/Photo";
import { Eyebrow, wrap } from "@/components/shared/ui";
import { img, type ImageName } from "@/lib/images";

export default function IndustriesSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section className="bg-bone text-ink">
      <div className={`${wrap} py-20 lg:py-32`}>
        <div className="max-w-3xl">
          <Eyebrow tone="dark">Industries</Eyebrow>
          <h2 className="display mt-6 text-4xl sm:text-5xl lg:text-7xl">Software for the sectors that keep things moving.</h2>
        </div>

        {/* Desktop: expanding panels */}
        <div className="mt-14 hidden h-[560px] gap-2 lg:flex">
          {industries.map((ind, i) => {
            const on = active === i;
            return (
              <motion.div
                key={ind.slug}
                layout={!reduce}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="relative overflow-hidden bg-ink"
                style={{ flex: on ? 5 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/industries/${ind.slug}`} className="absolute inset-0 block" aria-label={ind.name}>
                  <Photo src={img(ind.image as ImageName, 1400, 75)} alt={`${ind.name} — illustrative photo`} sizes="50vw" />
                  <div className={`absolute inset-0 transition-colors duration-500 ${on ? "bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" : "bg-ink/65"}`} />
                  <span
                    className={`label absolute left-4 top-5 text-gold transition-opacity ${on ? "opacity-100" : "opacity-70"}`}
                  >
                    0{i + 1}
                  </span>
                  {!on && (
                    <span className="absolute bottom-6 left-4 origin-bottom-left -rotate-90 whitespace-nowrap text-sm font-semibold text-white/90" style={{ transformOrigin: "left bottom" }}>
                      {ind.short}
                    </span>
                  )}
                  {on && (
                    <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                      <h3 className="display text-3xl">{ind.name}</h3>
                      <p className="mt-3 max-w-sm text-white/80">{ind.blurb}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                        Explore <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </span>
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile / tablet: stacked image rows */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
          {industries.map((ind) => (
            <li key={ind.slug}>
              <Link href={`/industries/${ind.slug}`} className="group relative block aspect-[4/3] overflow-hidden bg-ink">
                <Photo src={img(ind.image as ImageName, 900, 72)} alt={`${ind.name} — illustrative photo`} sizes="(min-width:640px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="display text-2xl">{ind.short}</h3>
                  <p className="mt-1 text-sm text-white/75">{ind.blurb}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
