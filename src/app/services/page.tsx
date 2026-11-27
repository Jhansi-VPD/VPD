import type { Metadata } from "next";
import { services } from "@/data/services";
import PageHero from "@/components/shared/PageHero";
import DynamicServiceGallery from "@/components/services/DynamicServiceGallery";
import ServiceShowcase from "@/components/services/ServiceShowcase";
import { ButtonLink, Eyebrow, wrap } from "@/components/shared/ui";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Engineering Services",
  description:
    "Enterprise solutions, custom software, mobile apps, data engineering, cloud and DevOps, AI automation and UI/UX product engineering from VPD Technologies.",
  alternates: { canonical: "/services" },
};

const layouts = [
  { variant: "overlay" },
  { variant: "split-light" },
  { variant: "split-dark", flip: true },
  { variant: "overlay-right" },
  { variant: "split-light", flip: true },
  { variant: "overlay" },
  { variant: "split-dark" },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>Engineering solutions for <span className="text-gold">real business needs.</span></>}
        text="Seven service lines, one team that owns the result. Pick what you need, or bring us the problem and we'll shape the solution."
        image={img("servicesHero", 2400, 78)}
        imageAlt="Laptop with code on screen"
      >
        <ButtonLink href="/contact">Discuss your project</ButtonLink>
      </PageHero>

      <nav aria-label="Services index" className="border-y border-white/10 bg-ink">
        <ul className={`${wrap} scrollbar-none flex gap-6 overflow-x-auto py-4 text-sm`}>
          {services.map((s, i) => (
            <li key={s.slug} className="shrink-0">
              <a href={`#${s.slug}`} className="text-white/65 transition-colors hover:text-gold">
                <span className="mr-2 text-gold/70">0{i + 1}</span>{s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section aria-label="Interactive services overview" className="bg-ink text-white">
        <div className={`${wrap} py-16 lg:py-24`}>
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Capability matrix</Eyebrow>
              <h2 className="display mt-4 text-3xl sm:text-4xl lg:text-5xl">
                Seven disciplines. One cohesive architecture.
              </h2>
            </div>
            <p className="text-xs tracking-[0.16em] uppercase text-white/55">
              Hover or focus a tile to expand · Click to explore
            </p>
          </div>
          <DynamicServiceGallery />
        </div>
      </section>

      {services.map((s, i) => (
        <div key={s.slug} id={s.slug} className="scroll-mt-16">
          <ServiceShowcase service={s} index={i} {...layouts[i]} />
        </div>
      ))}

      <section className="bg-gold text-ink">
        <div className={`${wrap} flex flex-col items-start justify-between gap-6 py-16 sm:flex-row sm:items-center`}>
          <h2 className="display max-w-2xl text-4xl sm:text-5xl">Not sure which service fits? Tell us the problem.</h2>
          <ButtonLink href="/contact" variant="dark">Start a conversation</ButtonLink>
        </div>
      </section>
    </>
  );
}
