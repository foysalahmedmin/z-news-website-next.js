// components/CommentSection.tsx
"use client";

import NewsCommentCardSkeleton from "@/components/skeletons/cards-skeleton/NewsCommentCardSkeleton";
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
import {
  Check,
  ChevronRight,
  Edit2,
  MessageCircle,
  Send,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const NewsCommentCard = ({
  comment,
  onUpdate,
  onDelete,
}: {
  comment: TComment;
  onUpdate: (id: string, updatedComment: TComment) => void;
  onDelete: (id: string) => void;
}) => {
  const { _id, name, email, content, is_edited, created_at, user, guest } =
    comment || {};
  const image = user?.image ? URLS.user + "/" + user?.image : "";

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: name || "",
    email: email || "",
    content: content || "",
  });

  const token = Cookies.get("guest_token");
  const isOwner = token === guest;

  const handleUpdateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !isOwner) return;

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const updatedName = formData.get("name") as string;
    const updatedEmail = formData.get("email") as string;
    const updatedContent = formData.get("content") as string;

    if (!updatedName || !updatedEmail || !updatedContent) return;

    setIsLoading(true);
    try {
      const { data } = await updateComment(_id, {
        name: updatedName,
        email: updatedEmail,
        content: updatedContent,
      });

      if (data) {
        onUpdate(_id, data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async () => {
    if (isLoading || !isOwner) return;

    if (!window.confirm("আপনি কি নিশ্চিত যে এই মন্তব্যটি মুছে ফেলতে চান?")) {
      return;
    }

    setIsLoading(true);
    try {
      await deleteComment(_id);
      onDelete(_id);
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      name: name || "",
      email: email || "",
      content: content || "",
    });
  };

  return (
    <div className={`rounded-md p-4 ${isEditing ? "bg-muted/50 border" : ""}`}>
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
            <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full">
              <span className="text-muted-foreground text-xs font-medium">
                {name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          {!isEditing ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between">
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
                    <span className="text-muted-foreground text-xs">
                      (সম্পাদিত)
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                {isOwner && (
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      disabled={isLoading}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDeleteComment}
                      disabled={isLoading}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                )}
              </div>

              {/* Content */}
              <p className="whitespace-pre-wrap">{content}</p>
            </>
          ) : (
            /* Edit Form */
            <form onSubmit={handleUpdateComment} className="space-y-3">
              <div className="space-y-2">
                <FormControl
                  type="text"
                  name="name"
                  placeholder="আপনার নাম"
                  defaultValue={editForm.name}
                />
                <FormControl
                  type="email"
                  name="email"
                  placeholder="আপনার ইমেইল"
                  defaultValue={editForm.email}
                />
                <textarea
                  name="content"
                  placeholder="আপনার মন্তব্য লিখুন..."
                  className={cn(
                    formControlVariants({
                      variant: "default",
                      size: "default",
                    }),
                    "h-auto py-2",
                  )}
                  rows={4}
                  defaultValue={editForm.content}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                >
                  <X size={14} />
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  <Check size={14} />
                  {isLoading ? "আপডেট হচ্ছে..." : "আপডেট"}
                </Button>
              </div>
            </form>
          )}
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
  const [saveCredentials, setSaveCredentials] = useState(false);

  // Get saved credentials from cookies
  const [savedName, setSavedName] = useState(Cookies.get("guest_name") || "");
  const [savedEmail, setSavedEmail] = useState(
    Cookies.get("guest_email") || "",
  );

  // Load comments
  useEffect(() => {
    const loadComments = async () => {
      setIsLoading(true);
      try {
        const { data, meta } = await fetchComments({ news: news?._id });
        setComments(data || []);
        setMeta(meta || {});
      } catch (error) {
        console.error("Error loading comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (news) {
      loadComments();
    }
  }, [news]);

  // Set saveCredentials checkbox if credentials exist
  useEffect(() => {
    if (savedName || savedEmail) {
      setSaveCredentials(true);
    }
  }, [savedName, savedEmail]);

  // Submit new comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const content = formData.get("content") as string;

    if (!name || !email || !content) return;

    // Save credentials to cookies if checkbox is checked
    if (saveCredentials) {
      Cookies.set("guest_name", name, { expires: 365 }); // Save for 1 year
      Cookies.set("guest_email", email, { expires: 365 });
      setSavedName(name);
      setSavedEmail(email);
    }

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
        setMeta((prev) => ({ ...prev, total: (prev.total || 0) + 1 }));
        // Reset only content field, keep name and email if saved
        const form = e.currentTarget as HTMLFormElement;
        const contentField = form.querySelector(
          'textarea[name="content"]',
        ) as HTMLTextAreaElement;
        if (contentField) {
          contentField.value = "";
        }
        if (!saveCredentials) {
          form.reset();
        }
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear saved credentials
  const handleClearCredentials = () => {
    Cookies.remove("guest_name");
    Cookies.remove("guest_email");
    setSavedName("");
    setSavedEmail("");
    setSaveCredentials(false);
  };

  // Handle comment update
  const handleUpdateComment = (id: string, updatedComment: TComment) => {
    setComments((prev) =>
      prev.map((comment) => (comment._id === id ? updatedComment : comment)),
    );
  };

  // Handle comment delete
  const handleDeleteComment = (id: string) => {
    setComments((prev) => prev.filter((comment) => comment._id !== id));
    setMeta((prev) => ({ ...prev, total: Math.max((prev.total || 1) - 1, 0) }));
  };

  return (
    <div className="container mx-auto max-w-4xl">
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
          <ChevronRight
            className={cn("transition-transform duration-200", {
              "rotate-90": isOpen,
            })}
            size={20}
          />
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
                <FormControl
                  type="text"
                  name="name"
                  placeholder="আপনার নাম"
                  defaultValue={savedName}
                  required
                />
                <FormControl
                  type="email"
                  name="email"
                  placeholder="আপনার ইমেইল"
                  defaultValue={savedEmail}
                  required
                />
                <textarea
                  name="content"
                  placeholder="আপনার মন্তব্য লিখুন..."
                  className={cn(
                    formControlVariants({
                      variant: "default",
                      size: "default",
                    }),
                    "h-auto py-2",
                  )}
                  rows={4}
                  required
                />
              </div>

              {/* Save credentials option */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={saveCredentials}
                      onChange={(e) => setSaveCredentials(e.target.checked)}
                      className="border-muted rounded"
                    />
                    <span className="text-muted-foreground text-sm">
                      নাম ও ইমেইল মনে রাখুন
                    </span>
                  </label>

                  {(savedName || savedEmail) && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleClearCredentials}
                      className="h-auto p-1 text-xs text-red-600 hover:text-red-700"
                    >
                      সংরক্ষিত তথ্য মুছুন
                    </Button>
                  )}
                </div>

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  <Send size={16} />
                  {isSubmitting ? "পাঠানো হচ্ছে..." : "মন্তব্য পাঠান"}
                </Button>
              </div>
            </form>

            {/* Comments List */}
            {isLoading ? (
              <div className="space-y-4 py-8">
                {Array.from({ length: 3 }).map((_, index) => (
                  <NewsCommentCardSkeleton key={index} />
                ))}
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
              <div className="space-y-4 py-4">
                {comments.map((comment) => (
                  <NewsCommentCard
                    key={comment._id}
                    comment={comment}
                    onUpdate={handleUpdateComment}
                    onDelete={handleDeleteComment}
                  />
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
