"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { process } from "@/data/services";
import { Eyebrow, wrap } from "@/components/shared/ui";

export default function DeliveryProcessSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const step = process[active];

  return (
    <section className="bg-ink text-white">
      <div className={`${wrap} py-20 lg:py-32`}>
        <div className="max-w-3xl">
          <Eyebrow>How we deliver</Eyebrow>
          <h2 className="display mt-6 text-4xl sm:text-5xl lg:text-7xl">
            From first question to <span className="text-gold">ongoing support.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="mt-16 lg:mt-20">
          <div role="tablist" aria-label="Delivery stages" className="relative grid grid-cols-7 gap-0">
            <div className="absolute left-0 right-0 top-[11px] h-px bg-white/20" aria-hidden />
            <motion.div
              aria-hidden
              className="absolute left-0 top-[11px] h-px bg-gold"
              animate={{ width: `${(active / (process.length - 1)) * 100}%` }}
              transition={{ duration: reduce ? 0 : 0.5 }}
            />
            {process.map((p, i) => (
              <button
                key={p.title}
                role="tab"
                id={`tab-${i}`}
                aria-selected={active === i}
                aria-controls="process-panel"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="group relative flex flex-col items-start gap-3 pt-0 text-left"
              >
                <span
                  className={`relative z-10 h-[22px] w-[22px] rounded-full border-2 transition-all duration-300 ${
                    i <= active ? "border-gold bg-gold" : "border-white/40 bg-ink group-hover:border-gold"
                  }`}
                />
                <span className={`label hidden transition-colors lg:block ${active === i ? "text-gold" : "text-white/45"}`}>0{i + 1}</span>
                <span className={`label text-[0.62rem] lg:hidden ${active === i ? "text-gold" : "text-white/45"}`}>{i + 1}</span>
              </button>
            ))}
          </div>

          <div id="process-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p className="label text-gold">Stage {active + 1} of {process.length}</p>
                <h3 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">{step.title}</h3>
                <p className="mt-4 text-xl text-white/60">{step.short}</p>
              </motion.div>
            </AnimatePresence>
            <p className="self-end text-lg leading-relaxed text-white/80 lg:max-w-md">{step.detail}</p>
          </div>

          {/* Names list for small screens + a11y */}
          <ol className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-7">
            {process.map((p, i) => (
              <li key={p.title} className="bg-ink">
                <button
                  onClick={() => setActive(i)}
                  className={`h-full w-full p-4 text-left text-sm transition-colors ${active === i ? "bg-charcoal text-gold" : "text-white/65 hover:text-white"}`}
                >
                  {p.title}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
