'use client'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip'
import { FilePlus, FolderPlus } from 'lucide-react'
import { OutlineTooltipContent } from '@/components/outline-tooltip'

export const NewFileTooltip = ({ onClick }: { onClick: () => void }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="size-7" onClick={() => onClick()}>
          <FilePlus className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <OutlineTooltipContent side="bottom">
        <p>New File</p>
      </OutlineTooltipContent>
    </Tooltip>
  )
}

export const NewFolderTooltip = ({ onClick }: { onClick: () => void }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="size-7" onClick={() => onClick()}>
          <FolderPlus className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <OutlineTooltipContent side="bottom">
        <p>New Folder</p>
      </OutlineTooltipContent>
    </Tooltip>
  )
}
