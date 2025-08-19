import { StateCreator } from 'zustand'

export type ExplorerState = {
  isExplorerOpen: boolean
  toggleExplorer: () => void
  resetExplorer: () => void
}

export const createExplorerSlice: StateCreator<ExplorerState> = (set) => ({
  isExplorerOpen: false,
  toggleExplorer: () => set((state) => ({ isExplorerOpen: !state.isExplorerOpen })),
  resetExplorer: () => set(() => ({ isExplorerOpen: false })),
})
