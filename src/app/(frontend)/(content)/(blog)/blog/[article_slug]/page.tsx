import { getBlogPostBySlug } from '@/api/blog/posts'
import { isNone } from '@/core/fn/maybe'
import { notFound } from 'next/navigation'
import { RichText } from '@/components/richtext'
import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

// Estimate reading time by extracting all text nodes from Lexical JSON and counting words
function estimateReadingTimeFromLexical(content: unknown): number {
  const texts: string[] = []
  const walk = (node: unknown) => {
    if (!node) return
    if (Array.isArray(node)) {
      for (const n of node) walk(n)
      return
    }
    if (typeof node === 'object') {
      const obj = node as Record<string, unknown>
      if (typeof obj.text === 'string') texts.push(obj.text)
      for (const v of Object.values(obj)) walk(v)
    }
  }
  walk(content)
  const wordCount = texts.join(' ').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / 200)) // ~200 wpm
}

export default async function Page({ params }: { params: Promise<{ article_slug: string }> }) {
  const { article_slug } = await params
  const post = await getBlogPostBySlug({ slug: article_slug })

  if (isNone(post)) {
    return notFound()
  }

  const readingMinutes = estimateReadingTimeFromLexical(post.value.content)
  const publishedDate = post.value.publishedAt ? new Date(post.value.publishedAt) : null

  return (
    <div className="mx-auto max-w-5xl border border-border mt-24 relative">
      <div className="flex items-center justify-center gap-2 px-4 pt-6 text-xs sm:text-sm">
        <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back to blog</span>
        </Link>
        <span className="text-muted-foreground">blog</span>
        <span className="text-muted-foreground">/</span>
        <Link
          href={`/blog/category/${post.value.category}`}
          className="text-primary-foreground hover:underline"
        >
          {post.value.category}
        </Link>
      </div>
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mt-6 mb-8">{post.value.title}</h1>
      {typeof post.value.author === 'object' && post.value.author && (
        <div className="flex justify-center mt-2">
          <Avatar className="size-6">
            <AvatarImage
              src={(post.value.author as any).avatarUrl || undefined}
              alt={(post.value.author as any).name || 'Author avatar'}
            />
            <AvatarFallback>
              {(((post.value.author as any).name as string | undefined)?.[0] || 'A')}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
          <div className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{readingMinutes} min read</span>
          </div>
          {publishedDate && (
            <time dateTime={publishedDate.toISOString()}>
              {publishedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </time>
          )}
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <RichText data={post.value.content} />
      </div>
    </div>
  )
}
