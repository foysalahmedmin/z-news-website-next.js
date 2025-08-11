import { URLS } from "@/config";
import { TNews } from "@/types/news.type";
import { Calendar, Clock, Tag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TNewsSectionProps = {
  news?: Partial<TNews>;
};

const NewsSection: React.FC<TNewsSectionProps> = ({ news }) => {
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return new Date(date).toLocaleString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <article
      id={`news-${news?._id}`}
      className="container mx-auto max-w-4xl space-y-6 md:space-y-10"
    >
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
            href={`/category/${news?.category?.slug}`}
          >
            {news?.category?.name}
          </Link>
          <span className="mx-2">/</span>
          <span>{news?.title}</span>
        </nav>

        <div className="space-y-4">
          {/* Title */}
          <h1 className="text-2xl leading-tight font-bold md:text-4xl">
            {news?.title}
          </h1>

          {/* Description */}
          {news?.description && (
            <p className="text-foreground leading-relaxed">
              {news?.description}
            </p>
          )}
        </div>

        {/* Meta Information */}
        <div className="text-muted-foreground flex flex-wrap items-center text-sm">
          {/* Author */}
          <div className="border-muted-foreground flex items-center gap-2 border-l px-2">
            <User size={16} />
            <span>লিখেছেন:</span>
            <span className="font-medium">{news?.author?.name}</span>
          </div>

          {/* Published Date */}
          <div className="border-muted-foreground flex items-center gap-2 border-l px-2">
            <Calendar size={16} />
            <span>প্রকাশিত:</span>
            <time
              dateTime={
                news?.published_at && new Date(news?.published_at).toISOString()
              }
            >
              {formatDate(news?.published_at)}
            </time>
          </div>

          {/* Last Updated */}
          {news?.is_edited && news?.edited_at && (
            <div className="border-muted-foreground flex items-center gap-2 border-l px-2">
              <Clock size={16} />
              <span>আপডেট:</span>
              <time
                dateTime={
                  news?.edited_at && new Date(news?.edited_at).toISOString()
                }
              >
                {formatDate(news?.edited_at)}
              </time>
            </div>
          )}

          {/* Category */}
          <div className="border-muted-foreground flex items-center gap-2 border-l px-2">
            <Tag size={16} />
            <Link
              href={`/category/${news?.category?.slug}`}
              className="underline-effect hover:underline-effect-active font-medium hover:text-blue-900"
            >
              {news?.category?.name}
            </Link>
          </div>
        </div>
      </div>

      <hr />

      <div className="space-y-6 md:space-y-10">
        {/* Thumbnail */}
        {news?.thumbnail && (
          <div>
            <Image
              src={
                news?.thumbnail
                  ? URLS.news.thumbnail + "/" + news?.thumbnail
                  : "/thumbnail.png"
              }
              alt={news?.title || "Thumbnail"}
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
            dangerouslySetInnerHTML={{ __html: news?.content || "" }}
            className="text-foreground leading-relaxed"
          />
        </div>

        {/* Additional Images */}
        {news?.images && news?.images.length > 0 && (
          <div>
            <h3 className="mb-4 text-xl font-semibold">আরো ছবি</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {news?.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${news?.title} - ছবি ${index + 1}`}
                  width={300}
                  height={200}
                  className="h-48 w-full rounded-md object-cover shadow-md transition-shadow hover:shadow"
                />
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {news?.tags && news?.tags.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-2">
              {news?.tags.map((tag, index) => (
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
  );
};

export default NewsSection;
