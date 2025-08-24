'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Beaker, ChevronDown, ChevronUp, FileOutput } from 'lucide-react'
import React from 'react'
import { useIDEStore } from '../store/use-ide-store'

export interface FooterTab {
  id: string
  title: string
  content: React.ReactNode
  icon: string
}

const iconMap: { [key: string]: React.ElementType } = {
  'file-output': FileOutput,
  beaker: Beaker,
}

const TERMINAL_STYLE = {
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  fontFamily: 'monospace',
  height: '100%',
  overflow: 'auto',
  whiteSpace: 'pre-wrap' as const,
}

interface IDETerminalProps {
  tabs: FooterTab[]
}

const Terminal = ({ children }: { children: React.ReactNode }) => {
  const { isTerminalOpen, toggleTerminalTab } =
    useIDEStore()

  return (
    <div className="flex-shrink-0 flex border rounded-md border-border flex-col bg-background max-h-[40%] mt-1">
      <div
        className={cn('flex items-center justify-between h-10', isTerminalOpen ? 'border-b-0' : '')}
        onDoubleClick={toggleTerminalTab}
      >
        {children}
      </div>
    </div>
  )
}

export const IDETerminal = ({ tabs }: IDETerminalProps) => {
  const { isTerminalOpen, toggleTerminalTab, activeTerminalTabId, setActiveTerminalTab } =
    useIDEStore()

  const activeTab = tabs.find((tab) => tab.id === activeTerminalTabId)

  return (
    <div className="flex-shrink-0 flex border rounded-md border-border flex-col bg-background max-h-[40%] mt-1">
      <div
        className={cn('flex items-center justify-between h-10', isTerminalOpen ? 'border-b-0' : '')}
        onDoubleClick={toggleTerminalTab}
      >
        <Tabs
          value={activeTerminalTabId ?? undefined}
          onValueChange={setActiveTerminalTab}
          className="h-full"
        >
          <TabsList className="flex-grow bg-transparent tabs-list-container">
            {tabs.map((tab, index) => (
              <React.Fragment key={tab.id}>
                <TabsTrigger value={tab.id} className="flex items-center gap-1.5">
                  {React.createElement(iconMap[tab.icon] || 'div', { size: 1 })}
                  <span>{tab.title}</span>
                </TabsTrigger>
                {index < tabs.length - 1 && (
                  <Separator orientation="vertical" className="h-3 mx-1" />
                )}
              </React.Fragment>
            ))}
          </TabsList>
        </Tabs>
        <Button variant="ghost" size="icon" className="size-7" onClick={toggleTerminalTab}>
          {isTerminalOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>
      <div
        className={cn(
          'transition-all duration-300 ease-in-out overflow-hidden',
          isTerminalOpen ? 'h-[300px] opacity-100' : 'h-0 opacity-0',
        )}
      >
        {activeTab && (
          <Tabs value={activeTerminalTabId ?? undefined} className="h-full">
            <TabsContent
              value={activeTerminalTabId ?? ''}
              style={TERMINAL_STYLE}
              className="h-full p-0 rounded-b-md"
            >
              {activeTab.content}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
