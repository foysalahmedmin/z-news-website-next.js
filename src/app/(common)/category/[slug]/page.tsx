import CategoryNewsFeaturedSection from "@/components/(common)/category-page/CategoryNewsFeaturedSection";
import CategoryNewsMoreSection from "@/components/(common)/category-page/CategoryNewsMoreSection";
import CategoryNewsPageHeaderSection from "@/components/(common)/category-page/CategoryNewsPageHeaderSection";
import CategoryNewsSection from "@/components/sections/CategoryNewsSection";
import { fetchCategory } from "@/services/category.service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const { data } = await fetchCategory(decodedSlug);
  return {
    title: `${data?.name} - দৈনিক এইদিন`,
    description: data?.description,
  };
};

const CategoryNewPage = async ({ params }: Props) => {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const { data } = await fetchCategory(decodedSlug);

  const hasSubCategory = data?.children && data?.children.length > 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-8rem)]">
      <CategoryNewsPageHeaderSection category={data} />
      <div className="space-y-10 py-6 md:space-y-16 md:py-10">
        <CategoryNewsFeaturedSection category={data} />

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

        <CategoryNewsMoreSection category={data} />
      </div>
    </div>
  );
};

export default CategoryNewPage;
