"use client";

import NewsCard from "@/components/cards/NewsCard";
import NewsCardSkeleton from "@/components/skeletons/cards-skeleton/NewsCardSkeleton";
import { Button } from "@/components/ui/Button";
import { fetchBulkNews } from "@/services/news.service";
import { TNews } from "@/types/news.type";
import { Newspaper } from "lucide-react";
import React, { useEffect, useState } from "react";

type RelatedNewsSectionProps = {
  news?: Partial<TNews>;
};

const RelatedNewsSection: React.FC<RelatedNewsSectionProps> = ({ news }) => {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<TNews[]>([]);
  const [meta, setMeta] = useState<{
    total?: number;
    limit?: number;
    page?: number;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const hasMore = !!(meta?.total && meta?.total > data?.length);

  useEffect(() => {
    if (!news?.category?._id) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, meta } = await fetchBulkNews({
          page,
          limit: 6,
          category: news?.category?._id,
          sort: "-published_at",
        });
        setData((prev) => [...prev, ...(data || [])]);
        setMeta(meta || {});
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <>
      {data?.length > 0 && (
        <section className="container mx-auto max-w-4xl">
          <div className="bg-card space-y-6 rounded-md border p-6 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <Newspaper size={20} />
                <h3 className="text-xl font-bold">সম্পর্কিত সংবাদ</h3>
              </div>
            </div>
            <div>
              <div>
                {isLoading && page === 1 ? (
                  <div>
                    {Array.from({ length: 12 }).map((_, index) => (
                      <div
                        key={index}
                        className="border-b py-2 last:border-b-0"
                      >
                        <NewsCardSkeleton type="list" />
                      </div>
                    ))}
                  </div>
                ) : data.length === 0 ? (
                  <p className="py-4 text-center">কোন সংবাদ পাওয়া যায়নি</p>
                ) : (
                  <div>
                    {data?.map((item, index) => (
                      <div
                        key={index}
                        className="border-b py-2 last:border-b-0"
                      >
                        <NewsCard news={item} type="list" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {hasMore && (
                <div className="mt-10 flex justify-center">
                  <Button
                    className="primary mx-4"
                    onClick={() => setPage((prev) => prev + 1)}
                    isLoading={isLoading}
                    size={"lg"}
                  >
                    {isLoading ? "লোড হচ্ছে..." : "আরও দেখুন"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default RelatedNewsSection;
