"use client";

import useScrollPosition from "@/hooks/ui/useScrollPosition";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  const { scrollTop } = useScrollPosition();
  return (
    <Link
      href="/"
      className={cn("scale-0 opacity-0 transition-all duration-300", {
        "scale-100 opacity-100": scrollTop > 64,
      })}
    >
      <Image src="/logo.png" alt="Logo" width={64} height={32} />
    </Link>
  );
};

export default Logo;
