// app/news/[slug]/loading.tsx
export default function NewsDetailsLoading() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse px-4 py-8">
      {/* Breadcrumb Skeleton */}
      <div className="mb-4 flex items-center gap-2">
        <div className="h-4 w-16 rounded bg-gray-200"></div>
        <div className="h-1 w-1 rounded-full bg-gray-300"></div>
        <div className="h-4 w-24 rounded bg-gray-200"></div>
        <div className="h-1 w-1 rounded-full bg-gray-300"></div>
        <div className="h-4 w-32 rounded bg-gray-200"></div>
      </div>

      {/* Featured Badge Skeleton */}
      <div className="mb-4">
        <div className="h-6 w-20 rounded-full bg-gray-200"></div>
      </div>

      {/* Title Skeleton */}
      <div className="mb-4">
        <div className="mb-2 h-8 rounded bg-gray-200"></div>
        <div className="mb-2 h-8 w-4/5 rounded bg-gray-200"></div>
        <div className="h-8 w-3/5 rounded bg-gray-200"></div>
      </div>

      {/* Description Skeleton */}
      <div className="mb-6">
        <div className="mb-2 h-5 rounded bg-gray-200"></div>
        <div className="mb-2 h-5 w-5/6 rounded bg-gray-200"></div>
        <div className="h-5 w-4/6 rounded bg-gray-200"></div>
      </div>

      {/* Meta Information Skeleton */}
      <div className="mb-6 flex flex-wrap items-center gap-4 border-b pb-6">
        {/* Author */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-gray-200"></div>
          <div className="h-4 w-12 rounded bg-gray-200"></div>
          <div className="h-4 w-20 rounded bg-gray-200"></div>
          <div className="h-6 w-6 rounded-full bg-gray-200"></div>
        </div>

        {/* Published Date */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-gray-200"></div>
          <div className="h-4 w-16 rounded bg-gray-200"></div>
          <div className="h-4 w-24 rounded bg-gray-200"></div>
        </div>

        {/* Category */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-gray-200"></div>
          <div className="h-4 w-20 rounded bg-gray-200"></div>
        </div>
      </div>

      {/* Thumbnail Skeleton */}
      <div className="mb-8">
        <div className="h-96 w-full rounded-lg bg-gray-200"></div>
      </div>

      {/* Content Skeleton */}
      <div className="mb-8 space-y-4">
        {/* Paragraph 1 */}
        <div className="space-y-2">
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 w-5/6 rounded bg-gray-200"></div>
        </div>

        {/* Paragraph 2 */}
        <div className="space-y-2">
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 w-4/5 rounded bg-gray-200"></div>
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 w-3/4 rounded bg-gray-200"></div>
        </div>

        {/* Paragraph 3 */}
        <div className="space-y-2">
          <div className="h-4 w-5/6 rounded bg-gray-200"></div>
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 w-4/6 rounded bg-gray-200"></div>
        </div>

        {/* Paragraph 4 */}
        <div className="space-y-2">
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 w-3/5 rounded bg-gray-200"></div>
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 w-4/5 rounded bg-gray-200"></div>
        </div>
      </div>

      {/* Additional Images Skeleton */}
      <div className="mb-8">
        <div className="mb-4 h-6 w-24 rounded bg-gray-200"></div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 w-full rounded-lg bg-gray-200"></div>
          ))}
        </div>
      </div>

      {/* Tags Skeleton */}
      <div className="mb-8">
        <div className="mb-3 h-5 w-20 rounded bg-gray-200"></div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-6 w-16 rounded-full bg-gray-200"></div>
          ))}
        </div>
      </div>

      {/* Share Options Skeleton */}
      <div className="mb-8 rounded-lg bg-gray-50 p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-gray-200"></div>
          <div className="h-5 w-32 rounded bg-gray-200"></div>
        </div>
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-20 rounded bg-gray-200"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// News Actions Skeleton Component
export function NewsActionsSkeleton() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse px-4 py-6">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Like Button Skeleton */}
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
              <div className="h-4 w-4 rounded bg-gray-200"></div>
              <div className="h-4 w-12 rounded bg-gray-200"></div>
              <div className="h-4 w-8 rounded bg-gray-200"></div>
            </div>

            {/* Dislike Button Skeleton */}
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
              <div className="h-4 w-4 rounded bg-gray-200"></div>
              <div className="h-4 w-12 rounded bg-gray-200"></div>
              <div className="h-4 w-8 rounded bg-gray-200"></div>
            </div>

            {/* Bookmark Button Skeleton */}
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
              <div className="h-4 w-4 rounded bg-gray-200"></div>
              <div className="h-4 w-12 rounded bg-gray-200"></div>
              <div className="h-4 w-8 rounded bg-gray-200"></div>
            </div>
          </div>

          {/* View Count Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-gray-200"></div>
            <div className="h-4 w-24 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Comment Section Skeleton Component
export function CommentSectionSkeleton() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse px-4 py-8">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        {/* Header Skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-gray-200"></div>
          <div className="h-6 w-32 rounded bg-gray-200"></div>
        </div>

        {/* Comment Form Skeleton */}
        <div className="mb-8">
          <div className="mb-3 h-24 w-full rounded-lg bg-gray-200"></div>
          <div className="flex justify-end">
            <div className="h-10 w-32 rounded-lg bg-gray-200"></div>
          </div>
        </div>

        {/* Comments List Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-200"></div>

                <div className="flex-1">
                  {/* Header */}
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-4 w-24 rounded bg-gray-200"></div>
                    <div className="h-4 w-16 rounded bg-gray-200"></div>
                  </div>

                  {/* Content */}
                  <div className="mb-3 space-y-2">
                    <div className="h-4 rounded bg-gray-200"></div>
                    <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded bg-gray-200"></div>
                      <div className="h-3 w-6 rounded bg-gray-200"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded bg-gray-200"></div>
                      <div className="h-3 w-8 rounded bg-gray-200"></div>
                    </div>
                  </div>

                  {/* Reply Skeleton (for first comment) */}
                  {i === 1 && (
                    <div className="mt-3 ml-12 rounded-lg bg-gray-50 p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-200"></div>
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <div className="h-4 w-20 rounded bg-gray-200"></div>
                            <div className="h-4 w-14 rounded bg-gray-200"></div>
                          </div>
                          <div className="mb-3">
                            <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <div className="h-3 w-3 rounded bg-gray-200"></div>
                              <div className="h-3 w-4 rounded bg-gray-200"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Related News Skeleton Component
export function RelatedNewsSkeleton() {
  return (
    <section className="mx-auto max-w-6xl animate-pulse bg-gray-50 px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="h-8 w-32 rounded bg-gray-200"></div>
          <div className="h-4 w-24 rounded bg-gray-200"></div>
        </div>
        <div className="mt-2 h-4 w-48 rounded bg-gray-200"></div>
      </div>

      {/* Related News Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <article
            key={i}
            className="overflow-hidden rounded-lg bg-white shadow-sm"
          >
            {/* Thumbnail */}
            <div className="h-48 bg-gray-200"></div>

            {/* Content */}
            <div className="p-5">
              {/* Category */}
              <div className="mb-2">
                <div className="h-5 w-16 rounded bg-gray-200"></div>
              </div>

              {/* Title */}
              <div className="mb-2 space-y-2">
                <div className="h-5 rounded bg-gray-200"></div>
                <div className="h-5 w-3/4 rounded bg-gray-200"></div>
              </div>

              {/* Description */}
              <div className="mb-3 space-y-2">
                <div className="h-4 rounded bg-gray-200"></div>
                <div className="h-4 w-5/6 rounded bg-gray-200"></div>
                <div className="h-4 w-2/3 rounded bg-gray-200"></div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between border-t pt-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded bg-gray-200"></div>
                    <div className="h-3 w-16 rounded bg-gray-200"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded bg-gray-200"></div>
                    <div className="h-3 w-8 rounded bg-gray-200"></div>
                  </div>
                </div>
                <div className="h-3 w-12 rounded bg-gray-200"></div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-10 text-center">
        <div className="mx-auto h-12 w-48 rounded-lg bg-gray-200"></div>
      </div>
    </section>
  );
}

// Complete Loading Page (Alternative approach)
export function CompleteNewsDetailsSkeleton() {
  return (
    <div>
      <NewsDetailsLoading />
      <NewsActionsSkeleton />
      <CommentSectionSkeleton />
      <RelatedNewsSkeleton />
    </div>
  );
}
