'use client'

import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

import { useArticleViewsStore } from '../store/use-article-views-store'
import { Play } from 'lucide-react'
import { OutlineTooltipContent } from '@/components/outline-tooltip'

export const OpenPlaygroundButton = ({ language, code }: { language: string; code: string }) => {
  const { openPlaygroundWithSingleFile } = useArticleViewsStore()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => openPlaygroundWithSingleFile({ language, code })}
          className="absolute right-4 bottom-4 size-8 bg-primary/10 border-primary/20"
        >
          <Play className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <OutlineTooltipContent>Open in Playground</OutlineTooltipContent>
    </Tooltip>
  )
}
