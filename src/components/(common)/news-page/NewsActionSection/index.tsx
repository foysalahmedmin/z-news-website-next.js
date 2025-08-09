// components/NewsActions.tsx
"use client";

import { Bookmark, Eye, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

type NewsActionSectionProps = {
  newsId?: string;
};

interface NewsStats {
  likes: number;
  dislikes: number;
  views: number;
  bookmarks: number;
}

interface UserActions {
  liked: boolean;
  disliked: boolean;
  bookmarked: boolean;
}

const NewsActionSection: React.FC<NewsActionSectionProps> = ({ newsId }) => {
  const [stats, setStats] = useState<NewsStats>({
    likes: 0,
    dislikes: 0,
    views: 0,
    bookmarks: 0,
  });

  const [userActions, setUserActions] = useState<UserActions>({
    liked: false,
    disliked: false,
    bookmarked: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load initial stats and user actions
  useEffect(() => {
    const loadNewsData = async () => {
      try {
        // Fetch news stats
        const response = await fetch(`/api/news/${newsId}/stats`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }

        // Fetch user actions (if logged in)
        const userResponse = await fetch(`/api/news/${newsId}/user-actions`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserActions(userData);
        }

        // Increment view count
        await fetch(`/api/news/${newsId}/view`, { method: "POST" });
      } catch (error) {
        console.error("Error loading news data:", error);
      }
    };

    loadNewsData();
  }, [newsId]);

  const handleLike = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/news/${newsId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setStats((prev) => ({
          ...prev,
          likes: data.likes,
          dislikes: data.dislikes,
        }));
        setUserActions((prev) => ({
          ...prev,
          liked: data.userLiked,
          disliked: data.userDisliked,
        }));
      }
    } catch (error) {
      console.error("Error liking news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDislike = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/news/${newsId}/dislike`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setStats((prev) => ({
          ...prev,
          likes: data.likes,
          dislikes: data.dislikes,
        }));
        setUserActions((prev) => ({
          ...prev,
          liked: data.userLiked,
          disliked: data.userDisliked,
        }));
      }
    } catch (error) {
      console.error("Error disliking news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookmark = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/news/${newsId}/bookmark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setStats((prev) => ({
          ...prev,
          bookmarks: data.bookmarks,
        }));
        setUserActions((prev) => ({
          ...prev,
          bookmarked: data.userBookmarked,
        }));
      }
    } catch (error) {
      console.error("Error bookmarking news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Like Button */}
            <button
              onClick={handleLike}
              disabled={isLoading}
              className={`flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${
                userActions.liked
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-900"
              } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
            >
              <ThumbsUp
                size={18}
                className={userActions.liked ? "fill-current" : ""}
              />
              <span className="font-medium">পছন্দ</span>
              <span className="text-sm">({formatCount(stats.likes)})</span>
            </button>

            {/* Dislike Button */}
            <button
              onClick={handleDislike}
              disabled={isLoading}
              className={`flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${
                userActions.disliked
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600"
              } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
            >
              <ThumbsDown
                size={18}
                className={userActions.disliked ? "fill-current" : ""}
              />
              <span className="font-medium">অপছন্দ</span>
              <span className="text-sm">({formatCount(stats.dislikes)})</span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              disabled={isLoading}
              className={`flex items-center gap-2 rounded-full px-4 py-2 transition-colors ${
                userActions.bookmarked
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
              } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
            >
              <Bookmark
                size={18}
                className={userActions.bookmarked ? "fill-current" : ""}
              />
              <span className="font-medium">সংরক্ষণ</span>
              <span className="text-sm">({formatCount(stats.bookmarks)})</span>
            </button>
          </div>

          {/* View Count */}
          <div className="flex items-center gap-2 text-gray-600">
            <Eye size={18} />
            <span className="text-sm">
              {formatCount(stats.views)} বার দেখা হয়েছে
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsActionSection;
