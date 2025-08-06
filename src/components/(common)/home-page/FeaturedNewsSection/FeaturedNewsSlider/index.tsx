import NewsCardOverlap from "@/components/cards/NewsCardOverlap";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextTrigger,
  CarouselPagination,
  CarouselPreviousTrigger,
} from "@/components/ui/Carousel";
import { TNews } from "@/types/news.type";

type FeaturedNewsSliderProps = {
  news: Partial<TNews>[];
};

const FeaturedNewsSlider: React.FC<FeaturedNewsSliderProps> = ({ news }) => {
  return (
    <div>
      <div>
        <Carousel className="group" autoplay={true} opts={{ loop: true }}>
          <CarouselContent>
            {news?.map((news) => (
              <CarouselItem key={news?._id}>
                <NewsCardOverlap news={news} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="opacity-0 transition-all duration-300 group-hover:opacity-100">
            <CarouselPreviousTrigger className="left-2 hidden text-xl md:inline-flex" />
            <CarouselNextTrigger className="right-2 hidden text-xl md:inline-flex" />
            <CarouselPagination className="foreground -bottom-4" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedNewsSlider;
