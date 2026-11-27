"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { wrap } from "@/components/shared/ui";
import { img } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function HomeCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !bgRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          bgRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div ref={bgRef} className="relative -top-[8%] h-[116%] w-full will-change-transform">
          <Image
            src={img("ctaBg", 2200, 80)}
            alt="Connected global infrastructure horizon"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-ink/75" />
      </div>

      <div className={`${wrap} py-28 sm:py-36 lg:py-44`}>
        <div className="max-w-3xl">
          <p className="label flex items-center gap-3 text-gold">
            <span className="inline-block h-px w-8 bg-gold" aria-hidden />
            Let&apos;s talk
          </p>
          <h2 className="home-display mt-6 text-[clamp(2.6rem,6vw,5.6rem)] text-white">
            Have an Idea Worth Building?
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            Let&apos;s explore how the right technology can help move your business forward.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="gloss-gold group inline-flex items-center gap-2.5 bg-gold px-7 py-4 text-sm font-semibold text-ink transition-all hover:bg-white"
            >
              Start a Conversation
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </Link>
            <Link
              href="/products"
              className="glass-surface group inline-flex items-center gap-2.5 px-7 py-4 text-sm font-semibold text-white transition-all hover:border-gold hover:bg-white/12 hover:text-gold"
            >
              Explore Our Products
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/55">
            Direct communication with our engineering team · Reply within 4 hours · NDA available on request.
          </p>
        </div>
      </div>
    </section>
  );
}
