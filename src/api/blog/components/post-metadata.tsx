import { Clock } from 'lucide-react'
import { BlogPost } from '@/payload-types'

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

const ReadingTime = ({ content }: { content: BlogPost['content'] }) => {
  const readingMinutes = estimateReadingTimeFromLexical(content)
  return (
    <div className="inline-flex items-center gap-1.5">
      <Clock className="h-3.5 w-3.5" />
      <span>{readingMinutes} min read</span>
    </div>
  )
}

const PublishedDate = ({ date }: { date: BlogPost['publishedAt'] }) => {
  const publishedDate = date ? new Date(date) : null
  return (
    <time dateTime={publishedDate?.toISOString()}>
      {publishedDate?.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}
    </time>
  )
}

const PostMetadataRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
      {children}
    </div>
  )
}

export const PostMetadata = ({
  content,
  publishedAt,
}: {
  content: BlogPost['content']
  publishedAt: BlogPost['publishedAt']
}) => {
  return (
    <PostMetadataRoot>
      <ReadingTime content={content} />
      <PublishedDate date={publishedAt} />
    </PostMetadataRoot>
  )
}
