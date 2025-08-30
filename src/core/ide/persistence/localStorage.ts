import type { FileSystemState } from '../types/file-system-state'
import type { PersistenceKey, SerializedStates } from './base'
import { deserialize, handleStorageError, serialize, validateState } from './utils'

const STORAGE_KEY = 'ide-states'

export const getAllStates = async (): Promise<SerializedStates> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch (error) {
    handleStorageError(error)
    return {}
  }
}

export const setAllStates = async (states: SerializedStates): Promise<void> => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(states))
  } catch (error) {
    handleStorageError(error)
  }
}

export const saveState = async (
  key: PersistenceKey, 
  state: FileSystemState
): Promise<void> => {
  if (!validateState(state)) {
    throw new Error('Invalid state format')
  }
  
  const allStates = await getAllStates()
  allStates[key] = serialize(state)
  await setAllStates(allStates)
}

export const loadState = async (
  key: PersistenceKey
): Promise<FileSystemState | null> => {
  try {
    const allStates = await getAllStates()
    const data = allStates[key]
    
    if (!data) return null
    
    const state = deserialize(data)
    if (!validateState(state)) {
      await clearState(key)
      return null
    }
    
    return state
  } catch (error) {
    await clearState(key)
    handleStorageError(error)
    return null
  }
}

export const clearState = async (
  key: PersistenceKey
): Promise<void> => {
  const allStates = await getAllStates()
  delete allStates[key]
  await setAllStates(allStates)
}

export const stateExists = async (
  key: PersistenceKey
): Promise<boolean> => {
  const allStates = await getAllStates()
  return key in allStates
}

