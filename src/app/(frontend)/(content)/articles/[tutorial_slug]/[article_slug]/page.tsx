import { getTutorialArticle } from '@/api/articles/tutorials/sections'
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
    <div className="space-y-6">
      <TypographyH1>{article.value.title}</TypographyH1>
      <RichText data={article.value.content} />
    </div>
  )
}
