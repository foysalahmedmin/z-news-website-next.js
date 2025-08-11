"use client";

import { cn } from "@/lib/utils";
import { TNews } from "@/types/news.type";
import { Printer } from "lucide-react";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import NewsSection from "../../NewsSection";

type PrintProps = {
  news: Partial<TNews>;
};

const Print: React.FC<PrintProps> = ({ news }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="bg-muted flex h-10 items-center rounded-md p-1">
      <button
        onClick={reactToPrintFn}
        disabled={isLoading}
        className="flex h-full cursor-pointer items-center gap-1 px-2"
      >
        <Printer className={cn("size-5")} />
      </button>
      {/* Hidden NewsContent for printing */}
      <div className="hidden">
        <div ref={contentRef}>
          <NewsSection news={news} />
        </div>
      </div>
    </div>
  );
};

export default Print;
