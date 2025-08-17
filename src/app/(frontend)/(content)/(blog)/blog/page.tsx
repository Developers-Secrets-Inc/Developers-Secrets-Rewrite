import { CategoriesTabs } from '@/api/blog/posts/categories/components/categories-tabs'
import { LatestNews } from '@/api/blog/posts/components/latest-news'
import { TopBlogPosts } from '@/api/blog/posts/components/top-blog-posts'

export default function Page() {
  return (
    <div className="mt-16">
      <CategoriesTabs />
      <TopBlogPosts />
      <LatestNews />
    </div>
  )
}
