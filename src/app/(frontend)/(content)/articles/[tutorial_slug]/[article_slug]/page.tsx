  import { ArticlesSidebarTrigger } from '@/api/articles/components/sidebar-trigger'
import { getTutorialArticle } from '@/api/articles/tutorials/sections'
import { ArticleViews } from '@/api/articles/views/components/article-views'
import { RichText } from '@/components/richtext'
import { TypographyH1 } from '@/components/typography'
import { isNone } from '@/core/fn/maybe'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ tutorial_slug: string; article_slug: string }>
}) {
  const { tutorial_slug, article_slug } = await params

  const article = await getTutorialArticle({ tutorial_slug, article_slug })

  if (isNone(article)) return notFound()


  return (
    <div className="relative flex-1 min-h-0 flex overflow-hidden">
      <ArticlesSidebarTrigger />
      <div className="flex-1 min-h-0 flex overflow-hidden">
        <ArticleViews>
          <div className="space-y-6">
            <TypographyH1>{article.value.title}</TypographyH1>
            <RichText data={article.value.content} />
          </div>
        </ArticleViews>
      </div>
    </div>
  )
}
