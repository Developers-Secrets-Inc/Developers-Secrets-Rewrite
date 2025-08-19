import { CompilationResult } from '@/core/compiler/types'
import { StateCreator } from 'zustand'

export type TerminalState = {
  isOpen: boolean
  activeTabId: string
  compilationResult: CompilationResult | null

  toggleTerminalTab: () => void
  openTerminalTab: () => void
  closeTerminalTab: () => void

  setCompilationResult: (result: CompilationResult) => void
  resetTerminal: () => void
}

export const createTerminalSlice: StateCreator<TerminalState> = (set) => ({
  isOpen: false,
  activeTabId: '',
  compilationResult: null,
  toggleTerminalTab: () => set((state) => ({ isOpen: !state.isOpen })),
  openTerminalTab: () => set(() => ({ isOpen: true })),
  closeTerminalTab: () => set(() => ({ isOpen: false })),
  setCompilationResult: (result: CompilationResult) => set(() => ({ compilationResult: result })),
  resetTerminal: () => set(() => ({ compilationResult: null, isOpen: false })),
})