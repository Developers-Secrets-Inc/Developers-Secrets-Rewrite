import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { cn } from '@/lib/utils'

export const ChallengeRoot = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn("p-1 flex-1 min-h-0 flex overflow-hidden", className)} {...props}>
      <ResizablePanelGroup
        direction="horizontal"
        className="relative flex-1 h-full min-h-0 overflow-hidden gap-0.5"
      >
        {children}
      </ResizablePanelGroup>
    </div>
  )
}

export const ChallengeLeft = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <ResizablePanel defaultSize={50} minSize={40}>
      <div className={cn("relative flex flex-col h-full border rounded-md", className)} {...props}>
        {children}
      </div>
    </ResizablePanel>
  )
}

export const ChallengeSeparator = () => {
  return (
    <ResizableHandle className="w-1 bg-transparent hover:bg-border transition-all duration-200" />
  )
}

export const ChallengeRight = ({ children, className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <ResizablePanel defaultSize={50} minSize={40}>
      <div className={cn("flex flex-col h-full min-h-0 rounded-md border", className)} {...props}>{children}</div>
    </ResizablePanel>
  )
}
