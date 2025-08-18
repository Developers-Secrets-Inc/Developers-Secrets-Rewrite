import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BlogPost, Admin } from '@/payload-types'
import { getBlogPostPage } from '..'
import { NewspaperIcon, Flame, BookOpen } from 'lucide-react'
import { RichText } from '@/components/richtext'
import { Cross } from '@/components/icons/cross'

const formatDate = (iso?: string | null) => {
  if (!iso) return undefined
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return undefined
  }
}


const TopPostItem = ({ post, index }: { post: BlogPost; index: number }) => {
  const avatarSrc: string | undefined = (post.author as Admin)?.avatarUrl ?? undefined
  const authorName: string = (post.author as Admin)?.name ?? 'Unknown'
  const publishedLabel = formatDate(post.publishedAt)
  const icons = [Flame, NewspaperIcon, BookOpen]
  const Icon = icons[index % icons.length]
  

  return (
    <Link href={`/blog/${post.slug}`} className="group flex-1 basis-0 min-w-0 p-8 flex flex-col md:h-[450px]">
      <div className="flex items-start justify-between">
        <Icon className="size-8 md:size-10 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
        {publishedLabel && (
          <span className="text-xs text-muted-foreground group-hover:text-primary-foreground transition-colors">
            {publishedLabel}
          </span>
        )}
      </div>
      <h3 className="mt-12 text-2xl md:text-3xl font-semibold tracking-tight group-hover:text-primary-foreground transition-colors">
        {post.title}
      </h3>
      <div
        className="mt-2 flex-1 min-h-0 relative z-0 line-clamp-8 break-words overflow-hidden [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_70%,rgba(0,0,0,0)_100%)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_70%,rgba(0,0,0,0)_100%)]"
      >
        <RichText
          data={(post as any).content}
          className="text-sm text-muted-foreground [&_p]:leading-6 group-hover:text-primary-foreground transition-colors"
        />
      </div>
      <div className="mt-8 flex items-center gap-2 shrink-0 group-hover:text-primary-foreground transition-colors">
        <Avatar className="size-6">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{authorName?.[0] ?? '?'}</AvatarFallback>
        </Avatar>
        <span className="text-sm text-muted-foreground group-hover:text-primary-foreground transition-colors">
          {authorName}
        </span>
      </div>
    </Link>
  )
}

export const TopBlogPosts = async ({
  posts,
  category,
}: {
  posts?: BlogPost[]
  category?: string
}) => {
  const resolved = posts?.slice(0, 3) ?? (await getBlogPostPage({ page: 1, limit: 3, category })).docs

  return (
    <section className="relative max-w-5xl mx-auto border-t border-x border-border">
      <Cross className="absolute left-0 top-0 -translate-y-1/2 -translate-x-1/2 z-0" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 divide-x divide-border">
        {resolved.map((post, index) => (
          <TopPostItem key={post.id} post={post} index={index} />
        ))}
      </div>
    </section>
  )
}