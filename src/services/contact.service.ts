import api from "@/lib/api";
import { ENV } from "@/config";
import type { TContactPayload, TContactResponse } from "@/types/contact.type";

export const submitContact = async (
  payload: TContactPayload,
): Promise<TContactResponse> => {
  const url = `${ENV.api_url}/api/contact`;

  const response = await api.post<TContactResponse>(url, payload);

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to submit contact form");
  }

  return response.data;
};

