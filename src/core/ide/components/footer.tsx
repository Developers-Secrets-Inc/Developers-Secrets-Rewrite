'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useIDEStore } from '../store/use-ide-store'

const TERMINAL_STYLE = {
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  fontFamily: 'monospace',
  height: '100%',
  overflow: 'auto',
  whiteSpace: 'pre-wrap' as const,
}

export const Terminal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-shrink-0 flex border rounded-md border-border flex-col bg-background max-h-[40%] mt-1">
      {children}
    </div>
  )
}

export const TerminalTabs = ({ children, ...props }: React.ComponentProps<typeof Tabs>) => {
  const { isTerminalOpen, toggleTerminalTab, setActiveTerminalTab, activeTerminalTabId } =
    useIDEStore()
  return (
    <div
      className={cn('flex items-center justify-between h-10', isTerminalOpen ? 'border-b-0' : '')}
      onDoubleClick={toggleTerminalTab}
    >
      <Tabs
        {...props}
        value={activeTerminalTabId}
        onValueChange={setActiveTerminalTab}
        className="h-full"
      >
        {children}
      </Tabs>
    </div>
  )
}

export const TerminalTabsList = ({ children, ...props }: React.ComponentProps<typeof TabsList>) => {
  return (
    <TabsList
      {...props}
      className={cn(props.className, 'flex-grow bg-transparent tabs-list-container')}
    >
      {children}
    </TabsList>
  )
}

export const TerminalTabsTrigger = ({
  children,
  ...props
}: React.ComponentProps<typeof TabsTrigger>) => {
  return (
    <TabsTrigger {...props} className={cn(props.className, 'flex items-center gap-1.5')}>
      {children}
    </TabsTrigger>
  )
}

export const TerminalTabsContent = ({
  children,
  ...props
}: React.ComponentProps<typeof TabsContent>) => {
  const { isTerminalOpen, activeTerminalTabId, activeTab } = useIDEStore()
  return (
    <div
      className={cn(
        'transition-all duration-300 ease-in-out overflow-hidden',
        isTerminalOpen ? 'h-[300px] opacity-100' : 'h-0 opacity-0',
      )}
    >
      <Tabs value={activeTerminalTabId ?? undefined} className="h-full">
        <TabsContent
          style={TERMINAL_STYLE}
          className="h-full p-0 rounded-b-md"
          {...props}
          value={activeTerminalTabId}
        >
          {children}
        </TabsContent>
      </Tabs>
    </div>
  )
}

/*
<Terminal>
  <TerminalTabs defaultValue="account">
    <TerminalTabsList>
      <TerminalTabsTrigger value="account">Account</TerminalTabsTrigger>
      <TerminalTabsTrigger value="password">Password</TerminalTabsTrigger>
    </TerminalTabsList>
    <TerminalTabsContent value="account">Make changes to your account here.</TerminalTabsContent>
    <TerminalTabsContent value="password">Change your password here.</TerminalTabsContent>
  </TerminalTabs>
</Terminal>

*/
