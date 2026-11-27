"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, wrap } from "@/components/shared/ui";
import { capabilitiesData } from "@/data/aboutData";

export default function CapabilitiesOverview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = capabilitiesData.items[activeIndex] ?? capabilitiesData.items[0];
  const secondary =
    capabilitiesData.items[(activeIndex + 2) % capabilitiesData.items.length] ?? capabilitiesData.items[1];

  return (
    <section className="relative overflow-hidden bg-white text-ink">
      <div className={`${wrap} py-24 lg:py-36`}>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow tone="dark">{capabilitiesData.eyebrow}</Eyebrow>
            <h2 className="display mt-5 text-[clamp(2.6rem,5.2vw,4.8rem)] leading-[0.96] text-ink">
              {capabilitiesData.heading}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-ink/70 lg:col-span-5 lg:pb-1 lg:text-lg">
            {capabilitiesData.intro}
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
          {/* Interactive capability index (hover on desktop, tap on mobile) */}
          <ul className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-6">
            {capabilitiesData.items.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <li key={item.slug}>
                  <div
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`group transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-65 hover:opacity-100"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-expanded={isActive}
                      className="flex w-full items-center gap-5 py-5 text-left sm:py-6"
                    >
                      <span
                        className={`font-mono text-xs font-semibold tracking-[0.2em] transition-colors ${
                          isActive ? "text-gold-deep" : "text-ink/40"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`display block text-2xl transition-transform duration-300 sm:text-3xl ${
                            isActive ? "translate-x-2 text-ink" : "text-ink/80 group-hover:translate-x-1"
                          }`}
                        >
                          {item.title}
                        </span>
                      </span>
                      <ArrowUpRight
                        className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                          isActive
                            ? "translate-x-0.5 -translate-y-0.5 text-gold-deep opacity-100"
                            : "text-ink/40 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                        }`}
                        aria-hidden
                      />
                    </button>

                    {/* Mobile / tablet tap-expanded visual & summary */}
                    {isActive && (
                      <div className="pb-6 pl-10 lg:hidden">
                        <div className="relative mb-4 aspect-[16/10] overflow-hidden bg-charcoal">
                          <Image
                            src={item.imageUrl}
                            alt={`${item.title} — VPD capability`}
                            fill
                            sizes="100vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
                          <p className="label absolute bottom-4 left-4 text-gold">{item.kicker}</p>
                        </div>
                        <p className="text-sm leading-relaxed text-ink/75">{item.detail}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.capabilities.map((cap) => (
                            <span
                              key={cap}
                              className="bg-bone px-3 py-1 text-xs font-medium text-ink/80"
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={`/services/${item.slug}`}
                          className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-gold-deep hover:underline"
                        >
                          Explore {item.title} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Desktop asymmetrical multi-image visual stage */}
          <div className="relative hidden lg:col-span-6 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                {capabilitiesData.items.map((item, idx) => (
                  <div
                    key={item.slug}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      idx === activeIndex ? "scale-100 opacity-100" : "scale-105 opacity-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={`${item.title} — engineering capability`}
                      fill
                      sizes="45vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  </div>
                ))}

                {/* Overlaid typography & capability details */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-8 sm:p-10">
                  <p className="label text-gold">{current.kicker}</p>
                  <h3 className="display mt-2 text-3xl text-white sm:text-4xl">{current.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
                    {current.detail}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {current.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="glass-surface px-3 py-1 text-xs font-medium text-white"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/services/${current.slug}`}
                    className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-gold transition-colors hover:text-white"
                  >
                    <span>View service details</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </Link>
                </div>
              </div>

              {/* Overlapping secondary crop for depth */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-8 -left-10 aspect-[4/3] w-44 overflow-hidden border-4 border-white shadow-xl"
              >
                <Image
                  src={secondary.imageUrl}
                  alt=""
                  fill
                  sizes="180px"
                  className="object-cover opacity-90 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-ink/25" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
