import type { Metadata } from "next";
import { products } from "@/data/products";
import ProductsHero from "@/components/products/ProductsHero";
import ProductsHorizontalShowcase from "@/components/products/ProductsHorizontalShowcase";
import { ButtonLink, Eyebrow, wrap } from "@/components/shared/ui";

export const metadata: Metadata = {
  title: "Products & Platforms",
  description:
    "Explore the 18 software products and platforms built by VPD Technologies, including AgriFlow, ClikGett, Nexacargo and Medilink.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <ProductsHero products={products} />

      <ProductsHorizontalShowcase products={products} />

      <section id="closing-cta" className="relative overflow-hidden bg-charcoal text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_82%_50%,rgba(212,175,55,0.16),transparent_70%)]"
        />
        <div className={`${wrap} relative flex flex-col items-start justify-between gap-8 py-24 lg:flex-row lg:items-center lg:py-28`}>
          <div className="max-w-2xl">
            <Eyebrow>Build with VPD</Eyebrow>
            <h2 className="display mt-5 text-4xl sm:text-5xl lg:text-6xl">
              Thinking about adopting our platforms or commissioning custom software?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
              We&apos;ll talk through what you need in place, how it fits your operations and how a pilot or
              custom product engagement could work.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="gold">
              Talk to our team
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost">
              Explore services
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
