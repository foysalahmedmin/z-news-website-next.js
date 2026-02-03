import { ENV } from "@/config";
import { TCommentResponse, TCommentsResponse } from "@/types/comment.type";

export const fetchComments = async (
  query?: Record<string, any>,
): Promise<TCommentsResponse> => {
  const queryString = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";

  const url = `${ENV.api_url}/api/comment/public${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
    credentials: "include",
  });

  if (!response.ok) {
    return {
      data: [],
      message: "Failed to fetch comments",
      success: false,
    };
  }

  return response.json() as Promise<TCommentsResponse>;
};

export const createComment = async (payload: any) => {
  const url = `${ENV.api_url}/api/comment`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return response.json() as Promise<TCommentResponse>;
};

export const updateComment = async (_id: string, payload: any) => {
  const url = `${ENV.api_url}/api/comment/${_id}/self`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return response.json() as Promise<TCommentResponse>;
};

export const deleteComment = async (_id: string) => {
  const url = `${ENV.api_url}/api/comment/${_id}/self`;
  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json() as Promise<TCommentResponse>;
};
