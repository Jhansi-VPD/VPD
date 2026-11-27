import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" aria-label="VPD Technologies — home" className="inline-flex items-center">
      <Image
        src="/images/brand/vpd-logo.png"
        alt="VPD Technologies"
        width={1024}
        height={512}
        priority
        className="h-10 w-auto sm:h-11"
      />
    </Link>
  );
}
