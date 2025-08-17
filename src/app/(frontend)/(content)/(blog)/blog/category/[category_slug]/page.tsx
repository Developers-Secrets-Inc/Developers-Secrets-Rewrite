import { CategoriesTabs } from '@/api/blog/posts/categories/components/categories-tabs'
import { LatestNews } from '@/api/blog/posts/components/latest-news'
import { TopBlogPosts } from '@/api/blog/posts/components/top-blog-posts'


export default async function Page({ params }: { params: Promise<{ category_slug: string }> }) {
  const { category_slug } = await params

  return (
    <div className="mt-24">
      <CategoriesTabs />
      <TopBlogPosts />
      <LatestNews category={category_slug} />
    </div>
  )
}
