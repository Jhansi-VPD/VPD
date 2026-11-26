"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import Photo from "@/components/shared/Photo";
import { ButtonLink, Eyebrow, wrap } from "@/components/shared/ui";
import { img, type ImageName } from "@/lib/images";

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = services[active];

  return (
    <section className="bg-charcoal text-white">
      <div className={`${wrap} py-20 lg:py-32`}>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Our services</Eyebrow>
            <h2 className="display mt-6 text-4xl sm:text-5xl lg:text-7xl">Seven ways we put engineering to work.</h2>
          </div>
          <ButtonLink href="/services" variant="ghost">All services</ButtonLink>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <ul className="border-t border-white/15">
            {services.map((s, i) => (
              <li key={s.slug} className="border-b border-white/15">
                <Link
                  href={`/services/${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex items-center gap-5 py-5 sm:py-6"
                >
                  <span className={`label w-8 transition-colors ${active === i ? "text-gold" : "text-white/40"}`}>0{i + 1}</span>
                  <span className="flex-1">
                    <span className={`display block text-2xl transition-all duration-300 sm:text-3xl lg:text-4xl ${active === i ? "translate-x-2 text-gold" : "text-white"}`}>
                      {s.title}
                    </span>
                    <span className="mt-1 block text-sm text-white/55 lg:hidden">{s.summary}</span>
                  </span>
                  <ArrowUpRight className={`h-5 w-5 shrink-0 transition-all duration-300 ${active === i ? "text-gold opacity-100" : "opacity-0 lg:group-hover:opacity-60"}`} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>

          {/* Preview panel (desktop) */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.slug}
                    className="absolute inset-0"
                    initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Photo src={img(current.image as ImageName, 1200, 78)} alt={`${current.title} — illustrative photo`} sizes="40vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-8">
                      <p className="label text-gold">{current.kicker}</p>
                      <p className="mt-3 max-w-sm text-lg leading-snug text-white">{current.summary}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
