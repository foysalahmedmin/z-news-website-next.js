export const ENV = {
  app_url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  api_url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  environment:
    (process.env.NODE_ENV as "development" | "production") || "development",
};
