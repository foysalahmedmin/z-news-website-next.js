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
          <div className="gird gap-4 md:grid-cols-2">
            {top?.map((item, index) => (
              <NewsCard
                className={cn("", {
                  "border-primary border-s-4 md:col-span-2 md:text-3xl":
                    index === 0,
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
