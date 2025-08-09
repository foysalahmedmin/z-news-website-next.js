// app/news/[slug]/page.tsx
import CommentSection from "@/components/(common)/news-page/CommentSection";
import NewsActionSection from "@/components/(common)/news-page/NewsActionSection";
import RelatedNewsSection from "@/components/(common)/news-page/RelatedNewsSection";
import { URLS } from "@/config";
import { fetchNews } from "@/services/news.service";
import { Calendar, Clock, Tag, User } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

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

      <article className="mx-auto max-w-4xl space-y-6 px-4 py-8 md:space-y-10">
        {/* Breadcrumb */}
        <div className="space-y-4 md:space-y-6">
          <nav className="text-sm text-gray-600">
            <Link
              href="/"
              className="underline-effect hover:underline-effect-active hover:text-blue-900"
            >
              হোম
            </Link>
            <span className="mx-2">/</span>
            <Link
              className="underline-effect hover:underline-effect-active hover:text-blue-900"
              href={`/category/${data?.category.slug}`}
            >
              {data?.category.name}
            </Link>
            <span className="mx-2">/</span>
            <span>{data?.title}</span>
          </nav>

          <div className="space-y-4">
            {/* Title */}
            <h1 className="text-2xl leading-tight font-bold md:text-4xl">
              {data?.title}
            </h1>

            {/* Description */}
            {data?.description && (
              <p className="text-foreground leading-relaxed">
                {data?.description}
              </p>
            )}
          </div>

          {/* Meta Information */}
          <div className="text-muted-foreground flex flex-wrap items-center text-sm">
            {/* Author */}
            <div className="border-muted-foreground flex items-center gap-2 border-l px-2">
              <User size={16} />
              <span>লিখেছেন:</span>
              <span className="font-medium">{data?.author.name}</span>
              {data?.author.image && (
                <Image
                  src={data?.author.image}
                  alt={data?.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
            </div>

            {/* Published Date */}
            <div className="border-muted-foreground flex items-center gap-2 border-l px-2">
              <Calendar size={16} />
              <span>প্রকাশিত:</span>
              <time
                dateTime={
                  data?.published_at &&
                  new Date(data?.published_at).toISOString()
                }
              >
                {formatDate(data?.published_at)}
              </time>
            </div>

            {/* Last Updated */}
            {data?.is_edited && data?.edited_at && (
              <div className="border-muted-foreground flex items-center gap-2 border-l px-2">
                <Clock size={16} />
                <span>আপডেট:</span>
                <time
                  dateTime={
                    data?.edited_at && new Date(data?.edited_at).toISOString()
                  }
                >
                  {formatDate(data?.edited_at)}
                </time>
              </div>
            )}

            {/* Category */}
            <div className="border-muted-foreground flex items-center gap-2 border-l px-2">
              <Tag size={16} />
              <Link
                href={`/category/${data?.category.slug}`}
                className="underline-effect hover:underline-effect-active font-medium hover:text-blue-900"
              >
                {data?.category.name}
              </Link>
            </div>
          </div>
        </div>

        <hr />

        <div className="space-y-6 md:space-y-10">
          {/* Thumbnail */}
          {data?.thumbnail && (
            <div>
              <Image
                src={
                  data?.thumbnail
                    ? URLS.news.thumbnail + "/" + data?.thumbnail
                    : "/thumbnail.png"
                }
                alt={data?.title}
                width={800}
                height={450}
                className="aspect-video h-auto w-full rounded-md object-cover shadow"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: data?.content || "" }}
              className="text-foreground leading-relaxed"
            />
          </div>

          {/* Additional Images */}
          {data?.images && data?.images.length > 0 && (
            <div>
              <h3 className="mb-4 text-xl font-semibold">আরো ছবি</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {data?.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${data?.title} - ছবি ${index + 1}`}
                    width={300}
                    height={200}
                    className="h-48 w-full rounded-md object-cover shadow-md transition-shadow hover:shadow"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {data?.tags && data?.tags.length > 0 && (
            <div>
              <div className="flex flex-wrap gap-2">
                {data?.tags.map((tag, index) => (
                  <div
                    key={index}
                    // href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    #{tag}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Like, Dislike & Actions - Client Component */}
      <NewsActionSection news={data} />

      {/* Comment Section - Client Component */}
      <CommentSection newsId={data?._id} />

      {/* Related News - Server Component */}
      <RelatedNewsSection category={data?.category} />
    </>
  );
};

export default NewsPage;
