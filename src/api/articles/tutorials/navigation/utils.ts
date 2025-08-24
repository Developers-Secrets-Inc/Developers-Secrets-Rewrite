export function findPrevNextIndices<T extends { slug: string }>(
  items: T[],
  currentSlug: string,
): { prev: number; next: number; index: number } {
  const index = items.findIndex((i) => i.slug === currentSlug)
  if (index === -1) return { prev: -1, next: -1, index: -1 }
  const prev = index > 0 ? index - 1 : -1
  const next = index < items.length - 1 ? index + 1 : -1
  return { prev, next, index }
}
