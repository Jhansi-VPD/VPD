import { whatWeDo } from "@/data/services";
import Photo from "@/components/shared/Photo";
import Reveal, { ImageReveal } from "@/components/shared/Reveal";
import { Eyebrow, wrap } from "@/components/shared/ui";
import { img, type ImageName } from "@/lib/images";

export default function WhatWeDoSection() {
  return (
    <section className="bg-white text-ink">
      <div className={`${wrap} py-20 lg:py-32`}>
        <Reveal className="max-w-3xl">
          <Eyebrow tone="dark">What we do</Eyebrow>
          <h2 className="display mt-6 text-4xl sm:text-5xl lg:text-7xl">
            Digital solutions built around <span className="text-gold-deep">real business needs.</span>
          </h2>
        </Reveal>

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
          {whatWeDo.map((item, i) => {
            const flip = i % 2 === 1;
            const wide = i % 3 === 0;
            return (
              <article
                key={item.title}
                className={`grid items-center gap-8 lg:gap-16 ${wide ? "lg:grid-cols-[1.35fr_1fr]" : "lg:grid-cols-[1fr_1.1fr]"}`}
              >
                <ImageReveal className={`relative overflow-hidden ${wide ? "aspect-[16/10]" : "aspect-[4/3]"} ${flip ? "lg:order-2" : ""}`}>
                  <Photo
                    src={img(item.image as ImageName, 1600, 78)}
                    alt={`${item.title} — illustrative photo`}
                    sizes="(min-width:1024px) 55vw, 100vw"
                    className="transition-transform duration-[1200ms] hover:scale-105"
                  />
                </ImageReveal>
                <Reveal className={flip ? "lg:order-1 lg:pr-8" : "lg:pl-8"}>
                  <span className="label text-gold-deep">0{i + 1} / 05</span>
                  <h3 className="display mt-4 text-3xl sm:text-4xl lg:text-5xl">{item.title}</h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">{item.text}</p>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
