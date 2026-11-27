import type { Metadata } from "next";
import { company } from "@/data/company";
import Reveal from "@/components/shared/Reveal";
import { ButtonLink, Eyebrow, wrap } from "@/components/shared/ui";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Founders & Leadership",
  description:
    "Meet Sai Krishna Vuppala (Founder & CEO) and Ramcharan Gottipati (Co-Founder & Managing Director), who lead VPD Technologies from Kurnool.",
  alternates: { canonical: "/about/leadership" },
};

export default function LeadershipPage() {
  return (
    <>
      <section className="bg-ink pb-16 pt-40 text-white sm:pt-48">
        <div className={wrap}>
          <Eyebrow>Founders & leadership</Eyebrow>
          <h1 className="display mt-6 max-w-5xl text-[clamp(2.8rem,8vw,7.5rem)]">
            Two founders. <span className="text-gold">One accountable team.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/70">
            VPD is led by its founding team, who stay close to the work and focus on building technology capability, delivering software and supporting digital innovation from Kurnool.
          </p>
        </div>
      </section>

      {company.leaders.map((l, i) => {
        const dark = i % 2 === 0;
        return (
          <section key={l.name} className={dark ? "bg-charcoal text-white" : "bg-bone text-ink"}>
            <div className={`${wrap} grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:py-28 ${dark ? "" : "lg:[&>*:first-child]:order-2"}`}>
              {/* Monogram panel — no portrait photos have been supplied */}
              <Reveal>
                <div className={`relative flex aspect-[4/5] items-end overflow-hidden border border-white/14 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_24px_54px_-22px_rgba(0,0,0,0.65)] ${dark ? "bg-ink" : "bg-ink text-white"}`}>
                  <span aria-hidden className="display absolute right-4 top-2 text-[18rem] leading-none text-gold/15">
                    {l.name.split(" ").map((n) => n[0]).slice(0, 1)}
                  </span>
                  <div className="relative">
                    <p className="label text-gold">{l.role}</p>
                    <h2 className="display mt-3 text-4xl text-white sm:text-5xl">{l.name}</h2>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="self-center">
                <p className={`label ${dark ? "text-gold" : "text-gold-deep"}`}>Profile</p>
                <p className={`mt-4 text-xl leading-relaxed ${dark ? "text-white/85" : "text-ink/80"}`}>{l.bio}</p>
                <blockquote className={`mt-8 border-l-2 border-gold pl-6 text-lg italic ${dark ? "text-white/70" : "text-ink/70"}`}>
                  “{l.quote}”
                  <footer className="mt-2 text-sm not-italic text-gold">— {l.name}</footer>
                </blockquote>
                <p className="label mt-10 text-mute">Focus areas</p>
                <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                  {l.focus.map((f) => (
                    <li key={f} className={`border-t py-3 text-sm ${dark ? "border-white/15" : "border-ink/15"}`}>{f}</li>
                  ))}
                </ul>
                <p className={`mt-6 text-sm ${dark ? "text-white/55" : "text-ink/55"}`}>Background: {l.background}</p>
                <a
                  href={l.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
                >
                  Connect on LinkedIn <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="bg-white text-ink">
        <div className={`${wrap} py-20 lg:py-28`}>
          <Eyebrow tone="dark">Our commitments</Eyebrow>
          <div className="mt-10 grid gap-0 border-t border-ink/15 md:grid-cols-3">
            {company.commitments.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08} className="border-b border-ink/15 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
                <h3 className="display text-3xl">{c.title}</h3>
                <p className="mt-3 text-ink/65">{c.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="dark">Start a business enquiry</ButtonLink>
            <ButtonLink href={company.bookingUrl} variant="ghost-dark" external>Book an appointment</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
