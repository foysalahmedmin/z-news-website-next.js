"use client";

import { cn } from "@/lib/utils";
import {
  createReaction,
  deleteReaction,
  fetchSelfNewsReactions,
  updateReaction,
} from "@/services/reaction.service";
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

  const handleReaction = async (type: "like" | "dislike") => {
    if (!news?._id) return;
    setIsLoading(true);

    try {
      if (reaction?._id) {
        // SAME reaction → remove
        if (reaction.type === type) {
          await deleteReaction(reaction._id); // server update
          setReaction({});
          if (type === "like") setLikesCount((c) => c - 1);
          else setDislikesCount((c) => c - 1);
          return;
        }

        // SWITCH reaction
        await updateReaction(reaction._id, { type }); // server update
        if (type === "like") {
          setLikesCount((c) => c + 1);
          setDislikesCount((c) => c - 1);
        } else {
          setLikesCount((c) => c - 1);
          setDislikesCount((c) => c + 1);
        }
        setReaction((prev) => ({ ...prev, type }));
      } else {
        // NEW reaction
        const { data } = await createReaction({ news: news._id, type }); // server update
        if (type === "like") setLikesCount((c) => c + 1);
        else setDislikesCount((c) => c + 1);
        setReaction(data || {});
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getReaction = async () => {
      try {
        const { data } = await fetchSelfNewsReactions({ news: news?._id });
        console.log(data);
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
        onClick={() => handleReaction("like")}
        className="flex h-full cursor-pointer items-center gap-1 px-2"
      >
        <ThumbsUp
          className={cn("size-5", {
            "fill-current": is_liked,
          })}
        />
        <span className="text-lg">{likesCount}</span>
      </button>
      <button
        disabled={isLoading}
        onClick={() => handleReaction("dislike")}
        className="flex h-full cursor-pointer items-center gap-1 px-2"
      >
        <ThumbsDown
          className={cn("size-5", {
            "fill-current": is_disliked,
          })}
        />
      </button>
    </div>
  );
};

export default Reaction;
