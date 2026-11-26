"use client";

import Image from "next/image";
import { useState } from "react";

interface PhotoProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Position of the focal point, e.g. "center 30%" */
  position?: string;
}

/**
 * Fill-mode image with a branded fallback if the remote image fails to load.
 * The parent must be `relative` and have a defined height / aspect ratio.
 */
export default function Photo({ src, alt, sizes = "100vw", priority, className = "", position }: PhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#2a2410,#0a0a0a_70%)] ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
