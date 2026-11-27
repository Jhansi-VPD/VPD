"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow, wrap } from "@/components/shared/ui";
import { whoWeAreData } from "@/data/aboutData";

gsap.registerPlugin(ScrollTrigger);

export default function CompanyIntroduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statementsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        if (imageWrapRef.current) {
          gsap.fromTo(
            imageWrapRef.current,
            { clipPath: "inset(14% 0% 0% 0%)", opacity: 0.7 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: imageWrapRef.current,
                start: "top 82%",
                once: true,
              },
            }
          );
        }

        if (imageInnerRef.current) {
          gsap.fromTo(
            imageInnerRef.current,
            { yPercent: -5 },
            {
              yPercent: 6,
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

        if (detailRef.current) {
          gsap.fromTo(
            detailRef.current,
            { y: 24 },
            {
              y: -24,
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

        if (headingRef.current) {
          gsap.fromTo(
            headingRef.current,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headingRef.current,
                start: "top 84%",
                once: true,
              },
            }
          );
        }

        const items = statementsRef.current.filter(Boolean);
        if (items.length) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: items[0],
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
    <section id="who-we-are" ref={sectionRef} className="relative overflow-hidden bg-bone text-ink">
      <div className={`${wrap} py-24 lg:py-36`}>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Asymmetrical architectural photography composition */}
          <div className="relative lg:col-span-6">
            <div
              ref={imageWrapRef}
              className="group relative aspect-[4/5] overflow-hidden bg-charcoal will-change-transform"
            >
              <div ref={imageInnerRef} className="relative h-[112%] w-full -top-[6%] will-change-transform">
                <Image
                  src={whoWeAreData.image}
                  alt={whoWeAreData.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-ink/10" />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-white">
                <p className="label text-gold">Kurnool · Andhra Pradesh</p>
                <span className="font-mono text-xs text-white/75">02 / 08</span>
              </div>
            </div>

            {/* Layered secondary workspace crop */}
            <div
              ref={detailRef}
              aria-hidden
              className="absolute -bottom-8 -right-4 hidden aspect-[4/3] w-48 overflow-hidden border-4 border-bone shadow-2xl will-change-transform sm:block lg:-right-10 lg:w-56"
            >
              <Image
                src={whoWeAreData.detailImage}
                alt={whoWeAreData.detailImageAlt}
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right editorial column with subtle edge overlap on desktop */}
          <div className="relative lg:col-start-7 lg:col-span-6 lg:pl-6">
            <Eyebrow tone="dark">{whoWeAreData.eyebrow}</Eyebrow>

            <h2
              ref={headingRef}
              className="display relative z-10 mt-6 text-[clamp(2.8rem,5.5vw,5.2rem)] leading-[0.95] text-ink lg:-ml-20"
            >
              <span className="lg:bg-bone/92 lg:px-4 lg:py-1 lg:box-decoration-clone">
                {whoWeAreData.heading}
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl">
              {whoWeAreData.intro}
            </p>
            <p className="mt-3 max-w-lg text-sm text-ink/60">{whoWeAreData.regionalNote}</p>

            <ul className="mt-12 grid gap-8 border-t border-ink/15 pt-10">
              {whoWeAreData.statements.map((st, idx) => (
                <li
                  key={st.title}
                  ref={(el) => {
                    statementsRef.current[idx] = el;
                  }}
                  className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4"
                >
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] text-gold-deep">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-ink">{st.title}</h3>
                    <p className="mt-1.5 text-base text-ink/70">{st.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
