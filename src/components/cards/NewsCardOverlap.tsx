import { URLS } from "@/config";
import { cn } from "@/lib/utils";
import { TNews } from "@/types/news.type";
import Image from "next/image";
import Link from "next/link";

export type TNewsCardOverlapProps = {
  news?: Partial<TNews>;
  className?: string;
};

const NewsCardOverlap: React.FC<TNewsCardOverlapProps> = ({
  news,
  className,
}) => {
  const { title, published_at } = news || {};
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
      href={`/news/${news?.slug}`}
      className={cn("group relative", className)}
    >
      <div className="overflow-hidden">
        <Image
          className="aspect-video w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
          src={thumbnail}
          alt={title || "Thumbnail"}
          width={500}
          height={280}
        />
      </div>
      <div className="from-card via-card absolute right-0 bottom-0 left-0 bg-gradient-to-t to-transparent p-4">
        <div className="border-s-2 ps-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm">{date}</p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCardOverlap;
