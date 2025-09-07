import { URLS } from "@/config";
import { TNews } from "@/types/news.type";
import { parseYouTubeUrl } from "@/utils/youtubeUrlUtils";
import { Calendar, Edit2, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TNewsSectionProps = {
  news?: Partial<TNews>;
};

const NewsDetailsSection: React.FC<TNewsSectionProps> = ({ news }) => {
  if (!news) return null;

  const { thumbnails, url } = news?.youtube
    ? parseYouTubeUrl(news?.youtube || "")
    : {};

  const thumbnail = news?.thumbnail
    ? URLS.news.thumbnail + "/" + news?.thumbnail
    : thumbnails?.default || "/thumbnail.png";

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
        <nav className="flex items-center text-sm text-gray-600">
          <Link
            href="/"
            className="underline-effect hover:underline-effect-active inline-block hover:text-blue-900"
          >
            <Image
              className="inline-block h-12 object-contain object-center"
              src="/logo.png"
              alt="Logo"
              width={52}
              height={32}
            />
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
          {/* <div className="border-muted-foreground flex items-center gap-2 border-l px-2">
            <Edit2 size={16} />
            <span className="font-medium">{news?.author?.name}</span>
          </div> */}

          {/* Writer */}
          {news?.writer && (
            <div className="border-muted-foreground flex items-center gap-2 border-l px-2">
              <Edit2 size={16} />
              <span className="font-medium">{news?.writer}</span>
            </div>
          )}

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
          {/* {news?.is_edited && news?.edited_at && (
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
          )} */}

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
            <>
              {news?.youtube ? (
                <>
                  <iframe
                    width="100%"
                    height="450"
                    src={url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </>
              ) : (
                <Image
                  src={thumbnail}
                  alt={news?.caption || news?.title || "Thumbnail"}
                  width={800}
                  height={450}
                  className="aspect-video h-auto w-full rounded-md object-cover shadow"
                  priority
                />
              )}
            </>
            {news.caption && (
              <p className="text-muted-foreground mt-2 text-center text-sm italic">
                {news.caption}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: news?.content || "" }}
            className="text-foreground leading-relaxed whitespace-pre-line"
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
                  className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm transition-colors"
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

export default NewsDetailsSection;
