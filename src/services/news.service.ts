import { ENV } from "@/config";
import { TBulkNewsResponse, TNewsResponse } from "@/types/news.type";

export async function fetchNews(
  slug: string,
  query?: Record<string, any>,
): Promise<TNewsResponse> {
  const queryString = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";

  const url = `${ENV.api_url}/api/news/${slug}/public${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return response.json() as Promise<TNewsResponse>;
}

export async function fetchBulkNews(
  query?: Record<string, any>,
): Promise<TBulkNewsResponse> {
  const queryString = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";

  const url = `${ENV.api_url}/api/news/public${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all news");
  }

  return response.json() as Promise<TBulkNewsResponse>;
}
