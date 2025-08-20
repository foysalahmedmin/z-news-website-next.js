import { cn } from "@/lib/utils";
import NewsCardSkeleton from "../../cards-skeleton/NewsCardSkeleton";

const NewsFeaturedSectionSkeleton: React.FC = () => {
  const topCount = 3;
  const bottomCount = 4;

  return (
    <section>
      <div className="container">
        <div className="space-y-6 md:space-y-10">
          {/* Top grid */}
          <div className="gird gap-4 md:grid-cols-2">
            {Array.from({ length: topCount }).map((_, index) => (
              <NewsCardSkeleton
                className={cn("", {
                  "border-primary border-s-4 md:col-span-2 md:text-3xl":
                    index === 0,
                })}
                type={"list"}
                key={index}
              />
            ))}
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
