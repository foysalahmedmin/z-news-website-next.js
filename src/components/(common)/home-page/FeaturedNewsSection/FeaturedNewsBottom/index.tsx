import NewsCardGird from "@/components/cards/NewsCardGird";
import { cn } from "@/lib/utils";
import { TNews } from "@/types/news.type";
import React from "react";

type FeaturedNewsGridProps = {
  className?: string;
  news: Partial<TNews>[];
};

const FeaturedNewsGrid: React.FC<FeaturedNewsGridProps> = ({
  news,
  className,
}) => {
  return (
    <div
      className={cn(
        "grid h-full w-full space-y-4 md:grid-cols-2 md:space-y-6 lg:grid-cols-4",
        className,
      )}
    >
      {news?.map((item, index) => (
        <NewsCardGird
          news={item}
          key={index}
          className="w-full md:flex-row-reverse"
        />
      ))}
    </div>
  );
};

export default FeaturedNewsGrid;
