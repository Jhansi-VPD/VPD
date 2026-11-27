"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/data/company";
import { wrap } from "@/components/shared/ui";

gsap.registerPlugin(ScrollTrigger);

export default function HomeLeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        panelsRef.current.filter(Boolean).forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(14% 0% 0% 0%)", opacity: 0.5 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 84%", once: true },
            }
          );
        });
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bone text-ink">
      <div className={`${wrap} py-24 lg:py-36`}>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="label flex items-center gap-3 text-gold-deep">
              <span className="inline-block h-px w-8 bg-gold-deep" aria-hidden />
              Leadership
            </p>
            <h2 className="home-display mt-5 text-[clamp(2.3rem,4.8vw,4.6rem)] text-ink">
              Led directly by the founders.
            </h2>
          </div>
          <Link
            href="/about/leadership"
            className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-ink hover:text-gold-deep"
          >
            <span>Meet the founders</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </Link>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-14">
          {company.leaders.map((leader, idx) => {
            const initials = leader.name
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("");

            return (
              <article key={leader.name} className="grid gap-7 sm:grid-cols-[0.8fr_1.2fr] sm:items-end">
                {/* Architectural monogram portrait frame — authentic founder photographs not yet supplied */}
                <div
                  ref={(el) => {
                    panelsRef.current[idx] = el;
                  }}
                  className="group relative aspect-[4/5] overflow-hidden border border-white/12 bg-ink p-7 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_24px_54px_-22px_rgba(7,9,15,0.55)] will-change-transform"
                >
                  <span
                    aria-hidden
                    className="home-display absolute -right-2 top-3 select-none text-[10rem] leading-none text-gold/15 transition-transform duration-500 group-hover:translate-y-1 sm:text-[12rem]"
                  >
                    {initials}
                  </span>
                  <div className="relative flex h-full flex-col justify-between">
                    <span className="font-mono text-xs tracking-[0.2em] text-white/50">0{idx + 1}</span>
                    <div>
                      <p className="label text-gold">{leader.role}</p>
                      <h3 className="home-display mt-2 text-2xl text-white sm:text-3xl">{leader.name}</h3>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm leading-relaxed text-ink/80 sm:text-base">{leader.bio}</p>
                  <blockquote className="mt-5 border-l-2 border-gold-deep pl-4 text-sm italic leading-relaxed text-ink/65">
                    “{leader.quote}”
                  </blockquote>
                  <p className="mt-4 text-xs text-ink/55">Focus: {leader.focus.join(" · ")}</p>
                  <div className="mt-5 flex items-center gap-5">
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.18em] uppercase text-gold-deep hover:underline"
                    >
                      LinkedIn <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                    <Link
                      href="/about/leadership"
                      className="text-xs font-semibold tracking-[0.18em] uppercase text-ink/70 hover:text-gold-deep"
                    >
                      Full profile
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
