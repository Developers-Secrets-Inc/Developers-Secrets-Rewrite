import { BlogPost } from '@/payload-types'
import { RichText } from '@/components/richtext'
import Link from 'next/link'

type TimelineStepProps = {
  index: number
  post: BlogPost
  isFirst: boolean
  isLast: boolean
}

export function TimelineStep({ index, post, isFirst, isLast }: TimelineStepProps) {
  const spineClass = 'relative flex w-10 self-stretch flex-col items-center justify-start gap-1'
  const formatDate = (input?: string | null): string => {
    if (!input) return ''
    const d = new Date(input)
    if (isNaN(d.getTime())) return String(input)
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(d)
  }
  const displayDate = formatDate(post.publishedAt) || '—'

  return (
    <div className="flex w-full flex-col items-center justify-between min-[960px]:flex-row min-[960px]:gap-10">
      <div className="ml-auto flex gap-4 min-[960px]:max-w-2xl min-[960px]:py-4">
        <div className="flex w-24 items-center justify-end">
          <span className="text-sm text-muted-foreground whitespace-nowrap">{displayDate}</span>
        </div>
        <div className="relative grid grid-cols-[2.5rem_1fr] min-[960px]:gap-4">
          <div className={spineClass}>
            <span className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 border-l border-dashed border-border z-0"></span>
            <span className="absolute left-1/2 -translate-x-1/2 top-0 z-10 flex size-5 items-center justify-center rounded-full border bg-muted/50">
              <span className="block size-2 rounded-full bg-primary"></span>
            </span>
          </div>
          <div className="flex flex-col justify-start gap-5 px-0 min-[960px]:gap-6">
            <h3 className="text-xl min-[960px]:text-2xl">
              <Link href={`/changelog/${post.slug}`}>{post.title}</Link>
            </h3>
            <p className="text-sm text-muted-foreground min-[960px]:text-base">
              <RichText data={post.content} />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
