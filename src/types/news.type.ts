import type { TNewsBreak } from "./news-break.type";
import type { TNewsHeadline } from "./news-headline.type";
import type { Response } from "./response.type";

export type TStatus = "draft" | "pending" | "published" | "archived";

export type TNews = {
  _id: string;
  sequence: number;
  title: string;
  slug: string;
  description?: string;
  content: string;
  thumbnail?: string;
  images?: string[];
  tags?: string[];
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  author: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  };
  status: TStatus;
  is_featured: boolean;
  is_premium: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  published_at?: Date;
  expired_at?: Date;
  is_edited?: boolean;
  edited_at?: Date;
  news_headline?: Partial<TNewsHeadline>;
  news_break?: Partial<TNewsBreak>;
  likes_count?: number;
  dislikes_count?: number;
  comments_count?: number;
};

export type TNewsResponse = Response<TNews>;
export type TBulkNewsResponse = Response<TNews[]>;
