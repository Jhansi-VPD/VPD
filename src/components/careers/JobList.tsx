"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, MapPin, Users, Clock } from "lucide-react";
import type { Job } from "@/types";
import { company } from "@/data/company";

interface FormState { name: string; email: string; phone: string }
type Errors = Partial<Record<keyof FormState, string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: FormState): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!emailRe.test(v.email)) e.email = "Please enter a valid email address.";
  if (v.phone.replace(/\D/g, "").length < 10) e.phone = "Please enter a valid phone number.";
  return e;
}

function ApplyForm({ job }: { job: Job }) {
  const [v, setV] = useState<FormState>({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const mailto = `mailto:${company.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`;

  if (done) {
    return (
      <div role="status" className="border border-gold/50 bg-gold/10 p-5 text-sm">
        <p className="font-semibold">Demo only — nothing has been sent or stored.</p>
        <p className="mt-1 text-ink/70">
          This form is not yet connected to a backend. To apply for <em>{job.title}</em>, please email your resume to{" "}
          <a href={mailto} className="font-semibold underline">{company.email}</a>.
        </p>
      </div>
    );
  }

  const field = (k: keyof FormState, label: string, type = "text", autoComplete?: string) => (
    <div>
      <label htmlFor={`${job.id}-${k}`} className="text-sm font-medium">{label}</label>
      <input
        id={`${job.id}-${k}`}
        type={type}
        autoComplete={autoComplete}
        value={v[k]}
        onChange={(e) => setV({ ...v, [k]: e.target.value })}
        aria-invalid={Boolean(errors[k])}
        aria-describedby={errors[k] ? `${job.id}-${k}-err` : undefined}
        className="mt-1.5 w-full border border-ink/20 bg-white/85 px-4 py-3 text-sm shadow-[inset_0_1px_2px_rgba(7,9,15,0.06)] outline-none backdrop-blur-sm transition-all focus:border-gold-deep focus:bg-white"
      />
      {errors[k] && <p id={`${job.id}-${k}-err`} className="mt-1 text-xs text-red-700">{errors[k]}</p>}
    </div>
  );

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const errs = validate(v);
        setErrors(errs);
        if (Object.keys(errs).length === 0) setDone(true); // TODO: connect to backend in a future phase
      }}
      className="grid gap-4 sm:grid-cols-3"
    >
      {field("name", "Full name", "text", "name")}
      {field("email", "Email", "email", "email")}
      {field("phone", "Phone", "tel", "tel")}
      <div className="flex flex-wrap items-center gap-4 sm:col-span-3">
        <button type="submit" className="gloss-dark bg-ink px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-gold hover:text-ink">
          Submit interest
        </button>
        <a href={mailto} className="text-sm font-semibold underline underline-offset-4 hover:text-gold-deep">Or email your resume</a>
      </div>
    </form>
  );
}

export default function JobList({ jobs }: { jobs: Job[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [dept, setDept] = useState("All");
  const reduce = useReducedMotion();
  const depts = useMemo(() => ["All", ...Array.from(new Set(jobs.map((j) => j.department)))], [jobs]);
  const shown = dept === "All" ? jobs : jobs.filter((j) => j.department === dept);

  return (
    <div>
      <div role="group" aria-label="Filter by department" className="flex flex-wrap gap-2">
        {depts.map((d) => (
          <button
            key={d}
            onClick={() => setDept(d)}
            aria-pressed={dept === d}
            className={`border px-4 py-2 text-sm transition-all ${dept === d ? "gloss-gold border-gold bg-gold text-ink" : "glass-light border-ink/15 hover:border-gold-deep"}`}
          >
            {d}
          </button>
        ))}
      </div>

      <ul className="mt-10 border-t border-ink/15">
        {shown.map((j) => {
          const open = openId === j.id;
          return (
            <li key={j.id} className="border-b border-ink/15">
              <button
                onClick={() => setOpenId(open ? null : j.id)}
                aria-expanded={open}
                aria-controls={`panel-${j.id}`}
                className="group grid w-full grid-cols-[1fr_auto] items-start gap-4 py-7 text-left md:grid-cols-[1.6fr_1fr_auto]"
              >
                <span>
                  <span className="label text-gold-deep">{j.department}</span>
                  <span className="display mt-2 block text-2xl transition-colors group-hover:text-gold-deep sm:text-3xl">{j.title}</span>
                </span>
                <span className="hidden flex-col gap-1.5 text-sm text-ink/65 md:flex">
                  <span className="flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden />{j.arrangement} · {j.location}</span>
                  <span className="flex items-center gap-2"><Clock className="h-4 w-4" aria-hidden />{j.type} · {j.experience}</span>
                  <span className="flex items-center gap-2 font-semibold text-ink"><Users className="h-4 w-4" aria-hidden />{j.openings} {j.openings === 1 ? "opening" : "openings"}</span>
                </span>
                <ChevronDown className={`mt-2 h-5 w-5 transition-transform duration-300 ${open ? "rotate-180 text-gold-deep" : ""}`} aria-hidden />
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`panel-${j.id}`}
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 pb-9 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
                      <div>
                        <p className="max-w-xl text-lg leading-relaxed text-ink/80">{j.description}</p>
                        <dl className="mt-6 grid max-w-md grid-cols-2 gap-x-6 gap-y-3 text-sm">
                          <dt className="text-ink/55">Location</dt><dd>{j.location}</dd>
                          <dt className="text-ink/55">Work arrangement</dt><dd>{j.arrangement}</dd>
                          <dt className="text-ink/55">Type</dt><dd>{j.type}</dd>
                          <dt className="text-ink/55">Experience</dt><dd>{j.experience}</dd>
                          <dt className="text-ink/55">Openings</dt><dd className="font-semibold">{j.openings}</dd>
                          <dt className="text-ink/55">Posted</dt><dd>{j.posted}</dd>
                        </dl>
                      </div>
                      <div className="glass-light p-6">
                        <p className="label text-gold-deep">Apply</p>
                        <p className="mb-5 mt-2 text-sm text-ink/65">Share your details, or email your resume to {company.email}.</p>
                        <ApplyForm job={j} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
