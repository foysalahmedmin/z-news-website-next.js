import { URLS } from "@/config";
import { cn } from "@/lib/utils";
import { TNews } from "@/types/news.type";
import { getDescription } from "@/utils/parseContentToDescription";
import { parseYouTubeUrl } from "@/utils/youtubeUrlUtils";
import { Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type TNewsCardListProps = {
  news?: Partial<TNews>;
  className?: string;
  classNameThumbnail?: string;
  classNameContent?: string;
  classNameTitle?: string;
  classNameDescription?: string;
};

const NewsCardList: React.FC<TNewsCardListProps> = ({
  news,
  className,
  classNameThumbnail,
  classNameContent,
  classNameTitle,
  classNameDescription,
}) => {
  const { published_at, slug, title, description, category } = news || {};
  const { thumbnails } = news?.youtube
    ? parseYouTubeUrl(news?.youtube || "")
    : {};

  const thumbnail = news?.thumbnail
    ? URLS.news.thumbnail + "/" + news?.thumbnail
    : thumbnails?.default || "/thumbnail.png";

  const date =
    published_at &&
    new Date(published_at).toLocaleString("bn-BD", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  return (
    <Link
      href={`/news/${slug}`}
      className={cn(
        "group relative flex flex-col gap-4 md:flex-row md:items-center",
        className,
      )}
      title={title}
    >
      <div
        className={cn(
          "overflow-hidden md:w-1/2 md:max-w-56",
          classNameThumbnail,
        )}
      >
        <div className="relative aspect-video w-full">
          <Image
            className="size-full object-cover object-center transition-all duration-300 group-hover:scale-105"
            src={thumbnail}
            alt={title || "Thumbnail"}
            width={500}
            height={280}
            // onError={(e) => {
            //   e.currentTarget.src = "/thumbnail.png";
            // }}
          />
          {(news?.youtube || news?.video) && (
            <div className="bg-card/25 absolute inset-0 flex items-center justify-center">
              <Video className="h-1/3" />
            </div>
          )}
        </div>
      </div>
      <div className={cn("flex-1", classNameContent)}>
        <div className="border-s-2 ps-2">
          <h3
            className={cn(
              "mb-[0.25em] line-clamp-2 text-[1.125em] leading-[1.5] font-semibold group-hover:text-blue-900",
              classNameTitle,
            )}
            dangerouslySetInnerHTML={{ __html: title || "" }}
          />
          <div className="flex flex-wrap items-center gap-1">
            <p className="text-muted-foreground text-xs">{date}</p>
            <p className="text-muted-foreground border-muted-foreground border-s ps-1 text-xs">
              {category?.name}
            </p>
          </div>
        </div>
        <p
          className={cn(
            "text-muted-foreground mt-2 line-clamp-3 text-xs",
            classNameDescription,
          )}
        >
          {description || getDescription(news?.content || "")}
        </p>
      </div>
    </Link>
  );
};

export default NewsCardList;
