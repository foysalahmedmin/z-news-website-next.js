import type { Response } from "./response.type";

export type TStatus = "draft" | "pending" | "published" | "archived";

export type TFile = {
  _id: string;
  url: string;
  name: string;
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
  is_featured?: boolean;
  published_at?: Date;
  expired_at?: Date;
  layout?: string;
  views?: number;
};

export type TNewsResponse = Response<TNews>;
export type TBulkNewsResponse = Response<TNews[]>;
