export const ENV = {
  base_url:
    (process.env.NEXT_PUBLIC_VITE_BASE_URL as string) ||
    "http://localhost:3000",
  environment: process.env.NODE_ENV as "development" | "production",
};
