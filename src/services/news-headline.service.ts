import { ENV } from "@/config";
import { TNewsHeadlinesResponse } from "@/types/news-headline.type";

export const fetchNewsHeadlines = async (
  query?: Record<string, any>,
): Promise<TNewsHeadlinesResponse> => {
  const queryString = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";

  const url = `${ENV.api_url}/api/news-headline/public${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    next: { revalidate: 60 * 5 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch news headlines");
  }

  return response.json() as Promise<TNewsHeadlinesResponse>;
};
