import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/data/industries";
import { getProduct } from "@/data/products";
import { services } from "@/data/services";
import Reveal from "@/components/shared/Reveal";
import IndustriesShowcase from "@/components/industries/IndustriesShowcase";
import { ButtonLink, Eyebrow, wrap } from "@/components/shared/ui";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Eight sectors VPD Technologies builds for: IT, BFSI, healthcare, edtech, retail, professional services, agritech and manufacturing.",
};

const bottomHighlights = [
  {
    href: "/services",
    title: "Engineering Services",
    subtitle: "Custom software, cloud architecture, UI/UX design, and AI engineering",
    image: "/images/industries/professional-services-02.jpg",
    alt: "VPD Technologies collaborative software engineering and architecture workspace",
  },
  {
    href: "/products",
    title: "In-House Platforms",
    subtitle: "Production software suites across HR, operations, healthcare, finance, and retail",
    image: "/images/industries/manufacturing-logistics-02.jpg",
    alt: "Enterprise logistics and industrial platform orchestration environment",
  },
];

export default function IndustriesPage() {
  return (
    <div className="bg-ink text-white">
      {/* Section 1: Bold Editorial Header leading immediately into Panel 1 */}
      <section className="bg-ink pb-4 pt-20 sm:pb-5 sm:pt-24 lg:pt-28">
        <div className={wrap}>
          <Reveal className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <Eyebrow>Industries</Eyebrow>
              <h1 className="display mt-2.5 text-[clamp(3rem,7.8vw,6.4rem)] font-extrabold leading-[0.88] tracking-[-0.035em] text-gold">
                Our Sectors.
              </h1>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/75 sm:text-base lg:pb-1">
              Eight industries, each with its own workflows. Software and platforms built around how your sector keeps moving.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Section 2: Stacked Full-Bleed Cinema Showcase with Sticky Countdown Index */}
      <IndustriesShowcase />

      {/* Section 3: 2-Up Editorial Feature Row (Matching Video Ending Section) */}
      <section className="border-t border-white/10 bg-[#14161c] py-10 sm:py-14">
        <div className={wrap}>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {bottomHighlights.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative aspect-[16/10] w-full overflow-hidden bg-ink focus-visible:outline-2 focus-visible:outline-gold sm:aspect-[16/9]"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/92 via-black/40 to-black/10"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h2 className="display text-2xl font-bold tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-gold sm:text-3xl lg:text-4xl">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 max-w-md text-xs leading-relaxed text-white/80 sm:text-sm">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Cross-Sector Platforms & Engineering Alignment Directory */}
      <section className="border-t border-white/10 bg-charcoal text-white">
        <div className={`${wrap} py-24 lg:py-28`}>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Platforms by sector</Eyebrow>
              <h2 className="display mt-6 text-3xl text-white sm:text-4xl lg:text-5xl">
                Built around real domain workflows.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
                Every sector connects directly to VPD&apos;s engineering services and in-house platforms without generic templates.
              </p>

              <div className="mt-10 border-t border-white/12 pt-8">
                <p className="label text-gold">Core engineering capabilities</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="glass-surface inline-block px-3 py-1.5 text-xs text-white/80 transition-colors hover:border-gold hover:text-gold"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <ol className="divide-y divide-white/12 border-y border-white/12 lg:col-span-7">
              {industries.map((ind, idx) => {
                const related = ind.productSlugs
                  .map((slug) => getProduct(slug))
                  .filter((p): p is NonNullable<typeof p> => Boolean(p));

                return (
                  <Reveal
                    as="li"
                    key={ind.slug}
                    delay={idx * 0.03}
                    className="grid gap-4 py-6 sm:grid-cols-[1.2fr_1fr_auto] sm:items-center sm:gap-6"
                  >
                    <div>
                      <span className="font-mono text-[11px] tracking-[0.2em] text-gold">0{idx + 1}</span>
                      <Link
                        href={`/industries/${ind.slug}`}
                        className="mt-1 block text-lg font-semibold text-white transition-colors hover:text-gold"
                      >
                        {ind.name}
                      </Link>
                      <p className="mt-1 text-sm text-white/60">{ind.blurb}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {related.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/products/${p.slug}`}
                          className="border border-white/15 bg-ink/60 px-2.5 py-1 text-xs text-white/80 transition-colors hover:border-gold hover:text-gold"
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>

                    <Link
                      href={`/industries/${ind.slug}`}
                      aria-label={`View ${ind.name}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/75 transition-colors hover:border-gold hover:bg-gold hover:text-ink"
                    >
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Section 5: Dark Architectural Closing CTA */}
      <section className="border-t border-white/10 bg-ink text-white">
        <div className={`${wrap} flex flex-col items-start justify-between gap-8 py-20 lg:flex-row lg:items-center lg:py-28`}>
          <div className="max-w-2xl">
            <Eyebrow>Work with VPD</Eyebrow>
            <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
              Looking for software built around your industry&apos;s workflows?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
              Share what your team operates on and we&apos;ll explore how VPD&apos;s engineering services or platforms fit.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="gold">
              Start a conversation
            </ButtonLink>
            <ButtonLink href="/products" variant="ghost">
              Explore all platforms
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
