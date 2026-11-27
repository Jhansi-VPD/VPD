"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

interface GalleryTileConfig {
  image: string;
  alt: string;
  objectPosition: string;
}

// Verified HD Unsplash imagery without human subjects, tailored to each VPD service domain
const serviceMedia: Record<string, GalleryTileConfig> = {
  "enterprise-software": {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=82",
    alt: "Enterprise operations dashboard and ERP system metrics",
    objectPosition: "50% 45%",
  },
  "custom-software": {
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1400&q=82",
    alt: "Custom software engineering architecture and codebase environment",
    objectPosition: "50% 50%",
  },
  "mobile-apps": {
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=82",
    alt: "Mobile application interface on modern smartphone hardware",
    objectPosition: "50% 50%",
  },
  "data-engineering": {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=82",
    alt: "Data engineering pipelines and business intelligence analytics charts",
    objectPosition: "50% 50%",
  },
  "cloud-devops": {
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=82",
    alt: "Cloud infrastructure server racks and automated deployment systems",
    objectPosition: "50% 50%",
  },
  "ai-ml": {
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=82",
    alt: "AI and intelligent automation neural matrix visualization",
    objectPosition: "50% 50%",
  },
  "ui-ux-engineering": {
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=82",
    alt: "UI/UX product engineering workstation and digital design hardware",
    objectPosition: "50% 50%",
  },
};

const SHRINK = 0.9;
const EXPAND = 1.95;

function buildTracks(count: number, active: number | null, expand = EXPAND) {
  return Array.from({ length: count }, (_, i) =>
    active === null ? "1fr" : i === active ? `${expand}fr` : `${SHRINK}fr`
  ).join(" ");
}

function getLayoutMode(width: number): "desktop" | "tablet" | "mobile" {
  if (width >= 1024) return "desktop";
  if (width >= 640) return "tablet";
  return "mobile";
}

export default function DynamicServiceGallery() {
  const router = useRouter();
  const [active, setActive] = useState<number | null>(null);
  const [mode, setMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  useEffect(() => {
    const sync = () => setMode(getLayoutMode(window.innerWidth));
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, []);

  // Desktop: 4x2 grid (tile 7 spans cols 3-4); Tablet: 2x4 grid (tile 7 spans cols 1-2); Mobile: 1x7 stacked rows
  const cols = mode === "desktop" ? 4 : mode === "tablet" ? 2 : 1;
  const rows = mode === "desktop" ? 2 : mode === "tablet" ? 4 : services.length;

  const activeRow =
    active === null ? null : mode === "mobile" ? active : Math.floor(active / cols);
  const activeCol =
    active === null ? null : mode === "mobile" ? 0 : active % cols;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, idx: number) => {
    const service = services[idx];
    if (e.key === "Escape") {
      setActive(null);
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (service) router.push(`/services/${service.slug}`);
      return;
    }

    let next: number | null = null;
    if (e.key === "ArrowRight") next = Math.min(services.length - 1, idx + 1);
    else if (e.key === "ArrowLeft") next = Math.max(0, idx - 1);
    else if (e.key === "ArrowDown") next = Math.min(services.length - 1, idx + cols);
    else if (e.key === "ArrowUp") next = Math.max(0, idx - cols);

    if (next === null || next === idx) return;
    e.preventDefault();
    const grid = e.currentTarget.parentElement;
    (grid?.children[next] as HTMLElement | undefined)?.focus();
  };

  return (
    <div
      className="select-none"
      onMouseLeave={() => {
        if (mode !== "mobile") setActive(null);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setActive(null);
      }}
    >
      <div
        role="list"
        aria-label="Interactive VPD services gallery"
        className="dgg-grid grid w-full h-[980px] sm:h-[820px] lg:h-[620px]"
        style={{
          gridTemplateColumns:
            mode === "mobile" ? "1fr" : buildTracks(cols, activeCol, EXPAND),
          gridTemplateRows: buildTracks(rows, activeRow, mode === "mobile" ? 2.3 : EXPAND),
          gap: mode === "mobile" ? 10 : 12,
        }}
      >
        {services.map((service, i) => {
          const on = active === i;
          const media = serviceMedia[service.slug];
          const isLastSpan =
            (mode === "desktop" && i === services.length - 1) ||
            (mode === "tablet" && i === services.length - 1);

          return (
            <div
              key={service.slug}
              role="listitem"
              tabIndex={0}
              aria-label={`${service.title} — ${service.kicker}`}
              aria-expanded={mode === "mobile" ? on : undefined}
              data-on={on}
              onMouseEnter={() => {
                if (mode !== "mobile") setActive(i);
              }}
              onFocus={() => setActive(i)}
              onClick={() => {
                // On touch/mobile, first tap expands the tile; tapping the expanded tile navigates
                if (mode === "mobile" && !on) {
                  setActive(i);
                  return;
                }
                router.push(`/services/${service.slug}`);
              }}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="dgg-tile relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-xl bg-charcoal shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_20px_48px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/14 outline-none transition-shadow duration-300 hover:ring-white/25"
              style={{
                contain: "layout paint",
                gridColumn: isLastSpan ? "span 2" : undefined,
              }}
            >
              {media && (
                <Image
                  src={media.image}
                  alt={media.alt}
                  fill
                  priority={i < 4}
                  sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
                  className="pointer-events-none object-cover brightness-[0.96] contrast-[1.04]"
                  style={{ objectPosition: media.objectPosition }}
                />
              )}

              {/* Subtle rest shade */}
              <div
                aria-hidden
                className="dgg-shade pointer-events-none absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(10,10,10,0.55), transparent 55%, rgba(10,10,10,0.18))",
                  opacity: on ? 0 : 0.65,
                }}
              />

              {/* Expanded readability shade */}
              <div
                aria-hidden
                className="dgg-shade pointer-events-none absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.35) 55%, rgba(10,10,10,0.1) 100%)",
                  opacity: on ? 1 : 0,
                }}
              />

              {/* Subtle resting index tag */}
              <span
                className={`pointer-events-none absolute left-4 top-4 font-mono text-[11px] font-semibold tracking-[0.2em] transition-opacity duration-300 ${
                  on ? "text-gold opacity-100" : "text-white/75 opacity-80"
                }`}
              >
                0{i + 1}
              </span>

              {/* Mobile collapsed hint title so touch users can identify every row before tapping */}
              {mode === "mobile" && !on && (
                <div className="pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between gap-2 text-white">
                  <span className="text-sm font-semibold">{service.title}</span>
                  <span className="text-[11px] tracking-wider uppercase text-gold">Tap</span>
                </div>
              )}

              {/* Expanded bottom title + kicker + visual action indicator */}
              <div
                className="dgg-label pointer-events-none absolute inset-x-4 bottom-4 z-10 flex items-end justify-between gap-4 sm:inset-x-5 sm:bottom-5"
                style={{
                  opacity: on ? 1 : 0,
                  transform: on ? "translateY(0)" : "translateY(8px)",
                }}
              >
                <div className="min-w-0">
                  <p className="label truncate text-gold">{service.kicker}</p>
                  <h3 className="mt-1 truncate text-lg font-semibold tracking-tight text-white sm:text-xl lg:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-1 hidden max-w-md truncate text-xs text-white/75 sm:block">
                    {service.summary}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="gloss-gold inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-ink"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
