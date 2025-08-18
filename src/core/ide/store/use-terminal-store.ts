import { CompilationResult } from '@/core/compiler/types'
import { StateCreator } from 'zustand'

export type TerminalState = {
  isOpen: boolean
  activeTabId: string
  compilationResult: CompilationResult | null

  toggleTab: () => void
  openTab: () => void
  closeTab: () => void

  setCompilationResult: (result: CompilationResult) => void
  reset: () => void
}

export const createTerminalSlice: StateCreator<TerminalState> = (set) => ({
  isOpen: false,
  activeTabId: '',
  compilationResult: null,
  toggleTab: () => set((state) => ({ isOpen: !state.isOpen })),
  openTab: () => set(() => ({ isOpen: true })),
  closeTab: () => set(() => ({ isOpen: false })),
  setCompilationResult: (result: CompilationResult) => set(() => ({ compilationResult: result })),
  reset: () => set(() => ({ compilationResult: null, isOpen: false })),
})