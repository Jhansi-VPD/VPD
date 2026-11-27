"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { wrap } from "@/components/shared/ui";
import { img } from "@/lib/images";
import { company } from "@/data/company";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { label: "Understand First", text: "We clarify business goals, workflows, and constraints before writing a single line of code." },
  { label: "Engineer Practically", text: "Proven full-stack, mobile, cloud, and AI architectures chosen for reliability—never hype." },
  { label: "Own Delivery", text: "Direct founder governance and one accountable engineering team from discovery to launch." },
];

export default function HomeIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const primaryImgRef = useRef<HTMLDivElement>(null);
  const secondaryImgRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        if (primaryImgRef.current) {
          gsap.fromTo(
            primaryImgRef.current,
            { clipPath: "inset(14% 0% 0% 0%)", opacity: 0.5 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              duration: 1.05,
              ease: "power3.out",
              scrollTrigger: { trigger: primaryImgRef.current, start: "top 82%", once: true },
            }
          );

          gsap.fromTo(
            primaryImgRef.current,
            { y: 18 },
            {
              y: -22,
              ease: "none",
              scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        }

        if (secondaryImgRef.current) {
          gsap.fromTo(
            secondaryImgRef.current,
            { y: 36 },
            {
              y: -36,
              ease: "none",
              scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        }

        if (copyRef.current) {
          gsap.fromTo(
            copyRef.current,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: { trigger: copyRef.current, start: "top 84%", once: true },
            }
          );
        }
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="company-intro" ref={sectionRef} className="relative overflow-hidden bg-white text-ink">
      <div className={`${wrap} py-24 lg:py-36`}>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div ref={copyRef} className="lg:col-span-6">
            <p className="label flex items-center gap-3 text-gold-deep">
              <span className="inline-block h-px w-8 bg-gold-deep" aria-hidden />
              Beyond code delivery
            </p>
            <h2 className="home-display mt-6 text-[clamp(2.3rem,4.6vw,4.3rem)] text-ink">
              More than a software house. An engineering partner built for accountability.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 sm:text-lg">
              {company.intro} Rooted in {company.regionalOffices[0]} and active across{" "}
              {company.regionalOffices.slice(1).join(", ")}, we partner with startups and enterprises alike.
            </p>

            <div className="mt-10 grid gap-6 border-t border-ink/15 pt-8 sm:grid-cols-3">
              {pillars.map((p) => (
                <div key={p.label}>
                  <h3 className="text-sm font-bold tracking-tight text-ink">{p.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.text}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-gold-deep"
            >
              <span className="border-b border-current pb-0.5">Discover how VPD works</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </div>

          <div className="relative lg:col-span-6">
            <div
              ref={primaryImgRef}
              className="group relative aspect-[4/5] overflow-hidden bg-charcoal will-change-transform"
            >
              <Image
                src={img("aboutHero", 1800, 80)}
                alt="Modern glass-and-concrete architectural engineering office"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="glass-surface-deep absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="label text-gold">Vision · Purpose · Delivery</p>
                <p className="mt-1.5 text-sm text-white/80">
                  Disciplined software engineering structured around measurable business outcomes.
                </p>
              </div>
            </div>

            <div
              ref={secondaryImgRef}
              aria-hidden
              className="absolute -bottom-8 -left-6 hidden aspect-[4/3] w-56 overflow-hidden border-4 border-white bg-ink shadow-2xl will-change-transform sm:block lg:-left-10 lg:w-64"
            >
              <Image
                src={img("aboutWork", 1200, 80)}
                alt=""
                fill
                sizes="260px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
