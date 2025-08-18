import { CategoriesTabs } from '@/api/blog/posts/categories/components/categories-tabs'
import { LatestNews } from '@/api/blog/posts/components/latest-news'
import { TopBlogPosts } from '@/api/blog/posts/components/top-blog-posts'

export const revalidate = 86400

export const generateStaticParams = () => {
  return [
    { category_slug: 'engineering' },
    { category_slug: 'community' },
    { category_slug: 'company-news' },
    { category_slug: 'customers' },
  ]
}

export default async function Page({ params }: { params: Promise<{ category_slug: string }> }) {
  const { category_slug } = await params

  return (
    <div className="mt-16">
      <CategoriesTabs />
      <TopBlogPosts />
      <LatestNews category={category_slug} />
    </div>
  )
}
