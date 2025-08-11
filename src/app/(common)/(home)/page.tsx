import FeaturedNewsSection from "@/components/(common)/home-page/FeaturedNewsSection";
import NewsHeadlinesSection from "@/components/(common)/home-page/NewsBreaksSection";
import CategoryNewsSection from "@/components/sections/CategoryNewsSection";
import { fetchCategories } from "@/services/category.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "দৈনিক এইদিন",
  description: "দৈনিক এইদিন",
};

const HomePage: React.FC = async () => {
  const { data } = await fetchCategories({
    page: 1,
    limit: 15,
    sort: "sequence",
    is_featured: true,
  });
  return (
    <main>
      <NewsHeadlinesSection />
      <div className="space-y-10 py-6 md:space-y-16 md:py-10">
        <FeaturedNewsSection />
        <CategoryNewsSection
          category={{ name: "সাম্প্রতিক সংবাদ", icon: "clock " }}
        />
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
