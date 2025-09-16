import { ENV } from "@/config";
import { TEventResponse, TEventsResponse } from "@/types/event.type";

export async function fetchEvent(
  slug: string,
  query?: Record<string, any>,
): Promise<TEventResponse> {
  const queryString = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";

  const url = `${ENV.api_url}/api/event/${slug}/public${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    // next: { revalidate: 60 * 60 * 24 },
    next: { revalidate: 60 * 0.5 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json() as Promise<TEventResponse>;
}

export async function fetchEvents(
  query?: Record<string, any>,
): Promise<TEventsResponse> {
  const queryString = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : "";

  const url = `${ENV.api_url}/api/event/public${queryString}`;

  const response = await fetch(url, {
    method: "GET",
    // next: { revalidate: 60 * 60 * 24 },
    next: { revalidate: 60 * 0.5 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json() as Promise<TEventsResponse>;
}
