import type { Response } from "./response.type";

export type TStatus = "draft" | "pending" | "published" | "archived";

export type TReaction = {
  _id: string;
  news: string;
  user?: string;
  guest?: string;
  type: "like" | "dislike";
  status?: TStatus;
  is_deleted?: boolean;
};

export type TReactionResponse = Response<TReaction>;
export type TReactionsResponse = Response<TReaction[]>;
