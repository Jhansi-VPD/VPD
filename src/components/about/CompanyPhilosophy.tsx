"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow, wrap } from "@/components/shared/ui";
import { philosophyData } from "@/data/aboutData";

gsap.registerPlugin(ScrollTrigger);

export default function CompanyPhilosophy() {
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const jumpToPrinciple = (idx: number) => {
    const st = stRef.current;
    if (st) {
      const ratio = philosophyData.principles.length > 1 ? idx / (philosophyData.principles.length - 1) : 0;
      const targetY = st.start + (st.end - st.start) * ratio;
      window.scrollTo({ top: targetY, behavior: "smooth" });
      return;
    }
    setActiveIndex(idx);
  };

  useEffect(() => {
    const pinEl = pinRef.current;
    if (!pinEl) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const count = philosophyData.principles.length;
      const st = ScrollTrigger.create({
        trigger: pinEl,
        start: "top top",
        end: "+=2200",
        pin: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        refreshPriority: 2,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleY(${self.progress})`;
          }
          const nextIdx = Math.min(count - 1, Math.round(self.progress * (count - 1)));
          if (nextIdx !== activeRef.current) {
            activeRef.current = nextIdx;
            setActiveIndex(nextIdx);
          }
        },
      });

      stRef.current = st;
      return () => {
        stRef.current = null;
        st.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const current = philosophyData.principles[activeIndex] ?? philosophyData.principles[0];

  return (
    <section aria-label="Our philosophy" className="relative bg-ink text-white">
      <div
        ref={pinRef}
        className="relative isolate flex min-h-screen w-full items-center overflow-hidden py-24 md:h-screen md:pb-8 md:pt-20"
      >
        {/* Crossfading background photography tied to the active principle */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {philosophyData.principles.map((p, idx) => (
            <div
              key={p.num}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                idx === activeIndex ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            >
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/85" />
        </div>

        <div className={`${wrap} relative z-10 grid items-center gap-12 md:grid-cols-12 md:gap-12`}>
          {/* Left column: Fixed heading + active animated statement */}
          <div className="md:col-span-6">
            <Eyebrow>{philosophyData.eyebrow}</Eyebrow>
            <h2 className="display mt-5 max-w-xl text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[0.98] text-white">
              {philosophyData.heading}
            </h2>

            <div className="mt-10 border-l-2 border-gold/40 pl-6">
              <div className="flex items-baseline gap-4">
                <span className="display text-6xl text-gold sm:text-7xl">{current.num}</span>
                <span className="font-mono text-xs tracking-[0.22em] text-white/45">
                  / 0{philosophyData.principles.length}
                </span>
              </div>
              <h3 className="display mt-3 text-3xl text-white transition-all duration-300 sm:text-4xl">
                {current.title}
              </h3>
              <p className="mt-3 max-w-md text-lg leading-relaxed text-white/80">{current.text}</p>
            </div>
          </div>

          {/* Right column: Six principles with subtle scroll progress rail */}
          <div className="relative md:col-start-8 md:col-span-5">
            {/* Vertical progress rail (desktop) */}
            <div
              aria-hidden
              className="absolute -left-6 bottom-2 top-2 hidden w-[2px] bg-white/10 md:block"
            >
              <div
                ref={progressRef}
                className="h-full w-full origin-top scale-y-0 bg-gold will-change-transform"
              />
            </div>

            <ol className="space-y-3 sm:space-y-4">
              {philosophyData.principles.map((p, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <li key={p.num}>
                    <button
                      type="button"
                      onClick={() => jumpToPrinciple(idx)}
                      aria-current={isActive ? "step" : undefined}
                      className={`group flex w-full items-start gap-4 rounded-sm px-4 py-3 text-left transition-all duration-300 ${
                        isActive
                          ? "glass-surface text-white"
                          : "text-white/45 hover:bg-white/[0.04] hover:text-white/80"
                      }`}
                    >
                      <span
                        className={`mt-1 font-mono text-xs font-semibold tracking-widest transition-colors ${
                          isActive ? "text-gold" : "text-white/35 group-hover:text-gold/70"
                        }`}
                      >
                        {p.num}
                      </span>
                      <span className="flex-1">
                        <span className="block text-base font-semibold sm:text-lg">{p.title}</span>
                        <span
                          className={`mt-1 block text-sm transition-colors ${
                            isActive ? "text-white/75" : "text-white/35 md:hidden"
                          }`}
                        >
                          {p.text}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
