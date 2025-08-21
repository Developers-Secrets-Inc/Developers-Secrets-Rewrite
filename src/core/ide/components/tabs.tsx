import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import type { IDETab as IDETabType } from '../types'
import { useIDEStore } from '../store/use-ide-store'

type IDETabProps = {
  tab: IDETabType
  isActive: boolean
  onSelect: (tabId: string) => void
  onClose: (tabId: string) => void
}

const IDETab = ({ tab, isActive, onSelect, onClose }: IDETabProps) => {
  const handleClick = () => {
    onSelect(tab.id)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose(tab.id)
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 h-full text-sm border-r border-border cursor-pointer hover:bg-muted/50 transition-colors',
        'min-w-[120px] max-w-[200px] flex-shrink-0',
        'first:rounded-tl-md',
        isActive && 'bg-background border-b-2 border-b-primary',
      )}
      onClick={handleClick}
    >
      <span className="truncate flex-1">{tab.fileName}</span>
      <button
        className="flex-shrink-0 p-0.5 hover:bg-muted rounded opacity-60 hover:opacity-100 transition-opacity"
        onClick={handleClose}
        aria-label={`Close ${tab.fileName}`}
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}

export const IDETabs = () => {
  const { openTabs, activeTab, setActiveTab, closeTab, setActiveFileId } = useIDEStore()

  const handleTabSelect = (tabId: string) => {
    setActiveTab(tabId)

    const selectedTab = openTabs.find((tab) => tab.id === tabId)
    if (selectedTab) {
      setActiveFileId(selectedTab.fileId)
    }
  }

  if (openTabs.length === 0) {
    return null
  }

  return (
    <div className={'flex h-12 bg-muted/30 border-b rounded-tl-md rounded-tr-md border-border overflow-x-auto max-w-full'}>
      <div className="flex min-w-0">
        {openTabs.map((tab) => (
          <IDETab
            key={tab.id}
            tab={tab}
            isActive={tab.id === activeTab?.id}
            onSelect={handleTabSelect}
            onClose={closeTab}
          />
        ))}
      </div>
    </div>
  )
}
