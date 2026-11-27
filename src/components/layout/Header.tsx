"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { industries } from "@/data/industries";
import { services } from "@/data/services";
import Logo from "./Logo";
import ImmersiveNavigation from "./ImmersiveNavigation";

type MenuKey = "services" | "industries" | "about" | null;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<MenuKey>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // The contact page has a light panel behind the header's right side, so keep the bar solid there.
  const solid = scrolled || pathname === "/contact";
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdown(null);
    };
    const onOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setDropdown(null);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutside);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutside);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "border-b border-white/15 bg-ink/75 py-3 shadow-[inset_0_-1px_0_rgba(255,255,255,0.06),0_12px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-14">
          <Logo />

          <nav
            ref={navRef}
            aria-label="Primary"
            className="hidden items-center gap-7 lg:flex"
            onMouseLeave={() => setDropdown(null)}
          >
            {/* Services dropdown */}
            <div className="relative" onMouseEnter={() => setDropdown("services")}>
              <button
                type="button"
                aria-expanded={dropdown === "services"}
                onClick={() => setDropdown((d) => (d === "services" ? null : "services"))}
                className="flex items-center gap-1.5 py-2 text-sm font-medium text-white/90 transition-colors hover:text-gold"
              >
                Services
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    dropdown === "services" ? "rotate-180 text-gold" : ""
                  }`}
                  aria-hidden
                />
              </button>
              {dropdown === "services" && (
                <div className="glass-surface-deep absolute left-0 top-full w-72 p-3">
                  <ul className="space-y-0.5">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          onClick={() => setDropdown(null)}
                          className="block px-3 py-2 text-sm text-white/80 transition-colors hover:bg-charcoal hover:text-gold"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/services"
                    onClick={() => setDropdown(null)}
                    className="mt-2 block border-t border-white/10 px-3 pt-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-gold hover:text-white"
                  >
                    All services →
                  </Link>
                </div>
              )}
            </div>

            {/* Industries dropdown */}
            <div className="relative" onMouseEnter={() => setDropdown("industries")}>
              <button
                type="button"
                aria-expanded={dropdown === "industries"}
                onClick={() => setDropdown((d) => (d === "industries" ? null : "industries"))}
                className="flex items-center gap-1.5 py-2 text-sm font-medium text-white/90 transition-colors hover:text-gold"
              >
                Industries
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    dropdown === "industries" ? "rotate-180 text-gold" : ""
                  }`}
                  aria-hidden
                />
              </button>
              {dropdown === "industries" && (
                <div className="glass-surface-deep absolute left-0 top-full w-72 p-3">
                  <ul className="space-y-0.5">
                    {industries.map((ind) => (
                      <li key={ind.slug}>
                        <Link
                          href={`/industries/${ind.slug}`}
                          onClick={() => setDropdown(null)}
                          className="block px-3 py-2 text-sm text-white/80 transition-colors hover:bg-charcoal hover:text-gold"
                        >
                          {ind.short}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/industries"
                    onClick={() => setDropdown(null)}
                    className="mt-2 block border-t border-white/10 px-3 pt-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-gold hover:text-white"
                  >
                    All industries →
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/products"
              onMouseEnter={() => setDropdown(null)}
              className={`py-2 text-sm font-medium transition-colors hover:text-gold ${
                pathname.startsWith("/products") ? "text-gold" : "text-white/90"
              }`}
            >
              Products
            </Link>

            {/* About dropdown */}
            <div className="relative" onMouseEnter={() => setDropdown("about")}>
              <button
                type="button"
                aria-expanded={dropdown === "about"}
                onClick={() => setDropdown((d) => (d === "about" ? null : "about"))}
                className="flex items-center gap-1.5 py-2 text-sm font-medium text-white/90 transition-colors hover:text-gold"
              >
                About
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    dropdown === "about" ? "rotate-180 text-gold" : ""
                  }`}
                  aria-hidden
                />
              </button>
              {dropdown === "about" && (
                <div className="glass-surface-deep absolute left-0 top-full w-56 p-3">
                  <ul className="space-y-0.5">
                    <li>
                      <Link
                        href="/about"
                        onClick={() => setDropdown(null)}
                        className="block px-3 py-2 text-sm text-white/80 transition-colors hover:bg-charcoal hover:text-gold"
                      >
                        About VPD
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about/leadership"
                        onClick={() => setDropdown(null)}
                        className="block px-3 py-2 text-sm text-white/80 transition-colors hover:bg-charcoal hover:text-gold"
                      >
                        Leadership
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/careers"
                        onClick={() => setDropdown(null)}
                        className="block px-3 py-2 text-sm text-white/80 transition-colors hover:bg-charcoal hover:text-gold"
                      >
                        Careers
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="gloss-gold hidden bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:bg-white sm:block"
            >
              Start a Conversation
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="gloss-ghost flex items-center gap-2 border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:border-gold hover:bg-white/12 hover:text-gold"
            >
              Menu <Menu className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <ImmersiveNavigation open={open} onClose={close} />
    </>
  );
}
