'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { getBlogPostPage } from '../index'

export function useInfiniteBlogPosts(options?: { limit?: number }) {
  const limit = options?.limit ?? 15

  return useInfiniteQuery({
    queryKey: ['blog-posts', { limit }],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getBlogPostPage({ page: pageParam as number, limit }),
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? (lastPage.page ?? 1) + 1 : undefined),
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  })
}
