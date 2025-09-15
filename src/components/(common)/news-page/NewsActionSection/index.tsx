// components/NewsActions.tsx
"use client";

import { cn } from "@/lib/utils";
import { TNews } from "@/types/news.type";
import { formatCount } from "@/utils/formatCount";
import { Eye } from "lucide-react";
import Print from "./print";
import Reaction from "./reaction";
import Share from "./share";

type NewsActionSectionProps = {
  news?: Partial<TNews>;
};

const NewsActionSection: React.FC<NewsActionSectionProps> = ({ news }) => {
  return (
    <div className="container mx-auto">
      <div className="bg-card rounded-md border p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Reaction news={news!} />
            {/* <Save news={news!} /> */}
            <Print news={news!} />
            <Share news={news!} />
          </div>

          {/* View Count */}
          <div className="divide-muted-foreground flex h-10 items-center divide-x rounded-md">
            <div className="flex items-center gap-1 px-2">
              <Eye className={cn("size-5")} />
              <span className="mb-0.5 text-lg leading-1">
                {formatCount(news?.views || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsActionSection;
