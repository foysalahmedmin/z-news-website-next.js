import NewsCard from "@/components/cards/NewsCard";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { fetchBulkNews } from "@/services/news.service";
import { TCategory } from "@/types/category.type";
import Link from "next/link";

const CategoryNewsSection: React.FC<{ category: Partial<TCategory> }> = async ({
  category,
}) => {
  const { _id, slug, name, icon } = category || {};

  const { data } = await fetchBulkNews({
    page: 1,
    limit: 15,
    category: _id,
    sort: "-published_at",
  });

  const hasAd = false;
  const endPoint = hasAd ? 5 : 9;

  const topData = data?.slice(0, endPoint);

  return (
    <section>
      <div className="container space-y-6 md:space-y-10">
        <div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Link
                href={`/category/${slug}`}
                className="z-10 flex items-center gap-2"
              >
                {icon && <Icon className="size-10" name={icon} />}
                <h2 className="text-4xl font-bold">{name}</h2>
              </Link>
              <div className="absolute inset-0 flex w-fit items-center gap-2 opacity-10">
                {icon && <Icon className="size-8" name={icon} />}
              </div>
            </div>
            <div className="border-muted-foreground flex-1 border-y py-1" />
          </div>
        </div>
        <div>
          <div className="grid gap-4 md:grid-flow-col md:grid-rows-6 lg:grid-rows-4">
            {topData?.map((item, index) => (
              <NewsCard
                className={cn("", {
                  "md:col-span-1 md:row-span-4 md:text-xl": index === 0,
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
        </div>
      </div>
    </section>
  );
};

export default CategoryNewsSection;
