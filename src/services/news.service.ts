import { ENV } from "@/config";
import { TBulkNewsResponse, TNewsResponse } from "@/types/news.type";

export const fetchNews = async (
  slug: string,
  query?: Record<string, any>,
): Promise<TNewsResponse> => {
  const queryString = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";

  const url = `${ENV.api_url}/api/news/${slug}/public${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    next: { revalidate: 60 * 30 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return response.json() as Promise<TNewsResponse>;
};

export const fetchBulkNews = async (
  query?: Record<string, any>,
): Promise<TBulkNewsResponse> => {
  const queryString = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";

  const url = `${ENV.api_url}/api/news/public${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    next: { revalidate: 60 * 1 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all news");
  }

  return response.json() as Promise<TBulkNewsResponse>;
};

export const fetchFeaturedBulkNews = async (
  query?: Record<string, any>,
): Promise<TBulkNewsResponse> => {
  const queryString = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";

  const url = `${ENV.api_url}/api/news/public/featured${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    next: { revalidate: 60 * 1 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all news");
  }

  return response.json() as Promise<TBulkNewsResponse>;
};
