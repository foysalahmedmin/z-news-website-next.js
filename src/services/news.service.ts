import { ENV } from "@/config";
import { TBulkNewsResponse } from "@/types/news.type";

export async function fetchBulkNews(
  query?: Record<string, any>,
): Promise<TBulkNewsResponse> {
  const queryString = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";

  const url = `${ENV.base_url}/api/news/public${queryString}`;

  console.log(url);

  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json() as Promise<TBulkNewsResponse>;
}
