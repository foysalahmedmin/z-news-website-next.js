import { ENV } from "@/config";
import { TCategoriesResponse } from "@/types/category.type";

export async function fetchCategoriesTree(
  query?: Record<string, any>,
): Promise<TCategoriesResponse> {
  const queryString = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";

  const response = await fetch(
    `${ENV.base_url}/api/category/tree/public${queryString}`,
    {
      method: "GET",
      cache: "force-cache", // or "force-cache" if you want caching
    },
  );

  //   console.log(response);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json() as Promise<TCategoriesResponse>;
}
