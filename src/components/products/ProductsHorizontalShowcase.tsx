"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Product, ProductStatus } from "@/types";

gsap.registerPlugin(ScrollTrigger);

interface ProductAtmosphere {
  focus: string;
  scale?: number;
  tint: string;
  fadeStop: string;
}

const atmosphereMap: Record<string, ProductAtmosphere> = {
  agriflow: { focus: "55% 52%", scale: 1.08, tint: "rgba(196,154,58,0.18)", fadeStop: "54%" },
  clikgett: { focus: "50% 50%", scale: 1.08, tint: "rgba(212,145,88,0.16)", fadeStop: "52%" },
  pawguard: { focus: "62% 62%", scale: 1.09, tint: "rgba(212,175,55,0.16)", fadeStop: "56%" },
  gatesphere: { focus: "52% 58%", scale: 1.08, tint: "rgba(86,128,175,0.18)", fadeStop: "54%" },
  "edunova-school": { focus: "52% 44%", scale: 1.08, tint: "rgba(84,158,128,0.16)", fadeStop: "52%" },
  medilink: { focus: "50% 62%", scale: 1.09, tint: "rgba(205,135,98,0.16)", fadeStop: "54%" },
  "skyline-crest": { focus: "50% 54%", scale: 1.08, tint: "rgba(56,162,196,0.20)", fadeStop: "56%" },
  finbridge: { focus: "62% 48%", scale: 1.09, tint: "rgba(64,150,145,0.17)", fadeStop: "54%" },
  nexasphere: { focus: "58% 54%", scale: 1.08, tint: "rgba(72,118,192,0.20)", fadeStop: "56%" },
  "nexforge-automation": { focus: "50% 60%", scale: 1.08, tint: "rgba(190,152,72,0.17)", fadeStop: "54%" },
  "aurexion-technologies": { focus: "55% 52%", scale: 1.09, tint: "rgba(64,158,158,0.17)", fadeStop: "52%" },
  amplivo: { focus: "64% 50%", scale: 1.09, tint: "rgba(70,138,148,0.18)", fadeStop: "54%" },
  nexacargo: { focus: "50% 58%", scale: 1.08, tint: "rgba(214,126,88,0.18)", fadeStop: "55%" },
  "finovara-ca": { focus: "56% 58%", scale: 1.08, tint: "rgba(186,142,84,0.17)", fadeStop: "54%" },
  "corefusion-technologies": { focus: "54% 52%", scale: 1.08, tint: "rgba(88,116,178,0.20)", fadeStop: "56%" },
  "fieldops-nexus": { focus: "52% 64%", scale: 1.09, tint: "rgba(212,162,76,0.18)", fadeStop: "54%" },
  "procuresphere-360": { focus: "44% 54%", scale: 1.09, tint: "rgba(104,138,172,0.18)", fadeStop: "54%" },
  sevanest: { focus: "54% 42%", scale: 1.08, tint: "rgba(164,158,108,0.17)", fadeStop: "54%" },
};

const statusMeta: Record<ProductStatus, { dot: string; text: string }> = {
  Production: { dot: "bg-gold shadow-[0_0_10px_rgba(212,175,55,0.85)]", text: "text-gold" },
  Staging: { dot: "bg-amber-200/80", text: "text-white/85" },
  "In Development": { dot: "bg-white/45", text: "text-white/65" },
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatIndex(i: number) {
  return pad2(i + 1);
}

export default function ProductsHorizontalShowcase({ products }: { products: Product[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const activeIndexRef = useRef(0);
  const isActiveRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const getSpreadTargetProgress = useCallback((index: number) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return 0;

    const spreads = track.querySelectorAll<HTMLElement>("[data-spread]");
    const target = spreads[index];
    if (!target) return 0;

    const maxTravel = Math.max(0, track.scrollWidth - viewport.clientWidth);
    if (maxTravel <= 0) return 0;

    const centeredOffset = target.offsetLeft - (viewport.clientWidth - target.offsetWidth) / 2;
    const clamped = Math.min(Math.max(centeredOffset, 0), maxTravel);
    return clamped / maxTravel;
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const clamped = Math.min(Math.max(index, 0), products.length - 1);
      const st = scrollTriggerRef.current;
      if (st) {
        const progress = getSpreadTargetProgress(clamped);
        const targetY = st.start + (st.end - st.start) * progress;
        window.scrollTo({ top: targetY, behavior: "smooth" });
        return;
      }

      const spreads = trackRef.current?.querySelectorAll<HTMLElement>("[data-spread]");
      spreads?.[clamped]?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [getSpreadTargetProgress, products.length]
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const spreads = Array.from(track.querySelectorAll<HTMLElement>("[data-spread]"));
    if (spreads.length === 0) return;

    let refreshRaf = 0;
    const scheduleRefresh = () => {
      cancelAnimationFrame(refreshRaf);
      refreshRaf = requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const getTravel = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

      const findClosestIndex = (progress: number) => {
        const maxTravel = getTravel();
        if (maxTravel <= 0) return 0;
        let closestIdx = 0;
        let closestDist = Infinity;

        for (let i = 0; i < spreads.length; i++) {
          const el = spreads[i];
          const centeredOffset = el.offsetLeft - (viewport.clientWidth - el.offsetWidth) / 2;
          const p = Math.min(Math.max(centeredOffset, 0), maxTravel) / maxTravel;
          const dist = Math.abs(p - progress);
          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = i;
          }
        }
        return closestIdx;
      };

      const horizontalTween = gsap.to(track, {
        x: () => -getTravel(),
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: viewport,
          start: "top top",
          end: () => `+=${Math.max(1, getTravel())}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            isActiveRef.current = self.isActive;
          },
          onUpdate: (self) => {
            if (progressFillRef.current) {
              progressFillRef.current.style.transform = `scaleX(${self.progress})`;
            }
            const nextIdx = findClosestIndex(self.progress);
            if (nextIdx !== activeIndexRef.current) {
              activeIndexRef.current = nextIdx;
              setActiveIndex(nextIdx);
            }
          },
        },
      });

      scrollTriggerRef.current = horizontalTween.scrollTrigger ?? null;

      // Multi-layer GPU parallax synchronized via containerAnimation (left image stays left, right text stays right)
      for (const spread of spreads) {
        const atmosLayer = spread.querySelector<HTMLElement>('[data-parallax="atmos"]');
        const bgLayer = spread.querySelector<HTMLElement>('[data-parallax="bg"]');
        const mediaLayer = spread.querySelector<HTMLElement>('[data-parallax="media"]');
        const imgLayer = spread.querySelector<HTMLElement>('[data-parallax="img"]');
        const titleLayer = spread.querySelector<HTMLElement>('[data-parallax="title"]');
        const copyLayer = spread.querySelectorAll<HTMLElement>('[data-parallax="copy"]');

        const baseTrigger = {
          trigger: spread,
          containerAnimation: horizontalTween,
          start: "left right",
          end: "right left",
          scrub: true,
        };

        if (atmosLayer) {
          gsap.fromTo(atmosLayer, { x: 42 }, { x: -42, ease: "none", force3D: true, scrollTrigger: baseTrigger });
        }
        if (bgLayer) {
          gsap.fromTo(bgLayer, { x: 96 }, { x: -96, ease: "none", force3D: true, scrollTrigger: baseTrigger });
        }
        if (mediaLayer) {
          gsap.fromTo(mediaLayer, { x: 22 }, { x: -22, ease: "none", force3D: true, scrollTrigger: baseTrigger });
        }
        if (imgLayer) {
          gsap.fromTo(
            imgLayer,
            { xPercent: -3.5 },
            { xPercent: 3.5, ease: "none", force3D: true, scrollTrigger: baseTrigger }
          );
        }
        if (titleLayer) {
          gsap.fromTo(titleLayer, { x: 54 }, { x: -54, ease: "none", force3D: true, scrollTrigger: baseTrigger });
        }
        if (copyLayer.length > 0) {
          gsap.fromTo(copyLayer, { x: 18 }, { x: -18, ease: "none", force3D: true, scrollTrigger: baseTrigger });
        }
      }

      return () => {
        scrollTriggerRef.current = null;
        isActiveRef.current = false;
      };
    });

    const resizeObserver = new ResizeObserver(() => scheduleRefresh());
    resizeObserver.observe(track);
    resizeObserver.observe(viewport);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    const settleTimer = window.setTimeout(() => ScrollTrigger.refresh(), 520);

    return () => {
      cancelAnimationFrame(refreshRaf);
      window.clearTimeout(settleTimer);
      resizeObserver.disconnect();
      mm.revert();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isActiveRef.current) return;
      if (document.querySelector('[role="dialog"]')) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollToIndex(activeIndexRef.current + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToIndex(activeIndexRef.current - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [scrollToIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let pointerDown = false;
    let dragged = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let suppressClick = false;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0 || !scrollTriggerRef.current) return;
      const interactive = (e.target as HTMLElement | null)?.closest("a, button, input, [role='button']");
      if (interactive) return;
      pointerDown = true;
      dragged = false;
      startX = e.clientX;
      startY = e.clientY;
      lastX = e.clientX;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!pointerDown) return;
      const totalDx = e.clientX - startX;
      const totalDy = e.clientY - startY;
      if (!dragged) {
        if (Math.abs(totalDx) < 8 || Math.abs(totalDx) <= Math.abs(totalDy)) return;
        dragged = true;
      }
      const stepX = e.clientX - lastX;
      lastX = e.clientX;
      window.scrollBy({ top: -stepX * 1.25 });
    };

    const onPointerUp = () => {
      if (!pointerDown) return;
      if (dragged) {
        suppressClick = true;
        window.setTimeout(() => {
          suppressClick = false;
        }, 60);
      }
      pointerDown = false;
      dragged = false;
    };

    const onClickCapture = (e: MouseEvent) => {
      if (suppressClick) {
        e.preventDefault();
        e.stopPropagation();
        suppressClick = false;
      }
    };

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("click", onClickCapture, true);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  const activeProduct = products[activeIndex] ?? products[0];

  return (
    <section
      id="product-showcase"
      aria-label="VPD Technologies 18-product horizontal showcase"
      className="relative bg-ink text-white"
    >
      <div
        ref={viewportRef}
        className="showcase-viewport relative w-full overflow-hidden md:h-screen md:cursor-grab md:active:cursor-grabbing"
      >
        <div
          ref={trackRef}
          className="showcase-track flex flex-col gap-12 md:h-full md:w-max md:flex-row md:items-stretch md:gap-0 md:px-[6vw] will-change-transform"
        >
          {products.map((product, index) => {
            const atmo = atmosphereMap[product.slug] ?? {
              focus: "50% 50%",
              scale: 1.08,
              tint: "rgba(212,175,55,0.16)",
              fadeStop: "54%",
            };
            const nextProduct = index < products.length - 1 ? products[index + 1] : null;
            const num = formatIndex(index);
            const status = statusMeta[product.status];
            const maskHorizontal = `linear-gradient(90deg, rgba(0,0,0,0.92) 0%, black 22%, black ${atmo.fadeStop}, transparent 98%)`;

            return (
              <article
                key={product.slug}
                data-spread
                aria-label={`${num} of ${products.length}: ${product.name}`}
                className="showcase-spread relative isolate flex shrink-0 flex-col justify-between overflow-hidden md:h-full md:w-[88vw] md:max-w-[1360px] md:px-14 md:pb-24 md:pt-24 lg:px-20"
              >
                {/* Layer 1A: Atmospheric ambient lighting derived from each product image */}
                <div
                  aria-hidden
                  data-parallax="atmos"
                  className="pointer-events-none absolute -inset-12 -z-20 will-change-transform"
                  style={{
                    background: `radial-gradient(ellipse 64% 62% at 28% 52%, ${atmo.tint}, transparent 72%)`,
                  }}
                />

                {/* Layer 1B: Slow watermark numeral in right negative space */}
                <span
                  aria-hidden
                  data-parallax="bg"
                  className="display pointer-events-none absolute right-10 top-20 hidden select-none text-[clamp(7rem,15vw,14rem)] leading-none text-white/[0.04] will-change-transform md:block"
                >
                  {num}
                </span>

                {/* LEFT SIDE: Blended borderless visual layer occupying ~50-60% width on desktop with smooth center fade */}
                <div
                  aria-hidden
                  data-parallax="media"
                  className="spread-left-media pointer-events-none relative h-[48svh] min-h-[300px] w-full overflow-hidden will-change-transform md:absolute md:inset-y-0 md:-left-6 md:h-full md:w-[60%]"
                  style={{ "--spread-mask": maskHorizontal } as React.CSSProperties}
                >
                  <div
                    data-parallax="img"
                    className="relative h-full w-full will-change-transform"
                    style={{ transform: `scale(${atmo.scale ?? 1.08})` }}
                  >
                    <Image
                      src={product.screenshot}
                      alt={`${product.name} — ${product.category} platform visual`}
                      fill
                      priority={index < 2}
                      sizes="(min-width: 1280px) 52vw, (min-width: 768px) 55vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: atmo.focus }}
                    />
                  </div>

                  {/* Seamless top, bottom, and center-facing edge transitions */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.12) 20%, rgba(10,10,10,0.12) 74%, rgba(10,10,10,0.96) 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 hidden md:block"
                    style={{
                      background:
                        "linear-gradient(270deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.58) 34%, rgba(10,10,10,0.08) 72%, rgba(10,10,10,0.35) 100%)",
                    }}
                  />
                </div>

                {/* Consistent Top-Right Status Badge */}
                <div className="relative z-20 flex justify-end px-5 pt-4 md:px-0 md:pt-0">
                  <div className="glass-surface inline-flex items-center gap-2 rounded-full px-3.5 py-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} aria-hidden />
                    <span className={`text-[11px] font-semibold tracking-[0.18em] uppercase ${status.text}`}>
                      {product.status}
                    </span>
                  </div>
                </div>

                {/* RIGHT SIDE: Consistent left-aligned content grid across all 18 products */}
                <div className="relative z-20 -mt-10 px-5 pb-4 sm:px-8 md:my-auto md:mt-0 md:grid md:grid-cols-12 md:px-0 md:pb-0">
                  <div className="md:col-start-7 md:col-span-6">
                    {/* 1. Product number & category */}
                    <div data-parallax="copy" className="flex flex-wrap items-center gap-3.5 will-change-transform">
                      <span className="font-mono text-xs font-semibold tracking-[0.24em] text-gold">
                        {num} <span className="text-white/35">/ {pad2(products.length)}</span>
                      </span>
                      <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden />
                      <span className="label text-white/85">{product.category}</span>
                    </div>

                    {/* 2. Oversized editorial product name overlapping the soft center photo edge */}
                    <h2
                      data-parallax="title"
                      className="display mt-4 text-[clamp(2.75rem,5.4vw,5.6rem)] leading-[0.94] text-white drop-shadow-[0_12px_32px_rgba(10,10,10,0.92)] will-change-transform"
                    >
                      {product.name}
                    </h2>

                    {/* 3. Product description */}
                    <p
                      data-parallax="copy"
                      className="mt-5 max-w-[48ch] text-base leading-relaxed text-white/80 sm:text-lg will-change-transform"
                    >
                      {product.description}
                    </p>

                    {/* 4. Three capabilities without divider lines */}
                    <ul
                      data-parallax="copy"
                      className="mt-7 grid max-w-[48ch] gap-y-3 will-change-transform"
                    >
                      {product.capabilities.slice(0, 3).map((cap, capIdx) => (
                        <li
                          key={cap}
                          className="grid grid-cols-[1.6rem_1fr] items-baseline gap-2.5 text-sm leading-snug text-white/88"
                        >
                          <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-gold">
                            0{capIdx + 1}
                          </span>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>

                    {/* 5 & 6. Explore button + Next-product navigation */}
                    <div
                      data-parallax="copy"
                      className="mt-8 flex flex-wrap items-center gap-6 will-change-transform"
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        className="gloss-gold group inline-flex items-center gap-2.5 bg-gold px-6 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase text-ink transition-all duration-300 hover:bg-white"
                      >
                        Explore {product.name}
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden
                        />
                      </Link>

                      {nextProduct ? (
                        <button
                          type="button"
                          onClick={() => scrollToIndex(index + 1)}
                          className="group hidden items-center gap-2.5 text-xs font-semibold tracking-[0.18em] uppercase text-white/70 transition-colors hover:text-gold md:inline-flex"
                        >
                          <span>Next · {nextProduct.name}</span>
                          <ArrowRight
                            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden
                          />
                        </button>
                      ) : (
                        <Link
                          href="/contact"
                          className="group inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] uppercase text-gold transition-colors hover:text-white"
                        >
                          <span>Start a conversation</span>
                          <ArrowRight
                            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Aligned bottom tech-stack & index footnote */}
                <div className="relative z-20 px-5 sm:px-8 md:grid md:grid-cols-12 md:px-0">
                  <div className="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase text-white/45 md:col-start-7 md:col-span-6">
                    <span>{product.stack.join(" · ")}</span>
                    <span className="font-mono text-white/55">
                      {num} / {pad2(products.length)}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Sleek floating pill navigation dock (desktop/tablet horizontal mode only) */}
        <nav
          aria-label="Product showcase navigation"
          className="showcase-dock pointer-events-none absolute inset-x-0 bottom-5 z-30 hidden justify-center px-5 md:flex lg:bottom-7"
        >
          <div className="glass-surface-deep pointer-events-auto relative flex w-full max-w-[860px] items-center justify-between gap-4 overflow-hidden rounded-full px-5 py-2.5">
            <div aria-hidden className="absolute inset-x-6 top-0 h-[1.5px] bg-white/10">
              <div ref={progressFillRef} className="h-full w-full origin-left scale-x-0 bg-gold will-change-transform" />
            </div>

            <div className="flex min-w-0 items-center gap-3">
              <span className="font-mono text-sm font-semibold tabular-nums text-white">
                <span className="text-gold">*</span>
                {formatIndex(activeIndex)}
              </span>
              <span className="font-mono text-xs text-white/40">/ {pad2(products.length)}</span>
              <span className="hidden h-3 w-px bg-white/15 sm:block" aria-hidden />
              <span className="hidden truncate text-xs font-medium text-white/85 sm:block">
                {activeProduct.name}
              </span>
            </div>

            <div className="hidden items-center gap-1 lg:flex" role="group" aria-label="Jump to product">
              {products.map((p, i) => {
                const active = i === activeIndex;
                return (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Jump to ${formatIndex(i)}: ${p.name}`}
                    aria-current={active ? "step" : undefined}
                    title={`${formatIndex(i)} · ${p.name}`}
                    className="group flex h-5 items-center px-0.5 focus-visible:outline-gold"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        active ? "w-5 bg-gold" : "w-1.5 bg-white/25 group-hover:bg-white/60"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous product"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex + 1)}
                disabled={activeIndex === products.length - 1}
                aria-label="Next product"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
