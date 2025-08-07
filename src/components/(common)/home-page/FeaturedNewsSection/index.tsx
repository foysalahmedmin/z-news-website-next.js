import NewsCard from "@/components/cards/NewsCard";
import { cn } from "@/lib/utils";
import { fetchBulkNews } from "@/services/news.service";

const FeaturedNewsSection = async () => {
  const { data } = await fetchBulkNews({
    page: 1,
    limit: 13,
    is_top_featured: true,
    sort: "-published_at,sequence",
  });

  const hasAd = false;
  const endPoint = hasAd ? 5 : 9;

  const topData = data?.slice(0, endPoint);
  const bottomData = data?.slice(endPoint, endPoint + 4);

  return (
    <section>
      <div className="container">
        <div className="space-y-6 md:space-y-10">
          <div className="grid gap-4 md:grid-flow-col md:grid-cols-2 md:grid-rows-6 lg:grid-cols-3 lg:grid-rows-4">
            {topData?.map((item, index) => (
              <NewsCard
                className={cn("", {
                  "md:col-span-1 md:row-span-4 md:text-3xl": index === 0,
                })}
                type={index === 0 ? "grid" : "list"}
                news={item}
                key={index}
              />
            ))}
            {hasAd && (
              <div className="md:row-span-4 md:text-xl">
                <div>{/* <Ad /> */}</div>
              </div>
            )}
          </div>

          <hr />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {bottomData?.map((item, index) => (
              <NewsCard type="grid" news={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNewsSection;
