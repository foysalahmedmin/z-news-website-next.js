import NewsCardList from "@/components/cards/NewsCardList";
import { cn } from "@/lib/utils";
import { TNews } from "@/types/news.type";

type FeaturedNewsSideProps = {
  className?: string;
  news: Partial<TNews>[];
};

const FeaturedNewsSide: React.FC<FeaturedNewsSideProps> = ({
  news,
  className,
}) => {
  return (
    <div
      className={cn(
        "grid h-full w-full grid-rows-3 space-y-4 md:space-y-6",
        className,
      )}
    >
      {news?.map((item, index) => (
        <NewsCardList
          news={item}
          key={index}
          className="w-full md:flex-row-reverse"
        />
      ))}
    </div>
  );
};

export default FeaturedNewsSide;
