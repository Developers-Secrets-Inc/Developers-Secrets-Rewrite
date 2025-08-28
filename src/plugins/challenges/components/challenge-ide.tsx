'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { IDE } from '@/core/ide'
import { OutputContent } from '@/core/ide/components/output-content'
import { useIDEStore } from '@/core/ide/store/use-ide-store'
import { cn } from '@/lib/utils'

export const ChallengeIDE = () => {
  const { isExplorerOpen } = useIDEStore((state) => state)

  return (
    <IDE.Root>
      <ResizablePanelGroup
        direction="horizontal"
        className="relative flex flex-1 overflow-hidden border rounded-md border-border"
      >
        <ResizablePanel
          className={cn(!isExplorerOpen && 'hidden')}
          defaultSize={20}
          minSize={15}
          maxSize={40}
        >
          <IDE.Explorer.IDEExplorer />
        </ResizablePanel>
        <ResizableHandle className={cn(!isExplorerOpen && 'hidden')} />
        <ResizablePanel defaultSize={80}>
          <IDE.Header.Root>
            <IDE.Header.LeftPart>
              <IDE.Editor.Tabs />
            </IDE.Header.LeftPart>
            <IDE.Header.RightPart>
              <IDE.RunButton />
            </IDE.Header.RightPart>
          </IDE.Header.Root>
          <IDE.Editor.Root>
            <IDE.Editor.Content />
          </IDE.Editor.Root>
        </ResizablePanel>
        <IDE.Explorer.Trigger />
      </ResizablePanelGroup>
      <IDE.Terminal.Root>
        <IDE.Terminal.Tabs>
          <IDE.Terminal.TabsList>
            <IDE.Terminal.TabsTrigger value="output">Output</IDE.Terminal.TabsTrigger>
          </IDE.Terminal.TabsList>
        </IDE.Terminal.Tabs>
        <IDE.Terminal.TabsContent value="output">
          <OutputContent />
        </IDE.Terminal.TabsContent>
      </IDE.Terminal.Root>
    </IDE.Root>
  )
}
