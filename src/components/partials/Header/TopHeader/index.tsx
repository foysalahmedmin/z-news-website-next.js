"use client";

import { Button } from "@/components/ui/Button";
import useScrollPosition from "@/hooks/ui/useScrollPosition";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

type HeaderProps = {
  className?: string;
};

// Custom hook for mobile menu
const useMobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? "hidden" : "auto";
      return newState;
    });
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  };
};

// Components
const Logo: React.FC = () => (
  <Link href="/" aria-label="Home">
    <Image
      src="/logo.png"
      alt="Logo"
      width={96}
      height={48}
      className="h-16 rounded-full object-contain object-left"
      priority
    />
  </Link>
);

const MenuButton: React.FC<{
  isOpen: boolean;
  onClick: () => void;
}> = ({ isOpen, onClick }) => (
  <button
    className="flex cursor-pointer flex-col space-y-1.5 focus:outline-none"
    onClick={onClick}
    aria-label={isOpen ? "Close menu" : "Open menu"}
    aria-expanded={isOpen}
  >
    <span
      className={cn(
        "bg-foreground h-0.5 w-6 transition-all duration-300 ease-in-out",
        isOpen && "translate-y-2 rotate-45",
      )}
    />
    <span
      className={cn(
        "bg-foreground h-0.5 w-6 transition-all duration-300 ease-in-out",
        isOpen && "opacity-0",
      )}
    />
    <span
      className={cn(
        "bg-foreground h-0.5 w-6 transition-all duration-300 ease-in-out",
        isOpen && "-translate-y-2 -rotate-45",
      )}
    />
  </button>
);

// Main Header Component
const TopHeader: React.FC<HeaderProps> = ({ className }) => {
  const { scrollTop, scrollDirection } = useScrollPosition();
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu();

  // Header styling based on scroll and page
  const headerClassName = cn(
    "text-foreground top-0 bg-card right-0 left-0 z-50 h-20 bg-transparent backdrop-blur-xs transition-all duration-300 ease-in-out",
    {
      "-mt-20": scrollDirection === "down" && scrollTop > 80,
      "mt-0": scrollDirection === "up" || scrollTop <= 80,
    },
    className,
  );

  return (
    <>
      <header className="sticky top-0 z-50 overflow-hidden">
        <div className={headerClassName}>
          <div className="container flex h-full items-center justify-between">
            <div className="flex items-center gap-4">
              <MenuButton
                isOpen={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              />
              <div>
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
            <Logo />
            <div className="flex items-center gap-4">
              <Link className="" href="/contact">
                <Button className="foreground" asChild={true} variant="outline">
                  <span>আজকের সংবাদ</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default TopHeader;
