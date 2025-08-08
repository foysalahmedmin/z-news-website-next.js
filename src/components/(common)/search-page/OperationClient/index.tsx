"use client";

import { Button } from "@/components/ui/Button";
import { fetchCategories } from "@/services/category.service";
import { fetchBulkNews } from "@/services/news.service";
import { TCategory } from "@/types/category.type";
import { TNews } from "@/types/news.type";
import { Calendar, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const OperationClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [categories, setCategories] = useState<TCategory[]>([]);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<TNews[]>([]);
  const [meta, setMeta] = useState<{
    total?: number;
    limit?: number;
    page?: number;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Read filters directly from searchParams
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "-published_at";
  const search = searchParams.get("search") || "";
  const published_at_gte = searchParams.get("published_at_gte") || "";
  const published_at_lte = searchParams.get("published_at_lte") || "";

  // Convert URL params to date range (derived state)
  const selectedRange: DateRange | undefined = (() => {
    if (published_at_gte && published_at_lte) {
      return {
        from: new Date(published_at_gte),
        to: new Date(published_at_lte),
      };
    } else if (published_at_gte) {
      return {
        from: new Date(published_at_gte),
        to: undefined,
      };
    }
    return undefined;
  })();

  // Find selected category object from categories list
  const selectedCategory =
    categories.find((cat) => cat._id === category) || null;

  const hasMore = meta?.total && meta.total > data.length;

  // Update URL params helper
  const updateSearchParams = (newParams: { [key: string]: string | null }) => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );

    Object.entries(newParams).forEach(([key, value]) => {
      if (!value) currentParams.delete(key);
      else currentParams.set(key, value);
    });

    currentParams.delete("page"); // Reset page on filter change
    router.push(`?${currentParams.toString()}`);
    setPage(1);
  };

  // Handle date range selection
  const handleDateRangeSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      updateSearchParams({
        published_at_gte: range.from.toISOString().split("T")[0],
        published_at_lte: range.to.toISOString().split("T")[0],
      });
    } else if (range?.from) {
      updateSearchParams({
        published_at_gte: range.from.toISOString().split("T")[0],
        published_at_lte: null,
      });
    } else {
      updateSearchParams({
        published_at_gte: null,
        published_at_lte: null,
      });
    }
  };

  // Clear date range
  const clearDateRange = () => {
    updateSearchParams({
      published_at_gte: null,
      published_at_lte: null,
    });
  };

  // Format date for display
  const formatDateRange = () => {
    if (!selectedRange?.from) return "তারিখ নির্বাচন করুন";

    const fromDate = selectedRange.from.toLocaleDateString("bn-BD", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    if (!selectedRange.to) return `${fromDate} থেকে`;

    const toDate = selectedRange.to.toLocaleDateString("bn-BD", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return `${fromDate} - ${toDate}`;
  };

  // Preset date ranges
  const setPresetRange = (days: number) => {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - days);

    updateSearchParams({
      published_at_gte: startDate.toISOString().split("T")[0],
      published_at_lte: today.toISOString().split("T")[0],
    });
    setIsDatePickerOpen(false);
  };

  // Fetch categories once
  useEffect(() => {
    fetchCategories()
      .then(({ data }) => setCategories(data || []))
      .catch(console.error);
  }, []);

  // Fetch news when filters or page change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data: newsData, meta: newsMeta } = await fetchBulkNews({
          page,
          limit: 12,
          ...(category && { category: category }),
          ...(sort && { sort }),
          ...(search && { search }),
          ...(published_at_gte && { published_at: published_at_gte }),
          ...(published_at_lte && { published_at: published_at_lte }),
        });

        if (page === 1) setData(newsData || []);
        else setData((prev) => [...prev, ...(newsData || [])]);

        setMeta(newsMeta || {});
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, category, sort, search, published_at_gte, published_at_lte]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">অনুসন্ধান</h1>

      <div className="mb-6 flex flex-wrap gap-4">
        {/* Category */}
        <select
          className="rounded border px-3 py-2"
          value={category}
          onChange={(e) =>
            updateSearchParams({ category: e.target.value || null })
          }
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="rounded border px-3 py-2"
          value={sort}
          onChange={(e) => updateSearchParams({ sort: e.target.value || null })}
        >
          <option value="-published_at">Newest First</option>
          <option value="published_at">Oldest First</option>
          <option value="-sequence">Highest Sequence</option>
          <option value="sequence">Lowest Sequence</option>
        </select>

        {/* Date Range Picker */}
        <div className="relative">
          <button
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className="flex min-w-[200px] items-center gap-2 rounded border bg-white px-3 py-2 transition-colors hover:bg-gray-50"
          >
            <Calendar size={16} />
            <span className="text-sm">{formatDateRange()}</span>
            {selectedRange?.from && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearDateRange();
                }}
                className="ml-auto text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </button>

          {isDatePickerOpen && (
            <div className="absolute top-full left-0 z-50 mt-2 rounded-lg border bg-white p-4 shadow-lg">
              {/* Quick Presets */}
              <div className="mb-4 flex flex-wrap gap-2 border-b pb-4">
                <button
                  onClick={() => setPresetRange(7)}
                  className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 transition-colors hover:bg-blue-200"
                >
                  গত ৭ দিন
                </button>
                <button
                  onClick={() => setPresetRange(30)}
                  className="rounded bg-green-100 px-2 py-1 text-xs text-green-700 transition-colors hover:bg-green-200"
                >
                  গত ৩০ দিন
                </button>
                <button
                  onClick={() => setPresetRange(90)}
                  className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-700 transition-colors hover:bg-purple-200"
                >
                  গত ৯০ দিন
                </button>
                <button
                  onClick={() => {
                    clearDateRange();
                    setIsDatePickerOpen(false);
                  }}
                  className="rounded bg-red-100 px-2 py-1 text-xs text-red-700 transition-colors hover:bg-red-200"
                >
                  পরিষ্কার
                </button>
              </div>

              {/* Calendar */}
              <DayPicker
                mode="range"
                selected={selectedRange}
                onSelect={handleDateRangeSelect}
                numberOfMonths={2}
                disabled={{ after: new Date() }} // Prevent future dates
                className="rdp"
                classNames={{
                  day_selected: "bg-blue-500 text-white",
                  day_range_start: "bg-blue-500 text-white rounded-l-full",
                  day_range_end: "bg-blue-500 text-white rounded-r-full",
                  day_range_middle: "bg-blue-100 text-blue-900",
                  day_disabled: "text-gray-300 cursor-not-allowed",
                }}
                footer={
                  selectedRange?.from && (
                    <div className="mt-4 rounded bg-gray-50 p-2 text-sm">
                      <strong>নির্বাচিত:</strong> {formatDateRange()}
                    </div>
                  )
                }
              />

              <div className="mt-4 flex justify-end gap-2 border-t pt-4">
                <button
                  onClick={() => setIsDatePickerOpen(false)}
                  className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                >
                  বন্ধ
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search */}
        <input
          type="text"
          className="min-w-[200px] flex-grow rounded border px-3 py-2"
          placeholder="খবর খুঁজুন..."
          value={search}
          onChange={(e) =>
            updateSearchParams({ search: e.target.value || null })
          }
        />
      </div>

      {/* Active Filters Display */}
      {(selectedRange?.from || category || search) && (
        <div className="mb-4 flex flex-wrap gap-2">
          {selectedRange?.from && (
            <div className="inline-flex items-center gap-1 rounded bg-blue-100 px-2 py-1 text-sm text-blue-800">
              <Calendar size={12} />
              {formatDateRange()}
              <button
                onClick={clearDateRange}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                <X size={12} />
              </button>
            </div>
          )}
          {selectedCategory && (
            <div className="inline-flex items-center gap-1 rounded bg-green-100 px-2 py-1 text-sm text-green-800">
              {selectedCategory.name}
              <button
                onClick={() => updateSearchParams({ category: null })}
                className="ml-1 text-green-600 hover:text-green-800"
              >
                <X size={12} />
              </button>
            </div>
          )}
          {search && (
            <div className="inline-flex items-center gap-1 rounded bg-yellow-100 px-2 py-1 text-sm text-yellow-800">
              "{search}"
              <button
                onClick={() => updateSearchParams({ search: null })}
                className="ml-1 text-yellow-600 hover:text-yellow-800"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* News List */}
      {isLoading && page === 1 ? (
        <p>Loading news...</p>
      ) : data.length === 0 ? (
        <p>No news found.</p>
      ) : (
        <ul className="space-y-4">
          {data.map((newsItem) => (
            <li
              key={newsItem._id}
              className="rounded border p-4 transition hover:shadow-md"
            >
              <h2 className="text-lg font-semibold">{newsItem.title}</h2>
              <p className="text-sm text-gray-500">Published on: </p>
              {newsItem.category && (
                <p className="text-xs text-gray-400">
                  Category: {newsItem.category.name}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            isLoading={isLoading}
          >
            {isLoading ? "লোড হচ্ছে..." : "আরও দেখুন"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default OperationClient;
