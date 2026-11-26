import { wrap } from "@/components/shared/ui";

interface Section { title: string; body: string }

export default function LegalPage({ title, intro, sections, liveUrl }: { title: string; intro: string; sections: Section[]; liveUrl: string }) {
  return (
    <>
      <section className="bg-ink pb-14 pt-40 text-white sm:pt-48">
        <div className={wrap}>
          <p className="label text-gold">Legal</p>
          <h1 className="display mt-6 text-5xl sm:text-7xl">{title}</h1>
          <p className="mt-6 max-w-xl text-white/70">{intro}</p>
        </div>
      </section>
      <section className="bg-white text-ink">
        <div className={`${wrap} max-w-4xl py-16 lg:py-24`}>
          <p className="mb-12 border border-gold/50 bg-gold/10 p-4 text-sm">
            This page is a plain-language summary. The full approved wording is published at{" "}
            <a href={liveUrl} className="font-semibold underline" target="_blank" rel="noopener noreferrer">{liveUrl.replace("https://", "")}</a>
            ; it should be copied here before launch.
          </p>
          <ol className="space-y-10">
            {sections.map((s, i) => (
              <li key={s.title} className="grid gap-3 border-t border-ink/15 pt-6 sm:grid-cols-[4rem_1fr]">
                <span className="label text-gold-deep">0{i + 1}</span>
                <div>
                  <h2 className="text-xl font-semibold">{s.title}</h2>
                  <p className="mt-2 text-ink/70">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
