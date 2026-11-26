"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Photo from "@/components/shared/Photo";
import { ButtonLink, wrap } from "@/components/shared/ui";
import { img } from "@/lib/images";

const words = ["Technology", "That Moves", "Your Business", "Forward."];

export default function HeroSection() {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink">
      <div className="absolute inset-0 -z-10">
        <div className="drift absolute inset-0">
          <Photo src={img("heroMain", 2400, 80)} alt="Close-up of a circuit board" priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
      </div>

      {/* Layered code visual (right) */}
      <motion.div
        aria-hidden
        className="absolute right-[6%] top-[22%] hidden h-[34vh] w-[22vw] max-w-[360px] overflow-hidden border border-gold/40 lg:block"
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Photo src={img("heroCode", 900, 75)} alt="" sizes="360px" />
        <div className="absolute inset-0 bg-ink/25" />
      </motion.div>

      <div className={`${wrap} pb-24 pt-40 sm:pb-28`}>
        <motion.p
          className="label mb-6 flex items-center gap-3 text-gold"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="h-px w-10 bg-gold" aria-hidden /> VPD Technologies · Kurnool, Andhra Pradesh
        </motion.p>

        <h1 className="display text-[clamp(2.9rem,9.2vw,8.8rem)] text-white">
          {words.map((w, i) => (
            <span key={w} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className={`block ${i === 3 ? "text-gold" : ""}`}
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.25 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <p className="max-w-xl text-lg leading-relaxed text-white/80">
            From custom software to enterprise applications, we build digital solutions that help businesses work smarter and grow.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/services" variant="gold">Explore our capabilities</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">Start a project</ButtonLink>
          </div>
        </motion.div>
      </div>

      <a
        href="#trust"
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition-colors hover:text-gold sm:flex"
      >
        <span className="label text-[0.62rem]">Scroll</span>
        <motion.span animate={reduce ? undefined : { y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown className="h-4 w-4" aria-hidden />
        </motion.span>
      </a>
    </section>
  );
}
