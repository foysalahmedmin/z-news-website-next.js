import type { Response } from "./response.type";

export type TStatus = "draft" | "pending" | "published" | "archived";

export type TFile = {
  _id: string;
  url: string;
  name: string;
  path: string;
  file_name: string;
  type: string;
  caption?: string;
};

export type TNews = {
  _id: string;
  title: string;
  sub_title?: string;
  slug: string;
  description?: string;
  content: string;
  thumbnail?: TFile;
  video?: TFile;
  youtube?: string;
  tags?: string[];
  event?: {
    _id: string;
    name: string;
    slug: string;
  };
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  categories?: {
    _id: string;
    name: string;
    slug: string;
  }[];
  author: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  };
  writer?: string;
  status: TStatus;
  is_featured?: boolean;
  published_at?: Date;
  expired_at?: Date;
  is_edited?: boolean;
  edited_at?: Date;
  layout?: string;
  views?: number;
  likes?: number;
  dislikes?: number;
  comments?: number;
  news_headline?: {
    _id: string;
    status: TStatus;
    published_at?: Date;
    expired_at?: Date;
  };
  news_break?: {
    _id: string;
    status: TStatus;
    published_at?: Date;
    expired_at?: Date;
  };
};

export type TNewsResponse = Response<TNews>;
export type TBulkNewsResponse = Response<TNews[]>;
