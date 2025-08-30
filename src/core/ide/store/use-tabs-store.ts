import { StateCreator } from 'zustand'
import { IDETab } from '../types'

export type IDETabsState = {
  openTabs: IDETab[]
  activeTab: IDETab | null

  openTab: (tab: IDETab) => void
  closeTab: (tabId: string) => void
  setActiveTab: (tabId: string | null) => void

  replaceActiveTab: (tab: IDETab) => void
  closeAllTabs: () => void
  setTabs: (tabs: IDETab[], activeId?: string) => void

  resetTabs: () => void
}

export const createTabsSlice: StateCreator<IDETabsState> = (set) => ({
  openTabs: [],
  activeTab: null,

  openTab: (tab: IDETab) => set((state) => ({ openTabs: [...state.openTabs, tab] })),
  closeTab: (tabId: string) =>
    set((state) => ({ openTabs: state.openTabs.filter((tab) => tab.id !== tabId) })),
  setActiveTab: (tabId: string | null) =>
    set((state) => ({ 
      activeTab: tabId ? state.openTabs.find((tab) => tab.id === tabId) : null 
    })),
  replaceActiveTab: (tab: IDETab) => set(() => ({ activeTab: tab })),
  closeAllTabs: () => set(() => ({ openTabs: [], activeTab: null })),
  setTabs: (tabs: IDETab[], activeId?: string) =>
    set(() => ({
      openTabs: tabs,
      activeTab: activeId ? tabs.find((t) => t.id === activeId) || (tabs[0] ?? null) : tabs[0] ?? null,
    })),
  resetTabs: () => set(() => ({ openTabs: [], activeTab: null })),
})
