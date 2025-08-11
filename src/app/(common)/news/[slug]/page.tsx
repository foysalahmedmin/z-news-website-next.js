import NewsActionSection from "@/components/(common)/news-page/NewsActionSection";
import NewsCommentSection from "@/components/(common)/news-page/NewsCommentSection";
import NewsSection from "@/components/(common)/news-page/NewsSection";
import RelatedNewsSection from "@/components/(common)/news-page/RelatedNewsSection";
import { URLS } from "@/config";
import { fetchNews } from "@/services/news.service";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate metadata for SEO
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  try {
    const { data } = await fetchNews(decodedSlug);

    if (!data) {
      return { title: "News Not Found" };
    }

    const seoTitle = data?.seo?.title || data?.title;
    const seoDescription =
      data?.seo?.description ||
      data?.description ||
      data?.content.replace(/<[^>]*>/g, "").substring(0, 160);

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: data?.seo?.keywords || data?.tags,
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        images: data?.thumbnail
          ? [{ url: URLS.news.thumbnail + "/" + data?.thumbnail }]
          : [{ url: "/thumbnail.png" }],
        type: "article",
        publishedTime:
          data?.published_at && new Date(data?.published_at).toISOString(),
      },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description: seoDescription,
        images: data?.thumbnail
          ? [URLS.news.thumbnail + "/" + data?.thumbnail]
          : [{ url: "/thumbnail.png" }],
      },
    };
  } catch (error) {
    return { title: "News Not Found" };
  }
};

const NewsPage = async ({ params }: Props) => {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  let { data } = await fetchNews(decodedSlug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: data?.title,
    description: data?.description,
    image: data?.thumbnail
      ? URLS.news.thumbnail + "/" + data?.thumbnail
      : "/thumbnail.png",
    datePublished:
      data?.published_at && new Date(data?.published_at).toISOString(),
    dateModified:
      (data?.edited_at && new Date(data?.edited_at).toISOString()) ||
      (data?.published_at && new Date(data?.published_at).toISOString()),
    author: {
      "@type": "Person",
      name: data?.author.name,
      email: data?.author.email,
    },
    publisher: {
      "@type": "Organization",
      name: "Your News Site",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${URLS.app}/news/${data?.slug}`,
    },
  };

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-6 py-6 md:space-y-10">
        {/* News Section - Server Component */}
        <NewsSection news={data} />

        <div className="container max-w-4xl">
          <hr />
        </div>

        {/* Like, Dislike & Actions - Client Component */}
        <NewsActionSection news={data} />

        {/* Comment Section - Client Component */}
        <NewsCommentSection news={data} />

        {/* Related News - Server Component */}
        <RelatedNewsSection news={data} />
      </div>
    </>
  );
};

export default NewsPage;
