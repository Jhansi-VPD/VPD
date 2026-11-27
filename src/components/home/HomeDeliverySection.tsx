"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { wrap } from "@/components/shared/ui";
import { deliveryData } from "@/data/aboutData";

gsap.registerPlugin(ScrollTrigger);

export default function HomeDeliverySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const items = cardsRef.current.filter(Boolean);
        if (items.length) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.09,
              ease: "power3.out",
              scrollTrigger: {
                trigger: items[0],
                start: "top 84%",
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

  const activeIdx = hoveredIdx ?? selectedIdx;
  const activeStage = deliveryData.stages[activeIdx] ?? deliveryData.stages[0];

  return (
    <section
      ref={sectionRef}
      aria-label="How we work — six structured stages"
      className="relative overflow-hidden bg-ink text-white"
    >
      {/* Subtle warm gold ambient wash matching VPD's dark obsidian palette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_18%,rgba(226,189,75,0.11),transparent_70%)]"
      />

      <div className={`${wrap} relative py-24 lg:py-32`}>
        {/* Editorial centered header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="label inline-flex items-center gap-3 text-gold">
            <span className="inline-block h-px w-8 bg-gold" aria-hidden />
            How we work
            <span className="inline-block h-px w-8 bg-gold" aria-hidden />
          </p>
          <h2 className="home-display mt-5 text-[clamp(2.2rem,4.4vw,3.9rem)] text-white">
            Six structured stages from first question to continuous support.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/65 sm:text-base">
            Hover or select any stage to explore how VPD moves software from initial discovery to ongoing production scale.
          </p>
        </div>

        {/* 6-Stage Sculptural Glass Infographic Row */}
        <div
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:items-stretch xl:justify-between xl:gap-0"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {deliveryData.stages.map((stage, idx) => {
            const isHovered = hoveredIdx === idx;
            const isActive = activeIdx === idx;
            const stageNum = idx + 1;

            return (
              <div
                key={stage.num}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="flex items-stretch xl:flex-1"
              >
                <button
                  type="button"
                  onMouseEnter={() => {
                    setHoveredIdx(idx);
                    setSelectedIdx(idx);
                  }}
                  onFocus={() => {
                    setHoveredIdx(idx);
                    setSelectedIdx(idx);
                  }}
                  onClick={() => setSelectedIdx(idx)}
                  aria-pressed={isActive}
                  className="group relative flex w-full flex-1 cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
                >
                  {/* Glowing Metallic Gold Number Sphere tucked behind bottom-left of glass card */}
                  <span
                    aria-hidden
                    className={`absolute bottom-1 left-0 z-0 flex h-16 w-16 items-center justify-start rounded-full bg-[linear-gradient(135deg,#f3d97d_0%,#e2bd4b_52%,#947214_100%)] pl-3.5 text-lg font-bold text-ink shadow-[0_0_24px_rgba(226,189,75,0.35)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isHovered || isActive
                        ? "-translate-x-1.5 scale-110 shadow-[0_0_36px_rgba(226,189,75,0.62)]"
                        : "group-hover:-translate-x-1.5 group-hover:scale-110"
                    }`}
                  >
                    {stageNum}
                  </span>

                  {/* Frosted Asymmetric Glass Card overlapping right half of the orb */}
                  <div
                    className={`relative z-10 ml-6 flex min-h-[210px] w-full flex-col justify-between overflow-hidden rounded-tl-[2rem] rounded-tr-[2rem] rounded-br-[2rem] rounded-bl-[4px] border p-6 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] xl:min-h-[236px] xl:p-5 ${
                      isHovered
                        ? "-translate-y-2 border-gold/60 bg-[linear-gradient(145deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_55%,rgba(226,189,75,0.18)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_26px_54px_-16px_rgba(226,189,75,0.28)]"
                        : isActive
                        ? "-translate-y-1 border-white/28 bg-[linear-gradient(145deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.035)_55%,rgba(226,189,75,0.12)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.26),0_20px_48px_-18px_rgba(0,0,0,0.75)]"
                        : "border-white/16 bg-[linear-gradient(145deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_60%,rgba(226,189,75,0.07)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_40px_-18px_rgba(0,0,0,0.65)] hover:-translate-y-2"
                    }`}
                  >
                    {/* Internal frosted refraction glow from gold orb */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-gold/25 blur-2xl transition-opacity duration-500 ${
                        isHovered || isActive ? "opacity-100" : "opacity-55 group-hover:opacity-100"
                      }`}
                    />

                    {/* Specular diagonal reflection sweep on hover */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(112deg,transparent_25%,rgba(255,255,255,0.16)_50%,transparent_75%)] transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden"
                    />

                    <div className="relative">
                      <span
                        className={`font-mono text-[10px] font-semibold tracking-[0.22em] uppercase transition-colors ${
                          isHovered || isActive ? "text-gold" : "text-white/50 group-hover:text-gold"
                        }`}
                      >
                        Stage {stage.num}
                      </span>
                      <h3 className="home-display mt-2 text-xl text-white transition-colors group-hover:text-white xl:text-[1.35rem]">
                        {stage.title}
                      </h3>
                      <p className="mt-3 text-xs leading-relaxed text-white/75 transition-colors group-hover:text-white/90 sm:text-sm xl:text-xs">
                        {stage.text}
                      </p>
                    </div>

                    {/* Subtle animated progress underline inside the card */}
                    <div className="relative mt-5 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                      <span
                        className={`block h-full origin-left rounded-full bg-[linear-gradient(90deg,#e2bd4b,#ffffff)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isHovered || isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Directional arrow connector between cards on desktop */}
                {idx < deliveryData.stages.length - 1 && (
                  <div
                    aria-hidden
                    className="hidden shrink-0 items-center justify-center px-1.5 xl:flex"
                  >
                    <ArrowRight
                      className={`h-4 w-4 transition-all duration-300 ${
                        hoveredIdx === idx
                          ? "translate-x-1 text-gold"
                          : "text-white/40"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Subtle interactive stage spotlight footer */}
        <div className="glass-surface mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-between gap-4 rounded-full px-6 py-3.5 text-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 font-mono text-xs font-bold text-gold">
              {activeStage.num}
            </span>
            <span className="font-semibold text-white">{activeStage.title}</span>
            <span className="hidden text-white/40 sm:inline">—</span>
            <span className="hidden text-white/75 sm:inline">{activeStage.text}</span>
          </div>
          <span className="font-mono text-xs tracking-[0.18em] text-gold">
            {activeStage.num} / 0{deliveryData.stages.length}
          </span>
        </div>
      </div>
    </section>
  );
}
