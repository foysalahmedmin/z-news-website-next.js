import NewsCard from "@/components/cards/NewsCard";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { fetchBulkNews } from "@/services/news.service";
import { TEvent } from "@/types/event.type";
import Link from "next/link";

const EventNewsSection: React.FC<{
  event?: Partial<TEvent>;
}> = async ({ event }) => {
  const { _id, slug, name, icon, layout } = event || {};

  const { data } = await fetchBulkNews({
    page: 1,
    limit: 5,
    ...(_id && { event: _id }),
    sort: "-published_at",
  });

  const lead = data?.[0];

  const topData = data?.slice(1, 5);

  return (
    <section
      className={cn("bg-amber-500/15 py-10", {
        "bg-muted/30 py-16": layout === "highlight",
        "bg-background": layout !== "highlight",
      })}
    >
      <div className="container mx-auto px-4">
        {/* Centered Event Header */}
        <div className="mb-10 flex flex-col items-center justify-center text-center">
          <div className="bg-background mb-4 inline-flex items-center justify-center rounded-full p-3 shadow-md">
            {icon && <Icon className="text-primary size-8" name={icon} />}
          </div>

          {slug ? (
            <Link
              href={`/event/${slug}`}
              className="group transition-all duration-300"
            >
              <h2 className="text-foreground group-hover:text-primary text-3xl font-bold transition-colors md:text-4xl">
                {name}
              </h2>
              <div className="bg-primary mx-auto mt-4 h-1 w-20 rounded-full transition-all duration-300 group-hover:w-32" />
            </Link>
          ) : (
            <div>
              <h2 className="text-foreground text-3xl font-bold md:text-4xl">
                {name}
              </h2>
              <div className="bg-primary mx-auto mt-4 h-1 w-20 rounded-full" />
            </div>
          )}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div>
            <NewsCard
              className="border-dashed bg-transparent p-4 lg:text-3xl"
              type="grid"
              news={lead || {}}
            />
          </div>
          <div className="lg:col-span-2 lg:grid-cols-2">
            {topData?.map((item, index) => (
              <NewsCard
                className="rounded border-dashed bg-transparent p-4"
                type="grid"
                news={item}
                key={index}
              />
            ))}
          </div>
        </div>

        {/* View All Link */}
        {slug && (
          <div className="mt-12 text-center">
            <Link
              href={`/event/${slug}`}
              className="text-primary hover:text-primary/80 inline-flex items-center font-medium transition-colors"
            >
              এই ইভেন্টের সব খবর দেখুন
              <Icon name="arrow-right" className="ml-2 size-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventNewsSection;
