import { StateCreator } from 'zustand'

export type EditorState = {
  activeFileId: string | null
  setActiveFileId: (fileId: string | null) => void

  resetEditor: () => void
}

export const createEditorSlice: StateCreator<EditorState> = (set) => ({
  activeFileId: null,
  setActiveFileId: (fileId: string | null) => set(() => ({ activeFileId: fileId })),
  resetEditor: () => set(() => ({ activeFileId: null })),
})
