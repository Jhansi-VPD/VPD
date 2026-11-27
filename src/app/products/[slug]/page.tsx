import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/data/products";
import Photo from "@/components/shared/Photo";
import Reveal from "@/components/shared/Reveal";
import { ButtonLink, Eyebrow, wrap } from "@/components/shared/ui";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.category}`,
    description: p.tagline,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: `${p.name} | VPD Technologies`, description: p.tagline },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = products.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = products[idx];
  const next = products[(idx + 1) % products.length];

  return (
    <>
      <section className="bg-ink pb-16 pt-40 text-white sm:pt-48">
        <div className={wrap}>
          <Link href="/products" className="text-sm text-white/60 hover:text-gold">← All products</Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="label bg-gold px-3 py-1.5 text-ink">{p.status}</span>
            <span className="label text-gold">{p.category}</span>
          </div>
          <h1 className="display mt-6 text-[clamp(3rem,9vw,8rem)]">{p.name}</h1>
          <p className="mt-6 max-w-2xl text-xl text-white/75">{p.tagline}</p>
        </div>
        <div className={`${wrap} mt-14`}>
          <div className="relative aspect-[16/9] overflow-hidden border border-white/15 bg-charcoal shadow-[0_28px_64px_-22px_rgba(0,0,0,0.8)]">
            <Photo src={p.screenshot} alt={`${p.name} product preview`} priority sizes="(min-width:1440px) 1300px, 100vw" />
          </div>
          <p className="mt-3 text-xs text-white/40">Preview image as published on the existing VPD website.</p>
        </div>
      </section>

      <section className="bg-white text-ink">
        <div className={`${wrap} grid gap-14 py-20 lg:grid-cols-[1fr_1fr] lg:gap-24 lg:py-28`}>
          <Reveal>
            <Eyebrow tone="dark">What it does</Eyebrow>
            <p className="display mt-6 text-3xl leading-tight sm:text-4xl">{p.description}</p>
            <p className="label mt-10 text-gold-deep">Built with</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <li key={t} className="glass-light px-3 py-1.5 text-sm">{t}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label text-gold-deep">Key capabilities</p>
            <ul className="mt-5 border-t border-ink/15">
              {p.capabilities.map((c, i) => (
                <li key={c} className="flex items-baseline gap-4 border-b border-ink/15 py-5">
                  <span className="label text-gold-deep">0{i + 1}</span>
                  <span className="text-lg font-semibold">{c}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="dark">Enquire now</ButtonLink>
              <ButtonLink href="/products" variant="ghost-dark">All products</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <Link href={`/products/${next.slug}`} className="group block bg-charcoal text-white">
        <div className={`${wrap} flex items-center justify-between gap-6 py-14`}>
          <div>
            <p className="label text-gold">Next product</p>
            <h2 className="display mt-3 text-4xl transition-transform duration-300 group-hover:translate-x-2 sm:text-6xl">{next.name}</h2>
          </div>
          <span aria-hidden className="display text-6xl text-gold">→</span>
        </div>
      </Link>
    </>
  );
}
