import type { StateCreator } from 'zustand'
import type { FileSystemState, SaveLoadPrimitive } from '../types/file-system-state'
import type { FileSystemNode } from '../types'
import type { Language } from '../../compiler/types'
import { getLanguageFromExtension } from '../utils'
import { useIDEStore } from './use-ide-store'
import { extractEditorContent, restoreEditorContent, isEqual } from '../utils/state-extractors'

export type SaveLoadState = {
  currentState: FileSystemState | null
  lastSavedState: FileSystemState | null
  lastSavedAt: Date | null
  isDirty: boolean
}

export type SaveLoadActions = {
  exportCurrentState: () => FileSystemState
  importState: (state: FileSystemState) => void
  updateCurrentState: (state: FileSystemState) => void
  hasUnsavedChanges: () => boolean
  markAsSaved: () => void
  updateLastSavedState: (state: FileSystemState) => void
  setLastSavedAt: (date: Date) => void
  reset: () => void
}

export const createSaveLoadSlice: StateCreator<SaveLoadState & SaveLoadActions> = (set, get) => ({
  currentState: null,
  lastSavedState: null,
  lastSavedAt: null,
  isDirty: false,

  exportCurrentState: () => {
    const { currentState, lastSavedState } = get()
    
    if (!currentState) {
      // Build state from all slices if current state is not set
      const ideState = useIDEStore.getState()
      return {
        fileTree: ideState.fileTree || [],
        activeFileId: ideState.activeFileId,
        openTabs: ideState.openTabs || [],
        editorContent: extractEditorContent(ideState),
        lastModified: new Date()
      }
    }
    
    return currentState
  },

  importState: (state: FileSystemState) => {
    // Restore state to all slices
    const ideState = useIDEStore.getState()
    
    // Update file tree
    if (ideState.setFileTree) {
      ideState.setFileTree(state.fileTree)
    }
    
    // Update active file
    if (ideState.setActiveFileId) {
      ideState.setActiveFileId(state.activeFileId)
    }
    
    // Update tabs
    if (ideState.setOpenTabs) {
      ideState.setOpenTabs(state.openTabs)
    }
    
    // Restore editor content
    restoreEditorContent(ideState, state.editorContent)
    
    set({ 
      currentState: state,
      lastSavedState: state,
      lastSavedAt: new Date(),
      isDirty: false
    })
  },

  updateCurrentState: (state: FileSystemState) => {
    set({ 
      currentState: state,
      isDirty: !isEqual(state, get().lastSavedState)
    })
  },

  hasUnsavedChanges: () => {
    const { currentState, lastSavedState } = get()
    if (!currentState || !lastSavedState) return true
    return !isEqual(currentState, lastSavedState)
  },

  markAsSaved: () => {
    const currentState = get().currentState
    if (currentState) {
      set({ 
        lastSavedState: currentState,
        lastSavedAt: new Date(),
        isDirty: false
      })
    }
  },

  updateLastSavedState: (state: FileSystemState) => {
    set({ lastSavedState: state, lastSavedAt: new Date() })
  },

  setLastSavedAt: (date: Date) => {
    set({ lastSavedAt: date })
  },

  reset: () => {
    set({
      currentState: null,
      lastSavedState: null,
      lastSavedAt: null,
      isDirty: false
    })
  }
})