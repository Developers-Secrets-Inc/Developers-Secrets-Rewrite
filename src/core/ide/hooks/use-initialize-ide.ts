"use client"

import { useEffect } from 'react'
import { useIDEStore } from '../store/use-ide-store'
import { IDEInitialConfig } from '../types'
import { buildFileTreeFromPaths, tabsFromPaths } from '../init'

export function useInitializeIDE(initial?: IDEInitialConfig, deps: any[] = []) {
  const {
    resetAll,
    setFileTree,
    setActiveFileId,
    setTabs,
    setExplorerOpen,
  } = useIDEStore()

  useEffect(() => {
    // No config provided, do nothing (optional initialization)
    if (!initial) return

    // Reset everything for a clean init
    resetAll()

    // Build file tree
    const { tree, pathToId } = buildFileTreeFromPaths(initial.files ?? [])
    setFileTree(tree)

    // Prepare tabs
    const openPaths = Array.from(
      new Set([...(initial.openTabs ?? []), ...(initial.activeTab ? [initial.activeTab] : [])]),
    )

    const tabs = tabsFromPaths(openPaths, pathToId)

    // Determine active tab id and file id
    let activeTabId: string | undefined = undefined
    let activeFileId: string | null = null

    if (initial.activeTab) {
      const activePath = initial.activeTab.startsWith('/')
        ? initial.activeTab
        : `/${initial.activeTab}`
      const activeFile = pathToId.get(activePath) || null
      activeFileId = activeFile

      const activeTab = tabs.find((t) => t.fileId === activeFileId || false)
      activeTabId = activeTab?.id
    }

    // Apply tabs and editor active file
    setTabs(tabs, activeTabId)

    if (activeFileId) {
      setActiveFileId(activeFileId)
    } else if (tabs.length > 0) {
      setActiveFileId(tabs[0].fileId)
    } else {
      setActiveFileId(null)
    }

    // Explorer visibility (optional)
    if (initial.explorer && typeof initial.explorer.open === 'boolean') {
      setExplorerOpen(initial.explorer.open)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
