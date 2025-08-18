import { create } from 'zustand'
import { TerminalState, createTerminalSlice } from './use-terminal-store'

export type IDEState = TerminalState & {
  resetAll: () => void
}
export const useIDEStore = create<IDEState>()((...a) => {
  const terminalSlice = createTerminalSlice(...a)

  return {
    ...terminalSlice,
    resetAll: () => {
      terminalSlice.reset()
    },
  }
})
