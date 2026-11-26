import { company } from "@/data/company";
import Reveal from "@/components/shared/Reveal";
import { Eyebrow, wrap } from "@/components/shared/ui";

export default function WhyVPDSection() {
  return (
    <section className="bg-white text-ink">
      <div className={`${wrap} py-20 lg:py-32`}>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.4fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <Eyebrow tone="dark">Why VPD</Eyebrow>
              <h2 className="display mt-6 text-4xl sm:text-5xl lg:text-6xl">
                A partner who understands the problem, not just the code.
              </h2>
              <p className="mt-6 max-w-sm text-lg text-ink/65">
                Clear communication, proven technology and full responsibility for what we deliver.
              </p>
            </Reveal>
          </div>

          <ol>
            {company.whyVPD.map((w, i) => (
              <Reveal as="li" key={w.title} delay={0.04} className="group grid grid-cols-[3.5rem_1fr] gap-4 border-t border-ink/15 py-8 first:border-t-0 first:pt-0 sm:grid-cols-[5rem_1fr] sm:py-10">
                <span className="display text-4xl text-gold-deep/60 transition-colors group-hover:text-gold-deep sm:text-5xl">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold sm:text-2xl">{w.title}</h3>
                  <p className="mt-2 max-w-lg text-ink/65">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
