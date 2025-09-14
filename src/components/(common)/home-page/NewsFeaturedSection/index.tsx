import NewsCard from "@/components/cards/NewsCard";
import { cn } from "@/lib/utils";
import { fetchFeaturedBulkNews } from "@/services/news.service";

const NewsFeaturedSection = async () => {
  const { data } = await fetchFeaturedBulkNews();

  const top = data?.slice(0, 3).filter(Boolean) || [];
  const bottom = data?.slice(3, 7).filter(Boolean) || [];

  return (
    <section>
      <div className="container">
        <div className="space-y-6 md:space-y-10">
          <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
            {top?.map((item, index) => (
              <NewsCard
                className={cn("md:text-2xl", {
                  "border-primary lg:col-span-2 lg:items-start lg:text-5xl":
                    index === 0,
                })}
                classNameThumbnail={cn("md:max-w-sm", {
                  "md:max-w-sm lg:max-w-xl": index === 0,
                })}
                classNameDescription={cn("md:line-clamp-4", {
                  "line-clamp-3 lg:text-[0.5em] lg:line-clamp-5": index === 0,
                })}
                type={"list"}
                news={item}
                key={index}
              />
            ))}
          </div>

          <hr />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {bottom?.map((item, index) => (
              <NewsCard type="grid" news={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsFeaturedSection;
