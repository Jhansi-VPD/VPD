import type { Metadata } from "next";
import Link from "next/link";
import { products, statusOrder } from "@/data/products";
import PageHero from "@/components/shared/PageHero";
import Photo from "@/components/shared/Photo";
import Reveal, { ImageReveal } from "@/components/shared/Reveal";
import { ButtonLink, Eyebrow, wrap } from "@/components/shared/ui";
import { img } from "@/lib/images";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Products & Platforms",
  description:
    "Explore the 18 software products and platforms built by VPD Technologies, including AgriFlow, ClikGett, Nexacargo and Medilink.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const production = products.filter((p) => p.status === "Production");
  const staging = products.filter((p) => p.status === "Staging");
  const dev = products.filter((p) => p.status === "In Development");

  return (
    <>
      <PageHero
        eyebrow="Products"
        title={<>Engineering ideas into <span className="text-gold">digital products.</span></>}
        text="Platforms and intelligent systems built to simplify operations, connect people and power growth. Each carries its real status: Production, Staging or In Development."
        image={img("heroCode", 2400, 78)}
        imageAlt="Code on a dark screen"
      >
        <ButtonLink href="/contact">Enquire about a product</ButtonLink>
      </PageHero>

      {/* Production: large alternating showcases */}
      {production.map((p, i) => {
        const dark = i % 2 === 0;
        return (
          <section key={p.slug} className={dark ? "bg-charcoal text-white" : "bg-white text-ink"}>
            <div className={`${wrap} grid items-center gap-10 py-20 lg:grid-cols-[1.3fr_1fr] lg:gap-20 lg:py-28`}>
              <Link href={`/products/${p.slug}`} className={`group block ${i % 2 ? "lg:order-2" : ""}`}>
                <ImageReveal className="relative aspect-[16/10] overflow-hidden bg-ink">
                  <Photo src={p.screenshot} alt={`${p.name} product preview`} sizes="(min-width:1024px) 55vw, 100vw" className="transition-transform duration-[1200ms] group-hover:scale-105" />
                  <span className="label absolute left-5 top-5 bg-gold px-3 py-1.5 text-ink">{p.status}</span>
                </ImageReveal>
              </Link>
              <Reveal>
                <p className={`label ${dark ? "text-gold" : "text-gold-deep"}`}>{p.category}</p>
                <h2 className="display mt-4 text-5xl sm:text-6xl">{p.name}</h2>
                <p className={`mt-5 text-lg ${dark ? "text-white/75" : "text-ink/70"}`}>{p.description}</p>
                <ul className={`mt-8 border-t ${dark ? "border-white/15" : "border-ink/15"}`}>
                  {p.capabilities.map((c) => (
                    <li key={c} className={`flex gap-3 border-b py-3 text-sm ${dark ? "border-white/15" : "border-ink/15"}`}>
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-gold" aria-hidden /> {c}
                    </li>
                  ))}
                </ul>
                <p className={`mt-5 text-xs ${dark ? "text-white/50" : "text-ink/50"}`}>{p.stack.join(" · ")}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={`/products/${p.slug}`} variant={dark ? "gold" : "dark"}>Explore {p.name}</ButtonLink>
                  <ButtonLink href="/contact" variant={dark ? "ghost" : "ghost-dark"}>Enquire now</ButtonLink>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* Staging: gallery grid */}
      <section className="bg-bone text-ink">
        <div className={`${wrap} py-20 lg:py-28`}>
          <Eyebrow tone="dark">In staging · {staging.length}</Eyebrow>
          <h2 className="display mt-6 max-w-3xl text-4xl sm:text-5xl">Built and being proven before wider release.</h2>
          <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {staging.map((p) => (
              <Reveal as="li" key={p.slug}>
                <Link href={`/products/${p.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                    <Photo src={p.screenshot} alt={`${p.name} product preview`} sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="label mt-4 text-gold-deep">{p.category}</p>
                  <h3 className="mt-1 flex items-center gap-2 text-xl font-semibold group-hover:text-gold-deep">
                    {p.name}
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </h3>
                  <p className="mt-1 text-sm text-ink/65">{p.tagline}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* In development */}
      <section className="bg-ink text-white">
        <div className={`${wrap} py-20 lg:py-28`}>
          <Eyebrow>In development · {dev.length}</Eyebrow>
          <h2 className="display mt-6 max-w-3xl text-4xl sm:text-5xl">Coming next.</h2>
          <ul className="mt-12 border-t border-white/15">
            {dev.map((p) => (
              <li key={p.slug} className="border-b border-white/15">
                <Link href={`/products/${p.slug}`} className="group grid items-center gap-4 py-7 md:grid-cols-[1fr_1.4fr_auto]">
                  <h3 className="display text-3xl transition-colors group-hover:text-gold sm:text-4xl">{p.name}</h3>
                  <p className="text-white/65">{p.tagline}</p>
                  <span className="label text-gold">{p.category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-gold text-ink">
        <div className={`${wrap} flex flex-col items-start justify-between gap-6 py-16 sm:flex-row sm:items-center`}>
          <div className="max-w-2xl">
            <h2 className="display text-4xl sm:text-5xl">Thinking about using our tools at your company?</h2>
            <p className="mt-4 text-ink/75">
              We&apos;ll talk through what you&apos;d need in place, how it fits your setup and how a pilot could work. B2B Logistics Platform demonstrations and AgriFlow evaluations can be requested through the contact form.
            </p>
          </div>
          <ButtonLink href="/contact" variant="dark">Talk to our team</ButtonLink>
        </div>
      </section>
    </>
  );
}
