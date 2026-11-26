import Link from "next/link";
import { getProduct, products } from "@/data/products";
import Photo from "@/components/shared/Photo";
import Reveal, { ImageReveal } from "@/components/shared/Reveal";
import { ButtonLink, Eyebrow, wrap } from "@/components/shared/ui";

export default function ProductsSection() {
  const lead = getProduct("agriflow")!;
  const others = ["clikgett", "nexacargo", "medilink"].map((s) => getProduct(s)!);
  const prod = products.filter((p) => p.status === "Production").length;

  return (
    <section className="bg-charcoal text-white">
      <div className={`${wrap} py-20 lg:py-32`}>
        <Reveal className="max-w-3xl">
          <Eyebrow>Products</Eyebrow>
          <h2 className="display mt-6 text-4xl sm:text-5xl lg:text-7xl">Our own platforms, built in-house.</h2>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            {products.length} products and platforms across agriculture, logistics, healthcare, finance and more. {prod} are in production today; the rest are in staging or development.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <Link href={`/products/${lead.slug}`} className="group block">
            <ImageReveal className="relative aspect-[16/10] overflow-hidden bg-ink">
              <Photo src={lead.screenshot} alt={`${lead.name} product preview`} sizes="(min-width:1024px) 60vw, 100vw" className="transition-transform duration-[1200ms] group-hover:scale-105" />
              <span className="label absolute left-5 top-5 bg-gold px-3 py-1.5 text-ink">{lead.status}</span>
            </ImageReveal>
            <p className="label mt-6 text-gold">{lead.category}</p>
            <h3 className="display mt-2 text-4xl sm:text-5xl">{lead.name}</h3>
            <p className="mt-3 max-w-lg text-white/70">{lead.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {lead.capabilities.map((c) => (
                <li key={c} className="border border-white/20 px-3 py-1.5 text-xs text-white/80">{c}</li>
              ))}
            </ul>
          </Link>

          <ul className="flex flex-col justify-between gap-6">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="group grid grid-cols-[120px_1fr] gap-5 border-t border-white/15 pt-6 sm:grid-cols-[160px_1fr]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                    <Photo src={p.screenshot} alt={`${p.name} product preview`} sizes="160px" className="transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div>
                    <p className="label text-gold">{p.status}</p>
                    <h3 className="mt-1 text-xl font-semibold transition-colors group-hover:text-gold">{p.name}</h3>
                    <p className="mt-1 text-sm text-white/60">{p.tagline}</p>
                  </div>
                </Link>
              </li>
            ))}
            <li><ButtonLink href="/products" variant="gold">Explore all products</ButtonLink></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
