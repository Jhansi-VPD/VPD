import { company } from "@/data/company";
import Reveal from "@/components/shared/Reveal";
import { Eyebrow, wrap } from "@/components/shared/ui";

export default function TrustSection() {
  return (
    <section id="trust" className="bg-bone text-ink">
      <div className={`${wrap} py-20 lg:py-28`}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
          <Reveal>
            <Eyebrow tone="dark">Why trust VPD</Eyebrow>
            <h2 className="display mt-6 text-4xl sm:text-5xl lg:text-6xl">
              Led by founders. Owned from first call to launch.
            </h2>
          </Reveal>

          <dl className="grid grid-cols-2 border-l border-t border-ink/15">
            {company.trust.map((t, i) => (
              <Reveal key={t.label} delay={i * 0.08} className="border-b border-r border-ink/15 p-6 sm:p-9">
                <dt className="sr-only">{t.label}</dt>
                <dd>
                  <span className={`display block text-4xl sm:text-5xl lg:text-6xl ${i === 0 ? "text-gold-deep" : ""}`}>{t.value}</span>
                  <span className="mt-3 block text-sm text-ink/65">{t.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
