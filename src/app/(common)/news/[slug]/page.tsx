// app/news/[slug]/page.tsx
import CommentSection from "@/components/(common)/news-page/CommentSection";
import NewsActionSection from "@/components/(common)/news-page/NewsActionSection";
import RelatedNewsSection from "@/components/(common)/news-page/RelatedNewsSection";
import { URLS } from "@/config";
import { fetchNews } from "@/services/news.service";
import { Calendar, Clock, Share2, Tag, User } from "lucide-react";
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
          : [],
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
          : [],
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
      "@id": `https://yoursite.com/news/${data?.slug}`,
    },
  };

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-4xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-900">
            হোম
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/category/${data?.category.slug}`}
            className="hover:text-blue-900"
          >
            {data?.category.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{data?.title}</span>
        </nav>

        {/* Featured Badge */}
        {data?.is_featured && (
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
              ফিচার্ড
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="mb-4 text-3xl leading-tight font-bold text-gray-900 md:text-4xl">
          {data?.title}
        </h1>

        {/* Description */}
        {data?.description && (
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            {data?.description}
          </p>
        )}

        {/* Meta Information */}
        <div className="mb-6 flex flex-wrap items-center gap-4 border-b pb-6 text-sm text-gray-600">
          {/* Author */}
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>লিখেছেন:</span>
            <span className="font-medium text-gray-800">
              {data?.author.name}
            </span>
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
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>প্রকাশিত:</span>
            <time
              dateTime={
                data?.published_at && new Date(data?.published_at).toISOString()
              }
            >
              {formatDate(data?.published_at)}
            </time>
          </div>

          {/* Last Updated */}
          {data?.is_edited && data?.edited_at && (
            <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-2">
            <Tag size={16} />
            <Link
              href={`/category/${data?.category.slug}`}
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              {data?.category.name}
            </Link>
          </div>
        </div>

        {/* Thumbnail */}
        {data?.thumbnail && (
          <div className="mb-8">
            <Image
              src={
                data?.thumbnail
                  ? URLS.news.thumbnail + "/" + data?.thumbnail
                  : "/thumbnail.png"
              }
              alt={data?.title}
              width={800}
              height={450}
              className="aspect-video h-auto w-full rounded-lg object-cover shadow-lg"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg mb-8 max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: data?.content || "" }}
            className="leading-relaxed text-gray-800"
          />
        </div>

        {/* Additional Images */}
        {data?.images && data?.images.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-semibold">আরো ছবি</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {data?.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${data?.title} - ছবি ${index + 1}`}
                  width={300}
                  height={200}
                  className="h-48 w-full rounded-lg object-cover shadow-md transition-shadow hover:shadow-lg"
                />
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {data?.tags && data?.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold">ট্যাগসমূহ</h3>
            <div className="flex flex-wrap gap-2">
              {data?.tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Share Options */}
        <div className="mb-8 rounded-lg bg-gray-50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Share2 size={18} />
            <span className="font-medium">এই খবরটি শেয়ার করুন</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700">
              ফেইসবুক
            </button>
            <button className="rounded bg-sky-500 px-4 py-2 text-sm text-white transition-colors hover:bg-sky-600">
              টুইটার
            </button>
            <button className="rounded bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700">
              হোয়াটসঅ্যাপ
            </button>
            <button className="rounded bg-gray-600 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-700">
              লিংক কপি
            </button>
          </div>
        </div>
      </article>

      {/* Like, Dislike & Actions - Client Component */}
      <NewsActionSection newsId={data?._id} />

      {/* Comment Section - Client Component */}
      <CommentSection newsId={data?._id} />

      {/* Related News - Server Component */}
      <RelatedNewsSection category={data?.category} />
    </>
  );
};

export default NewsPage;
