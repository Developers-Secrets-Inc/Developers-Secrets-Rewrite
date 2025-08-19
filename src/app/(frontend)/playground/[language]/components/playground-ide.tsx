'use client'

import { Language } from '@/core/compiler/types'
import { IDE } from '@/core/ide'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { CompilationResult } from './compilation-result'
import { cn } from '@/lib/utils'
import { useIDEStore } from '@/core/ide/store/use-ide-store'

export const PlaygroundIDE = ({ language }: { language: Language }) => {
  const isExplorerOpen = useIDEStore((state) => state.isExplorerOpen)

  return (
    <div className="p-1 h-full">
      <ResizablePanelGroup direction="horizontal" className="gap-0.5">
        <ResizablePanel defaultSize={50} minSize={40}>
          <div className="flex flex-col h-full border rounded-md">
            <IDE.Root>
              <ResizablePanelGroup
                direction="horizontal"
                className="relative flex flex-1 overflow-hidden"
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
            </IDE.Root>
          </div>
        </ResizablePanel>
        <ResizableHandle className="w-1 bg-transparent hover:bg-border rounded-md transition-all duration-200" />
        <ResizablePanel defaultSize={50} minSize={40}>
          <div className="flex flex-col h-full border rounded-md z-20">
            <CompilationResult />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
