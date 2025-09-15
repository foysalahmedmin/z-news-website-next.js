import type { Response } from "./response.type";

export type TStatus = "draft" | "pending" | "published" | "archived";

export type TNews = {
  _id: string;
  sequence?: number;
  title: string;
  sub_title?: string;
  slug: string;
  description?: string;
  caption?: string;
  content: string;
  thumbnail?: string;
  images?: string[];
  video?: string;
  youtube?: string;
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
  writer?: string;
  status: TStatus;
  is_featured: boolean;
  is_premium: boolean;
  seo?: {
    image?: string;
    title?: string;
    description?: string;
    keywords?: string[];
  };
  published_at?: Date;
  expired_at?: Date;
  is_edited?: boolean;
  edited_at?: Date;
  views?: number;
};

export type TNewsResponse = Response<TNews>;
export type TBulkNewsResponse = Response<TNews[]>;
