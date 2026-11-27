import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import type { Product } from "@/types";
import { featuredProductSlugs } from "@/data/products";
import { ButtonLink, Eyebrow, wrap } from "@/components/shared/ui";

export default function ProductsHero({ products }: { products: Product[] }) {
  const productionCount = products.filter((p) => p.status === "Production").length;
  const stagingCount = products.filter((p) => p.status === "Staging").length;
  const devCount = products.filter((p) => p.status === "In Development").length;
  const previews = featuredProductSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  return (
    <section className="relative isolate overflow-hidden bg-ink pt-32 text-white sm:pt-36 lg:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_62%_55%_at_76%_35%,rgba(212,175,55,0.14),transparent_72%)]"
      />

      <div className={`${wrap} grid items-end gap-12 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24`}>
        <div>
          <Eyebrow>Products · {products.length} Platforms</Eyebrow>
          <h1 className="display mt-6 text-[clamp(2.9rem,6.8vw,6.4rem)] leading-[0.95] text-white">
            Engineering ideas into <span className="text-gold">digital products.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Platforms and intelligent systems built to simplify operations, connect people and power growth.
            Each carries its real status: {productionCount} in Production, {stagingCount} in Staging and{" "}
            {devCount} in Development.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#product-showcase"
              className="gloss-gold group inline-flex items-center gap-2.5 bg-gold px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-white"
            >
              Explore the showcase
              <ArrowDownRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                aria-hidden
              />
            </a>
            <ButtonLink href="/contact" variant="ghost">
              Enquire about a product
            </ButtonLink>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-2 text-xs text-white/60">
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
              <span className="label text-white/80">Scroll vertically to move horizontally</span>
            </div>
            <span className="hidden text-white/30 md:inline" aria-hidden>
              ·
            </span>
            <span className="hidden md:inline">Use ← / → keys or bottom markers to jump between spreads</span>
          </div>
        </div>

        {/* Softly masked atmospheric preview triptych without hard frames */}
        <div className="grid grid-cols-3 items-end gap-3 sm:gap-5">
          {previews.map((item, idx) => (
            <Link
              key={item.slug}
              href={`/products/${item.slug}`}
              className={`group relative block overflow-hidden transition-transform duration-500 hover:-translate-y-1.5 ${
                idx === 1 ? "translate-y-5 sm:translate-y-7" : idx === 2 ? "-translate-y-2 sm:-translate-y-4" : ""
              }`}
            >
              <div
                className="relative aspect-[9/15]"
                style={{
                  maskImage: "linear-gradient(to bottom, transparent 0%, black 14%, black 76%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 14%, black 76%, transparent 100%)",
                }}
              >
                <Image
                  src={item.screenshot}
                  alt={`${item.name} — ${item.category}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 16vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
              </div>
              <div className="relative z-10 -mt-12 px-2 pb-2 sm:px-3">
                <p className="font-mono text-[10px] font-semibold tracking-[0.2em] uppercase text-gold">
                  {String(products.findIndex((p) => p.slug === item.slug) + 1).padStart(2, "0")}
                </p>
                <p className="mt-0.5 truncate text-xs font-semibold text-white transition-colors group-hover:text-gold sm:text-sm">
                  {item.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
