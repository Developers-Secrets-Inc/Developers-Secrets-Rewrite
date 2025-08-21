import { StateCreator } from 'zustand'

export type ExplorerState = {
  isExplorerOpen: boolean
  toggleExplorer: () => void
  setExplorerOpen: (open: boolean) => void
  resetExplorer: () => void
}

export const createExplorerSlice: StateCreator<ExplorerState> = (set) => ({
  isExplorerOpen: false,
  toggleExplorer: () => set((state) => ({ isExplorerOpen: !state.isExplorerOpen })),
  setExplorerOpen: (open: boolean) => set(() => ({ isExplorerOpen: open })),
  resetExplorer: () => set(() => ({ isExplorerOpen: false })),
})
