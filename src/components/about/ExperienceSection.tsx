"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, TextLink, wrap } from "@/components/shared/ui";
import { experienceData } from "@/data/aboutData";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [displayCount, setDisplayCount] = useState(experienceData.metricValue);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const counterObj = { val: 0 };
        setDisplayCount(0);

        if (counterRef.current) {
          gsap.to(counterObj, {
            val: experienceData.metricValue,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: counterRef.current,
              start: "top 92%",
              once: true,
            },
            onUpdate: () => {
              setDisplayCount(Math.round(counterObj.val));
            },
          });
        }

        const items = cardsRef.current.filter(Boolean);
        if (items.length) {
          gsap.fromTo(
            items,
            { clipPath: "inset(14% 0% 0% 0%)", opacity: 0.4, y: 24 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: items[0],
                start: "top 86%",
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
    <section ref={sectionRef} className="relative overflow-hidden bg-bone text-ink">
      <div className={`${wrap} pt-24 lg:pt-36`}>
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow tone="dark">{experienceData.eyebrow}</Eyebrow>
            <h2 className="display mt-5 text-[clamp(2.6rem,5.4vw,5.2rem)] leading-[0.95] text-ink">
              {experienceData.heading}
            </h2>
          </div>

          <div className="flex flex-col items-start gap-4 lg:col-start-8 lg:col-span-5">
            <div className="flex items-baseline gap-2">
              <span ref={counterRef} className="display text-[clamp(4.5rem,9vw,8.5rem)] leading-none text-gold-deep">
                {displayCount}
                {experienceData.metricSuffix}
              </span>
              <span className="label text-ink/75">{experienceData.metricLabel}</span>
            </div>
            <p className="max-w-md text-base leading-relaxed text-ink/75 sm:text-lg">
              {experienceData.metricNote}
            </p>
          </div>
        </div>

        {/* Minimal verified pillars */}
        <div className="mt-14 flex flex-col justify-between gap-8 border-t border-ink/15 pt-10 lg:flex-row lg:items-center">
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:flex lg:flex-wrap lg:gap-x-12">
            {experienceData.pillars.map((pillar, idx) => (
              <li key={pillar} className="flex items-baseline gap-3 text-sm font-medium text-ink/85 sm:text-base">
                <span className="font-mono text-xs font-semibold text-gold-deep">0{idx + 1}</span>
                <span>{pillar}</span>
              </li>
            ))}
          </ul>
          <TextLink href="/products">Explore all 18 platforms</TextLink>
        </div>
      </div>

      {/* Authentic VPD project visual strip */}
      <div className="scrollbar-none mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-24 sm:px-8 lg:mt-16 lg:gap-7 lg:px-14 lg:pb-32">
        {experienceData.projects.map((p, idx) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            className={`group relative block w-[74vw] max-w-[360px] shrink-0 snap-center sm:w-[46vw] lg:w-[27vw] ${
              idx % 2 === 1 ? "lg:translate-y-6" : ""
            }`}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-charcoal">
              <Image
                src={p.screenshot}
                alt={`${p.name} — ${p.category}`}
                fill
                sizes="(min-width: 1024px) 27vw, (min-width: 640px) 46vw, 74vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95" />
              <div className="absolute inset-x-6 bottom-6 z-10 text-white">
                <p className="label text-gold">{p.category}</p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <h3 className="display text-3xl text-white transition-colors group-hover:text-gold">
                    {p.name}
                  </h3>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </div>
                <p className="mt-2 text-xs text-white/70">{p.status}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
