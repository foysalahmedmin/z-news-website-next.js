import { ENV } from "../env";

export const URLS = {
  user: `${ENV.base_url}/uploads/images/user`,
  news: {
    thumbnail: `${ENV.base_url}/uploads/news/thumbnails`,
    image: `${ENV.base_url}/uploads/news/images`,
  },
};
