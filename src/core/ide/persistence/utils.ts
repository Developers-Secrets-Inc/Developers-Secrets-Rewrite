import type { FileSystemState } from '../types/file-system-state'
import type { SerializedState } from './base'

export const serialize = (state: FileSystemState): SerializedState => {
  try {
    return JSON.stringify({
      ...state,
      lastModified: state.lastModified.toISOString()
    })
  } catch (error) {
    throw new Error(`Serialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const deserialize = (data: SerializedState): FileSystemState => {
  try {
    const parsed = JSON.parse(data)
    return {
      ...parsed,
      lastModified: new Date(parsed.lastModified)
    }
  } catch (error) {
    throw new Error(`Deserialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const validateState = (state: any): state is FileSystemState => {
  if (!state || typeof state !== 'object') return false
  if (!Array.isArray(state.fileTree)) return false
  if (state.activeFileId !== null && typeof state.activeFileId !== 'string') return false
  if (!Array.isArray(state.openTabs)) return false
  if (typeof state.editorContent !== 'object') return false
  if (!(state.lastModified instanceof Date)) return false
  return true
}

export const handleStorageError = (error: unknown): never => {
  if (error instanceof Error) {
    if (error.name === 'QuotaExceededError') {
      throw new Error('LocalStorage quota exceeded')
    }
    if (error.message.includes('Serialization failed') || error.message.includes('Deserialization failed')) {
      throw new Error('Data corruption detected')
    }
  }
  throw error
}