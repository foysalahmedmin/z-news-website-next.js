"use client";

import { cn } from "@/lib/utils";
import { fetchNewsReactions } from "@/services/reaction.service";
import { TNews } from "@/types/news.type";
import { TReaction } from "@/types/reaction.type";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";

type ReactionProps = {
  news: Partial<TNews>;
};

const Reaction: React.FC<ReactionProps> = ({ news }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(news?.likes_count || 0);
  const [dislikesCount, setDislikesCount] = useState(news?.dislikes_count || 0);

  const [reaction, setReaction] = useState<Partial<TReaction>>({});
  const is_liked = reaction?.type === "like";
  const is_disliked = reaction?.type === "dislike";

  const handleReaction = (type: "like" | "dislike") => {
    setIsLoading(true);
    if (reaction?._id) {
      if (is_liked && type === "like") {
      }
    }
  };

  useEffect(() => {
    const getReaction = async () => {
      try {
        const { data } = await fetchNewsReactions({ news: news?._id });
        setReaction(data?.[0] || {});
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getReaction();
  }, [news]);

  return (
    <div className="divide-muted-foreground/25 bg-muted flex h-10 items-center divide-x rounded-md p-1">
      <button
        disabled={isLoading}
        className="flex h-full cursor-pointer items-center gap-1 px-2"
      >
        <ThumbsUp
          className={cn("size-5", {
            "fill-current": is_liked,
          })}
        />
        <span className="text-lg">{0}</span>
      </button>
      <button
        disabled={isLoading}
        className="flex h-full cursor-pointer items-center gap-1 px-2"
      >
        <ThumbsDown
          className={cn("size-5", {
            "fill-current": is_disliked,
          })}
        />
        {/* <span className="text-lg">{0}</span> */}
      </button>
    </div>
  );
};

export default Reaction;
