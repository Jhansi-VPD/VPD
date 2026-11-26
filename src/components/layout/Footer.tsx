import Link from "next/link";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { wrap } from "@/components/shared/ui";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className={`${wrap} grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:py-20`}>
        <div className="max-w-sm">
          <Logo />
          <p className="mt-6 text-sm leading-relaxed text-white/65">{company.intro}</p>
          <p className="label mt-6 text-gold">{company.tagline}</p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {company.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-white/75 transition-colors hover:text-gold">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label mb-5 text-mute">Services</p>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-white/75 transition-colors hover:text-gold">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label mb-5 text-mute">Industries</p>
          <ul className="space-y-2.5 text-sm">
            {industries.map((i) => (
              <li key={i.slug}>
                <Link href={`/industries/${i.slug}`} className="text-white/75 transition-colors hover:text-gold">{i.short}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label mb-5 text-mute">Company</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/about" className="text-white/75 hover:text-gold">About</Link></li>
            <li><Link href="/about/leadership" className="text-white/75 hover:text-gold">Leadership</Link></li>
            <li><Link href="/products" className="text-white/75 hover:text-gold">Products</Link></li>
            <li><Link href="/careers" className="text-white/75 hover:text-gold">Careers</Link></li>
            <li><Link href="/contact" className="text-white/75 hover:text-gold">Contact</Link></li>
          </ul>
          <div className="mt-8 space-y-1.5 text-sm text-white/65">
            <a href={company.phoneHref} className="block hover:text-gold">{company.phone}</a>
            <a href={`mailto:${company.email}`} className="block break-all hover:text-gold">{company.email}</a>
            <p>Kurnool, Andhra Pradesh, India</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className={`${wrap} flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between`}>
          <p>© 2026 {company.legalName}. All rights reserved.</p>
          <ul className="flex gap-5">
            <li><Link href="/privacy-policy" className="hover:text-gold">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-gold">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
