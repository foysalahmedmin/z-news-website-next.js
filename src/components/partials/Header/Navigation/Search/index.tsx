"use client";

import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React from "react";

const Search: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex items-center">
      {/* Mobile Search */}
      <div className="flex items-center">
        <SearchIcon
          onClick={() => setIsOpen(!isOpen)}
          className="size-6 cursor-pointer"
        />
        <div
          className={cn(
            "bg-card absolute right-0 bottom-0 left-0 translate-y-full border p-2 transition-opacity duration-300",
            {
              "invisible opacity-0": !isOpen,
              "visible opacity-100": isOpen,
            },
          )}
        >
          <div className="my-auto flex h-8 w-full items-center gap-2 rounded-md">
            <input
              className="h-full flex-1 px-2 outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
            <SearchIcon className="size-6 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
