import { ButtonLink, wrap } from "@/components/shared/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[90svh] items-center bg-ink text-white">
      <div className={`${wrap} py-40`}>
        <p className="label text-gold">Error 404</p>
        <h1 className="display mt-6 text-[clamp(3.5rem,12vw,10rem)]">Page not <span className="text-gold">found.</span></h1>
        <p className="mt-6 max-w-md text-lg text-white/70">The page you were looking for has moved or doesn&apos;t exist.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">Contact us</ButtonLink>
        </div>
      </div>
    </section>
  );
}
