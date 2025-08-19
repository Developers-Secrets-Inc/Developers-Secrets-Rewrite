import { create } from 'zustand'
import { TerminalState, createTerminalSlice } from './use-terminal-store'
import { ExplorerState, createExplorerSlice } from './use-explorer-store'
import { IDETabsState, createTabsSlice } from './use-tabs-store'
import { EditorState, createEditorSlice } from './use-editor-store'
import { FileTreeState, createFileTreeSlice } from './use-file-tree-store'

export type IDEState = TerminalState &
  ExplorerState &
  IDETabsState &
  EditorState &
  FileTreeState & {
    resetAll: () => void
  }
export const useIDEStore = create<IDEState>()((...a) => {
  const terminalSlice = createTerminalSlice(...a)
  const explorerSlice = createExplorerSlice(...a)
  const tabsSlice = createTabsSlice(...a)
  const editorSlice = createEditorSlice(...a)
  const fileTreeSlice = createFileTreeSlice(...a)

  return {
    ...terminalSlice,
    ...explorerSlice,
    ...tabsSlice,
    ...editorSlice,
    ...fileTreeSlice,
    resetAll: () => {
      terminalSlice.resetTerminal()
      explorerSlice.resetExplorer()
      tabsSlice.resetTabs()
      editorSlice.resetEditor()
      fileTreeSlice.resetTree()
    },
  }
})
