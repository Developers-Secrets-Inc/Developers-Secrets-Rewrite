import { Language } from '@/core/compiler/types'
import { IDE } from '@/core/ide'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { CompilationResult } from './compilation-result'

export const PlaygroundIDE = ({ language }: { language: Language }) => {
  return (
    <div className="p-1 h-full">
      <ResizablePanelGroup direction="horizontal" className="gap-0.5">
        <ResizablePanel defaultSize={50} minSize={40}>
          <div className="flex flex-col h-full border rounded-md relative">
            <IDE.Root>
              <IDE.Header.Root>
                <IDE.Header.LeftPart>{''}</IDE.Header.LeftPart>
                <IDE.Header.RightPart>
                  <IDE.RunButton />
                </IDE.Header.RightPart>
              </IDE.Header.Root>
              <IDE.Editor.Root>
                <IDE.Editor.Content />
              </IDE.Editor.Root>
              <IDE.Explorer.Trigger />
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
