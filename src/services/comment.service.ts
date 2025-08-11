import { ENV } from "@/config";
import { TCommentResponse, TCommentsResponse } from "@/types/comment.type";

export const fetchComments = async (
  query?: Record<string, any>,
): Promise<TCommentsResponse> => {
  const queryString = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";

  const url = `${ENV.api_url}/api/comment/self${queryString}`;

  console.log(url);

  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
    credentials: "include", // <--- add this
  });

  if (!response.ok) {
    throw new Error("Failed to fetch reactions");
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
    credentials: "include", // <--- add this
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
    credentials: "include", // <--- add this
    body: JSON.stringify(payload),
  });
  return response.json() as Promise<TCommentResponse>;
};

export const deleteComment = async (_id: string) => {
  const url = `${ENV.api_url}/api/comment/${_id}/self`;
  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include", // <--- add this
  });
  return response.json() as Promise<TCommentResponse>;
};
