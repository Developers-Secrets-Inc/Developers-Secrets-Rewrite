import { RichText } from '@/components/richtext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { BlogPost } from '@/payload-types'
import Link from 'next/link'
import { getBlogPostPage } from '..'

const BlogPostCard = async ({ post }: { post: BlogPost }) => {
  const categoryLabelMap = {
    engineering: 'Engineering',
    community: 'Community',
    'company-news': 'Company News',
    customers: 'Customers',
    changelog: 'Changelog',
  } as const

  const categoryLabel = post.category
    ? (categoryLabelMap[post.category as keyof typeof categoryLabelMap] ?? String(post.category))
    : undefined
  const publishedLabel = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : undefined

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="border-none gap-4 group">
        <CardHeader>
          {(categoryLabel || publishedLabel) && (
            <div className="flex items-center justify-between text-xs text-muted-foreground transition-colors">
              <span className="truncate group-hover:text-primary-foreground transition-colors">
                {categoryLabel}
              </span>
              <span className="group-hover:text-primary-foreground transition-colors">
                {publishedLabel}
              </span>
            </div>
          )}
          <CardTitle className="text-lg">{post.title}</CardTitle>
          <CardDescription className="line-clamp-3">
            <RichText
              data={post.content}
              className="text-sm [&_p]:leading-6 group-hover:text-primary-foreground transition-colors"
            />
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center gap-2 group-hover:text-primary-foreground transition-colors">
          <Avatar className="size-6">
            <AvatarImage src={(post.author as Admin).avatarUrl} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground group-hover:text-primary-foreground transition-colors">
            {post.author.name}
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}

const BlogPostsGrid = ({ posts }: { posts: BlogPost[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

const SeeMoreButton = () => {
  return (
    <Button variant="outline" className="rounded-full cursor-pointer w-full max-w-2xl mx-auto">
      Show more posts
    </Button>
  )
}

export const LatestNews = async ({ category }: { category?: string }) => {
  const posts = await getBlogPostPage({ page: 1, limit: 15, category })

  return (
    <div className="max-w-5xl mx-auto border border-border flex flex-col gap-4 pb-8">
      <BlogPostsGrid posts={posts.docs} />
      <SeeMoreButton />
    </div>
  )
}
