'use client'

import { Language } from '@/core/compiler/types'
import { IDE } from '@/core/ide'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { CompilationResult } from './compilation-result'
import { cn } from '@/lib/utils'
import { useIDEStore } from '@/core/ide/store/use-ide-store'
import { useInitializeIDE } from '@/core/ide'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs' // NEW
import { useState } from 'react'

const defaultFileContent: Record<Language, string> = {
  python: 'print("Hello from main.py")\n',
  typescript: 'console.log("Hello from index.ts")\n',
  javascript: 'console.log("Hello from index.js")\n',
}

export const PlaygroundIDE = ({ language }: { language: Language }) => {
  const isExplorerOpen = useIDEStore((state) => state.isExplorerOpen)
  const [mobileTab, setMobileTab] = useState<'files' | 'editor' | 'output'>('editor')

  // Initialize IDE with a language-specific entry file and open it
  useInitializeIDE(
    (() => {
      const entryPath =
        language === 'python' ? '/main.py' : language === 'typescript' ? '/index.ts' : '/index.js'

      const defaultContent = defaultFileContent[language]

      return {
        files: [
          {
            path: entryPath,
            content: defaultContent,
          },
        ],
        openTabs: [entryPath],
        activeTab: entryPath,
        explorer: { open: true },
      }
    })(),
    [language],
  )

  return (
    <div className="p-1 h-full">
      <div className="hidden md:block h-full">
        <ResizablePanelGroup direction="horizontal" className="gap-0.5 h-full">
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

      <div className="md:hidden h-full">
        <div className="flex flex-col h-full border rounded-md">
          <Tabs value={mobileTab} onValueChange={setMobileTab} className="flex-1 min-h-0 gap-0">
            <TabsContent value="files" className="flex-1 min-h-0 flex overflow-hidden">
              <div className="flex-1 min-h-0 w-full">
                <IDE.Explorer.IDEExplorer />
              </div>
            </TabsContent>

            <TabsContent value="editor" className="flex-1 min-h-0 flex flex-col">
              <IDE.Root>
                <IDE.Header.Root>
                  <IDE.Header.LeftPart>
                    <IDE.Editor.Tabs />
                  </IDE.Header.LeftPart>
                  <IDE.Header.RightPart>
                    <IDE.RunButton onClick={() => setMobileTab('output')} />
                  </IDE.Header.RightPart>
                </IDE.Header.Root>
                <IDE.Editor.Root>
                  <IDE.Editor.Content />
                </IDE.Editor.Root>
              </IDE.Root>
            </TabsContent>

            <TabsContent value="output" className="flex-1 min-h-0 flex flex-col">
              <CompilationResult />
            </TabsContent>

            <div className="p-1 border-t border-border">
              <TabsList className="w-full">
                <TabsTrigger value="files">Files</TabsTrigger>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="output">Output</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
      </div>  
    </div>
  )
}
