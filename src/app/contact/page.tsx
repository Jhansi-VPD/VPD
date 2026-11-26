import type { Metadata } from "next";
import { company } from "@/data/company";
import ContactForm from "@/components/contact/ContactForm";
import Photo from "@/components/shared/Photo";
import { Eyebrow, wrap } from "@/components/shared/ui";
import { img } from "@/lib/images";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to VPD Technologies' engineering leadership about your project. Call +91 9963144498 or email info@vpdtechnologiespvtltd.com.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
      {/* Left: invitation + details */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 -z-10 opacity-30">
          <Photo src={img("contactHero", 1600, 60)} alt="" sizes="50vw" priority />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 to-ink" />
        <div className="flex h-full flex-col justify-between gap-14 px-5 pb-16 pt-36 sm:px-10 lg:px-14 lg:pt-44">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="display mt-6 text-[clamp(2.8rem,6vw,6rem)]">
              Let&apos;s talk about <span className="text-gold">what you&apos;re building.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-white/75">
              Skip the sales queue. Send us a message and one of our engineers will reply, usually within a few hours.
            </p>
          </div>

          <ul className="space-y-6 text-sm">
            <li className="flex gap-4">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
              <div><p className="label text-white/50">Phone</p><a href={company.phoneHref} className="text-lg hover:text-gold">{company.phone}</a></div>
            </li>
            <li className="flex gap-4">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
              <div><p className="label text-white/50">Email</p><a href={`mailto:${company.email}`} className="break-all text-lg hover:text-gold">{company.email}</a></div>
            </li>
            <li className="flex gap-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
              <div>
                <p className="label text-white/50">Headquarters</p>
                <address className="not-italic text-white/85">{company.address.join(", ")}</address>
                <p className="mt-1 text-white/55">Regional offices: {company.regionalOffices.join(", ")}</p>
                <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-gold underline underline-offset-4">Open in Google Maps</a>
              </div>
            </li>
            <li className="flex gap-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
              <div><p className="label text-white/50">Opening hours</p><p className="text-white/85">{company.hours}</p></div>
            </li>
          </ul>
        </div>
      </section>

      {/* Right: form */}
      <section className="bg-bone px-5 pb-16 pt-12 sm:px-10 lg:px-14 lg:pt-44">
        <div className="mx-auto max-w-2xl">
          <h2 className="display text-4xl text-ink">Submit an enquiry</h2>
          <p className="mb-8 mt-3 text-ink/65">Tell us about your milestone and project scope.</p>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
