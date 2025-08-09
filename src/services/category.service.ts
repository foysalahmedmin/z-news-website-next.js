import { ENV } from "@/config";
import { TCategoriesResponse, TCategoryResponse } from "@/types/category.type";

export async function fetchCategory(
  slug: string,
  query?: Record<string, any>,
): Promise<TCategoryResponse> {
  const queryString = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";

  const url = `${ENV.api_url}/api/category/${slug}/public${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json() as Promise<TCategoryResponse>;
}

export async function fetchCategories(
  query?: Record<string, any>,
): Promise<TCategoriesResponse> {
  const queryString = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";

  const url = `${ENV.api_url}/api/category/public${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json() as Promise<TCategoriesResponse>;
}

export async function fetchCategoriesTree(
  query?: Record<string, any>,
): Promise<TCategoriesResponse> {
  const queryString = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";

  const url = `${ENV.api_url}/api/category/tree/public${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json() as Promise<TCategoriesResponse>;
}
