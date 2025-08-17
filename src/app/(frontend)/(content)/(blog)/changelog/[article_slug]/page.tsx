import { ChangelogPost } from '@/api/blog/changelog/components/changelog-post'
import { getBlogPostBySlug } from '@/api/blog/posts'
import { isNone } from '@/core/fn/maybe'
import { notFound } from 'next/navigation'


// TODO: Add support for draft posts only for admins. Need admin support and unauthorized access to draft posts for normal users.
// ? if (isDraft(post) && !isAdmin()) {
// ?   return unauthorized()
// ? }
export default async function Page({ params }: { params: Promise<{ article_slug: string }> }) {
  const { article_slug } = await params
  const post = await getBlogPostBySlug({ slug: article_slug })

  if (isNone(post)) {
    return notFound()
  }

  return <ChangelogPost post={post.value} />
}
