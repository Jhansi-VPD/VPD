import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/data/company";
import { process } from "@/data/services";
import Photo from "@/components/shared/Photo";
import Reveal, { ImageReveal } from "@/components/shared/Reveal";
import { ButtonLink, Eyebrow, TextLink, wrap } from "@/components/shared/ui";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "About VPD Technologies",
  description:
    "VPD Technologies is a software and digital engineering company in Kurnool, Andhra Pradesh, led by its founders and focused on reliable delivery.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Editorial hero */}
      <section className="relative overflow-hidden bg-ink pb-0 pt-36 sm:pt-44">
        <div className={wrap}>
          <Eyebrow>About VPD</Eyebrow>
          <h1 className="display mt-6 text-[clamp(3rem,10vw,9.5rem)] text-white">
            Engineering <span className="text-gold">innovation.</span>
            <br />
            Empowering progress.
          </h1>
        </div>
        <div className={`${wrap} mt-14 grid items-end gap-8 lg:grid-cols-[1fr_1.6fr]`}>
          <p className="max-w-md pb-2 text-lg leading-relaxed text-white/75">
            VPD Technologies is a technology company headquartered in Kurnool, Andhra Pradesh. We build software products, enterprise applications and digital solutions that help organisations modernise operations and grow.
          </p>
          <div className="relative aspect-[16/8] overflow-hidden">
            <Photo src={img("aboutHero", 2000, 78)} alt="Modern, bright office workspace" priority sizes="(min-width:1024px) 60vw, 100vw" />
          </div>
        </div>
      </section>

      {/* Facts band */}
      <section className="bg-bone text-ink">
        <div className={`${wrap} grid gap-px py-0 sm:grid-cols-3`}>
          {[
            { v: "55+", l: "Completed projects", s: "Across web, enterprise and custom software" },
            { v: "12+", l: "Websites & web apps", s: "Production-ready platforms launched for clients" },
            { v: "6", l: "Delivery stages", s: "From discovery to support" },
          ].map((f, i) => (
            <Reveal key={f.l} delay={i * 0.08} className="border-b border-ink/10 py-10 sm:border-b-0 sm:border-r sm:px-8 sm:last:border-r-0 sm:first:pl-0">
              <span className="display text-6xl text-gold-deep">{f.v}</span>
              <p className="mt-2 font-semibold">{f.l}</p>
              <p className="text-sm text-ink/60">{f.s}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Vision / Purpose / Delivery */}
      <section className="bg-charcoal text-white">
        <div className={`${wrap} py-20 lg:py-32`}>
          <Reveal className="max-w-3xl">
            <Eyebrow>Philosophy</Eyebrow>
            <h2 className="display mt-6 text-4xl sm:text-5xl lg:text-7xl">Vision. Purpose. Delivery.</h2>
          </Reveal>
          <div className="mt-16 grid gap-0 border-t border-white/15 lg:grid-cols-3">
            {company.philosophy.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className="border-b border-white/15 py-10 lg:border-b-0 lg:border-r lg:px-8 lg:py-12 lg:first:pl-0 lg:last:border-r-0">
                <span className="label text-gold">0{i + 1}</span>
                <h3 className="display mt-4 text-5xl text-white">{p.title}</h3>
                <p className="mt-5 max-w-xs text-white/70">{p.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="label text-gold">Our vision</p>
              <p className="display mt-4 text-2xl leading-tight sm:text-3xl">{company.vision}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="label text-gold">Our mission</p>
              <p className="display mt-4 text-2xl leading-tight sm:text-3xl">{company.mission}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Split: team image + delivery approach */}
      <section className="bg-white text-ink">
        <div className={`${wrap} grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-24 lg:py-32`}>
          <ImageReveal className="relative aspect-[4/5] overflow-hidden">
            <Photo src={img("aboutTeam", 1400, 78)} alt="A team collaborating around laptops" sizes="(min-width:1024px) 45vw, 100vw" />
          </ImageReveal>
          <Reveal>
            <Eyebrow tone="dark">How we work</Eyebrow>
            <h2 className="display mt-6 text-4xl sm:text-5xl">Every good product starts by understanding the problem.</h2>
            <ol className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {process.map((s, i) => (
                <li key={s.title} className="flex items-baseline gap-5 py-3.5">
                  <span className="label w-6 text-gold-deep">{i + 1}</span>
                  <span className="font-semibold">{s.title}</span>
                  <span className="ml-auto hidden text-sm text-ink/55 sm:block">{s.short}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Leadership teaser */}
      <section className="bg-ink text-white">
        <div className={`${wrap} py-20 lg:py-28`}>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Leadership</Eyebrow>
              <h2 className="display mt-6 text-4xl sm:text-5xl lg:text-6xl">Leadership with a shared purpose.</h2>
            </div>
            <TextLink href="/about/leadership" light>Meet the founders</TextLink>
          </div>
          <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-2">
            {company.leaders.map((l) => (
              <Link key={l.name} href="/about/leadership" className="group bg-ink p-8 transition-colors hover:bg-charcoal sm:p-12">
                <p className="label text-gold">{l.role}</p>
                <h3 className="display mt-4 text-4xl transition-colors group-hover:text-gold sm:text-5xl">{l.name}</h3>
                <p className="mt-4 max-w-sm text-white/60">{l.focus.slice(0, 2).join(" · ")}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-bone text-ink">
        <div className={`${wrap} grid gap-10 py-20 lg:grid-cols-[1fr_1fr] lg:py-28`}>
          <Reveal>
            <Eyebrow tone="dark">Where we are</Eyebrow>
            <h2 className="display mt-6 text-4xl sm:text-5xl">Rooted in Kurnool, building for the world.</h2>
            <p className="mt-6 max-w-md text-ink/70">
              We are building digital engineering capability from Kurnool, Andhra Pradesh, training local talent and showing that high-quality software can come from anywhere.
            </p>
            <div className="mt-8"><ButtonLink href="/contact" variant="dark">Get in touch</ButtonLink></div>
          </Reveal>
          <Reveal delay={0.1} className="self-center">
            <address className="border border-ink/15 bg-white p-8 not-italic">
              {company.address.map((l, i) => (
                <p key={l} className={i === 0 ? "font-semibold" : "text-ink/70"}>{l}</p>
              ))}
              <p className="label mt-6 text-gold-deep">Regional offices</p>
              <p className="mt-1 text-ink/70">{company.regionalOffices.join(" · ")}</p>
              <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm font-semibold underline underline-offset-4 hover:text-gold-deep">
                Open in Google Maps
              </a>
            </address>
          </Reveal>
        </div>
      </section>
    </>
  );
}
