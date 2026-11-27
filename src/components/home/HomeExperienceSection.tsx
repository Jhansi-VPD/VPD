"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { getProduct } from "@/data/products";
import type { Product } from "@/types";
import { wrap } from "@/components/shared/ui";

gsap.registerPlugin(ScrollTrigger);

const showcaseSlugs = [
  "agriflow",
  "clikgett",
  "fieldops-nexus",
  "finovara-ca",
  "corefusion-technologies",
  "sevanest",
];

export default function HomeExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [count, setCount] = useState(55);

  const items = showcaseSlugs
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const obj = { val: 0 };
        setCount(0);

        if (counterRef.current) {
          gsap.to(obj, {
            val: 55,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: counterRef.current, start: "top 92%", once: true },
            onUpdate: () => setCount(Math.round(obj.val)),
          });
        }

        const cards = cardsRef.current.filter(Boolean);
        if (cards.length) {
          gsap.fromTo(
            cards,
            { clipPath: "inset(12% 0% 0% 0%)", opacity: 0.5, y: 20 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: cards[0], start: "top 86%", once: true },
            }
          );
        }
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white text-ink">
      <div className={`${wrap} py-24 lg:py-36`}>
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="label flex items-center gap-3 text-gold-deep">
              <span className="inline-block h-px w-8 bg-gold-deep" aria-hidden />
              Experience &amp; projects
            </p>
            <h2 className="home-display mt-5 text-[clamp(2.3rem,4.8vw,4.6rem)] text-ink">
              Proven across industries and production environments.
            </h2>
          </div>

          <div className="flex flex-col items-start gap-3 lg:col-start-8 lg:col-span-5">
            <div className="flex items-baseline gap-3">
              <span ref={counterRef} className="home-display text-6xl text-gold-deep sm:text-7xl lg:text-8xl">
                {count}+
              </span>
              <span className="label text-ink/75">Completed Projects</span>
            </div>
            <p className="max-w-md text-base leading-relaxed text-ink/70">
              Web platforms, enterprise applications, and custom digital systems delivered across India and beyond.
            </p>
          </div>
        </div>

        {/* Asymmetric editorial grid of authentic VPD product visuals */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {items.map((p, idx) => {
            const span =
              idx === 0
                ? "lg:col-span-6 lg:row-span-2 aspect-[4/5]"
                : idx < 3
                ? "lg:col-span-3 aspect-[4/5]"
                : "lg:col-span-4 aspect-[4/3]";

            return (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className={`group relative block overflow-hidden border border-ink/10 bg-charcoal shadow-[0_18px_40px_-20px_rgba(7,9,15,0.35)] transition-all hover:border-gold/40 ${span}`}
              >
                <Image
                  src={p.screenshot}
                  alt={`${p.name} — ${p.category}`}
                  fill
                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="glass-surface-deep absolute inset-x-0 bottom-0 p-5 text-white transition-colors group-hover:bg-ink/85">
                  <div className="flex items-center justify-between gap-2">
                    <p className="label text-gold">{p.category}</p>
                    <ArrowUpRight
                      className="h-4 w-4 text-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </div>
                  <h3 className="home-display mt-1.5 text-xl text-white sm:text-2xl">{p.name}</h3>
                  <p className="mt-1 line-clamp-1 text-xs text-white/70">{p.tagline}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
