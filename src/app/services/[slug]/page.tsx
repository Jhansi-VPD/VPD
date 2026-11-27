import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, process } from "@/data/services";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import { ButtonLink, Eyebrow, wrap } from "@/components/shared/ui";
import { img, type ImageName } from "@/lib/images";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.summary,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.title} | VPD Technologies`, description: s.summary },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = services.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const s = services[idx];
  const next = services[(idx + 1) % services.length];

  return (
    <>
      <PageHero
        compact
        eyebrow={s.kicker}
        title={s.title}
        text={s.summary}
        image={img(s.image as ImageName, 2400, 78)}
        imageAlt={`${s.title} — illustrative photo`}
      >
        <ButtonLink href="/contact">Discuss this service</ButtonLink>
        <ButtonLink href="/services" variant="ghost">All services</ButtonLink>
      </PageHero>

      <section className="bg-white text-ink">
        <div className={`${wrap} grid gap-14 py-20 lg:grid-cols-[1fr_1fr] lg:gap-24 lg:py-28`}>
          <Reveal>
            <Eyebrow tone="dark">Overview</Eyebrow>
            <p className="display mt-6 text-3xl leading-tight sm:text-4xl lg:text-5xl">{s.detail}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label text-gold-deep">What&apos;s included</p>
            <ul className="mt-5 border-t border-ink/15">
              {s.capabilities.map((c, i) => (
                <li key={c} className="flex items-baseline gap-4 border-b border-ink/15 py-4">
                  <span className="label text-gold-deep">0{i + 1}</span>
                  <span className="text-lg font-semibold">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className={`${wrap} py-20 lg:py-28`}>
          <Eyebrow>How it&apos;s delivered</Eyebrow>
          <h2 className="display mt-6 max-w-3xl text-4xl sm:text-5xl">Every service follows the same seven-stage delivery.</h2>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.title} className="glass-surface p-6">
                <span className="label text-gold">0{i + 1}</span>
                <h3 className="mt-3 font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-white/65">{p.short}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Link href={`/services/${next.slug}`} className="group block bg-gold text-ink">
        <div className={`${wrap} flex items-center justify-between gap-6 py-14`}>
          <div>
            <p className="label">Next service</p>
            <h2 className="display mt-3 text-4xl transition-transform duration-300 group-hover:translate-x-2 sm:text-6xl">{next.title}</h2>
          </div>
          <span aria-hidden className="display text-6xl transition-transform duration-300 group-hover:translate-x-2">→</span>
        </div>
      </Link>
    </>
  );
}
