"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { wrap } from "@/components/shared/ui";
import { img, type ImageName } from "@/lib/images";

const ArchitectureCanvas3D = dynamic(() => import("./ArchitectureCanvas3D"), {
  ssr: false,
  loading: () => <div aria-hidden className="h-44 w-44 rounded-full bg-white/[0.03] lg:h-56 lg:w-56" />,
});

export default function HomeCapabilitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = services[activeIndex] ?? services[0];

  return (
    <section id="capabilities" className="relative overflow-hidden bg-charcoal text-white">
      <div className={`${wrap} py-24 lg:py-36`}>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="label flex items-center gap-3 text-gold">
              <span className="inline-block h-px w-8 bg-gold" aria-hidden />
              Our capabilities
            </p>
            <h2 className="home-display mt-6 max-w-4xl text-[clamp(2.4rem,5vw,4.8rem)] text-white">
              Seven engineering disciplines built to work together.
            </h2>
          </div>

          <div className="flex items-center justify-start lg:col-span-4 lg:justify-end">
            <ArchitectureCanvas3D className="h-44 w-44 sm:h-52 sm:w-52 lg:h-60 lg:w-60" />
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <ul className="divide-y divide-white/12 border-y border-white/12 lg:col-span-6">
            {services.map((service, idx) => {
              const isActive = idx === activeIndex;
              return (
                <li key={service.slug}>
                  <div onMouseEnter={() => setActiveIndex(idx)}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-expanded={isActive}
                      className="group flex w-full items-center gap-5 py-5 text-left sm:py-6"
                    >
                      <span
                        className={`font-mono text-xs font-semibold tracking-[0.2em] transition-colors ${
                          isActive ? "text-gold" : "text-white/40"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`home-display block text-xl transition-transform duration-300 sm:text-2xl lg:text-3xl ${
                            isActive ? "translate-x-2 text-gold" : "text-white/85 group-hover:translate-x-1 group-hover:text-white"
                          }`}
                        >
                          {service.title}
                        </span>
                      </span>
                      <ArrowUpRight
                        className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                          isActive
                            ? "translate-x-0.5 -translate-y-0.5 text-gold opacity-100"
                            : "text-white/40 opacity-40 group-hover:opacity-100"
                        }`}
                        aria-hidden
                      />
                    </button>

                    {/* Mobile/tablet tap preview */}
                    {isActive && (
                      <div className="pb-6 pl-9 lg:hidden">
                        <div className="relative mb-4 aspect-[16/10] overflow-hidden bg-ink">
                          <Image
                            src={img(service.image as ImageName, 1200, 80)}
                            alt={`${service.title} — VPD engineering capability`}
                            fill
                            sizes="100vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-ink/80 p-4 backdrop-blur-sm">
                            <p className="label text-gold">{service.kicker}</p>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed text-white/80">{service.detail}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {service.capabilities.map((cap) => (
                            <span key={cap} className="bg-ink/70 px-3 py-1 text-xs text-white/85">
                              {cap}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={`/services/${service.slug}`}
                          className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-gold hover:underline"
                        >
                          Explore {service.title} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Desktop interactive photographic stage */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                {services.map((service, idx) => (
                  <div
                    key={service.slug}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      idx === activeIndex ? "scale-100 opacity-100" : "scale-105 opacity-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={img(service.image as ImageName, 1600, 80)}
                      alt={`${service.title} — engineering environment`}
                      fill
                      sizes="45vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                ))}

                <div className="glass-surface-deep absolute inset-x-6 bottom-6 z-10 p-7">
                  <p className="label text-gold">{current.kicker}</p>
                  <h3 className="home-display mt-2 text-2xl text-white sm:text-3xl">{current.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">{current.detail}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {current.capabilities.map((cap) => (
                      <span key={cap} className="glass-surface px-3 py-1 text-xs font-medium text-white">
                        {cap}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/services/${current.slug}`}
                    className="group mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-gold transition-colors hover:text-white"
                  >
                    <span>Explore capability</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
