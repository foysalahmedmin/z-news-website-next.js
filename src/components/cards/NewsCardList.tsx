import { URLS } from "@/config";
import { cn } from "@/lib/utils";
import { TNews } from "@/types/news.type";
import Image from "next/image";
import Link from "next/link";

export type TNewsCardListProps = {
  news?: Partial<TNews>;
  className?: string;
};

const NewsCardList: React.FC<TNewsCardListProps> = ({ news, className }) => {
  const { published_at, slug, title, description } = news || {};
  const thumbnail = news?.thumbnail
    ? URLS.news.thumbnail + "/" + news?.thumbnail
    : "/thumbnail.png";
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
        "group bg-card relative flex items-start md:gap-4",
        className,
      )}
    >
      <div className="overflow-hidden">
        <Image
          className="aspect-video w-full max-w-32 object-cover object-center transition-all duration-300 group-hover:scale-105"
          src={thumbnail}
          alt={title || "Thumbnail"}
          width={500}
          height={280}
        />
      </div>
      <div className="flex-1 py-4 md:py-0">
        <div className="border-s-2 ps-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm">{date}</p>
        </div>
        <p className="text-muted-foreground mt-2 line-clamp-3 text-xs md:line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default NewsCardList;
