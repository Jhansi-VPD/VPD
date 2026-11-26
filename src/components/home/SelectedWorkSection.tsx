import Link from "next/link";
import { products, featuredProductSlugs } from "@/data/products";
import Photo from "@/components/shared/Photo";
import Reveal from "@/components/shared/Reveal";
import { Eyebrow, TextLink, wrap } from "@/components/shared/ui";

export default function SelectedWorkSection() {
  const featured = featuredProductSlugs.map((s) => products.find((p) => p.slug === s)!);
  return (
    <section className="bg-white text-ink">
      <div className={`${wrap} pt-20 lg:pt-32`}>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal className="max-w-2xl">
            <Eyebrow tone="dark">Selected work</Eyebrow>
            <h2 className="display mt-6 text-4xl sm:text-5xl lg:text-7xl">Platforms we&apos;ve engineered.</h2>
          </Reveal>
          <TextLink href="/products">See all 18 platforms</TextLink>
        </div>
      </div>

      <div className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-20 sm:px-8 lg:mt-16 lg:gap-8 lg:px-14 lg:pb-32">
        {featured.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="group relative block w-[86vw] max-w-[760px] shrink-0 snap-center sm:w-[70vw] lg:w-[46vw]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
              <Photo
                src={p.screenshot}
                alt={`${p.name} product preview`}
                sizes="(min-width:1024px) 46vw, 86vw"
                className="transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <span className="label absolute left-5 top-5 bg-ink px-3 py-1.5 text-gold">{p.status}</span>
            </div>
            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <p className="label text-gold-deep">{p.category}</p>
                <h3 className="display mt-2 text-3xl">{p.name}</h3>
                <p className="mt-2 max-w-md text-ink/65">{p.tagline}</p>
              </div>
              <span className="mt-1 text-sm font-semibold underline-offset-4 group-hover:text-gold-deep group-hover:underline">View</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
