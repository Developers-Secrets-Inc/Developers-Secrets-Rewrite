import { useCallback, useEffect, useState } from 'react'
import { 
  saveState, 
  loadState, 
  clearState, 
  stateExists 
} from '../localStorage'
import type { PersistenceKey } from '../base'
import { useIDEStore } from '../../store/use-ide-store'

interface UsePersistenceOptions {
  key?: PersistenceKey
  autoSave?: boolean
  autoSaveInterval?: number
  debounceMs?: number
  onError?: (error: Error) => void
}

interface UsePersistenceReturn {
  // Actions
  save: () => Promise<void>
  load: () => Promise<void>
  clear: () => Promise<void>
  hasSavedState: () => Promise<boolean>
  
  // State
  isLoading: boolean
  error: Error | null
  lastSave: Date | null
  isDirty: boolean
  
  // Utils
  canAutoSave: boolean
  forceSave: () => Promise<void>
}

export const useLocalPersistence = (options: UsePersistenceOptions = {}): UsePersistenceReturn => {
  const { 
    key, 
    autoSave = false, 
    autoSaveInterval = 30000,
    debounceMs = 1000,
    onError 
  } = options
  
  const ideStore = useIDEStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [lastSave, setLastSave] = useState<Date | null>(null)
  const [pendingSave, setPendingSave] = useState(false)

  // Validate options
  const canAutoSave = !!key && autoSave

  // Save state to persistence
  const save = useCallback(async () => {
    if (!key) {
      setError(new Error('Persistence key is required'))
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      
      const state = ideStore.exportCurrentState()
      await saveState(key, state)
      
      setLastSave(new Date())
      ideStore.markAsSaved()
      setPendingSave(false)
    } catch (error) {
      const err = error as Error
      setError(err)
      onError?.(err)
    } finally {
      setIsLoading(false)
    }
  }, [key, ideStore, onError])

  // Load state from persistence
  const load = useCallback(async () => {
    if (!key) {
      setError(new Error('Persistence key is required'))
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      
      const savedState = await loadState(key)
      if (savedState) {
        ideStore.importState(savedState)
        setLastSave(savedState.lastModified)
      }
    } catch (error) {
      const err = error as Error
      setError(err)
      onError?.(err)
    } finally {
      setIsLoading(false)
    }
  }, [key, ideStore, onError])

  // Clear saved state
  const clear = useCallback(async () => {
    if (!key) {
      setError(new Error('Persistence key is required'))
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      
      await clearState(key)
      setLastSave(null)
      ideStore.reset()
    } catch (error) {
      const err = error as Error
      setError(err)
      onError?.(err)
    } finally {
      setIsLoading(false)
    }
  }, [key, ideStore, onError])

  // Check if saved state exists
  const hasSavedState = useCallback(async (): Promise<boolean> => {
    if (!key) return false
    try {
      return await stateExists(key)
    } catch (error) {
      setError(error as Error)
      return false
    }
  }, [key])

  // Force save (ignores debounce)
  const forceSave = useCallback(async () => {
    setPendingSave(false) // Clear any pending debounce
    await save()
  }, [save])

  // Auto-save logic
  useEffect(() => {
    if (!canAutoSave) return

    let debounceTimer: NodeJS.Timeout

    const handleAutoSave = () => {
      if (ideStore.hasUnsavedChanges()) {
        setPendingSave(true)
        
        // Clear previous debounce
        if (debounceTimer) {
          clearTimeout(debounceTimer)
        }
        
        // Set new debounce
        debounceTimer = setTimeout(async () => {
          if (ideStore.hasUnsavedChanges()) {
            await save()
          }
        }, debounceMs)
      }
    }

    const interval = setInterval(handleAutoSave, autoSaveInterval)
    
    return () => {
      clearInterval(interval)
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
    }
  }, [canAutoSave, autoSaveInterval, debounceMs, ideStore.hasUnsavedChanges, save])

  // Update dirty state when store changes
  const isDirty = ideStore.hasUnsavedChanges()

  return {
    // Actions
    save,
    load,
    clear,
    hasSavedState,
    
    // State
    isLoading,
    error,
    lastSave,
    isDirty,
    
    // Utils
    canAutoSave,
    forceSave
  }
}