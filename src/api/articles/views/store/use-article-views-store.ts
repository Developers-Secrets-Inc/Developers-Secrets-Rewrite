import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type ArticleViewType = 'default' | 'playground' | 'chat'

type ArticleViewsState = {
  current: ArticleViewType
  setType: (type: ArticleViewType) => void
  getType: () => ArticleViewType
  toDefault: () => void
  toPlayground: () => void
  toChat: () => void
}


export const useArticleViewsStore = create<ArticleViewsState>()(
  persist(
    (set, get) => ({
      current: 'playground',
      setType: (type) => set({ current: type }),
      getType: () => get().current,
      toDefault: () => set({ current: 'default' }),
      toPlayground: () => set({ current: 'playground' }),
      toChat: () => set({ current: 'chat' }),
    }),
    {
      name: 'article-views/v1',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({ current: state.current }),
    }
  )
)
