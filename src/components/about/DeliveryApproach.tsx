"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow, wrap } from "@/components/shared/ui";
import { deliveryData } from "@/data/aboutData";

gsap.registerPlugin(ScrollTrigger);

export default function DeliveryApproach() {
  const pinRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const jumpToStage = (idx: number) => {
    const st = stRef.current;
    if (st) {
      const ratio = deliveryData.stages.length > 1 ? idx / (deliveryData.stages.length - 1) : 0;
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
      const count = deliveryData.stages.length;
      const st = ScrollTrigger.create({
        trigger: pinEl,
        start: "top top",
        end: "+=2000",
        pin: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (lineRef.current) {
            lineRef.current.style.transform = `scaleX(${self.progress})`;
          }
          const nextIdx = Math.min(count - 1, Math.round(self.progress * (count - 1)));
          if (nextIdx !== activeRef.current) {
            activeRef.current = nextIdx;
            setActiveIndex(nextIdx);
          }
        },
      });

      stRef.current = st;
      const settle = window.setTimeout(() => ScrollTrigger.refresh(), 480);
      return () => {
        window.clearTimeout(settle);
        stRef.current = null;
        st.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const current = deliveryData.stages[activeIndex] ?? deliveryData.stages[0];

  return (
    <section aria-label="How we work" className="relative bg-charcoal text-white">
      <div
        ref={pinRef}
        className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden py-24 md:h-screen md:pb-8 md:pt-20"
      >
        <div className={wrap}>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <Eyebrow>{deliveryData.eyebrow}</Eyebrow>
              <h2 className="display mt-5 text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.96] text-white">
                {deliveryData.heading}
              </h2>
            </div>
            <p className="font-mono text-xs tracking-[0.22em] uppercase text-gold">
              Stage {current.num} / 0{deliveryData.stages.length}
            </p>
          </div>

          {/* Horizontal architectural path & progress rail */}
          <div className="relative mt-12">
            <div aria-hidden className="absolute left-0 right-0 top-[11px] h-px bg-white/15" />
            <div
              ref={lineRef}
              aria-hidden
              className="absolute left-0 right-0 top-[11px] hidden h-[2px] origin-left scale-x-0 bg-gold will-change-transform md:block"
            />
            <div
              aria-hidden
              className="absolute left-0 top-[11px] h-[2px] bg-gold transition-all duration-500 md:hidden"
              style={{
                width: `${(activeIndex / (deliveryData.stages.length - 1)) * 100}%`,
              }}
            />

            <div role="tablist" aria-label="Delivery stages" className="grid grid-cols-6 gap-2">
              {deliveryData.stages.map((s, idx) => {
                const reached = idx <= activeIndex;
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={s.num}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => jumpToStage(idx)}
                    className="group relative flex flex-col items-start gap-2.5 text-left"
                  >
                    <span
                      className={`relative z-10 h-[22px] w-[22px] rounded-full border-2 transition-all duration-300 ${
                        reached
                          ? "border-gold bg-gold shadow-[0_0_12px_rgba(212,175,55,0.45)]"
                          : "border-white/35 bg-charcoal group-hover:border-gold"
                      }`}
                    />
                    <span
                      className={`font-mono text-[11px] font-semibold tracking-[0.18em] transition-colors ${
                        isActive ? "text-gold" : "text-white/50 group-hover:text-white/80"
                      }`}
                    >
                      {s.num}
                    </span>
                    <span
                      className={`hidden text-xs font-medium transition-colors sm:block ${
                        isActive ? "text-white" : "text-white/50 group-hover:text-white/80"
                      }`}
                    >
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stage visual + editorial narrative */}
          <div className="mt-12 grid items-center gap-8 md:grid-cols-12 md:gap-12">
            <div className="relative aspect-[16/10] overflow-hidden bg-ink md:col-span-7">
              {deliveryData.stages.map((s, idx) => (
                <div
                  key={s.num}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    idx === activeIndex ? "scale-100 opacity-100" : "scale-105 opacity-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent" />
                </div>
              ))}
              <div className="pointer-events-none absolute inset-x-6 bottom-6 z-10 flex items-end justify-between gap-4">
                <span className="display text-5xl text-gold/90 sm:text-6xl">{current.num}</span>
                <span className="label text-white/85">{current.title}</span>
              </div>
            </div>

            <div className="md:col-span-5">
              <p className="label text-gold">Stage {current.num}</p>
              <h3 className="display mt-4 text-4xl text-white transition-all duration-300 sm:text-5xl lg:text-6xl">
                {current.title}
              </h3>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-white/80 sm:text-xl">
                {current.text}
              </p>

              {/* Compact full-stage selector for mobile readability */}
              <ol className="mt-8 grid grid-cols-2 gap-2 sm:hidden">
                {deliveryData.stages.map((s, idx) => (
                  <li key={s.num}>
                    <button
                      type="button"
                      onClick={() => jumpToStage(idx)}
                      className={`w-full px-3 py-2 text-left text-xs font-medium transition-colors ${
                        idx === activeIndex ? "bg-gold text-ink" : "bg-ink/60 text-white/75"
                      }`}
                    >
                      {s.num} · {s.title}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
