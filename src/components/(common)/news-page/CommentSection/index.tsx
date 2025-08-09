// components/CommentSection.tsx
"use client";

import { MessageCircle, Reply, Send, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Comment {
  _id: string;
  content: string;
  author: {
    _id: string;
    name: string;
    image?: string;
  };
  created_at: Date;
  updated_at?: Date;
  likes: number;
  userLiked: boolean;
  replies: Comment[];
  isEdited?: boolean;
}

interface CommentSectionProps {
  newsId?: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ newsId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load comments
  useEffect(() => {
    const loadComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/news/${newsId}/comments`);
        if (response.ok) {
          const data = await response.json();
          setComments(data.comments || []);
        }
      } catch (error) {
        console.error("Error loading comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, [newsId]);

  // Submit new comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/news/${newsId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments((prev) => [data.comment, ...prev]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit reply
  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/comments/${parentId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyContent.trim() }),
      });

      if (response.ok) {
        const data = await response.json();

        // Update comments with new reply
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === parentId
              ? { ...comment, replies: [...comment.replies, data.reply] }
              : comment,
          ),
        );

        setReplyContent("");
        setReplyTo(null);
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Like comment
  const handleLikeComment = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments/${commentId}/like`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();

        // Update comment likes
        setComments((prev) =>
          prev.map((comment) => {
            if (comment._id === commentId) {
              return {
                ...comment,
                likes: data.likes,
                userLiked: data.userLiked,
              };
            }

            // Check replies
            const updatedReplies = comment.replies.map((reply) =>
              reply._id === commentId
                ? { ...reply, likes: data.likes, userLiked: data.userLiked }
                : reply,
            );

            return { ...comment, replies: updatedReplies };
          }),
        );
      }
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInHours =
      (now.getTime() - commentDate.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes} মিনিট আগে`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} ঘন্টা আগে`;
    } else {
      return commentDate.toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  };

  const CommentItem = ({
    comment,
    isReply = false,
  }: {
    comment: Comment;
    isReply?: boolean;
  }) => (
    <div
      className={`${isReply ? "mt-3 ml-12" : "mb-6"} rounded-lg bg-gray-50 p-4`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {comment.author.image ? (
            <Image
              src={comment.author.image}
              alt={comment.author.name}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
              <span className="text-xs font-medium text-gray-600">
                {comment.author.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="mb-2 flex items-center gap-2">
            <span className="font-medium text-gray-900">
              {comment.author.name}
            </span>
            <span className="text-sm text-gray-500">
              {formatDate(comment.created_at)}
            </span>
            {comment.isEdited && (
              <span className="text-xs text-gray-400">(সম্পাদিত)</span>
            )}
          </div>

          {/* Content */}
          <p className="mb-3 whitespace-pre-wrap text-gray-800">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLikeComment(comment._id)}
              className={`flex items-center gap-1 text-sm transition-colors ${
                comment.userLiked
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-900"
              }`}
            >
              <ThumbsUp
                size={14}
                className={comment.userLiked ? "fill-current" : ""}
              />
              <span>{comment.likes > 0 && comment.likes}</span>
            </button>

            {!isReply && (
              <button
                onClick={() =>
                  setReplyTo(replyTo === comment._id ? null : comment._id)
                }
                className="flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-blue-900"
              >
                <Reply size={14} />
                <span>উত্তর</span>
              </button>
            )}
          </div>

          {/* Reply Form */}
          {replyTo === comment._id && (
            <div className="mt-4 rounded-lg border bg-white p-3">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="আপনার উত্তর লিখুন..."
                className="w-full resize-none rounded-lg border p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleSubmitReply(comment._id)}
                  disabled={!replyContent.trim() || isSubmitting}
                  className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "পাঠানো হচ্ছে..." : "উত্তর পাঠান"}
                </button>
                <button
                  onClick={() => {
                    setReplyTo(null);
                    setReplyContent("");
                  }}
                  className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                >
                  বাতিল
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply._id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <MessageCircle size={20} />
          <h3 className="text-xl font-bold">মন্তব্য ({comments.length})</h3>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="আপনার মন্তব্য লিখুন..."
            className="w-full resize-none rounded-lg border p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={16} />
              {isSubmitting ? "পাঠানো হচ্ছে..." : "মন্তব্য পাঠান"}
            </button>
          </div>
        </form>

        {/* Comments List */}
        {isLoading ? (
          <div className="py-8 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">মন্তব্য লোড হচ্ছে...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="py-8 text-center">
            <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600">
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
  );
};

export default CommentSection;
