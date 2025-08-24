import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ArticleType } from '@/api/articles/types'
import { isSome } from '@/core/fn/maybe'
import { getPreviousArticle, getNextArticle } from '@/api/articles/tutorials/navigation/actions'
import { computeArticleParentSlugMap } from '@/api/articles/tutorials/utils'
import { buildArticleHref } from '@/api/articles/tutorials/navigation/url'

export async function NavigationArticles(props: {
  tutorialSlug: string
  type: ArticleType
  articleSlug: string
}) {
  const { tutorialSlug, type, articleSlug } = props

  const [prevM, nextM, parentMap] = await Promise.all([
    getPreviousArticle({ tutorialSlug, type, articleSlug }),
    getNextArticle({ tutorialSlug, type, articleSlug }),
    computeArticleParentSlugMap({ tutorialSlug, type }),
  ])

  const prev = isSome(prevM) ? prevM.value : null
  const prevHref =
    prev
      ? buildArticleHref({
          tutorialSlug,
          type,
          articleSlug: prev.slug,
          parentSlug: parentMap.get(prev.id),
        })
      : null

  const next = isSome(nextM) ? nextM.value : null
  const nextHref =
    next
      ? buildArticleHref({
          tutorialSlug,
          type,
          articleSlug: next.slug,
          parentSlug: parentMap.get(next.id),
        })
      : null

  return (
    <div className="flex justify-between gap-2">
      {prevHref ? (
        <Button variant="outline" className="flex-1 w-full h-auto p-4 justify-start" asChild>
          <Link href={prevHref} className="w-full">
            <div className="flex flex-col gap-2 items-start text-left w-full">
              <div className="flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Previous Article</span>
              </div>
              <p className="text-sm text-muted-foreground leading-tight">{prev?.title}</p>
            </div>
          </Link>
        </Button>
      ) : (
        <div className="flex-1" />
      )}

      {nextHref ? (
        <Button variant="outline" className="flex-1 w-full h-auto p-4 justify-end" asChild>
          <Link href={nextHref} className="w-full">
            <div className="flex flex-col gap-2 items-end text-right w-full">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">Next Article</span>
                <ChevronRight className="h-4 w-4" />
              </div>
              <p className="text-sm text-muted-foreground leading-tight">{next?.title}</p>
            </div>
          </Link>
        </Button>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}
