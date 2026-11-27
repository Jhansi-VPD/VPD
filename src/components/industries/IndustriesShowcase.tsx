"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/data/industries";
import { wrap } from "@/components/shared/ui";

gsap.registerPlugin(ScrollTrigger);

export default function IndustriesShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollToPanel = useCallback((targetIdx: number) => {
    const el = panelRefs.current[targetIdx];
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const headerOffset = window.innerWidth >= 640 ? 78 : 68;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(0, top), behavior: reduced ? "auto" : "smooth" });
  }, []);

  // Keep the single sticky countdown synced smoothly to viewport scroll position.
  useEffect(() => {
    let rafId = 0;

    const syncActive = () => {
      rafId = 0;
      const triggerY = window.innerHeight * 0.34;
      let nextIdx = 0;

      for (let i = 0; i < panelRefs.current.length; i++) {
        const el = panelRefs.current[i];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= triggerY) {
          nextIdx = i;
        }
      }

      setActiveIdx((prev) => (prev === nextIdx ? prev : nextIdx));
    };

    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(syncActive);
    };

    syncActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Separate GSAP scrub targets (parallax wrapper vs darkening veil) so tweens never conflict.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      panelRefs.current.forEach((panel) => {
        if (!panel) return;
        const media = panel.querySelector("[data-scrub-media]");
        const veil = panel.querySelector("[data-scrub-veil]");

        if (media) {
          gsap.fromTo(
            media,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.35,
              },
            },
          );
        }

        if (veil) {
          gsap.fromTo(
            veil,
            { opacity: 0 },
            {
              opacity: 0.88,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top 18%",
                end: "bottom 18%",
                scrub: 0.25,
              },
            },
          );
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleNavKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      scrollToPanel(Math.min(industries.length - 1, idx + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      scrollToPanel(Math.max(0, idx - 1));
    }
  };

  const previewIdx = hoveredIdx !== null && hoveredIdx >= activeIdx ? hoveredIdx : null;

  return (
    <section ref={rootRef} aria-label="Industries showcase" className="relative bg-ink pb-4 sm:pb-6">
      {/* Unified sticky countdown bar: stays pinned across all panels, releases smoothly at section bottom */}
      <div className="pointer-events-none sticky top-[68px] z-30 -mb-[52px] sm:top-[76px] sm:-mb-[72px] lg:-mb-[80px]">
        <div className={wrap}>
          <div className="flex flex-wrap items-center gap-3 pt-4 sm:pt-6">
            <nav
              aria-label="Industry index"
              onMouseLeave={() => setHoveredIdx(null)}
              className="pointer-events-auto inline-flex items-stretch bg-[#07090f]/95 shadow-[0_18px_42px_rgba(0,0,0,0.72)] ring-1 ring-white/10 backdrop-blur-md"
            >
              {industries.map((ind, idx) => {
                const isPast = idx < activeIdx;
                const isActive = idx === activeIdx;

                return (
                  <button
                    key={ind.slug}
                    type="button"
                    tabIndex={isPast ? -1 : 0}
                    aria-hidden={isPast}
                    aria-current={isActive ? "step" : undefined}
                    aria-label={`${idx + 1}. ${ind.name}`}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onFocus={() => setHoveredIdx(idx)}
                    onBlur={() => setHoveredIdx(null)}
                    onClick={() => scrollToPanel(idx)}
                    onKeyDown={(e) => handleNavKeyDown(e, idx)}
                    className={`flex h-9 items-center justify-center overflow-hidden font-bold transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-gold sm:h-12 lg:h-14 ${
                      isPast
                        ? "pointer-events-none w-0 min-w-0 -translate-y-3 border-l-0 opacity-0"
                        : isActive
                          ? "w-8 translate-y-0 bg-gold text-sm text-ink opacity-100 sm:w-12 sm:text-xl lg:w-14 lg:text-2xl"
                          : "w-8 translate-y-0 border-l border-white/12 bg-[#07090f] text-sm text-gold opacity-100 hover:bg-[#1a2032] hover:text-white sm:w-12 sm:text-xl lg:w-14 lg:text-2xl"
                    }`}
                  >
                    <span>{idx + 1}</span>
                  </button>
                );
              })}
            </nav>

            {/* Instant sector readout when hovering or focusing a number tile */}
            <div
              aria-live="polite"
              className={`hidden items-center gap-2 border border-white/12 bg-[#07090f]/90 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all duration-200 sm:inline-flex ${
                previewIdx !== null ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
              }`}
            >
              {previewIdx !== null && (
                <>
                  <span className="font-mono text-gold">0{previewIdx + 1}</span>
                  <span className="text-white/90">{industries[previewIdx].short}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stacked full-bleed cinema panels */}
      <div className="space-y-4 sm:space-y-5">
        {industries.map((ind, idx) => {
          const heroImage = ind.gallery[0];

          return (
            <article
              key={ind.slug}
              id={ind.slug}
              ref={(el) => {
                panelRefs.current[idx] = el;
              }}
              className="group relative h-[78vh] min-h-[480px] max-h-[820px] w-full overflow-hidden bg-[#050608] sm:h-[85vh]"
            >
              {/* Over-scaled parallax wrapper so scrub travel never exposes background edges */}
              <div data-scrub-media className="pointer-events-none absolute inset-0 scale-[1.12] will-change-transform">
                <img
                  src={heroImage.src}
                  alt={heroImage.alt}
                  loading={idx === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Scroll-driven fade veil dissolves image smoothly into deep black as panel exits */}
              <div
                data-scrub-veil
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[#050608] opacity-0 will-change-[opacity]"
              />

              {/* Persistent editorial bottom-left contrast scrims */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/45 to-black/20"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(5,6,8,0.84)_0%,transparent_64%)]"
              />

              <div className="relative z-10 flex h-full items-end">
                <div className={`${wrap} pb-10 sm:pb-14 lg:pb-16`}>
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="group/link block max-w-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  >
                    <h2 className="display text-[clamp(2.1rem,5.2vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-white transition-colors duration-300 group-hover/link:text-gold">
                      {ind.name}
                    </h2>
                    <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                      {ind.blurb}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-transform duration-300 group-hover/link:translate-x-1">
                      Explore sector
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
