'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { useSidebar } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useArticleViewsStore } from '../views/store/use-article-views-store'
import type { ArticleViewType } from '../views/store/use-article-views-store'

export type ArticlesSidebarTriggerProps = {
  className?: string
  /** Render only on these views (string or array). If omitted, renders on all views. */
  onlyOn?: ArticleViewType | ArticleViewType[]
  /** Hide on these views (string or array). */
  hiddenOn?: ArticleViewType | ArticleViewType[]
}

export const ArticlesSidebarTrigger = ({
  className,
  onlyOn,
  hiddenOn,
}: ArticlesSidebarTriggerProps) => {
  const { open } = useSidebar()
  const { current } = useArticleViewsStore()

  const toArray = (v?: ArticleViewType | ArticleViewType[]) =>
    v ? (Array.isArray(v) ? v : [v]) : undefined

  const only = toArray(onlyOn)
  const hidden = toArray(hiddenOn)

  const shouldHideForView =
    (only && !only.includes(current)) || (hidden && hidden.includes(current))

  if (open || shouldHideForView) return null

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn('absolute left-2 top-2 size-7', className)}
      asChild
    >
      <SidebarTrigger />
    </Button>
  )
}
