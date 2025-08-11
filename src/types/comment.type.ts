import { Response } from "./response.type";

export type TStatus = "pending" | "approved" | "rejected";

export type TComment = {
  _id: string;
  news: string;
  comment?: string;
  user?: {
    _id: string;
    name?: string;
    email?: string;
    image?: string;
  };
  guest?: string;
  name: string;
  email: string;
  content: string;
  status?: TStatus;
  is_edited?: boolean;
  edited_at?: Date;
  is_deleted?: boolean;
  created_at: string;
  updated_at: string;
};

export type TCommentResponse = Response<TComment>;
export type TCommentsResponse = Response<TComment[]>;
