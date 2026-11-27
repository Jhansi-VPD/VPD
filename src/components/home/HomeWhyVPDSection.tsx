"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { wrap } from "@/components/shared/ui";
import { company } from "@/data/company";
import { img } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function HomeWhyVPDSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        if (photoRef.current) {
          gsap.fromTo(
            photoRef.current,
            { clipPath: "inset(14% 0% 0% 0%)", opacity: 0.6 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: photoRef.current, start: "top 82%", once: true },
            }
          );
        }

        const items = itemsRef.current.filter(Boolean);
        if (items.length) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: items[0], start: "top 84%", once: true },
            }
          );
        }
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-bone text-ink">
      <div className={`${wrap} py-24 lg:py-36`}>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="label flex items-center gap-3 text-gold-deep">
                <span className="inline-block h-px w-8 bg-gold-deep" aria-hidden />
                Why VPD
              </p>
              <h2 className="home-display mt-6 text-[clamp(2.3rem,4.4vw,4rem)] text-ink">
                A partner who understands the problem, not just the code.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70 sm:text-lg">
                Direct engineering communication, pragmatic architecture, and founder-led ownership on every build.
              </p>

              <div
                ref={photoRef}
                className="relative mt-10 aspect-[16/10] overflow-hidden border border-ink/10 bg-charcoal shadow-[0_24px_54px_-20px_rgba(7,9,15,0.28)]"
              >
                <Image
                  src={img("careersHero", 1400, 80)}
                  alt="Modern engineering workspace"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <ol className="divide-y divide-ink/15 border-y border-ink/15 lg:col-start-7 lg:col-span-6">
            {company.whyVPD.map((item, idx) => (
              <li
                key={item.title}
                ref={(el) => {
                  itemsRef.current[idx] = el;
                }}
                className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 py-8 sm:grid-cols-[4rem_1fr] sm:py-9"
              >
                <span className="font-mono text-sm font-semibold tracking-[0.2em] text-gold-deep">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="home-display text-xl text-ink transition-colors group-hover:text-gold-deep sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 max-w-lg text-base leading-relaxed text-ink/70">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
