import Photo from "@/components/shared/Photo";
import { Eyebrow, wrap } from "@/components/shared/ui";
import type { ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  /** compact heroes for detail pages */
  compact?: boolean;
}

export default function PageHero({ eyebrow, title, text, image, imageAlt = "", children, compact }: Props) {
  return (
    <section className={`relative isolate flex items-end overflow-hidden bg-ink ${compact ? "min-h-[62svh]" : "min-h-[78svh]"}`}>
      {image && (
        <div className="absolute inset-0 -z-10">
          <div className="drift absolute inset-0">
            <Photo src={image} alt={imageAlt} priority sizes="100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent" />
        </div>
      )}
      <div className={`${wrap} pb-16 pt-36 sm:pb-20`}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display mt-6 max-w-6xl text-[clamp(2.6rem,7.4vw,6.8rem)] text-white">{title}</h1>
        {text && <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">{text}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
