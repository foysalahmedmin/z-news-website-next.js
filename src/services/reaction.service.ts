import { ENV } from "@/config";
import { TReactionResponse, TReactionsResponse } from "@/types/reaction.type";

export async function fetchSelfNewsReactions(
  query?: Record<string, any>,
): Promise<TReactionsResponse> {
  const queryString = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";

  const url = `${ENV.api_url}/api/reaction/self${queryString}`;

  console.log(url);

  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return response.json() as Promise<TReactionsResponse>;
}

export const createReaction = async (payload: any) => {
  const url = `${ENV.api_url}/api/reaction`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json() as Promise<TReactionResponse>;
};

export const updateReaction = async (_id: string, payload: any) => {
  const url = `${ENV.api_url}/api/reaction/${_id}/self`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json() as Promise<TReactionResponse>;
};

export const deleteReaction = async (_id: string) => {
  const url = `${ENV.api_url}/api/reaction/${_id}/self`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  return response.json() as Promise<TReactionResponse>;
};
