// components/CommentSection.tsx
"use client";

import { Button } from "@/components/ui/Button";
import { FormControl, formControlVariants } from "@/components/ui/FormControl";
import { URLS } from "@/config";
import { cn } from "@/lib/utils";
import {
  createComment,
  deleteComment,
  fetchComments,
  updateComment,
} from "@/services/comment.service";
import { TComment } from "@/types/comment.type";
import { TNews } from "@/types/news.type";
import { formatCount } from "@/utils/formatCount";
import { formatDate } from "@/utils/formatDate";
import Cookies from "js-cookie";
import { ChevronRight, MessageCircle, Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const CommentItem = ({ comment }: { comment: TComment }) => {
  const { _id, name, email, content, is_edited, created_at, user, guest } =
    comment || {};
  const image = user?.image ? URLS.user + "/" + user?.image : "";

  const [isLoading, setIsLoading] = useState(false);

  const token = Cookies.get("guest_token");
  const isOwner = token === guest;

  const handleUpdateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !isOwner) return;

    const name = e.currentTarget.name.value;
    const email = e.currentTarget.email.value;
    const content = e.currentTarget.content.value;

    if (!name || !email || !content) return;

    setIsLoading(true);
    try {
      const { data } = await updateComment(_id, {
        name,
        email,
        content,
      });
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !isOwner) return;

    setIsLoading(true);
    try {
      await deleteComment(_id);
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`mb-6 rounded-md p-4`}>
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
              <span className="text-xs font-medium text-gray-600">
                {name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          {/* Header */}
          <div className="flex items-center gap-2">
            <div>
              <span className="font-medium">
                {name} {isOwner && "(আপনি)"}
              </span>
              {email && (
                <span className="text-muted-foreground text-sm">
                  {" "}
                  - {email}
                </span>
              )}
            </div>
            <span className="text-muted-foreground text-sm">
              {formatDate(new Date(created_at), "relative")}
            </span>
            {is_edited && (
              <span className="text-muted-foreground text-xs">(সম্পাদিত)</span>
            )}
          </div>

          {/* Content */}
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    </div>
  );
};

type NewsCommentSectionProps = {
  news?: Partial<TNews>;
};

const NewsCommentSection: React.FC<NewsCommentSectionProps> = ({ news }) => {
  const [comments, setComments] = useState<TComment[]>([]);
  const [meta, setMeta] = useState<{
    total?: number;
    limit?: number;
    page?: number;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load comments
  useEffect(() => {
    const loadComments = async () => {
      setIsLoading(true);
      try {
        const { data, meta } = await fetchComments({ news_id: news });
        setComments(data || []);
        setMeta(meta || {});
      } catch (error) {
        console.error("Error loading comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, [news]);

  // Submit new comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const name = e.currentTarget.name.value;
    const email = e.currentTarget.email.value;
    const content = e.currentTarget.content.value;

    if (!name || !email || !content) return;

    setIsSubmitting(true);
    try {
      const { data } = await createComment({
        news_id: news,
        name,
        email,
        content,
      });

      if (data?._id) {
        setComments((prev) => [data, ...prev]);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="bg-card rounded-md border p-6 shadow">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full cursor-pointer items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <MessageCircle size={20} />
            <h3 className="text-xl font-bold">
              মন্তব্য ({formatCount(meta?.total || 0)})
            </h3>
          </div>
          <ChevronRight className={isOpen ? "rotate-90" : ""} size={20} />
        </div>

        <div
          className={cn(
            "relative grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out",
            {
              "grid-rows-[1fr]": isOpen,
            },
          )}
        >
          <div
            className={cn(
              "invisible min-h-0 origin-top scale-y-0 space-y-2 overflow-hidden opacity-0 transition-transform duration-300 ease-in-out",
              {
                "visible min-h-fit origin-top scale-y-100 opacity-100 delay-100":
                  isOpen,
              },
            )}
          >
            {/* Comment Form */}
            <form
              onSubmit={handleSubmitComment}
              className="mt-4 space-y-4 px-0.5"
            >
              <div className="space-y-2">
                <FormControl type="text" name="name" placeholder="আপনার নাম" />
                <FormControl
                  type="email"
                  name="email"
                  placeholder="আপনার ইমেইল"
                />
                <textarea
                  placeholder="আপনার মন্তব্য লিখুন..."
                  className={cn(
                    formControlVariants({
                      variant: "default",
                      size: "default",
                    }),
                    "h-auto py-2",
                  )}
                  rows={4}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" isLoading={isSubmitting}>
                  <Send size={16} />
                  {isSubmitting ? "পাঠানো হচ্ছে..." : "মন্তব্য পাঠান"}
                </Button>
              </div>
            </form>

            {/* Comments List */}
            {isLoading ? (
              <div className="py-8 text-center">
                <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2"></div>
                <p className="text-muted-foreground mt-2">
                  মন্তব্য লোড হচ্ছে...
                </p>
              </div>
            ) : comments.length === 0 ? (
              <div className="space-y-4 py-8 text-center">
                <MessageCircle
                  size={48}
                  className="text-muted-foreground mx-auto"
                />
                <p className="text-muted-foreground">
                  এখনও কোনো মন্তব্য নেই। প্রথম মন্তব্য করুন!
                </p>
              </div>
            ) : (
              <div>
                {comments.map((comment) => (
                  <CommentItem key={comment._id} comment={comment} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCommentSection;
