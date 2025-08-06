import CategoryNewsSection from "@/components/(common)/home-page/CategoryNewsSection";
import FeaturedNewsSection from "@/components/(common)/home-page/FeaturedNewsSection";
import NewsBreaksSection from "@/components/(common)/home-page/NewsBreaksSection";
import { fetchCategories } from "@/services/category.service";

const HomePage: React.FC = async () => {
  const { data } = await fetchCategories({
    page: 1,
    limit: 15,
    is_featured: true,
  });
  return (
    <main>
      <NewsBreaksSection />
      <div className="space-y-6 py-6 md:space-y-10 md:py-10">
        <FeaturedNewsSection />
        <>
          {data?.map((category) => (
            <CategoryNewsSection key={category?._id} category={category} />
          ))}
        </>
      </div>
    </main>
  );
};

export default HomePage;
