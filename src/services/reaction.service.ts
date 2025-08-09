import { ENV } from "@/config";
import { TReactionsResponse } from "@/types/reaction.type";

export async function fetchNewsReactions(
  query?: Record<string, any>,
): Promise<TReactionsResponse> {
  const queryString = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";

  const url = `${ENV.api_url}/api/reaction/self${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return response.json() as Promise<TReactionsResponse>;
}
