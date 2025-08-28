import type { FileSystemNode } from '../types'
import type { Language } from '../../compiler/types'
import type { IDETab } from '../types'

export interface Tab {
  id: string
  fileId: string
  fileName: string
  language: Language
}

export interface FileSystemState {
  fileTree: FileSystemNode[]
  activeFileId: string | null
  openTabs: Tab[]
  editorContent: Record<string, string>
  lastModified: Date
}

export interface SaveLoadPrimitive {
  exportState(): FileSystemState
  importState(state: FileSystemState): void
  hasUnsavedChanges(): boolean
  markAsSaved(): void
  updateCurrentState(state: FileSystemState): void
  updateLastSavedState(state: FileSystemState): void
  setLastSavedAt(date: Date): void
  reset(): void
}