import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { IDEInitialConfig } from '@/core/ide/types'

export type ArticleViewType = 'default' | 'playground' | 'chat'

const langToExt = (lang: string): 'py' | 'ts' | 'js' => {
  const l = (lang || '').toLowerCase()
  if (l === 'python' || l === 'py') return 'py'
  if (l === 'typescript' || l === 'ts' || l === 'tsx') return 'ts'
  if (l === 'javascript' || l === 'js' || l === 'jsx') return 'js'
  return 'js'
}

type ArticleViewsState = {
  current: ArticleViewType
  setType: (type: ArticleViewType) => void
  getType: () => ArticleViewType
  toDefault: () => void
  toPlayground: () => void
  toChat: () => void
  playgroundInit?: IDEInitialConfig | null
  openPlaygroundWithSingleFile: (params: { language: string; code: string }) => void
}


export const useArticleViewsStore = create<ArticleViewsState>()(
  persist(
    (set, get) => ({
      current: 'default',
      playgroundInit: null,
      setType: (type) => set({ current: type }),
      getType: () => get().current,
      toDefault: () => set({ current: 'default', playgroundInit: null }),
      toPlayground: () => set({ current: 'playground' }),
      toChat: () => set({ current: 'chat' }),
      openPlaygroundWithSingleFile: ({ language, code }) => {
        const ext = langToExt(language)
        const path = (`/main.${ext}`) as `/${string}`
        const init: IDEInitialConfig = {
          files: [{ path, content: code }],
          openTabs: [path],
          activeTab: path,
          explorer: { open: false },
        }
        set({ current: 'playground', playgroundInit: init })
      },
    }),
    {
      name: 'article-views/v1',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({ current: state.current }),
    }
  )
)
