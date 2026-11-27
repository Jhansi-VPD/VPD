"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, TextLink, wrap } from "@/components/shared/ui";
import { leadershipData } from "@/data/aboutData";

gsap.registerPlugin(ScrollTrigger);

export default function LeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitsRef = useRef<(HTMLDivElement | null)[]>([]);
  const detailsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        portraitsRef.current.filter(Boolean).forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(16% 0% 0% 0%)", opacity: 0.5 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              duration: 1.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 84%",
                once: true,
              },
            }
          );
        });

        detailsRef.current.filter(Boolean).forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 84%",
                once: true,
              },
            }
          );
        });
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink text-white">
      <div className={`${wrap} py-24 lg:py-36`}>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <Eyebrow>{leadershipData.eyebrow}</Eyebrow>
            <h2 className="display mt-5 text-[clamp(2.6rem,5.4vw,5.2rem)] leading-[0.95] text-white">
              {leadershipData.heading}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {leadershipData.intro}
            </p>
          </div>
          <TextLink href="/about/leadership" light>
            Full leadership profiles
          </TextLink>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-14">
          {leadershipData.leaders.map((leader, idx) => {
            const initials = leader.name
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("");

            return (
              <article key={leader.name} className="grid gap-8 sm:grid-cols-[0.85fr_1.15fr] sm:items-end">
                {/* Architectural monogram portrait panel (authentic founder photographs not yet supplied) */}
                <div
                  ref={(el) => {
                    portraitsRef.current[idx] = el;
                  }}
                  className="group relative aspect-[4/5] overflow-hidden border border-white/14 bg-charcoal p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_24px_54px_-22px_rgba(0,0,0,0.75)] will-change-transform"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(212,175,55,0.16),transparent_65%)] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span
                    aria-hidden
                    className="display absolute -right-2 top-2 select-none text-[11rem] leading-none text-gold/12 transition-transform duration-700 group-hover:translate-y-1 sm:text-[13rem]"
                  >
                    {initials}
                  </span>
                  <div className="relative flex h-full flex-col justify-between">
                    <span className="font-mono text-xs tracking-[0.22em] text-white/45">
                      0{idx + 1} / FOUNDER
                    </span>
                    <div>
                      <p className="label text-gold">{leader.role}</p>
                      <h3 className="display mt-2 text-3xl text-white sm:text-4xl">{leader.name}</h3>
                    </div>
                  </div>
                </div>

                <div
                  ref={(el) => {
                    detailsRef.current[idx] = el;
                  }}
                  className="flex flex-col justify-between"
                >
                  <p className="text-sm leading-relaxed text-white/80 sm:text-base">{leader.bio}</p>

                  <blockquote className="mt-6 border-l border-gold/60 pl-4 text-sm italic leading-relaxed text-white/65">
                    “{leader.quote}”
                  </blockquote>

                  <p className="mt-5 text-xs tracking-wide text-white/50">
                    Focus: {leader.focus.join(" · ")}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-6">
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-gold transition-colors hover:text-white"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </a>
                    <Link
                      href="/about/leadership"
                      className="text-xs font-semibold tracking-[0.18em] uppercase text-white/65 transition-colors hover:text-gold"
                    >
                      Read profile
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
