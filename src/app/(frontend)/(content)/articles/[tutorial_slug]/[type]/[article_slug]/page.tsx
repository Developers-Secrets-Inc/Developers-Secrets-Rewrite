import { ArticleCodeBlock } from '@/api/articles/components/article-code-block'
import { ArticlesSidebarTrigger } from '@/api/articles/components/sidebar-trigger'
import { getTutorialArticle } from '@/api/articles/tutorials/sections'
import { ArticleViews } from '@/api/articles/views/components/article-views'
import { RichText } from '@/components/richtext'
import { TypographyH1 } from '@/components/typography'
import { isNone } from '@/core/fn/maybe'
import { notFound } from 'next/navigation'
import { NavigationArticles } from '@/api/articles/tutorials/navigation/components/navigation-articles'
import { ArticleEngagement } from '@/api/articles/engagement/components/article-engagement'
import { RecommendedArticles } from '@/api/articles/tutorials/navigation/components/recommended-articles'
import { ArticleType } from '@/api/articles/types'

export default async function Page({
  params,
}: {
  params: Promise<{ tutorial_slug: string; type: ArticleType; article_slug: string }>
}) {
  const { tutorial_slug, type, article_slug } = await params

  const article = await getTutorialArticle({ tutorial_slug, article_slug, type })

  if (isNone(article)) return notFound()

  return (
    <div className="relative flex-1 min-h-0 flex overflow-hidden">
      <ArticlesSidebarTrigger hiddenOn="playground" />
      <div className="flex-1 min-h-0 flex overflow-hidden">
        <ArticleViews>
          <div className="space-y-6">
            <TypographyH1>{article.value.title}</TypographyH1>
            <RichText
              data={article.value.content}
              overrides={{
                blocks: {
                  Code: ({ node }) => (
                    <ArticleCodeBlock language={node.fields.language} code={node.fields.code} />
                  ),
                },
              }}
            />
            <RecommendedArticles />
            <ArticleEngagement />
            <NavigationArticles />
          </div>
        </ArticleViews>
      </div>
    </div>
  )
}
