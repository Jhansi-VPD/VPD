import Photo from "@/components/shared/Photo";
import Reveal from "@/components/shared/Reveal";
import { ButtonLink, wrap } from "@/components/shared/ui";
import { img } from "@/lib/images";

export default function FinalCTASection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10">
        <Photo src={img("ctaBg", 2000, 70)} alt="" sizes="100vw" />
        <div className="absolute inset-0 bg-ink/80" />
      </div>
      <div className={`${wrap} py-28 text-center lg:py-44`}>
        <Reveal>
          <p className="label text-gold">Let&apos;s talk</p>
          <h2 className="display mx-auto mt-6 max-w-5xl text-5xl sm:text-6xl lg:text-8xl">
            Have a challenge <span className="text-gold">worth solving?</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-white/75">
            Let&apos;s discuss how the right technology can move your business forward.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" variant="gold">Start a conversation</ButtonLink>
            <ButtonLink href="/services" variant="ghost">See what we build</ButtonLink>
          </div>
          <p className="mt-8 text-sm text-white/50">Message our engineers directly. Reply within 4 hours · NDA on request.</p>
        </Reveal>
      </div>
    </section>
  );
}
