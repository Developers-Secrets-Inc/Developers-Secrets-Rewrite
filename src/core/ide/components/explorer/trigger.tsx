import { OutlineTooltipContent } from '@/components/outline-tooltip'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ArrowLeftToLine } from 'lucide-react'

export const IDEExplorerTrigger = () => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="size-7 absolute bottom-2 left-2 z-50"
            //   onClick={toggle}
            >
              {/* {isOpen ? (
                <ArrowRightToLine className="h-4 w-4" />
              ) : (
                <ArrowLeftToLine className="h-4 w-4" />
              )} */}
              <ArrowLeftToLine className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <OutlineTooltipContent side="top">
            {/* {isOpen ? 'Close File Tree' : 'Open File Tree'} */}
            Open File Tree
          </OutlineTooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }