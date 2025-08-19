'use client'

import { OutlineTooltipContent } from '@/components/outline-tooltip'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react'
import { useIDEStore } from '@/core/ide/store/use-ide-store'

export const IDEExplorerTrigger = () => {
  const { isExplorerOpen, toggleExplorer } = useIDEStore()
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="size-7 absolute bottom-2 left-2 z-50"
            onClick={toggleExplorer}
          >
            {isExplorerOpen ? (
              <ArrowRightToLine className="h-4 w-4" />
            ) : (
              <ArrowLeftToLine className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <OutlineTooltipContent side="top">
          {isExplorerOpen ? 'Close File Tree' : 'Open File Tree'}
        </OutlineTooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
