import NewsCardGird from "@/components/cards/NewsCardGird";
import { fetchBulkNews } from "@/services/news.service";
import FeaturedNewsBottom from "./FeaturedNewsBottom";
import FeaturedNewsSide from "./FeaturedNewsSide";

const FeaturedNewsSection = async () => {
  const { data } = await fetchBulkNews({
    page: 1,
    limit: 12,
    is_featured: true,
    sort: "-published_at,sequence",
  });

  const sideData1 = data?.slice(1, 4);
  const sideData2 = data?.slice(4, 7);
  const bottomData = data?.slice(7, 10);

  return (
    <section className="py-6">
      <div className="container">
        <div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            <div className="md:self-stretch">
              <NewsCardGird news={data?.[0]} />
            </div>
            <div className="md:self-stretch">
              <FeaturedNewsSide news={sideData1!} />
            </div>
            <div className="md:col-span-2 lg:col-span-1 lg:self-stretch">
              <FeaturedNewsSide news={sideData2!} />
            </div>
          </div>
          <div>
            <FeaturedNewsBottom news={bottomData!} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNewsSection;
