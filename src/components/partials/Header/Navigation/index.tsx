import { cn } from "@/lib/utils";
import { TCategory } from "@/types/category.type";
import Image from "next/image";
import React from "react";
import Categories from "./Categories";
import Search from "./Search";

type NavigationProps = {
  className?: string;
  categories?: TCategory[];
};

const Navigation: React.FC<NavigationProps> = async ({
  className,
  categories,
}) => {
  return (
    <nav
      className={cn(
        "bg-card text-card-foreground sticky top-0 z-50 hidden md:block",
        className,
      )}
    >
      <div className="container h-16">
        <div className="relative flex h-full items-center gap-4">
          <div className="w-16">
            <div className="pb-2">
              <Image src="/logo.png" alt="Logo" width={64} height={32} />
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="mx-auto w-11/12">
              <Categories data={categories} />
            </div>
          </div>
          <div className="flex w-16 items-center justify-end gap-4">
            <div>
              <Search />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
