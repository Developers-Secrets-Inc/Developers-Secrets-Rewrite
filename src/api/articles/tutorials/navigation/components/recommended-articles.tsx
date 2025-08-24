import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FileText } from 'lucide-react'
import Link from 'next/link'
import { ArticleType } from '@/api/articles/types'
import { getRecommendedArticles } from '@/api/articles/tutorials/navigation/actions'
import { computeArticleParentSlugMap } from '@/api/articles/tutorials/utils'
import { buildArticleHref } from '@/api/articles/tutorials/navigation/url'

export async function RecommendedArticles(props: {
  tutorialSlug: string
  type: ArticleType
  articleSlug: string
  limit?: number
}) {
  const { tutorialSlug, type, articleSlug, limit = 3 } = props

  const [items, parentMap] = await Promise.all([
    getRecommendedArticles({ tutorialSlug, type, articleSlug, limit }),
    computeArticleParentSlugMap({ tutorialSlug, type }),
  ])

  const resolved = items.map((it) => ({
    title: it.title,
    href: buildArticleHref({
      tutorialSlug,
      type,
      articleSlug: it.slug,
      parentSlug: parentMap.get(it.id),
    }),
  }))

  if (resolved.length === 0) return null

  return (
    <section className="border-t border-border pt-4">
      <div className="space-y-3">
        <h3 className="text-xl font-medium">Recommended articles</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {resolved.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md border p-4 transition-colors hover:bg-accent space-y-2"
            >
              <div className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'size-8')}>
                <FileText className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="text-sm font-medium leading-none">{item.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}