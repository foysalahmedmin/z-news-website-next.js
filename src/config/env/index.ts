export const ENV = {
  // app_url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  // api_url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  app_url:
    process.env.NEXT_PUBLIC_APP_URL || "https://z-news-server.vercel.app",
  api_url: process.env.NEXT_PUBLIC_API_URL || "https://z-news.vercel.app",
  environment:
    (process.env.NODE_ENV as "development" | "production") || "development",
};
