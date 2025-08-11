import { cn } from "@/lib/utils";
import NewsCardSkeleton from "../../cards-skeleton/NewsCardSkeleton";

const NewsFeaturedSectionSkeleton: React.FC<{ hasAd?: boolean }> = ({
  hasAd = false,
}) => {
  const topCount = hasAd ? 5 : 9;
  const bottomCount = 4;

  return (
    <section>
      <div className="container">
        <div className="space-y-6 md:space-y-10">
          {/* Top grid */}
          <div className="grid gap-4 md:grid-flow-col md:grid-cols-2 md:grid-rows-6 lg:grid-cols-3 lg:grid-rows-4">
            {Array.from({ length: topCount }).map((_, index) => (
              <NewsCardSkeleton
                key={index}
                type={index === 0 ? "grid" : "list"}
                className={cn("", {
                  "md:col-span-1 md:row-span-4 md:text-3xl": index === 0,
                })}
              />
            ))}

            {hasAd && (
              <div className="md:row-span-4 md:text-xl">
                <div className="bg-muted h-full w-full animate-pulse rounded" />
              </div>
            )}
          </div>

          <hr />

          {/* Bottom grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: bottomCount }).map((_, index) => (
              <NewsCardSkeleton key={index} type="grid" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsFeaturedSectionSkeleton;
