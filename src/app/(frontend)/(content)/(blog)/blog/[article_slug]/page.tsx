import { getBlogPostBySlug } from '@/api/blog/posts'
import { isNone } from '@/core/fn/maybe'
import { notFound } from 'next/navigation'
import { RichText } from '@/components/richtext'

export default async function Page({ params }: { params: Promise<{ article_slug: string }> }) {
  const { article_slug } = await params
  const post = await getBlogPostBySlug({ slug: article_slug })

  if (isNone(post)) {
    return notFound()
  }

  return (
    <div className="mx-auto max-w-5xl border border-border mt-24 relative">
      <h1>Article {post.value.title}</h1>
      <div className="max-w-3xl mx-auto">
        <RichText data={post.value.content} />
      </div>
    </div>
  )
}
