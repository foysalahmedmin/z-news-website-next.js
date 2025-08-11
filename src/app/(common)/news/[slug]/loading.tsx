import FooterSkeleton from "@/components/skeletons/partials-skeleton/FooterSkeleton";
import HeaderSkeleton from "@/components/skeletons/partials-skeleton/HeaderSkeleton";
import NewsActionSectionSkeleton from "@/components/skeletons/sections-skeleton/NewsActionSectionSkeleton";
import NewsCommentSectionSkeleton from "@/components/skeletons/sections-skeleton/NewsCommentSectionSkeleton";
import NewsDetailsSectionSkeleton from "@/components/skeletons/sections-skeleton/NewsDetailsSectionSkeleton";
import RelatedNewsSectionSkeleton from "@/components/skeletons/sections-skeleton/RelatedNewsSectionSkeleton";

const NewsPageLoading = () => {
  return (
    <div>
      <HeaderSkeleton />
      <div className="space-y-6 py-6 md:space-y-10">
        <NewsDetailsSectionSkeleton />
        <div className="container max-w-4xl">
          <hr />
        </div>
        <NewsActionSectionSkeleton />
        <NewsCommentSectionSkeleton />
        <RelatedNewsSectionSkeleton />
      </div>
      <FooterSkeleton />
    </div>
  );
};

export default NewsPageLoading;
