import CategoryFeaturedNewsSection from "@/components/(common)/category-page/CategoryFeaturedNewsSection";
import CategoryMoreNewsSection from "@/components/(common)/category-page/CategoryMoreNewsSection";
import CategoryPageHeaderSection from "@/components/(common)/category-page/CategoryPageHeaderSection";
import CategoryNewsSection from "@/components/sections/CategoryNewsSection";
import { fetchCategory } from "@/services/category.service";

const CategoryNewPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const { data } = await fetchCategory(decodedSlug);

  const hasSubCategory = data?.children && data?.children.length > 0;

  return (
    <div>
      <CategoryPageHeaderSection category={data} />
      <div className="space-y-10 py-6 md:space-y-16 md:py-10">
        <CategoryFeaturedNewsSection category={data} />

        {hasSubCategory && (
          <>
            {data?.children?.map((category) => (
              <CategoryNewsSection key={category?._id} category={category} />
            ))}
          </>
        )}

        <div className="container">
          <hr />
        </div>

        <CategoryMoreNewsSection category={data} />
      </div>
    </div>
  );
};

export default CategoryNewPage;
