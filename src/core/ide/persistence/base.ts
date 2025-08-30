import type { FileSystemState } from '../types/file-system-state'



export interface PersistenceError {
  type: 'quota-exceeded' | 'corrupted-data' | 'invalid-format' | 'unknown'
  message: string
  originalError?: Error
}

export type PersistenceKey = string
export type SerializedState = string
export type SerializedStates = Record<PersistenceKey, SerializedState>