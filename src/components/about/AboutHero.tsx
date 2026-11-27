"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { wrap } from "@/components/shared/ui";
import { aboutHeroData } from "@/data/aboutData";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgMaskRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cueRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        if (bgMaskRef.current) {
          tl.fromTo(
            bgMaskRef.current,
            { clipPath: "inset(8% 0% 8% 0%)", opacity: 0.45 },
            { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.25, ease: "power4.out" },
            0
          );
        }

        if (eyebrowRef.current) {
          tl.fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.2);
        }

        const activeLines = linesRef.current.filter(Boolean);
        if (activeLines.length) {
          tl.fromTo(
            activeLines,
            { yPercent: 108 },
            { yPercent: 0, duration: 0.95, stagger: 0.14, ease: "power4.out" },
            0.28
          );
        }

        if (descRef.current) {
          tl.fromTo(descRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, 0.62);
        }

        if (cueRef.current) {
          tl.fromTo(cueRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7 }, 0.85);
        }

        if (bgImgRef.current) {
          gsap.fromTo(
            bgImgRef.current,
            { yPercent: 0, scale: 1.08 },
            {
              yPercent: 12,
              scale: 1.14,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-white"
    >
      {/* Full-viewport masked & parallax background */}
      <div
        ref={bgMaskRef}
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div ref={bgImgRef} className="relative h-full w-full will-change-transform">
          <Image
            src={aboutHeroData.image}
            alt={aboutHeroData.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/45 to-transparent" />
      </div>

      {/* Subtle architectural corner vignette accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[24%] -z-10 hidden h-[36vh] w-[22vw] max-w-[340px] overflow-hidden opacity-75 lg:block"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 75%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 75%, transparent 100%)",
        }}
      >
        <Image
          src={aboutHeroData.secondaryImage}
          alt={aboutHeroData.secondaryAlt}
          fill
          priority
          sizes="340px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/35" />
      </div>

      <div className={`${wrap} pb-20 pt-40 sm:pb-24 lg:pb-28`}>
        <p ref={eyebrowRef} className="label flex items-center gap-3 text-gold">
          <span className="inline-block h-px w-8 bg-gold" aria-hidden />
          {aboutHeroData.eyebrow}
        </p>

        <h1 className="display mt-6 max-w-5xl text-[clamp(3rem,8.4vw,7.8rem)] leading-[0.95] text-white">
          {aboutHeroData.headlineLines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span
                ref={(el) => {
                  linesRef.current[i] = el;
                }}
                className={`block will-change-transform ${i === 1 ? "text-gold" : ""}`}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <p ref={descRef} className="max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            {aboutHeroData.description}
          </p>

          <a
            ref={cueRef}
            href="#who-we-are"
            className="group inline-flex items-center gap-3 self-start text-xs font-semibold tracking-[0.22em] uppercase text-white/70 transition-colors hover:text-gold lg:self-end"
          >
            <span>Scroll to explore</span>
            <span className="glass-surface flex h-9 w-9 items-center justify-center rounded-full transition-colors group-hover:border-gold">
              <ArrowDown className="h-3.5 w-3.5 motion-safe:animate-bounce" aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
