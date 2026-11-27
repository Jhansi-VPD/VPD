"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { wrap } from "@/components/shared/ui";

gsap.registerPlugin(ScrollTrigger);

const headlineLines = ["Transforming Ideas into", "Intelligent Software Solutions."];

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        const lines = linesRef.current.filter(Boolean);
        if (lines.length) {
          tl.fromTo(
            lines,
            { yPercent: 108 },
            { yPercent: 0, duration: 0.95, stagger: 0.14, ease: "power4.out" },
            0.15
          );
        }

        if (subRef.current) {
          tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.85 }, 0.45);
        }

        if (mediaRef.current) {
          gsap.fromTo(
            mediaRef.current,
            { yPercent: 0, scale: 1.04 },
            {
              yPercent: 12,
              scale: 1.12,
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
      {/* Full-screen silent background video with immediate poster fallback */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div ref={mediaRef} className="relative h-full w-full will-change-transform">
          <Image
            src="/videos/hero-poster.jpg"
            alt="Precision processor architecture and engineering systems"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/videos/hero-poster.jpg"
            onCanPlay={() => setVideoReady(true)}
            aria-hidden
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:hidden ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src="/videos/hero-tech.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Flat translucent readability overlays (no surface gradients) */}
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-y-0 left-0 w-full bg-ink/30 lg:w-3/4" />
      </div>

      <div className={`${wrap} pb-20 pt-40 sm:pb-24 lg:pb-28`}>
        <p className="label mb-6 flex items-center gap-3 text-gold">
          <span className="inline-block h-px w-8 bg-gold" aria-hidden />
          VPD Technologies · Engineering &amp; Digital Products
        </p>

        <h1 className="home-display max-w-5xl text-[clamp(2.65rem,6.4vw,5.9rem)] text-white">
          {headlineLines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
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

        <div
          ref={subRef}
          className="mt-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <p className="max-w-xl text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl">
            VPD creates software products, business applications, and digital solutions that help companies
            improve their operations and grow in a connected world.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="gloss-gold group inline-flex items-center gap-2.5 bg-gold px-6 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:bg-white"
            >
              Start a Conversation
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
            <a
              href="#capabilities"
              className="glass-surface group inline-flex items-center gap-2.5 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-gold hover:bg-white/12 hover:text-gold"
            >
              Explore Our Capabilities
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <a
        href="#company-intro"
        aria-label="Scroll to company introduction"
        className="absolute bottom-6 right-6 hidden items-center gap-2.5 text-xs font-semibold tracking-[0.2em] uppercase text-white/70 transition-colors hover:text-gold lg:flex"
      >
        <span>Scroll</span>
        <ArrowDown className="h-3.5 w-3.5 motion-safe:animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
