export function buildArticleHref(args: {
  tutorialSlug: string
  type: 'tutorial' | 'examples' | 'references'
  articleSlug: string
  parentSlug?: string
}): string {
  const base = `/articles/${args.tutorialSlug}/${args.type}`
  return args.parentSlug
    ? `${base}/${args.parentSlug}/${args.articleSlug}`
    : `${base}/${args.articleSlug}`
}
