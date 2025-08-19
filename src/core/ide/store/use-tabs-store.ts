import { StateCreator } from 'zustand'
import { IDETab } from '../types'

export type IDETabsState = {
  openTabs: IDETab[]
  activeTab: IDETab | null

  openTab: (tab: IDETab) => void
  closeTab: (tabId: string) => void
  setActiveTab: (tabId: string) => void

  replaceActiveTab: (tab: IDETab) => void
  closeAllTabs: () => void

  resetTabs: () => void
}

export const createTabsSlice: StateCreator<IDETabsState> = (set) => ({
  openTabs: [],
  activeTab: null,

  openTab: (tab: IDETab) => set((state) => ({ openTabs: [...state.openTabs, tab] })),
  closeTab: (tabId: string) =>
    set((state) => ({ openTabs: state.openTabs.filter((tab) => tab.id !== tabId) })),
  setActiveTab: (tabId: string) =>
    set((state) => ({ activeTab: state.openTabs.find((tab) => tab.id === tabId) })),
  replaceActiveTab: (tab: IDETab) => set(() => ({ activeTab: tab })),
  closeAllTabs: () => set(() => ({ openTabs: [], activeTab: null })),
  resetTabs: () => set(() => ({ openTabs: [], activeTab: null })),
})
