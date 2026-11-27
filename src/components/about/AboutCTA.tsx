"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ButtonLink, Eyebrow, wrap } from "@/components/shared/ui";
import { aboutCtaData } from "@/data/aboutData";

gsap.registerPlugin(ScrollTrigger);

export default function AboutCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        if (bgRef.current) {
          gsap.fromTo(
            bgRef.current,
            { yPercent: -8, scale: 1.08 },
            {
              yPercent: 8,
              scale: 1.04,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        if (contentRef.current) {
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: contentRef.current,
                start: "top 85%",
                once: true,
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
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div ref={bgRef} className="relative h-[116%] w-full -top-[8%] will-change-transform">
          <Image
            src={aboutCtaData.image}
            alt={aboutCtaData.imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-transparent" />
      </div>

      <div ref={contentRef} className={`${wrap} py-28 sm:py-36 lg:py-44`}>
        <div className="max-w-3xl">
          <Eyebrow>{aboutCtaData.eyebrow}</Eyebrow>
          <h2 className="display mt-6 text-[clamp(2.8rem,6.5vw,6.2rem)] leading-[0.95] text-white">
            {aboutCtaData.headline}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            {aboutCtaData.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={aboutCtaData.ctaHref} variant="gold">
              {aboutCtaData.ctaLabel}
            </ButtonLink>
            <ButtonLink href="/products" variant="ghost">
              Explore our products
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
