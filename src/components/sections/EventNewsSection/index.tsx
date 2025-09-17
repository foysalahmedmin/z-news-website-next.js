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
    sort: "-published_at,-is_featured",
  });

  const lead = data?.[0];

  const topData = data?.slice(1, 5);

  if (!data?.length || data?.length < 5) return null;

  return (
    <section
      className={cn("bg-amber-500/5 py-10 md:py-16", {
        "bg-amber-500/5": layout === "default",
        "bg-muted": layout === "standard",
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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-2">
          {/* Left Column */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:row-span-2">
            {topData?.slice(0, 2).map((item, index) => (
              <NewsCard
                key={index}
                className="border-foreground/25 rounded border border-dashed bg-transparent p-4 lg:h-full"
                type="grid"
                news={item}
              />
            ))}
          </div>

          {/* Lead News - Middle */}
          <div className="lg:col-span-6 lg:row-span-2">
            <NewsCard
              className="border-foreground/25 border border-dashed bg-transparent p-4 lg:h-full lg:text-3xl"
              type="grid"
              news={lead || {}}
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 lg:col-span-3 lg:row-span-2">
            {topData?.slice(2, 4).map((item, index) => (
              <NewsCard
                key={index}
                className="border-foreground/25 rounded border border-dashed bg-transparent p-4 lg:h-full"
                type="grid"
                news={item}
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
