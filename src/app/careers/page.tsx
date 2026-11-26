import type { Metadata } from "next";
import { jobs, totalPositions, careersIntro } from "@/data/careers";
import { company } from "@/data/company";
import JobList from "@/components/careers/JobList";
import PageHero from "@/components/shared/PageHero";
import Photo from "@/components/shared/Photo";
import Reveal, { ImageReveal } from "@/components/shared/Reveal";
import { ButtonLink, Eyebrow, wrap } from "@/components/shared/ui";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Careers",
  description: `${jobs.length} open roles and ${totalPositions} positions at VPD Technologies in Kurnool, Andhra Pradesh, across engineering, QA, healthcare operations, HR and business development.`,
  alternates: { canonical: "/careers" },
};

const reasons = [
  { t: "Real engineering work", d: "Build software for web, mobile and enterprise use alongside the founders." },
  { t: "Freshers welcome", d: "Most roles are open to both freshers and experienced candidates." },
  { t: "Regionally rooted growth", d: "VPD is building high-quality jobs and engineering talent in Kurnool." },
  { t: "On-site collaboration", d: "All current roles are full-time and based at our Kurnool office." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={<>Build world-class engineering <span className="text-gold">from Kurnool.</span></>}
        text={careersIntro.text}
        image={img("careersHero", 2400, 78)}
        imageAlt="A team working together in an office"
      >
        <ButtonLink href="#openings">See {jobs.length} open roles</ButtonLink>
      </PageHero>

      {/* Culture */}
      <section className="bg-white text-ink">
        <div className={`${wrap} grid items-center gap-12 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-24 lg:py-28`}>
          <ImageReveal className="relative aspect-[4/3] overflow-hidden">
            <Photo src={img("careersTeam", 1600, 78)} alt="Colleagues collaborating at laptops" sizes="(min-width:1024px) 45vw, 100vw" />
          </ImageReveal>
          <Reveal>
            <Eyebrow tone="dark">Why VPD</Eyebrow>
            <h2 className="display mt-6 text-4xl sm:text-5xl">Grow with a company that&apos;s growing at home.</h2>
            <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {reasons.map((r) => (
                <li key={r.t} className="border-t border-ink/15 pt-4">
                  <h3 className="font-semibold">{r.t}</h3>
                  <p className="mt-1 text-sm text-ink/65">{r.d}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Openings */}
      <section id="openings" className="scroll-mt-16 bg-white text-ink">
        <div className={`${wrap} pb-20 lg:pb-32`}>
          <div className="flex flex-col justify-between gap-6 border-t border-ink pt-12 sm:flex-row sm:items-end">
            <div>
              <Eyebrow tone="dark">Open positions</Eyebrow>
              <h2 className="display mt-6 text-4xl sm:text-6xl">{jobs.length} roles. {totalPositions} positions.</h2>
            </div>
            <p className="max-w-xs text-sm text-ink/60">Kurnool, Andhra Pradesh · On-site</p>
          </div>
          <div className="mt-12">
            <JobList jobs={jobs} />
          </div>
        </div>
      </section>

      {/* Open door */}
      <section className="bg-ink text-white">
        <div className={`${wrap} flex flex-col items-start justify-between gap-8 py-20 lg:flex-row lg:items-center`}>
          <div className="max-w-2xl">
            <h2 className="display text-4xl sm:text-5xl">Don&apos;t see your exact role?</h2>
            <p className="mt-4 text-white/70">{careersIntro.open}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${company.email}`} variant="gold" external>Email {company.email}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
