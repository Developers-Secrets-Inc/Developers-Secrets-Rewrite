# IDE Code Saving Architecture Plan

## Overview

This document outlines the architectural plan for implementing code saving functionality in the IDE system, specifically designed for the articles playground feature where users need to preserve their work when navigating between articles.

## Problem Statement

Current issues with the playground system:
- Users lose their code when navigating between articles in playground mode
- "Headless Tree: sync dataLoader returned undefined" error occurs during navigation
- No persistent state management for IDE content
- Over-engineered approach with unnecessary abstraction layers

## Architectural Principles

### 1. Separation of Concerns
- **Core IDE**: Manage current state only (no save/load awareness)
- **Persistence Layer**: Handle serialization/deserialization 
- **Article Plugin**: Coordinate save/load with article context

### 2. Simplicity First
- Avoid unnecessary abstraction layers
- Use minimal, focused interfaces
- Direct state export/import rather than complex serialization

### 3. Plugin-Based Architecture
- Extensible for different persistence strategies (localStorage, API, etc.)
- Decoupled from specific article contexts
- Reusable across different use cases

## Implementation Phases

### Phase 1: Core IDE State Management

#### Types
```typescript
interface FileSystemState {
  fileTree: FileSystemNode[]
  activeFileId: string | null
  openTabs: Tab[]
  editorContent: Record<string, string>
  lastModified: Date
}

interface SaveLoadPrimitive {
  exportState(): FileSystemState
  importState(state: FileSystemState): void
  hasUnsavedChanges(): boolean
  markAsSaved(): void
}
```

#### SaveLoad Slice
```typescript
// src/core/ide/store/use-save-load-store.ts
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
      return {
        fileTree: useIDEStore.getState().fileTree,
        activeFileId: useIDEStore.getState().activeFileId,
        openTabs: useIDEStore.getState().openTabs,
        editorContent: extractEditorContent(useIDEStore.getState()),
        lastModified: new Date()
      }
    }
    return currentState
  },

  importState: (state) => {
    // Restore state to all slices
    useIDEStore.getState().setFileTree(state.fileTree)
    useIDEStore.getState().setActiveFileId(state.activeFileId)
    useIDEStore.getState().setOpenTabs(state.openTabs)
    restoreEditorContent(useIDEStore.getState(), state.editorContent)
    
    set({ 
      currentState: state,
      lastSavedState: state,
      lastSavedAt: new Date(),
      isDirty: false
    })
  },

  updateCurrentState: (state) => {
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

  updateLastSavedState: (state) => {
    set({ lastSavedState: state, lastSavedAt: new Date() })
  },

  setLastSavedAt: (date) => {
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
```

#### Store Enhancement
```typescript
// src/core/ide/store/use-ide-store.ts
import { createSaveLoadSlice } from './use-save-load-store'

export const useIDEStore = create<IDEState & SaveLoadState & SaveLoadActions>((...a) => {
  // ... existing store setup for IDEState
  const saveLoadSlice = createSaveLoadSlice(...a)
  
  return {
    ...existingState,
    ...saveLoadSlice,
    // Additional store enhancements can go here
  }
})
```

### Phase 2: Persistence Strategy Interface

#### Types
```typescript
interface PersistenceStrategy {
  save(key: string, state: FileSystemState): Promise<void>
  load(key: string): Promise<FileSystemState | null>
  clear(key: string): Promise<void>
  exists(key: string): Promise<boolean>
}

interface ArticleSaveContext {
  tutorialSlug: string
  articleType: string
  articleSlug: string
}
```

#### Persistence Strategy Types
```typescript
// Types for function-based persistence strategies
type GenerateKeyFn = (context: ArticleSaveContext) => string
type SerializeFn = (state: FileSystemState) => string
type DeserializeFn = (data: string) => FileSystemState
type GetAllStatesFn = () => Promise<Record<string, string>>
type SetAllStatesFn = (states: Record<string, string>) => Promise<void>

interface PersistenceStrategyUtils {
  generateKey: GenerateKeyFn
  serialize: SerializeFn
  deserialize: DeserializeFn
  getAllStates: GetAllStatesFn
  setAllStates: SetAllStatesFn
}

interface PersistenceStrategy {
  save: (key: string, state: FileSystemState, utils: PersistenceStrategyUtils) => Promise<void>
  load: (key: string, utils: PersistenceStrategyUtils) => Promise<FileSystemState | null>
  clear: (key: string, utils: PersistenceStrategyUtils) => Promise<void>
  exists: (key: string, utils: PersistenceStrategyUtils) => Promise<boolean>
}
```

### Phase 3: LocalStorage Implementation

```typescript
// src/core/ide/persistence/local-storage-strategy.ts
const localStorageUtils: PersistenceStrategyUtils = {
  generateKey: (context: ArticleSaveContext) => 
    `article-${context.tutorialSlug}-${context.articleType}-${context.articleSlug}`,
  
  serialize: (state: FileSystemState) => 
    JSON.stringify({
      ...state,
      lastModified: state.lastModified.toISOString()
    }),
  
  deserialize: (data: string) => {
    const parsed = JSON.parse(data)
    return {
      ...parsed,
      lastModified: new Date(parsed.lastModified)
    }
  },

  getAllStates: async () => {
    const data = localStorage.getItem('article-ide-states')
    return data ? JSON.parse(data) : {}
  },

  setAllStates: async (states: Record<string, string>) => {
    localStorage.setItem('article-ide-states', JSON.stringify(states))
  }
}

export const localStorageStrategy: PersistenceStrategy = {
  save: async (key: string, state: FileSystemState, utils: PersistenceStrategyUtils) => {
    const allStates = await utils.getAllStates()
    allStates[key] = utils.serialize(state)
    await utils.setAllStates(allStates)
  },

  load: async (key: string, utils: PersistenceStrategyUtils) => {
    const allStates = await utils.getAllStates()
    const data = allStates[key]
    return data ? utils.deserialize(data) : null
  },

  clear: async (key: string, utils: PersistenceStrategyUtils) => {
    const allStates = await utils.getAllStates()
    delete allStates[key]
    await utils.setAllStates(allStates)
  },

  exists: async (key: string, utils: PersistenceStrategyUtils) => {
    const allStates = await utils.getAllStates()
    return key in allStates
  }
}

export const createLocalStorageStrategy = () => localStorageStrategy
```

### Advanced Auto-Save Implementation

#### Auto-Save Configuration
```typescript
// src/core/ide/types/auto-save.ts
interface AutoSaveConfig {
  enabled: boolean
  intervalMs: number        // Time between auto-saves when there are changes
  inactivityThresholdMs: number  // Time of inactivity before triggering auto-save
  debounceMs: number       // Debounce time to avoid rapid consecutive saves
  showNotifications: boolean    // Show save completion notifications
  respectUserActivity: boolean  // Pause auto-save when user is actively typing
  maxConcurrentSaves: number   // Maximum number of concurrent save operations
}

interface AutoSaveState {
  isAutoSaving: boolean
  lastAutoSave: Date | null
  lastUserActivity: Date
  pendingSave: boolean
  autoSaveIntervalId: NodeJS.Timeout | null
}

interface AutoSaveActions {
  startAutoSave: () => void
  stopAutoSave: () => void
  recordUserActivity: () => void
  getAutoSaveStatus: () => { isAutoSaving: boolean; lastAutoSave: Date | null; timeUntilNext: number }
}

const defaultAutoSaveConfig: AutoSaveConfig = {
  enabled: true,
  intervalMs: 30000,        // 30 seconds
  inactivityThresholdMs: 5000,  // 5 seconds
  debounceMs: 1000,        // 1 second
  showNotifications: true,
  respectUserActivity: true,
  maxConcurrentSaves: 1
}
```

#### Auto-Save Store Slice
```typescript
// src/core/ide/store/use-auto-save-store.ts
import { AutoSaveConfig, AutoSaveState, AutoSaveActions } from '../types/auto-save'

export const createAutoSaveSlice: StateCreator<AutoSaveState & AutoSaveActions> = (set, get) => ({
  // Initial state
  isAutoSaving: false,
  lastAutoSave: null,
  lastUserActivity: new Date(),
  pendingSave: false,
  autoSaveIntervalId: null,

  // Actions
  startAutoSave: () => {
    const config = get().getAutoSaveConfig()
    if (!config.enabled) return

    // Clear existing interval if any
    get().stopAutoSave()

    const intervalId = setInterval(() => {
      get().performAutoSave()
    }, config.intervalMs)

    set({ autoSaveIntervalId: intervalId })
  },

  stopAutoSave: () => {
    const { autoSaveIntervalId } = get()
    if (autoSaveIntervalId) {
      clearInterval(autoSaveIntervalId)
      set({ autoSaveIntervalId: null })
    }
  },

  recordUserActivity: () => {
    set({ lastUserActivity: new Date() })
  },

  getAutoSaveStatus: () => {
    const state = get()
    const config = get().getAutoSaveConfig()
    const now = new Date()
    const timeSinceLastSave = state.lastAutoSave ? now.getTime() - state.lastAutoSave.getTime() : 0
    const timeUntilNext = Math.max(0, config.intervalMs - timeSinceLastSave)
    
    return {
      isAutoSaving: state.isAutoSaving,
      lastAutoSave: state.lastAutoSave,
      timeUntilNext
    }
  },

  // Internal method for actual auto-save
  performAutoSave: debounce(async () => {
    const state = get()
    const config = get().getAutoSaveConfig()
    
    // Check if user is actively typing
    if (config.respectUserActivity) {
      const timeSinceActivity = new Date().getTime() - state.lastUserActivity.getTime()
      if (timeSinceActivity < config.inactivityThresholdMs) {
        set({ pendingSave: true })
        return
      }
    }

    // Check if there are unsaved changes
    if (!ideStore.getState().hasUnsavedChanges()) {
      return
    }

    set({ isAutoSaving: true })
    
    try {
      const saveStrategy = createLocalStorageStrategy()
      const utils = localStorageUtils
      const context = get().getContext()
      const key = utils.generateKey(context)
      
      const currentState = ideStore.getState().exportCurrentState()
      await saveStrategy.save(key, currentState, utils)
      
      ideStore.getState().markAsSaved()
      set({ 
        isAutoSaving: false,
        lastAutoSave: new Date(),
        pendingSave: false
      })
      
      if (config.showNotifications) {
        showAutoSaveNotification()
      }
    } catch (error) {
      console.error('Auto-save failed:', error)
      set({ isAutoSaving: false })
    }
  }, 1000)
})
```

#### Auto-Save Hook with Smart Debouncing
```typescript
// src/core/ide/hooks/use-auto-save.ts
export const useAutoSave = (context: ArticleSaveContext, config: Partial<AutoSaveConfig> = {}) => {
  const finalConfig = { ...defaultAutoSaveConfig, ...config }
  const ideStore = useIDEStore()
  const autoSaveStore = useAutoSaveStore()
  const [userActivityListener, setUserActivityListener] = useState<(() => void) | null>(null)

  // Set up activity listeners
  useEffect(() => {
    const handleActivity = () => {
      autoSaveStore.recordUserActivity()
    }

    // Listen to various user activities
    const activities = ['mousedown', 'keydown', 'scroll', 'touchstart']
    activities.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true })
    })

    setUserActivityListener(() => handleActivity)

    return () => {
      activities.forEach(event => {
        window.removeEventListener(event, handleActivity)
      })
    }
  }, [])

  // Auto-save lifecycle
  useEffect(() => {
    if (finalConfig.enabled) {
      autoSaveStore.startAutoSave()
    } else {
      autoSaveStore.stopAutoSave()
    }

    return () => autoSaveStore.stopAutoSave()
  }, [finalConfig.enabled])

  // React to editor changes with smart debouncing
  useEffect(() => {
    let debounceTimer: NodeJS.Timeout

    const handleEditorChange = () => {
      autoSaveStore.recordUserActivity()
      
      // Clear previous debounce
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
      
      // Set new debounce
      debounceTimer = setTimeout(() => {
        ideStore.getState().updateCurrentState(ideStore.getState().exportCurrentState())
      }, finalConfig.debounceMs)
    }

    // Subscribe to editor changes from store
    const unsubscribe = ideStore.subscribe((state) => {
      if (state.editorContent) {
        handleEditorChange()
      }
    })

    return () => {
      clearTimeout(debounceTimer)
      unsubscribe()
    }
  }, [finalConfig.debounceMs])

  // Public API
  return {
    config: finalConfig,
    status: autoSaveStore.getAutoSaveStatus(),
    forceSave: async () => {
      await autoSaveStore.performAutoSave()
    },
    pauseAutoSave: () => autoSaveStore.stopAutoSave(),
    resumeAutoSave: () => autoSaveStore.startAutoSave(),
    recordActivity: () => autoSaveStore.recordUserActivity()
  }
}
```

#### Article IDE Auto-Save Integration
```typescript
// src/api/articles/views/components/article-ide.tsx
interface ArticleIDEProps {
  initialContext: ArticleSaveContext
  autoSave?: boolean
  autoSaveConfig?: Partial<AutoSaveConfig>
  onSave?: (state: FileSystemState) => void
}

export const ArticleIDE = ({ 
  initialContext, 
  autoSave = true, 
  autoSaveConfig,
  onSave 
}: ArticleIDEProps) => {
  const { saveCurrentState, loadSavedState, hasUnsavedChanges } = usePlaygroundSave({
    ...initialContext,
    autoSave
  })
  
  const autoSave = useAutoSave(initialContext, autoSaveConfig)
  const ideStore = useIDEStore()
  const { initializeIDE } = useIDEInitialize()

  useEffect(() => {
    loadSavedState()
    initializeIDE()
  }, [initialContext.tutorialSlug, initialContext.articleSlug])

  // Handle before navigation
  const handleBeforeNavigation = useCallback(async () => {
    if (hasUnsavedChanges()) {
      await saveCurrentState()
    }
  }, [hasUnsavedChanges, saveCurrentState])

  // Auto-save status display
  if (autoSave.config.showNotifications) {
    const { isAutoSaving, lastAutoSave } = autoSave.status
    return (
      <div className="relative flex h-full">
        {/* IDE components */}
        
        {/* Auto-save status overlay */}
        {isAutoSaving && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-sm">
            Sauvegarde automatique...
          </div>
        )}
        
        {lastAutoSave && (
          <div className="absolute top-8 right-2 text-xs text-gray-500">
            Dernière sauvegarde: {lastAutoSave.toLocaleTimeString()}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-full">
      {/* IDE components */}
    </div>
  )
}
```

### Unsaved Changes Notification Component

#### Auto-Save Preference Storage
```typescript
// src/core/ide/storage/user-preferences.ts
interface UserPreferences {
  autoSaveEnabled: boolean
  autoSaveInterval: number
  showNotifications: boolean
  lastAutoSavePreference: Date | null
}

const USER_PREFS_KEY = 'ide-user-preferences'

const defaultPreferences: UserPreferences = {
  autoSaveEnabled: true,
  autoSaveInterval: 30000,
  showNotifications: true,
  lastAutoSavePreference: null
}

export const getUserPreferences = (): UserPreferences => {
  if (typeof window === 'undefined') return defaultPreferences
  
  try {
    const stored = localStorage.getItem(USER_PREFS_KEY)
    return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences
  } catch {
    return defaultPreferences
  }
}

export const saveUserPreferences = (preferences: Partial<UserPreferences>): void => {
  if (typeof window === 'undefined') return
  
  try {
    const current = getUserPreferences()
    const updated = { ...current, ...preferences, lastAutoSavePreference: new Date() }
    localStorage.setItem(USER_PREFS_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error('Failed to save user preferences:', error)
  }
}
```

#### Unsaved Changes Notification Component
```typescript
// src/core/ide/components/unsaved-changes-notification.tsx
import { XIcon, SaveIcon, ClockIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { useIDEStore } from '../store/use-ide-store'
import { getUserPreferences, saveUserPreferences } from '../storage/user-preferences'
import { useAutoSave } from '../hooks/use-auto-save'

interface UnsavedChangesNotificationProps {
  articleContext: ArticleSaveContext
  onClose?: () => void
}

export const UnsavedChangesNotification = ({ 
  articleContext, 
  onClose 
}: UnsavedChangesNotificationProps) => {
  const ideStore = useIDEStore()
  const { hasUnsavedChanges, markAsSaved } = ideStore
  const [preferences, setPreferences] = useState(getUserPreferences())
  
  const autoSave = useAutoSave(articleContext, {
    enabled: preferences.autoSaveEnabled,
    intervalMs: preferences.autoSaveInterval,
    showNotifications: preferences.showNotifications
  })

  const handleSaveNow = async () => {
    await autoSave.forceSave()
    onClose?.()
  }

  const handleToggleAutoSave = (enabled: boolean) => {
    const newPreferences = { ...preferences, autoSaveEnabled: enabled }
    saveUserPreferences(newPreferences)
    setPreferences(newPreferences)
    
    if (enabled) {
      autoSave.resumeAutoSave()
    } else {
      autoSave.pauseAutoSave()
    }
  }

  const handleSaveLater = () => {
    // Schedule a save for next inactivity window
    autoSave.recordActivity()
    onClose?.()
  }

  if (!hasUnsavedChanges()) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md mx-4 border-orange-200 bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <ClockIcon className="h-5 w-5" />
            Modifications non sauvegardées
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-sm text-orange-800">
              Vous avez des modifications non sauvegardées dans cet article. 
              Ces modifications seront perdues si vous quittez sans sauvegarder.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Sauvegarde automatique</span>
            <Switch
              checked={preferences.autoSaveEnabled}
              onCheckedChange={handleToggleAutoSave}
            />
          </div>

          {preferences.autoSaveEnabled && (
            <div className="text-xs text-gray-500">
              Sauvegarde toutes les {preferences.autoSaveInterval / 1000} secondes d'inactivité
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm">Notifications de sauvegarde</span>
            <Switch
              checked={preferences.showNotifications}
              onCheckedChange={(checked) => {
                setPreferences({ ...preferences, showNotifications: checked })
                saveUserPreferences({ showNotifications: checked })
              }}
            />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button 
              onClick={handleSaveNow}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600"
            >
              <SaveIcon className="h-4 w-4" />
              Sauvegarder maintenant
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleSaveLater}
                className="flex-1"
              >
                Plus tard
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="flex-1"
              >
                Ignorer
              </Button>
            </div>
          </div>

          {/* Auto-save status */}
          {autoSave.status.isAutoSaving && (
            <div className="flex items-center gap-2 text-xs text-blue-600">
              <div className="animate-spin h-3 w-3 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              Sauvegarde automatique en cours...
            </div>
          )}

          {autoSave.status.lastAutoSave && !autoSave.status.isAutoSaving && (
            <div className="text-xs text-gray-500">
              Dernière sauvegarde: {autoSave.status.lastAutoSave.toLocaleTimeString()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
```

#### Usage in Article Navigation
```typescript
// src/api/articles/components/article-navigation.tsx
interface ArticleNavigationProps {
  children: React.ReactNode
  onBeforeNavigate?: () => Promise<void>
}

export const ArticleNavigation = ({ children, onBeforeNavigate }: ArticleNavigationProps) => {
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false)
  const ideStore = useIDEStore()
  const { hasUnsavedChanges } = ideStore
  const navigate = useNavigate()

  const handleNavigate = async (path: string) => {
    if (hasUnsavedChanges()) {
      setShowUnsavedDialog(true)
      return
    }

    if (onBeforeNavigate) {
      await onBeforeNavigate()
    }
    
    navigate(path)
  }

  const handleSaveAndNavigate = async () => {
    await onBeforeNavigate?.()
    setShowUnsavedDialog(false)
    // Continue with navigation
  }

  const handleIgnoreAndNavigate = () => {
    setShowUnsavedDialog(false)
    // Continue with navigation without saving
  }

  return (
    <>
      {children}
      
      <UnsavedChangesNotification
        articleContext={/* current article context */}
        onClose={() => setShowUnsavedDialog(false)}
      />
      
      {/* Navigation triggers that show the dialog */}
      <Button onClick={() => handleNavigate('/next-article')}>
        Prochain article
      </Button>
    </>
  )
}
```

### Phase 4: Article Plugin Integration

#### Context Hook
```typescript
// src/api/articles/hooks/use-playground-save.ts
interface PlaygroundSaveContext extends ArticleSaveContext {
  autoSave?: boolean
  autoSaveInterval?: number
}

export const usePlaygroundSave = (context: PlaygroundSaveContext) => {
  const [saveStrategy] = useState(() => createLocalStorageStrategy())
  const utils = localStorageUtils
  const ideStore = useIDEStore()
  const [lastSave, setLastSave] = useState<Date | null>(null)

  const saveCurrentState = async () => {
    const state = ideStore.exportCurrentState()
    const key = utils.generateKey(context)
    await saveStrategy.save(key, state, utils)
    setLastSave(new Date())
    ideStore.markAsSaved()
  }

  const loadSavedState = async () => {
    const key = utils.generateKey(context)
    const saved = await saveStrategy.load(key, utils)
    if (saved) {
      ideStore.importState(saved)
      setLastSave(saved.lastModified)
    }
  }

  const clearSavedState = async () => {
    const key = utils.generateKey(context)
    await saveStrategy.clear(key, utils)
    setLastSave(null)
  }

  return {
    saveCurrentState,
    loadSavedState,
    clearSavedState,
    lastSave,
    hasUnsavedChanges: ideStore.hasUnsavedChanges()
  }
}
```

#### ArticleIDE Enhancement
```typescript
// src/api/articles/views/components/article-ide.tsx
interface ArticleIDEProps {
  initialContext: ArticleSaveContext
  autoSave?: boolean
  onSave?: (state: FileSystemState) => void
}

export const ArticleIDE = ({ initialContext, autoSave, onSave }: ArticleIDEProps) => {
  const { saveCurrentState, loadSavedState, hasUnsavedChanges } = usePlaygroundSave({
    ...initialContext,
    autoSave
  })
  const { initializeIDE } = useIDEInitialize()

  useEffect(() => {
    loadSavedState()
    initializeIDE()
  }, [initialContext.tutorialSlug, initialContext.articleSlug])

  const handleBeforeNavigation = useCallback(async () => {
    if (hasUnsavedChanges()) {
      await saveCurrentState()
    }
  }, [hasUnsavedChanges, saveCurrentState])

  // Auto-save implementation
  useEffect(() => {
    if (!autoSave) return

    const interval = setInterval(() => {
      if (hasUnsavedChanges()) {
        saveCurrentState()
      }
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [autoSave, hasUnsavedChanges, saveCurrentState])

  return (
    <div className="flex h-full">
      {/* IDE components */}
    </div>
  )
}
```

### Phase 5: Navigation Integration

#### Page Enhancement
```typescript
// src/app/(frontend)/(content)/articles/[tutorial_slug]/[type]/[article_slug]/page.tsx
export default async function Page({
  params,
}: {
  params: Promise<{ tutorial_slug: string; type: ArticleType; article_slug: string }>
}) {
  const { tutorial_slug, type, article_slug } = await params
  const article = await getTutorialArticle({ tutorial_slug, article_slug, type })

  if (isNone(article)) return notFound()

  return (
    <ArticleNavigation onBeforeNavigate={handleBeforeNavigation}>
      <ArticleIDE
        initialContext={{
          tutorialSlug: tutorial_slug,
          articleType: type,
          articleSlug: article_slug
        }}
        autoSave={true}
      />
      {/* Article content */}
    </ArticleNavigation>
  )
}
```

## Technical Considerations

### Performance
- Debounce auto-save to avoid frequent localStorage writes
- Compare state before/after to avoid unnecessary saves
- Use requestIdleCallback for background save operations

### Error Handling
- Graceful fallback when localStorage is unavailable
- Conflict resolution for concurrent saves
- State validation before import

### Storage Management
- Implement garbage collection for old saves
- Size limits for localStorage usage
- Compress large states if needed

### Security
- Sanitize state data before storage
- Handle sensitive data appropriately
- User consent for localStorage usage

## Extension Points

### Alternative Persistence Strategies
```typescript
// API-based strategy for future cloud sync
const createAPIStrategy = (): PersistenceStrategy => ({
  save: async (key: string, state: FileSystemState, utils: PersistenceStrategyUtils) => {
    return api.saveArticleState(key, state)
  },
  load: async (key: string, utils: PersistenceStrategyUtils) => {
    const data = await api.loadArticleState(key)
    return data ? utils.deserialize(data) : null
  },
  clear: async (key: string, utils: PersistenceStrategyUtils) => {
    return api.clearArticleState(key)
  },
  exists: async (key: string, utils: PersistenceStrategyUtils) => {
    return api.articleStateExists(key)
  }
})

// IndexedDB strategy for larger states
const indexedDBUtils: PersistenceStrategyUtils = {
  generateKey: (context: ArticleSaveContext) => 
    `article-${context.tutorialSlug}-${context.articleType}-${context.articleSlug}`,
  
  serialize: (state: FileSystemState) => 
    JSON.stringify({
      ...state,
      lastModified: state.lastModified.toISOString()
    }),
  
  deserialize: (data: string) => {
    const parsed = JSON.parse(data)
    return {
      ...parsed,
      lastModified: new Date(parsed.lastModified)
    }
  },

  getAllStates: async () => {
    const states = await idb.getAllArticleStates()
    return states || {}
  },

  setAllStates: async (states: Record<string, string>) => {
    return idb.saveAllArticleStates(states)
  }
}

const createIndexedDBStrategy = (): PersistenceStrategy => ({
  save: async (key: string, state: FileSystemState, utils: PersistenceStrategyUtils) => {
    const allStates = await utils.getAllStates()
    allStates[key] = utils.serialize(state)
    await utils.setAllStates(allStates)
  },

  load: async (key: string, utils: PersistenceStrategyUtils) => {
    const allStates = await utils.getAllStates()
    const data = allStates[key]
    return data ? utils.deserialize(data) : null
  },

  clear: async (key: string, utils: PersistenceStrategyUtils) => {
    const allStates = await utils.getAllStates()
    delete allStates[key]
    await utils.setAllStates(allStates)
  },

  exists: async (key: string, utils: PersistenceStrategyUtils) => {
    const allStates = await utils.getAllStates()
    return key in allStates
  }
})
```

### Advanced Features
- Versioned state management
- Conflict resolution strategies
- Partial save/load (only changed files)
- Export/import to/from files

## Testing Strategy

### Unit Tests
- State serialization/deserialization
- Save/load operations
- Error scenarios
- Edge cases

### Integration Tests
- End-to-end save/load flow
- Navigation with state preservation
- Auto-save behavior
- Conflict resolution

### Performance Tests
- Large state handling
- Concurrent save operations
- Memory usage patterns

## Migration Path

1. **Phase 1**: Core primitives without persistence
2. **Phase 2**: LocalStorage integration
3. **Phase 3**: Article plugin integration
4. **Phase 4**: Advanced features and optimizations

## Timeline

- Week 1: Core state management and export primitives
- Week 2: Persistence strategy interface and localStorage
- Week 3: Article plugin and integration
- Week 4: Advanced features, testing, optimization

## Success Metrics

- No data loss during navigation
- Fast save/load operations (< 100ms)
- Minimal memory overhead
- Clean, maintainable code structure
- Extensible for future features