"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { company } from "@/data/company";

export const enquiryTypes = [
  "Enterprise Solutions",
  "Custom Software Engineering",
  "Mobile Application Development",
  "Data Engineering & Analytics",
  "Cloud & DevOps",
  "AI & Intelligent Automation",
  "UI/UX & Product Engineering",
  "B2B Logistics Platform Demonstration",
  "AgriFlow Deployment / Evaluation",
  "Enterprise Architecture Consulting",
  "General Enquiry",
];

const countryCodes = ["+91 (IN)", "+1 (US)", "+44 (GB)", "+971 (AE)", "+61 (AU)", "+65 (SG)", "+49 (DE)", "+33 (FR)", "+81 (JP)", "+966 (SA)"];

interface Values { name: string; email: string; company: string; code: string; phone: string; interest: string; message: string }
type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = { name: "", email: "", company: "", code: countryCodes[0], phone: "", interest: "", message: "" };
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!emailRe.test(v.email)) e.email = "Please enter a valid work email.";
  if (v.phone.replace(/\D/g, "").length < 7) e.phone = "Please enter a valid phone number.";
  if (!v.interest) e.interest = "Please choose what you're interested in.";
  if (v.message.trim().length < 10) e.message = "Please tell us a little more (at least 10 characters).";
  return e;
}

/**
 * Frontend-only form. `submitEnquiry` is the single place to connect a backend later
 * (API route, email service or CRM) without touching the UI.
 */
async function submitEnquiry(_values: Values): Promise<void> {
  // Intentionally empty: no backend in this phase.
}

export default function ContactForm() {
  const [v, setV] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    await submitEnquiry(v);
    setBusy(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="glass-light flex h-full flex-col justify-center border border-gold/45 p-8 text-ink sm:p-12">
        <CheckCircle2 className="h-10 w-10 text-gold-deep" aria-hidden />
        <h2 className="display mt-6 text-4xl">Thanks, {v.name.split(" ")[0]}.</h2>
        <p className="mt-4 text-ink/70">
          This form isn&apos;t connected to a live inbox yet, so your message has <strong>not</strong> been sent or saved. To reach the team right now:
        </p>
        <ul className="mt-5 space-y-1 text-sm font-semibold">
          <li><a href={`mailto:${company.email}`} className="underline underline-offset-4">{company.email}</a></li>
          <li><a href={company.phoneHref} className="underline underline-offset-4">{company.phone}</a></li>
        </ul>
        <button onClick={() => { setSent(false); setV(initial); }} className="mt-8 self-start text-sm font-semibold underline underline-offset-4 hover:text-gold-deep">
          Edit and review again
        </button>
      </div>
    );
  }

  const base = "mt-2 w-full border bg-white/85 px-4 py-3.5 text-sm text-ink shadow-[inset_0_1px_2px_rgba(7,9,15,0.06)] outline-none backdrop-blur-sm transition-all focus:border-gold-deep focus:bg-white";
  const cls = (k: keyof Values) => `${base} ${errors[k] ? "border-red-600" : "border-ink/25"}`;
  const err = (k: keyof Values) =>
    errors[k] ? <p id={`${k}-err`} className="mt-1.5 text-xs text-red-700">{errors[k]}</p> : null;
  const aria = (k: keyof Values) => ({ "aria-invalid": Boolean(errors[k]), "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form noValidate onSubmit={onSubmit} className="glass-light grid gap-5 p-6 text-ink sm:grid-cols-2 sm:p-10">
      <div>
        <label htmlFor="name" className="text-sm font-medium">Full name *</label>
        <input id="name" autoComplete="name" value={v.name} onChange={set("name")} className={cls("name")} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium">Work email *</label>
        <input id="email" type="email" autoComplete="email" value={v.email} onChange={set("email")} className={cls("email")} {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="company" className="text-sm font-medium">Company / organisation <span className="text-ink/45">(optional)</span></label>
        <input id="company" autoComplete="organization" value={v.company} onChange={set("company")} className={cls("company")} />
      </div>
      <div>
        <label htmlFor="phone" className="text-sm font-medium">Phone number *</label>
        <div className="flex gap-2">
          <select aria-label="Country code" value={v.code} onChange={set("code")} className={`${base} w-28 shrink-0 px-2`}>
            {countryCodes.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input id="phone" type="tel" autoComplete="tel-national" value={v.phone} onChange={set("phone")} className={cls("phone")} {...aria("phone")} />
        </div>
        {err("phone")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="interest" className="text-sm font-medium">Enquiry type / service interest *</label>
        <select id="interest" value={v.interest} onChange={set("interest")} className={cls("interest")} {...aria("interest")}>
          <option value="">Select one…</option>
          {enquiryTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
        {err("interest")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="text-sm font-medium">Project scope & requirements *</label>
        <textarea id="message" rows={5} value={v.message} onChange={set("message")} className={cls("message")} {...aria("message")} />
        {err("message")}
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={busy} className="gloss-dark bg-ink px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-gold hover:text-ink disabled:opacity-60">
          {busy ? "Sending…" : "Submit enquiry"}
        </button>
        <p className="text-xs text-ink/50">NDA available on request.</p>
      </div>
    </form>
  );
}
