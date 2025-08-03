"use client";

import { ButtonMenu } from "@/components/buttons/ButtonMenu";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import useScrollPosition from "@/hooks/ui/useScrollPosition";
import { cn } from "@/lib/utils";
import { TCategory } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Sidebar from "../../Sidebar";

type HeaderProps = {
  className?: string;
  categories?: TCategory[];
};

// Main Header Component
const TopHeader: React.FC<HeaderProps> = ({ className, categories }) => {
  const { scrollTop, scrollDirection } = useScrollPosition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Header styling based on scroll and page
  const headerClassName = cn(
    "text-foreground bg-card z-50 h-20 bg-transparent backdrop-blur-xs transition-all duration-300 ease-in-out",
    {
      "lg:-mt-20": scrollDirection === "down" && scrollTop > 80,
      "lg:mt-0": scrollDirection === "up" || scrollTop <= 80,
    },
    className,
  );

  return (
    <>
      <div className="overflow-hidden">
        <div>
          <div className="container grid h-full w-full grid-cols-3 items-center justify-between">
            <div className="flex items-center justify-start gap-4">
              <ButtonMenu
                isOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(true)}
              />
              <div className="hidden md:block">
                <span>
                  {new Date().toLocaleString("bn-BD", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <div className="">
              <Link href="/" aria-label="Home">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={96}
                  height={48}
                  className="mx-auto h-16 w-fit max-w-full rounded-full object-contain object-left"
                  priority
                />
              </Link>
            </div>
            <div className="flex items-center justify-end gap-4">
              <Link className="hidden md:block" href="/#">
                <Button
                  className="foreground"
                  size={"sm"}
                  asChild={true}
                  variant="outline"
                >
                  <span>আজকের সংবাদ</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Drawer isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}>
        <Drawer.Backdrop />
        <Drawer.Content className="flex h-screen w-80 max-w-[90vw] flex-col">
          <Sidebar
            categories={categories}
            onClose={() => setIsMenuOpen(false)}
          />
        </Drawer.Content>
      </Drawer>
    </>
  );
};

export default TopHeader;
