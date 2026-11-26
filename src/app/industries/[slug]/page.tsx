import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, getIndustry } from "@/data/industries";
import { getProduct } from "@/data/products";
import { services } from "@/data/services";
import PageHero from "@/components/shared/PageHero";
import Photo from "@/components/shared/Photo";
import Reveal from "@/components/shared/Reveal";
import { ButtonLink, Eyebrow, wrap } from "@/components/shared/ui";
import { img, type ImageName } from "@/lib/images";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return {
    title: ind.name,
    description: ind.blurb,
    alternates: { canonical: `/industries/${ind.slug}` },
  };
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const related = ind.productSlugs.map((s) => getProduct(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <PageHero
        compact
        eyebrow="Industry"
        title={ind.name}
        text={ind.blurb}
        image={img(ind.image as ImageName, 2400, 78)}
        imageAlt={`${ind.name} — illustrative photo`}
      >
        <ButtonLink href="/contact">Talk to us</ButtonLink>
        <ButtonLink href="/industries" variant="ghost">All industries</ButtonLink>
      </PageHero>

      <section className="bg-white text-ink">
        <div className={`${wrap} py-20 lg:py-28`}>
          <Eyebrow tone="dark">Platforms in this space</Eyebrow>
          <h2 className="display mt-6 max-w-3xl text-4xl sm:text-5xl">
            VPD products that relate to {ind.short}.
          </h2>
          <ul className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Reveal as="li" key={p.slug}>
                <Link href={`/products/${p.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
                    <Photo src={p.screenshot} alt={`${p.name} product preview`} sizes="(min-width:1024px) 30vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
                    <span className="label absolute left-4 top-4 bg-ink px-3 py-1.5 text-gold">{p.status}</span>
                  </div>
                  <h3 className="display mt-5 text-3xl group-hover:text-gold-deep">{p.name}</h3>
                  <p className="mt-2 text-ink/65">{p.tagline}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
          <p className="mt-12 max-w-xl text-sm text-ink/55">
            These are VPD&apos;s own products. We don&apos;t make claims about client engagements in this sector here; ask us what we can build for yours.
          </p>
        </div>
      </section>

      <section className="bg-charcoal text-white">
        <div className={`${wrap} py-20`}>
          <p className="label text-gold">Services that apply</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="block border border-white/20 px-4 py-2.5 text-sm transition-colors hover:border-gold hover:text-gold">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
