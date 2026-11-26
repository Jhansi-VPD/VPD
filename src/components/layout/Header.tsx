"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import ImmersiveNavigation from "./ImmersiveNavigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // The contact page has a light panel behind the header's right side, so keep the bar solid there.
  const solid = scrolled || pathname === "/contact";
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? "bg-ink/90 py-3 backdrop-blur-md" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
          <Logo />
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden border border-gold px-5 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink sm:block"
            >
              Start a project
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="flex items-center gap-2 border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
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
