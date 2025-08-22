'use client'

import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { useArticleViewsStore } from '../store/use-article-views-store'
import { ArticleIDE } from './article-ide'
import { useSidebar } from '@/components/ui/sidebar'
import { ArticlesSidebarTrigger } from '../../components/sidebar-trigger'

export const ArticleViews = ({ children }: { children: React.ReactNode }) => {
  const { current, playgroundInit } = useArticleViewsStore()
  const { open, isMobile } = useSidebar()

  switch (current) {
    case 'default':
      return (
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div
            className="relative mx-auto w-full max-w-3xl px-4 sm:p-6 lg:p-8 transition-transform duration-200"
            style={{
              transform:
                open && !isMobile ? 'translateX(calc(var(--sidebar-width) * -0.5))' : undefined,
            }}
          >
            <div className="min-w-0 flex-1">{children}</div>
            <aside
              aria-label="Article outline"
              className="hidden xl:block absolute top-8 left-[calc(100%+2rem)] w-[var(--sidebar-width)]"
            >
              {/* Outline content goes here */}
              abc
            </aside>
          </div>
        </div>
      )
    case 'playground':
      return (
        <div className="p-1 flex-1 min-h-0 flex overflow-hidden">
          <ResizablePanelGroup
            direction="horizontal"
            className="relative flex-1 h-full min-h-0 overflow-hidden gap-0.5"
          >
            <ResizablePanel defaultSize={50} minSize={40}>
              <div className="relative flex flex-col h-full border rounded-md">
                <ArticlesSidebarTrigger onlyOn="playground" className="right-2 top-2 left-auto" />
                <div className="flex-1 min-h-0 overflow-y-auto p-8">{children}</div>
              </div>
            </ResizablePanel>
            <ResizableHandle className="w-1 bg-transparent hover:bg-border transition-all duration-200" />
            <ResizablePanel defaultSize={50} minSize={40}>
              <div className="flex flex-col h-full min-h-0 rounded-md">
                <ArticleIDE initial={playgroundInit ?? undefined} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )
    case 'chat':
      return <>{children}</>
  }
}
