"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { bigLinks, navGroups } from "@/data/navigation";
import { company } from "@/data/company";
import Logo from "./Logo";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ImmersiveNavigation({ open, onClose }: Props) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[60] overflow-y-auto bg-ink/95 text-white backdrop-blur-2xl"
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="mx-auto flex min-h-full max-w-[1440px] flex-col px-5 pb-10 pt-5 sm:px-8 lg:px-14">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                ref={closeRef}
                onClick={onClose}
                className="gloss-ghost flex items-center gap-2 border border-white/20 px-4 py-2.5 text-sm font-semibold transition-all hover:border-gold hover:bg-white/12 hover:text-gold"
              >
                Close <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="grid flex-1 gap-12 py-10 lg:grid-cols-[1.4fr_1fr] lg:py-16">
              <nav aria-label="Primary">
                <ul className="space-y-1 sm:space-y-2">
                  {bigLinks.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={reduce ? false : { opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={l.href}
                        onClick={onClose}
                        className="group flex items-baseline gap-4 py-1 sm:gap-6"
                      >
                        <span className="label w-8 text-gold/70">0{i + 1}</span>
                        <span className="display text-5xl transition-all duration-300 group-hover:translate-x-3 group-hover:text-gold sm:text-6xl lg:text-7xl">
                          {l.label}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                className="flex flex-col justify-between gap-10 border-white/10 lg:border-l lg:pl-12"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="grid grid-cols-2 gap-8">
                  {navGroups.slice(0, 2).map((g) => (
                    <div key={g.title}>
                      <p className="label mb-4 text-mute">{g.title}</p>
                      <ul className="space-y-2.5">
                        {g.links.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} onClick={onClose} className="text-sm text-white/85 transition-colors hover:text-gold">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="label mb-3 text-mute">Start a project</p>
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="gloss-gold group inline-flex items-center gap-3 bg-gold px-6 py-4 text-sm font-semibold text-ink transition-all hover:bg-white"
                  >
                    Start a conversation
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
                  </Link>
                  <div className="mt-6 space-y-1 text-sm text-white/70">
                    <a href={company.phoneHref} className="block hover:text-gold">{company.phone}</a>
                    <a href={`mailto:${company.email}`} className="block break-all hover:text-gold">{company.email}</a>
                    <p>Kurnool, Andhra Pradesh, India</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
