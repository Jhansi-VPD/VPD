import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/data/industries";
import PageHero from "@/components/shared/PageHero";
import Photo from "@/components/shared/Photo";
import Reveal, { ImageReveal } from "@/components/shared/Reveal";
import { wrap } from "@/components/shared/ui";
import { img, type ImageName } from "@/lib/images";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "VPD Technologies builds software for IT, BFSI, healthcare, education, retail, professional services, agriculture, manufacturing and logistics.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>Software for the sectors that <span className="text-gold">keep things moving.</span></>}
        text="Eight industries, each with its own workflows. Explore how our platforms and services fit."
        image={img("indLogistics", 2400, 75)}
        imageAlt="Warehouse interior with shelving"
      />

      <section className="bg-bone text-ink">
        <div className={`${wrap} py-20 lg:py-28`}>
          <ul className="grid gap-x-8 gap-y-14 md:grid-cols-12">
            {industries.map((ind, i) => {
              // Asymmetric rhythm: alternate wide / narrow / offset
              const spans = ["md:col-span-7", "md:col-span-5 md:mt-24", "md:col-span-5", "md:col-span-7 md:mt-24"];
              const aspect = i % 4 === 0 || i % 4 === 3 ? "aspect-[16/10]" : "aspect-[4/5]";
              return (
                <li key={ind.slug} className={spans[i % 4]}>
                  <Link href={`/industries/${ind.slug}`} className="group block">
                    <ImageReveal className={`relative overflow-hidden ${aspect}`}>
                      <Photo src={img(ind.image as ImageName, 1400, 75)} alt={`${ind.name} — illustrative photo`} sizes="(min-width:768px) 55vw, 100vw" className="transition-transform duration-[1200ms] group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                      <span className="label absolute left-5 top-5 bg-ink px-3 py-1.5 text-gold">0{i + 1}</span>
                    </ImageReveal>
                    <Reveal className="mt-5 flex items-start justify-between gap-6">
                      <div>
                        <h2 className="display text-3xl sm:text-4xl">{ind.name}</h2>
                        <p className="mt-2 max-w-md text-ink/65">{ind.blurb}</p>
                      </div>
                      <ArrowUpRight className="mt-2 h-6 w-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold-deep" aria-hidden />
                    </Reveal>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
