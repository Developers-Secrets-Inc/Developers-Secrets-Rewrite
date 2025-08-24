import { CompilationResult } from '@/core/compiler/types'
import { StateCreator } from 'zustand'

export type TerminalState = {
  isTerminalOpen: boolean
  activeTerminalTabId: string
  compilationResult: CompilationResult | null

  toggleTerminalTab: () => void
  openTerminalTab: () => void
  closeTerminalTab: () => void

  setActiveTerminalTab: (tabId: string) => void
  setCompilationResult: (result: CompilationResult) => void
  resetTerminal: () => void
}

export const createTerminalSlice: StateCreator<TerminalState> = (set) => ({
  isTerminalOpen: false,
  activeTerminalTabId: '',
  compilationResult: null,
  toggleTerminalTab: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
  openTerminalTab: () => set(() => ({ isTerminalOpen: true })),
  closeTerminalTab: () => set(() => ({ isTerminalOpen: false })),
  setActiveTerminalTab: (tabId: string) => set(() => ({ activeTerminalTabId: tabId })),
  setCompilationResult: (result: CompilationResult) => set(() => ({ compilationResult: result })),
  resetTerminal: () => set(() => ({ compilationResult: null, isTerminalOpen: false })),
})
