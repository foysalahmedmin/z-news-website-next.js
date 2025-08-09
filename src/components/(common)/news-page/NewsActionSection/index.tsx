// components/NewsActions.tsx
"use client";

import { cn } from "@/lib/utils";
import { TNews } from "@/types/news.type";
import { Eye } from "lucide-react";
import Reaction from "./reaction";
import Save from "./save";
import Share from "./share";

type NewsActionSectionProps = {
  news?: Partial<TNews>;
};

const NewsActionSection: React.FC<NewsActionSectionProps> = ({ news }) => {
  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="bg-card rounded-md border p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Reaction news={news!} />
            <Save news={news!} />
            <Share news={news!} />
          </div>

          {/* View Count */}
          <div className="divide-muted-foreground flex h-10 items-center divide-x rounded-md">
            <div className="flex items-center gap-1 px-2">
              <Eye className={cn("size-5")} />
              <span className="text-lg">{1}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsActionSection;
