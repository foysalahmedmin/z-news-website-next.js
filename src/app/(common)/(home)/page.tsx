import FeaturedNewsSection from "@/components/(common)/home-page/FeaturedNewsSection";
import NewsBreaksSection from "@/components/(common)/home-page/NewsBreaksSection";

const HomePage: React.FC = async () => {
  return (
    <main>
      <NewsBreaksSection />
      <FeaturedNewsSection />
    </main>
  );
};

export default HomePage;
